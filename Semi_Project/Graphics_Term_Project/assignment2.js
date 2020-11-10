var gl;
var points;
var vColor;
var vPosition;

/* direction */
var dog_direction = true;
var ball_direction = false;

/* rotate */
var thetaLoc;
var theta;

/* direction */
var offsetTemp = +0.55;
var xoffset;
var yoffset;

/* animation */
var delay = 100;

/* star (add on click) */
var arrayVertex = [];
   
//One of event handling function init()   
window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
   
    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
   
    //  Load shaders and initialize attribute buffers 
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
     
   
    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    vColor = gl.getAttribLocation( program, "vColor" );
    thetaLoc = gl.getUniformLocation( program, "theta");
    xoffset = gl.getUniformLocation(program, "xoffset");
    yoffset = gl.getUniformLocation(program, "yoffset");

       
   window.addEventListener("keydown", render);
   // for moving animation, set the interval
   var intervalId = setInterval ( render, delay );
   render(); 
   
/* event listener */
   // Changing the direction for "dog" object using button eventhandler
   document.getElementById("Dog").onclick = function() {
      //console.log(event.button);
      dog_direction = !dog_direction;// change the boolean variable
      render();// call the render function to redraw
   }
   // Changing the direction for "ball" object using button eventhandler
   document.getElementById("Ball").onclick = function() {
      //console.log(event.button);
      ball_direction = !ball_direction;// change the boolean variable
      render();// call the render function to redraw
   }
    canvas.addEventListener("mousedown", function(event){
      // gl.bindBuffer(gl.ARRAY_BUFFER, starCreateBufferId);
      var t = vec2(2 * event.clientX/canvas.width - 1,
         2 * (canvas.height - event.clientY)/canvas.height - 1);
   
      // arrayVertex = t;
      arrayVertex.push(t);
      arrayVertex.push(vec2(t[0]-0.04, t[1]-0.06));
      arrayVertex.push(vec2(t[0]+0.04, t[1]-0.06));
      arrayVertex.push(vec2(t[0], t[1]-0.08));
      arrayVertex.push(vec2(t[0]-0.04, t[1]-0.018));
      arrayVertex.push(vec2(t[0]+0.04, t[1]-0.018));

      console.log(arrayVertex);
         
        // gl.bufferSubData(gl.ARRAY_BUFFER, (8 * index)* 6, flatten(arrayVertex));
    });
   
};

// rendering function for specific object that animating direction can be changed : dog, ball 
function render_object(){
   //using "dog_direction" variable, set the theta(uniform value)
   theta = (dog_direction ? 1 : -1);
   gl.uniform1f(thetaLoc, theta);
   
   //for using above vertex array, resizing the vertex
   var resizingDogbody = resizeVertex(JSON.parse(JSON.stringify(dogbody)), 0.25);
   var resizingDog = resizeVertex(JSON.parse(JSON.stringify(dog)), 0.25);
   
   /* for moving animation, set the offset value for x-axis*/
   // if ball draws out of canvas, reset the offset value for showing on canvas
   
   if(offsetTemp<-1) offsetTemp+=2;
   // if ball draws in canvas, update the offset value to move in canvas for specific time interval
   else offsetTemp -= 0.05;
   
   // send the offset value for x,y-axis to shader   
   gl.uniform1f(xoffset,offsetTemp);
   gl.uniform1f(yoffset,-0.27);
   
   /* start draw dog */
   // draw dog body
    
   var dogBufferId = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, dogBufferId );
   
   gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(vPosition);
   gl.disableVertexAttribArray(vColor);
   gl.vertexAttrib4f(vColor, 190/255, 170/255, 130/255, 1.0);
   gl.bufferData( gl.ARRAY_BUFFER,flatten(resizingDogbody), gl.STATIC_DRAW );



   gl.drawArrays( gl.TRIANGLE_FAN, 0, 9 );// head
   gl.drawArrays( gl.TRIANGLES, 9, 3);// neck
   gl.drawArrays( gl.TRIANGLE_FAN, 12, 10);// body
   
   // draw dog's other part
   gl.bufferData( gl.ARRAY_BUFFER,flatten(resizingDog), gl.STATIC_DRAW );
   gl.vertexAttrib4f(vColor, 0.1, 0.05, 0.05, 1.0);
   gl.drawArrays( gl.TRIANGLE_FAN, 0, 7 );// ear
   
   gl.vertexAttrib4f(vColor, 190/255, 170/255, 130/255, 1.0);
   
   gl.drawArrays( gl.TRIANGLE_FAN, 7, 9 );// forefront-leg
   gl.drawArrays( gl.TRIANGLE_FAN, 14, 6 );// toe 
   gl.drawArrays( gl.TRIANGLE_FAN, 20, 9 );// foreback-leg
   gl.drawArrays( gl.TRIANGLE_FAN, 29, 9 );// rearfront-leg
   gl.drawArrays( gl.TRIANGLE_FAN, 29+7, 6 );// toe
   gl.drawArrays( gl.TRIANGLE_FAN, 29+7+6, 10 ); // rearback-leg
   gl.drawArrays( gl.TRIANGLE_STRIP, 29+7+6+10, 5 );// tail
   /* end draw dog */
   
   //using "ball_direction" variable, set the theta(uniform value)
   theta = (ball_direction ? 1 : -1);
   gl.uniform1f(thetaLoc, theta);
   
   /* for moving animation, set the offset value for x-axis*/
   // if ball draws out of canvas, reset the offset value for showing on canvas
   if(offsetTemp<-1) offsetTemp+=2;
   // if ball draws in canvas, update the offset value to move in canvas for specific time interval
   else offsetTemp -= 0.05;
   
   // send the offset value for x,y-axis to shader
   gl.uniform1f(xoffset,offsetTemp);
   gl.uniform1f(yoffset,-0.3);
   
   /* start ball dog */
   gl.vertexAttrib4f(vColor, 0.7, 0.1, 0.2, 1.0);
   // gl.uniform4fv( vColor, vec4(0.4, 0.1, 0.2, 1));
   gl.bufferData( gl.ARRAY_BUFFER,flatten(circle), gl.STATIC_DRAW );
   gl.drawArrays( gl.TRIANGLE_STRIP, 0, circle.length / 2);
   /* start ball dog */
}

