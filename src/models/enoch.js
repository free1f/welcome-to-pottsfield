import scene from '../scene/main.js'
import { gltfLoader } from '../scene/main.js'

// Models
gltfLoader.load(
  '/enoch/SM_Enoch.gltf',
  (gltf) => {
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(0, 0, -5)
    scene.add(gltf.scene)
  },
  () => {},
  (error) => {
    console.error(error)
  }
)