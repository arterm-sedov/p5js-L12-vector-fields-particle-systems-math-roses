class Particle
{
	constructor()
	{
		this.pos = createVector(0,0,0);
		this.acc = createVector(0,0,0);
		this.vel = createVector(0,0,0);
		this.color = color (this.pos.x/4 - this.pos.y/4, 100, 100, 10);

		this.n = int(random(1,9));
		this.d = int(random(1,9));
	

		this.isRespectBounds = false;

		this.maxSpeed = 5;
		
		this.radius = 15;
	}

	update()
	{
		this.vel.add (this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add (this.vel);
		
		this.acc.mult(0);

		if (this.isRespectBounds) this.bounceBounds();
		else this.wrapBounds();
	}

	display()
	{

		push();

		

		translate(this.pos.x, this.pos.y, this.pos.z);
		//rotate(radians(10));
		//fill(this.pos.x/4 - this.pos.y/4, 100, 100, 10);
		this.color = color (this.pos.x/4 - this.pos.y/4, 100, 100, 50);
	//	circle(0,0, this.radius*2);
		this.drawRose(0,0,this.radius*2, this.n, this.d, 25, this.color);

		pop();
	}

	setPosition(_vec)
	{
		this.pos = _vec;
	}

	setRespectBounds(_value)
	{
		this.isRespectBounds = _value;
	}



	applyForce(_f)
	{

	this.acc.add(_f);
	
	}

	wrapBounds()
	{

		if(this.pos.x > width) this.pos.x = 0;
		if(this.pos.x < 0) this.pos.x = width;

		if(this.pos.y > height) this.pos.y = 0;
		if(this.pos.y < 0) this.pos.y = height;
	
	}

	bounceBounds()
	{
		if(this.pos.x > width - this.radius)
		{
			this.vel.x = -this.vel.x;
			this.pos.x = width - this.radius;
		}

		if(this.pos.x < this.radius)
		{
			this.vel.x = -this.vel.x;
			this.pos.x = this.radius;
		}


		if(this.pos.y > height - this.radius)
		{
			this.vel.y = -this.vel.y;
			this.pos.y = height - this.radius;
		}

		if(this.pos.y < this.radius)
		{
			this.vel.y = -this.vel.y;
			this.pos.y = this.radius;
		}
	}

	drawRose(x, y, radius, n, d, stepAngle, _color)
	{

		push();

		translate (x, y); 
		scale(1);
		var k = n/d;
		
		noFill(_color);
		stroke(_color);
		strokeWeight(1);
		beginShape();


		for (var angle = 0; angle < radians(360)*d; angle+=radians(stepAngle)) 

			{
			var r = radius*cos(k*angle)
			var roseX = r*cos(angle);
			var roseY = r*sin(angle);
			vertex(roseX, roseY);
	
			}

		endShape(CLOSE);

		pop();

	}
}


class VectorField

{
	constructor(_res)
	{
		this.cells = new Array(_res);

		for (var i = 0; i < this.cells.length; i++) 
		{
			this.cells[i] = new Array (_res);

			for (var j = 0; j < this.cells.length; j++) 
			{
				this.cells[i][j] = createVector(1, 0, 0);
		   	}
	   	}

	   	this.xSize = width/_res;
	   	this.ySize = height/_res;

	}

	display()
	{
		for(var i=0; i<this.cells.length; i++)
		{

			for(var j=0; j<this.cells[i].length; j++)
			{
				push();
				stroke (160, 100, 100);
				
				translate(i*this.xSize, j*this.ySize);

				line(0,0, this.cells[i][j].x * this.xSize * 0.8, 
						  this.cells[i][j].y * this.ySize * 0.8)
				
				pop();
			}
		}
	}

	getForceAt(_pos)
	{
		var i = Math.floor(_pos.x/this.xSize);

		var j = Math.floor(_pos.y/this.ySize);

		if (i == this.cells.length)
		{
			i--;
		}
		if (j == this.cells[i].length)
		{
			j--;
		}

		return this.cells[i][j];
	}


	fillVectorField()
	{
		for(var i=0; i<this.cells.length; i++)
		{
			for(var j=0; j<this.cells[i].length; j++)

				{
					this.cells[i][j].rotate(i*0.1 + j * 0.1);

				}
		}
	}


}

