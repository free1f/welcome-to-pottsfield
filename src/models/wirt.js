import { mainScene, gltfLoader } from '../scene/main.js'

gltfLoader.load(
  '/wirt/Wirt.gltf',
  (gltf) => {
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.rotation.y = Math.PI
    gltf.scene.position.set(4, 0, 9)
    mainScene.add(gltf.scene)
  },
  () => {},
  (error) => {
    console.error(error)
  }
)