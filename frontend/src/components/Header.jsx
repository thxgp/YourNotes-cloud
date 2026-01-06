import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

function Header() {
    const { isSignedIn } = useUser()

    return (
        <header className="header">
            <Link to="/" className="header-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#grad)" stroke="none" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>
                SecureNotes
            </Link>

            <div className="header-actions">
                {isSignedIn ? (
                    <>
                        <Link to="/dashboard" className="btn btn-secondary">
                            My Notes
                        </Link>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: { width: 40, height: 40 }
                                }
                            }}
                        />
                    </>
                ) : (
                    <>
                        <SignInButton mode="modal">
                            <button className="btn btn-secondary">Sign In</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="btn btn-primary">Get Started</button>
                        </SignUpButton>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
