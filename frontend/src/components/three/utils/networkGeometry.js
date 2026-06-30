export const NODE_COUNT = 60;
export const CONNECTION_DISTANCE = 2.8;

export function generateNodes(count = NODE_COUNT) {
  const positions = new Float32Array(count * 3);
  const velocities = [];

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    velocities.push({
      x: (Math.random() - 0.5) * 0.003,
      y: (Math.random() - 0.5) * 0.003,
      z: (Math.random() - 0.5) * 0.002,
    });
  }

  return { positions, velocities };
}

export function updateNodePositions(positionArray, velocities, bounds = { x: 7, y: 4, z: 3 }) {
  const count = velocities.length;
  for (let i = 0; i < count; i++) {
    positionArray[i * 3] += velocities[i].x;
    positionArray[i * 3 + 1] += velocities[i].y;
    positionArray[i * 3 + 2] += velocities[i].z;

    if (Math.abs(positionArray[i * 3]) > bounds.x) velocities[i].x *= -1;
    if (Math.abs(positionArray[i * 3 + 1]) > bounds.y) velocities[i].y *= -1;
    if (Math.abs(positionArray[i * 3 + 2]) > bounds.z) velocities[i].z *= -1;
  }
}

export function buildConnections(positionArray, count, linePositionsBuffer, maxLines, connectionDistance = CONNECTION_DISTANCE) {
  let lineIndex = 0;

  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      if (lineIndex >= maxLines) break;

      const dx = positionArray[i * 3] - positionArray[j * 3];
      const dy = positionArray[i * 3 + 1] - positionArray[j * 3 + 1];
      const dz = positionArray[i * 3 + 2] - positionArray[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < connectionDistance) {
        linePositionsBuffer[lineIndex * 6] = positionArray[i * 3];
        linePositionsBuffer[lineIndex * 6 + 1] = positionArray[i * 3 + 1];
        linePositionsBuffer[lineIndex * 6 + 2] = positionArray[i * 3 + 2];
        linePositionsBuffer[lineIndex * 6 + 3] = positionArray[j * 3];
        linePositionsBuffer[lineIndex * 6 + 4] = positionArray[j * 3 + 1];
        linePositionsBuffer[lineIndex * 6 + 5] = positionArray[j * 3 + 2];
        lineIndex++;
      }
    }
  }

  return lineIndex;
}