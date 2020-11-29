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
var normalsArray = [];

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
   [0, 0, 0, 0, 0, 1, 0, 3, 0, 2, 0, 0], //Na2CO3*
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
   "Na2CO3",
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
var radius = 0.5;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var left = -3.0;
var right = 3.0;
var ytop =3.0;
var bottom = -3.0;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc, vLocationLoc;
var normalMatrix, normalMatrixLoc;

var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);


// Mouse position
var x = 0.0;
var y = 0.0;

/* shading variables*/
// default
var lightPosition = vec4(10.0, 10.0, 10.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );


// changed by atom 
var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 2.0;

var ambientColor, diffuseColor, specularColor;
var texture;
var normalMatrix, normalMatrixLoc;

// shading color
var color = [
   vec4(251/255, 221/255, 255/255, 1.0), //H
   vec4(240/255, 73/255, 16/255, 1.0), //He
   vec4(253/255, 56/255, 255/255, 1.0), //Li
   vec4(19/255, 255/255, 168/255, 1.0), //Be
   vec4(142/255, 255/255, 93/255, 1.0), //B
   vec4(50/255, 50/255, 50/255, 1.0), //C
   vec4(140/255, 81/255, 255/255, 1.0), //N
   vec4(209/255, 255/255, 251/255, 1.0), //O
   vec4(231/255, 255/255, 189/255, 1.0), //F
   vec4(249/255, 238/255, 8/255, 1.0), //Na
   vec4(277/255, 277/255, 277/255, 1.0), //Mg
   vec4(191/255, 191/255, 191/255, 1.0), //Al
]

var textureArray = [];
var defaultColor = vec4(180/255, 180/255, 180/255, 1.0) // other rendering object

// generate texture function
var images = [];
images.crossOrigin = "";

/*function configureTexture(image){
   texture = gl.createTexture();
   gl.bindTexture(gl.TEXTURE_2D, texture);
   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, images[i]);
   
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
}*/

var textureJpg = [
      "gas_H.png",
      "gas_He.png",
      "metal_Li.png",
      "metal_Be.png",
      "metal_B.png",
      "metal_C.png",
      "gas_N.png",
      "gas_O.png",
      "gas_F.png",
      "metal_Na.png",
      "metal_Mg.png",
      "metal_Al.png"
]

var defaultJpg = [

]
window.onload = function init()
{
	

	
    canvas = document.getElementById( "gl-canvas" );
   
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

   /* Clear canvas */
    // canvas.width = document.body.clientWidth; //document.width is obsolete
    // canvas.height = document.body.clientHeight; //document.height is obsolete
    gl.viewport( 0, 0, canvas.width, canvas.height );
   
    gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
    
    gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
	/* generate texture */
	for (var i = 0; i < 12; i++){
		textureArray[i] = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D,textureArray[i]);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		images[i] = new Image()
		images[i].src = textureJpg[i];
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, images[i]);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	}
	gl.bindTexture(gl.TEXTURE_2D, null)
	
    
	modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
	projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
	normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );
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
	
;

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
         render_Na2CO3();
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
	
	/* texture image */
	gl.bindTexture(gl.TEXTURE_2D, textureArray[idx]);
	gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);

	var mysphere = sphere(5);
	mysphere.scale(scalesize[idx] * scalerate, scalesize[idx] * scalerate, scalesize[idx] * scalerate);
	mysphere.translate(Tx, Ty, Tz);
   
	points = mysphere.TriangleVertices;
	normalsArray = mysphere.TriangleNormals;
   
	phi = -x/300;
	theta = y/300;
	// console.log(phi);

	eye = vec3(radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(theta), radius * Math.cos(theta) * Math.cos(phi)); // eye point
	modelViewMatrix = lookAt(eye, at , up);
	console.log(eye);
	projectionMatrix = ortho(left, right, bottom, ytop, near, far);
   
   
	
	materialAmbient = color[idx];
	materialDiffuse = color[idx];
	materialSpecular = color[idx];
   
	var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
	console.log(ambientProduct);
	console.log(diffuseProduct);
	console.log(specularProduct);

    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);

    var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
   
	var spherePositionBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, spherePositionBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(sphere(5).TriangleVertices), gl.STATIC_DRAW );
    
    var spherePosition = gl.getAttribLocation( program, "spherePosition" );
    gl.vertexAttribPointer( spherePosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( spherePosition );
   
       normalMatrix = [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ];
	
	
	// send to html
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
	gl.uniform3f(vLocationLoc, position.x/10, position.y/10, - position.z/10);
	gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );
	
	/* shader */
	gl.uniform4fv( gl.getUniformLocation(program,
       "ambientProduct"),flatten(ambientProduct) );
	gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program,
       "shininess"),materialShininess );

   
   
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
	
	/* texture image */
	gl.bindTexture(gl.TEXTURE_2D, null);
	gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
	
   var mycylinder = cylinder(72, 3, true);
   mycylinder.scale(Sx, Sy, Sz);
   mycylinder.rotate(angle,[Rx, Ry, Rz]);
   mycylinder.translate(Tx, Ty, Tz);
   
   points = mycylinder.TriangleVertices;
   normalsArray = mycylinder.TriangleNormals;
   
   phi = -x/300;
   theta = y/300;
   // console.log(phi);

   eye = vec3(radius * Math.cos(theta) * Math.sin(phi), 
            radius * Math.sin(theta),
            radius * Math.cos(theta) * Math.cos(phi)); // eye point
   modelViewMatrix = lookAt(eye, at , up);
   projectionMatrix = ortho(left, right, bottom, ytop, near, far);
   
   materialAmbient = defaultColor;
   materialDiffuse = defaultColor;
   materialSpecular = defaultColor;
   
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
   
       var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);

    var vBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
   gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition ); 

   
    normalMatrix = [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ];
	
	
	// send to html
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
	gl.uniform3f(vLocationLoc, position.x/10, position.y/10, - position.z/10);
	gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );
	
    /* shader */
    gl.uniform4fv( gl.getUniformLocation(program,
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program,
       "shininess"),materialShininess );
       
   // draw   
    gl.drawArrays( gl.TRIANGLES, 0, points.length);
}


