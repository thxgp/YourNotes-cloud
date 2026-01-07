import { SignInButton, SignUpButton, UserButton, useUser, useAuth } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ShieldAlert } from 'lucide-react'

function Header() {
    const { isSignedIn } = useUser()
    const { userId } = useAuth()

    return (
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/60 border-white/5">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity">
                    <ShieldAlert className="w-6 h-6 text-primary" strokeWidth={2.5} />
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        SecureNotes
                    </span>
                </Link>

                <nav className="flex items-center gap-4">
                    {isSignedIn ? (
                        <>
                            <Link to="/dashboard">
                                <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-white/5">
                                    Dashboard
                                </Button>
                            </Link>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-9 h-9 border border-white/10"
                                    }
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <SignInButton mode="modal">
                                <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-white/5">
                                    Log in
                                </Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_-3px_rgba(47,79,79,0.5)] border border-white/10">
                                    Get Access
                                </Button>
                            </SignUpButton>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
