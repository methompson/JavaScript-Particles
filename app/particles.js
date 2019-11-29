import {CanvasController} from "./particles/CanvasController.js";

const canvas = document.getElementById('canv');
let controller;
if (canvas.getContext){
  controller = new CanvasController(canvas, 400, 400);
  controller.addEmitter(400, 200, 200);
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (controller){
    controller.start();
  }
});

document.getElementById('stopBtn').addEventListener('click', () => {
  controller.togglePause();
});