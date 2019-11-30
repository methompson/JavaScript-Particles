// We're just making the basic canvas in the app for now.

const buttonContainer = document.createElement('div');

const startBtn = document.createElement('button');
startBtn.id = 'startBtn';
startBtn.innerText = "Start";

const pauseBtn = document.createElement('button');
pauseBtn.id = 'pauseBtn';
pauseBtn.innerText = "Pause/Unpause";

buttonContainer.appendChild(startBtn);
buttonContainer.appendChild(pauseBtn);

const canvas = document.createElement('canvas');
canvas.classList.add('canv');
canvas.id = 'canv';
canvas.width = 200;
canvas.height = 200;

const appContainer = document.getElementById('app');

app.appendChild(buttonContainer);
app.appendChild(canvas);