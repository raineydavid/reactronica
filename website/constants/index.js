export const instrumentConfig = {
  ukulele: {
    strings: [
      // Reversed for layout purposes
      'a5',
      'e5',
      'c5',
      'g5',
    ],
  },
  guitar: {
    strings: ['e6', 'b6', 'g6', 'd5', 'a5', 'e5'],
  },
  piano: {
    rangeStart: 'c0',
    rangeEnd: 'b7',
  },
};

// TODO: Change to something else? Or create function to get notes.
export const midiNotes = [
  'C0',
  'C#0',
  'D0',
  'D#0',
  'E0',
  'F0',
  'F#0',
  'G0',
  'G#0',
  'A0',
  'A#0',
  'B0',
  'C1',
  'C#1',
  'D1',
  'D#1',
  'E1',
  'F1',
  'F#1',
  'G1',
  'G#1',
  'A1',
  'A#1',
  'B1',
  'C2',
  'C#2',
  'D2',
  'D#2',
  'E2',
  'F2',
  'F#2',
  'G2',
  'G#2',
  'A2',
  'A#2',
  'B2',
  'C3',
  'C#3',
  'D3',
  'D#3',
  'E3',
  'F3',
  'F#3',
  'G3',
  'G#3',
  'A3',
  'A#3',
  'B3',
  'C4',
  'C#4',
  'D4',
  'D#4',
  'E4',
  'F4',
  'F#4',
  'G4',
  'G#4',
  'A4',
  'A#4',
  'B4',
  'C5',
  'C#5',
  'D5',
  'D#5',
  'E5',
  'F5',
  'F#5',
  'G5',
  'G#5',
  'A5',
  'A#5',
  'B5',
  'C6',
  'C#6',
  'D6',
  'D#6',
  'E6',
  'F6',
  'F#6',
  'G6',
  'G#6',
  'A6',
  'A#6',
  'B6',
  'C7',
  'C#7',
  'D7',
  'D#7',
  'E7',
  'F7',
  'F#7',
  'G7',
  'G#7',
  'A7',
  'A#7',
  'B7',
];

// GRRR, lots of things break if uppercase notes are used.
// Temporary fix
export const midiNotesLowerCase = [
  'c0',
  'c#0',
  'd0',
  'd#0',
  'e0',
  'f0',
  'f#0',
  'g0',
  'g#0',
  'a0',
  'a#0',
  'b0',
  'c1',
  'c#1',
  'd1',
  'd#1',
  'e1',
  'f1',
  'f#1',
  'g1',
  'g#1',
  'a1',
  'a#1',
  'b1',
  'c2',
  'c#2',
  'd2',
  'd#2',
  'e2',
  'f2',
  'f#2',
  'g2',
  'g#2',
  'a2',
  'a#2',
  'b2',
  'c3',
  'c#3',
  'd3',
  'd#3',
  'e3',
  'f3',
  'f#3',
  'g3',
  'g#3',
  'a3',
  'a#3',
  'b3',
  'c4',
  'c#4',
  'd4',
  'd#4',
  'e4',
  'f4',
  'f#4',
  'g4',
  'g#4',
  'a4',
  'a#4',
  'b4',
  'c5',
  'c#5',
  'd5',
  'd#5',
  'e5',
  'f5',
  'f#5',
  'g5',
  'g#5',
  'a5',
  'a#5',
  'b5',
  'c6',
  'c#6',
  'd6',
  'd#6',
  'e6',
  'f6',
  'f#6',
  'g6',
  'g#6',
  'a6',
  'a#6',
  'b6',
  'c7',
  'c#7',
  'd7',
  'd#7',
  'e7',
  'f7',
  'f#7',
  'g7',
  'g#7',
  'a7',
  'a#7',
  'b7',
];

//e d# e d# e b d c a,
//c e a b, e a b c;
export const defaultPianoGrid = [
  { step: 0, note: 'e3' },
  { step: 1, note: 'd#3' },
  { step: 2, note: 'e3' },
  { step: 3, note: 'd#3' },
  { step: 4, note: 'e3' },
  { step: 5, note: 'b2' },
  { step: 6, note: 'd3' },
  { step: 7, note: 'c3' },
  { step: 8, note: 'a2' },
  { step: 9, note: 'c2' },
  { step: 10, note: 'e2' },
  { step: 11, note: 'a2' },
  { step: 12, note: 'b2' },
  { step: 13, note: 'e2' },
  { step: 14, note: 'a2' },
  { step: 15, note: 'b2' },
  // { step: 16, note: 'c3'},
];

