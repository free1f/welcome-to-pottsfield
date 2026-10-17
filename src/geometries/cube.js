import { THREE } from '../scene/main.js'
import { enochHexColors } from '../utils/constants.js'
import scene, { textureLoader } from '../scene/main.js'

const numbersOfCloths = 50;
const yHeight = 2
const zSpacing = 0.1

const clothColorTexture = textureLoader.load('./cloth/FabricPlainNaturalSheer009_COL_1K.jpg')
const clothNormalTexture = textureLoader.load('./cloth/FabricPlainNaturalSheer009_NRM_1K.png')

clothColorTexture.colorSpace = THREE.SRGBColorSpace

const tubes = [];

export function createScreenTube(yPos = 0, yScale = 1, zPos = 0, rotation = 18) {
  const width = 2;
  const height = 0.4;
  const depth = 0.08;
  const segmentsX = 100;
  const segmentsY = 1;
  const segmentsZ = 1;

  const geometry = new THREE.BoxGeometry(width, height, depth, segmentsX, segmentsY, segmentsZ);

  const positionAttribute = geometry.attributes.position;
  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const t = (x + 1) / 2;
    const sineY = Math.sin(3* Math.PI * t) * yScale;
    const currentY = positionAttribute.getY(i);
    positionAttribute.setY(i, currentY + sineY);
  }

  const frontMaterial = new THREE.MeshStandardMaterial({
    map: clothColorTexture,
    normalMap: clothNormalTexture,
    color: enochHexColors[Math.floor(Math.random() * enochHexColors.length)]
  });
  const sideMaterial = new THREE.MeshStandardMaterial({
    map: clothColorTexture,
    normalMap: clothNormalTexture,
    color: enochHexColors[Math.floor(Math.random() * enochHexColors.length)]
  });
  const materialsArray = [
    sideMaterial,
    sideMaterial,
    sideMaterial,
    sideMaterial,
    frontMaterial,
    sideMaterial,
  ]
  const tubeMesh = new THREE.Mesh(geometry, materialsArray);
  tubeMesh.position.set(0, yPos + yHeight, zPos);
  tubeMesh.rotation.x = Math.PI / rotation;

  geometry.userData.basePosition = positionAttribute.array.slice();
  tubeMesh.userData = { yScale, phase: Math.random() * Math.PI * 2}
  return tubeMesh;
}

for (let i = 0; i < numbersOfCloths; i++) {
  const yPosInterval = THREE.MathUtils.randFloat(-1, 1);
  const yScaleInterval = THREE.MathUtils.randFloat(-0.2, 0.2);
  const zPosInterval = (i - numbersOfCloths / 2) * zSpacing;
  const randomRotation = THREE.MathUtils.randFloat(15, 30);

  const tube = createScreenTube(yPosInterval, yScaleInterval, zPosInterval, randomRotation);
  tubes.push(tube);
  scene.add(tube);
}

export function fitTubesToWidth(visibleWidth) {
  for (const tube of tubes) {
    tube.scale.x = visibleWidth / 2;
  }
}

export function animateTubes(elapsedTime) {
  for (const tube of tubes) {
    const pos = tube.geometry.attributes.position;
    const base = tube.geometry.userData.basePosition;
    const { yScale, phase } = tube.userData;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const t = (x + 1) / 2;
      const sineY = Math.sin(3 * Math.PI * t + elapsedTime * 2 + phase) * yScale;
      pos.setY(i, base[i * 3 + 1] + sineY);
    }
    pos.needsUpdate = true;
  }
}
