import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, applyProps, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Float,
  useGLTF,
  BakeShadows,
  ContactShadows,
} from "@react-three/drei";
import type { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import { LayerMaterial, Color, Depth } from "lamina";

/**
 * Fix "Property 'nodes' does not exist on type 'GLTF'.":
 *
 * @see https://spectrum.chat/react-three-fiber/general/gltfloader-and-typescript~e6d52e5b-eef3-45a7-893d-4c873aa1eea7?m=MTYyNDQ2MDUzNDc4Ng==
 */
declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
  }
}

/*
 * 911.glb
 * Author: Karol Miklas https://sketchfab.com/karolmiklas
 * Sketchfab: https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf
 */
export const PorscheModel = () => {
  return (
    <Canvas
      className="live-env-maps"
      shadows
      dpr={[1, 2]}
      camera={{ position: [-10, 0, 15], fov: 30 }}
    >
      <Porsche
        scale={1.6}
        position={[-0.5, -0.18, 0]}
        rotation={[0, Math.PI / 5, 0]}
      />
      <spotLight
        position={[0, 15, 0]}
        angle={0.3}
        penumbra={1}
        castShadow
        intensity={2}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.2} />
      <ContactShadows
        resolution={1024}
        frames={1}
        position={[0, -1.16, 0]}
        scale={10}
        blur={3}
        opacity={1}
        far={10}
      />

      {/* Renders contents "live" into a HDRI environment (scene.environment). */}
      <Environment frames={Infinity} resolution={256}>
        {/* Ceiling */}
        <Lightformer
          intensity={0.75}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
        <MovingSpots />
        {/* Sides */}
        <Lightformer
          intensity={4}
          rotation-y={Math.PI / 2}
          position={[-5, 1, -1]}
          scale={[20, 0.1, 1]}
        />
        <Lightformer
          rotation-y={Math.PI / 2}
          position={[-5, -1, -1]}
          scale={[20, 0.5, 1]}
        />
        <Lightformer
          rotation-y={-Math.PI / 2}
          position={[10, 1, 0]}
          scale={[20, 1, 1]}
        />
        {/* Accent (red) */}
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer
            form="ring"
            color="red"
            intensity={1}
            scale={10}
            position={[-15, 4, -18]}
            target={[0, 0, 0]}
          />
        </Float>
        {/* Background */}
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={THREE.BackSide}>
            <Color color="#444" alpha={1} mode="normal" />
            <Depth
              colorA="blue"
              colorB="black"
              alpha={0.5}
              mode="normal"
              near={0}
              far={300}
              origin={[100, 100, 100]}
            />
          </LayerMaterial>
        </mesh>
      </Environment>

      <BakeShadows />
      <CameraRig />
    </Canvas>
  );
};

function Porsche(props: any) {
  const { scene, nodes, materials } = useGLTF("/911-transformed.glb");
  useMemo(() => {
    Object.values(nodes).forEach(
      (node) => node.isMesh && (node.receiveShadow = node.castShadow = true)
    );
    // @ts-ignore
    applyProps(materials.rubber, {
      color: "#222",
      roughness: 0.6,
      roughnessMap: null,
      normalScale: [4, 4],
    });
    // @ts-ignore
    applyProps(materials.window, {
      color: "black",
      roughness: 0,
      clearcoat: 0.1,
    });
    // @ts-ignore
    applyProps(materials.coat, {
      envMapIntensity: 4,
      roughness: 0.5,
      metalness: 1,
    });
    // @ts-ignore
    applyProps(materials.paint, {
      roughness: 0.5,
      metalness: 0.8,
      color: "#555",
      envMapIntensity: 2,
    });
  }, [nodes, materials]);
  return <primitive object={scene} {...props} />;
}

function CameraRig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.lerp(
      v.set(Math.sin(t / 5), 0, 10 + Math.cos(t / 5)),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function MovingSpots({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef<any | null>(null);
  useFrame(
    (state, delta) =>
      (group.current.position.z += delta * 15) > 60 &&
      (group.current.position.z = -60)
  );
  return (
    <group rotation={[0, 0.5, 0]}>
      <group ref={group}>
        {positions.map((x, i) => (
          <Lightformer
            key={i}
            form="circle"
            intensity={4}
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, 4, i * 4]}
            scale={[3, 1, 1]}
          />
        ))}
      </group>
    </group>
  );
}
