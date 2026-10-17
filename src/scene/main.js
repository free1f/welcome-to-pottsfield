import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()

export { THREE, scene, gltfLoader, textureLoader }
export default scene