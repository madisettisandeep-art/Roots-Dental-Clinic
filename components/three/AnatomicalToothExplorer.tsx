'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Shield, Activity, Heart, Anchor, Waves, Eye, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface HotspotInfo {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  clinicalSignificance: string;
  recommendedCare: string;
  relatedTreatment: string;
  treatmentSlug: string;
  color: string;
  cameraPos: [number, number, number];
  icon: React.ComponentType<{ className?: string }>;
}

const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'enamel',
    name: 'ENAMEL',
    category: 'Outer Shield',
    shortDesc: 'The hardest substance in the human body, protecting against wear and decay.',
    fullDesc: 'Dental enamel is a highly mineralized crystalline structure composed of 96% hydroxyapatite. It forms the resilient outer shell of the tooth, defending against acidic erosion, thermal changes, and mechanical chewing forces.',
    clinicalSignificance: 'Once eroded or damaged by caries, enamel cannot naturally regenerate. Prompt remineralization or composite restoration preserves the underlying vital layers.',
    recommendedCare: 'Fluoride treatments, gentle non-abrasive brushing, and routine 6-month prophylaxis scaling.',
    relatedTreatment: 'Teeth Cleaning & Scaling',
    treatmentSlug: 'teeth-cleaning',
    color: '#00B4D8',
    cameraPos: [0, 1.2, 5.0],
    icon: Shield,
  },
  {
    id: 'dentin',
    name: 'DENTIN',
    category: 'Structural Bulk',
    shortDesc: 'Living calcified tissue containing thousands of microscopic nerve tubules.',
    fullDesc: 'Dentin constitutes the bulk of the tooth structure. It contains microscopic fluid-filled tubules (dentinal tubules) that directly transmit hot, cold, and pressure sensations inward to the pulp nerves.',
    clinicalSignificance: 'When enamel wears down or gums recede, exposed dentinal tubules cause sharp temperature sensitivity and allow bacteria rapid pathways to the pulp.',
    recommendedCare: 'Desensitizing therapies, prompt cavity restorations, and gentle gingival care.',
    relatedTreatment: 'Teeth Whitening & Sensitivity Care',
    treatmentSlug: 'teeth-whitening',
    color: '#38BDF8',
    cameraPos: [0, 0.5, 5.2],
    icon: Activity,
  },
  {
    id: 'pulp',
    name: 'DENTAL PULP',
    category: 'Vital Core',
    shortDesc: 'The nerve and blood supply center giving vitality to the natural tooth.',
    fullDesc: 'The pulp chamber and root canals contain living blood vessels, connective tissues, and sensory nerves. It provides nutrition during tooth development and signals pain when irritated or infected.',
    clinicalSignificance: 'Deep cavities or dental trauma can introduce bacteria into the pulp, resulting in severe throbbing toothache and abscess. Root Canal Treatment (RCT) eliminates the infection while saving the natural tooth shell.',
    recommendedCare: 'Microscopic Root Canal Therapy, digital rotary shaping, and biocompatible sealing.',
    relatedTreatment: 'Root Canal Treatment',
    treatmentSlug: 'root-canal',
    color: '#F43F5E',
    cameraPos: [0, 0.4, 4.5],
    icon: Heart,
  },
  {
    id: 'root',
    name: 'ROOT CANAL & APEX',
    category: 'Anatomical Anchor',
    shortDesc: 'Bifurcated anatomical roots anchored deep into the alveolar jawbone.',
    fullDesc: 'The roots extend below the gumline into the jawbone, secured by thousands of microscopic periodontal ligament fibers. The apical foramen at the tip allows blood vessels and nerves to enter the tooth.',
    clinicalSignificance: 'Infections that reach the root apex can cause periapical bone lesions. When a root is non-restorable, modern titanium Dental Implants securely replicate this root anchor.',
    recommendedCare: 'Digital apical radiography, precision endodontics, or titanium implant replacement.',
    relatedTreatment: 'Dental Implants & RCT',
    treatmentSlug: 'dental-implants',
    color: '#10B981',
    cameraPos: [0, -1.0, 5.0],
    icon: Anchor,
  },
  {
    id: 'gum',
    name: 'PERIODONTAL GUM',
    category: 'Protective Seal',
    shortDesc: 'Mucosal tissue and bone foundation maintaining tooth stability.',
    fullDesc: 'The gingiva (gums) and alveolar bone form the vital foundation holding teeth firmly in place. Healthy gums form a tight biological seal around the neck of each tooth to keep oral bacteria away from the bone.',
    clinicalSignificance: 'Chronic plaque accumulation triggers gingivitis and periodontitis, leading to bone resorption and loose teeth if left unmanaged.',
    recommendedCare: 'Deep ultrasonic scaling, root planing, and daily interdental flossing.',
    relatedTreatment: 'Teeth Cleaning & Gum Care',
    treatmentSlug: 'teeth-cleaning',
    color: '#8B5CF6',
    cameraPos: [0, -0.2, 5.5],
    icon: Waves,
  },
];

