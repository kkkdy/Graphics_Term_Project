"use strict";
var canvas;
var gl;
var program;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var points = [];
var colors = [];

// Flag variable for our program
var result_idx = -1;
var flag_compound = -1;
var flag_element = 0;

/* Store the chemical compound's element information in 2d array*/
var compound = [
	[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //H2
	[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], //N2
	[0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //F2*
	[0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0], //O2
	[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0], //CO*
	[4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], //CH4*
	[0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0], //BF3*
	[0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0], //CO2
	[2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //H2O
	[4, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], //C2H4*
	[1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], //HCN
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0], //MgO
	[3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], //NH3
	[6, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], //C2H6*
	[4, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0], //CH3OH*
	[2, 0, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0], //H2CO3*
	[0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2], //Al2O3
	[0, 0, 0, 0, 0, 1, 0, 3, 0, 2, 0, 0], //NaCO3*
];

var compound_result = [
	"H2",
	"N2",
	"F2",
	"O2",
	"CO",
	"CH4",
	"BF3",
	"CO2",
	"H2O",
	"C2H4",
	"HCN",
	"MgO",
	"NH3",
	"C2H6",
	"CH3OH",
	"H2CO3",
	"Al2O3",
	"NaCO3",
]

// Store the input value from html(from user)
var evaluating_input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


var electroniscalesize = 5; // Size for electronic
var electroNum = [1, 2, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3]; // Number of electronic for each chemical elements
var scalesize = [37, 32, 152, 113, 88, 77, 70, 66, 64, 186, 160, 143]; // Scalesize for each chemical element (relative value)

// Scale rate for chemical elements
var scalerate = 0.002;

/* Camera view matrix variables*/
var near = 0.1;
var far = 20.0;
var radius = 4.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var  fovy = 75.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect = 1.0;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc, vLocationLoc;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);


// Mouse position
var x = 0.0;
var y = 0.0;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
	
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	/* Clear canvas */
    // canvas.width = document.body.clientWidth; //document.width is obsolete
    // canvas.height = document.body.clientHeight; //document.height is obsolete
    gl.viewport( 0, 0, canvas.width, canvas.height );
	
	aspect =  canvas.width/canvas.height;
    gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
    
    gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
	vLocationLoc = gl.getUniformLocation( program, "vLocation" );
	
	// Button EventListener -> This Button's functionality : Make chemical compound 
   document.getElementById("make").onclick = function (){
		flag_element = -1;
		// Get the value of input elements
		for(var k = 0; k < 12; k++){
			// Set input value "0" when related marker is not identified
			if(document.getElementById(eval("'"+k+"'")).style.display=="none"){
				evaluating_input[k] = 0;
			}
			// Get the value from html "input" element
			else {
				var numberOfInput = parseInt(document.getElementById(eval("'"+k+"'")).value);
				// If user do not write all input value, NaN value can make error
				if( numberOfInput == NaN)
					evaluating_input[k] = 0;
				else
					evaluating_input[k] = numberOfInput;
			}
		}
		// Evaluate the input whether we can make this compound or not
		for(var k = 0; k < 18; k++){
			if(JSON.stringify(evaluating_input)==JSON.stringify(compound[k]))
				result_idx = k
		}	
		// Not matching with compound array with inputs
		if(result_idx==-1){
			alert("Can't make the compound!"); // alert pop-up
			restart(); // Reset all variables
		}
		// We can make compound!
		else{
			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			render_compound(result_idx);
		}	
   };
}

// Function that renders the chemical elements
// This function is called when marker is idetified from webcam
// Parameter "i" is index value related for each marker
function render_element(i){
	document.getElementById(eval("'"+i+"'")).style.display="block";
	
	render_sphere(i, 0.0, 0.0, 0.0);
	render_electronic(i);
	
	if(flag_element==1)
		requestAnimFrame(render_element(i));
	
}


