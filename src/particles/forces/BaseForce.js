import * as uuidv4 from 'uuid/v4.js';

class ForceInterface {
  constructor(){
    // We give every force instance its own unique ID
    this.id = uuidv4();
  };

  affectParticle(particle, now, lastIteration){

  };
};

export{
  ForceInterface,
};