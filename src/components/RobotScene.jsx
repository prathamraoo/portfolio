
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

function GreenGlow() {
  return (
    <mesh position={[0, 0.15, -1.8]} renderOrder={-1}>
      <planeGeometry args={[4.8, 4.8]} />

      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          glowColor: {
            value: new THREE.Color('#9cff35'),
          },
          opacity: {
            value: 0.12,
          },
        }}
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;

            gl_Position = projectionMatrix
              * modelViewMatrix
              * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform vec3 glowColor;
          uniform float opacity;

          void main() {
            float dist = distance(vUv, vec2(0.5));
            float glow = exp(-dist * dist * 22.0);
            float fade = smoothstep(0.5, 0.08, dist);

            gl_FragColor = vec4(
              glowColor,
              glow * fade * opacity
            );
          }
        `}
      />
    </mesh>
  );
}

function RobotModel() {
  const { scene, animations } = useGLTF('/models/robot-arm.glb');

  const model = useMemo(() => {
    const object = clone(scene);

    const bounds = new THREE.Box3().setFromObject(object);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());

    const largestSide = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3.1 / largestSide;

    return {
      object,
      scale,
      position: [
        -center.x * scale,
        -bounds.min.y * scale - 1.2,
        -center.z * scale,
      ],
    };
  }, [scene]);

  const robotRef = useRef(null);

  const movement = useRef({
    timer: 2,
    targetX: 0,
    targetZ: 0,
    targetY: 0,
    currentY: 0,
  });

  const { actions, names } = useAnimations(animations, model.object);

  useEffect(() => {
    const action = actions['Root|RootAction'];

    if (!action) {
      console.warn('Robot animation clip not found:', names);
      return;
    }

    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.fadeIn(0.6);
    action.play();

    return () => {
      action.fadeOut(0.3);
      action.stop();
    };
  }, [actions, names]);

  useFrame((state, delta) => {
    if (!robotRef.current) return;

    const robot = robotRef.current;
    const motion = movement.current;

    motion.timer -= delta;

    if (motion.timer <= 0) {
      motion.timer = THREE.MathUtils.randFloat(2.5, 5);
      motion.targetX = THREE.MathUtils.randFloat(-0.06, 0.06);
      motion.targetZ = THREE.MathUtils.randFloat(-0.08, 0.08);
      motion.targetY = THREE.MathUtils.randFloat(-0.15, 0.15);
    }

    robot.rotation.x = THREE.MathUtils.damp(
      robot.rotation.x,
      motion.targetX,
      1.2,
      delta
    );

    robot.rotation.z = THREE.MathUtils.damp(
      robot.rotation.z,
      motion.targetZ,
      1.2,
      delta
    );

    motion.currentY = THREE.MathUtils.damp(
      motion.currentY,
      motion.targetY,
      1.2,
      delta
    );

    robot.rotation.y += delta * 0.12;
    robot.rotation.y += motion.currentY * delta * 0.12;

    robot.position.y =
      Math.sin(state.clock.elapsedTime * 1.1) * 0.025;
  });

  return (
    <group ref={robotRef}>
      <group rotation={[0, -0.45, 0]}>
        <group scale={model.scale} position={model.position}>
          <primitive object={model.object} />
        </group>
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#0b0e0c']} />

      <ambientLight intensity={0.28} />

      <hemisphereLight
        args={['#e7f0e9', '#101510', 0.8]}
      />

      <spotLight
        position={[3.5, 5, 4]}
        intensity={100}
        angle={0.48}
        penumbra={0.85}
        distance={16}
        color="#f1f5f2"
      />

      <spotLight
        position={[-4, 3.2, -2.5]}
        intensity={75}
        angle={0.6}
        penumbra={0.8}
        distance={14}
        color="#c8dfd2"
      />

      <pointLight
        position={[-2.4, 0.4, 1.8]}
        intensity={14}
        distance={6}
        decay={2}
        color="#a8ff35"
      />

      <pointLight
        position={[2.8, 1.4, -2]}
        intensity={10}
        distance={7}
        decay={2}
        color="#7fa78b"
      />

      <Suspense fallback={null}>
        <Environment
          preset="studio"
          environmentIntensity={1.15}
        />

        <GreenGlow />

        <RobotModel />

        <ContactShadows
          position={[0, -1.18, 0]}
          opacity={0.55}
          scale={4.5}
          blur={2.8}
          far={3.5}
          resolution={512}
        />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        autoRotate={false}
        minPolarAngle={1.05}
        maxPolarAngle={2.05}
      />
    </>
  );
}

export default function RobotScene() {
  return (
    <div
      className="robot-canvas"
      role="img"
      aria-label="Cinematic animated industrial robotic arm"
    >
      <Canvas
        camera={{ position: [0, 0.35, 5.8], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <Scene />
      </Canvas>

      <div className="scene-crosshair" aria-hidden="true">
        +
      </div>

      <div
        style={{
          position: 'absolute',
          right: 12,
          bottom: 10,
          fontSize: 9,
          color: '#aab7ad',
          letterSpacing: '0.08em',
        }}
      >
        INDUSTRIAL ROBOT · 3D
      </div>
    </div>
  );
}
