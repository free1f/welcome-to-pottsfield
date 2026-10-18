import { THREE, scene } from './main.js'
import { sizes } from '../utils/constants.js'
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
camera.position.y = 2
camera.position.z = 7
camera.position.x = -7

const orthoHeight = 2
const orthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 30)

const updateOrthographicCamera = (aspect) => {
  orthographicCamera.left = -orthoHeight * aspect / 2
  orthographicCamera.right = orthoHeight * aspect / 2
  orthographicCamera.top = orthoHeight / 2
  orthographicCamera.bottom = -orthoHeight / 2
  orthographicCamera.updateProjectionMatrix()
}
updateOrthographicCamera(sizes.width / sizes.height)

orthographicCamera.position.z = 27
orthographicCamera.position.y = 2

const helper = new THREE.CameraHelper(orthographicCamera)

scene.add(orthographicCamera)

export { camera, orthographicCamera, updateOrthographicCamera }