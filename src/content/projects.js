export const featuredProjects = [
  {
    id: 'databasy-platform',
    name: 'DATABASY / SSU',
    type: 'Multi-tenant commerce platform',
    problem: 'Merchants need customer-facing storefronts and separate tools for managing store operations.',
    application: 'Commerce businesses managing catalogues, orders, payments, and staff across stores.',
    statement: 'A branded storefront for each merchant. One operational workspace behind every store.',
    description:
      'Built end to end with Nuxt and Laravel: tenant-resolved storefronts, catalogue and order workflows, configurable themes, subscriptions, payments, domains, staff access, and separate tenant and platform administration.',
    role: 'Full-stack architecture, product UI, backend APIs, infrastructure',
    system: 'Nuxt 4 · Laravel · MySQL · Reverb',
    delivery: 'Docker · NGINX · tenant-aware production stack',
    proof: ['Host-based tenant isolation', 'Storefront + admin', '2FA and role boundaries'],
    preview: 'commerce',
    link: null,
  },
  {
    id: 'databasy-crm',
    name: 'DataBasy CRM',
    type: 'Production client-management system',
    problem: 'An established CRM needs new features while existing workflows continue to operate.',
    application: 'Businesses extending customer-management workflows in an existing application.',
    statement: 'New capabilities for an existing customer-management system.',
    description:
      'Extended an established client-management platform with production features and modules, working across Laravel, Blade, jQuery, PHP, and MySQL while preserving the behaviour of an existing system.',
    role: 'Full-stack feature delivery and production maintenance',
    system: 'Laravel · Blade · jQuery · PHP · MySQL',
    delivery: 'Existing production application with live authentication',
    proof: ['Mature codebase', 'Server-rendered UI', 'Live production surface'],
    preview: 'crm',
    link: 'https://crm.databasy.io/login',
  },
];

export const supportingProjects = [
  {
    name: 'Azura Fresh',
    problem: 'Food sales need a storefront connected to order and delivery administration.',
    application: 'Food catalogue, checkout, payments, order tracking, and delivery locations.',
    type: 'Food commerce + operations',
    description:
      'A multi-tenant food storefront and admin system covering catalogue, cart, checkout, payments, order tracking, delivery locations, and configurable public content.',
    tech: 'Nuxt 4 · Laravel · Pinia · MySQL · Docker',
    link: 'https://azura-fresh.pageone247.com',
  },
  {
    name: 'Sharon Comello Art',
    problem: 'An art business needs to present its work and support purchases and enquiries.',
    application: 'Artwork collections, commissions, journal content, gift cards, and purchasing.',
    type: 'Gallery + art commerce',
    description:
      'A contemporary gallery experience for original artwork, collections, commissions, journal stories, gift cards, enquiries, and secure purchasing.',
    tech: 'Nuxt 4 · Laravel · Pinia · Stripe · Square',
    link: 'https://sca.pageone247.com',
  },
  {
    name: 'Elite Optometry United',
    problem: 'A practice needs to explain services and help visitors find a location and book.',
    application: 'Practice and suburb pages with embedded appointment booking.',
    type: 'Optometry services + appointments',
    description:
      'A configurable optometry services website with practice locations, suburb landing pages, and embedded appointment booking.',
    tech: 'Nuxt 4 · Laravel · Pinia · MySQL · NGINX',
    link: 'https://eliteoptometry.com.au',
  },
  {
    name: 'Tan',
    problem: 'A services business needs to present its offering and manage website content.',
    application: 'A configurable public website and administration experience.',
    type: 'Configurable services website',
    description:
      'A services-focused website and administration experience for presenting services and managing public content.',
    tech: 'Nuxt 4 · Laravel · Pinia · MySQL · Docker',
    status: 'Private staging build',
  },
  {
    name: 'Staff Management Platform',
    problem: 'Internal staff workflows need a dedicated application.',
    application: 'Staff management with Laravel and Vue, extended with Django and React modules.',
    type: 'Internal operations',
    description:
      'Sole developer on a Laravel and Vue staff-management system, later extended with Django and React modules.',
    tech: 'Laravel · Vue · Django · React · Python',
  },
  {
    name: 'Custom CMS Platform',
    problem: 'Website content needs to be editable through reusable structures and controlled access.',
    application: 'Page building, reusable blocks, role-based administration, and real-time editing.',
    type: 'Content infrastructure',
    description:
      'A modular CMS with page building, reusable blocks, role-based administration, and real-time editing.',
    tech: 'Laravel · Nuxt · Vue · Tailwind CSS',
  },
  {
    name: 'Shopify Storefront Work',
    problem: 'An existing storefront needs tailored shopping and booking behaviour.',
    application: 'Product filtering, booking-calendar updates, and responsive theme refinements.',
    type: 'Theme customization',
    description:
      'Production theme customization including product filtering, booking-calendar behaviour, and responsive storefront refinements.',
    tech: 'Shopify · Liquid · JavaScript · CSS',
    link: 'https://sasrentals.com.au/',
  },
];