export const defaultUkeGrid = [
  // A String
  [
    {
      step: 1,
      duration: 2,
      note: 'c6',
      // ukeString: 0 - Put string info in each noteObject?
      // guitarString: 1
    },
    {
      step: 4,
      duration: 2,
      note: 'c6',
    },
    {
      step: 9,
      duration: 2,
      note: 'c6',
    },
    {
      step: 12,
      duration: 2,
      note: 'c6',
    },
  ],
  // E String
  [
    {
      step: 0,
      duration: 2,
      note: 'e5',
    },
    {
      step: 3,
      duration: 2,
      note: 'e5',
    },
    {
      step: 6,
      duration: 2,
      note: 'e5',
    },
    {
      step: 8,
      duration: 2,
      note: 'f5',
    },
    {
      step: 11,
      duration: 2,
      note: 'f5',
    },
    {
      step: 14,
      duration: 2,
      note: 'f5',
    },

    // 3rd Bar
    // {
    //   step: 16 + 0,
    //   duration: 2,
    //   note: 'e5',
    // },
    // {
    //   step: 16 + 3,
    //   duration: 2,
    //   note: 'e5',
    // },
    // {
    //   step: 16 + 6,
    //   duration: 2,
    //   note: 'e5',
    // },
    // {
    //   step: 16 + 8,
    //   duration: 2,
    //   note: 'f5',
    // },
    // {
    //   step: 16 + 11,
    //   duration: 2,
    //   note: 'f5',
    // },
    // {
    //   step: 16 + 14,
    //   duration: 2,
    //   note: 'f5',
    // },
  ],
  // C String
  [],
  // G String
  [
    {
      step: 2,
      duration: 2,
      note: 'g5',
    },
    {
      step: 5,
      duration: 2,
      note: 'g5',
    },
    {
      step: 7,
      duration: 2,
      note: 'g5',
    },
    {
      step: 10,
      duration: 2,
      note: 'g5',
    },
    {
      step: 13,
      duration: 2,
      note: 'g5',
    },
    {
      step: 15,
      duration: 2,
      note: 'g5',
    },
  ],
];

// Test
export const defaultUkeGrid2 = [
  {
    step: 1,
    duration: 2,
    note: 'c6',
    ukulele: {
      string: 'a5',
    },
  },
  {
    step: 4,
    duration: 2,
    note: 'c6',
    ukulele: {
      string: 'a5',
    },
  },
  {
    step: 9,
    duration: 2,
    note: 'c6',
    ukulele: {
      string: 'a5',
    },
  },
  {
    step: 12,
    duration: 2,
    note: 'c6',
    ukulele: {
      string: 'a5',
    },
  },
  {
    step: 0,
    duration: 2,
    note: 'e5',
    ukulele: {
      string: 'e5',
    },
  },
  {
    step: 3,
    duration: 2,
    note: 'e5',
    ukulele: {
      string: 'e5',
    },
  },
  {
    step: 6,
    duration: 2,
    note: 'e5',
    ukulele: {
      string: 'e5',
    },
  },
  {
    step: 8,
    duration: 2,
    note: 'f5',
    ukulele: {
      string: 'e5',
    },
  },
  {
    step: 11,
    duration: 2,
    note: 'f5',
    ukulele: {
      string: 'e5',
    },
  },
  {
    step: 14,
    duration: 2,
    note: 'f5',
    ukulele: {
      string: 'e5',
    },
  },
  {
    step: 2,
    duration: 2,
    note: 'g5',
    ukulele: {
      string: 'g5',
    },
  },
  {
    step: 5,
    duration: 2,
    note: 'g5',
    ukulele: {
      string: 'g5',
    },
  },
  {
    step: 7,
    duration: 2,
    note: 'g5',
    ukulele: {
      string: 'g5',
    },
  },
  {
    step: 10,
    duration: 2,
    note: 'g5',
    ukulele: {
      string: 'g5',
    },
  },
  {
    step: 13,
    duration: 2,
    note: 'g5',
    ukulele: {
      string: 'g5',
    },
  },
  {
    step: 15,
    duration: 2,
    note: 'g5',
    ukulele: {
      string: 'g5',
    },
  },
];

// Not used yet
export const baseNotes = [
  'c',
  'c#',
  'd',
  'd#',
  'e',
  'f',
  'f#',
  'g',
  'g#',
  'a',
  'a#',
  'b',
];
