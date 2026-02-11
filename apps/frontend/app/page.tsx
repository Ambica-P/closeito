import { Gauntlet } from '@/components/Gauntlet';
import HowItWorks from '@/components/HowItWorks';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const glass =
    "bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]";

export default function Home() {
    return (

        <div className="min-h-screen bg-[#0B0B0C] text-white antialiased">

            {/* HERO */}
            <section className="px-6 p-28">
                <div className="max-w-4xl mx-auto text-center">

                    <div className={`${glass} inline-block rounded-full px-4 py-1.5 mb-10`}>
                        <span className="text-sm font-medium text-white/70">
                            AI-Powered Sales Automation
                        </span>
                    </div>

                    <h1 className="text-5xl font-bold mb-6">
                        Stop chasing Leads,
                        Start Closing Them
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed">
                        Your AI sales agent that never stops working — engage prospects,
                        qualify leads, and book meetings automatically.
                    </p>

                    <Button >
                        Book a Demo
                    </Button>
                </div>
            </section>

            {/* FEATURES */}
            <section className="px-6 pt-16 pb-8">
                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12">
                        Why Choose SalesAI
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        {/* Feature 1 */}
                        <div className={`${glass} rounded-2xl p-7`}>
                            <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                24/7 Availability
                            </h3>

                            <p className="text-white/60 leading-relaxed">
                                Never miss a lead again. Our AI agent works around the clock,
                                engaging prospects across all time zones.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className={`${glass} rounded-2xl p-7`}>
                            <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                Intelligent Qualification
                            </h3>

                            <p className="text-white/60 leading-relaxed">
                                Smart lead scoring powered by machine learning so only the most
                                promising prospects reach your sales team.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className={`${glass} rounded-2xl p-7`}>
                            <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                Instant Response
                            </h3>

                            <p className="text-white/60 leading-relaxed">
                                Engage prospects within seconds and keep your brand top-of-mind
                                while dramatically improving conversion rates.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            <section>
                <Gauntlet/>
            </section>
            <section>
                <HowItWorks/>
            </section>
            {/* FOOTER */}
            <footer className="px-6 pb-10 pt-2">
                <div className="max-w-7xl mx-auto">
                    <div className={`${glass} rounded-2xl p-10`}>

                        <div className="grid md:grid-cols-4 gap-10 mb-10">

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Image src="/logo.svg" height={36} width={36} alt="Logo" />
                                    <span className="font-semibold text-lg">
                                        Closeito 
                                    </span>
                                </div>

                                <p className="text-sm text-white/60 leading-relaxed">
                                    Transform your sales process with intelligent AI automation.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-3">Product</h4>
                                <ul className="space-y-2 text-white/60 text-sm">
                                    <li>Features</li>
                                    <li>Pricing</li>
                                    <li>Integrations</li>
                                    <li>API</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-3">Company</h4>
                                <ul className="space-y-2 text-white/60 text-sm">
                                    <li>About</li>
                                    <li>Blog</li>
                                    <li>Careers</li>
                                    <li>Contact</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-3">Legal</h4>
                                <ul className="space-y-2 text-white/60 text-sm">
                                    <li>Privacy</li>
                                    <li>Terms</li>
                                </ul>
                            </div>

                        </div>

                        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-white/50">
                                © 2026 Closeito . All rights reserved.
                            </p>
                            <div className="flex gap-6">
                                <a href="https://x.com/closeito" target="_blank" rel="noopener noreferrer"
                                    className="text-white hover:text-white transition-colors">
                                    <Image
                                        src="x.svg"
                                        height={18}
                                        width={18}
                                        alt="X"
                                    />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </div>
    );
}
