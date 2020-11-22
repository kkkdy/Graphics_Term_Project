"use strict";
var canvas;
var gl;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var points = [];
var colors = [];

/* Store the chemical compound's element information in 2d array*/
var compound = [
	[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //H2
	[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], //N2
	[0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0], //F2
	[0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0], //O3
	[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0], //CO
	[4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], //CH4
	[0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0], //BF3
	[0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0], //CO2
	[2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], //H2O
	[4, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0], //C2H4
	[1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], //HCN
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0], //MgO
	[3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], //NH3
	[6, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0], //C2H6
	[4, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0], //CH3OH
	[2, 0, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0], //H2CO3
	[0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2], //AL2O3
	[0, 0, 0, 0, 0, 1, 0, 3, 0, 0, 2, 0, 0], //NaCO3
];

/* vertice of each object */
var Npoints = [];
var Hepoints = [];
var Bpoints = [];
var Fpoints = [];
var O2points = [];
var C2H4points = [];
var O3points = [];
var H2CO3points = [];
var HCNpoints = [];
var CH4points = [];

/* color of each object */
var Ncolors = [];
var Hecolors = [];
var Bcolors = [];
var Fcolors = [];
var O2colors = [];
var C2H4colors = [];
var O3colors = [];
var H2CO3colors = [];
var HCNcolors = [];
var CH4colors = [];

var electronicScale = 5;
var Hescale = 32;
var Bscale = 88;
var Fscale = 64;

var Cscale = 77;
var Hscale = 37;
var Oscale = 66;
var Nscale = 70;

var scalerate = 0.002;

/* camera view matrix variables*/
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

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
	
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
	/* use geometry.js */
	/* save vertices and color information in each colors and points array*/
	
/**** N ****/
	// N
	var N = sphere(5);
	N.scale(Nscale * scalerate,Nscale * scalerate,Nscale * scalerate);
	// N.translate(-0.2, 0.0, 0.0);
	Npoints = Npoints.concat(N.TriangleVertices);
	Ncolors = Ncolors.concat(N.TriangleVertexColors);
	
	var electronic ;
	for (var i = 0; i <= 5; i += 1){
		var j = i * 45 * Math.PI / 180;
		electronic = sphere(5);
		electronic.scale(electronicScale * scalerate,electronicScale * scalerate,electronicScale * scalerate);
		// ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
		electronic.translate (Math.sin(j) * (Nscale * scalerate+ 0.05), 0.0 , Math.cos(j) * (Nscale * scalerate+ 0.05));
		
		Npoints = Npoints.concat(electronic.TriangleVertices);
		Ncolors = Ncolors.concat(electronic.TriangleVertexColors);
	}
	
/**** He ****/
	// He
	var He = sphere(5);
	He.scale(Hescale * scalerate,Hescale * scalerate,Hescale * scalerate);
	// N.translate(-0.2, 0.0, 0.0);
	Hepoints = Hepoints.concat(He.TriangleVertices);
	Hecolors = Hecolors.concat(He.TriangleVertexColors);
	
	var electronic ;
	for (var i = 0; i <= 2; i += 1){
		var j = i * 45 * Math.PI / 180;
		electronic = sphere(5);
		electronic.scale(electronicScale * scalerate,electronicScale * scalerate,electronicScale * scalerate);
		// ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
		electronic.translate (Math.sin(j) * (Hescale * scalerate+ 0.05), 0.0 , Math.cos(j) * (Hescale * scalerate+ 0.05));
		
		Hepoints = Hepoints.concat(electronic.TriangleVertices);
		Hecolors = Hecolors.concat(electronic.TriangleVertexColors);
	}

/**** B ****/
	// B
	var B = sphere(5);
	B.scale(Bscale * scalerate,Bscale * scalerate,Bscale * scalerate);
	// N.translate(-0.2, 0.0, 0.0);
	Bpoints = Bpoints.concat(B.TriangleVertices);
	Bcolors = Bcolors.concat(B.TriangleVertexColors);
	
	var electronic ;
	for (var i = 0; i <= 3; i += 1){
		var j = i * 45 * Math.PI / 180;
		electronic = sphere(5);
		electronic.scale(electronicScale * scalerate,electronicScale * scalerate,electronicScale * scalerate);
		// ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
		electronic.translate (Math.sin(j) * (Bscale * scalerate+ 0.05), 0.0 , Math.cos(j) * (Bscale * scalerate+ 0.05));
		
		Bpoints = Bpoints.concat(electronic.TriangleVertices);
		Bcolors = Bcolors.concat(electronic.TriangleVertexColors);
	}
