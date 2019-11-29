import {Particle} from './Particle.js';
import {FRAME_RATE_LIMIT} from './constants.js';
import {randomNum} from './utils.js';

class ParticleEmitter {
  constructor(maxParticles = 50, posX = 0, posY = 0, canvasWidth = 0, canvasHeight = 0){
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.particles = [];
    this.maxParticles = maxParticles;

    this.posX = posX;
    this.posY = posY;

    this.makeParticles(this.maxParticles);
  }

  // Check whether points are out of bounds
  checkParticles(){
    const particlesToRemove = [];
    for (let i = 0; i < this.particles.length; ++i){
      const particle = this.particles[i];
      // if particle is out of bounds, add to particles to remove array
      if (    particle.posX > this.canvasWidth
          ||  particle.posX < 0
          ||  particle.posY > this.canvasHeight
          ||  particle.posY < 0
      ) {
        particlesToRemove.push(i);
      }
    }

    if (particlesToRemove.length > 0){

      // We reverse the particles to remove array so that the earlier splices don't
      // affect the later position splices.
      const parts = particlesToRemove.sort().reverse();

      for (let i = 0; i < parts.length; ++i){
        const p = this.particles 
        // remove each particle with the splice command
        this.particles.splice(parts[i], 1);
      }
    }
  }

  makeParticles(numParticles = 0){
    for (let i = 0; i < numParticles; ++i){
      let velocityX = randomNum(-100, 100);
      let velocityY = randomNum(-100, 100);

      // We need to make sure that the velocity isn't 0, or else the particle will not move.
      velocityX = velocityX == 0 ? 1 : velocityX;
      velocityY = velocityY == 0 ? 1 : velocityY;

      this.particles.push(
        new Particle(this.posX, this.posY, velocityX, velocityY)
      );
    }
  }

  // This method will do the following in this order:
  // - Move each particle based upon their current location and velocity
  // - Determine which particles are out of bounds and remove them from the particle list
  // - Add new particles to bring the Total Particles value up to Max Particles value 
  iterateParticles(){
    this.particles.forEach((particle) => {
      particle.posX += particle.velocityX / FRAME_RATE_LIMIT;
      particle.posY += particle.velocityY / FRAME_RATE_LIMIT;
    });

    this.checkParticles();

    if (this.maxParticles != this.particles.length){
      this.makeParticles(this.maxParticles - this.particles.length);
    }
  }
};

export {
  ParticleEmitter,
};