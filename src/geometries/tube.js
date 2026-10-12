// Taken from https://threejs.org/docs/#TubeGeometry
import { THREE } from '../scene/main.js'
import scene from '../scene/main.js'
import { enochHexColors } from '../utils/constants.js'

class CustomSinCurve extends THREE.Curve {
	constructor(scale = 1) {
		super();
		this.scale = scale;
	}
	getPoint(t, optionalTarget = new THREE.Vector3()) {
		const tx = t * 2 - 1;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;
		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}

const path = new CustomSinCurve(1);
const geometry = new THREE.TubeGeometry(path, 100, 0.2, 3, false);

const generateTubeColor = () => enochHexColors[Math.floor(Math.random() * enochHexColors.length)]; 

const generateTube = (
  scaleY = 0.1,
  posY = 0,
  color = enochHexColors[0]
) => {
  const material = new THREE.MeshBasicMaterial({ color });
  const tube = new THREE.Mesh( geometry, material );

  const outlineMaterial = new THREE.ShaderMaterial({
    uniforms: {
      outlineThickness: { value: 0.015 },
      outlineColor: { value: new THREE.Color('#020202') }
    },
    vertexShader: `
      uniform float outlineThickness;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vec3 transformedNormal = normalize(normalMatrix * normal);
        mvPosition.xyz += transformedNormal * outlineThickness;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 outlineColor;
      void main() {
        gl_FragColor = vec4(outlineColor, 1.0);
      }
    `,
    side: THREE.BackSide
  })
  const outline = new THREE.Mesh( geometry, outlineMaterial );
  tube.add(outline);

  tube.scale.set(1.5, scaleY, 1);
  tube.position.set(0, THREE.MathUtils.lerp(0, 2, Math.random()) + posY, 0);
  return tube;
}

export { generateTubeColor, generateTube }