// Function that link to render each compound depending on parameter idx
// This function is called when user clicked "make" button
// Parameter "idx" is index value related for each chemical compound
function render_compound(idx){
	switch (idx){
		case 0 :
			flag_compound = 0;
			render_H2();
			break;
		case 1 :
			flag_compound = 1;
			render_N2();
			break;
		case 2 :
			flag_compound = 2;
			render_F2();
			break;
		case 3 :
			flag_compound = 3;
			render_O2();
			break;
		case 4 :
			flag_compound = 4;
			render_CO();
			break;
		case 5 :
			flag_compound = 5;
			render_CH4();
			break;
		case 6 :
			flag_compound = 6;
			render_BF3();
			break;
		case 7 :
			flag_compound = 7;
			render_CO2();
			break;
		case 8 :
			flag_compound = 8;
			render_H2O();
			break;
		case 9 :
			flag_compound = 9;
			render_C2H4();
			break;
		case 10 :
			flag_compound = 10;
			render_HCN();
			break;
		case 11 :
			flag_compound = 11;
			render_MgO();
			break;
		case 12 :
			flag_compound = 12;
			render_NH3();
			break;
		case 13 :
			flag_compound = 13;
			render_C2H6();
			break;
		case 14 :
			flag_compound = 14;
			render_CH3OH();
			break;
		case 15 :
			flag_compound = 15;
			render_H2CO3();
			break;
		case 16 :
			flag_compound = 16;
			render_Al2O3();
			break;
		case 17 :
			flag_compound = 17;
			render_NaCO3();
			break;
	}
}


//Function that resets all variable in our program
function restart(){
	// Clear canvas
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// Reset the values
	points = [];
	colors = [];
	
	flag_compound = -1;
	flag_element = 0;
	
	document.getElementById("get_input").reset();
	for(var k = 0; k < 12; k++){
		document.getElementById(eval("'"+k+"'")).style.display="none";
	}
	result_idx = -1;

	
}


// Function that renders the sphere using "geometry.js"
// This will be used for "render_element" and "render_compound"
// Parameter information
// idx : chemical element number(index)
// Tx, Ty, Tz : translation amount for x-axis, y-axis, z-axis
function render_sphere(idx, Tx, Ty, Tz){
	
	var mysphere = sphere(5);
	mysphere.scale(scalesize[idx] * scalerate, scalesize[idx] * scalerate, scalesize[idx] * scalerate);
	mysphere.translate(Tx, Ty, Tz);
	
	points = mysphere.TriangleVertices;
	colors = mysphere.TriangleVertexColors;
	
	phi = -x/300;
	theta = y/300;
	console.log(phi);

	radius = 0;
	eye = vec3(radius * Math.cos(theta) * Math.sin(phi), 
				radius * Math.sin(theta),
				radius * Math.cos(theta) * Math.cos(phi)); // eye point
	modelViewMatrix = lookAt(eye, at , up);
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	// send to html
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
	gl.uniform3f(vLocationLoc, position.x/10, position.y/10, - position.z/10);
	
	// draw	
    gl.drawArrays( gl.TRIANGLES, 0, points.length);
	
}


// Function that renders the cylinder using "geometry.js"
// This will be used for "render_element" and "render_compound"
// Parameter information
// Tx, Ty, Tz : translation amount for x-axis, y-axis, z-axis
// Rx, Ry, Rz : rotation amount for x-axis, y-axis, z-axis
// Sx, Sy, Sz : scale amount for x-axis, y-axis, z-axis
// angle : rotation angle
function render_cylinder(Tx, Ty, Tz, Rx, Ry, Rz, angle, Sx, Sy, Sz){
	var mycylinder = cylinder(72, 3, true);
	mycylinder.scale(Sx, Sy, Sz);
	mycylinder.rotate(angle,[Rx, Ry, Rz]);
	mycylinder.translate(Tx, Ty, Tz);
	
	points = mycylinder.TriangleVertices;
	colors = mycylinder.TriangleVertexColors;
	
	phi = -x/300;
	theta = y/300;
	console.log(phi);

	radius = 0;
	eye = vec3(radius * Math.cos(theta) * Math.sin(phi), 
				radius * Math.sin(theta),
				radius * Math.cos(theta) * Math.cos(phi)); // eye point
	modelViewMatrix = lookAt(eye, at , up);
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	// send to html
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
	gl.uniform3f(vLocationLoc, position.x/10, position.y/10, - position.z/10);
	// draw	
    gl.drawArrays( gl.TRIANGLES, 0, points.length);
}


