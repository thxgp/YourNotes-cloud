import { SignUpButton } from '@clerk/clerk-react'

function Landing() {
    return (
        <div className="landing">
            <h1 className="landing-title">Your Notes, Secured</h1>
            <p className="landing-subtitle">
                A secure, cloud-native notes application built with enterprise-grade security.
                End-to-end encryption, row-level security, and modern authentication.
            </p>

            <SignUpButton mode="modal">
                <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    Start Taking Notes — It's Free
                </button>
            </SignUpButton>

            <div className="landing-features">
                <div className="feature-card">
                    <div className="feature-icon">🔐</div>
                    <h3 className="feature-title">Secure Authentication</h3>
                    <p className="feature-desc">
                        Powered by Clerk with JWT tokens. Your identity is protected with industry-standard security.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🛡️</div>
                    <h3 className="feature-title">Row-Level Security</h3>
                    <p className="feature-desc">
                        Your notes are protected at the database level. Only you can access your data.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">☁️</div>
                    <h3 className="feature-title">Cloud Native</h3>
                    <p className="feature-desc">
                        Containerized application running on secure infrastructure with automated monitoring.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Landing
