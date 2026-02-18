import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import WhatsAppChatbot from './components/WhatsAppChatbot';
import Footer from './components/Footer';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ProjectManager from './admin/ProjectManager';
import ServiceManager from './admin/ServiceManager';
import Cursor from './components/Cursor';

// Public portfolio page
const PortfolioPage = () => (
  <div className="relative">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
    <WhatsAppChatbot />
  </div>
);

import SmoothingScroll from './components/SmoothScroll';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SmoothingScroll>
        <Cursor />
        <Routes>
          {/* Public Site */}
          <Route path="/" element={<PortfolioPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="services" element={<ServiceManager />} />
          </Route>
        </Routes>
      </SmoothingScroll>
    </Router>
  );
}

export default App;