// Function that renders the electronic(sphere) using "geometry.js"
// This will be used for "render_element"
// Parameter information
// idx : chemical element number(index) -> each element has different electronic numbers
function render_electronic(idx){
	var electronic ;
	for (var k = 0; k < electroNum[idx]; k += 1){
		console.log("electronic draw!");
		var j = k * 45 * Math.PI / 180;
		electronic = sphere(5);
		electronic.scale(electroniscalesize * scalerate,electroniscalesize * scalerate,electroniscalesize * scalerate);
		// ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
		electronic.translate (Math.sin(j) * (scalesize[k] * scalerate+ 0.05), 0.0 , Math.cos(j) * (scalesize[k] * scalerate+ 0.05));
		
		points = points.concat(electronic.TriangleVertices);
		colors = colors.concat(electronic.TriangleVertexColors);
	}
	
	phi = -x/300;
	theta = y/300;
	console.log(phi);

	radius = 0;
	eye = vec3(radius * Math.cos(theta) * Math.sin(phi), 
				radius * Math.sin(theta),
				radius * Math.cos(theta) * Math.cos(phi)); // eye point
	modelViewMatrix = lookAt(eye, at , up);
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	// send to html

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
	
	gl.uniform3f(vLocationLoc, position.x/10, position.y/10, - position.z/10);
	// draw	

    gl.drawArrays( gl.TRIANGLES, 0, points.length);
	
	points=[];
	colors=[];
}


 /**** H2 ****/
function render_H2(){
	render_sphere(0, -0.1, 0.0, 0.0);
	render_sphere(0, 0.1, 0.0, 0.0);
	render_cylinder(0.00, 0.0, 0.0, 0, 0, 1, 90, 0.03, 0.2, 0.03);
	
	if(flag_compound==0)
		requestAnimFrame(render_H2)
}

 /**** N2 ****/
function render_N2(){
	render_sphere(6, -0.18, 0.0, 0.0);
	render_sphere(6, 0.18, 0.0, 0.0);
	render_cylinder( 0.0, 0.05, 0.0, 0, 0, 1, 90, 0.03, 0.2, 0.03);
	render_cylinder( 0.0, 0.0, 0.0, 0, 0, 1, 90, 0.03, 0.2, 0.03);
	render_cylinder( 0.0, -0.05, 0.0, 0, 0, 1, 90, 0.03, 0.2, 0.03);

	if(flag_compound==1)
		requestAnimFrame(render_N2);
}

 /**** F2 ****/
function render_F2(){
	render_sphere(8, -0.2, 0.0, 0.0);
	render_sphere(8, 0.2, 0.0, 0.0);
	render_cylinder( 0.0, 0.02, 0.0, 0, 0, 1, 90, 0.03, 0.3, 0.03);
	render_cylinder( 0.0, -0.02, 0.0, 0, 0, 1, 90, 0.03, 0.3, 0.03);

	if(flag_compound==2)
		requestAnimFrame(render_F2);
}

 /**** O2 ****/