/**** F ****/
	// F
	var F = sphere(5);
	F.scale(Fscale * scalerate,Fscale * scalerate,Fscale * scalerate);
	// N.translate(-0.2, 0.0, 0.0);
	Fpoints = Fpoints.concat(F.TriangleVertices);
	Fcolors = Fcolors.concat(F.TriangleVertexColors);
	
	var electronic ;
	for (var i = 0; i <= 7; i += 1){
		var j = i * 45 * Math.PI / 180;
		electronic = sphere(5);
		electronic.scale(electronicScale * scalerate,electronicScale * scalerate,electronicScale * scalerate);
		// ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
		electronic.translate (Math.sin(j) * (Fscale * scalerate+ 0.05), 0.0 , Math.cos(j) * (Fscale * scalerate+ 0.05));
		
		Fpoints = Fpoints.concat(electronic.TriangleVertices);
		Fcolors = Fcolors.concat(electronic.TriangleVertexColors);
	}
/**** O2 ****/
	// left O
	var O = sphere(5);
	O.scale(Oscale * scalerate,Oscale * scalerate,Oscale * scalerate);
	O.translate(-0.2, 0.0, 0.0);
	O2points = O2points.concat(O.TriangleVertices);
	O2colors = O2colors.concat(O.TriangleVertexColors);
	
	// right O
	O = sphere(5);
	O.scale(Oscale * scalerate,Oscale * scalerate,Oscale * scalerate);
	O.translate(+0.2, 0.0, 0.0);
	O2points = O2points.concat(O.TriangleVertices);
	O2colors = O2colors.concat(O.TriangleVertexColors);
	
	// double link Os
	var linkOs = cylinder(72, 3, true);
	linkOs.scale(0.03,0.3,0.03);
	linkOs.rotate(90, [0, 0, 1]);
	linkOs.translate(0.0, +0.02, 0.0);
	O2points = O2points.concat(linkOs.TriangleVertices);
	O2colors = O2colors.concat(linkOs.TriangleVertexColors);
	
	linkOs = cylinder(72, 3, true);
	linkOs.scale(0.03,0.3,0.03);
	linkOs.rotate(90, [0, 0, 1]);
	linkOs.translate(0.0, -0.02, 0.0);
	O2points = O2points.concat(linkOs.TriangleVertices);
	O2colors = O2colors.concat(linkOs.TriangleVertexColors);
	
