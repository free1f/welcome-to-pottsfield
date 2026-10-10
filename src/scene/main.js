import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const gltfLoader = new GLTFLoader()

export { THREE, scene, gltfLoader }
export default scene