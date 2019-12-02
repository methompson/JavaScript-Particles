# JavaScript Particles
**Simulate particles in an HTML5 Canvas Element using JavaScript**

This framework allows for the creation of simple 2D particle simulation systems.

As of version 0.1.0, a simple HTML interface is provded upon build, which allows the user to easily add emitters and start/pause the whole system. This project is designed to allow for all particle components to be modular. The system has the following main components:

## Canvas Controller
The canvas controller attaches to a canvas DOM element, maintains the main event loop and holds all instances of forces and particle emitters.

## Particle Emitter
The particle emitter maintains a quantity of particle objects. Its job is to "emit" the particles and apply forces to individual particles.

## Forces
There are several different forces available. Each force affects a particle's velocity vector to dictate how it moves in the 2D system.

## Installation
---

Installation of the default system is relatively simple. This project requires Node.js be installed on your system to develop and build the project.

1. Clone the git repo on to your computer
1. Navigate into the newly create repo folder
1. Run `npm run-script start` to being the development server or
1. Run `npm run-script build` to build the project into the dist folder.

## Usage
---

A canvas element is required to render the particles. The core of the particle framework utilizes a single canvas controller for each canvas. While it's technically possible to attach two canvas controllers to a single canvas, it's unlikely the results would work well as each controller would fight with the other(s) to draw and clear the particles.

A canvas controller works with a single canvas HTML element. When you supply width and height, the size of the canvas element will resize to that size.

`CanvasController(canvasDomElement, width, height);`

You need to instantiate the canvas controller using JS's new syntax. It accepts a canvas dom element, the height of the canvas and the width of the canvas. E.g.:

```
const canvas = document.getElementById('canvasElement');
const controller = new CanvasController(canvas, 400, 400);
```

Particle emitters need to be instantiated using JS's new syntax. maxParticles refers to the total amount of particles this emitter handles. positionX and positionY refer to the position of the emitter on the canvas. canvasWidth and canvasHeight refer to the dimensions of the canvas (used for keeping track of whether particles are within the canvas or outside.) Options is an object containing options for the emitter.

`ParticleEmitter(maxParticles, positionX, positionY, canvasWidth, canvasHeight, options)`

The emitter needs to be registered with the canvas controller to actually show up.

```
const emitter = new ParticleEmitter(400, 200, 200, controller.canvasWidth, controller.canvasHeight);
controller.registerEmitter(emitter);
```

A force applies a transform on a particle's velocity affecting how it moves. There are a variety of forces that can be instantiated and applied to particle emitters. Each type of force has its own class and is instantiated using JS's new syntax. For each force type, refer to the documentation.

Each force needs to be instantiated, registered with the canvas controller, then registered with the emitters on which it applies. Each emitter and force have a unique ID that is generated upon instantiation. The Ids are used to identify each individual force and emitter. Registering a force with an emitter requires the force id and emitter id be used to identify the specific force and emitter. You can access the ids of each by accessing the id key of each respective object.

```
const g = new GravityForce(98);
controller.registerForce(g);
controller.registerForceWithEmitter(g.id, emitter.id)l;
```

To start a particle simulation, you can use the start method on the canvas controller

`controller.start()`

If you need to pause the simulation, you can use the togglePause method to both pause the simulation.

`controller.togglePause()`

To resume a simulation, you can use either the start or togglePause methods. Pausing the simulation will maintain the current state of the particles and continue the simulation after.

## TODOs

The following is a list of things to implement for future versions:

* Implementation of RepulseForce
* Implementation of AttractForce
* Implementation of WindForce
* Implementation of SlowdownForce
* Reset method for Particle Emitter to clear all particles and start from beginning
* Reset method for canvas controller to reset all particle emitters
* Canvas controller option to switch between 'realtime' simulation and discrete frame simulation (i.e. the simulation is for a consistent frame time slice).
* Re-factoring class instantiations for Particle Emitters to reduce constructor parameters.
* Adding emitter options to affect particle instantiation (e.g. initial distance from emitter, initial direction, random velocity parameters, etc.) 