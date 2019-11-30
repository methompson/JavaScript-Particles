import {CanvasController} from "./particles/CanvasController.js";
import './styles/main.css';

const canvas = document.getElementById('canv');
let controller;
if (canvas.getContext){
  controller = new CanvasController(canvas, 400, 400);
  controller.addEmitter(400, 200, 200);
  controller.addEmitter(500, 50, 50);
  controller.addEmitter(5000, 300, 300);
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (controller){
    controller.start();
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  controller.togglePause();
});