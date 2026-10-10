import scene from '../scene/main.js'
import { gltfLoader } from '../scene/main.js'

// Models
gltfLoader.load(
  '/enoch/SM_Enoch.gltf',
  (gltf) => {
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(0, 0, 0)
    scene.add(gltf.scene)
    console.log(gltf.scene)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
  },
  (error) => {
    console.error(error)
  }
)