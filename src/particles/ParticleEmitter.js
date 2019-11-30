import {Particle} from './Particle.js';
import {randomNum} from '../utils.js';
import {GravityForce} from './forces/GravityForce.js'
// import {uuidv4} from 'uuid/v4';
const uuidv4 = require('uuid/v4');

class ParticleEmitter {
  constructor(maxParticles = 50, posX = 0, posY = 0, canvasWidth = 0, canvasHeight = 0){
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.particles = {};
    this.maxParticles = maxParticles;

    this.forces = [];
    const g = new GravityForce( 98 );
    this.forces.push( g );

    this.posX = posX;
    this.posY = posY;

    this.makeParticles(this.maxParticles);
  }

  // Check whether points are out of bounds
  checkParticles(){
    const particlesToRemove = [];
    Object.keys(this.particles).forEach( (id) => {
      const particle = this.particles[id];
      // if particle is out of bounds, add to particles to remove array
      if (    particle.posX > this.canvasWidth
          ||  particle.posX < 0
          ||  particle.posY > this.canvasHeight
          ||  particle.posY < 0
      ) {
        particlesToRemove.push(id);
      }
    });

    if (particlesToRemove.length > 0){

      // We reverse the particles to remove array so that the earlier splices don't
      // affect the later position splices.
      // const parts = particlesToRemove.sort().reverse();

      particlesToRemove.forEach((id) => {
        delete this.particles[id];;
      });
    }
  }

  makeParticles(numParticles = 0){
    for (let i = 0; i < numParticles; ++i){
      let velocityX = randomNum(-100, 100);
      let velocityY = randomNum(-100, 100);

      // We need to make sure that the velocity isn't 0, or else the particle will not move.
      velocityX = velocityX == 0 ? 1 : velocityX;
      velocityY = velocityY == 0 ? 1 : velocityY;

      this.particles[uuidv4()] = new Particle(this.posX, this.posY, velocityX, velocityY);
    }
  }

  // This method will do the following in this order:
  // - Move each particle based upon their current location and velocity
  // - Determine which particles are out of bounds and remove them from the particle list
  // - Add new particles to bring the Total Particles value up to Max Particles value 
  iterateParticles(now, lastIteration){
    if (lastIteration === 0 ){
      return;
    }

    Object.keys(this.particles).forEach((id) => {
      const particle = this.particles[id];

      this.applyForces(particle, now, lastIteration);

      let travelX = (particle.velocityX / 1000) * (now - lastIteration);
      let travelY = (particle.velocityY / 1000) * (now - lastIteration);
      particle.posX += travelX;
      particle.posY += travelY;
    });

    this.checkParticles();

    if (this.maxParticles != Object.keys(this.particles).length){
      this.makeParticles(this.maxParticles - Object.keys(this.particles).length);
    }
  }

  applyForces(particle, now, lastIteration){
    this.forces.forEach( (f) => {
      f.affectParticle(particle, now, lastIteration);
    });
  }
};

export {
  ParticleEmitter,
};