import { THREE } from './scene/main.js'
import { animateTubes, fitTubesToWidth } from './geometries/cube.js'
import { sizes } from './utils/constants.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { camera, orthographicCamera, updateOrthographicCamera } from './scene/camera.js'
import mainScene from './scene/main.js'
import scene from './scene/main.js'
import gui from './utils/gui.js'
import './scene/sky.js'
import './models/enoch.js'
import './geometries/cube.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#dfe7ec', 0.275)
mainScene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(0, 10, 30)
mainScene.add(directionalLight)
scene.add(directionalLight)
const directionalHelper = new THREE.DirectionalLightHelper(directionalLight)
mainScene.add(directionalHelper)

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  updateOrthographicCamera(camera.aspect)
  fitTubesToWidth(orthographicCamera.right - orthographicCamera.left)

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
fitTubesToWidth(orthographicCamera.right - orthographicCamera.left)

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
let currentScene = 'intro'

const tick = () =>
{
  // Timer
  timer.update()
  const elapsedTime = timer.getElapsed()

  if (currentScene === 'intro') {
    animateTubes(elapsedTime)
    renderer.render(scene, orthographicCamera)
  } else {
    controls.update()
    renderer.render(mainScene, camera)
  }

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()