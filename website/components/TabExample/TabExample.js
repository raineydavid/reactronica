import React from 'react';
import { Song, Track, Instrument } from 'reactronica';

import Tab from '../Tab';
import { defaultUkeGrid } from '../../constants';
import { gridToSamplerSteps } from '../../lib/tabUtils';

import css from './TabExample.scss';

const TabExample = () => {
  const [grid, setGrid] = React.useState(defaultUkeGrid);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const steps = gridToSamplerSteps(grid);

  return (
    <div>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>

      <br />
      <br />

      <div className={css.tabWrapper}>
        <Tab
          grid={grid}
          currentIndex={currentIndex}
          className={css.tab}
          onUpdateGrid={(grid) => {
            setGrid(grid);
          }}
        />

        {/* ----------------------------------------------------------------- */}
        {/* AUDIO */}
        {/* ----------------------------------------------------------------- */}

        <Song isPlaying={isPlaying} tempo={90}>
          <Track
            steps={steps}
            subdivision={'8n'}
            onStepPlay={(_, i) => {
              setCurrentIndex(i);
            }}
          >
            <Instrument
              type="sampler"
              samples={{
                C4: `/static/audio/ukulele/Fluke_Uke_060.wav`,
                'C#4': `/static/audio/ukulele/Fluke_Uke_061.wav`,
                D4: `/static/audio/ukulele/Fluke_Uke_062.wav`,
                'D#4': `/static/audio/ukulele/Fluke_Uke_063.wav`,
                E4: `/static/audio/ukulele/Fluke_Uke_064.wav`,
                F4: `/static/audio/ukulele/Fluke_Uke_065.wav`,
                'F#4': `/static/audio/ukulele/Fluke_Uke_066.wav`,
                G4: `/static/audio/ukulele/Fluke_Uke_067.wav`,
                'G#4': `/static/audio/ukulele/Fluke_Uke_068.wav`,
                A4: `/static/audio/ukulele/Fluke_Uke_069.wav`,
                'A#4': `/static/audio/ukulele/Fluke_Uke_070.wav`,
                B4: `/static/audio/ukulele/Fluke_Uke_071.wav`,
                C5: `/static/audio/ukulele/Fluke_Uke_072.wav`,
                'C#5': `/static/audio/ukulele/Fluke_Uke_073.wav`,
                D5: `/static/audio/ukulele/Fluke_Uke_074.wav`,
                'D#5': `/static/audio/ukulele/Fluke_Uke_075.wav`,
                E5: `/static/audio/ukulele/Fluke_Uke_076.wav`,
                F5: `/static/audio/ukulele/Fluke_Uke_077.wav`,
                'F#5': `/static/audio/ukulele/Fluke_Uke_078.wav`,
                G5: `/static/audio/ukulele/Fluke_Uke_079.wav`,
                'G#5': `/static/audio/ukulele/Fluke_Uke_080.wav`,
                A5: `/static/audio/ukulele/Fluke_Uke_081.wav`,
                'A#5': `/static/audio/ukulele/Fluke_Uke_082.wav`,
                B5: `/static/audio/ukulele/Fluke_Uke_083.wav`,
                C6: `/static/audio/ukulele/Fluke_Uke_084.wav`,
              }}
            />
          </Track>
        </Song>
      </div>
    </div>
  );
};

export default TabExample;
