import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Shield } from 'lucide-react'

function Header() {
    const { isSignedIn } = useUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                    <Shield className="h-6 w-6" />
                    <span>SecureNotes</span>
                </Link>

                <div className="flex items-center gap-4">
                    {isSignedIn ? (
                        <>
                            <Link to="/dashboard">
                                <Button variant="ghost">My Notes</Button>
                            </Link>
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: { width: 36, height: 36 }
                                    }
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <SignInButton mode="modal">
                                <Button variant="ghost">Sign In</Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button>Get Started</Button>
                            </SignUpButton>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
