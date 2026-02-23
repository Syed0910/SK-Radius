export const products = [
  {
    id: 'isp-radius',
    name: 'ISP Radius',
    tagline: 'Intelligent ISP Management & AAA Platform',
    description: 'A scalable, secure, and fully integrated solution for managing ISP operations and subscriber authentication with automated billing and real-time monitoring.',
    highlights: [
      'Supports 50+ Router/NAS devices with full IPv6 compatibility',
      '24/7 Premium Support',
      'Compatible with global ISP deployments',
      'Trusted by hundreds of ISP businesses worldwide'
    ],
    image: 'https://customer-assets.emergentagent.com/job_radius-management/artifacts/1b4dbszw_Analytics%20dashboard%20overview%20for%20AniRiks%20Technologies.png'
  },
  {
    id: 'isp-radius-premium',
    name: 'ISP Radius Premium',
    tagline: 'Enterprise ISP Automation & Advanced AAA Control Platform',
    description: 'A high-performance, enterprise-grade ISP management solution built for large-scale networks, advanced automation, deep analytics, and complex reseller ecosystems.',
    highlights: [
      'Supports 100+ Router/NAS devices with full IPv4 & IPv6 compatibility',
      'High-performance architecture for large subscriber bases',
      'Advanced analytics & financial intelligence dashboards',
      'Priority 24/7 Dedicated Technical Support'
    ],
    image: 'https://customer-assets.emergentagent.com/job_radius-management/artifacts/p4rknbp2_ChatGPT%20Image%20Feb%2014%2C%202026%2C%2005_07_19%20PM.png'
  },
  {
    id: 'isp-radius-log-server',
    name: 'ISP Radius Log Server',
    tagline: 'Advanced Centralized Log Management System',
    description: 'A powerful, scalable, and high-performance syslog and tracking log server for ISPs and enterprise networks, designed to collect, organize, search, and analyze logs from all network devices.',
    highlights: [
      'Superfast log filtering with optimized performance',
      'Multiple views and advanced search tools',
      'HDD or Cloud storage support',
      'Comprehensive security & role permissions'
    ],
    image: 'https://customer-assets.emergentagent.com/job_radius-management/artifacts/0wmnx1mb_image.png'
  }
];

export const radiusPricing = [
  { name: 'Basic', price: 15, users: 500, nas: 10, description: 'Perfect for small and startup ISPs' },
  { name: 'Starter', price: 25, users: 1000, nas: 20, description: 'Ideal for growing local providers' },
  { name: 'Standard', price: 35, users: 2000, nas: 30, description: 'Designed for expanding regional ISPs' },
  { name: 'Professional', price: 50, users: 5000, nas: 40, description: 'Best suited for multi-branch operations' },
  { name: 'Business', price: 100, users: 10000, nas: 50, description: 'Built for high-capacity ISP networks' },
  { name: 'Advanced', price: 'Custom', users: '20,000+', nas: '100+', description: 'For enterprise solutions' }
];

export const premiumPricing = [
  { name: 'Premium Starter', price: 60, users: 5000, nas: 40, description: 'Enterprise-ready performance' },
  { name: 'Premium Business', price: 120, users: 10000, nas: 60, description: 'Advanced business intelligence' },
  { name: 'Premium Enterprise', price: 200, users: 20000, nas: 100, description: 'Enterprise-level security' },
  { name: 'Premium Advanced', price: 'Custom', users: '50,000+', nas: 'Unlimited', description: 'Large multi-region deployments' }
];

