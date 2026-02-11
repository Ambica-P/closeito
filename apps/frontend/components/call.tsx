"use client";

import { Circle, ShieldCheck, TrendingUp, Activity } from "lucide-react";
import {
    motion,
    useTransform,
    MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";

interface CallSimulationProps {
    scrollYProgress: MotionValue<number>;
}

export default function CallSimulation({ scrollYProgress }: CallSimulationProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Map scroll progress to buying intent (0 → 100)
    const intent = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.65,1], [0, 20, 40, 65,100]);

    const intentWidth = useTransform(intent, (v) => `${v}%`);
    const intentLabel = useTransform(intent, (v) => `${Math.round(v)}%`);

    // Sync video playback with scroll
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const unsubscribe = scrollYProgress.on("change", (progress) => {
            if (video.duration) {
                // Map scroll progress to video time
                const targetTime = progress * video.duration;
                
                // Only update if difference is significant (prevents jitter)
                if (Math.abs(video.currentTime - targetTime) > 0.1) {
                    video.currentTime = targetTime;
                }
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    // Determine emotion label based on scroll progress (synced with video timestamps ~1.7s intervals)
    const emotionLabel = useTransform(scrollYProgress, (progress) => {
        if (progress < 0.34) return "CONFUSED";      // 0 - 1.7s
        if (progress < 0.68) return "INTERESTED";    // 1.7s - 3.4s
        return "ENGAGED";                             // 3.4s - 5s
    });

    return (
        <div className="rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 bg-white/5">
                <span className="text-xs font-semibold text-white">LIVE CALL</span>
                <Circle fill="#DC143C" color="#DC143C" />
            </div>

            {/* Video */}
            <div className="relative aspect-video bg-black">
                <video
                    ref={videoRef}
                    src="/untitled.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    aria-label="Live call simulation"
                />

                <div className="absolute top-3 right-3 rounded-full px-3 py-1 bg-white/5 backdrop-blur-xl border border-white/20">
                    <motion.span className="text-xs font-semibold text-white">
                        {/* @ts-ignore */}
                        {emotionLabel}
                    </motion.span>
                </div>
            </div>

            {/* Buying Intent */}
            <div className="px-4 py-4 border-t border-white/20 bg-white/5">
                <div className="flex justify-between text-xs text-neutral-400 mb-2">
                    <span>Buying Intent</span>
                    <motion.span className="text-white font-mono font-semibold">
                        {intentLabel}
                    </motion.span>
                </div>

                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                        style={{ width: intentWidth }}
                        className="h-full bg-white transition-all"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 px-4 py-4 bg-black">
                {[
                    { label: "Latency", value: "0.3s", icon: Activity },
                    { label: "Win Rate", value: "94%", icon: TrendingUp },
                    { label: "Shielding", value: "Active", icon: ShieldCheck },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 p-3 text-center shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                    >
                        <stat.icon className="w-4 h-4 text-white mx-auto mb-1" />
                        <div className="text-white font-semibold">{stat.value}</div>
                        <div className="text-[10px] text-neutral-400 uppercase">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}