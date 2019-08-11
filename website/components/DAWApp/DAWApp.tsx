import React from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';

import StepsEditor from '../DAWStepsEditor';
import Transport from '../DAWTransport';
import Sequencer from '../DAWSequencer';
import TrackInfo from '../DAWTrackInfo';

import * as types from '../../types';
import {
  melodyClip1,
  melodyClip2,
  beatClip1,
  beatClip2,
} from '../../sample-data';
import { buildSteps } from '../../lib/stepUtils';

import css from './DAWApp.css';

const initialState = {
  // --------------------------------------------------------------------------
  // TRANSPORT
  // --------------------------------------------------------------------------
  isPlaying: false,
  tempo: 70,
  // --------------------------------------------------------------------------
  // STEPS
  // --------------------------------------------------------------------------
  // Highlighted step that follows the music
  currentStepIndex: null,
  // --------------------------------------------------------------------------
  // CLIPS
  // --------------------------------------------------------------------------
  currentClipId: 'melody1',
  clips: [melodyClip1, melodyClip2, beatClip1, beatClip2],
  // --------------------------------------------------------------------------
  // TRACK
  // --------------------------------------------------------------------------
  currentTrackId: 'melody',
  tracks: [
    {
      id: 'melody',
      instrumentType: 'polySynth',
      volume: 100,
      pan: 50,
      steps: [...buildSteps(melodyClip1), ...buildSteps(melodyClip2)],
      clips: [{ id: 'melody1' }, { id: 'melody2' }],
      notes: [],
      effects: [],
    },
    {
      id: 'beat',
      instrumentType: 'sampler',
      volume: 100,
      pan: 50,
      steps: [...buildSteps(beatClip1), ...buildSteps(beatClip2)],
      clips: [{ id: 'beat1' }, { id: 'beat2' }],
      notes: [],
      effects: [],
    },
  ],
};

const DAWApp = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {
    isPlaying,
    tempo,
    currentClipId,
    clips,
    currentTrackId,
    currentStepIndex,
    tracks,
    volume,
    pan,
    notes,
  } = state;
  const [selectedEffect, setSelectedEffect] = React.useState(null);
  React.useEffect(() => {
    setSelectedEffect(null);
  }, [currentTrackId]);

  const currentTrack = tracks.find((track) => track.id === currentTrackId);
  const currentSteps = currentTrack ? currentTrack.steps : [];

  // WIP
  // const currentClip = clips.find((clip) => {
  //   return clip.id === currentClipId;
  // });
  // const currentSteps = buildSteps(currentClip);

  return (
    <div className={css.dawApp}>
      <Transport isPlaying={isPlaying} tempo={tempo} dispatch={dispatch} />

      <div className={css.trackSequencer}>
        <TrackInfo
          currentTrack={currentTrack}
          volume={volume}
          pan={pan}
          selectedEffect={selectedEffect}
          dispatch={dispatch}
        />

        <Sequencer
          tracks={tracks}
          currentTrackId={currentTrackId}
          currentClipId={currentClipId}
          dispatch={dispatch}
        />
      </div>

      <StepsEditor
        defaultSteps={currentSteps}
        currentStepIndex={currentStepIndex}
        notes={notes}
        subdivision={16}
        onStepEditorClick={(steps) =>
          dispatch({ type: types.UPDATE_CURRENT_STEPS, steps })
        }
        onKeyboardDown={(note) =>
          dispatch({ type: types.SET_NOTES, notes: [{ name: note }] })
        }
        onKeyboardUp={() => dispatch({ type: types.SET_NOTES, notes: [] })}
      />

      {/* ----------------------------------------------------------------- */}
      {/* AUDIO */}
      {/* ----------------------------------------------------------------- */}

      <Song
        isPlaying={isPlaying}
        tempo={tempo}
        swing={1}
        swingSubdivision={'8n'}
      >
        {tracks.map((track) => {
          return (
            <Track
              steps={track.steps}
              volume={(parseInt(track.volume, 10) / 100) * 32 - 32}
              pan={(parseInt(track.pan, 10) / 100) * 2 - 1}
              subdivision={'16n'}
              effects={track.effects.map((effect, i) => {
                return (
                  <Effect
                    type={effect.type}
                    key={`${effect.id}-${i}-melody`}
                    id={`${effect.id}-${i}-melody`}
                    delayTime={effect.delayTime || '16n'}
                    feedback={effect.feedback || 0.6}
                  />
                );
              })}
              onStepPlay={(step) =>
                dispatch({
                  type: types.SET_CURRENT_STEP_INDEX,
                  currentStepIndex: step.index,
                })
              }
              key={track.id}
            >
              {track.instrumentType === 'sampler' ? (
                <Instrument
                  type={track.instrumentType}
                  samples={{
                    C3: `/static/audio/drums/kick15.wav`,
                    D3: `/static/audio/drums/snare-bottom-buttend15.wav`,
                    E3: `/static/audio/drums/chh12.wav`,
                  }}
                  notes={track.notes}
                />
              ) : (
                <Instrument type={track.instrumentType} notes={track.notes} />
              )}
            </Track>
          );
        })}
      </Song>
    </div>
  );
};