/**** C2H4 ****/
	// left c
	var C = sphere(5);
	C.scale(Cscale * scalerate,Cscale * scalerate,Cscale * scalerate);
	C.translate(-0.2, 0.0, 0.0);
	C2H4points = C2H4points.concat(C.TriangleVertices);
	C2H4colors = C2H4colors.concat(C.TriangleVertexColors);
	
	// right c
	C = sphere(5);
	C.scale(Cscale * scalerate,Cscale * scalerate,Cscale * scalerate);
	C.translate(+0.2, 0.0, 0.0);
	C2H4points = C2H4points.concat(C.TriangleVertices);
	C2H4colors = C2H4colors.concat(C.TriangleVertexColors);
	
	// link Cs
	var linkCs = cylinder(72, 3, true);
	linkCs.scale(0.03,0.3,0.03);
	linkCs.rotate(90, [0, 0, 1]);
	linkCs.translate(0.0, +0.02, 0.0);
	C2H4points = C2H4points.concat(linkCs.TriangleVertices);
	C2H4colors = C2H4colors.concat(linkCs.TriangleVertexColors);
	
	linkCs = cylinder(72, 3, true);
	linkCs.scale(0.03,0.3,0.03);
	linkCs.rotate(90, [0, 0, 1]);
	linkCs.translate(0.0, -0.02, 0.0);
	C2H4points = C2H4points.concat(linkCs.TriangleVertices);
	C2H4colors = C2H4colors.concat(linkCs.TriangleVertexColors);

	// left top H
	var H = sphere(5);
	H.scale(Hscale * scalerate,Hscale * scalerate,Hscale * scalerate);
	H.translate(-0.2 - 0.2, +0.2, 0.0);
	C2H4points = C2H4points.concat(H.TriangleVertices);
	C2H4colors = C2H4colors.concat(H.TriangleVertexColors);
	
	// link CHleftTop
	var linkH = cylinder(72, 3, true);
	linkH.scale(0.04,0.3,0.05);
	linkH.rotate(45, [0, 0, 1]);
	linkH.translate(-0.1 - 0.2, +0.1, 0.0);
	C2H4points = C2H4points.concat(linkH.TriangleVertices);
	C2H4colors = C2H4colors.concat(linkH.TriangleVertexColors);
	
	// left bottom H
	H = sphere(5);
	H.scale(Hscale * scalerate,Hscale * scalerate,Hscale * scalerate);
	H.translate(-0.2 - 0.2, -0.2, 0.0);
	C2H4points = C2H4points.concat(H.TriangleVertices);
	C2H4colors = C2H4colors.concat(H.TriangleVertexColors);
	
	// link CHleftBottom
	linkH = cylinder(72, 3, true);
	linkH.scale(0.04,0.3,0.05);
	linkH.rotate(45, [0, 0, -1]);;
	linkH.translate(-0.1 - 0.2, -0.1, 0.0);
	C2H4points = C2H4points.concat(linkH.TriangleVertices);
	C2H4colors = C2H4colors.concat(linkH.TriangleVertexColors);
	
	// right top H
	H = sphere(5);
	H.scale(Hscale * scalerate,Hscale * scalerate,Hscale * scalerate);
	H.translate(+0.2 + 0.2, +0.2, 0.0);
	C2H4points = C2H4points.concat(H.TriangleVertices);
	C2H4colors = C2H4colors.concat(H.TriangleVertexColors);
	
	// link CHrightTop
	linkH = cylinder(72, 3, true);
	linkH.scale(0.04,0.3,0.05);
	linkH.rotate(45, [0, 0, -1]);;
	linkH.translate(+0.1 + 0.2, +0.1, 0.0);
	C2H4points = C2H4points.concat(linkH.TriangleVertices);
	C2H4colors = C2H4colors.concat(linkH.TriangleVertexColors);
	
	// right bottom H
	H = sphere(5);
	H.scale(Hscale * scalerate,Hscale * scalerate,Hscale * scalerate);
	H.translate(+0.2 + 0.2, -0.2, 0.0);
	C2H4points = C2H4points.concat(H.TriangleVertices);
	C2H4colors = C2H4colors.concat(H.TriangleVertexColors);
	
	// link CHrightBottom
	linkH = cylinder(72, 3, true);
	linkH.scale(0.04,0.3,0.05);
	linkH.rotate(45, [0, 0, +1]);;
	linkH.translate(+0.1 + 0.2, -0.1, 0.0);
	C2H4points = C2H4points.concat(linkH.TriangleVertices);
	C2H4colors = C2H4colors.concat(linkH.TriangleVertexColors);
	
