'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface RootCanal3DVideoSectionProps {
  treatmentName?: string;
  showBookingAction?: boolean;
}

export default function RootCanal3DVideoSection({
  treatmentName = 'Root Canal Treatment',
  showBookingAction = true,
}: RootCanal3DVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(85);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const whatsAppLink = getWhatsAppLink({ treatmentName });

  const videoSteps = [
    {
      step: '01',
      time: 0,
      title: 'Decay Removal & Access',
      desc: 'Gentle local anesthesia is administered, decay is cleared, and a microscopic access opening is made.',
    },
    {
      step: '02',
      time: 18,
      title: 'Pulp Removal & Disinfection',
      desc: 'Infected pulpal tissues and inflamed nerve fibers are carefully removed from the tooth chamber.',
    },
    {
      step: '03',
      time: 38,
      title: 'Rotary Cleaning & Shaping',
      desc: 'Nickel-titanium micro-rotary files and digital apex locators thoroughly shape and sterilize each canal.',
    },
    {
      step: '04',
      time: 58,
      title: 'Biocompatible Sealing',
      desc: 'The sterile canals are hermetically sealed with biocompatible gutta-percha to prevent reinfection.',
    },
    {
      step: '05',
      time: 74,
      title: 'Crown Restoration',
      desc: 'A permanent custom dental crown is placed, restoring full biting strength and your natural smile.',
    },
  ];

  // Sync active step with video time
  useEffect(() => {
    let currentIdx = 0;
    for (let i = videoSteps.length - 1; i >= 0; i--) {
      if (currentTime >= videoSteps[i].time) {
        currentIdx = i;
        break;
      }
    }
    setActiveStepIndex(currentIdx);
  }, [currentTime]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = fraction * (videoRef.current.duration || duration);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const jumpToStep = (timeInSec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = timeInSec;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleOpenBooking = () => {
    window.dispatchEvent(
      new CustomEvent('open-booking-modal', { detail: { treatmentSlug: 'root-canal' } })
    );
  };

  return (
    <section id="3d-video" className="relative py-16 sm:py-20 bg-navy-950 text-white overflow-hidden scroll-mt-24">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-medical-blue/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/90 border border-aqua-400/40 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-glow-cyan">
            <Sparkles className="w-3.5 h-3.5 text-aqua-400" />
            <span>3D Procedural Demonstration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
            Watch How Root Canal Therapy Works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Understand the complete biological process of preserving your natural tooth with narration and step-by-step 3D medical animation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Theater Player */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative rounded-3xl overflow-hidden border-2 border-aqua-400/30 bg-navy-950 shadow-2xl shadow-cyan-950/50 group">
              {/* Aspect Ratio Container (16:9) */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  poster="/videos/root-canal-poster.jpg"
                  preload="auto"
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                >
                  <source src="/videos/root-canal-treatment.mp4" type="video/mp4" />
                  Your browser does not support the HTML5 video element.
                </video>

                {/* Big Center Play Button Overlay when paused */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-navy-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:bg-navy-950/30"
                  >
                    <button
                      type="button"
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-medical-blue via-cyan-500 to-aqua-400 p-0.5 shadow-glow-cyan transition-transform duration-300 hover:scale-110 flex items-center justify-center"
                      aria-label="Play Root Canal 3D Video"
                    >
                      <div className="w-full h-full rounded-full bg-navy-950/70 flex items-center justify-center text-white pl-1">
                        <Play className="w-8 h-8 fill-white text-white" />
                      </div>
                    </button>
                    <span className="text-xs font-bold text-white uppercase tracking-wider bg-navy-950/90 px-4 py-1.5 rounded-full border border-aqua-400/30 backdrop-blur-md shadow-md">
                      Play 3D Animation With Narration
                    </span>
                  </div>
                )}
              </div>

              {/* Custom Dental Clinic Video Controls Bar */}
              <div className="p-4 bg-gradient-to-t from-navy-950 via-navy-900 to-navy-900/95 border-t border-white/10 space-y-3">
                {/* Clickable Progress Scrub Bar */}
                <div
                  ref={progressRef}
                  onClick={handleSeek}
                  className="w-full h-2 rounded-full bg-navy-950 border border-white/10 cursor-pointer relative overflow-hidden group/bar"
                  title="Seek video position"
                >
                  <div
                    className="h-full bg-gradient-to-r from-medical-blue via-cyan-400 to-aqua-400 rounded-full transition-all duration-100"
                    style={{
                      width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                    }}
                  />
                </div>

                {/* Controls Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  {/* Left: Play/Pause, Replay, Time */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="w-9 h-9 rounded-xl bg-aqua-500 hover:bg-aqua-400 text-navy-950 flex items-center justify-center transition-colors font-bold"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-navy-950" />
                      ) : (
                        <Play className="w-4 h-4 fill-navy-950 pl-0.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={restartVideo}
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                      title="Restart Video"
                      aria-label="Restart Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <div className="font-mono text-slate-300 text-[11px]">
                      <span className="text-aqua-300 font-bold">{formatTime(currentTime)}</span>
                      <span className="text-slate-500 mx-1">/</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Center: Clinic Branding Badge */}
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/80 border border-aqua-400/30 text-aqua-300 text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-aqua-400" />
                    <span>Roots Super Speciality Dental Clinic</span>
                  </div>

                  {/* Right: Audio Volume Slider & Fullscreen */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="text-slate-300 hover:text-aqua-300 transition-colors p-1"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-rose-400" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 sm:w-20 h-1.5 accent-aqua-400 bg-navy-950 rounded-lg cursor-pointer"
                        aria-label="Adjust audio volume"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                      title="Fullscreen"
                      aria-label="Fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Quick-Jump Buttons */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              {videoSteps.map((s, idx) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => jumpToStep(s.time)}
                  className={`py-2 px-2 rounded-xl text-center border text-[11px] font-bold transition-all ${
                    activeStepIndex === idx
                      ? 'bg-aqua-500 text-navy-950 border-aqua-400 shadow-glow-cyan'
                      : 'bg-navy-900/70 border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span className="block text-[10px] opacity-75">Step {s.step}</span>
                  <span className="truncate block">{s.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Procedure Steps & Actions */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-navy-900/70 border border-white/10 backdrop-blur-xl shadow-glass">
              <h3 className="text-base font-bold font-display text-white mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-aqua-400" />
                <span>Animation Clinical Stages</span>
              </h3>

              <div className="space-y-3">
                {videoSteps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  return (
                    <div
                      key={step.step}
                      onClick={() => jumpToStep(step.time)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isActive
                          ? 'bg-navy-800/90 border-aqua-400 shadow-glow-cyan translate-x-1'
                          : 'bg-navy-950/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg font-mono font-bold text-[11px] flex items-center justify-center shrink-0 border ${
                          isActive
                            ? 'bg-aqua-500 text-navy-950 border-aqua-400 font-black'
                            : 'bg-navy-800 text-aqua-300 border-aqua-400/30'
                        }`}
                      >
                        {step.step}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{step.title}</span>
                          {isActive && <CheckCircle2 className="w-3 h-3 text-aqua-400" />}
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Booking CTA */}
            {showBookingAction && (
              <div className="p-5 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 border border-aqua-400/30 space-y-3 shadow-glass">
                <h4 className="text-xs font-bold uppercase tracking-wider text-aqua-300">
                  Experiencing Toothache or Sensitivity?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our chief endodontists use rotary instruments and digital apex locators for gentle, pain-free root canal treatment in Kazipet.
                </p>

                <div className="pt-1 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleOpenBooking}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-medical-blue via-cyan-600 to-aqua-500 hover:from-cyan-600 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-glow-cyan flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book RCT Consultation</span>
                  </button>

                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
