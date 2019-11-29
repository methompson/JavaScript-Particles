import {ParticleEmitter} from './ParticleEmitter.js';
import {MS_BETWEEN_FRAMES} from './constants.js';

class CanvasController{
  constructor(canvas, canvasWidth = 200, canvasHeight = 200){
    this.canvas = canvas;
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.emitters = [];
    
    this.paused = false;
  }

  togglePause(){
    this.paused = !this.paused;
  }

  start(){
    this.paused = false;
    this.mainLoop();
  }

  getTimeInMS(){
    return (new Date()).getTime();
  }

  clearCanvas(){
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  };

  drawParticles(){
    const drawStartTime = (new Date()).getTime();
    const ctx = this.canvas.getContext('2d');

    this.emitters.forEach( (e) => {
      e.particles.forEach( (p) => {
        const point = new Path2D();
        point.rect(p.posX, p.posY, 1, 1);
        ctx.stroke(point);
      });
    });
  };

  iterateParticles(){
    this.emitters.forEach( (e) => {
      e.iterateParticles();
    })
  };

  mainLoop(){
    const startTime = this.getTimeInMS();
    
    this.clearCanvas();
    this.iterateParticles();
    this.drawParticles();

    const endTime = this.getTimeInMS();

    // MS_BETWEEN_FRAMES indicates total time between frames,
    // we subtract startTime from endTime to determine
    // total time spent in the loop. If total time in the
    // loop is greater than one frame, we set waitTime to 0.
    const waitTime = MS_BETWEEN_FRAMES > (endTime - startTime) ? MS_BETWEEN_FRAMES - (endTime - startTime) : 0;

    if (!this.paused){
      setTimeout( () => {
        this.mainLoop();
      }, waitTime);
    }

  }

  addEmitter(maxParticles = 50, posX = 0, posY = 0){
    const p = new ParticleEmitter(maxParticles, posX, posY, this.canvasWidth, this.canvasHeight);
    this.emitters.push(p);
  }
};

export {
  CanvasController,
}