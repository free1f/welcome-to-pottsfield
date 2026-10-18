import { THREE } from './scene/main.js'
import { animateTubes, fitTubesToWidth } from './geometries/cube.js'
import { sizes } from './utils/constants.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { camera, orthographicCamera, updateOrthographicCamera } from './scene/camera.js'
import { mainScene, scene } from './scene/main.js'
import gui from './utils/gui.js'
import './scene/sky.js'
import './models/enoch.js'
import './geometries/cube.js'
import './scene/floor.js'
import './scene/lights.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

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

const enterButton = document.getElementById('enter-button')
const fade = document.getElementById('fade')

enterButton.addEventListener('click', () =>
{
  enterButton.classList.add('hidden')
  fade.classList.add('active')

  setTimeout(() =>
  {
    currentScene = 'main'
    fade.classList.remove('active')
  }, 1000)
}, { once: true })

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