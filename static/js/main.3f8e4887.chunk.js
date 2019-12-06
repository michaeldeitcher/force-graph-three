(this["webpackJsonpforce-graph-three"]=this["webpackJsonpforce-graph-three"]||[]).push([[0],{12:function(e,n,t){e.exports=t(27)},17:function(e,n,t){},19:function(e,n,t){},21:function(e,n,t){},22:function(e,n,t){},27:function(e,n,t){"use strict";t.r(n);var o,i=t(1),r=t.n(i),a=t(9),c=t.n(a),l=(t(17),t(18),t(19),t(2)),s=t(3),d=t(5),u=t(4),h=t(6),p=t(10),v=t.n(p),f=(t(21),function(e){function n(){var e,t;Object(l.a)(this,n);for(var o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];return(t=Object(d.a)(this,(e=Object(u.a)(n)).call.apply(e,[this].concat(i)))).reloadPage=function(){return window.location.reload()},t}return Object(h.a)(n,e),Object(s.a)(n,[{key:"componentDidMount",value:function(){v.a.AutoInit()}},{key:"render",value:function(){return r.a.createElement("div",{className:"Menu"},r.a.createElement("ul",{id:"slide-out",class:"sidenav"},r.a.createElement("li",null,r.a.createElement("a",{onClick:this.reloadPage},"Reload Page")),r.a.createElement("li",{class:"no-padding"})),r.a.createElement("a",{href:"#","data-target":"slide-out",class:"sidenav-trigger"},r.a.createElement("i",{class:"material-icons"},"menu")))}}]),n}(i.Component)),m=t(7),w=o=o||{},y=(t(22),function(e){function n(e){var t;return Object(l.a)(this,n),(t=Object(d.a)(this,Object(u.a)(n).call(this,e))).state={checked:w.pinNodeEnabled||!1},t.handleChange=t.handleChange.bind(Object(m.a)(t)),t}return Object(h.a)(n,e),Object(s.a)(n,[{key:"handleChange",value:function(e){w.pinNodeEnabled=e.target.checked,this.setState({checked:e.target.checked})}},{key:"render",value:function(){return r.a.createElement("div",{class:"switch"},r.a.createElement("label",null,"Off",r.a.createElement("input",{type:"checkbox",checked:this.state.checked,onChange:this.handleChange}),r.a.createElement("span",{class:"lever"}),"On"))}}]),n}(i.Component));var g=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(f,null),r.a.createElement(y,null))},b=t(0),E=0,x=function(){function e(n){Object(l.a)(this,e);var t=100-200*Math.random(),o=10*Math.random()*(4-n);this.pos=new b.y(t,o,1),this.id=E,this.pinned=!1,this.collapsed=!1,this.enabled=!0,this.parent=null,0==(E+=1)&&(this.pos=new b.y(0,0,0)),this.edges=[]}return Object(s.a)(e,[{key:"connect",value:function(e){this.edges.push(e),e.edges.push(this)}},{key:"hasEdge",value:function(e){return this.edges.includes(e)}},{key:"toggle",value:function(){this.enabled=!this.enabled}}]),e}();function k(e,n){var t=!0,o=!1,i=void 0;try{for(var r,a=e[Symbol.iterator]();!(t=(r=a.next()).done);t=!0){n(r.value)}}catch(c){o=!0,i=c}finally{try{t||null==a.return||a.return()}finally{if(o)throw i}}}var j=10,C=20,O=4e4;var z,M,P,W,A,S,L=t(11),N=function(){function e(n){var t=this,o=n.renderer,i=n.scene;Object(l.a)(this,e),this.renderer=o,this.scene=i,this.camera=new b.o(75,window.innerWidth/window.innerHeight,1,1e4),this.camera.position.z=1e3,this.controls=new L.a(this.camera,this.renderer.domElement),this.controls.target=new b.y(0,0,0),this.controls.maxDistance=5e3;window.addEventListener("resize",(function(){t.camera.aspect=window.innerWidth/window.innerHeight,t.camera.updateProjectionMatrix(),t.renderer.setSize(window.innerWidth,window.innerHeight)}),!1)}return Object(s.a)(e,[{key:"update",value:function(){this.controls.update(),this.renderer.render(this.scene,this.camera)}},{key:"position",get:function(){return this.camera.position}}]),e}(),T=(t(23),["varying vec3 vWorldPosition;","void main() {","  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );","  vWorldPosition = worldPosition.xyz;","  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n")),H=["uniform vec3 topColor;","uniform vec3 bottomColor;","uniform float offset;","uniform float exponent;","varying vec3 vWorldPosition;","void main() {","  float h = normalize( vWorldPosition + offset ).y;","  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( h, exponent ), 0.0 ) ), 1.0 );","}"].join("\n"),F=function(){var e={topColor:{type:"c",value:new b.c(30719)},bottomColor:{type:"c",value:new b.c(16777215)},offset:{type:"f",value:5e3},exponent:{type:"f",value:1.5}},n=new b.u(5e3,32,32),t=new b.t({vertexShader:T,fragmentShader:H,uniforms:e,side:b.e,fog:!1});return new b.l(n,t)};var B=function(e){if(!e.mesh){var n=new b.u(30,16,12),t=new b.l(n,new b.n({color:new b.c(Math.random(),Math.random(),Math.random())}));t.position.x=e.pos.x,t.position.y=e.pos.y,t.position.z=e.pos.z,e.mesh=t,t.node=e,M.add(t),e.collapsed&&J(e)}},D=function(e){_(e),M.remove(e.mesh),e.mesh=null},I=function(e){e.enabled&&(e.mesh.position.x=e.pos.x,e.mesh.position.y=e.pos.y,e.mesh.position.z=e.pos.z,e.circle&&e.circle.position.copy(e.mesh.position))},J=function(e){var n=new b.b(43,32),t=new b.m({color:16776960}),o=new b.l(n,t);o.position.x=e.pos.x,o.position.y=e.pos.y,o.position.z=e.pos.z,e.circle=o,M.add(o),A.push(o)},_=function(e){e.circle&&(M.remove(e.circle),A=A.filter((function(n){return n!=e.circle})),e.circle=null)},q=new b.b(45,32),R=new b.m({color:16711680});function V(e){e.collapsed=!e.collapsed,e.collapsed?J(e):_(e);!function e(n,t){var o=!0,i=!1,r=void 0;try{for(var a,c=n.edges[Symbol.iterator]();!(o=(a=c.next()).done);o=!0){var l=a.value;l!==n.parent&&(e(l,t),t(l))}}catch(s){i=!0,r=s}finally{try{o||null==c.return||c.return()}finally{if(i)throw r}}}(e,(function(e){e.enabled=!function e(n){return!!n.collapsed||!!n.parent&&e(n.parent)}(e.parent),e.enabled?B(e):D(e)}))}var X=[],Y=new b.j({color:255}),$=function(e,n){if(e.enabled&&n.enabled){var t=new b.h;t.vertices.push(e.pos),t.vertices.push(n.pos);var o=new b.i(t,Y);M.add(o),X.push(o)}},G=function(){for(;X.length;){var e=X.pop();M.remove(e),e.geometry.dispose()}};function K(e){var n=new b.x;return n.x=e.clientX/window.innerWidth*2-1,n.y=-e.clientY/window.innerHeight*2+1,n}var Q=new b.r;function U(e,n){Q.setFromCamera(e,P.camera);var t=Q.intersectObjects(M.children).filter((function(e){return null!=e.object.node}))[0];t&&n(t.object.node,t.point)}var Z,ee=null;function ne(e){var n=K(e);P.controls.enabled=!0,U(n,(function(e,n){S.position.copy(n),S.lookAt(P.position),ee=e,P.controls.enabled=!1}))}function te(e){ee&&(ee=null)}function oe(e){var n=K(e);if(Z=n,ee){Q.setFromCamera(n,P.camera);var t=Q.intersectObject(S)[0];t&&(ee.pos.copy(t.point),S.position.copy(t.point),S.lookAt(P.position),ee.pinned=w.pinNodeEnabled)}}document.addEventListener("mousedown",ne,!1),document.addEventListener("mousemove",oe,!1),document.addEventListener("mouseup",te,!1),document.addEventListener("dblclick",(function(e){U(K(e),V)}),!1),document.addEventListener("touchstart",(function(e){return ne(e.changedTouches[0])}),!1),document.addEventListener("touchmove",(function(e){return oe(e.changedTouches[0])}),!1),document.addEventListener("touchend",(function(e){return te(e.changedTouches[0])}),!1);var ie=null;function re(){var e;requestAnimationFrame(re),Z&&(ie&&((e=ie).hoverCircle&&(M.remove(e.hoverCircle),A=A.filter((function(n){return n!=e.hoverCircle})),e.hoverCircle=null)),U(Z,(function(e){!function(e){var n=new b.l(q,R);n.position.x=e.pos.x,n.position.y=e.pos.y,n.position.z=e.pos.z,e.hoverCircle=n,M.add(n),A.push(n)}(e),ie=e}))),function(e,n){for(var t=n.ignore,o=0;o<e.length;o++){var i=e[o];if(i.enabled)for(var r=o+1;r<e.length;r++){var a=e[r];if(a.enabled){var c=(new b.y).copy(a.pos);c.sub(i.pos);var l=a.pos.distanceTo(i.pos);l=Math.max(1,l);var s=-O/(l*l);i.hasEdge(a)&&(s+=l-j*C),c.normalize(),c.multiplyScalar(s/2),i===t||i.pinned||i.pos.add(c),a===t||a.pinned||a.pos.sub(c)}}}}(z,{ignore:ee}),G(),k(z,I),function(e,n){for(var t=0;t<e.length;t++)for(var o=e[t],i=t+1;i<e.length;i++){var r=e[i];o.hasEdge(r)&&n(o,r)}}(z,$);var n=!0,t=!1,o=void 0;try{for(var i,r=A[Symbol.iterator]();!(n=(i=r.next()).done);n=!0){i.value.lookAt(P.position)}}catch(a){t=!0,o=a}finally{try{n||null==r.return||r.return()}finally{if(t)throw o}}P.update()}var ae=function(){z=function e(n,t){var o=[new x(n)];if(n>1)for(var i=0;i<t;i++){var r=e(n-1,t);o[0].connect(r[0]),r[0].parent=o[0],o=o.concat(r)}return o}(4,4),(M=new b.s).fog=new b.g(0,25e-8),(W=new b.z).setSize(window.innerWidth,window.innerHeight),document.getElementsByTagName("body")[0].setAttribute("style","margin: 0;"),W.domElement.setAttribute("style","position: absolute; top: 0; left: 0;"),document.body.appendChild(W.domElement),P=new N({renderer:W,scene:M}),A=[],k(z,B),S=new b.l(new b.p(500,500,8,8),new b.m({color:2395940,alphaTest:0,visible:!1})),M.add(S),M.add(F()),M.add(new b.a(4473924));var e=new b.d(16777215);e.position.set(-1,0,1).normalize(),M.add(e),re()};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(g,null),document.getElementById("root")),ae(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[12,1,2]]]);
//# sourceMappingURL=main.3f8e4887.chunk.js.map