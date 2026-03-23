import * as THREE from 'https://esm.sh/three@0.152.2';
import { GLTFLoader } from 'https://esm.sh/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

const container = document.querySelector('.stlobject');
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
	40,
	container.clientWidth / container.clientHeight,
	0.1,
	500
);
camera.position.set(0.5, 10, 0);
camera.lookAt(0, 0, 0);

scene.add(new THREE.AmbientLight(0xffffff, 1.5));

let model;
const loader = new GLTFLoader();

loader.load('./3dModel/gssilogo.glb', (gltf) => {
	model = gltf.scene;
	model.scale.set(40, 40, 40);
	// model.rotation.x = 1;
	// model.rotation.y = -1.575;
	// model.rotation.z = 0;
	scene.add(model);
});

function animate() 
{
	requestAnimationFrame(animate);

	if (model)
	{
		model.rotation.x += 0.03;
	}

	renderer.render(scene, camera);
}

animate();

// handle window resize
window.addEventListener('resize', () => 
{
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(container.clientWidth, container.clientHeight);
});