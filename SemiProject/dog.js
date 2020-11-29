var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    //var vertices = new Float32Array([vec2(-1, -1), vec2(0, 1), vec2(1, -1)]);
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
		vec2(-0.3935,-0.0944), // j2, 11

		// body
		vec2(-0.0546, 0.1112), // r0, 12, start fan
		vec2(-0.2831, 0.2787), // c1, 13
		vec2(-0.3935,-0.0944), // j2, 14
		vec2(-0.2000,-0.2000), // k3, 15
		vec2( 0.0215,-0.0791), // l4, 16
		vec2( 0.3604,-0.0715), // m5, 17
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
		vec2(-0.2216,-0.0914), // l0, 7, start triangle fan
		vec2(-0.3773,-0.0282), // c1, 8
		vec2(-0.1940,-0.3245), // d2, 9
		vec2(-0.1694,-0.2501), // g5, 10
		vec2(-0.1542,-0.0343), // h6, 11
		vec2(-0.2306, 0.0206), // i7, 12
		vec2(-0.3773,-0.0282), // c8, 13
		// toe
		vec2(-0.1364,-0.2832), // m0, 14, start triangle fan
		vec2(-0.1940,-0.3245), // d2, 15
		vec2(-0.0931,-0.3215), // e3, 16
		vec2(-0.0717,-0.2390), // f4, 17
		vec2(-0.1694,-0.2501), // g5, 18	
		vec2(-0.1940,-0.3245), // d6, 19
		
		//foreback-leg
		vec2(-0.3478,-0.2325), // h0, 20, start triangle fan
		vec2(-0.2624,-0.1580), // c1, 21
		vec2(-0.4168,-0.3495), // a2, 22
		vec2(-0.5197,-0.3637), // e3, 23
		vec2(-0.5146,-0.2996), // f4, 24
		vec2(-0.4210,-0.2304), // d5, 25
		vec2(-0.3864,-0.1725), // g6, 26
		vec2(-0.4119,-0.0707), // i7, 27
		vec2(-0.2624,-0.1580), // c8, 28
		
		// rearfront-leg
		vec2(-0.2216 + 0.5,-0.0914),
		vec2(-0.3773 + 0.5,-0.0282),
		vec2(-0.1940 + 0.5,-0.3245),
		vec2(-0.1694 + 0.5,-0.2501),
		vec2(-0.1542 + 0.5,-0.0343),
		vec2(-0.2306 + 0.5, 0.0206),
		vec2(-0.3773 + 0.5,-0.0282),
		// toe
		vec2(-0.1364 + 0.5,-0.2832), //start triangle fan
		vec2(-0.1940 + 0.5,-0.3245),
		vec2(-0.0931 + 0.5,-0.3215),
		vec2(-0.0717 + 0.5,-0.2390),
		vec2(-0.1694 + 0.5,-0.2501),	
		vec2(-0.1940 + 0.5,-0.3245),
		
		//rearback-leg
		vec2(-0.3478 + 0.5,-0.2325), //start triangle fan
		vec2(-0.3773 + 0.5,-0.0282), 
		vec2(-0.2624 + 0.5,-0.1580),
		vec2(-0.4168 + 0.5,-0.3495), 
		vec2(-0.5197 + 0.5,-0.3637),
		vec2(-0.5146 + 0.5,-0.2996),
		vec2(-0.4210 + 0.5,-0.2304),
		vec2(-0.3864 + 0.5,-0.1725),
		vec2(-0.4119 + 0.5,-0.0707), 
		vec2(-0.3773 + 0.5,-0.0282),
		
		//tail
		vec2( 0.3008, 0.1969), // a, start triangle strip
		vec2( 0.4088, 0.0635), // f
		vec2( 0.5747, 0.0978), // c
		vec2( 0.6576, 0.0437), // e
		vec2( 0.8451, 0.2528), // d
	];
	
	var resizingDogbody = resizeVertex(JSON.parse(JSON.stringify(dogbody)), 0.3);
	var resizingDog = resizeVertex(JSON.parse(JSON.stringify(dog)), 0.3);
	
	
	
	/****circle****/
	

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.5, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(resizingDogbody), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

	var uColor = gl.getUniformLocation( program, "uColor");
	
	/* start draw dog */
	gl.uniform4fv(uColor, vec4(0.2, 0.1, 0.1, 1));
	
	
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 9 );
	gl.drawArrays( gl.TRIANGLES, 9, 3);


	gl.drawArrays( gl.TRIANGLE_FAN, 12, 10);
	
	gl.bufferData( gl.ARRAY_BUFFER,flatten(resizingDog), gl.STATIC_DRAW );
	gl.uniform4fv(uColor, vec4(0.1, 0.05, 0.05, 1));
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 7 );
	
	gl.uniform4fv(uColor, vec4(0.2, 0.1, 0.1, 1));
	gl.drawArrays( gl.TRIANGLE_FAN, 7, 9 );
	gl.drawArrays( gl.TRIANGLE_FAN, 14, 6 );
    gl.drawArrays( gl.TRIANGLE_FAN, 20, 9 );
	
	gl.drawArrays( gl.TRIANGLE_FAN, 29, 9 );
	gl.drawArrays( gl.TRIANGLE_FAN, 29+7, 6 );
    gl.drawArrays( gl.TRIANGLE_FAN, 29+7+6, 10 );
	gl.drawArrays( gl.TRIANGLE_STRIP, 29+7+6+10, 5 );
	/* end draw dog */
	var circle = [];
	for (var i = 0; i <= 360; i+=1){
		var j = i * Math.PI / 180;
		var vert1 = [ Math.sin(j) * 0.05, Math.cos(j) * 0.05];
		var vert2 = [0, 0];
		circle = circle.concat(vert1);
		circle = circle.concat(vert2);
	}
	gl.uniform4fv(uColor, vec4(0.4, 0.1, 0.2, 1));
	gl.bufferData( gl.ARRAY_BUFFER,flatten(circle), gl.STATIC_DRAW );
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, circle.length / 2);
};

/* resizeVertex */
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

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
}
