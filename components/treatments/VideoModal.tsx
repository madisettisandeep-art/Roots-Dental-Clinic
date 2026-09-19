'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Calendar, Volume2, ShieldCheck, CheckCircle2, Play } from 'lucide-react';

interface VideoModalData {
  videoSrc?: string;
  title?: string;
  treatmentSlug?: string;
  poster?: string;
}

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoData, setVideoData] = useState<VideoModalData>({
    videoSrc: '/videos/root-canal-treatment.mp4',
    poster: '/videos/root-canal-poster.jpg',
    title: 'Root Canal Treatment (3D Clinical Animation)',
    treatmentSlug: 'root-canal',
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleOpen = (e: CustomEvent<VideoModalData>) => {
      if (e.detail) {
        setVideoData({
          videoSrc: e.detail.videoSrc || '/videos/root-canal-treatment.mp4',
          poster: e.detail.poster || '/videos/root-canal-poster.jpg',
          title: e.detail.title || 'Root Canal Treatment (3D Clinical Animation)',
          treatmentSlug: e.detail.treatmentSlug || 'root-canal',
        });
      }
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('open-video-modal' as any, handleOpen);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-video-modal' as any, handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
      // Modern browsers guarantee playback when muted is set initially
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Playback deferred until direct interaction:', err);
            setIsPlaying(false);
          });
      }
    } else {
      setIsPlaying(false);
    }
  }, [isOpen, videoData.videoSrc]);

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.muted = false;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleBookNow = () => {
    closeModal();
    window.dispatchEvent(
      new CustomEvent('open-booking-modal', {
        detail: { treatmentSlug: videoData.treatmentSlug || 'root-canal' },
      })
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={closeModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl rounded-3xl bg-navy-900 border border-aqua-400/30 shadow-2xl shadow-cyan-950/80 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-navy-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-aqua-500/20 text-aqua-400 border border-aqua-400/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-display leading-tight">
                {videoData.title}
              </h3>
              <p className="text-[11px] text-aqua-400/80 hidden sm:block">
                Roots Dental Clinic • Advanced Rotary Endodontics Video Guide
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 16:9 Video Player */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center group">
          <video
            ref={videoRef}
            poster={videoData.poster}
            controls
            playsInline
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-contain"
          >
            <source src={videoData.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Big Center Play Button Overlay when paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-navy-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:bg-navy-950/30 z-20"
            >
              <button
                type="button"
                className="w-20 h-20 rounded-full bg-gradient-to-r from-medical-blue via-cyan-500 to-aqua-400 p-0.5 shadow-glow-cyan transition-transform duration-300 hover:scale-110 flex items-center justify-center"
                aria-label="Play Video"
              >
                <div className="w-full h-full rounded-full bg-navy-950/70 flex items-center justify-center text-white pl-1">
                  <Play className="w-8 h-8 fill-white text-white" />
                </div>
              </button>
              <span className="text-xs font-bold text-white uppercase tracking-wider bg-navy-950/90 px-4 py-1.5 rounded-full border border-aqua-400/30 backdrop-blur-md shadow-md">
                Click To Play With Sound
              </span>
            </div>
          )}

          {/* Floating Roots Dental Clinic Watermark */}
          <div className="absolute top-3 right-3 pointer-events-none z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-950/85 border border-aqua-400/40 backdrop-blur-sm shadow-md">
            <span className="w-2 h-2 rounded-full bg-aqua-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider text-slate-100 uppercase">Roots Dental Clinic</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-navy-950/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-aqua-400 shrink-0" />
            <span className="text-slate-300 text-[11px] sm:text-xs">
              Microscopic precision & single-sitting root canal options available at Kazipet & Hanamkonda.
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleBookNow}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-medical-blue via-cyan-500 to-aqua-400 hover:from-medical-blue/90 hover:to-aqua-300 text-white font-bold tracking-wider uppercase transition-all shadow-glow-cyan flex items-center justify-center gap-2 text-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book RCT Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
