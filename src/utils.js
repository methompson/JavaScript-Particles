// Produces a random integer between min & max, inclusive
function randomNum(min, max){
  const dif = (max + 1) - min;
  let rand = Math.floor(Math.random() * Math.floor(dif));
  rand = rand + min;
  return rand;
}

export {
  randomNum,
};