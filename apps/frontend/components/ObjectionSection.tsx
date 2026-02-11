"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { AlertCircle, CircleQuestionMark, CircleCheck } from "lucide-react";
import { useRef } from "react";
import CallSimulation from "./call";

interface ObjectionSectionProps {
    type: string;
    prompt: string;
    response: string;
    objectionData: Record<string, string | undefined>;
    progress: number;
    index: number;
    queryData: Array<string>;
    emotion: "skeptical" | "considering" | "interested";
}

export function ObjectionSection({
    type,
    response,
    objectionData,
    queryData,
    progress,
    prompt,
    emotion,
}: ObjectionSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Track scroll progress: starts when section is at 25% from top (3/4 down viewport), 
    // stays until animation completes
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.75", "end start"],
    });

    // Start text animations immediately when section enters trigger zone
    const objectionOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
    const objectionScale = useTransform(scrollYProgress, [0, 0.08], [0.96, 1]);
    const objectionRotateX = useTransform(scrollYProgress, [0, 0.08], [-6, 0]);

    const aiOpacity = useTransform(scrollYProgress, [0.12, 0.2], [0, 1]);
    const aiY = useTransform(scrollYProgress, [0.12, 0.2], [20, 0]);

    const intentProgress = useTransform(scrollYProgress, [0.3, 0.65], [0, progress]);
    const statsOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

    const prospectImages: Record<string, string> = {
        skeptical: "/prospect1.png",
        considering: "/prospect2.png",
        interested: "/prospect3.png",
    };

    const emotionThemes: Record<string, { label: string }> = {
        skeptical: { label: "Skeptical" },
        considering: { label: "Considering" },
        interested: { label: "Ready to Buy" },
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[300vh] flex items-start justify-center px-6">
            {/* Subtle grid like Landing */}
            <div className="absolute inset-0
                bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
                linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
                bg-size-[4rem_4rem]"/>
            
            {/* Sticky container that stays in viewport during entire scroll animation */}
            <div className="sticky top-[12vh] w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 z-10">
                {/* LEFT */}
                <div className="flex flex-col space-y-6">
                    <motion.div style={{ opacity: objectionOpacity }}>
                        {/* TOP */}
                        <h2 className="text-2xl font-semibold tracking-tight py-4">
                            Change buyer intent: Real Time, Before call ends.
                        </h2>

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl
                                        border border-white/20 text-neutral-300 text-xs
                                        shadow-[0_12px_40px_rgba(0,0,0,0.6)] mr-6">
                            <AlertCircle className="w-3.5 h-3.5 text-white" />
                            HANDLES OBJECTIONS
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl
                                        border border-white/20 text-neutral-300 text-xs
                                        shadow-[0_12px_40px_rgba(0,0,0,0.6)] mr-6">
                            <CircleCheck className="w-3.5 h-3.5 text-white" />
                            ANSWERS QUERIES
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl
                                        border border-white/20 text-neutral-300 text-xs
                                        shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                            <CircleQuestionMark className="w-3.5 h-3.5 text-white" />
                            DETECTS INTENT
                        </div>
                    </motion.div>

                    <motion.div
                        style={{
                            opacity: objectionOpacity,
                            scale: objectionScale,
                            rotateX: objectionRotateX,
                        }}
                        className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20
                                    shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-6">
                        <div className="flex gap-4">
                            <div>
                                <div className="text-white text-xs mb-1 font-medium">
                                    {type}
                                </div>
                                <div className="text-neutral-200 text-sm leading-relaxed">
                                    "{prompt}"
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <div>
                                <div className="text-white text-xs mb-1 font-medium">
                                    AI RESPONSE
                                </div>
                            </div>
                        </div>

                        <p className="mb-6 text-neutral-200 text-sm leading-relaxed">
                            "{response}"
                        </p>

                        <div className="grid grid-cols-3 gap-3">
                            {Object.entries(objectionData).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="rounded-2xl bg-white/5 backdrop-blur-xl
                                              border border-white/20
                                              shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                                              p-3 text-center">
                                    <div className="text-white font-semibold text-lg">
                                        {value}
                                    </div>
                                    <div className="text-neutral-400 text-[10px] uppercase">
                                        {key}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div style={{ opacity: aiOpacity, y: aiY }}>
                        <div className="rounded-3xl bg-white/5 backdrop-blur-xl
                                       border border-white/20
                                       shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                                       p-6">
                            <div className="flex gap-4">
                                <div>
                                    <div className="text-white text-xs mb-1 font-medium">
                                        QUERY
                                    </div>
                                    <div className="text-neutral-200 text-sm leading-relaxed">
                                        "Why should we choose you over others? "
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <div>
                                    <div className="text-white text-xs mb-1 font-medium">
                                        AI RESPONSE
                                    </div>
                                </div>
                            </div>

                            <p className="mb-6 text-neutral-200 text-sm leading-relaxed">
                                "We respond with the exact proof points that historically moved buyers like this one"
                            </p>

                            <div className="grid grid-cols-3 gap-3">
                                {Object.entries(queryData).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20
                                                  shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-3 text-center">
                                        <div className="text-neutral-100 text-[10px] uppercase">
                                            {value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT */}
                <div>
                    <CallSimulation scrollYProgress={scrollYProgress} />
                </div>
            </div>
        </section>
    );
}