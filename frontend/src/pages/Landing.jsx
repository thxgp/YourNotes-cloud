import { SignUpButton } from '@clerk/clerk-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Shield, Database, Cloud } from 'lucide-react'

function Landing() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background text-foreground py-12 px-4 text-center">
            <div className="max-w-3xl space-y-6">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
                    Your Notes, <span className="text-zinc-500">Secured</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    A secure, cloud-native notes application built with enterprise-grade security.
                    End-to-end encryption, row-level security, and modern authentication.
                </p>

                <div className="pt-4">
                    <SignUpButton mode="modal">
                        <Button size="lg" className="text-lg px-8 py-6">
                            Start Taking Notes — It's Free
                        </Button>
                    </SignUpButton>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full text-left">
                <Card>
                    <CardHeader>
                        <Shield className="h-10 w-10 mb-2" />
                        <CardTitle>Secure Authentication</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base">
                            Powered by Clerk with JWT tokens. Your identity is protected with industry-standard security.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <Database className="h-10 w-10 mb-2" />
                        <CardTitle>Row-Level Security</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base">
                            Your notes are protected at the database level. Only you can access your data.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <Cloud className="h-10 w-10 mb-2" />
                        <CardTitle>Cloud Native</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base">
                            Containerized application running on secure infrastructure with automated monitoring.
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Landing