// Function that renders the electronic(sphere) using "geometry.js"
// This will be used for "render_element"
// Parameter information
// idx : chemical element number(index) -> each element has different electronic numbers
function render_electronic(idx){
	
	/* texture image */
	gl.bindTexture(gl.TEXTURE_2D, null);
	gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
   
    var electronic ;
    for (var k = 0; k < electroNum[idx]; k += 1){
      console.log("electronic draw!");
      var j = k * 45 * Math.PI / 180;
      electronic = sphere(5);
      electronic.scale(electroniscalesize * scalerate,electroniscalesize * scalerate,electroniscalesize * scalerate);
      // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
      electronic.translate (Math.sin(j) * (scalesize[idx] * scalerate+ 0.07), 0.0 , Math.cos(j) * (scalesize[idx] * scalerate+ 0.07));
      
      points = points.concat(electronic.TriangleVertices);
	  normalsArray =normalsArray.concat(electronic.TriangleNormals);
   }
   
	phi = -x/300;
	theta = y/300;
	console.log(phi);

	eye = vec3(radius * Math.cos(theta) * Math.sin(phi), 
            radius * Math.sin(theta),
            radius * Math.cos(theta) * Math.cos(phi)); // eye point
	modelViewMatrix = lookAt(eye, at , up);
	projectionMatrix = ortho(left, right, bottom, ytop, near, far);
   
	materialAmbient = defaultColor;
	materialDiffuse = defaultColor;
	materialSpecular = defaultColor;
   
	var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
   
       var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);

    var vBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
   gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
   
   
    normalMatrix = [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ];
	
	
	// send to html
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
	gl.uniform3f(vLocationLoc, position.x/10, position.y/10, - position.z/10);
	gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );
   
   /* shader */
	gl.uniform4fv( gl.getUniformLocation(program,
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program,
       "shininess"),materialShininess );

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
   render_sphere(5, -0.2, 0.0, 0.0);
   render_sphere(7, 0.2, 0.0, 0.0);

   render_cylinder(0.0, 0.05, 0.0, 0, 0, 1, 90, 0.03, 0.4, 0.03);
   render_cylinder(0.0, 0.0, 0.0, 0, 0, 1, 90, 0.03, 0.4, 0.03);
   render_cylinder(0.0, -0.05, 0.0, 0, 0, 1, 90, 0.03, 0.4, 0.03);

   if(flag_compound==4)
      requestAnimFrame(render_CO);
}

 /**** CH4 ****/
function render_CH4(){
   render_sphere(5, 0.0, 0.07, 0.0);
   render_sphere(0, 0.25, -0.2, 0.16);
   render_sphere(0, -0.25, -0.2, 0.16);
   render_sphere(0, 0.0, -0.2, -0.25);
   render_sphere(0, 0.0, 0.4, 0.0);

   render_cylinder(-0.08, -0.05, 0.05, 0, 0.3, 1, 130, 0.03, 0.5, 0.03);
   //linkCs1.rotate(120, [0, 0, 1]);
   //linkCs1.rotate(30, [0, 1, 0]);
   
   render_cylinder(0.0, -0.05, -0.08, 0, 1, 0.45, 190, 0.03, 0.5, 0.03);
   //linkCs2.rotate(120, [0, 0, 1]);
   //linkCs2.rotate(270, [0, 1, 0]);
   
   render_cylinder(0.08, -0.05, 0.05, 0.6, 0.5, 0.8, 200, 0.03, 0.5, 0.03);
   //linkCs3.rotate(120, [0, 0, 1]);
   //linkCs3.rotate(150, [0, 1, 0]);
    
   render_cylinder(0.0, 0.25, 0.0, 0, 1, 0, 90, 0.03, 0.4, 0.03);

   if(flag_compound==5)
      requestAnimFrame(render_CH4);
}

 /**** BF3 ****/
