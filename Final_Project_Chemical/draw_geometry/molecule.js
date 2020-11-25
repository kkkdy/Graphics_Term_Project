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

var result_idx = -1;

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
var evaluating_input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/* vertice of each object */
var H2points = [];
var N2points = [];
var F2points = [];
var COpoints = [];
var BF3points = [];
var CO2points = [];
var H2Opoints = [];
var MgOpoints = [];
var NH3points = [];
var C2H6points = [];
var CH3OHpoints = [];
var Al2O3points = [];
var NaCO3points = [];
var O2points = [];
var C2H4points = [];
var H2CO3points = [];
var HCNpoints = [];
var CH4points = [];

/* color of each object */
var H2colors = [];
var N2colors = [];
var F2colors = [];
var COcolors = [];
var BF3colors = [];
var CO2colors = [];
var H2Ocolors = [];
var MgOcolors = [];
var NH3colors = [];
var C2H6colors = [];
var CH3OHcolors = [];
var Al2O3colors = [];
var NaCO3colors = [];
var O2colors = [];
var C2H4colors = [];
var H2CO3colors = [];
var HCNcolors = [];
var CH4colors = [];

var electroniscalesize = 5;
var electroNum = [1, 2, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3];
var scalesize = [37, 32, 152, 113, 88, 77, 70, 66, 64, 186, 160, 143];

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
	

/**** O2 ****/
	// left O
	var O = sphere(5);
	O.scale(scalesize[7] * scalerate,scalesize[7] * scalerate,scalesize[7] * scalerate);
	O.translate(-0.2, 0.0, 0.0);
	O2points = O2points.concat(O.TriangleVertices);
	O2colors = O2colors.concat(O.TriangleVertexColors);
	
	// right O
	O = sphere(5);
	O.scale(scalesize[7] * scalerate,scalesize[7] * scalerate,scalesize[7] * scalerate);
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
 //----------------------------------------------------------------------------------------------------------------------
	
/**** C2H4 ****/
	// left c
	var C = sphere(5);
	C.scale(scalesize[5] * scalerate,scalesize[5] * scalerate,scalesize[5] * scalerate);
	C.translate(-0.2, 0.0, 0.0);
	C2H4points = C2H4points.concat(C.TriangleVertices);
	C2H4colors = C2H4colors.concat(C.TriangleVertexColors);
	
	// right c
	C = sphere(5);
	C.scale(scalesize[5] * scalerate,scalesize[5] * scalerate,scalesize[5] * scalerate);
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
	H.scale(scalesize[0] * scalerate,scalesize[0] * scalerate,scalesize[0] * scalerate);
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
	H.scale(scalesize[0] * scalerate,scalesize[0] * scalerate,scalesize[0] * scalerate);
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
	H.scale(scalesize[0] * scalerate,scalesize[0] * scalerate,scalesize[0] * scalerate);
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
	H.scale(scalesize[0] * scalerate,scalesize[0] * scalerate,scalesize[0] * scalerate);
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
 //----------------------------------------------------------------------------------------------------------------------
	
