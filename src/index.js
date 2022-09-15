import $ from 'jquery';
import { gsap } from 'gsap';

const colourPairs = [
  ['1F11CE', 'E52B2B'],
  ['FFFF00', 'FF3B00'],
  ['0000FF', '008000'],
  ['8BC34A', '9C27B0'],
  ['F44336', '009688'],
  ['2196F3', '673AB7'],
];

const hoverdelay = 150;
let hoverLastAction = 0;

function weightedRandom(max, bellFactor) {
  let num = 0;
  for (let i = 0; i < bellFactor; i += 1) {
    num += Math.random() * (max / bellFactor);
  }
  return num;
}

function encodeSVG(data) {
  return data
    .replace(/"/g, "'")
    .replace(/>\s{1,}</g, '><')
    .replace(/\s{2,}/g, ' ')
    .replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
}

function customizeDrop(dropId) {
  const rndmStart = Math.floor(weightedRandom(125, 1)) - 50;
  const rndmScale = Math.floor(Math.random() * (200 - 50 + 1) + 50);
  const rndmGradient = Math.floor(Math.random() * (5 - 0 + 1) + 0);
  const rndmDelay = weightedRandom(4, 0.5);
  const drop = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='200' height='50'><defs><linearGradient id='a'><stop offset='0%' stop-color='#${colourPairs[rndmGradient][0]}' /><stop offset='25%' stop-color='#${colourPairs[rndmGradient][1]}' /><stop offset='50%' stop-color='#${colourPairs[rndmGradient][0]}' /><stop offset='75%' stop-color='#${colourPairs[rndmGradient][1]}' /></linearGradient><linearGradient id='c'><stop offset='0%' stop-color='#fff' stop-opacity='0' /><stop offset='25%' stop-color='#fff'><animate attributeName='stop-opacity' dur='1s' repeatCount='indefinite' values='.25; .15; 0; 0' /></stop><stop offset='50%' stop-color='#fff'><animate attributeName='stop-opacity' dur='1s' repeatCount='indefinite' values='.75; .5; .25; 0' /></stop><stop offset='75%' stop-color='#fff'><animate attributeName='stop-opacity' dur='1s' repeatCount='indefinite' values='1; .75; .5; .25' /></stop><stop offset='100%' stop-color='#fff' stop-opacity='1' /></linearGradient><path id='d' fill='none' stroke='url(#a)' stroke-width='4' d='M0 25q25 5 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0' mask='url(#b)' /><mask id='b'><path fill='url(#c)' d='M0 0h600v50H0z' /></mask></defs><use xlink:href='#d'><animate attributeName='x' dur='1s' from='0' repeatCount='indefinite' to='-300' /></use></svg>`;
  $(`#${dropId}`).removeAttr('style');
  $(`#${dropId}`).outerHeight();
  $(`#${dropId}`).css({
    position: 'absolute',
    scale: rndmScale,
    top: -50,
    left: `${rndmStart}%`,
    animation: `drop 4s linear ${rndmDelay}s `,
  });
  $(`#${dropId}`).attr('src', `data:image/svg+xml,${encodeSVG(drop)}`);
}

function makeItRain() {
  for (let i = 0; i < 25; i++) {
    $('#rain-zone').append(`<img id="drop-${i + 1}" />`);
    customizeDrop(`drop-${i + 1}`);
  }
}

$('#rain-zone').on('animationend', 'img', (e) => {
  customizeDrop(e.currentTarget.id);
});

$('.button-expand').on('mouseenter mouseleave', (e) => {
  const selector = e.currentTarget.attributes.name.value;
  const now = new Date().getTime();
  hoverLastAction = now;
  window.setTimeout(() => {
    if (hoverLastAction === now) {
      if (e.handleObj.origType === 'mouseenter') {
        gsap.to(`#${selector}-content`, {
          flexGrow: 1,
          duration: 0.75,
          ease: 'Power4.easeOut',
        });
      } else {
        gsap.to(`#${selector}-content`, {
          flexGrow: 0,
          duration: 0.25,
          ease: 'Power4.easeOut',
        });
      }
    }
  }, hoverdelay);
});

setTimeout(() => {
  makeItRain();
}, 1500);
