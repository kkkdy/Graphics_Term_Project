"use strict";

var canvas;
var gl;

var xAxis = 0;
var yAxis =1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;

var flag = false;

var points = [];
var colors = [];

var points_Al2O3 = [];
var colors_Al2O3 = [];

var points_Al = [];
var colors_Al = [];

var points_O = [];
var colors_O = [];

var points_Cl = [];
var colors_Cl = [];

var points_Ca = [];
var colors_Ca = [];

var points_Na = [];
var colors_Na = [];

var points_Mg = [];
var colors_Mg = [];

var points_Cl2 = [];
var colors_Cl2 = [];

var points_N2 = [];
var colors_N2 = [];

var points_H2 = [];
var colors_H2 = [];

var points_NaCl = [];
var colors_NaCl = [];

var points_MgO= [];
var colors_MgO = [];

var points_MgCl2 = [];
var colors_MgCl2 = [];

var points_NH3 = [];
var colors_NH3 = [];

var scale_H = 37;
var scale_O = 66;
var scale_N = 70;
var scale_C = 77;
var scale_Cl = 99;
var scale_Al = 143;
var scale_Ca = 197;
var scale_Mg = 160;
var scale_Na = 186;
var scale_electronic = 5;

var scalerate = 0.002;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    //----------------------------------------------------------------------------------------------------------------------
    
    /**** Al2O3 ****/
    // Al 1
    var Al1 = sphere(5);
    Al1.scale(scale_Al * scalerate, scale_Al * scalerate, scale_Al * scalerate);
    Al1.translate(-0.45, +0.25, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(Al1.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(Al1.TriangleVertices);
    
    // Al 1 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (-0.45 + Math.sin(j) * (scale_Al * scalerate + 0.04), +0.25, Math.cos(j) * (scale_Al * scalerate + 0.04));

        points_Al2O3 = points_Al2O3.concat(electronic.TriangleVertices);
        colors_Al2O3 = colors_Al2O3.concat(electronic.TriangleVertexColors);
    }

    // Al 2
    var Al2 = sphere(5);
    Al2.scale(scale_Al * scalerate, scale_Al * scalerate, scale_Al * scalerate);
    Al2.translate(+0.45, +0.25, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(Al2.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(Al2.TriangleVertices);

    // Al 2 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (0.45 + Math.sin(j) * (scale_Al * scalerate + 0.04), +0.25, Math.cos(j) * (scale_Al * scalerate + 0.04));

        points_Al2O3 = points_Al2O3.concat(electronic.TriangleVertices);
        colors_Al2O3 = colors_Al2O3.concat(electronic.TriangleVertexColors);
    }
    
    // O 1
    var O1 = sphere(5);
    O1.scale(scale_O * scalerate, scale_O * scalerate, scale_O * scalerate);
    O1.translate(-0.8, -0.25, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(O1.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(O1.TriangleVertices);

    // O 1 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (-0.8 + Math.sin(j) * (scale_O * scalerate + 0.04), -0.25, Math.cos(j) * (scale_O * scalerate + 0.04));

        points_Al2O3 = points_Al2O3.concat(electronic.TriangleVertices);
        colors_Al2O3 = colors_Al2O3.concat(electronic.TriangleVertexColors);
    }
    
    // O 2
    var O2 = sphere(5);
    O2.scale(scale_O * scalerate, scale_O * scalerate, scale_O * scalerate);
    O2.translate(0.0, -0.25, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(O2.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(O2.TriangleVertices);

    // O 2 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (Math.sin(j) * (scale_O * scalerate + 0.04), -0.25, Math.cos(j) * (scale_O * scalerate + 0.04));

        points_Al2O3 = points_Al2O3.concat(electronic.TriangleVertices);
        colors_Al2O3 = colors_Al2O3.concat(electronic.TriangleVertexColors);
    }
    
    // O 3
    var O3 = sphere(5);
    O3.scale(scale_O * scalerate, scale_O * scalerate, scale_O * scalerate);
    O3.translate(+0.8, -0.25, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(O3.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(O3.TriangleVertices);

    // O 3 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (0.8 + Math.sin(j) * (scale_O * scalerate + 0.04), -0.25, Math.cos(j) * (scale_O * scalerate + 0.04));

        points_Al2O3 = points_Al2O3.concat(electronic.TriangleVertices);
        colors_Al2O3 = colors_Al2O3.concat(electronic.TriangleVertexColors);
    }
    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.03,0.5,0.03);
    linkCs1.rotate(140, [0, 0, 1]);
    linkCs1.translate(-0.6, +0.05, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(linkCs1.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(linkCs1.TriangleVertices);
    
    // link Cs
    var linkCs2 = cylinder(72, 3, true);

    linkCs2.scale(0.03,0.5,0.03);
    linkCs2.rotate(140, [0, 0, 1]);
    linkCs2.translate(-0.6, -0.05, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(linkCs2.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(linkCs2.TriangleVertices);
    
    // link Cs
    var linkCs3 = cylinder(72, 3, true);

    linkCs3.scale(0.03,0.5,0.03);
    linkCs3.rotate(45, [0, 0, 1]);
    linkCs3.translate(-0.2, -0.05, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(linkCs3.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(linkCs3.TriangleVertices);
    
    // link Cs
    var linkCs4 = cylinder(72, 3, true);

    linkCs4.scale(0.03,0.5,0.03);
    linkCs4.rotate(135, [0, 0, 1]);
    linkCs4.translate(+0.2, -0.05, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(linkCs4.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(linkCs4.TriangleVertices);
    
    // link Cs
    var linkCs5 = cylinder(72, 3, true);

    linkCs5.scale(0.03,0.5,0.03);
    linkCs5.rotate(40, [0, 0, 1]);
    linkCs5.translate(+0.6, +0.05, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(linkCs5.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(linkCs5.TriangleVertices);
    
    // link Cs
    var linkCs6 = cylinder(72, 3, true);

    linkCs6.scale(0.03,0.5,0.03);
    linkCs6.rotate(40, [0, 0, 1]);
    linkCs6.translate(+0.6, -0.05, 0.0);

    colors_Al2O3 = colors_Al2O3.concat(linkCs6.TriangleVertexColors);
    points_Al2O3 = points_Al2O3.concat(linkCs6.TriangleVertices);

    //----------------------------------------------------------------------------------------------------------------------
    
    /**** Cl ****/
    // Cl c
    var leftC = sphere(5);
    leftC.scale(scale_Cl * scalerate, scale_Cl * scalerate, scale_Cl * scalerate);
    leftC.translate(0.0, 0.0, 0.0);
    
    points_Cl = points_Cl.concat(leftC.TriangleVertices);
    colors_Cl = colors_Cl.concat(leftC.TriangleVertexColors);
    
    // Cl electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (Math.sin(j) * (scale_H * scalerate + 0.2), 0.0, Math.cos(j) * (scale_H * scalerate + 0.2));

        points_Cl = points_Cl.concat(electronic.TriangleVertices);
        colors_Cl = colors_Cl.concat(electronic.TriangleVertexColors);
    }

    //----------------------------------------------------------------------------------------------------------------------
    
    /**** Ca ****/
    // Ca c
    var leftC = sphere(5);
    leftC.scale(scale_Ca * scalerate, scale_Ca * scalerate, scale_Ca * scalerate);
    leftC.translate(0.0, 0.0, 0.0);
    
    points_Ca = points_Ca.concat(leftC.TriangleVertices);
    colors_Ca = colors_Ca.concat(leftC.TriangleVertexColors);
    
    // Ca electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (Math.sin(j) * (scale_Ca * scalerate + 0.2), 0.0, Math.cos(j) * (scale_Ca * scalerate + 0.2));

        points_Ca = points_Ca.concat(electronic.TriangleVertices);
        colors_Ca = colors_Ca.concat(electronic.TriangleVertexColors);
    }

    //----------------------------------------------------------------------------------------------------------------------
    
    /**** Na ****/
    // Na c
    var leftC = sphere(5);
    leftC.scale(scale_Na * scalerate, scale_Na * scalerate, scale_Na * scalerate);
    leftC.translate(0.0, 0.0, 0.0);
    
    points_Na = points_Na.concat(leftC.TriangleVertices);
    colors_Na = colors_Na.concat(leftC.TriangleVertexColors);
    
    // Na electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (Math.sin(j) * (scale_Na * scalerate + 0.2), 0.0, Math.cos(j) * (scale_Na * scalerate + 0.2));

        points_Na = points_Na.concat(electronic.TriangleVertices);
        colors_Na = colors_Na.concat(electronic.TriangleVertexColors);
    }

    //----------------------------------------------------------------------------------------------------------------------
    
    /**** Mg ****/
    // Mg c
    var leftC = sphere(5);
    leftC.scale(scale_Mg * scalerate, scale_Mg * scalerate, scale_Mg * scalerate);
    leftC.translate(0.0, 0.0, 0.0);
    
    points_Mg = points_Mg.concat(leftC.TriangleVertices);
    colors_Mg = colors_Mg.concat(leftC.TriangleVertexColors);
    
    // Mg electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (Math.sin(j) * (scale_Mg * scalerate + 0.2), 0.0, Math.cos(j) * (scale_Mg * scalerate + 0.2));

        points_Mg = points_Mg.concat(electronic.TriangleVertices);
        colors_Mg = colors_Mg.concat(electronic.TriangleVertexColors);
    }

    //----------------------------------------------------------------------------------------------------------------------
    
    /**** Cl2 ****/
    // Cl 1 c
    var leftC = sphere(5);
    leftC.scale(scale_Cl * scalerate, scale_Cl * scalerate, scale_Cl * scalerate);
    leftC.translate(-0.25, 0.0, 0.0);

    colors_Cl2 = colors_Cl2.concat(leftC.TriangleVertexColors);
    points_Cl2 = points_Cl2.concat(leftC.TriangleVertices);
    
    // Cl 1 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (-0.25 + Math.sin(j) * (scale_Cl * scalerate + 0.04), 0.0, Math.cos(j) * (scale_Cl * scalerate + 0.04));

        points_Cl2 = points_Cl2.concat(electronic.TriangleVertices);
        colors_Cl2 = colors_Cl2.concat(electronic.TriangleVertexColors);
    }

    // Cl 2 c
    var rightC = sphere(5);
    rightC.scale(scale_Cl * scalerate, scale_Cl * scalerate, scale_Cl * scalerate);
    rightC.translate(+0.25, 0.0, 0.0);

    colors_Cl2 = colors_Cl2.concat(rightC.TriangleVertexColors);
    points_Cl2 = points_Cl2.concat(rightC.TriangleVertices);

    // Cl 2 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (0.25 + Math.sin(j) * (scale_Cl * scalerate + 0.04), 0.0, Math.cos(j) * (scale_Cl * scalerate + 0.04));

        points_Cl2 = points_Cl2.concat(electronic.TriangleVertices);
        colors_Cl2 = colors_Cl2.concat(electronic.TriangleVertexColors);
    }
    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.06,0.2,0.06);
    linkCs1.rotate(90, [0, 0, 1]);
    linkCs1.translate(0.0, 0.0, 0.0);

    colors_Cl2 = colors_Cl2.concat(linkCs1.TriangleVertexColors);
    points_Cl2 = points_Cl2.concat(linkCs1.TriangleVertices);

    //----------------------------------------------------------------------------------------------------------------------
    
    /**** N2 ****/
    // N 1 c
    var leftC = sphere(5);
    leftC.scale(scale_N * scalerate, scale_N * scalerate, scale_N * scalerate);
    leftC.translate(-0.18, 0.0, 0.0);

    colors_N2 = colors_N2.concat(leftC.TriangleVertexColors);
    points_N2 = points_N2.concat(leftC.TriangleVertices);
    
    // N 1 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (-0.15 + Math.sin(j) * (scale_N * scalerate + 0.04), 0.0, Math.cos(j) * (scale_N * scalerate + 0.04));

        points_N2 = points_N2.concat(electronic.TriangleVertices);
        colors_N2 = colors_N2.concat(electronic.TriangleVertexColors);
    }

    // N 2 c
    var rightC = sphere(5);
    rightC.scale(scale_N * scalerate, scale_N * scalerate, scale_N * scalerate);
    rightC.translate(+0.18, 0.0, 0.0);

    colors_N2 = colors_N2.concat(rightC.TriangleVertexColors);
    points_N2 = points_N2.concat(rightC.TriangleVertices);

    // N 2 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (0.15 + Math.sin(j) * (scale_N * scalerate + 0.04), 0.0, Math.cos(j) * (scale_N * scalerate + 0.04));

        points_N2 = points_N2.concat(electronic.TriangleVertices);
        colors_N2 = colors_N2.concat(electronic.TriangleVertexColors);
    }
    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.03,0.2,0.03);
    linkCs1.rotate(90, [0, 0, 1]);
    linkCs1.translate(0.0, +0.05, 0.0);

    colors_N2 = colors_N2.concat(linkCs1.TriangleVertexColors);
    points_N2 = points_N2.concat(linkCs1.TriangleVertices);
    
    // link Cs
    var linkCs2 = cylinder(72, 3, true);

    linkCs2.scale(0.03,0.2,0.03);
    linkCs2.rotate(90, [0, 0, 1]);
    linkCs2.translate(0.0, 0.0, 0.0);

    colors_N2 = colors_N2.concat(linkCs2.TriangleVertexColors);
    points_N2 = points_N2.concat(linkCs2.TriangleVertices);
    
    // link Cs
    var linkCs3 = cylinder(72, 3, true);

    linkCs3.scale(0.03,0.2,0.03);
    linkCs3.rotate(90, [0, 0, 1]);
    linkCs3.translate(0.0, -0.05, 0.0);

    colors_N2 = colors_N2.concat(linkCs3.TriangleVertexColors);
    points_N2 = points_N2.concat(linkCs3.TriangleVertices);

    //----------------------------------------------------------------------------------------------------------------------
    
    /**** H2 ****/
    // H 1 c
    var leftC = sphere(5);
    leftC.scale(scale_H * scalerate, scale_H * scalerate, scale_H * scalerate);
    leftC.translate(-0.1, 0.0, 0.0);

    colors_H2 = colors_H2.concat(leftC.TriangleVertexColors);
    points_H2 = points_H2.concat(leftC.TriangleVertices);
    
    // H 1 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (-0.1 + Math.sin(j) * (scale_H * scalerate + 0.03), 0.0, Math.cos(j) * (scale_H * scalerate + 0.03));

        points_H2 = points_H2.concat(electronic.TriangleVertices);
        colors_H2 = colors_H2.concat(electronic.TriangleVertexColors);
    }

    // H 2 c
    var rightC = sphere(5);
    rightC.scale(scale_H * scalerate, scale_H * scalerate, scale_H * scalerate);
    rightC.translate(+0.1, 0.0, 0.0);

    colors_H2 = colors_H2.concat(rightC.TriangleVertexColors);
    points_H2 = points_H2.concat(rightC.TriangleVertices);

    // H 2 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (0.1 + Math.sin(j) * (scale_H * scalerate + 0.03), 0.0, Math.cos(j) * (scale_H * scalerate + 0.03));

        points_H2 = points_H2.concat(electronic.TriangleVertices);
        colors_H2 = colors_H2.concat(electronic.TriangleVertexColors);
    }
    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.06,0.2,0.06);
    linkCs1.rotate(90, [0, 0, 1]);
    linkCs1.translate(0.0, 0.0, 0.0);

    colors_H2 = colors_H2.concat(linkCs1.TriangleVertexColors);
    points_H2 = points_H2.concat(linkCs1.TriangleVertices);

    //-------------------------------------------------------------
    
    /**** NaCl ****/
    // Na c
    var leftC = sphere(5);
    leftC.scale(scale_Na * scalerate, scale_Na * scalerate, scale_Na * scalerate);
    leftC.translate(-0.3, 0.0, 0.0);

    colors_NaCl = colors_NaCl.concat(leftC.TriangleVertexColors);
    points_NaCl = points_NaCl.concat(leftC.TriangleVertices);

    // Na electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (-0.3 + Math.sin(j) * (scale_Na * scalerate + 0.03), 0.0, Math.cos(j) * (scale_Na * scalerate + 0.03));

        points_NaCl = points_NaCl.concat(electronic.TriangleVertices);
        colors_NaCl = colors_NaCl.concat(electronic.TriangleVertexColors);
    }
    
    // Cl c
    var rightC = sphere(5);
    rightC.scale(scale_Cl * scalerate, scale_Cl * scalerate, scale_Cl * scalerate);
    rightC.translate(+0.3, 0.0, 0.0);

    colors_NaCl = colors_NaCl.concat(rightC.TriangleVertexColors);
    points_NaCl = points_NaCl.concat(rightC.TriangleVertices);

    // Cl electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (0.3 + Math.sin(j) * (scale_Cl * scalerate + 0.03), 0.0, Math.cos(j) * (scale_Cl * scalerate + 0.03));

        points_NaCl = points_NaCl.concat(electronic.TriangleVertices);
        colors_NaCl = colors_NaCl.concat(electronic.TriangleVertexColors);
    }
    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.08, 0.5, 0.08);
    linkCs1.rotate(90, [0, 0, 1]);
    linkCs1.translate(0.0, 0.0, 0.0);

    colors_NaCl = colors_NaCl.concat(linkCs1.TriangleVertexColors);
    points_NaCl = points_NaCl.concat(linkCs1.TriangleVertices);

    //-------------------------------------------------------------
    
    /**** MgO ****/
    // Mg c
    var leftC = sphere(5);
    leftC.scale(scale_Mg * scalerate, scale_Mg * scalerate, scale_Mg * scalerate);
    leftC.translate(-0.3, 0.0, 0.0);

    colors_MgO = colors_MgO.concat(leftC.TriangleVertexColors);
    points_MgO = points_MgO.concat(leftC.TriangleVertices);

    // Mg electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (-0.3 + Math.sin(j) * (scale_Mg * scalerate + 0.03), 0.0, Math.cos(j) * (scale_Mg * scalerate + 0.03));

        points_MgO = points_MgO.concat(electronic.TriangleVertices);
        colors_MgO = colors_MgO.concat(electronic.TriangleVertexColors);
    }
    
    // O c
    var rightC = sphere(5);
    rightC.scale(scale_O * scalerate, scale_O * scalerate, scale_O * scalerate);
    rightC.translate(+0.3, 0.0, 0.0);

    colors_MgO = colors_MgO.concat(rightC.TriangleVertexColors);
    points_MgO = points_MgO.concat(rightC.TriangleVertices);

    // O electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (0.3 + Math.sin(j) * (scale_O * scalerate + 0.03), 0.0, Math.cos(j) * (scale_O * scalerate + 0.03));

        points_MgO = points_MgO.concat(electronic.TriangleVertices);
        colors_MgO = colors_MgO.concat(electronic.TriangleVertexColors);
    }
    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);
    var linkCs2 = cylinder(72, 3, true);

    linkCs1.scale(0.05,0.4,0.05);
    linkCs1.rotate(90, [0, 0, 1]);
    linkCs1.translate(0.0, 0.05, 0.0);

    linkCs2.scale(0.05,0.4,0.05);
    linkCs2.rotate(90, [0, 0, 1]);
    linkCs2.translate(0.0, -0.05, 0.0);

    colors_MgO = colors_MgO.concat(linkCs1.TriangleVertexColors);
    points_MgO = points_MgO.concat(linkCs1.TriangleVertices);

    colors_MgO = colors_MgO.concat(linkCs2.TriangleVertexColors);
    points_MgO = points_MgO.concat(linkCs2.TriangleVertices);
    
     //-------------------------------------------------------------
    
    /**** MgCl2 ****/
    // Mg
    var Mg = sphere(5);
    Mg.scale(scale_Mg * scalerate, scale_Mg * scalerate, scale_Mg * scalerate);
    Mg.translate(0.0, +0.2, 0.0);

    colors_MgCl2 = colors_MgCl2.concat(Mg.TriangleVertexColors);
    points_MgCl2 = points_MgCl2.concat(Mg.TriangleVertices);
    
    // Mg electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (Math.sin(j) * (scale_Mg * scalerate + 0.04), +0.2, Math.cos(j) * (scale_Mg * scalerate + 0.04));

        points_MgCl2 = points_MgCl2.concat(electronic.TriangleVertices);
        colors_MgCl2 = colors_MgCl2.concat(electronic.TriangleVertexColors);
    }
    
    // Cl 1
    var Cl1 = sphere(5);
    Cl1.scale(scale_Cl * scalerate, scale_Cl * scalerate, scale_Cl * scalerate);
    Cl1.translate(-0.5, -0.2, 0.0);

    colors_MgCl2 = colors_MgCl2.concat(Cl1.TriangleVertexColors);
    points_MgCl2 = points_MgCl2.concat(Cl1.TriangleVertices);

    // Cl 1 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (-0.5 + Math.sin(j) * (scale_Cl * scalerate + 0.04), -0.2, Math.cos(j) * (scale_Cl * scalerate + 0.04));

        points_MgCl2 = points_MgCl2.concat(electronic.TriangleVertices);
        colors_MgCl2 = colors_MgCl2.concat(electronic.TriangleVertexColors);
    }
    
    // Cl 2
    var Cl2 = sphere(5);
    Cl2.scale(scale_Cl * scalerate, scale_Cl * scalerate, scale_Cl * scalerate);
    Cl2.translate(0.5, -0.2, 0.0);

    colors_MgCl2 = colors_MgCl2.concat(Cl2.TriangleVertexColors);
    points_MgCl2 = points_MgCl2.concat(Cl2.TriangleVertices);

    // Cl 2 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (0.5 + Math.sin(j) * (scale_Cl * scalerate + 0.04), -0.2, Math.cos(j) * (scale_Cl * scalerate + 0.04));

        points_MgCl2 = points_MgCl2.concat(electronic.TriangleVertices);
        colors_MgCl2 = colors_MgCl2.concat(electronic.TriangleVertexColors);
    }
    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.06,0.5,0.06);
    linkCs1.rotate(120, [0, 0, 1]);
    linkCs1.translate(-0.4, -0.1, 0.0);

    colors_MgCl2 = colors_MgCl2.concat(linkCs1.TriangleVertexColors);
    points_MgCl2 = points_MgCl2.concat(linkCs1.TriangleVertices);
    
    // link Cs
    var linkCs3 = cylinder(72, 3, true);

    linkCs3.scale(0.06,0.5,0.06);
    linkCs3.rotate(60, [0, 0, 1]);
    linkCs3.translate(0.4, -0.1, 0.0);

    colors_MgCl2 = colors_MgCl2.concat(linkCs3.TriangleVertexColors);
    points_MgCl2 = points_MgCl2.concat(linkCs3.TriangleVertices);
    
    //-------------------------------------------------------------
    
    /**** NH3 ****/
    // N 1
    var N1 = sphere(5);
    N1.scale(scale_N * scalerate, scale_N * scalerate, scale_N * scalerate);
    N1.translate( 0.0, +0.07, 0.0);

    colors_NH3= colors_NH3.concat(N1.TriangleVertexColors);
    points_NH3 = points_NH3.concat(N1.TriangleVertices);
    
    // N 1 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (Math.sin(j) * (scale_N * scalerate + 0.04), +0.07, Math.cos(j) * (scale_N * scalerate + 0.04));

        points_NH3 = points_NH3.concat(electronic.TriangleVertices);
        colors_NH3 = colors_NH3.concat(electronic.TriangleVertexColors);
    }

    // H 1
    var H1 = sphere(5);
    H1.scale(scale_H * scalerate, scale_H * scalerate, scale_H * scalerate);
    H1.translate(+0.25, -0.07, +0.16);

    colors_NH3 = colors_NH3.concat(H1.TriangleVertexColors);
    points_NH3 = points_NH3.concat(H1.TriangleVertices);

    // H 1 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (0.25 + Math.sin(j) * (scale_H * scalerate + 0.04), -0.07, 0.16 + Math.cos(j) * (scale_H * scalerate + 0.04));

        points_NH3 = points_NH3.concat(electronic.TriangleVertices);
        colors_NH3 = colors_NH3.concat(electronic.TriangleVertexColors);
    }
    
    // H 2
    var H2 = sphere(5);
    H2.scale(scale_H * scalerate, scale_H * scalerate, scale_H * scalerate);
    H2.translate(-0.25, -0.07, +0.16);

    colors_NH3 = colors_NH3.concat(H2.TriangleVertexColors);
    points_NH3 = points_NH3.concat(H2.TriangleVertices);

    // H 2 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (-0.25 + Math.sin(j) * (scale_H * scalerate + 0.04), -0.07, 0.16 + Math.cos(j) * (scale_H * scalerate + 0.04));

        points_NH3 = points_NH3.concat(electronic.TriangleVertices);
        colors_NH3 = colors_NH3.concat(electronic.TriangleVertexColors);
    }
    
    // H 3
    var H3 = sphere(5);
    H3.scale(scale_H * scalerate, scale_H * scalerate, scale_H * scalerate);
    H3.translate(0.0, -0.07, -0.25);

    colors_NH3 = colors_NH3.concat(H3.TriangleVertexColors);
    points_NH3 = points_NH3.concat(H3.TriangleVertices);

    // H 3 electronic
    var electronic ;

    for (var i = 0; i <= 8; i += 1){
        var j = i * 45 * Math.PI / 180;
        electronic = sphere(5);
        electronic.scale(scale_electronic * scalerate,scale_electronic * scalerate,scale_electronic * scalerate);
        // ex) 원소 위치 + sin * 원소크기 + 0.05 + rotation
        electronic.translate (Math.sin(j) * (scale_H * scalerate + 0.04), -0.07, -0.25 + Math.cos(j) * (scale_H * scalerate + 0.04));

        points_NH3 = points_NH3.concat(electronic.TriangleVertices);
        colors_NH3 = colors_NH3.concat(electronic.TriangleVertexColors);
    }
    
    // link Cs
    var linkCs1 = cylinder(72, 3, true);

    linkCs1.scale(0.03,0.4,0.03);
    linkCs1.rotate(120, [0, 0, 1]);
    linkCs1.rotate(30, [0, 1, 0]);
    linkCs1.translate(-0.08, 0.05, 0.05);

    colors_NH3 = colors_NH3.concat(linkCs1.TriangleVertexColors);
    points_NH3 = points_NH3.concat(linkCs1.TriangleVertices);
    
    // link Cs
    var linkCs2 = cylinder(72, 3, true);

    linkCs2.scale(0.03,0.4,0.03);
    linkCs2.rotate(120, [0, 0, 1]);
    linkCs2.rotate(270, [0, 1, 0]);
    linkCs2.translate(0.0, 0.05, -0.08);

    colors_NH3 = colors_NH3.concat(linkCs2.TriangleVertexColors);
    points_NH3 = points_NH3.concat(linkCs2.TriangleVertices);
    
    // link Cs
    var linkCs3 = cylinder(72, 3, true);

    linkCs3.scale(0.03,0.4,0.03);
    linkCs3.rotate(120, [0, 0, 1]);
    linkCs3.rotate(150, [0, 1, 0]);
    linkCs3.translate(0.08, 0.05, 0.05);

    colors_NH3 = colors_NH3.concat(linkCs3.TriangleVertexColors);
    points_NH3 = points_NH3.concat(linkCs3.TriangleVertices);
    
    //-------------------------------------------------------------

    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Configure WebGL
    gl.enable(gl.DEPTH_TEST);;
    //gl.enable(gl.CULL);
    
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    
    // color array atrribute buffer
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // Load the data into the GPU   
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition )
    
    thetaLoc = gl.getUniformLocation(program, "theta"); 
    
    //event listeners for buttons
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };
    document.getElementById( "ButtonT" ).onclick = function () {flag = !flag;};
    render();
    
    document.getElementById( "Button_Al2O3" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_Al2O3));
      colors = JSON.parse(JSON.stringify(colors_Al2O3));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("Al2O3");
    };
    
    document.getElementById( "Button_Cl" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_Cl));
      colors = JSON.parse(JSON.stringify(colors_Cl));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("Cl");
    };
    
    document.getElementById( "Button_Ca" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_Ca));
      colors = JSON.parse(JSON.stringify(colors_Ca));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("Ca");
    };
    
    document.getElementById( "Button_Na" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_Na));
      colors = JSON.parse(JSON.stringify(colors_Na));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("Na");
    };
    
    document.getElementById( "Button_Mg" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_Mg));
      colors = JSON.parse(JSON.stringify(colors_Mg));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("Mg");
    };
    
    document.getElementById( "Button_Cl2" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_Cl2));
      colors = JSON.parse(JSON.stringify(colors_Cl2));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("Cl2");
    };
    
    document.getElementById( "Button_N2" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_N2));
      colors = JSON.parse(JSON.stringify(colors_N2));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("N2");
    };
    
    document.getElementById( "Button_H2" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_H2));
      colors = JSON.parse(JSON.stringify(colors_H2));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("H2");
    };
    
    document.getElementById( "Button_NaCl" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_NaCl));
      colors = JSON.parse(JSON.stringify(colors_NaCl));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("NaCl");
    };
    
    document.getElementById( "Button_MgO" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_MgO));
      colors = JSON.parse(JSON.stringify(colors_MgO));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("MgO");
    };
    
    document.getElementById( "Button_MgCl2" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_MgCl2));
      colors = JSON.parse(JSON.stringify(colors_MgCl2));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("MgCl2");
    };
    
    document.getElementById( "Button_NH3" ).onclick = function () {
      points = JSON.parse(JSON.stringify(points_NH3));
      colors = JSON.parse(JSON.stringify(colors_NH3));
      gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
      gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
      console.log("NH3");
    };
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if(flag) theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);
    gl.drawArrays( gl.TRIANGLES, 0, points.length);


    requestAnimFrame( render );
}

