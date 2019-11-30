import ForceInterface from "./BaseForce.js";

class GravityForce extends ForceInterface {
  constructor(gForce = -9.8){
    this.gForce = gForce;
  };

  affectParticle(particle, now, lastIteration){

  };
};

export {
  GravityForce,
};