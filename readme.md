# JavaScript Particles
**Simulate particles in an HTML5 Canvas Element using JavaScript**

This framework allows for the creation of simple 2D particle simulation systems. The framework allows the user to arbitrarily define:

* The size of the canvas
* The amount of emitters
* The amount of particles emitted from each emitter
* The position of each emitter.
* The amount of forces that affect particles
* Which forces affect which emitters.

As of version 0.1.0, a simple HTML interface is provded upon build, which allows the user to easily add emitters and start/pause the whole system.

## Installation
---

Installation of the default system is relatively simple. This project requires Node.js be installed on your system to develop and build the project.

1. Clone the git repo on to your computer
1. Navigate into the newly create repo folder
1. Run `npm run-script start` to being the development server or
1. Run `npm run-script build` to build the project into the dist folder.

## Usage
---

This project is designed to allow for all particle components to be modular. A canvas element is required to render the particles. The core of the particle framework utilizes a single canvas controller for each canvas. While it's technically possible to attach two canvas controllers to a single canvas, it's unlikely the results would work well as each controller would fight with the other(s) to draw and clear the particles.

A canvas controller is instantiated using JS's new syntax. It accepts a canvas dom element, the height of the canvas and the width of the canvas. E.g.:

`
const canvas = document.getElementById('canvasElement');
const controller = new CanvasController(canvas, 400, 400);
`