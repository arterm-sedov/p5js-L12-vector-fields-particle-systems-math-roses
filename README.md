# p5js-L12-vector-fields-particle-systems-math-roses

## Vector Fields + Particle Systems + Math Roses

### Creative coding experiments with p5.js framework

The following library is necessary for these scripts to work: p5.min.js
https://github.com/processing/p5.js

CCapture.all.min.js library is only needed to record the frames.
https://github.com/spite/ccapture.js

The p5.svg.js and p5.dom.min.js libraries connected in the index.html are optional for SVG output.
https://github.com/zenozeng/p5.js-svg

Mouse movement influences the vector field.

Also experiment with the following parameters on particles.js:

In the Particle class constructor:

	this.n = int(random(1,9));
	this.d = int(random(1,9));
	this.isRespectBounds = false;
	this.maxSpeed = 5;
	this.radius = 15;

In the Particle class drawRose function:

	scale(1)
	strokeWeight(1)