/**** O3 ****/
	// left O
	var O = sphere(5);
	O.scale(Oscale * scalerate,Oscale * scalerate,Oscale * scalerate);
	O.translate(-0.3, -0.2, 0.0);
	O3points = O3points.concat(O.TriangleVertices);
	O3colors = O3colors.concat(O.TriangleVertexColors);

	// middle O
	var O = sphere(5);
	O.scale(Oscale * scalerate,Oscale * scalerate,Oscale * scalerate);
	O.translate(0.0, 0.05, 0.0);
	O3points = O3points.concat(O.TriangleVertices);
	O3colors = O3colors.concat(O.TriangleVertexColors);
	
	// right O
	var O = sphere(5);
	O.scale(Oscale * scalerate,Oscale * scalerate,Oscale * scalerate);
	O.translate(+0.3, -0.2, 0.0);
	O3points = O3points.concat(O.TriangleVertices);
	O3colors = O3colors.concat(O.TriangleVertexColors);
	
	// leftlink Os
	var linkO = cylinder(72, 3, true);
	var linkO = cylinder(72, 3, true);
	linkO.scale(0.03,0.3,0.03);
	linkO.rotate(58.4, [0, 0, -1]);
	linkO.translate(-0.2, - 0.1 +0.02, 0.0);
	linkO.scale(0.03,0.3,0.03);
	linkO.rotate(58.4, [0, 0, -1]);
	linkO.translate(-0.2, - 0.1 -0.02, 0.0);
	O3points = O3points.concat(linkO.TriangleVertices);
	O3colors = O3colors.concat(linkO.TriangleVertexColors);
	O3points = O3points.concat(linkO.TriangleVertices);
	O3colors = O3colors.concat(linkO.TriangleVertexColors);
	
	// rightlink Os
	var linkO = cylinder(72, 3, true);
	linkO.scale(0.04,0.3,0.05);
	linkO.rotate(58.4, [0, 0, 1]);
	linkO.translate(+0.2, - 0.1 +0.0, 0.0);
	O3points = O3points.concat(linkO.TriangleVertices);
	O3colors = O3colors.concat(linkO.TriangleVertexColors);
	

/**** H2CO3 ****/

/**** HCN ****/
	// H
	var H = sphere(5);
	H.scale(Hscale * scalerate,Hscale * scalerate,Hscale * scalerate);
	H.translate(-0.4, 0.0, 0.0);
	HCNpoints = HCNpoints.concat(H.TriangleVertices);
	HCNcolors = HCNcolors.concat(H.TriangleVertexColors);
	
	// C
	var C= sphere(5);
	C.scale(Cscale * scalerate,Cscale * scalerate,Cscale * scalerate);
	C.translate(0.0, 0.0, 0.0);
	HCNpoints = HCNpoints.concat(C.TriangleVertices);
	HCNcolors = HCNcolors.concat(C.TriangleVertexColors);
	
	// N
	var N = sphere(5);
	N.scale(Nscale * scalerate,Nscale * scalerate,Nscale * scalerate);
	N.translate(+0.4, 0.0, 0.0);
	HCNpoints = HCNpoints.concat(N.TriangleVertices);
	HCNcolors = HCNcolors.concat(N.TriangleVertexColors);
	
	// link CH
	var linkCH = cylinder(72, 3, true);
	linkCH.scale(0.04,0.3,0.05);
	linkCH.rotate(90, [0, 0, 1]);
	linkCH.translate(-0.3, 0.0, 0.0);
	HCNpoints = HCNpoints.concat(linkCH.TriangleVertices);
	HCNcolors = HCNcolors.concat(linkCH.TriangleVertexColors);
	
	// link CNs
	var linkCN = cylinder(72, 3, true);
	linkCN.scale(0.02,0.3,0.02);
	linkCN.rotate(90, [0, 0, 1]);
	linkCN.translate(+0.3, +0.03, 0.0);
	HCNpoints = HCNpoints.concat(linkCN.TriangleVertices);
	HCNcolors = HCNcolors.concat(linkCN.TriangleVertexColors);
	
	linkCN = cylinder(72, 3, true);
	linkCN.scale(0.02,0.3,0.02);
	linkCN.rotate(90, [0, 0, 1]);
	linkCN.translate(+0.3, 0.0, 0.0);
	HCNpoints = HCNpoints.concat(linkCN.TriangleVertices);
	HCNcolors = HCNcolors.concat(linkCN.TriangleVertexColors);
	
	linkCN = cylinder(72, 3, true);
	linkCN.scale(0.02,0.3,0.02);
	linkCN.rotate(90, [0, 0, 1]);
	linkCN.translate(+0.3, -0.03, 0.0);
	HCNpoints = HCNpoints.concat(linkCN.TriangleVertices);
	HCNcolors = HCNcolors.concat(linkCN.TriangleVertexColors);