function render_O2(){
	render_sphere(7, -0.2, 0.0, 0.0);
	render_sphere(7, 0.2, 0.0, 0.0);
	render_cylinder(0.0, 0.02, 0.0, 0, 0, 1, 90, 0.03, 0.3, 0.03);
	render_cylinder(0.0, -0.02, 0.0, 0, 0, 1, 90, 0.03, 0.3, 0.03);
	
	if(flag_compound==3)
		requestAnimFrame(render_O2);
 //----------------------------------------------------------------------------------------------------------------------
	
}

 /**** CO ****/
function render_CO(){
	
	if(flag_compound==4)
		requestAnimFrame(render_CO);
}

 /**** CH4 ****/
function render_CH4(){
	
	if(flag_compound==5)
		requestAnimFrame(render_CH4);
}

 /**** BF3 ****/
function render_BF3(){
	
	if(flag_compound==6)
		requestAnimFrame(render_BF3);
}

 /**** CO2 ****/
function render_CO2(){
	render_sphere(7, -0.5, 0.0, 0.0);
	render_sphere(7, 0.5, 0.0, 0.0);
	render_sphere(5, 0.0, 0.0, 0.0);

	render_cylinder(0.25, 0.05, 0.0, 0, 0, 1, 90, 0.03, 0.3, 0.03);
	render_cylinder(0.25, -0.05, 0.0, 0, 0, 1, 90, 0.03, 0.3, 0.03);
	render_cylinder(-0.25, 0.05, 0.0, 0, 0, -1, 90, 0.03, 0.3, 0.03);
	render_cylinder(-0.25, -0.05, 0.0, 0, 0, -1, 90, 0.03, 0.3, 0.03);

	if(flag_compound==7)
		requestAnimFrame(render_CO2);
}

 /**** H2O ****/
function render_H2O(){
	render_sphere(7, 0.0, 0.2, 0.0);
	render_sphere(0, 0.25, 0, 0.0);
	render_sphere(0, -0.25, 0, 0.0);
	
	render_cylinder( -0.15, 0.1, 0.0, 0, 0, -1, 45, 0.04, 0.2, 0.05);	
	render_cylinder( 0.15, 0.1, 0.0, 0, 0, 1, 45, 0.04, 0.2, 0.05);
	
	
	if(flag_compound==8)
		requestAnimFrame(render_H2O);
}

 /**** C2H4 ****/
function render_C2H4(){
	render_sphere(5, -0.2, 0.0, 0.0);
	render_sphere(5, 0.2, 0.0, 0.0);
	render_cylinder(0.0, 0.02, 0.0, 0, 0, 1, 90, 0.03, 0.3, 0.03);
	render_cylinder(0.0, -0.02, 0.0, 0, 0, 1, 90, 0.03, 0.3, 0.03);
	render_sphere(0, -0.4, 0.2, 0.0);
	render_cylinder(-0.3, 0.1, 0.0, 0, 0, 1, 45, 0.01, 0.3, 0.05);
	render_sphere(0, -0.4, -0.2, 0.0);
	render_cylinder( -0.3, -0.1, 0.0, 0, 0, -1, 45, 0.04, 0.3, 0.05);
	render_sphere(0, 0.4, 0.2, 0.0);
	render_cylinder( 0.3, 0.1, 0.0, 0, 0, -1, 45, 0.04, 0.3, 0.05);
	render_sphere(0, 0.4, -0.2, 0.0);
	render_cylinder( 0.3, -0.1, 0.0, 0, 0, 1, 45, 0.04, 0.3, 0.05);
		
	
	if(flag_compound==9)
		requestAnimFrame(render_C2H4);
}

 /**** HCN ****/
function render_HCN(){ 
	render_sphere(0, -0.4, 0.0, 0.0);
	render_sphere(5, 0.0, 0.0, 0.0);
	render_sphere(6, 0.4, 0.0, 0.0);
	
	render_cylinder(-0.3, 0.0, 0.0, 0, 0, 1, 90, 0.04, 0.3, 0.05);
	render_cylinder(0.3, 0.03, 0.0, 0, 0, 1, 90, 0.02, 0.3, 0.02);
	render_cylinder(0.3, 0.0, 0.0, 0, 0, 1, 90, 0.02, 0.3, 0.02);
	render_cylinder(0.3, -0.03, 0.0, 0, 0, 1, 90, 0.02, 0.3, 0.02);
	
	if(flag_compound==10)
		requestAnimFrame(render_HCN);
}

 /****MgO ****/
