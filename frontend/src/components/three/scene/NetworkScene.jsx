import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  NODE_COUNT,
  CONNECTION_DISTANCE,
  generateNodes,
  updateNodePositions,
  buildConnections,
} from '../utils/networkGeometry';
import { useMousePosition } from '../hooks/useMousePosition';


function getCSSColor(varName, fallback) {
  if (typeof window === 'undefined') return fallback;
  const hsl = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return hsl ? `hsl(${hsl})` : fallback;
}
export default function NetworkScene({
  nodeCount = NODE_COUNT,
  connectionDistance = CONNECTION_DISTANCE,
  color = getCSSColor('--primary', '#ff6347'),
}) {
  const pointsGeoRef = useRef();
  const lineGeoRef = useRef();
  const mouse = useMousePosition();

  const { positions, velocities } = useMemo(() => generateNodes(nodeCount), [nodeCount]);

  const maxLines = nodeCount * 8;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  // Create geometries imperatively, once, outside JSX reconciliation
  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [linePositions]);

  // Cleanup on unmount — dispose geometries to avoid GPU leaks
  useEffect(() => {
    return () => {
      pointsGeometry.dispose();
      lineGeometry.dispose();
    };
  }, [pointsGeometry, lineGeometry]);

  useFrame((state) => {
    const posAttr = pointsGeometry.attributes.position;
    const arr = posAttr.array;

    updateNodePositions(arr, velocities);
    posAttr.needsUpdate = true;

    const lineAttr = lineGeometry.attributes.position;
    const lineCount = buildConnections(arr, nodeCount, lineAttr.array, maxLines, connectionDistance);
    lineAttr.needsUpdate = true;
    lineGeometry.setDrawRange(0, lineCount * 2);

    state.camera.position.x += (mouse.current.x * 0.6 - state.camera.position.x) * 0.02;
    state.camera.position.y += (mouse.current.y * 0.4 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <points geometry={pointsGeometry}>
        <pointsMaterial size={0.06} color={color} transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}