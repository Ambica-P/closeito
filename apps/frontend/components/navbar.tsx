"use client"
import Image from 'next/image';
import { Button } from './ui/button';

export function NavBar() {
    return (
        <>
            <div className="fixed inset-0 -z-20 pointer-events-none  overflow-hidden"/>
            <header className="fixed top-0 left-0 w-full z-50">
                <nav className="w-full px-4 sm:px-6 py-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-slate-950/10 backdrop-blur-xs border border-white/5 rounded-2xl px-6 py-3 flex items-center justify-between ">
                            
                            {/* Logo Section */}
                            <div className="flex items-center gap-3 group cursor-pointer">
                                <Image
                                src={"logo.svg"}
                                height={50}
                                width={50}
                                alt='Logo'
                                />
                            </div>
                            {/* Action Button */}
                            <div className="flex items-center gap-3">
                                <Button variant='primary' size='sm'>
                                    Join Waitlist
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}