/**** CO2 ****/
	// left O
	var O = sphere(5);
	O.scale(scalesize[7] * scalerate,scalesize[7] * scalerate,scalesize[7] * scalerate);
	O.translate(-0.5, 0.0, 0.0);
	CO2points = CO2points.concat(O.TriangleVertices);
	CO2colors = CO2colors.concat(O.TriangleVertexColors);

	// right O
	var O = sphere(5);
	O.scale(scalesize[7] * scalerate,scalesize[7] * scalerate,scalesize[7] * scalerate);
	O.translate(0.5, 0.0, 0.0);
	CO2points = CO2points.concat(O.TriangleVertices);
	CO2colors = CO2colors.concat(O.TriangleVertexColors);
	
	// middle C
	var C = sphere(5);
	C.scale(scalesize[5] * scalerate, scalesize[5] * scalerate, scalesize[5] * scalerate);
	//C.translate(+0.5, 0.0, 0.0);
	CO2points = CO2points.concat(C.TriangleVertices);
	CO2colors = CO2colors.concat(C.TriangleVertexColors);
	
	// leftlink Os
	var linkO = cylinder(72, 3, true);
	linkO.scale(0.03,0.3,0.03);
	linkO.rotate(90.0, [1, 0, 0]);
	linkO.rotate(90.0, [0, 1, 0]);
	linkO.translate(0.3, 0.05, 0.0);
	
	CO2points = CO2points.concat(linkO.TriangleVertices);
	CO2colors = CO2colors.concat(linkO.TriangleVertexColors);
	CO2points = CO2points.concat(linkO.TriangleVertices);
	CO2colors = CO2colors.concat(linkO.TriangleVertexColors);
	
	// rightlink Os
	var linkO = cylinder(72, 3, true);
	linkO.scale(0.03,0.3,0.03);
	linkO.rotate( 90.0, [1, 0, 0]);
	linkO.rotate( 90.0, [0, 1, 0]);
	linkO.translate ( 0.3, -0.05, 0.0 );
	CO2points = CO2points.concat(linkO.TriangleVertices);
	CO2colors = CO2colors.concat(linkO.TriangleVertexColors);
	
	var linkC = cylinder(72, 3, true);
	linkC.scale( 0.05, 0.2, 0.05 );
	linkC.rotate( 90.0, [1, 0, 0]);
	linkC.rotate( 90.0, [0, 1, 0]);
	linkC.translate ( -0.3, 0.05, 0.0 );
	
	CO2colors = CO2colors.concat(linkC.TriangleVertexColors); //color information
	CO2points = CO2points.concat(linkC.TriangleVertices); // location information
	
	var linkC = cylinder(72, 3, true);
	linkC.scale( 0.05, 0.2, 0.05 );
	linkC.rotate( 90.0, [1, 0, 0]);
	linkC.rotate( 90.0, [0, 1, 0]);
	linkC.translate ( -0.3, -0.05, 0.0 );
	
	
	CO2colors = CO2colors.concat(linkC.TriangleVertexColors); //color information
	CO2points = CO2points.concat(linkC.TriangleVertices); // location information
 //----------------------------------------------------------------------------------------------------------------------
	
