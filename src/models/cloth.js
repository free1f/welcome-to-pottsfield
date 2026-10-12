import scene from '../scene/main.js'
import { gltfLoader } from '../scene/main.js'

gltfLoader.load(
  '/cloth/Tela_Prueba.gltf',
  (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.position.set(0, 0, 20)
    scene.add(gltf.scene)
    console.log(gltf.scene)
  },
  () => {},
  (error) => {
    console.error(error)
  }
)