function render_BF3(){
   render_sphere(4, 0.0, 0.0, 0.0);
   render_sphere(8, 0.0, 0.5, 0.0);
   render_sphere(8, -0.4, -0.3, 0.0);
   render_sphere(8, 0.4, -0.3, 0.0);
    
   render_cylinder(0.0, 0.3, 0.0, 0, 1, 0, 90, 0.03, 0.5, 0.03);
   render_cylinder(-0.15, -0.1, 0.0, 0, 0, 1, 120, 0.03, 0.5, 0.03);
   render_cylinder(0.15, -0.1, 0.0, 0, 0, 1, 240, 0.03, 0.5, 0.03);
    
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
   
   render_cylinder(-0.08, 0.05, 0.05, 0, 0.3, 1, 130, 0.03, 0.4, 0.03);
   //linkCs1.rotate(120, [0, 0, 1]);
    //linkCs1.rotate(30, [0, 1, 0]);
   
   render_cylinder(0.0, 0.05, -0.08, 0, 1, 0.45, 190, 0.03, 0.4, 0.03);
   //linkCs2.rotate(120, [0, 0, 1]);
    //linkCs2.rotate(270, [0, 1, 0]);
   
   render_cylinder(0.08, 0.05, 0.05, 0.6, 0.5, 0.8, 200, 0.03, 0.4, 0.03);
   //linkCs3.rotate(120, [0, 0, 1]);
    //linkCs3.rotate(150, [0, 1, 0]);


   if(flag_compound==12)
      requestAnimFrame(render_NH3);
}

 /**** C2H6 ****/
function render_C2H6(){
   render_sphere(5, -0.3, 0.0, 0.0);
   render_sphere(5, 0.3, 0.0, 0.0);
   render_sphere(0, -0.6, 0.2, 0.3);
   render_sphere(0, -0.45, -0.3, 0.2);
   render_sphere(0, -0.55, 0.0, -0.3);
   render_sphere(0, 0.6, 0.2, 0.3);
   render_sphere(0, 0.45, -0.3, 0.2);
   render_sphere(0, 0.55, 0.0, -0.3);
    
   render_cylinder(-0.45, 0.06, 0.15, 0, 1, 0.9, 100, 0.03, 0.5, 0.03);
   //linkCs1.rotate(60, [0, 0, 1]);
   //linkCs1.rotate(50, [0, 1, 0]);
   
   render_cylinder(-0.45, -0.03, -0.1, 0, 0.9, 1, 210, 0.03, 0.4, 0.03);
   //linkCs2.rotate(80, [0, 0, 1]);
   //linkCs2.rotate(300, [0, 1, 0]);
   
   render_cylinder(-0.4, -0.1, 0.05, 0, -0.15, 0.05, 220, 0.03, 0.4, 0.03);
   //linkCs3.rotate(320, [0, 0, 1]);
   //linkCs3.rotate(70, [0, 1, 0]);
    
   render_cylinder(0.45, 0.06, 0.15, 0, 1, 0.9, 260, 0.03, 0.5, 0.03);
   //linkCs4.rotate(300, [0, 0, 1]);
   //linkCs4.rotate(310, [0, 1, 0]);
    
   render_cylinder(0.45, -0.03, -0.1, 0, 0.9, 1, 150, 0.03, 0.4, 0.03);
   //linkCs5.rotate(280, [0, 0, 1]);
   //linkCs5.rotate(60, [0, 1, 0]);
    
   render_cylinder(0.4, -0.1, 0.05, 0, -0.15, 0.05, 140, 0.03, 0.4, 0.03);
   //linkCs6.rotate(40, [0, 0, 1]);
   //linkCs6.rotate(290, [0, 1, 0]);

   render_cylinder(0.0, 0.0, 0.0, 0, 0, 1, 90, 0.03, 0.5, 0.03);

   if(flag_compound==13)
      requestAnimFrame(render_C2H6);
}

 /**** CH3OH ****/
