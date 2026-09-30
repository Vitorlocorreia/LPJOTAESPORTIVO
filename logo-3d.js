import * as THREE from './assets/vendor/three.module.min.js';

export function mountLogo(host) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); } catch { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 3000);
  camera.position.set(0, 0, 660);
  const group = new THREE.Group();
  scene.add(group);
  const shape = new THREE.Shape();
  shape.moveTo(0,0); shape.lineTo(235,0); shape.lineTo(235,-158);
  shape.bezierCurveTo(235,-222,184,-273,117.5,-273);
  shape.bezierCurveTo(51,-273,0,-222,0,-158);
  shape.lineTo(0,-120); shape.lineTo(72,-120); shape.lineTo(72,-158);
  shape.bezierCurveTo(72,-185,92,-204,117.5,-204);
  shape.bezierCurveTo(143,-204,162,-185,162,-158);
  shape.lineTo(162,-69); shape.lineTo(0,-69); shape.closePath();
  const dot = new THREE.Shape();
  dot.moveTo(228,-224); dot.lineTo(269,-224); dot.lineTo(269,-267); dot.lineTo(228,-267); dot.closePath();
  const geometry = new THREE.ExtrudeGeometry([shape,dot], {depth: 44, bevelEnabled: true, bevelThickness: 2.4, bevelSize: 2.1, bevelSegments: 4, curveSegments: 48, steps: 1});
  geometry.translate(-134.5,136.5,-22);
  const uv=geometry.attributes.uv,positions=geometry.attributes.position;
  for(let i=0;i<uv.count;i++)uv.setXY(i,(positions.getX(i)+134.5)/269,(positions.getY(i)+136.5)/273);
  // A restrained satin finish gives the broad front face the variation of brushed metal.
  const finishCanvas=document.createElement('canvas');finishCanvas.width=512;finishCanvas.height=512;
  const ctx=finishCanvas.getContext('2d'),finish=ctx.createLinearGradient(0,0,420,512);
  [[0,'#e8e9ed'],[.20,'#b7bac1'],[.42,'#f8f8f7'],[.49,'#e5e6e8'],[.65,'#92969f'],[1,'#dbdde1']].forEach(([stop,color])=>finish.addColorStop(stop,color));
  ctx.fillStyle=finish;ctx.fillRect(0,0,512,512);
  const satin=new THREE.CanvasTexture(finishCanvas);satin.colorSpace=THREE.SRGBColorSpace;
  // Procedural studio environment: no HDR texture or model downloads.
  const studio = new THREE.Scene();
  studio.background = new THREE.Color('#888888');
  [[-220,250,300,3.5],[220,80,100,2.3],[0,-220,220,.7]].forEach(([x,y,z,intensity])=>{
    const panel=new THREE.Mesh(new THREE.PlaneGeometry(280,500),new THREE.MeshBasicMaterial({color:new THREE.Color(intensity,intensity,intensity)}));
    panel.position.set(x,y,z);panel.lookAt(0,0,0);studio.add(panel);
  });
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio,.04);
  scene.environment = environment.texture;
  const face = new THREE.MeshStandardMaterial({ color: '#e1e2e5', map:satin, metalness: .78, roughness: .18, envMapIntensity: 1.8 });
  const edge = new THREE.MeshStandardMaterial({ color: '#55565c', metalness: .88, roughness: .29 });
  group.add(new THREE.Mesh(geometry,[face,edge]));
  scene.add(new THREE.HemisphereLight(0xffffff,0x17151a,1.3));
  const key=new THREE.DirectionalLight(0xffffff,5);key.position.set(-200,280,400);scene.add(key);
  const rim=new THREE.PointLight(0xffffff,95000,1100,2);rim.position.set(240,-80,120);scene.add(rim);
  host.appendChild(renderer.domElement);
  host.classList.add('has-webgl');
  let visible=true,progress=0,pointer={x:0,y:0},disposed=false;
  const render=()=>{
    if(!visible||disposed||document.hidden)return;
    group.rotation.set(.16-progress*.3+pointer.y*.09,-.42+progress*Math.PI*2+pointer.x*.13,-.10+progress*.13);
    group.scale.setScalar(1);
    renderer.render(scene,camera);
  };
  const resize=()=>{const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();render();};
  const ro=new ResizeObserver(resize);ro.observe(host);
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;render();});io.observe(host);
  const onVisibility=()=>render();document.addEventListener('visibilitychange',onVisibility);
  const loss=e=>{e.preventDefault();host.classList.remove('has-webgl');};renderer.domElement.addEventListener('webglcontextlost',loss);
  resize();
  return {update(p,x=0,y=0){progress=p;pointer={x,y};render();},dispose(){disposed=true;ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',onVisibility);geometry.dispose();face.dispose();satin.dispose();edge.dispose();environment.dispose();pmrem.dispose();studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});renderer.dispose();renderer.domElement.remove();host.classList.remove('has-webgl');}};
}

