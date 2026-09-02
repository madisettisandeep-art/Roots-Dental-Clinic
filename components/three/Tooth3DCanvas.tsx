'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Tooth3DCanvasProps {
  className?: string;
  interactive?: boolean;
}

export default function Tooth3DCanvas({ className = '', interactive = true }: Tooth3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // Three.js Scene Setup
    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // Group for tooth assembly
    const toothGroup = new THREE.Group();
    scene.add(toothGroup);

    // 1. Crown Geometry (Organic sculpted molar crown with 4 cusps)
    const crownGeometry = new THREE.CylinderGeometry(1.4, 1.1, 1.8, 32, 16);
    // Deform vertices slightly to give natural dental anatomy
    const pos = crownGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      if (y > 0.5) {
        // Cusp variations
        const angle = Math.atan2(z, x);
        const cuspMod = Math.sin(angle * 4) * 0.15;
        pos.setY(i, y + cuspMod);
      }
    }
    crownGeometry.computeVertexNormals();

    // Translucent Enamel Material
    const crownMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      emissive: 0x002b49,
      emissiveIntensity: 0.15,
      roughness: 0.15,
      metalness: 0.05,
      transmission: 0.35, // Translucency
      thickness: 1.2,
      ior: 1.54, // Hydroxyapatite index of refraction
      specularColor: 0x90e0ef,
      specularIntensity: 1.0,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });

    const crownMesh = new THREE.Mesh(crownGeometry, crownMaterial);
    crownMesh.position.y = 0.9;
    toothGroup.add(crownMesh);

    // 2. Pulp Core Glow (Internal vital chamber)
    const pulpGeometry = new THREE.CylinderGeometry(0.5, 0.3, 1.2, 16);
    const pulpMaterial = new THREE.MeshStandardMaterial({
      color: 0x00b4d8,
      emissive: 0x00b4d8,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.6,
    });
    const pulpMesh = new THREE.Mesh(pulpGeometry, pulpMaterial);
    pulpMesh.position.y = 0.8;
    toothGroup.add(pulpMesh);

    // 3. Bifurcated Roots (Root 1 and Root 2)
    const createRootMesh = (xOffset: number, zAngle: number) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xOffset * 0.5, 0, 0),
        new THREE.Vector3(xOffset * 0.8, -1.0, 0),
        new THREE.Vector3(xOffset * 0.6, -2.2, 0),
      ]);
      const rootGeo = new THREE.TubeGeometry(curve, 32, 0.4, 16, false);
      const rootMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.35,
        metalness: 0.1,
      });
      const rootMesh = new THREE.Mesh(rootGeo, rootMat);
      rootMesh.rotation.z = zAngle;
      return rootMesh;
    };

    const rootLeft = createRootMesh(-0.6, 0.08);
    const rootRight = createRootMesh(0.6, -0.08);
    toothGroup.add(rootLeft);
    toothGroup.add(rootRight);

    // 4. Subtle Orbital Ring & Diagnostic Halo
    const ringGeo = new THREE.TorusGeometry(2.4, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    toothGroup.add(ringMesh);

    // 5. Floating Medical Particles
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x48cae4,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 6. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe0fbfc, 2.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00b4d8, 3.0);
    cyanRimLight.position.set(-6, 2, -4);
    scene.add(cyanRimLight);

    const bottomGlow = new THREE.PointLight(0x0077b6, 2.5, 10);
    bottomGlow.position.set(0, -3, 2);
    scene.add(bottomGlow);

    // Mouse Parallax Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = mouseX * 0.8;
      targetRotationX = -mouseY * 0.4;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous slow orbital rotation
      toothGroup.rotation.y += 0.008;

      // Subtle breathing float
      toothGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // Interactive mouse smoothing
      toothGroup.rotation.y += (targetRotationY - toothGroup.rotation.y * 0.05) * 0.05;
      toothGroup.rotation.x += (targetRotationX - toothGroup.rotation.x) * 0.05;

      // Rotate particle cloud and halo ring
      particleSystem.rotation.y = elapsedTime * 0.03;
      ringMesh.rotation.z = elapsedTime * 0.1;

      // Pulse internal pulp glow
      pulpMaterial.opacity = 0.5 + Math.sin(elapsedTime * 3) * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="relative w-72 h-72 rounded-3xl bg-gradient-to-b from-navy-800/80 to-navy-950/90 border border-aqua-400/30 p-8 flex flex-col items-center justify-center text-center shadow-glow-cyan">
          <div className="w-24 h-24 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mb-4 animate-pulse">
            <svg className="w-12 h-12 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C7.5 2 4 5.5 4 10c0 4 2 8 4 12 1 0 2-3 4-3s3 3 4 3c2-4 4-8 4-12 0-4.5-3.5-8-8-8z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg">Precision Dental Care</span>
          <span className="text-slate-400 text-xs mt-1">Advanced Clinical Technology</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label="Interactive 3D representation of an anatomical human tooth demonstrating precision dental care"
    />
  );
}