function render_CH3OH(){
   render_sphere(5, -0.3, 0.0, 0.0);
   render_sphere(7, 0.3, 0.0, 0.0);
   render_sphere(0, -0.6, 0.2, 0.3);
   render_sphere(0, -0.45, -0.3, 0.2);
   render_sphere(0, -0.55, 0.0, -0.3);
   render_sphere(0, 0.6, -0.2, 0.0);
    
   render_cylinder(-0.45, 0.06, 0.15, 0, 1, 0.9, 100, 0.03, 0.5, 0.03);
   render_cylinder(-0.45, -0.03, -0.1, 0, 0.9, 1, 210, 0.03, 0.4, 0.03);
   render_cylinder(-0.4, -0.1, 0.05, 0, -0.15, 0.05, 220, 0.03, 0.4, 0.03);
   render_cylinder(0.5, -0.1, 0.0, 0, 0, 1, 50, 0.03, 0.4, 0.03);
   render_cylinder(0.0, 0.0, 0.0, 0, 0, 1, 90, 0.03, 0.5, 0.03);
    
   if(flag_compound==14)
      requestAnimFrame(render_CH3OH);
}

 /**** H2CO3 ****/
function render_H2CO3(){
   render_sphere(5, 0.0, 0.0, 0.0);
   render_sphere(7, 0.0, 0.35, 0.0);
   render_sphere(7, -0.4, -0.18, 0.0);
   render_sphere(7, 0.4, -0.18, 0.0);
   render_sphere(0, -0.65, 0.02, 0.0);
   render_sphere(0, 0.65, 0.02, 0.0);

   render_cylinder(-0.03, 0.1, 0.0, 0, 1, 0, 90, 0.03, 0.4, 0.03);
   render_cylinder(0.03, 0.1, 0.0, 0, 1, 0, 90, 0.03, 0.4, 0.03);
   render_cylinder(-0.15, -0.05, 0.0, 0, 0, 1, 120, 0.03, 0.4, 0.03);
   render_cylinder(0.15, -0.05, 0.0, 0, 0, 1, 240, 0.03, 0.4, 0.03);
   render_cylinder(-0.55, -0.05, 0.0, 0, 0, 1, 230, 0.03, 0.3, 0.03);
   render_cylinder(0.55, -0.05, 0.0, 0, 0, 1, 130, 0.03, 0.3, 0.03);
    
   if(flag_compound==15)
      requestAnimFrame(render_H2CO3);
}

 /**** Al2O3 ****/
function render_Al2O3(){
	render_cylinder(-0.6, 0.05, 0.0, 0, 0, 1, 140, 0.03, 0.5, 0.03);
	render_cylinder(-0.6, -0.05, 0.0, 0, 0, 1, 140, 0.03, 0.5, 0.03);
	render_cylinder(-0.2, -0.05, 0.0, 0, 0, 1, 45, 0.03, 0.5, 0.03);
	render_cylinder(0.2, -0.05, 0.0, 0, 0, 1, 135, 0.03, 0.5, 0.03);
	render_cylinder(0.6, 0.05, 0.0, 0, 0, 1, 40, 0.03, 0.5, 0.03);
	render_cylinder(0.6, -0.05, 0.0, 0, 0, 1, 40, 0.03, 0.5, 0.03);
   
	render_sphere(11, -0.45, 0.25, 0.0);
	render_sphere(11, 0.45, 0.25, 0.0);
	render_sphere(7, -0.8, -0.25, 0.0);
	render_sphere(7, 0.0, -0.25, 0.0);
	render_sphere(7, 0.8, -0.25, 0.0);
   
	if(flag_compound==16)
		requestAnimFrame(render_Al2O3);
}

 /**** Na2CO3 ****/
function render_Na2CO3(){
   render_sphere(5, 0.0, 0.0, 0.0);
   render_sphere(7, 0.0, -0.35, 0.0);
   render_sphere(7, -0.35, 0.13, 0.0);
   render_sphere(10, 0.35, 0.13, 0.0);
   render_sphere(10, -1.0, 0.01, 0.0);
   render_sphere(10, 1.0, 0.01, 0.0);

   render_cylinder(-0.03, -0.1, 0.0, 0, 1, 0, 90, 0.03, 0.4, 0.03);
   render_cylinder(0.03, -0.1, 0.0, 0, 1, 0, 90, 0.03, 0.4, 0.03);
   render_cylinder(-0.15, 0.05, 0.0, 0, 0, 1, 240, 0.03, 0.4, 0.03);
   render_cylinder(0.15, 0.05, 0.0, 0, 0, 1, 120, 0.03, 0.4, 0.03);
   render_cylinder(-0.55, 0.05, 0.0, 0, 0, 1, 120, 0.03, 0.3, 0.03);
   render_cylinder(0.55, 0.05, 0.0, 0, 0, 1, 240, 0.03, 0.3, 0.03);
    
   if(flag_compound==17)
      requestAnimFrame(render_Na2CO3);
}