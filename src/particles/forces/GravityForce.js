import {ForceInterface} from "./BaseForce.js";

class GravityForce extends ForceInterface {
  constructor(gForce = 98){
    super();
    this.gForce = gForce;
  }

  affectParticle(particle, now, lastIteration){
    
    const timeSlice = (now - lastIteration) / 1000;
    const timeSliceGForce = this.gForce * timeSlice;
    // console.log(timeSliceGForce);

    particle.velocityY += timeSliceGForce;
    // particle.velocityY = particle.velocityY + this.gForce;
  }
};

export {
  GravityForce,
};