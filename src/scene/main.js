import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const mainScene = new THREE.Scene()
const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()
const state = { currentScene: 'intro' }

export { THREE, scene, mainScene, gltfLoader, textureLoader, state }