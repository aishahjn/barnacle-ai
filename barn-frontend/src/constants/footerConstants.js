// Footer constants for the BarnaClean application - Updated with SeaWise team information
export const FOOTER_CONTENT = {
  // Company branding
  brandName: 'BarnaClean',
  tagline: 'Predict & Prevent Biofouling',
  description: 'AI-driven biofouling prevention system for 30% fuel savings. Revolutionary marine technology developed by SeaWise team for MarineHack2025 Challenge 1. Cut the drag. Save fuel. Protect the ocean.',
  
  // Contact information from BarnaClean document
  contact: {
    phone: '0128699358',
    email: 'seawise@marinehack2025.com',
    team: 'SeaWise Group',
    representative: 'Nor Asyiqin Nazirah Binti Rapandi'
  },
  
  // Social media configuration
  socialMedia: [
    {
      name: 'Facebook',
      icon: 'facebook',
      url: 'https://facebook.com/barnaclean',
      ariaLabel: 'Visit our Facebook page'
    },
    {
      name: 'Twitter',
      icon: 'twitter', 
      url: 'https://twitter.com/barnaclean',
      ariaLabel: 'Follow us on Twitter'
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      url: 'https://instagram.com/barnaclean',
      ariaLabel: 'Follow us on Instagram'
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://linkedin.com/company/barnaclean',
      ariaLabel: 'Connect with us on LinkedIn'
    },
    {
      name: 'YouTube',
      icon: 'youtube',
      url: 'https://youtube.com/barnaclean',
      ariaLabel: 'Subscribe to our YouTube channel'
    }
  ]
};

// BarnaClean Solutions section
export const USEFUL_LINKS = {
  title: 'BarnaClean Solutions',
  links: [
    {
      name: 'Biofouling Predictor',
      url: '/statistics',
      internal: true
    },
    {
      name: 'Route Optimization',
      url: '/statistics',
      internal: true
    },
    {
      name: 'AI Models',
      url: '/model',
      internal: true
    },
    {
      name: 'ESG Impact',
      url: '/statistics',
      internal: true
    },
    {
      name: 'Pricing Plans',
      url: '/pricing',
      internal: true
    },
    {
      name: 'Maintenance Scheduler',
      url: '/statistics',
      internal: true
    },
    {
      name: 'Real-time Data',
      url: '/statistics',
      internal: true
    }
  ]
};

// SeaWise Team section
export const QUICK_ACCESS = {
  title: 'SeaWise Team',
  links: [
    {
      name: 'About SeaWise',
      url: '/about',
      internal: true
    },
    {
      name: 'Team Members',
      url: '/about',
      internal: true
    },
    {
      name: 'MarineHack2025',
      url: '/about',
      internal: true
    },
    {
      name: 'Contact Team',
      url: 'tel:0128699358',
      internal: false
    },
    {
      name: 'Technology Stack',
      url: '/model',
      internal: true
    },
    {
      name: 'AI Research',
      url: '/model',
      internal: true
    }
  ]
};

// Marine Industry section
export const MORE_LINKS = {
  title: 'Marine Industry',
  links: [
    {
      name: 'Cargo Shipping',
      url: '/about',
      internal: true
    },
    {
      name: 'Port Authorities',
      url: '/about',
      internal: true
    },
    {
      name: 'Maritime Regulators',
      url: '/about',
      internal: true
    },
    {
      name: 'Fleet Operators',
      url: '/pricing',
      internal: true
    },
    {
      name: 'SaaS Solutions',
      url: '/pricing',
      internal: true
    }
  ]
};

// Footer layout configuration
export const FOOTER_LAYOUT = {
  sections: [
    {
      type: 'brand',
      content: 'FOOTER_CONTENT'
    },
    {
      type: 'links',
      content: 'USEFUL_LINKS'
    },
    {
      type: 'links', 
      content: 'QUICK_ACCESS'
    },
    {
      type: 'links',
      content: 'MORE_LINKS'
    }
  ]
};

// Copyright information - Updated with BarnaClean mission
export const COPYRIGHT = {
  year: new Date().getFullYear(),
  text: `© ${new Date().getFullYear()} BarnaClean by SeaWise. All rights reserved.`,
  additionalText: 'AI-driven biofouling prevention for sustainable marine operations. Cut the drag. Save fuel. Protect the ocean.'
};