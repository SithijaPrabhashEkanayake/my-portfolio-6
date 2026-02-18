import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

// Lazy load below-the-fold sections
const AboutSection = lazy(() => import('./components/AboutSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const WhatsAppChatbot = lazy(() => import('./components/WhatsAppChatbot'));
const Footer = lazy(() => import('./components/Footer'));

// Lazy load Admin
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const ProjectManager = lazy(() => import('./admin/ProjectManager'));
const ServiceManager = lazy(() => import('./admin/ServiceManager'));

// Loading Spinner
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[200px] w-full py-20">
    <div className="w-10 h-10 border-4 border-accent-purple border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Public portfolio page
const PortfolioPage = () => (
  <div className="relative">
    <Navbar />
    <HeroSection />
    <Suspense fallback={<PageLoader />}>
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <WhatsAppChatbot />
    </Suspense>
  </div>
);

import SmoothingScroll from './components/SmoothScroll';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SmoothingScroll>
        <Routes>
          {/* Public Site */}
          <Route path="/" element={<PortfolioPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div className="min-h-screen bg-dark flex items-center justify-center text-white">Loading Admin Panel...</div>}>
                <Routes>
                  <Route path="login" element={<AdminLogin />} />
                  <Route path="/" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="projects" element={<ProjectManager />} />
                    <Route path="services" element={<ServiceManager />} />
                  </Route>
                </Routes>
              </Suspense>
            }
          />
        </Routes>
      </SmoothingScroll>
    </Router>
  );
}

export default App;
