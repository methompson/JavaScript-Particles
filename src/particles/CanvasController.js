import {ParticleEmitter} from './ParticleEmitter.js';
import {FRAME_RATE_LIMIT} from '../constants.js';
import {ForceInterface} from './forces/BaseForce.js';

class CanvasController{
  constructor(canvas, canvasWidth = 200, canvasHeight = 200){
    this.canvas = canvas;
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    
    this.emitters = {};
    this.forces = {};

    this.maxWaitTime = 1000/FRAME_RATE_LIMIT;
    this.lastIteration = 0;
    
    this.paused = true;
  }

  togglePause(){
    if (this.paused){
      this.start();
    } else {
      this.paused = true;
      this.lastIteration = 0;
    }
  }

  start(){
    if (this.paused){
      this.paused = false;
      this.mainLoop();
    }
  }

  getTimeInMS(){
    return (new Date()).getTime();
  }

  clearCanvas(){
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  registerForce(force){
    if (
          !(force instanceof ForceInterface)
      ||  !('id' in force)
    ){
      return;
    }

    this.forces[force.id] = force;
  }

  registerForceWithEmitter(forceId, emitterId){
    if (
          !(emitterId in this.emitters)
      ||  !(forceId in this.forces)
    ){
      return;
    }

    this.emitters[emitterId].registerForce( this.forces[forceId] );
  }

  unregisterForceFromEmitter(forceId, emitterId){
    if (!(emitterId in this.emitters)){
      return;
    }

    this.emitters[emitterId].unregisterForce(forceId);
  }

  drawParticles(){
    const drawStartTime = (new Date()).getTime();
    const ctx = this.canvas.getContext('2d');

    // this.emitters.forEach( (e) => {
    Object.keys(this.emitters).forEach((emitterId) => {
      const particles = this.emitters[emitterId].particles
      Object.keys(particles).forEach((id) => {
        const p = particles[id];
        const point = new Path2D();
        point.rect(p.posX, p.posY, 1, 1);
        ctx.stroke(point);
      });
    });
  }

  iterateParticles(now){
    Object.keys(this.emitters).forEach((id) => {
      this.emitters[id].iterateParticles(now, this.lastIteration);
    });
  }

  getNow(){
    return (new Date()).getTime();
  }

  mainLoop(){

    // We will run the time based upon the time elapsed between the previous loop
    // and right now.
    const beginTime = (new Date()).getTime();

    // We'll prevent weirdness when the lastIteration time is 0 and prevent
    // relying on the particles to figure this out.
    if (this.lastIteration == 0 && this.paused != true){
      this.lastIteration = this.getNow();
      setTimeout(() => {
        this.mainLoop();
      }, this.maxWaitTime);

      return;
    }

    this.clearCanvas();    
    this.iterateParticles(beginTime);
    this.drawParticles();

    // We use this to avoid race conditions. If we set pause, there's no guarantee
    // that this function won't have already started. We don't want lastIteration
    // to be reset past this point.
    if (this.paused){
      return;
    }

    // We want to know how much time has passed since this frame has started.
    const timeElapsed = this.getNow() - beginTime;

    // We let this function run up to 120fps. We check how long the function has run.
    // If the function ran less time than a single MAX_FRAME_RATE frame, then we set
    // the time remaining to a single MAX_FRAME_RATE frame, minus time elapsed.
    // Otherwise, we set the time to 0 and run the next frame immediately.
    const waitTime = timeElapsed > this.maxWaitTime ? 0 : this.maxWaitTime - timeElapsed;

    this.lastIteration = beginTime;
  
    setTimeout( () => {
      this.mainLoop();
    }, waitTime);

  }

  addEmitter(maxParticles = 50, posX = 0, posY = 0){
    const p = new ParticleEmitter(maxParticles, posX, posY, this.canvasWidth, this.canvasHeight);
    this.emitters[p.id] = p;
  }
};

export {
  CanvasController,
}