function render_MgO(){
	render_sphere(10, -0.3, 0.0, 0.0);
	render_sphere(7, 0.3, 0.0, 0.0);
	
	render_cylinder(0.0, 0.05, 0.0, 0, 0, 1, 90, 0.05, 0.4, 0.05);
	render_cylinder(0.0, -0.05, 0.0, 0, 0, 1, 90, 0.05, 0.4, 0.05);

	if(flag_compound==11)
		requestAnimFrame(render_MgO);
}

 /**** NH3 ****/
function render_NH3(){
	render_sphere(6, 0.0, 0.07, 0.0);
	render_sphere(0, 0.25, -0.07, 0.16);
	render_sphere(0, -0.25, -0.07, 0.16);
	render_sphere(0, 0.0, -0.07, -0.25);
	
	render_cylinder(-0.08, 0.05, 0.05, 0, 0.3, 1, 120, 0.03, 0.4, 0.03);
	//linkCs1.rotate(120, [0, 0, 1]);
    //linkCs1.rotate(30, [0, 1, 0]);
	
	render_cylinder(0.0, 0.05, -0.08, 0, 1, 0.45, 270, 0.03, 0.4, 0.03);
	//linkCs2.rotate(120, [0, 0, 1]);
    //linkCs2.rotate(270, [0, 1, 0]);
	
	render_cylinder(0.08, 0.05, 0.05, 0, 1, 0.8, 150, 0.03, 0.4, 0.03);
	//linkCs3.rotate(120, [0, 0, 1]);
    //linkCs3.rotate(150, [0, 1, 0]);


	if(flag_compound==12)
		requestAnimFrame(render_NH3);
}

 /**** C2H6 ****/
function render_C2H6(){
	
	if(flag_compound==13)
		requestAnimFrame(render_C2H6);
}

 /**** CH3OH ****/
function render_CH3OH(){
	
	if(flag_compound==14)
		requestAnimFrame(render_CH3OH);
}

 /**** H2CO3 ****/
function render_H2CO3(){
	
	if(flag_compound==15)
		requestAnimFrame(render_H2CO3);
}

 /**** Al2O3 ****/
function render_Al2O3(){
	render_sphere(11, -0.45, 0.25, 0.0);
	render_sphere(11, 0.45, 0.25, 0.0);
	render_sphere(7, -0.8, -0.25, 0.0);
	render_sphere(7, 0.0, -0.25, 0.0);
	render_sphere(7, 0.8, -0.25, 0.0);
	
	render_cylinder(-0.6, 0.05, 0.0, 0, 0, 1, 140, 0.03, 0.5, 0.03);
	render_cylinder(-0.6, -0.05, 0.0, 0, 0, 1, 140, 0.03, 0.5, 0.03);
	render_cylinder(-0.2, -0.05, 0.0, 0, 0, 1, 45, 0.03, 0.5, 0.03);
	render_cylinder(0.2, -0.05, 0.0, 0, 0, 1, 135, 0.03, 0.5, 0.03);
	render_cylinder(0.6, 0.05, 0.0, 0, 0, 1, 40, 0.03, 0.5, 0.03);
	render_cylinder(0.6, -0.05, 0.0, 0, 0, 1, 40, 0.03, 0.5, 0.03);
 
	if(flag_compound==16)
		requestAnimFrame(render_Al2O3);
}

 /**** NaCO3 ****/
function render_NaCO3(){
	
	if(flag_compound==17)
		requestAnimFrame(render_NaCO3);
}
