
import { useLayoutEffect, useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

import * as THREE from "three";
import { gsap } from "gsap";

/* ================= GALLERY IMAGES ================= */

const images = [
  "/images/2.png",
  "/images/2.png",
  "/images/2.png",
  "/images/2.png",
  "/images/2.png",
];

/* ================= GALLERY SETTINGS ================= */

const SETTINGS = {
  rotationSpeed: 24,

  radiusX: 6.2,
  radiusZ: 3.5,

  imageHeight: 3.5,

  imageTilt: -0.18,

  verticalSpread: 0.65,
};

/* ================= IMAGE CARD ================= */

function ImageCard({ image, index, total, ringRef }) {
  const materialRef = useRef(null);

  const texture = useTexture(image);

  const angle = (index / total) * Math.PI * 2;

  /* ================= ORIGINAL IMAGE RATIO ================= */

  const imageWidth = texture.image?.width || 1;
  const imageHeight = texture.image?.height || 1;

  const aspectRatio = imageWidth / imageHeight;

  const cardHeight = SETTINGS.imageHeight;
  const cardWidth = cardHeight * aspectRatio;

  useLayoutEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  /* ================= DEPTH TRANSPARENCY ================= */

  useFrame(() => {
    if (!ringRef.current || !materialRef.current) return;

    const currentAngle = angle + ringRef.current.rotation.y;

    const depth = Math.cos(currentAngle);

    const visibility = THREE.MathUtils.smoothstep(
      depth,
      -0.55,
      0.8
    );

    materialRef.current.opacity = THREE.MathUtils.lerp(
      0.015,
      1,
      visibility
    );
  });

  return (
    <group
      position={[
        Math.sin(angle) * SETTINGS.radiusX,

        Math.sin(angle * 2) * SETTINGS.verticalSpread,

        Math.cos(angle) * SETTINGS.radiusZ,
      ]}
      rotation={[
        0,
        angle,
        SETTINGS.imageTilt,
      ]}
    >
      {/* IMAGE ONLY */}

      <mesh>
        <planeGeometry args={[cardWidth, cardHeight]} />

        <meshBasicMaterial
          ref={materialRef}
          map={texture}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

    </group>
  );
}

/* ================= ROTATING ORBIT ================= */

function OrbitRing() {
  const ringRef = useRef(null);

  useLayoutEffect(() => {
    const ring = ringRef.current;

    if (!ring) return;

    const ctx = gsap.context(() => {

      // Initial perspective tilt
      ring.rotation.x = 0.07;

      // Continuous 3D orbit
      gsap.to(ring.rotation, {
        y: Math.PI * 2,
        duration: SETTINGS.rotationSpeed,
        ease: "none",
        repeat: -1,
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={ringRef}>
      {images.map((image, index) => (
        <ImageCard
          key={index}
          image={image}
          index={index}
          total={images.length}
          ringRef={ringRef}
        />
      ))}
    </group>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function OrbitImage() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-hidden">

      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        }}
        style={{
          background: "transparent",
        }}
      >
        <OrbitRing />
      </Canvas>

    </div>
  );
}
