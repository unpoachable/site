


// page js
var menuicon = document.getElementById("menuicon");
var nav = document.getElementById("nav");
var colourbtns = document.getElementById("colourbtns");

// show navigation
function shownavigation(argument) {
  
  nav.classList.toggle('shownav');
  if ( nav.classList != "shownav") {
    menuicon.classList = '';
  } else {
    menuicon.classList = 'open';
  }
}

// nav link click event
nav.addEventListener("click",function(e) {
    if(e.target && e.target.nodeName == "A") {
        nav.classList = '';
        menuicon.classList = '';
    }
});


// shop  
var framenum = 0;

// colours
var red = 'ee0000';
var green = '003300';
var black = '222222';
var grey = 'cccccc';
var white = 'eeeeee';

// colour array
var colarray = [
  { "item": "cap", "colouropts": "red,black,grey" },
  { "item": "sweater", "colouropts": "white,red,black" },
  { "item": "hoodie", "colouropts": "black,grey" },
  { "item": "joggers", "colouropts": "black,red,grey" },
  { "item": "tee-shirt", "colouropts": "white,red" },
  { "item": "w-tee-shirt", "colouropts": "grey,red" },
];

// next item button
function next(xnum) {
  framenum = framenum + xnum;
  
  if (framenum>(frames-1)) { framenum = 0; }
  //
  if (framenum < 0) { framenum = frames-1; }
  //
  for ( var i = 0, l = set.children.length; i < l; i ++ ) {
    set.children[i].position.y = 10;
  }

  set.children[framenum].position.y = 0;

  tweenX = new TWEEN.Tween( set.children[framenum].rotation )
  .to( { x: 0, y: set.children[framenum].rotation.y+Math.PI*2, z: 0}, 600 )
  .easing( TWEEN.Easing.Quadratic.EaseOut)
  .start();  

  makecolouroptions(framenum)
}

// colour buttons
makecolouroptions(framenum)

// make colour buttons
function makecolouroptions(framenum) {
  colourbtns.innerHTML = '';
  const arr = Array.from(colarray[framenum].colouropts.split(','));
  
  for ( var i = 0, l = arr.length; i < l; i ++ ) {
    var xdvi = document.createElement('span');
    xdvi.innerHTML = '<button class="'+arr[i]+'"  title="'+arr[i]+'"  onClick="meshcol('+arr[i].toString()+');" >'+arr[i]+'</button>';    
    document.getElementById("colourbtns").appendChild(xdvi);
  }
  
}

// choose colour
function meshcol(argument) {
 argument = '#'+argument.toString();
 set.children[framenum].material.color = new THREE.Color(argument);
}



// 3D
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("shop").appendChild( renderer.domElement );

// controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

// camera
camera.position.z = 0.5;    


// fog
// scene.fog = new THREE.FogExp2(0x000000, 0.8);

// BG
var d = {
 radius: 0.5,
 widthSegments: 30,
 heightSegments: 30
};

var geometry = new THREE.SphereGeometry(d.radius, d.widthSegments, d.heightSegments);
var material = new THREE.MeshBasicMaterial({    
      map: new THREE.TextureLoader().load( 'css/earthinv.png' ),
      side:THREE.BackSide
    });
bg = new THREE.Mesh(geometry, material);
bg.name = "bg";
bg.material.map.magFilter = THREE.NearestFilter;
bg.material.map.minFilter = THREE.LinearMipMapLinearFilter;
scene.add(bg);

// set  
set = new THREE.Group();
scene.add( set );

var xloader = new THREE.BufferGeometryLoader();
var n = 0;
createobject(set, 'models/tee.json' ,'models/textures/tee.png');
createobject(set, 'models/hoodie1.json' ,'models/textures/hoodie1.png');
createobject(set, 'models/sweater2.json' ,'models/textures/sweater.png');
createobject(set, 'models/cap.json' ,'models/textures/cap1.png');
createobject(set, 'models/jggrs.json' ,'models/textures/red.png');
createobject(set, 'models/w-tee.json' ,'models/textures/womens-tee.png');



// lights
globalLight = new THREE.AmbientLight(0xffffff, 1);
shadowLight = new THREE.DirectionalLight(0xffffff, 1);
shadowLight.position.set(10, -220, 120);
shadowLight.castShadow = true;
shadowLight.shadow.camera.left = -40;
shadowLight.shadow.camera.right = 40;
shadowLight.shadow.camera.top = 40;
shadowLight.shadow.camera.bottom = -80;
shadowLight.shadow.camera.near = 1;
shadowLight.shadow.camera.far = 1000;
shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 512;
scene.add(globalLight);
scene.add(shadowLight);


function createobject(xobj, thisobj, tex) {
  xloader.load(
    thisobj,
    function ( geometry ) {
      n++;
      frames = n;

      var texture = new THREE.TextureLoader().load( tex );
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      var material = new THREE.MeshLambertMaterial( { 
        color:0xcccccc,
        map: texture,
        // side:THREE.DoubleSide,
      } );
      cobj = new THREE.Mesh( geometry, material );
      // cobj.position.set((-n)+1,0,0);
      cobj.position.set(0,10,0);
      cobj.scale.set(0.5,0.5,0.5)
      xobj.add( cobj );

      // center object
      cobj.geometry.center();

      // white outline
      outline = new THREE.MeshBasicMaterial( { color:0xffffff,
        side:THREE.BackSide, } );
      objoutline = new THREE.Mesh( geometry, outline );
      objoutline.scale.set(1.05,1.05,1.05)
      cobj.add( objoutline );

      // set #1 to zero
      set.children[0].position.y = 0;

    },
    function ( xhr ) {
    },
    function ( xhr ) {
      console.log( 'An error happened' );
    }
    );
}


