//const $ = require("jquery");
$("#rain-zone").on("animationend", "img", (e) => {
   customizeDrop(e.target.id);
});

$(".tech-box").on("mouseenter", (e) => {
   console.log(e.currentTarget.id);
   $(`#${e.currentTarget.id}`).css({ height: "" });
   gsap.to(`#${e.currentTarget.id}-content`, {
      flexGrow: 1,
      duration: 0.75,
      ease: Power4.easeOut,
   });
});

$(".tech-box").on("mouseleave", (e) => {
   console.log(e.currentTarget.id);
   gsap.to(`#${e.currentTarget.id}-content`, {
      flexGrow: 0,
      duration: 0.25,
      ease: Power4.easeOut,
      onComplete: () => {
         $(`#${e.currentTarget.id}`).css({ height: "fit-content" });
      },
      onCompleteParams: e,
   });
});

var colour_pairs = [
   ["1F11CE", "E52B2B"],
   ["FFFF00", "FF3B00"],
   ["0000FF", "008000"],
   ["8BC34A", "9C27B0"],
   ["F44336", "009688"],
   ["2196F3", "673AB7"],
];

function weightedRandom(max, bellFactor) {
   let num = 0;
   for (let i = 0; i < bellFactor; i++) {
      num += Math.random() * (max / bellFactor);
   }
   return num;
}

function encodeSVG(data) {
   data = data.replace(/"/g, `'`);
   data = data.replace(/>\s{1,}</g, `><`);
   data = data.replace(/\s{2,}/g, ` `);
   return data.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
}

var makeItRain = function () {
   for (let i = 0; i < 25; i++) {
      $("#rain-zone").append(`<img id="drop-${i + 1}" />`);
      customizeDrop(`drop-${i + 1}`);
   }
};

function customizeDrop(dropId) {
   let rndmStart = Math.floor(weightedRandom(125, 1)) - 50;
   let rndmScale = Math.floor(Math.random() * (200 - 50 + 1) + 50);
   let rndmGradient = Math.floor(Math.random() * (5 - 0 + 1) + 0);
   let rndmDelay = weightedRandom(4, 0.5);
   let drop =
      "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='200' height='50'><defs><linearGradient id='a'><stop offset='0%' stop-color='#" +
      colour_pairs[rndmGradient][0] +
      "' /><stop offset='25%' stop-color='#" +
      colour_pairs[rndmGradient][1] +
      "' /><stop offset='50%' stop-color='#" +
      colour_pairs[rndmGradient][0] +
      "' /><stop offset='75%' stop-color='#" +
      colour_pairs[rndmGradient][1] +
      "' /></linearGradient><linearGradient id='c'><stop offset='0%' stop-color='#fff' stop-opacity='0' /><stop offset='25%' stop-color='#fff'><animate attributeName='stop-opacity' dur='1s' repeatCount='indefinite' values='.25; .15; 0; 0' /></stop><stop offset='50%' stop-color='#fff'><animate attributeName='stop-opacity' dur='1s' repeatCount='indefinite' values='.75; .5; .25; 0' /></stop><stop offset='75%' stop-color='#fff'><animate attributeName='stop-opacity' dur='1s' repeatCount='indefinite' values='1; .75; .5; .25' /></stop><stop offset='100%' stop-color='#fff' stop-opacity='1' /></linearGradient><path id='d' fill='none' stroke='url(#a)' stroke-width='4' d='M0 25q25 5 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0' mask='url(#b)' /><mask id='b'><path fill='url(#c)' d='M0 0h600v50H0z' /></mask></defs><use xlink:href='#d'><animate attributeName='x' dur='1s' from='0' repeatCount='indefinite' to='-300' /></use></svg>";

   $(`#${dropId}`).removeAttr("style");
   $(`#${dropId}`).outerHeight();
   $(`#${dropId}`).css({
      position: "absolute",
      scale: rndmScale,
      top: -50,
      left: rndmStart + "%",
      animation: "drop 4s linear " + rndmDelay + "s ",
   });
   $(`#${dropId}`).attr("src", "data:image/svg+xml," + encodeSVG(drop));
}

setTimeout(() => {
   makeItRain();
}, 1500);