export const logServerPricing = [
  { 
    name: 'STARTER', 
    initialPrice: 199, 
    yearlyFee: 99, 
    nas: 10,
    storage: '1 SSD (OS), 1 HDD (Log)',
    freeService: '3 Months',
    support: 'Basic Support'
  },
  { 
    name: 'STANDARD', 
    initialPrice: 299, 
    yearlyFee: 149, 
    nas: 30,
    storage: '1 SSD (OS), 2 HDD (Log)',
    freeService: '6 Months',
    support: 'Friendly Support',
    badge: 'Best Choice'
  },
  { 
    name: 'PROFESSIONAL', 
    initialPrice: 499, 
    yearlyFee: 199, 
    nas: 'Unlimited',
    storage: '1 SSD (OS), Unlimited HDD (Log)',
    freeService: '12 Months',
    support: 'Professional Support',
    features: ['Email & SMS Notifications', 'Free Domain + SSL Setup', 'Auto Cloud Backup', 'Log Customization']
  }
];

export const features = {
  networkManagement: [
    { title: 'RADIUS AAA Support', description: 'Full authentication, authorization, and accounting for user access' },
    { title: 'Multi-NAS Handling', description: 'Connect and manage multiple NAS/routers simultaneously via RADIUS and API' },
    { title: 'Live Network Monitoring', description: 'Check network device statuses and connections in real time' },
    { title: 'Custom RADIUS Attributes', description: 'Accept both group and user-level customized attributes' },
    { title: 'Hotspot Token System', description: 'Issue access tokens for secure and flexible Wi-Fi logins' },
    { title: 'Dynamic Bandwidth Allocation', description: 'Automatically adjust speeds based on time or rules' },
    { title: 'Fair Usage Quota (FUP)', description: 'Implement data caps and manage speed reductions' },
    { title: 'IP Pool & Session Controls', description: 'Assign dynamic IP pools and enforce session limits' }
  ],
  billing: [
    { title: 'Multi-Gateway Payment Support', description: 'Accept payments via PayPal, Stripe, SSLCommerz, and more' },
    { title: 'Unlimited Service Packages', description: 'Create infinite subscription plans with custom pricing' },
    { title: 'Automated Billing Engine', description: 'Schedule and generate invoices automatically' },
    { title: 'Auto Disconnect & Auto-Renew', description: 'Auto-disable expired services or renew them based on settings' },
    { title: 'Tax Management', description: 'Configure tax rules and apply them automatically to invoices' },
    { title: 'Detailed Financial Reports', description: 'Access sales, ledger, cash flow, and payment history' },
    { title: 'Real-Time Invoice Delivery', description: 'Generate and send invoices immediately' },
    { title: 'Hierarchical Profit Distribution', description: 'Manage balances across reseller tiers' }
  ],
  userManagement: [
    { title: 'Role-Based Access Control', description: 'Assign detailed permissions across system modules' },
    { title: 'Comprehensive User Directory', description: 'Track balances, packages, subscribers, and roles' },
    { title: 'User Portals for All Roles', description: 'Provide dedicated dashboards for staff and resellers' },
    { title: 'Custom Notifications', description: 'Send alerts via SMS or email for payments and updates' },
    { title: 'Support Ticket System', description: 'Built-in helpdesk to track customer support tickets' },
    { title: 'Audit Trails & Logs', description: 'Record activity, login attempts, and session history' }
  ],
  system: [
    { title: 'Daily Automated Backups', description: 'Regular backups to protect and restore data' },
    { title: 'Advanced Security Measures', description: 'Protection against DDoS, intrusion, and unauthorized access' },
    { title: 'Responsive Design', description: 'Fully adaptable interface for all screen sizes' },
    { title: 'White-Label Customization', description: 'Brand the platform with your own logos and details' },
    { title: '24/7 Professional Support', description: 'Round-the-clock help via live chat, WhatsApp, and email' },
    { title: 'Multilingual Interface', description: 'Support for multiple languages to serve diverse regions' }
  ]
};

