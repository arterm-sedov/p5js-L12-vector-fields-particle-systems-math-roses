var PARTICLES;

var FIELD;

var RECORDING = true;
var fps = 30;
var capturer = new CCapture({ format: 'png', framerate: fps, verbose: true});

function setup()
{
	createCanvas(1080, 1080);
	colorMode(HSB, 360, 100, 100, 100);
	frameRate (fps);
	background(0);
	//blendMode(ADD);

	
	PARTICLES = new Array();
	FIELD = new VectorField(20);
	FIELD.fillVectorField();

	for(var i=0; i<40; i++)
	{
		PARTICLES[i] = new Particle();
		PARTICLES[i].setPosition(createVector(random(0,width),random(0,height)));
		PARTICLES[i].setRespectBounds(false);//(random(0,1)<0.5?false:true);
	}

capturer.start();
capturer.capture(document.getElementById('defaultCanvas0'));

}

function draw()
{	

		clear();
		background(0);


	//FIELD.display();

	var force = createVector(mouseX, mouseY);
	//var force2 = createVector(0.01, 0);

	for(var i=0; i<PARTICLES.length; i++)
	{

		PARTICLES[i].applyForce(FIELD.getForceAt(PARTICLES[i].pos));
		PARTICLES[i].applyForce(force);

		PARTICLES[i].update();
	}

	for(var i=0; i<PARTICLES.length; i++)
	{
	PARTICLES[i].display();
	}

	var newParticle = new Particle(); 
	newParticle.setPosition(createVector(random(0,width),random(0,height)));
	PARTICLES.push(newParticle);

	 if (RECORDING)
   	{
	 	console.log('capturing frame');
  		capturer.capture(document.getElementById('defaultCanvas0'));
	}

}


function keyPressed()
{

	if (RECORDING && (key == "R" || key == "r"))
	{
	capturer.stop();
	capturer.save();
	RECORDING = false;

	}
	else
	if (!RECORDING && (key == "R" || key == "r"))
	{
	capturer.start();
	new CCapture({ format: 'png', framerate: fps, verbose: true});
	RECORDING = true;
	}


    console.log('recording: ' + RECORDING);

}


// const chunks = [];
// var recorder;

// function record() {
//   chunks.length = 0;
//   let stream = document.querySelector('canvas').captureStream(30);
//     recorder = new MediaRecorder(stream);
//   recorder.ondataavailable = e => {
//     if (e.data.size) {
//       chunks.push(e.data);
//     }
//   };
//   recorder.onstop = exportVideo;

  
// }

// function exportVideo(e) {
//   var blob = new Blob(chunks, {"type":"video/mp4; codecs=h264"});
//   var vid = document.createElement('video');
//   vid.id = 'recorded'
//   vid.controls = true;
//   vid.src = URL.createObjectURL(blob);
//   document.body.appendChild(vid);
//   vid.play();
// }