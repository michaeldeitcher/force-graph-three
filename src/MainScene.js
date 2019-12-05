import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GraphNode, treeGraph, forceDirected, everyEdge, everyNode, everyChild } from './graph.js'
import { inherits } from 'util';


let graph, scene, camera, renderer, controls, circles;
function init() {
  graph = treeGraph(4,4);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementsByTagName("body")[0].setAttribute("style", "margin: 0;");
  renderer.domElement.setAttribute("style", "position: absolute; top: 0; left: 0;");
  document.body.appendChild( renderer.domElement );

  controls = new OrbitControls( camera, renderer.domElement );
  circles = [];

  everyNode(graph, addToScene);
  camera.position.z = 500;
  animate();
}

let addToScene = node => {
  let randomMaterial = () => {
    return new THREE.MeshBasicMaterial( { color: new THREE.Color(Math.random(), Math.random(), Math.random()) } );
  }

  if(node.mesh) return;
  const geometry = new THREE.SphereGeometry( 30 );
  let mesh = new THREE.Mesh( geometry, randomMaterial() );
  mesh.position.x =  node.pos.x;
  mesh.position.y =  node.pos.y;
  mesh.position.z =  node.pos.z;
  node.mesh = mesh;
  mesh.node = node;
  scene.add(mesh);
  if(node.collapsed) addCircle(node);
}

let removeFromScene = node => {
  removeCircle(node);
  scene.remove(node.mesh);
  node.mesh = null;  
}

let updatePosition = node => {
  if(!node.enabled) return;
  node.mesh.position.x = node.pos.x;
  node.mesh.position.y = node.pos.y;
  node.mesh.position.z = node.pos.z;
  if(node.circle) {
    node.circle.position.copy(node.mesh.position);
  }
}

let addCircle = graph => {
  let geometry = new THREE.CircleGeometry( 43, 32 );
  let material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  let circle = new THREE.Mesh( geometry, material );
  circle.position.x = graph.pos.x;
  circle.position.y = graph.pos.y;
  circle.position.z = graph.pos.z;  
  graph.circle = circle;
  scene.add( circle );
  circles.push(circle);
} 

let removeCircle = graph => {
  if(!graph.circle) return;
  scene.remove(graph.circle);
  circles = circles.filter( (item) => item != graph.circle );
  graph.circle = null;  
}

let hoverCircle;
let geometry = new THREE.CircleGeometry( 45, 32 );
let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
function addHoverCircle( graph ) {
  let circle = new THREE.Mesh( geometry, material );
  circle.position.x = graph.pos.x;
  circle.position.y = graph.pos.y;
  circle.position.z = graph.pos.z;  
  graph.hoverCircle = circle;
  scene.add( circle );
  circles.push(circle);
}

function removeHoverCircle(graph){
  if(!graph.hoverCircle) return;
  scene.remove(graph.hoverCircle);
  circles = circles.filter( (item) => item != graph.hoverCircle );
  graph.hoverCircle = null;  
}

function toggleChildren( graph ) {
  graph.collapsed = !graph.collapsed;
  if(graph.collapsed) 
    addCircle(graph);
  else
    removeCircle(graph);
  let checkForCollapsed = (parent) => {
    if(parent.collapsed) return true;
    if(parent.parent) return checkForCollapsed(parent.parent);
    return false;
  }

  everyChild(graph, (node) => {
    node.enabled = !checkForCollapsed(node.parent);
    if(node.enabled)
      addToScene(node);
    else
      removeFromScene(node);
  });
}

let lines = [];
let lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
let addLineToScene = (node, other) => {
  if(!node.enabled || !other.enabled)
    return;
  let geometry = new THREE.Geometry();
  geometry.vertices.push(node.pos);
  geometry.vertices.push(other.pos);
  let line = new THREE.Line( geometry, lineMaterial );
  scene.add(line);  
  lines.push(line);
}
let removeLinesFromScene = () => {    
  while( lines.length ) {
      let line = lines.pop();        
      scene.remove(line);
      line.geometry.dispose();
  } 
}

function mouseFromEvent( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    let mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    return mouse;
}

let raycaster = new THREE.Raycaster();
function everyRaycastIntersect( mouse, callback ) {
  raycaster.setFromCamera( mouse, camera );

  let intersects = raycaster.intersectObjects( scene.children );
  let intersect = intersects.filter(item => item.object.node != null )[0];
  if(intersect) callback(intersect.object.node, intersect.point);
}

let onMouseDblClick = event => {
    let mouse = mouseFromEvent( event );
    everyRaycastIntersect( mouse, toggleChildren );
}

// window.addEventListener( 'mousemove', onMouseMove, false );
let plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5000, 5000, 8, 8), 
   new THREE.MeshBasicMaterial( {
       color: 0x248f24, alphaTest: 0, visible: false
}));
let dragging = null;
function onMouseDown( event ) {
  let mouse = mouseFromEvent( event );
  controls.enabled = true;
  everyRaycastIntersect(mouse, (node, position) => {
    plane.position.copy(position);
    plane.lookAt(camera.position);  
    dragging = node;
    controls.enabled = false;
  });
}
function onMouseUp( event ) {
  if(dragging){
    dragging = null;
  }
}
let mouseMove;
function onMouseMove( event ) {
  let mouse = mouseFromEvent( event );
  mouseMove = mouse;  
  if(dragging) {
    raycaster.setFromCamera( mouse, camera );
    let intersect = raycaster.intersectObject( plane )[0];  
    if(intersect){
      dragging.pos.copy(intersect.point);
    }
  }
}

document.addEventListener( 'mousedown', onMouseDown, false );
document.addEventListener( 'mousemove', onMouseMove, false );
document.addEventListener( 'mouseup', onMouseUp, false );

document.addEventListener( 'dblclick', onMouseDblClick, false );

document.addEventListener( 'touchstart', event => onMouseDown(event.changedTouches[0]), false );
document.addEventListener( 'touchmove', event => onMouseMove(event.changedTouches[0]), false );
document.addEventListener( 'touchend', event => onMouseUp(event.changedTouches[0]), false );

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener( 'resize', onResize, false );  

let lastHoveredNode = null;
function animate() {
  requestAnimationFrame( animate );

  if(mouseMove) {
    if(lastHoveredNode) removeHoverCircle(lastHoveredNode);
    everyRaycastIntersect(mouseMove, graph => {
      addHoverCircle(graph);
      lastHoveredNode = graph;
    } );
  }

  for(let i=0; i < 20; i++)
    forceDirected(graph, {ignore: dragging});
  removeLinesFromScene();
  everyNode(graph, updatePosition);                
  everyEdge(graph, addLineToScene);
  for(let circle of circles) {
    circle.lookAt(camera.position);
  }
  controls.update();

  renderer.render( scene, camera );
}

export default init