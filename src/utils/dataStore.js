// Simulating a database with localStorage

const defaultProjects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'A full-featured online store with secure payments, user dashboard, and admin panel.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: '#',
        repoUrl: '#'
    },
    {
        id: 2,
        title: 'Cyber Threat Monitor',
        category: 'Cybersecurity',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Real-time network traffic analysis tool for detecting potential security threats.',
        techStack: ['Python', 'Wireshark', 'React', 'D3.js'],
        liveUrl: '#',
        repoUrl: '#'
    },
    {
        id: 3,
        title: 'Task Automation Bot',
        category: 'System Automation',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Automated workflow system for processing invoices and updating database records.',
        techStack: ['Python', 'Selenium', 'Docker', 'AWS'],
        liveUrl: '#',
        repoUrl: '#'
    },
    {
        id: 4,
        title: 'Health Tracking App',
        category: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Cross-platform mobile application for tracking daily fitness activities and diet.',
        techStack: ['React Native', 'Firebase', 'Redux'],
        liveUrl: '#',
        repoUrl: '#'
    }
];

const defaultServices = [
    {
        id: 1,
        title: 'Full-Stack Web Development',
        icon: 'web',
        description: 'Custom, responsive, and high-performance websites built with modern technologies like React, Next.js, and Node.js.',
        features: ['Responsive Design', 'SEO Optimization', 'Fast Loading', 'Secure Backend'],
        price: 'Start from $500'
    },
    {
        id: 2,
        title: 'Cybersecurity Solutions',
        icon: 'security',
        description: 'Comprehensive security audits, vulnerability assessments, and secure system architecture design.',
        features: ['Penetration Testing', 'Security Audits', 'Compliance', 'Secure Coding'],
        price: 'Start from $800'
    },
    {
        id: 3,
        title: 'Mobile App Development',
        icon: 'mobile',
        description: 'Native and cross-platform mobile applications for iOS and Android using React Native.',
        features: ['iOS & Android', 'Smooth UI/UX', 'Cloud Sync', 'Push Notifications'],
        price: 'Start from $1000'
    },
    {
        id: 4,
        title: 'System Automation',
        icon: 'automation',
        description: 'Automating repetitive tasks and workflows to increase business efficiency and reduce errors.',
        features: ['Workflow Automation', 'Data Scraping', 'Bot Development', 'API Integration'],
        price: 'Start from $300'
    },
    {
        id: 5,
        title: 'Custom Software Solutions',
        icon: 'software',
        description: 'Tailor-made software applications to solve specific business problems and improve productivity.',
        features: ['Desktop Apps', 'Enterprise Systems', 'Database Design', 'Maintenance'],
        price: 'Start from $1500'
    },
    {
        id: 6,
        title: 'IT Consulting',
        icon: 'consulting',
        description: 'Professional advice on technology strategy, infrastructure, and digital transformation.',
        features: ['Tech Strategy', 'Infrastructure', 'Cloud Migration', 'Training'],
        price: 'Hourly Rates'
    }
];

// Initialize Data
if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify(defaultProjects));
}

if (!localStorage.getItem('services')) {
    localStorage.setItem('services', JSON.stringify(defaultServices));
}

export const getProjects = () => {
    try {
        const stored = localStorage.getItem('projects');
        return stored ? JSON.parse(stored) : defaultProjects;
    } catch (e) {
        return defaultProjects;
    }
};

export const saveProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
    // Trigger storage event for cross-component updates if we were using context
    window.dispatchEvent(new Event('storage'));
};

export const getServices = () => {
    try {
        const stored = localStorage.getItem('services');
        return stored ? JSON.parse(stored) : defaultServices;
    } catch (e) {
        return defaultServices;
    }
};

export const saveServices = (services) => {
    localStorage.setItem('services', JSON.stringify(services));
    window.dispatchEvent(new Event('storage'));
};

// Admin Auth (Simple Mock)
export const login = (username, password) => {
    // Hardcoded for demo - in production this would verify against backend
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        return true;
    }
    return false;
};

export const logout = () => {
    localStorage.removeItem('isAdmin');
};

export const isAuthenticated = () => {
    return localStorage.getItem('isAdmin') === 'true';
};

// Secure Input Sanitization function to prevent XSS
export const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
};