/**** H2O ****/
	// middle O
	var O = sphere(5);
	O.scale(scalesize[7] * scalerate,scalesize[7] * scalerate,scalesize[7] * scalerate);
	O.translate(0.0, 0.2, 0.0);
	H2Opoints = H2Opoints.concat(O.TriangleVertices);
	H2Ocolors = H2Ocolors.concat(O.TriangleVertexColors);

	// right O
	var H = sphere(5);
	H.scale(scalesize[0] * scalerate, scalesize[0] * scalerate, scalesize[0] * scalerate);
	H.translate(0.35, -0.15, 0.0);
	H2Opoints = H2Opoints.concat(H.TriangleVertices);
	H2Ocolors = H2Ocolors.concat(H.TriangleVertexColors);
	
	// left C
	var H = sphere(5);
	H.scale(scalesize[0] * scalerate, scalesize[0] * scalerate, scalesize[0] * scalerate);
	H.translate(-0.35, -0.15, 0.0);
	H2Opoints = H2Opoints.concat(H.TriangleVertices);
	H2Ocolors = H2Ocolors.concat(H.TriangleVertexColors);
	
	// leftlink Os
	var linkO = cylinder(72, 3, true);
	linkO.scale(0.03,0.3,0.03);
	linkO.rotate( 90.0, [0, -1, 0]);
	linkO.rotate( 45.0, [0, 0, 1]);
	linkO.translate ( 0.2, 0.05, 0.0 );
	
	H2Ocolors = H2Ocolors.concat(linkO.TriangleVertexColors); //color information
	H2Opoints = H2Opoints.concat(linkO.TriangleVertices); // location information
	
	
	// rightlink Os
	var linkO = cylinder(72, 3, true);
	linkO.scale(0.03,0.3,0.03);
	linkO.rotate( 90.0, [0, -1, 0]);
	linkO.rotate( 45.0, [0, 0, -1]);
	linkO.translate ( -0.2, 0.05, 0.0 );
	
	H2Ocolors = H2Ocolors.concat(linkO.TriangleVertexColors); //color information
	H2Opoints = H2Opoints.concat(linkO.TriangleVertices); // location information
 //----------------------------------------------------------------------------------------------------------------------
	

 /**** Al2O3 ****/
    // Al 1
    var Al1 = sphere(5);
    Al1.scale(scalesize[11] * scalerate, scalesize[11] * scalerate, scalesize[11] * scalerate);
    Al1.translate(-0.45, +0.25, 0.0);

    Al2O3colors = Al2O3colors.concat(Al1.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(Al1.TriangleVertices);
    

    // Al 2
    var Al2 = sphere(5);
    Al2.scale(scalesize[11] * scalerate, scalesize[11] * scalerate, scalesize[11] * scalerate);
    Al2.translate(+0.45, +0.25, 0.0);

    Al2O3colors = Al2O3colors.concat(Al2.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(Al2.TriangleVertices);

    // O 1
    var O1 = sphere(5);
    O1.scale(scalesize[7] * scalerate, scalesize[7] * scalerate, scalesize[7] * scalerate);
    O1.translate(-0.8, -0.25, 0.0);

    Al2O3colors = Al2O3colors.concat(O1.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(O1.TriangleVertices);

    // O 2
    var O2 = sphere(5);
    O2.scale(scalesize[7] * scalerate, scalesize[7] * scalerate, scalesize[7] * scalerate);
    O2.translate(0.0, -0.25, 0.0);

    Al2O3colors = Al2O3colors.concat(O2.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(O2.TriangleVertices);
    
    // O 3
    var O3 = sphere(5);
    O3.scale(scalesize[7] * scalerate, scalesize[7] * scalerate, scalesize[7] * scalerate);
    O3.translate(+0.8, -0.25, 0.0);

    Al2O3colors = Al2O3colors.concat(O3.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(O3.TriangleVertices);

    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.03,0.5,0.03);
    linkCs1.rotate(140, [0, 0, 1]);
    linkCs1.translate(-0.6, +0.05, 0.0);

    Al2O3colors = Al2O3colors.concat(linkCs1.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(linkCs1.TriangleVertices);
    
    // link Cs
    var linkCs2 = cylinder(72, 3, true);

    linkCs2.scale(0.03,0.5,0.03);
    linkCs2.rotate(140, [0, 0, 1]);
    linkCs2.translate(-0.6, -0.05, 0.0);

    Al2O3colors = Al2O3colors.concat(linkCs2.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(linkCs2.TriangleVertices);
    
    // link Cs
    var linkCs3 = cylinder(72, 3, true);

    linkCs3.scale(0.03,0.5,0.03);
    linkCs3.rotate(45, [0, 0, 1]);
    linkCs3.translate(-0.2, -0.05, 0.0);

    Al2O3colors = Al2O3colors.concat(linkCs3.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(linkCs3.TriangleVertices);
    
    // link Cs
    var linkCs4 = cylinder(72, 3, true);

    linkCs4.scale(0.03,0.5,0.03);
    linkCs4.rotate(135, [0, 0, 1]);
    linkCs4.translate(+0.2, -0.05, 0.0);

    Al2O3colors = Al2O3colors.concat(linkCs4.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(linkCs4.TriangleVertices);
    
    // link Cs
    var linkCs5 = cylinder(72, 3, true);

    linkCs5.scale(0.03,0.5,0.03);
    linkCs5.rotate(40, [0, 0, 1]);
    linkCs5.translate(+0.6, +0.05, 0.0);

    Al2O3colors = Al2O3colors.concat(linkCs5.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(linkCs5.TriangleVertices);
    
    // link Cs
    var linkCs6 = cylinder(72, 3, true);

    linkCs6.scale(0.03,0.5,0.03);
    linkCs6.rotate(40, [0, 0, 1]);
    linkCs6.translate(+0.6, -0.05, 0.0);

    Al2O3colors = Al2O3colors.concat(linkCs6.TriangleVertexColors);
    Al2O3points = Al2O3points.concat(linkCs6.TriangleVertices);

 //----------------------------------------------------------------------------------------------------------------------
 
/**** N2 ****/
    // N 1 c
    var leftN = sphere(5);
    leftN.scale(scalesize[6] * scalerate, scalesize[6] * scalerate, scalesize[6] * scalerate);
    leftN.translate(-0.18, 0.0, 0.0);

    N2colors = N2colors.concat(leftN.TriangleVertexColors);
    N2points = N2points.concat(leftN.TriangleVertices);

    // N 2 c
    var rightN = sphere(5);
    rightN.scale(scalesize[6] * scalerate, scalesize[6] * scalerate, scalesize[6] * scalerate);
    rightN.translate(+0.18, 0.0, 0.0);

    N2colors = N2colors.concat(rightN.TriangleVertexColors);
    N2points = N2points.concat(rightN.TriangleVertices);
    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.03,0.2,0.03);
    linkCs1.rotate(90, [0, 0, 1]);
    linkCs1.translate(0.0, +0.05, 0.0);

    N2colors = N2colors.concat(linkCs1.TriangleVertexColors);
    N2points = N2points.concat(linkCs1.TriangleVertices);
    
    // link Cs
    var linkCs2 = cylinder(72, 3, true);

    linkCs2.scale(0.03,0.2,0.03);
    linkCs2.rotate(90, [0, 0, 1]);
    linkCs2.translate(0.0, 0.0, 0.0);

    N2colors = N2colors.concat(linkCs2.TriangleVertexColors);
    N2points = N2points.concat(linkCs2.TriangleVertices);
    
    // link Cs
    var linkCs3 = cylinder(72, 3, true);

    linkCs3.scale(0.03,0.2,0.03);
    linkCs3.rotate(90, [0, 0, 1]);
    linkCs3.translate(0.0, -0.05, 0.0);

    N2colors = N2colors.concat(linkCs3.TriangleVertexColors);
    N2points = N2points.concat(linkCs3.TriangleVertices);

//----------------------------------------------------------------------------------------------------------------------

    /**** H2 ****/
    // H 1 c
    var leftH = sphere(5);
    leftH.scale(scalesize[0] * scalerate, scalesize[0] * scalerate, scalesize[0] * scalerate);
    leftH.translate(-0.1, 0.0, 0.0);

    H2colors = H2colors.concat(leftH.TriangleVertexColors);
    H2points = H2points.concat(leftH.TriangleVertices);

    // H 2 c
    var rightH = sphere(5);
    rightH.scale(scalesize[0] * scalerate, scalesize[0] * scalerate, scalesize[0] * scalerate);
    rightH.translate(+0.1, 0.0, 0.0);

    H2colors = H2colors.concat(rightH.TriangleVertexColors);
    H2colors= H2points.concat(rightH.TriangleVertices);

    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.06,0.2,0.06);
    linkCs1.rotate(90, [0, 0, 1]);
    linkCs1.translate(0.0, 0.0, 0.0);

    H2colors = H2colors.concat(linkCs1.TriangleVertexColors);
    H2colors = H2colors.concat(linkCs1.TriangleVertices);

//--------------------------------------------------------------------------------------------------------------------------------------------------
     
/**** MgO ****/
    // Mg c
    var leftMg = sphere(5);
    leftMg.scale(scalesize[10] * scalerate, scalesize[10] * scalerate, scalesize[10] * scalerate);
    leftMg.translate(-0.3, 0.0, 0.0);

    MgOcolors = MgOcolors.concat(leftMg.TriangleVertexColors);
    MgOpoints = MgOpoints.concat(leftMg.TriangleVertices);
    
    // O c
    var rightO = sphere(5);
    rightO.scale(scalesize[7] * scalerate, scalesize[7] * scalerate, scalesize[7] * scalerate);
    rightO.translate(+0.3, 0.0, 0.0);

    MgOcolors = MgOcolors.concat(rightO.TriangleVertexColors);
    MgOpoints = MgOpoints.concat(rightO.TriangleVertices);
    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);
    var linkCs2 = cylinder(72, 3, true);

    linkCs1.scale(0.05,0.4,0.05);
    linkCs1.rotate(90, [0, 0, 1]);
    linkCs1.translate(0.0, 0.05, 0.0);

    linkCs2.scale(0.05,0.4,0.05);
    linkCs2.rotate(90, [0, 0, 1]);
    linkCs2.translate(0.0, -0.05, 0.0);

    MgOcolors = MgOcolors.concat(linkCs1.TriangleVertexColors);
    MgOpoints = MgOpoints.concat(linkCs1.TriangleVertices);

    MgOcolors = MgOcolors.concat(linkCs2.TriangleVertexColors);
    MgOpoints = MgOpoints.concat(linkCs2.TriangleVertices);
    
//------------------------------------------------------------------------------------------------------------
  
/**** NH3 ****/
    // N 1
    var N1 = sphere(5);
    N1.scale(scalesize[6] * scalerate, scalesize[6] * scalerate, scalesize[6] * scalerate);
    N1.translate( 0.0, +0.07, 0.0);

    NH3colors = NH3colors.concat(N1.TriangleVertexColors);
    NH3points = NH3points.concat(N1.TriangleVertices);
    
    // H 1
    var H1 = sphere(5);
    H1.scale(scalesize[0] * scalerate, scalesize[0] * scalerate, scalesize[0] * scalerate);
    H1.translate(+0.25, -0.07, +0.16);

    NH3colors = NH3colors.concat(H1.TriangleVertexColors);
    NH3points = NH3points.concat(H1.TriangleVertices);
    
    // H 2
    var H2 = sphere(5);
    H2.scale(scalesize[0] * scalerate, scalesize[0] * scalerate, scalesize[0] * scalerate);
    H2.translate(-0.25, -0.07, +0.16);

    NH3colors = NH3colors.concat(H2.TriangleVertexColors);
    NH3points = NH3points.concat(H2.TriangleVertices);

    // H 3
    var H3 = sphere(5);
    H3.scale(scalesize[0] * scalerate, scalesize[0] * scalerate, scalesize[0] * scalerate);
    H3.translate(0.0, -0.07, -0.25);

    NH3colors = NH3colors.concat(H3.TriangleVertexColors);
    NH3points = NH3points.concat(H3.TriangleVertices);


    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.03,0.4,0.03);
    linkCs1.rotate(120, [0, 0, 1]);
    linkCs1.rotate(30, [0, 1, 0]);
    linkCs1.translate(-0.08, 0.05, 0.05);

    NH3colors = NH3colors.concat(linkCs1.TriangleVertexColors);
    NH3points = NH3points.concat(linkCs1.TriangleVertices);
    
    // link Cs
    var linkCs2 = cylinder(72, 3, true);

    linkCs2.scale(0.03,0.4,0.03);
    linkCs2.rotate(120, [0, 0, 1]);
    linkCs2.rotate(270, [0, 1, 0]);
    linkCs2.translate(0.0, 0.05, -0.08);

    NH3colors = NH3colors.concat(linkCs2.TriangleVertexColors);
    NH3points = NH3points.concat(linkCs2.TriangleVertices);
    
    // link Cs
    var linkCs3 = cylinder(72, 3, true);

    linkCs3.scale(0.03,0.4,0.03);
    linkCs3.rotate(120, [0, 0, 1]);
    linkCs3.rotate(150, [0, 1, 0]);
    linkCs3.translate(0.08, 0.05, 0.05);

    NH3colors = NH3colors.concat(linkCs3.TriangleVertexColors);
    NH3points = NH3points.concat(linkCs3.TriangleVertices);
    
//----------------------------------------------------------------------------------------------------------------------------------------------------- 

/**** HCN ****/
	// H
	var H = sphere(5);
	H.scale(scalesize[0] * scalerate,scalesize[0] * scalerate,scalesize[0] * scalerate);
	H.translate(-0.4, 0.0, 0.0);
	HCNpoints = HCNpoints.concat(H.TriangleVertices);
	HCNcolors = HCNcolors.concat(H.TriangleVertexColors);
	
	// C
	var C= sphere(5);
	C.scale(scalesize[5] * scalerate,scalesize[5] * scalerate,scalesize[5] * scalerate);
	C.translate(0.0, 0.0, 0.0);
	HCNpoints = HCNpoints.concat(C.TriangleVertices);
	HCNcolors = HCNcolors.concat(C.TriangleVertexColors);
	
	// N
	var N = sphere(5);
	N.scale(scalesize[6] * scalerate,scalesize[6] * scalerate,scalesize[6] * scalerate);
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
//----------------------------------------------------------------------------------------------------------------------

/**** CH4 ****/
	// C
	var C= sphere(5);
	C.scale(scalesize[5] * scalerate,scalesize[5] * scalerate,scalesize[5] * scalerate);
	C.translate(0.0, 0.0, 0.0);
	HCNpoints = HCNpoints.concat(C.TriangleVertices);
	HCNcolors = HCNcolors.concat(C.TriangleVertexColors);

 //----------------------------------------------------------------------------------------------------------------------



/**** CH3OH ****/

//----------------------------------------------------------------------------------------------------------------------

/**** H2CO3 ****/

//----------------------------------------------------------------------------------------------------------------------

/**** F2****/
	// left F
	var F = sphere(5);
	F.scale(scalesize[8] * scalerate,scalesize[8] * scalerate,scalesize[8] * scalerate);
	F.translate(-0.2, 0.0, 0.0);
	F2points = F2points.concat(F.TriangleVertices);
	F2colors = F2colors.concat(F.TriangleVertexColors);
	
	// right O
	F = sphere(5);
	F.scale(scalesize[8] * scalerate,scalesize[8] * scalerate,scalesize[8] * scalerate);
	F.translate(+0.2, 0.0, 0.0);
	F2points = F2points.concat(F.TriangleVertices);
	F2colors = F2colors.concat(F.TriangleVertexColors);
	
	// double link Os
	var linkFs = cylinder(72, 3, true);
	linkFs.scale(0.03,0.3,0.03);
	linkFs.rotate(90, [0, 0, 1]);
	linkFs.translate(0.0, +0.02, 0.0);
	F2points = F2points.concat(linkFs.TriangleVertices);
	F2colors = F2colors.concat(linkFs.TriangleVertexColors);
	
	linkFs = cylinder(72, 3, true);
	linkFs.scale(0.03,0.3,0.03);
	linkFs.rotate(90, [0, 0, 1]);
	linkFs.translate(0.0, -0.02, 0.0);
	F2points = F2points.concat(linkFs.TriangleVertices);
	F2colors = F2colors.concat(linkFs.TriangleVertexColors);
//----------------------------------------------------------------------------------------------------------------------

/**** CO ****/

//----------------------------------------------------------------------------------------------------------------------

/**** BF3 ****/

//----------------------------------------------------------------------------------------------------------------------

/**** C2H4 ****/

//----------------------------------------------------------------------------------------------------------------------

/**** C2H6 ****/

//----------------------------------------------------------------------------------------------------------------------

/****NaCO3 ****/

//----------------------------------------------------------------------------------------------------------------------



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
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
	vLocationLoc = gl.getUniformLocation( program, "vLocation" );
	
   document.getElementById("make").onclick = function (){
		// Get the value of input elements
		for(var k = 0; k < 12; k++){
			if(document.getElementById(eval("'"+k+"'")).style.display=="none"){
				evaluating_input[k] = 0;
			}
			else {
				var numberOfInput = parseInt(document.getElementById(eval("'"+k+"'")).value);
				if( numberOfInput == NaN)
					evaluating_input[k] = 0;
				else
					evaluating_input[k] = numberOfInput;
			}
		}
		// evaluate the input whether we can make this compound or not
		for(var k = 0; k < 18; k++){
			if(JSON.stringify(evaluating_input)==JSON.stringify(compound[k]))
				result_idx = k
		}	
		
		if(result_idx==-1){
			console.log("Can't make the compound!");
			restart();
		}
		else{
			console.log(compound_result[result_idx]);
			render_compound(result_idx);
			// 추후에 이 부분은 render_compound와 연결해줘야함
		}	
   };
}

function render_element(i)
{
	// clear canvas
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	document.getElementById(eval("'"+i+"'")).style.display="block";
	
	// set model view matrix 
	var mainSphere = sphere(5);
	mainSphere.scale( scalesize[i]*scalerate, scalesize[i]*scalerate, scalesize[i]*scalerate); 
	points = points.concat(mainSphere.TriangleVertices);
	colors = colors.concat(mainSphere.TriangleVertexColors);

	var electronic ;
	for (var k = 0; k < electroNum[i]; k += 1){
		console.log("electronic draw!");
		var j = k * 45 * Math.PI / 180;
		electronic = sphere(5);
		electronic.scale(electroniscalesize * scalerate,electroniscalesize * scalerate,electroniscalesize * scalerate);
		// ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
		electronic.translate (Math.sin(j) * (scalesize[k] * scalerate+ 0.05), 0.0 , Math.cos(j) * (scalesize[k] * scalerate+ 0.05));
		
		points = points.concat(electronic.TriangleVertices);
		colors = colors.concat(electronic.TriangleVertexColors);
	}
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
	//console.log('Marker Found: ', markerId);	
	// console.log(position);
	gl.uniform3f(vLocationLoc, position.x/10, position.y/10, - position.z/10);
	// draw	

    gl.drawArrays( gl.TRIANGLES, 0, points.length);
	
	
}
function render_compound(idx){
	switch (idx){
		case 0 :
			points = JSON.parse(JSON.stringify(H2points));
			colors = JSON.parse(JSON.stringify(H2colors));
			break;
		case 1 :
			points = JSON.parse(JSON.stringify(N2points));
			colors = JSON.parse(JSON.stringify(N2colors));
			break;
		case 2 :
			points = JSON.parse(JSON.stringify(F2points));
			colors = JSON.parse(JSON.stringify(F2colors));
			break;
		case 3 :
			points = JSON.parse(JSON.stringify(O2points));
			colors = JSON.parse(JSON.stringify(O2colors));
			break;
		case 4 :
			points = JSON.parse(JSON.stringify(COpoints));
			colors = JSON.parse(JSON.stringify(COcolors));
			break;
		case 5 :
			points = JSON.parse(JSON.stringify(CH4points));
			colors = JSON.parse(JSON.stringify(CH4colors));
			break;
		case 6 :
			points = JSON.parse(JSON.stringify(BF3points));
			colors = JSON.parse(JSON.stringify(BF3colors));
			break;
		case 7 :
			points = JSON.parse(JSON.stringify(CO2points));
			colors = JSON.parse(JSON.stringify(CO2colors));
			break;
		case 8 :
			points = JSON.parse(JSON.stringify(H2Opoints));
			colors = JSON.parse(JSON.stringify(H2Ocolors));
			break;
		case 9 :
			points = JSON.parse(JSON.stringify(C2H4points));
			colors = JSON.parse(JSON.stringify(C2H4colors));
			break;
		case 10 :
			points = JSON.parse(JSON.stringify(HCNpoints));
			colors = JSON.parse(JSON.stringify(HCNcolors));
			break;
		case 11 :
			points = JSON.parse(JSON.stringify(MgOpoints));
			colors = JSON.parse(JSON.stringify(MgOcolors));
			break;
		case 12 :
			points = JSON.parse(JSON.stringify(NH3points));
			colors = JSON.parse(JSON.stringify(NH3colors));
			break;
		case 13 :
			points = JSON.parse(JSON.stringify(C2H6points));
			colors = JSON.parse(JSON.stringify(C2H6colors));
			break;
		case 14 :
			points = JSON.parse(JSON.stringify(CH3OHpoints));
			colors = JSON.parse(JSON.stringify(CH3OHcolors));
			break;
		case 15 :
			points = JSON.parse(JSON.stringify(H2CO3points));
			colors = JSON.parse(JSON.stringify(H2CO3colors));
			break;
		case 16 :
			points = JSON.parse(JSON.stringify(Al2O3points));
			colors = JSON.parse(JSON.stringify(Al2O3colors));
			break;
		case 17 :
			points = JSON.parse(JSON.stringify(NaCO3points));
			colors = JSON.parse(JSON.stringify(NaCO3colors));
			break;
	}
	

	// clear canvas
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
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
function restart(){
	// clear canvas
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	points = [];
	colors = [];
	document.getElementById("get_input").reset();
	for(var k = 0; k < 12; k++){
		document.getElementById(eval("'"+k+"'")).style.display="none";
	}
	result_idx = -1;
}

