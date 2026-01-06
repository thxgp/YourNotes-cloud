import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <SignedOut>
                <Landing />
              </SignedOut>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            </>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App