// rendering function that contains background vertices information and drawing code using buffer.(drawArrays, buffer)
function render(starCreateBufferId){
/* set uniform values */
   theta = 1 ;
   gl.uniform1f(thetaLoc, theta);
   gl.uniform1f(xoffset, 0);
    gl.uniform1f(yoffset, 0);
   
   /*-----------------------------------------------------------------------*/
   /* Sky ------------------------------------------------------------------*/
   /*-----------------------------------------------------------------------*/
   gl.clear( gl.COLOR_BUFFER_BIT );
   
    var skyBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, skyBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(skyVertices), gl.STATIC_DRAW );
    
    // Draw the triangle
    
    gl.bindBuffer( gl.ARRAY_BUFFER, skyBufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.1, 0.07, 0.2, 0.95);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
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
    
        
    //gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );

    //gl.bufferData( gl.ARRAY_BUFFER,  8*maxNumvertices, gl.STATIC_DRAW);
    var starCreateBufferId = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, starCreateBufferId );
   gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayVertex), gl.STATIC_DRAW);
   gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(vPosition);
   gl.disableVertexAttribArray(vColor);
   gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.2, 0.5);
   gl.drawArrays(gl.TRIANGLES, 0, arrayVertex.length);
    

    
    // gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayVertex), gl.STATIC_DRAW );
    // gl.bufferData( gl.ARRAY_BUFFER, 8 * maxNumvertices * 6, gl.STATIC_DRAW);
   
   
    /*-----------------------------------------------------------------------*/
   /* Mountain -------------------------------------------------------------*/
   /*-----------------------------------------------------------------------*/
    
    var mountain1BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, mountain1BufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mountain1Vertices), gl.STATIC_DRAW );
    
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

    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, window6BufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.25, 0.25, 0, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
   
    
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
    
    // Draw the square
    
    gl.bindBuffer( gl.ARRAY_BUFFER, riverBankBufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.9);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
   
   

     
   // render ball & dog
    render_object();
}

/* vertices */
/* function for resizing vertex(using for drawing dog) : using parameter "x". scale the vertex value*/
function resizeVertex(vertex, x) {
    var newVertex = new Array();
    for (var i = 0; i < vertex.length; i++) {
        temp = vertex[i];
        temp[0] *= x;
        temp[1] *= x;
        newVertex[i] = temp;
    }
    return newVertex;
}
   /* dog */
var dogbody = [ 
    // head
    vec2(-0.5877, 0.4806), // q0, 0, start fan
    vec2(-0.2831, 0.2787), // c1, 1
    vec2(-0.4811, 0.5758), // d2, 2
    vec2(-0.6867, 0.6062), // e3, 3
    vec2(-0.7324, 0.5529), // f4, 4
    vec2(-0.8733, 0.5529), // g5, 5
    vec2(-0.8315, 0.4120), // h6, 6
    vec2(-0.6487, 0.3473), // i7, 7
    vec2(-0.2831, 0.2787), // c8, 8

    // neck
    vec2(-0.6487, 0.3473), // i0, 9, start triangles
    vec2(-0.2831, 0.2787), // c1, 10
    vec2(-0.3935, -0.0944), // j2, 11

    // body
    vec2(-0.0546, 0.1112), // r0, 12, start fan
    vec2(-0.2831, 0.2787), // c1, 13
    vec2(-0.3935, -0.0944), // j2, 14
    vec2(-0.2000, -0.2000), // k3, 15
    vec2( 0.0215, -0.0791), // l4, 16
    vec2( 0.3604, -0.0715), // m5, 17
    vec2( 0.4175, 0.0541), // n6, 18
    vec2( 0.3718, 0.1531), // o7, 19
    vec2( 0.1357, 0.3168), // p8, 20
    vec2(-0.2831, 0.2787), // c9, 21
];
   
