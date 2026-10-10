import GUI from 'lil-gui'
import floor from '../scene/floor.js'

// Debug
const gui = new GUI()

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.01).name('floor displacement scale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.01).name('floor displacement bias')
gui.close()
export default gui