/**** CH4 ****/
	// C
	var C= sphere(5);
	C.scale(Cscale * scalerate,Cscale * scalerate,Cscale * scalerate);
	C.translate(0.0, 0.0, 0.0);
	HCNpoints = HCNpoints.concat(C.TriangleVertices);
	HCNcolors = HCNcolors.concat(C.TriangleVertexColors);

	


	/* clear canvas */
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
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
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

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
	vLocationLoc = gl.getUniformLocation( program, "vLocation" );
	
    //event listeners for buttons
	document.getElementById( "O2Button" ).onclick = function () {
		points = JSON.parse(JSON.stringify(O2points));
		colors = JSON.parse(JSON.stringify(O2colors));
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		console.log("O2");
	
    };
	document.getElementById( "C2H4Button" ).onclick = function () {
		points = JSON.parse(JSON.stringify(C2H4points));
		colors = JSON.parse(JSON.stringify(C2H4colors));
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		console.log("C2H4");
    };
    document.getElementById( "O3Button" ).onclick = function () {
        points = JSON.parse(JSON.stringify(O3points));
		colors = JSON.parse(JSON.stringify(O3colors));
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		console.log("O3");
    };
    document.getElementById( "H2CO3Button" ).onclick = function () {
        points = JSON.parse(JSON.stringify(H2CO3points));
		colors = JSON.parse(JSON.stringify(H2CO3colors));
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		console.log("H2CO3");
    };
	document.getElementById( "HCNButton" ).onclick = function () {
        points = JSON.parse(JSON.stringify(HCNpoints));
		colors = JSON.parse(JSON.stringify(HCNcolors));
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		console.log("HCN");
    };
    document.getElementById( "CH4Button" ).onclick = function () {
        points = JSON.parse(JSON.stringify(CH4points));
		colors = JSON.parse(JSON.stringify(CH4colors));
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		console.log("CH4");
    };
	document.getElementById( "NButton" ).onclick = function () {
        points = JSON.parse(JSON.stringify(Npoints));
		colors = JSON.parse(JSON.stringify(Ncolors));
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		console.log("N");
    };
	document.getElementById( "HeButton" ).onclick = function () {
        points = JSON.parse(JSON.stringify(Hepoints));
		colors = JSON.parse(JSON.stringify(Hecolors));
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		console.log("He");
    };
	document.getElementById( "BButton" ).onclick = function () {
        points = JSON.parse(JSON.stringify(Bpoints));
		colors = JSON.parse(JSON.stringify(Bcolors));
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		console.log("B");
    };
	document.getElementById( "FButton" ).onclick = function () {
        points = JSON.parse(JSON.stringify(Fpoints));
		colors = JSON.parse(JSON.stringify(Fcolors));
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		console.log("F");
    };
	
	// sliders for viewing parameters
    document.getElementById("radiusSlider").onchange = function(event) {
       radius = event.target.value;
    };
    document.getElementById("thetaSlider").onchange = function(event) {
        theta = event.target.value* Math.PI/180.0;
    };
    document.getElementById("phiSlider").onchange = function(event) {
        phi = event.target.value* Math.PI/180.0;
    };
	
	document.getElementById( "MakeButton" ).onclick = function (){
		var num = document.getElementById("input").value;
	}
}


function render()
{
	// clear canvas
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	// set model view matrix 

	radius = 0;
	eye = vec3(radius * Math.cos(theta) * Math.sin(phi), 
				radius * Math.sin(theta),
				radius * Math.cos(theta) * Math.cos(phi)); // eye point
	modelViewMatrix = lookAt(eye, at , up);
	
	// send to html

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
	// console.log(position);
	gl.uniform3f(vLocationLoc, position.x/10, position.y/10, - position.z/10);
	// draw
    gl.drawArrays( gl.TRIANGLES, 0, points.length);
	
	// request animation
	requestAnimFrame(render);
}

// (i, Oscale, xpos, ypos, zpos of )
function renderElectro (electroNum, atomScale, xpos, ypos, zpos){
	var electronic ;

	for (var i = 0; i <= 8; i += 1){
		var j = i * 45 * Math.PI / 180;
		electronic = sphere(3);
		electronic.scale(electronicScale * scalerate,electronicScale * scalerate,electronicScale * scalerate);
		// ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
		electronic.translate (xpos + Math.sin(j) * (atomScale * scalerate+ 0.05), ypos , zpos+  Math.cos(j) * (atomScale * scalerate+ 0.05));
		
		
		O2points = O2points.concat(electronic.TriangleVertices);
		O2colors = O2colors.concat(electronic.TriangleVertexColors);
	}
}

