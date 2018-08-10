import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { SongContext } from './Song';
import { StepType } from '../types/propTypes';
import { isEqual } from '../lib/utils';
import Tone from '../lib/tone';

export const TrackContext = React.createContext();

class TrackConsumer extends Component {
	static propTypes = {
		steps: PropTypes.arrayOf(StepType),
		onStepStart: PropTypes.func,
		interval: PropTypes.string, // react-music = resolution
		volume: PropTypes.number,
		pan: PropTypes.number,
		effects: PropTypes.arrayOf(PropTypes.element), // TODO: Consider accepting Tone effects signals
	};

	static defaultProps = {
		volume: 0,
		pan: 0,
		effects: [],
	};

	state = {
		instruments: [],
		track: null,
		effectsChain: [], // An array of Tone effects
		trackChannelBase: null,
		trackChannel: {
			id: null,
		}, // Tone Signal
		// effectsChain2: [], // An array of Tone effects for sending to Instrument
	};

	componentDidMount() {
		// Tone = require('tone'); // eslint-disable-line

		// Example of chaining
		// const feedbackDelay = new Tone.FeedbackDelay('8n', 0.5);
		// this.trackChain = [
		// feedbackDelay,
		// Tone.Master,
		// ];

		// Setup new track based on pan and volume component

		// NOTE: Not used right now because of effect toggle issue
		this.setState({
			trackChannelBase: new Tone.PanVol(this.props.pan, this.props.volume),
		});
		// this.updateTrackChannelEffects();
	}

	// updateTrackChannelEffects = (effectsChain = []) => {
	// 	console.log('<Track />', 'updateTrackChannelEffects');
	// 	console.log(effectsChain);

	// 	const trackChannel = this.trackChannelBase.chain(
	// 		...effectsChain,
	// 		Tone.Master,
	// 	);
	// 	trackChannel.id = Math.random(1000);
	// 	// console.log(this.trackChannel.id);

	// 	// Set this to pass it Instrument
	// 	this.setState((prevState) => {
	// 		return {
	// 			...prevState,
	// 			trackChannel,
	// 			effectsChain2: effectsChain,
	// 		};
	// 	});
	// };

	componentDidUpdate(prevProps, prevState) {
		// console.log(prevProps, this.props);

		// -------------------------------------------------------------------------
		// UPDATE EFFECTS
		// -------------------------------------------------------------------------

		// if (prevState.effectsChain !== this.state.effectsChain) {
		// 	this.updateTrackChannelEffects(this.state.effectsChain);
		// }

		// -------------------------------------------------------------------------
		// STEPS
		// -------------------------------------------------------------------------

		// Start/Stop sequencer!
		if (!prevProps.isPlaying && this.props.isPlaying) {
			this.stepsToPlay = this.props.steps;

			this.seq = new Tone.Sequence(
				(time, step) => {
					if (step.note) {
						// Play sound
						// TODO: Handle multiple instruments
						this.state.instruments[0].triggerAttackRelease(
							step.note.name || step.note,
							step.duration,
							undefined,
							step.velocity,
						);
					}

					if (typeof this.props.onStepStart === 'function') {
						this.props.onStepStart(step);
					}
				},
				this.stepsToPlay,
				this.props.interval,
			);

			this.seq.start(0);
		} else if (prevProps.isPlaying && !this.props.isPlaying) {
			this.seq.stop();
		}

		// Update sequencer steps
		if (this.props.isPlaying) {
			// Deep compare prev and new steps, only update if they are different
			const doesStepsNeedUpdating = isEqual(prevProps.steps, this.props.steps);

			if (doesStepsNeedUpdating) {
				this.stepsToPlay = this.props.steps;
				this.seq.removeAll();

				this.stepsToPlay.forEach((note, i) => {
					this.seq.add(i, note);
				});
			}
		}

		// -------------------------------------------------------------------------
		// VOLUME / PAN
		// -------------------------------------------------------------------------

		// Not used
		// if (prevProps.volume !== this.props.volume) {
		// 	this.state.trackChannel.volume.value = this.props.volume;
		// }

		// if (prevProps.pan !== this.props.pan) {
		// 	this.state.trackChannel.pan.value = this.props.pan;
		// }
	}

	updateInstruments = (instruments) => {
		this.setState({
			instruments,
		});
	};

	addToEffectsChain = (effectsChain) => {
		console.log('<Track />', 'addToEffectsChain');

		// Alternative way of setting state, more robust.
		this.setState((prevState) => {
			return {
				...prevState,
				effectsChain: [...prevState.effectsChain, effectsChain],
			};
		});
	};

	// TODO
	removeFromEffectsChain = (effectsChain) => {
		console.log('<Track />', 'removeFromEffectsChain');

		this.setState((prevState) => {
			return {
				...prevState,
				effectsChain: [],
			};
		});
	};

	render() {
		const { effectsChain } = this.state;

		return (
			<TrackContext.Provider
				value={{
					trackChannel: this.state.trackChannel,
					trackChannelBase: this.state.trackChannelBase,
					effectsChain: this.state.effectsChain,
					updateInstruments: this.updateInstruments,
					addToEffectsChain: this.addToEffectsChain,
					removeFromEffectsChain: this.removeFromEffectsChain,
					pan: this.props.pan,
					volume: this.props.volume,
				}}
			>
				<Fragment>
					{this.props.children}
					{this.props.effects}
				</Fragment>
			</TrackContext.Provider>
		);
	}
}

export default class Track extends Component {
	render() {
		return (
			<SongContext.Consumer>
				{(value) => <TrackConsumer {...value} {...this.props} />}
			</SongContext.Consumer>
		);
	}
}
