import {ForceInterface} from "./BaseForce.js";

class SlowdownForce extends ForceInterface {
  constructor(){
    super();
    
  }

  affectParticle(particle, now, lastIteration){

  }
};

export {
  SlowdownForce,
};