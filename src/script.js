import { THREE } from './scene/main.js'
import { sizes } from './utils/constants.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import scene from './scene/main.js'
import gui from './utils/gui.js'
import './scene/sky.js'
import './models/enoch.js'
import { camera, orthographicCamera } from './scene/camera.js'
import './geometries/tube.js'
import './geometries/cube.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#dfe7ec', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(0, 10, 30)
scene.add(directionalLight)
const directionalHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalHelper)

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
  // Timer
  timer.update()
  const elapsedTime = timer.getElapsed()

  // Update controls
  controls.update()

  // Render
  // renderer.render(scene, camera)
  renderer.render(scene, orthographicCamera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()