import {Particle} from './Particle.js';
import {randomNum} from '../utils.js';
import {ForceInterface} from './forces/BaseForce.js'
import * as uuidv4 from 'uuid/v4.js';
// const uuidv4 = require('uuid/v4');

class ParticleEmitter {
  constructor(maxParticles = 50, posX = 0, posY = 0, canvasWidth = 0, canvasHeight = 0){
    this.id = uuidv4();
    
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.particles = {};
    this.maxParticles = maxParticles;

    this.forces = {};
    // const g = new GravityForce( 98 );
    // this.forces.push( g );

    this.posX = posX;
    this.posY = posY;

    this.makeParticles(this.maxParticles);
  }

  // Check whether points are out of bounds
  checkParticleBoundaries(){
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

      particlesToRemove.forEach((id) => {
        // We're checking if the total particles exceed the max particles.
        // If the total particles exeeds max particles, we delete the particle
        // entry in the object. Otherwise, we just create a new particle
        // and insert it into the old particle's object id. This saves us
        // a little time above with generating a new UUID or running the delete command
        if (Object.keys(this.particles).length > this.maxParticles){
          delete this.particles[id];
        } else {
          this.particles[id] = this.makeRandomParticle();
        }
      });
    }
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

  unregisterForce(forceId){

    if (!(forceId in this.forces)){
      return;
    }

    delete this.forces[forceId];

  }

  makeRandomParticle(){
    let velocityX = randomNum(-100, 100);
    let velocityY = randomNum(-100, 100);

    // We need to make sure that the velocity isn't 0, or else the particle will not move.
    velocityX = velocityX == 0 ? 1 : velocityX;
    velocityY = velocityY == 0 ? 1 : velocityY;

    return new Particle(this.posX, this.posY, velocityX, velocityY);
  }

  makeParticles(numParticles = 0){
    for (let i = 0; i < numParticles; ++i){
      this.particles[uuidv4()] = this.makeRandomParticle();
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

    this.checkParticleBoundaries();

    if (this.maxParticles != Object.keys(this.particles).length){
      this.makeParticles(this.maxParticles - Object.keys(this.particles).length);
    }
  }

  applyForces(particle, now, lastIteration){
    Object.keys(this.forces).forEach((id) => {
      this.forces[id].affectParticle(particle, now, lastIteration);
    });
  }
};

export {
  ParticleEmitter,
};