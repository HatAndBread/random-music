import * as Tone from 'tone';
import passesTypeCheck from './lib/typecheck';

let audioIsReady = false;

const player = new Tone.Player().toDestination();

const initializeButton = () => {
  const button = document.getElementById('start-btn');
  button.addEventListener('click', () => {
    audioIsReady = true;
  });
};
const initializePlayButton = () => {
  document.getElementById('play-btn').addEventListener('click', () => {
    if (audioIsReady) player.start();
  });
};
initializeButton();
initializePlayButton();
const repeat = (howManyTimes, callback) => {
  if (!passesTypeCheck({ number: howManyTimes, function: callback })) return;

  for (let i = 0; i < howManyTimes; i++) {
    callback();
  }
};
const randomInRange = (min, max) => Math.random() * (max - min) + min;

const createRandomizedArray = (length, range) => {
  // if (!passesTypeCheck({ number: length, array: range })) return;

  const arr = [];
  repeat(length, () => arr.push(randomInRange(range[0], range[1])));
  console.log(arr);
  return Float32Array.from(arr);
};

const audioBuffer = new Tone.ToneAudioBuffer().fromArray(
  createRandomizedArray(111550, [-0.5, 0.5254])
);

player.buffer = audioBuffer;
console.log(audioBuffer);