export const keyFeatures = [
  {
    title: 'Unlimited ISP Management',
    description: 'ISP Radius supports multiple ISP entities within a single system. Each ISP can maintain its own plans, settings, and reports while being managed from a central dashboard.'
  },
  {
    title: 'Unlimited Branches Control',
    description: 'Create unlimited branches under each ISP entity. Every branch operates independently with its own permissions and pricing, while head office maintains complete oversight.'
  },
  {
    title: 'Multi-Level Reseller System',
    description: 'The system includes a structured reseller framework with resellers and sub-resellers. Each level can manage subscribers, billing, and payments within its hierarchy.'
  },
  {
    title: 'Advanced Billing and Invoicing',
    description: 'An integrated billing engine automates recurring invoices, renewals, tax calculations, and overdue tracking. Real-time financial insights ensure accurate revenue management.'
  },
  {
    title: 'Subscriber Lifecycle Management',
    description: 'Manage the full subscriber journey from activation to termination. Monitor sessions, assign plans, track usage, and maintain complete customer records.'
  },
  {
    title: 'Captive Portal and Self-Service Portal',
    description: 'A customizable portal allows subscribers to view invoices, monitor usage, upgrade plans, make payments, and raise support requests independently.'
  }
];

export const whyChooseUs = [
  {
    title: 'Easy Setup & Hassle-Free Onboarding',
    description: 'We take the complexity out of installation - ISP Radius is quick to deploy, and our team assists with setup so you can start managing your network right away.'
  },
  {
    title: '24/7 Human Support',
    description: 'Unlike many software providers that rely on automated replies, ISP Radius comes with real support from real experts whenever you need it.'
  },
  {
    title: 'Transparent & Affordable Pricing',
    description: 'ISP Radius offers straightforward pricing without hidden fees. Our plans are designed to give you maximum value.'
  },
  {
    title: 'Regular Feature Updates',
    description: 'We continually enhance the platform with new features, performance upgrades, and improvements based on client feedback.'
  },
  {
    title: 'Robust Security & Protection',
    description: 'Security is at the core of ISP Radius. With advanced protection against threats, your network and customer data are always safeguarded.'
  },
  {
    title: 'Versatile & Scalable for Any ISP',
    description: 'From small local providers to large nationwide networks, ISP Radius scales effortlessly and gives you full operational control.'
  }
];

export const faqs = [
  {
    question: 'What are the minimum server requirements for ISP Radius?',
    answer: 'ISP Radius requires Ubuntu 22.04 64-bit, 2-4 CPU cores, 4-8GB RAM, and 50-100GB SSD depending on your plan.'
  },
  {
    question: 'How do I install ISP Radius on my server?',
    answer: 'Our team provides professional installation assistance. Once you purchase, we guide you through the entire setup process.'
  },
  {
    question: 'Can I use a mini PC, laptop, or desktop for ISP Radius?',
    answer: 'Yes, as long as it meets the minimum system requirements and runs Ubuntu 22.04 64-bit.'
  },
  {
    question: 'Do you provide networking support?',
    answer: 'We provide software installation and configuration support. For network infrastructure setup, you may need a network engineer.'
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Yes, you can upgrade to a higher plan at any time. Simply contact our support team.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer refunds within the first 7 days if the software does not meet your requirements.'
  },
  {
    question: 'Can you integrate custom features on request?',
    answer: 'Yes, we offer custom development services. Contact us with your requirements for a quote.'
  },
  {
    question: 'Can I add my company logo/branding?',
    answer: 'Yes, ISP Radius supports white-label customization. You can add your company logo and branding.'
  }
];

export const partners = [
  { name: 'TechCorp', logo: 'TC' },
  { name: 'NetSolutions', logo: 'NS' },
  { name: 'FiberNet', logo: 'FN' },
  { name: 'ConnectPlus', logo: 'CP' },
  { name: 'DataStream', logo: 'DS' },
  { name: 'CloudISP', logo: 'CI' }
];

export const clients = [
  { name: 'Global Networks', logo: 'GN' },
  { name: 'Metro ISP', logo: 'MI' },
  { name: 'City Connect', logo: 'CC' },
  { name: 'Regional Broadband', logo: 'RB' },
  { name: 'FastLink', logo: 'FL' },
  { name: 'UltraNet', logo: 'UN' },
  { name: 'SpeedConnect', logo: 'SC' },
  { name: 'BroadbandPro', logo: 'BP' }
];