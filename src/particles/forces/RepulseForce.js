import {ForceInterface} from "./BaseForce.js";

class RepulseForce extends ForceInterface {
  constructor(){
    super();
    
  }

  affectParticle(particle, now, lastIteration){

  }
};

export {
  RepulseForce,
};