import * as THREE from 'three';
import { GraphNode, treeGraph, forceDirected, everyEdge, everyNode, everyChild } from './graph.js'
import Camera from './Camera'
import { inherits } from 'util';
import simpleStore from './simpleStore';
import skybox from './skybox';


let graph, scene, camera, renderer, controls, circles, plane;
function init() {
  graph = treeGraph(4,4);

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, 0.00000025 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementsByTagName("body")[0].setAttribute("style", "margin: 0;");
  renderer.domElement.setAttribute("style", "position: absolute; top: 0; left: 0;");
  document.body.appendChild( renderer.domElement );
  camera = new Camera({renderer,scene});

  circles = [];
  everyNode(graph, addToScene);

  plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 500, 8, 8), 
    new THREE.MeshBasicMaterial( {color: 0x248f24, alphaTest: 0, visible: false})
  );
  scene.add(plane);

  scene.add(skybox());

  // Add lights
  scene.add( new THREE.AmbientLight(0x444444));
  let dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set( - 1, 0, 1 ).normalize();
  scene.add(dirLight);

  animate();
}

let addToScene = node => {
  if(node.mesh) return;
  const randomMaterial = () => new THREE.MeshPhongMaterial( { color: new THREE.Color(Math.random(), Math.random(), Math.random())} );
  const geometry = new THREE.SphereGeometry( 30,16,12 );
  let mesh = new THREE.Mesh( geometry, randomMaterial() );
  mesh.position.copy(node.pos);
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
  node.mesh.position.copy(node.pos);
  if(node.circle) {
    node.circle.position.copy(node.mesh.position);
  }
}

let addCircle = graph => {
  let geometry = new THREE.CircleGeometry( 43, 32 );
  let material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  let circle = new THREE.Mesh( geometry, material );
  circle.position.copy(graph.pos);
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
  raycaster.setFromCamera( mouse, camera.camera );

  let intersects = raycaster.intersectObjects( scene.children );
  let intersect = intersects.filter(item => item.object.node != null )[0];
  if(intersect) callback(intersect.object.node, intersect.point);
}

let onMouseDblClick = event => {
    let mouse = mouseFromEvent( event );
    everyRaycastIntersect( mouse, toggleChildren );
}

// window.addEventListener( 'mousemove', onMouseMove, false );
let dragging = null;
function onMouseDown( event ) {
  let mouse = mouseFromEvent( event );
  camera.controls.enabled = true;
  everyRaycastIntersect(mouse, (node, position) => {
    plane.position.copy(position);
    plane.lookAt(camera.position);  
    dragging = node;
    camera.controls.enabled = false;
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
    raycaster.setFromCamera( mouse, camera.camera );
    let intersect = raycaster.intersectObject( plane )[0];  
    if(intersect){
      dragging.pos.copy(intersect.point);
      plane.position.copy(intersect.point);
      plane.lookAt(camera.position);    
      dragging.pinned = simpleStore.pinNodeEnabled;
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

  forceDirected(graph, {ignore: dragging});
  removeLinesFromScene();
  everyNode(graph, updatePosition);                
  everyEdge(graph, addLineToScene);
  for(let circle of circles) {
    circle.lookAt(camera.position);
  }
  camera.update();
}

export default init