export default DAWApp;

function reducer(state, action) {
  switch (action.type) {
    // ------------------------------------------------------------------------
    // TRANSPORT
    // ------------------------------------------------------------------------

    case types.TOGGLE_PLAYING:
      return { ...state, isPlaying: !state.isPlaying };

    case types.INCREASE_TEMPO:
      return { ...state, tempo: state.tempo + 1 };

    case types.DECREASE_TEMPO:
      return { ...state, tempo: state.tempo - 1 };

    // ------------------------------------------------------------------------
    // STEPS / NOTES
    // ------------------------------------------------------------------------

    case types.SET_CURRENT_STEP_INDEX:
      return { ...state, currentStepIndex: action.currentStepIndex };

    case types.UPDATE_CURRENT_STEPS:
      const { steps } = action;

      return {
        ...state,
        tracks: state.tracks.map((track) => {
          if (track.id === state.currentTrackId) {
            return {
              ...track,
              steps,
            };
          }

          return track;
        }),
        // tracks: {
        //   ...state.tracks,
        //   [state.currentTrackId]: {
        //     ...state.tracks[state.currentTrackId],
        //     steps,
        //   },
        // },
      };

    case types.SET_NOTES:
      return {
        ...state,
        tracks: state.tracks.map((track) => {
          if (track.id === state.currentTrackId) {
            return {
              ...track,
              notes: action.notes,
            };
          }

          return track;
        }),
      };

    // ------------------------------------------------------------------------
    // CLIPS
    // ------------------------------------------------------------------------

    case types.SET_CURRENT_CLIP_ID:
      return {
        ...state,
        currentClipId: action.clipId,
      };

    // ------------------------------------------------------------------------
    // TRACKS
    // ------------------------------------------------------------------------

    case types.SET_CURRENT_TRACK_ID:
      return {
        ...state,
        currentTrackId: action.trackId,
      };

    case types.ADD_TRACK: {
      return {
        ...state,
        tracks: [
          ...state.tracks,
          {
            id: 'newTrack',
            instrumentType: 'polySynth',
            volume: 100,
            pan: 50,
            steps: [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            // steps: buildSteps(melodyClip),
            notes: [],
            effects: [],
          },
        ],
      };
    }

    case types.REMOVE_TRACK: {
      const tracks = state.tracks.filter(
        (track) => track.id !== action.trackId,
      );

      return {
        ...state,
        tracks,
        // Current track may be removed, so we reset the current track
        currentTrackId: tracks.length > 0 ? tracks[0].id : null,
      };
    }

    case types.UPDATE_INSTRUMENT:
      return {
        ...state,
        tracks: state.tracks.map((track) => {
          if (track.id === state.currentTrackId) {
            return {
              ...track,
              instrumentType: action.instrumentType,
            };
          }

          return track;
        }),
      };

    case types.SET_VOLUME:
      return {
        ...state,
        tracks: state.tracks.map((track) => {
          if (track.id === state.currentTrackId) {
            return {
              ...track,
              volume: action.volume,
            };
          }

          return track;
        }),
      };

    case types.SET_PAN:
      return {
        ...state,
        tracks: state.tracks.map((track) => {
          if (track.id === state.currentTrackId) {
            return {
              ...track,
              pan: action.pan,
            };
          }

          return track;
        }),
      };

    // ------------------------------------------------------------------------
    // EFFECTS
    // ------------------------------------------------------------------------

    case types.ADD_EFFECT:
      return {
        ...state,
        tracks: state.tracks.map((track) => {
          if (track.id === state.currentTrackId) {
            return {
              ...track,
              effects: [
                ...track.effects,
                {
                  id: action.effectId,
                  type: action.effectType,
                },
              ],
            };
          }

          return track;
        }),
      };

    case types.REMOVE_EFFECT:
      return {
        ...state,
        tracks: state.tracks.map((track) => {
          if (track.id === state.currentTrackId) {
            return {
              ...track,
              effects: track.effects.filter(
                (effect) => effect.id !== action.id,
              ),
            };
          }

          return track;
        }),
      };

    default:
      throw new Error();
  }
}