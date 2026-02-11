import { Calendar, MessageSquare, PlugZap } from "lucide-react"

const steps = [
    {
        icon: PlugZap,
        title: "Connect Your Lead Flow",
        description:
            "Link your website, forms, or CRM so incoming prospects can be handled automatically.",
    },
    {
        icon: MessageSquare,
        title: "AI Responds in Real Time",
        description:
            "Your agent answers questions, handles objections, and keeps the conversation moving.",
    },
    {
        icon: Calendar,
        title: "Route Only Serious Buyers",
        description:
            "Qualified leads can be scheduled or passed to your team when timing is right.",
    },
]

export default function HowItWorks() {
    return (
        <section className="w-full py-24 px-6">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-14 text-center">
                    <p className="text-sm uppercase tracking-widest text-white/50">
                        How It Works
                    </p>

                    <h2 className="mt-4 text-4xl font-semibold text-white">
                        A Simple Flow From Lead → Meeting
                    </h2>

                    <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
                        SalesAI fits into your existing process — responding instantly and
                        helping prospects take the next step.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid gap-6 md:grid-cols-3">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="rounded-3xl border border-white/10 bg-white/5 p-8
              shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
              backdrop-blur-xl transition hover:bg-white/10"
                        >
                            {/* Icon */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                                <step.icon className="h-6 w-6 text-white/80" />
                            </div>

                            {/* Text */}
                            <h3 className="mt-6 text-xl font-medium text-white">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-white/60">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Subtle CTA */}
                <div className="mt-16 text-center">
                    <p className="text-white/50 text-sm">
                        Want to see what this could look like for your sales process?
                    </p>

                    <button
                        className="mt-5 rounded-full bg-white/10 px-6 py-3 text-sm
            text-white/80 backdrop-blur-md border border-white/10
            hover:bg-white/20 transition"
                    >
                        Join the Waitlist
                    </button>
                </div>
            </div>
        </section>
    )
}