var dog = [
    // ear
    vec2(-0.5709, 0.3494), // h0, 0, start triangle fan
    vec2(-0.5877, 0.5148), // c1, 1
    vec2(-0.6277, 0.2163), // d2, 2
    vec2(-0.5927, 0.1748), // e3, 3
    vec2(-0.4923, 0.3123), // f4, 4
    vec2(-0.5221, 0.4959), // g5, 5
    vec2(-0.5877, 0.5148), // c6, 6
      
    // forefront-leg
    vec2(-0.2216, -0.0914), // l0, 7, start triangle fan
    vec2(-0.3773, -0.0282), // c1, 8
    vec2(-0.1940, -0.3245), // d2, 9
    vec2(-0.1694, -0.2501), // g5, 10
    vec2(-0.1542, -0.0343), // h6, 11
    vec2(-0.2306, 0.0206), // i7, 12
    vec2(-0.3773, -0.0282), // c8, 13
    // toe
    vec2(-0.1364, -0.2832), // m0, 14, start triangle fan
    vec2(-0.1940, -0.3245), // d2, 15
    vec2(-0.0931, -0.3215), // e3, 16
    vec2(-0.0717, -0.2390), // f4, 17
    vec2(-0.1694, -0.2501), // g5, 18   
    vec2(-0.1940, -0.3245), // d6, 19
    
    //foreback-leg
    vec2(-0.3478, -0.2325), // h0, 20, start triangle fan
    vec2(-0.2624, -0.1580), // c1, 21
    vec2(-0.4168, -0.3495), // a2, 22
    vec2(-0.5197, -0.3637), // e3, 23
    vec2(-0.5146, -0.2996), // f4, 24
    vec2(-0.4210, -0.2304), // d5, 25
    vec2(-0.3864, -0.1725), // g6, 26
    vec2(-0.4119, -0.0707), // i7, 27
    vec2(-0.2624, -0.1580), // c8, 28
    
    // rearfront-leg
    vec2(-0.2216 + 0.5, -0.0914),
    vec2(-0.3773 + 0.5, -0.0282),
    vec2(-0.1940 + 0.5, -0.3245),
    vec2(-0.1694 + 0.5, -0.2501),
    vec2(-0.1542 + 0.5, -0.0343),
    vec2(-0.2306 + 0.5, 0.0206),
    vec2(-0.3773 + 0.5, -0.0282),
    // toe
    vec2(-0.1364 + 0.5, -0.2832), //start triangle fan
    vec2(-0.1940 + 0.5, -0.3245),
    vec2(-0.0931 + 0.5, -0.3215),
    vec2(-0.0717 + 0.5, -0.2390),
    vec2(-0.1694 + 0.5, -0.2501),   
    vec2(-0.1940 + 0.5, -0.3245),
     
    //rearback-leg
    vec2(-0.3478 + 0.5, -0.2325), //start triangle fan
    vec2(-0.3773 + 0.5, -0.0282), 
    vec2(-0.2624 + 0.5, -0.1580),
    vec2(-0.4168 + 0.5, -0.3495), 
    vec2(-0.5197 + 0.5, -0.3637),
    vec2(-0.5146 + 0.5, -0.2996),
    vec2(-0.4210 + 0.5, -0.2304),
    vec2(-0.3864 + 0.5, -0.1725),
    vec2(-0.4119 + 0.5, -0.0707), 
    vec2(-0.3773 + 0.5, -0.0282),
    
    //tail
    vec2( 0.3008, 0.1969), // a, start triangle strip
    vec2( 0.4088, 0.0635), // f
    vec2( 0.5747, 0.0978), // c
    vec2( 0.6576, 0.0437), // e
    vec2( 0.8451, 0.2528), // d
 ];
   
   /* circle */
var circle = [];
for (var i = 0; i <= 360; i+=1){
    var j = i * Math.PI / 180;
    var vert1 = [ Math.sin(j) * 0.05, Math.cos(j) * 0.05];
    var vert2 = [0, 0];
    circle = circle.concat(vert1);
    circle = circle.concat(vert2);
}


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