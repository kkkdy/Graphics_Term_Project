
var gl;
var points;

//--민지--//
var maxNumTriangles = 200;
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;

var starColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];

//------//

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    //--민지--//
    canvas.addEventListener("mousedown", function(event){
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        var t = vec2(2*event.clientX/canvas.width-1, 
                     2*(canvas.height-event.clientY)/canvas.height-1);
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));
        
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        t = vec4(starColors[(index)%7]);
        gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
        index++;
    });
    //------//

    //////////[Start Sky Vertices]//////////////////////////////////////
    //sky vertices
    var skyVertices = [
        vec2(-1, 1), 
        vec2(-1, -1), 
        vec2(1, -1), 
        vec2(1, 1), 
    ];
   
    //sky colors
    var skyColors = [
        vec4(0.1, 0.07, 0.2, 0.95), 
        vec4(0.5, 0.3, 0.1, 0.8),
        vec4(0.4, 0.3, 0.15, 1.0),
        vec4(0.1, 0.07, 0.2, 0.95), 
    ];
    //////////[End Sky Vertices]/////////////////////////////////////////
    
    //////////[Start Mountain Vertices]//////////////////////////////////  
    // mountain1 vertices
    var mountain1Vertices = [
		vec2(-1.5, -0.5),
        vec2(-0.6, 0.4),
        vec2(1, -0.5),  
    ];
        
    // mountain2 vertices
    var mountain2Vertices = [
		vec2(-1, -0.5),
        vec2(0.1, 0.3),
        vec2(1.5, -0.5),   
    ];
    //////////[End River Vertices]////////////////////////////////////////
    
    
    //////////[Start Building Vertices]/////////////////////////////////// 
    //**Start from the right side**//
    
    // building1 vertices
    var building1Vertices = [
		vec2(0.8, -0.04),
        vec2(1.0, -0.04),
        vec2(0.8, -0.4), 
		vec2(1.0, -0.04), 
        vec2(0.8, -0.4),
        vec2(1.0, -0.4),  
    ];
    
    // building2 vertices
    var building2Vertices = [
        vec2(0.6, 0.0), 
        vec2(0.8, 0.0),
        vec2(0.6, -0.4),  
        vec2(0.8, 0.0), 
        vec2(0.6, -0.4),
        vec2(0.8, -0.4),  
    ];
    
    // building3 vertices
    var building3Vertices = [
        vec2(0.3, -0.1), 
        vec2(0.6, -0.1),
        vec2(0.3, -0.4),  
        vec2(0.6, -0.1), 
        vec2(0.3, -0.4),
        vec2(0.6, -0.4),  
    ];

    // building4 vertices
    var building4Vertices = [
        vec2(0.0, 0.1), 
        vec2(0.3, 0.1),
        vec2(0.0, -0.4),  
        vec2(0.3, 0.1), 
        vec2(0.0, -0.4),
        vec2(0.3, -0.4),  
    ];
        
    // building5 vertices
    var building5Vertices = [
        vec2(-0.2, 0.0), 
        vec2(0.0, 0.0),
        vec2(-0.2, -0.4),  
        vec2(0.0, 0.0),
        vec2(-0.2, -0.4),
        vec2(0.0, -0.4),  
    ];
    
    // building6 vertices
    var building6Vertices = [
        vec2(-0.5, -0.05), 
        vec2(-0.2, -0.05),
        vec2(-0.5, -0.4),  
        vec2(-0.2, -0.05), 
        vec2(-0.5, -0.4),
        vec2(-0.2, -0.4),  
    ];
 
    // building7 vertices
    var building7Vertices = [
        vec2(-0.7, 0.05), 
        vec2(-0.5, 0.05),
        vec2(-0.7, -0.4),  
        vec2(-0.5, 0.05), 
        vec2(-0.7, -0.4),
        vec2(-0.5, -0.4),  
    ];
    
    // building8 vertices
    var building8Vertices = [
        vec2(-1, 0.03), 
        vec2(-0.7, 0.03),
        vec2(-1, -0.4),  
        vec2(-0.7, 0.03), 
        vec2(-1, -0.4),
        vec2(-0.7, -0.4),  
    ];
    //////////[End Building Vertices]//////////////////////////////////////
    
    //////////[Start Window Vertices]//////////////////////////////////////  
    //**Start from the right side**//
    
    // window1 vertices
    var window1Vertices = [
        vec2(0.78, -0.14), 
        vec2(0.72, -0.14),
        vec2(0.78, -0.18),  
        vec2(0.72, -0.14), 
        vec2(0.78, -0.18),
        vec2(0.72, -0.18),  
    ];
    
    // window2 vertices
    var window2Vertices = [
        vec2(0.05, 0.05), 
        vec2(0.12, 0.05),
        vec2(0.05, -0.02),  
        vec2(0.12, 0.05), 
        vec2(0.05, -0.02),
        vec2(0.12, -0.02),  
    ];
    
    // window3 vertices
    var window3Vertices = [
        vec2(0.18, -0.22), 
        vec2(0.25, -0.22),
        vec2(0.18, -0.15),  
        vec2(0.25, -0.22), 
        vec2(0.18, -0.15),
        vec2(0.25, -0.15),   
    ];
    
    // window4 vertices
    var window4Vertices = [
        vec2(-0.07, -0.3), 
        vec2(-0.02, -0.3),
        vec2(-0.07, -0.21),  
        vec2(-0.02, -0.3), 
        vec2(-0.07, -0.21),
        vec2(-0.02, -0.21),  
    ];
    
    // window5 vertices
    var window5Vertices = [
        vec2(-0.45, -0.25), 
        vec2(-0.37, -0.25),
        vec2(-0.45, -0.18),  
        vec2(-0.37, -0.25), 
        vec2(-0.45, -0.18),
        vec2(-0.37, -0.18),  
    ];
    
    // window6 vertices
    var window6Vertices = [
        vec2(-0.86, -0.08), 
        vec2(-0.95, -0.08),
        vec2(-0.86, -0.12),  
        vec2(-0.95, -0.08), 
        vec2(-0.86, -0.12),
        vec2(-0.95, -0.12),  
    ];
    //////////[End Window Vertices]//////////////////////////////////////
    
    //////////[Start Star0 Vertices]//////////////////////////////////////
    //** hexagon means star's body **//
    //** stars[the star's number][the star's vertex number] **//
    //** Start from 0 to 5 **//
    //** Turn anticlockwise **//
    
    //hexagon0 vertices
    var hexagon0Vertices = [
        vec2(-0.465, 0.75), 
        vec2(-0.48, 0.785),
        vec2(-0.52, 0.785), 
        vec2(-0.535, 0.75), 
        vec2(-0.52, 0.725), 
        vec2(-0.48, 0.725), 
        vec2(-0.465, 0.75), 
    ];
    
    //star00 vertices
    var star00Vertices = [
        vec2(-0.48, 0.785),
        vec2(-0.52, 0.785), 
        vec2(-0.5, 0.82), 
    ];
    
    //star01 vertices
    var star01Vertices = [
        vec2(-0.52, 0.785), 
        vec2(-0.535, 0.75), 
        vec2(-0.56, 0.785),
    ];
    
    //star02 vertices
    var star02Vertices = [
        vec2(-0.535, 0.75), 
        vec2(-0.52, 0.725), 
        vec2(-0.56, 0.725), 
    ];
    
    //star03 vertices
    var star03Vertices = [
        vec2(-0.52, 0.725), 
        vec2(-0.48, 0.725), 
        vec2(-0.5, 0.69), 
    ];
    
    //star04 vertices
    var star04Vertices = [
        vec2(-0.48, 0.725), 
        vec2(-0.465, 0.75), 
        vec2(-0.44, 0.725), 
    ];
    
    //star05 vertices
    var star05Vertices = [
        vec2(-0.465, 0.75), 
        vec2(-0.48, 0.785),
        vec2(-0.44, 0.785), 
    ];
    //////////[End Star0 Vertices]////////////////////////////////////// 
    
    //////////[Start Star1 Vertices]//////////////////////////////////////
    //hexagon1 vertices
    var hexagon1Vertices = [
        vec2(0.59, 0.43),
        vec2(0.57, 0.46), 
        vec2(0.53, 0.46), 
        vec2(0.51, 0.43), 
        vec2(0.53, 0.4), 
        vec2(0.57, 0.4), 
        vec2(0.59, 0.43), 
    ];
    
    //star10 vertices
    var star10Vertices = [
        vec2(0.57, 0.46), 
        vec2(0.53, 0.46), 
        vec2(0.55, 0.48), 
    ];
    
    //star11 vertices
    var star11Vertices = [
        vec2(0.53, 0.46), 
        vec2(0.51, 0.43), 
        vec2(0.5, 0.46), 
    ];
    
    //star12 vertices
    var star12Vertices = [
        vec2(0.51, 0.43), 
        vec2(0.53, 0.4),
        vec2(0.5, 0.405), 
    ];
    
    //star13 vertices
    var star13Vertices = [
        vec2(0.53, 0.4),
        vec2(0.57, 0.4), 
        vec2(0.55, 0.37), 
    ];
    
    //star14 vertices
    var star14Vertices = [
        vec2(0.57, 0.4), 
        vec2(0.59, 0.43),
        vec2(0.6, 0.4), 
    ];
    
    //star15 vertices
    var star15Vertices = [
        vec2(0.59, 0.43),
        vec2(0.57, 0.46), 
        vec2(0.6, 0.46), 
    ];
    //////////[End Star1 Vertices]////////////////////////////////////// 
    
    //////////[Start River Vertices]//////////////////////////////////////
    // river vertices
    var riverVertices = [
        vec2(-1, -0.4), 
        vec2(-1, -1), 
        vec2(1, -1), 
        vec2(1, -0.4), 
    ];
    
    // river colors    
    var riverColors = [
        vec4(0.0, 0.0, 0.2, 1.0), 
        vec4(0.0, 0.5, 0.5, 1.0), 
        vec4(0.1, 0.5, 0.8, 1.0), 
        vec4(0.0, 0.0, 0.5, 1.0), 
    ];
    //////////[End River Vertices]//////////////////////////////////////
    
    
    //////////[Start River bank Vertices]////////////////////////////////// 
    // river bank vertices
    var riverBankVertices = [
		vec2(-1.0, -0.33),
        vec2(1.0, -0.33),
        vec2(-1.0, -0.4), 
		vec2(1.0, -0.4), 
        vec2(-1.0, -0.4),
        vec2(1.0, -0.33),     
    ];
    //////////[End River bank Vertices]//////////////////////////////////////
    
    
    /*-----------------------------------------------------------------------*/
	/* Background -----------------------------------------------------------*/
	/*-----------------------------------------------------------------------*/
    
    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    
    //--민지--//
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW);
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    
    render();
    
    //-------//
    
   ///////////////////////////////////////////////////////////////////
    
    var skyBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, skyBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(skyVertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, skyBufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.1, 0.07, 0.2, 0.95);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    /*-----------------------------------------------------------------------*/
	/* Sky ------------------------------------------------------------------*/
	/*-----------------------------------------------------------------------*/
    
    var skyBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, skyBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(skyVertices), gl.STATIC_DRAW );
    
    var skyColorBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, skyColorBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(skyColors), gl.STATIC_DRAW );
    
    // Associate out shader variables with our data buffer
    
    gl.bindBuffer( gl.ARRAY_BUFFER, skyBufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    
    gl.bindBuffer( gl.ARRAY_BUFFER, skyColorBufferId);
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    
    // Draw the square
    
    gl.enableVertexAttribArray( vPosition );
    gl.enableVertexAttribArray(vColor);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    
    
    /*-----------------------------------------------------------------------*/
	/* Mountain -------------------------------------------------------------*/
	/*-----------------------------------------------------------------------*/
    
    var mountain1BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, mountain1BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(mountain1Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, mountain1BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0, 0.15, 0.15, 0.95);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    ////////////////////////////////////////////////////////////////////
    
    var mountain2BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, mountain2BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(mountain2Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, mountain2BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0, 0.15, 0.15, 0.9);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    
    /*-----------------------------------------------------------------------*/
	/* Buildings ------------------------------------------------------------*/
	/*-----------------------------------------------------------------------*/
    
    //Building 1
    
    var building1BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, building1BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(building1Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, building1BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.84);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    /////////////////////////////////////////////////////////////////////
    //Building 2
    
    var building2BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, building2BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(building2Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, building2BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.8);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
   
    /////////////////////////////////////////////////////////////////////
    //Building 3
    
    var building3BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, building3BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(building3Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, building3BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.87);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    /////////////////////////////////////////////////////////////////////
    //Building 4
    
    var building4BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, building4BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(building4Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, building4BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.84);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    /////////////////////////////////////////////////////////////////////
   //Building 5
    
    var building5BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, building5BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(building5Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, building5BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.86);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    /////////////////////////////////////////////////////////////////////
    //Building 6
    
    var building6BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, building6BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(building6Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, building6BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.87);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    /////////////////////////////////////////////////////////////////////
    //Building 7
    
    var building7BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, building7BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(building7Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, building7BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.87);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    /////////////////////////////////////////////////////////////////////
    //Building 8
    
    var building8BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, building8BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(building8Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, building8BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.85);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    //////////[End Mountain Drawing]//////////////////////////////////
    //////////////////////////////////////////////////////////////////
   
    
    /*-----------------------------------------------------------------------*/
	/* Windows --------------------------------------------------------------*/
	/*-----------------------------------------------------------------------*/

    //Window 1
    
    var window1BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, window1BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(window1Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, window1BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.3, 0.3, 0.1, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    /////////////////////////////////////////////////////////////////
    //Window 2
    
    var window2BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, window2BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(window2Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, window2BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.25, 0.25, 0.03, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    
    /////////////////////////////////////////////////////////////////
    //Window 3

    var window3BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, window3BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(window3Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, window3BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.25, 0.25, 0.1, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
   
    /////////////////////////////////////////////////////////////////
    //Window 4

    var window4BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, window4BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(window4Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, window4BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.25, 0.25, 0.1, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    /////////////////////////////////////////////////////////////////
    //Window 5
 
    var window5BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, window5BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(window5Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, window5BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.2, 0.2, 0, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    
    /////////////////////////////////////////////////////////////////
    //Window 6
 
    var window6BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, window6BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(window6Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, window6BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.25, 0.25, 0, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
   
    
    /*-----------------------------------------------------------------------*/
	/* Stars ----------------------------------------------------------------*/
	/*-----------------------------------------------------------------------*/
    
    //Star 0
    //Star 0's body
    
    var hexagon0BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, hexagon0BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(hexagon0Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the hexagon
    
    gl.bindBuffer( gl.ARRAY_BUFFER, hexagon0BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 7);
    
    //////////////////////////////////////////////////////////////////////////
    //Star 0's vertex0
    
    var star00BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star00BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star00Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star00BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    
    //////////////////////////////////////////////////////////////////////////
    //Star 0's vertex1
    
    var star01BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star01BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star01Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star01BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    //////////////////////////////////////////////////////////////////////////
    //Star 0's vertex2
     
    var star02BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star02BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star02Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star02BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    //////////////////////////////////////////////////////////////////////////
    //Star 0's vertex3
     
    var star03BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star03BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star03Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star03BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    //////////////////////////////////////////////////////////////////////////
    //Star 0's vertex4
     
    var star04BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star04BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star04Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star04BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    //////////////////////////////////////////////////////////////////////////
    //Star 0's vertex5
     
    var star05BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star05BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star05Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star05BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    //Star 1
    //Star 1's body
    
    var hexagon1BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, hexagon1BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(hexagon1Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the hexagon
    
    gl.bindBuffer( gl.ARRAY_BUFFER, hexagon1BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 7);
    
    //////////////////////////////////////////////////////////////////////////
    //Star 1's vertex0
      
    var star10BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star10BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star10Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star10BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    
    //////////////////////////////////////////////////////////////////////////
    //Star 1's vertex1
 
    var star11BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star11BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star11Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star11BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    //////////////////////////////////////////////////////////////////////////
    //Star 1's vertex2
  
    var star12BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star12BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star12Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star12BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    //////////////////////////////////////////////////////////////////////////
    //Star 1's vertex3
 
    var star13BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star13BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star13Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star13BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    //////////////////////////////////////////////////////////////////////////
    //Star 1's vertex4
 
    var star14BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star14BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star14Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star14BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    
    //////////////////////////////////////////////////////////////////////////
    //Star 1's vertex5
  
    var star15BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star15BufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(star15Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, star15BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
   
    
    /*-----------------------------------------------------------------------*/
	/* River ----------------------------------------------------------------*/
	/*-----------------------------------------------------------------------*/
       
    var riverBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, riverBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(riverVertices), gl.STATIC_DRAW );
    
    var riverColorBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, riverColorBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(riverColors), gl.STATIC_DRAW );
    
    // Associate out shader variables with our data buffer
    
    gl.bindBuffer( gl.ARRAY_BUFFER, riverBufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    
    gl.bindBuffer( gl.ARRAY_BUFFER, riverColorBufferId);
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    
    // Draw the square
    
    gl.enableVertexAttribArray( vPosition );
    gl.enableVertexAttribArray(vColor);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    
    /*-----------------------------------------------------------------------*/
	/* River bank -----------------------------------------------------------*/
	/*-----------------------------------------------------------------------*/
    
    var riverBankBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, riverBankBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(riverBankVertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, riverBankBufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.9);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
}; 

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, index);
    
    window.requestAnimFrame(render);
}


