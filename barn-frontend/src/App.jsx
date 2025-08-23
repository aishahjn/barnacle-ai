import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, SignUp, Statistics, Model, About, NotFound } from './pages'
import Pricing from './pages/Pricing';
import Demo from './pages/Demo';
import NavBar from './components/shared/NavBar';
import Footer from './components/shared/Footer';
import ErrorBoundary from './components/shared/ErrorBoundary';
import Help from './components/shared/Help';
import ScrollToTop from './components/shared/ScrollToTop';
import { useKeyboardShortcuts, SkipLinks } from './hooks/useKeyboardShortcuts.jsx';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  )
}

// Separate component to use hooks that require Router context
function AppContent() {
  // Initialize keyboard shortcuts for power users
  useKeyboardShortcuts();

  return (
    <>
      {/* Skip links for accessibility */}
      <SkipLinks />
      
      {/* Automatic scroll to top on navigation */}
      <ScrollToTop />
      
      <NavBar id="navigation" />
      
      <main id="main-content" role="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/model' element={<Model />} />
          <Route path='/demo' element={<Demo />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/about' element={<About />} />
          {/* Catch-all route for non-existent pages */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      
      {/* Global Help System */}
      <Help />
      
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App
