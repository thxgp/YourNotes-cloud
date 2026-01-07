import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Cloud, ArrowRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SignInButton, useUser } from "@clerk/clerk-react"

function Landing() {
    const { isSignedIn } = useUser()

    return (
        <div className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2f4f4f]/20 via-background to-background pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 py-12 md:py-20">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-4">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Military-grade encryption</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                        Your Thoughts, <br />
                        <span className="text-primary/90">Under Lock & Key.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        SecureNotes is a fortress for your ideas. Built with end-to-end encryption and zero-knowledge architecture.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link to={isSignedIn ? "/dashboard" : "#"}>
                            {isSignedIn ? (
                                <Button size="lg" className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_rgba(47,79,79,0.5)] border border-white/10">
                                    Open Vault <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            ) : (
                                <SignInButton mode="modal">
                                    <Button size="lg" className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_rgba(47,79,79,0.5)] border border-white/10">
                                        Secured Entry <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </SignInButton>
                            )}
                        </Link>

                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        {
                            icon: <Lock className="w-8 h-8 text-accent" />,
                            title: "End-to-End Encrypted",
                            desc: "Your data is encrypted on your device before it ever reaches our servers."
                        },
                        {
                            icon: <Shield className="w-8 h-8 text-primary" />,
                            title: "Identity Protection",
                            desc: "Advanced authentication via Clerk ensures only you can access your vault."
                        },
                        {
                            icon: <Cloud className="w-8 h-8 text-sky-400" />,
                            title: "Secure Sync",
                            desc: "Access your encrypted notes from any device, anywhere in the world."
                        }
                    ].map((feature, i) => (
                        <Card key={i} className="bg-[#1a1a1a]/50 backdrop-blur border-white/5 hover:border-primary/20 transition-colors">
                            <CardContent className="p-6 space-y-4">
                                <div className="p-3 w-fit rounded-lg bg-white/5 border border-white/5">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Landing
