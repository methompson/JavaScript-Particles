import {CanvasController} from "./particles/CanvasController.js";
import {GravityForce} from "./particles/forces/GravityForce.js";
import './styles/main.css';

const canvas = document.getElementById('canv');
let controller;

if (canvas.getContext){
  controller = new CanvasController(canvas, 400, 400);
  controller.addEmitter(400, 200, 200);
  controller.addEmitter(500, 50, 50);
  // controller.addEmitter(5000, 300, 300);
  
  const g = new GravityForce( 98 );
  controller.registerForce(g);

  Object.keys(controller.emitters).forEach((emitterId) => {
    controller.registerForceWithEmitter(g.id, emitterId);
  });

}

document.getElementById('startBtn').addEventListener('click', () => {
  if (controller){
    controller.start();

    setTimeout(() => {
      Object.keys(controller.emitters).forEach((emitterId) => {
        Object.keys(controller.forces).forEach((forceId) => {
          // controller.unregisterForceFromEmitter(forceId, emitterId);
        });        
      });
    }, 3000);
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  controller.togglePause();
});