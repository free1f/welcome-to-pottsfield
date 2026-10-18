import { THREE, mainScene, scene } from './main.js'
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#dfe7ec', 0.275)
mainScene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#fcfcfc', 1)
directionalLight.position.set(10, 5, 30)
directionalLight.intensity = 0.2
mainScene.add(directionalLight)
const directionalHelper = new THREE.DirectionalLightHelper(directionalLight)
mainScene.add(directionalHelper)

// Intro scene lights
scene.add(new THREE.AmbientLight('#ffffff', 1.5))
const introDirectionalLight = new THREE.DirectionalLight('#ffffff', 2)
introDirectionalLight.position.set(0, 5, 30)
scene.add(introDirectionalLight)