// window resize event
window.addEventListener('resize', function(){
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer2.setSize( window.innerWidth, window.innerHeight );
  camera2.aspect = window.innerWidth / window.innerHeight;
  camera2.updateProjectionMatrix();
}, false)




//
// 3D
const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer2 = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer2.setSize( window.innerWidth, window.innerHeight );
document.getElementById("about").appendChild( renderer2.domElement );

// camera
camera2.position.z = 95;   

// render
renderer2.render( scene2, camera2 );

// create Lights
createLights()
function createLights() {
  globalLight = new THREE.AmbientLight(0xffffff, 0.9);
  shadowLight = new THREE.DirectionalLight(0xffffff, 1);
  shadowLight.position.set(10, -8, -8);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -40;
  shadowLight.shadow.camera.right = 40;
  shadowLight.shadow.camera.top = 40;
  shadowLight.shadow.camera.bottom = -40;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;
  scene2.add(globalLight);
  scene2.add(shadowLight);
}

// crown
createx(scene, 'models/crown.json', 'models/textures/crown.png')


function createx(xobj, objmesh, objtex) {
  xloader.load(
    objmesh,
    function ( geometry ) {
      var texture = new THREE.TextureLoader().load( objtex );
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      var material = new THREE.MeshLambertMaterial( { 
        map: texture,
        side:THREE.DoubleSide, } );
      thisobj = new THREE.Mesh( geometry, material );
      thisobj.scale.set(0.1,0.1,0.1)
      xobj.add( thisobj );

      // white outline
      outline = new THREE.MeshBasicMaterial( { color:0xffffff,
        side:THREE.BackSide, } );
      objoutline = new THREE.Mesh( geometry, outline );
      objoutline.scale.set(1.05,1.05,1.05)
      thisobj.add( objoutline );
    },
    function ( xhr ) {
    },
    function ( xhr ) {
      console.log( 'An error happened' );
    }
  );
}

// fog
scene2.fog = new THREE.FogExp2(0x000000, 0.02);

// heads  
headset = new THREE.Group();
headset.scale.set(0.1,0.1,0.1)
scene2.add( headset );



// earth
var d = {
 radius: 80,
 widthSegments: 30,
 heightSegments: 30
};

var geometry = new THREE.SphereGeometry(d.radius, d.widthSegments, d.heightSegments);
var material = new THREE.MeshBasicMaterial({    
      map: new THREE.TextureLoader().load( 'css/col.png' )
    });
earthgroup = new THREE.Mesh(geometry, material);
earthgroup.name = "earthgroup";
earthgroup.material.map.magFilter = THREE.NearestFilter;
earthgroup.material.map.minFilter = THREE.LinearMipMapLinearFilter;
headset.add(earthgroup);
// white outline
outline = new THREE.MeshBasicMaterial( { color:0xffffff,
  side:THREE.BackSide, } );
objoutline = new THREE.Mesh( geometry, outline );
objoutline.scale.set(1.05,1.05,1.05)
earthgroup.add( objoutline );


// heads
createmodel('lion.json', 'textures/lion.png');
createmodel('rhino.json', 'textures/rhino.png');
createmodel('elephant.json', 'textures/elephant.png');
createmodel('leopard.json', 'textures/leopard.png');
createmodel('buffalo.json', 'textures/buffalo.png');

function createmodel(texname, texfile, ypos, xscale, extrascale) {
  xloader.load(
    'models/'+texname,
    function ( geometry ) {
      var texture = new THREE.TextureLoader().load( 'models/'+texfile );
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      var material = new THREE.MeshLambertMaterial( { 
        map: texture,
        side:THREE.DoubleSide, } );
      obj = new THREE.Mesh( geometry, material );
      headset.add( obj );

      // white outline
      outline = new THREE.MeshBasicMaterial( { color:0xffffff,
        side:THREE.BackSide, } );
      objoutline = new THREE.Mesh( geometry, outline );
      objoutline.scale.set(1.05,1.05,1.05)
      obj.add( objoutline );

      // position in circle
        for ( var i = 0, l = headset.children.length; i < l; i ++ ) {
          // console.log(headset.children[i])
          headset.children[i].position.set(Math.cos(i)*600, 0, Math.sin(i)*600);
          headset.children[i].lookAt(0,0,0);
        }
      

    },
    function ( xhr ) {},
    function ( xhr ) {console.log( 'An error happened' );}
  );
}



// start
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  renderer2.render( scene2, camera2 );
  TWEEN.update(); 
  headset.rotation.y -= 0.001;
  earthgroup.rotation.y = -headset.rotation.y*4;
  earthgroup.rotation.y = -headset.rotation.y*4;
  bg.rotation.y = -headset.rotation.y;
};

animate();