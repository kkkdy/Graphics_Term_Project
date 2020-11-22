//Multi Markers WebAR-AR.js and Aframe - Playing the Archive - Connected Environment CASA-UCL

//Global Variable
var markersURLArray=[];
var markersNameArray=[];
//var canvas;
//var markerEl;
var position = [0,0,0];
//var markerId = -1;
//var markerNum;

AFRAME.registerComponent('markers_start',{
	init:function(){
		// console.log('Add markers to the scene');

		var sceneEl = document.querySelector('a-scene');	

		//canvas = document.getElementById('gl-canvas');
			
		
		//list of the markers : We make 13 markers for chemical elements
		for(var i=1; i<13; i++)
		{
			var url="resources/markers/pattern-Individual_Blocks-"+i+".patt";
			markersURLArray.push(url);
			markersNameArray.push('Marker_'+i);
			console.log("push"+i);
		}
		
		//list of the markers : We make 13 markers for chemical elements		
		for(var k=0; k<12; k++)
		{
			
			var markerEl = document.createElement('a-marker');
			
			markerEl.setAttribute('type','pattern');
			markerEl.setAttribute('url',markersURLArray[k]);
			markerEl.setAttribute('id',markersNameArray[k]);

			markerEl.setAttribute('registerevents','');
			sceneEl.appendChild(markerEl);

			//Adding text to each marker
			var textEl = document.createElement('a-entity');
			
			textEl.setAttribute('id','text');
			textEl.setAttribute('text',{color: 'red', align: 'center', value:markersNameArray[k], width: '5.5'});
			textEl.object3D.position.set(0, 0.7, 0);
			textEl.object3D.rotation.set(-90, 0, 0);

			markerEl.appendChild(textEl);
		}
	}
});


//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
		init: function () {
			const marker = this.el;
			
			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
				
				markerNum = markerId.substring(7,9);
				
				position = marker.getAttribute('position');
				console.log('Marker Found: ', markerId);
				//console.log(position);
				// marker pos = camera function
				points = [];
				colors = [];
				render_element(markerNum-1);		
			});

			marker.addEventListener("markerLost",() =>{
				markerId = marker.id;
				console.log('Marker Lost: ', markerId);
			});
		},
});