export default function AnatomicalToothExplorer() {
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotInfo>(HOTSPOTS[0]);
  const [viewMode, setViewMode] = useState<'natural' | 'cross-section' | 'wireframe'>('cross-section');
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const crownMeshRef = useRef<THREE.Mesh | null>(null);
  const pulpMeshRef = useRef<THREE.Mesh | null>(null);
  const rootsRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamY = useRef(0.5);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 6.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    currentMount.appendChild(renderer.domElement);

    const toothGroup = new THREE.Group();
    scene.add(toothGroup);

    // 1. Crown Mesh
    const crownGeometry = new THREE.CylinderGeometry(1.3, 1.0, 1.7, 32, 16);
    const crownMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.15,
      transmission: viewMode === 'cross-section' ? 0.65 : viewMode === 'wireframe' ? 0.9 : 0.2,
      thickness: 1.5,
      ior: 1.54,
      wireframe: viewMode === 'wireframe',
      specularColor: 0x90e0ef,
      specularIntensity: 1.0,
      clearcoat: 0.8,
    });
    const crownMesh = new THREE.Mesh(crownGeometry, crownMaterial);
    crownMesh.position.y = 0.85;
    crownMeshRef.current = crownMesh;
    toothGroup.add(crownMesh);

    // 2. Pulp Mesh
    const pulpGeometry = new THREE.CylinderGeometry(0.45, 0.25, 1.2, 16);
    const pulpMaterial = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      wireframe: viewMode === 'wireframe',
    });
    const pulpMesh = new THREE.Mesh(pulpGeometry, pulpMaterial);
    pulpMesh.position.y = 0.75;
    pulpMeshRef.current = pulpMesh;
    toothGroup.add(pulpMesh);

    // 3. Roots Group
    const rootsGroup = new THREE.Group();
    rootsRef.current = rootsGroup;

    const createRoot = (xOffset: number, zRot: number) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xOffset * 0.4, 0, 0),
        new THREE.Vector3(xOffset * 0.7, -0.9, 0),
        new THREE.Vector3(xOffset * 0.5, -2.1, 0),
      ]);
      const rootGeo = new THREE.TubeGeometry(curve, 32, 0.38, 16, false);
      const rootMat = new THREE.MeshStandardMaterial({
        color: 0xecfdf5,
        roughness: 0.3,
        wireframe: viewMode === 'wireframe',
      });
      const mesh = new THREE.Mesh(rootGeo, rootMat);
      mesh.rotation.z = zRot;
      return mesh;
    };

    rootsGroup.add(createRoot(-0.55, 0.08));
    rootsGroup.add(createRoot(0.55, -0.08));
    toothGroup.add(rootsGroup);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xe0fbfc, 2.5);
    dirLight.position.set(4, 5, 5);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x00b4d8, 3.5);
    rimLight.position.set(-5, 0, -3);
    scene.add(rimLight);

    // Animation
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      toothGroup.rotation.y += 0.005;

      // Smooth camera position
      if (cameraRef.current) {
        cameraRef.current.position.y += (targetCamY.current - cameraRef.current.position.y) * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [viewMode]);

  // Handle hotspot change
  const handleSelectHotspot = (hotspot: HotspotInfo) => {
    setSelectedHotspot(hotspot);
    targetCamY.current = hotspot.cameraPos[1];
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden" id="explore-3d">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-medical-blue/20 via-aqua-500/15 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-aqua-500/10 border border-aqua-400/30 text-aqua-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-aqua-400" />
            Interactive 3D Technology
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            Explore Better Dental Care
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Understand how advanced modern dentistry protects every anatomical layer of your natural tooth. Rotate the 3D model and tap hotspots to explore clinical insights.
          </p>
        </div>

        {/* Interactive Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hotspot Selector Buttons */}
          <div className="lg:col-span-3 space-y-3 order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-wider text-aqua-400 block mb-2">
              Anatomical Hotspots
            </span>
            {HOTSPOTS.map((hotspot) => {
              const Icon = hotspot.icon;
              const isSelected = selectedHotspot.id === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => handleSelectHotspot(hotspot)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-navy-800/90 border-aqua-400 shadow-glow-cyan translate-x-1'
                      : 'bg-navy-900/50 border-white/10 hover:border-white/20 hover:bg-navy-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-aqua-500 text-navy-950 font-bold' : 'bg-navy-700/60 text-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">{hotspot.name}</h4>
                      <p className="text-xs text-slate-400">{hotspot.category}</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-aqua-300 translate-x-1' : 'text-slate-500'
                    }`}
                  />
                </button>
              );
            })}

            {/* Mode Controls */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                3D Diagnostic View
              </span>
              <div className="grid grid-cols-3 gap-1 p-1 bg-navy-950/80 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setViewMode('cross-section')}
                  className={`py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'cross-section' ? 'bg-aqua-500 text-navy-950 font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Layered
                </button>
                <button
                  onClick={() => setViewMode('natural')}
                  className={`py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'natural' ? 'bg-aqua-500 text-navy-950 font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Enamel
                </button>
                <button
                  onClick={() => setViewMode('wireframe')}
                  className={`py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'wireframe' ? 'bg-aqua-500 text-navy-950 font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Digital
                </button>
              </div>
            </div>
          </div>

          {/* Center Column: 3D Viewport */}
          <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-full h-[420px] sm:h-[480px] rounded-3xl bg-gradient-to-b from-navy-800/40 via-navy-900/60 to-navy-950/80 border border-white/10 backdrop-blur-xl flex items-center justify-center p-4 shadow-2xl overflow-hidden">
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Live Overlay Micro-Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-navy-950/80 border border-aqua-400/40 text-aqua-300 text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ACTIVE FOCUS: {selectedHotspot.name}
              </div>

              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-navy-950/80 border border-white/10 text-slate-400 text-xs flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Interactive 3D Engine
              </div>
            </div>
          </div>

          {/* Right Column: Educational Detail Card */}
          <div className="lg:col-span-4 order-3">
            <div className="p-6 sm:p-8 rounded-3xl bg-navy-800/60 border border-white/15 backdrop-blur-2xl shadow-glass relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 pointer-events-none"
                style={{ backgroundColor: selectedHotspot.color }}
              />

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aqua-400 mb-2">
                <span>Clinical Anatomy</span>
                <span>•</span>
                <span>{selectedHotspot.category}</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display flex items-center gap-2">
                {selectedHotspot.name}
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {selectedHotspot.fullDesc}
              </p>

              <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Clinical Significance
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedHotspot.clinicalSignificance}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Specialist Approach
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedHotspot.recommendedCare}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-aqua-400/30 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Related Specialist Care</span>
                    <span className="text-xs font-bold text-white">{selectedHotspot.relatedTreatment}</span>
                  </div>
                  <a
                    href={`/treatments/${selectedHotspot.treatmentSlug}`}
                    className="px-3 py-1.5 rounded-xl bg-aqua-500 hover:bg-aqua-400 text-navy-950 text-xs font-bold transition-colors"
                  >
                    View
                  </a>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`#book`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { treatmentSlug: selectedHotspot.treatmentSlug } }));
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-semibold text-xs tracking-wide uppercase text-center transition-all shadow-glow-cyan"
                >
                  Book Consultation
                </a>
                <a
                  href={getWhatsAppLink({ treatmentName: selectedHotspot.relatedTreatment })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide uppercase text-center transition-all flex items-center justify-center gap-1.5"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
