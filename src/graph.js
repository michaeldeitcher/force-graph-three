import * as THREE from 'three';

var idIndex = 0;

class GraphNode {
    constructor(depth) {
      const x = 100 - Math.random() * 200;
      const y = 10 * Math.random() * (4 - depth);
      const z = 1;//10 * Math.random() * -4;
      this.pos = new THREE.Vector3( x, y, z ); 
      this.id = idIndex;
      this.pinned = false;
      this.collapsed = false;
      this.enabled = true;
      this.parent = null;
      idIndex += 1;
      
      if(idIndex == 0)
        this.pos = new THREE.Vector3( 0,0,0 ); 

      this.edges = [];
    }
    connect(other) {
      this.edges.push(other);
      other.edges.push(this);
    }
    hasEdge(other) {
      return this.edges.includes(other);
    }
    toggle() {
      this.enabled = !this.enabled;
    }
  }

  function treeGraph(depth, branches) {
    let graph = [ new GraphNode(depth)];
    if (depth > 1) {
      for( let i = 0; i < branches; i++ ){
        let subGraph = treeGraph(depth - 1, branches);
        graph[0].connect(subGraph[0]);
        subGraph[0].parent = graph[0];
        graph = graph.concat(subGraph);
      }
    }
    return graph;
  }

  function everyChild( graph, callback ) {
    for(let node of graph.edges) {
      if( node !== graph.parent) {
        everyChild(node, callback);
        callback(node);
      }
    }
  }
  
  function everyNode(graph, callback ) {
    for (let node of graph ) {
      callback(node);
    }
  }

  const springLength =  10;
  const springStrength = 20;
  const repulsionStrength = 40000;
  
  function forceDirected(graph, {ignore}) {
    for (let i = 0; i < graph.length; i++ ) {
      let node = graph[i];
      if(!node.enabled) continue;
      for( let j = i + 1; j < graph.length; j++ ) {
        let other = graph[j];
        if(!other.enabled) continue;
        let apart = new THREE.Vector3().copy(other.pos);
        apart.sub(node.pos);
        var distance = other.pos.distanceTo(node.pos);
        distance = Math.max(1, distance);
        let forceSize = -repulsionStrength / (distance * distance);
        if( node.hasEdge(other) ) {
          forceSize += (distance - springLength * springStrength);
        }
        apart.normalize();
        apart.multiplyScalar(forceSize/2);        
        if(node !== ignore && !node.pinned) node.pos.add(apart);
        if(other !== ignore && !other.pinned) other.pos.sub(apart);      
      }
    }
  }
  
  function everyEdge(graph, callback) {
    for (let i = 0; i < graph.length; i++ ) {
      let node = graph[i];
      for( let j = i + 1; j < graph.length; j++ ) {
        let other = graph[j];
        if( node.hasEdge(other) ) {
          callback(node, other);
        }
      }
    }
  }

  export { GraphNode, treeGraph, forceDirected, everyEdge, everyNode, everyChild }