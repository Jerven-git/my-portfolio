export const navigationLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const positioning = {
  headline: 'Building Digital Solutions That Move Businesses Forward',
  description: 'I help businesses turn ideas and operational challenges into reliable websites, custom applications, and practical software solutions.',
};

export const projectEmail = `mailto:latayada1233@gmail.com?subject=${encodeURIComponent('Project inquiry')}&body=${encodeURIComponent('Hi Jerven,\n\nMy business or idea:\n\nThe challenge I want to solve:\n\nWhat the solution needs to do:\n\nExisting website or systems (if any):\n\nPreferred timeline:\n\nBudget range (if known):\n')}`;

export const services = [
  {
    title: 'Website Development',
    problem: 'Your business needs a clear, useful presence online.',
    solution: 'Websites that explain your services, present your products, and give customers a way to enquire, book, or buy.',
    evidence: 'Service websites, art galleries, optometry, and commerce.',
  },
  {
    title: 'Custom Web Applications',
    problem: 'Your idea or process needs more than a standard website.',
    solution: 'Applications built around your requirements, from customer-facing features to the administration behind them.',
    evidence: 'Multi-tenant commerce, dispatching, and ticketing systems.',
  },
  {
    title: 'Business Management Systems',
    problem: 'Customer records, staff, and daily tasks are difficult to manage together.',
    solution: 'Workspaces for managing information, coordinating teams, and keeping operational tasks in one place.',
    evidence: 'CRM features, staff management, and store administration.',
  },
  {
    title: 'Workflow Automation',
    problem: 'Repetitive tasks take time away from running your business.',
    solution: 'n8n workflows to connect tools and automate repeatable steps, scoped around the systems you already use.',
    evidence: 'n8n workflow development and full-stack integration experience.',
  },
  {
    title: 'API & System Integration',
    problem: 'Your website and business tools need to work together.',
    solution: 'Backend APIs and integrations for payments, booking, and application data, with access boundaries considered throughout.',
    evidence: 'Stripe, Square, booking integrations, and Laravel APIs.',
  },
  {
    title: 'Website Optimization & Modernization',
    problem: 'An existing website needs improvements without losing what already works.',
    solution: 'Focused updates to usability, responsive layouts, application features, and storefront behaviour within your current codebase.',
    evidence: 'Production CRM maintenance and Shopify theme customization.',
  },
];

export const solutions = [
  {
    id: 'commerce',
    title: 'Sell online. Manage the work behind it.',
    name: 'E-Commerce Platform',
    problem: 'Online sales need a storefront and the tools to manage products, orders, payments, and store settings.',
    description: 'A multi-tenant commerce platform with configurable themes, payment integrations, store administration, and domain management.',
    application: 'For merchants managing an online catalogue and the operations behind each purchase.',
    tech: ['Nuxt', 'Laravel', 'Docker', 'Bun', 'NGINX'],
  },
  {
    id: 'dispatching',
    title: 'Coordinate service requests and assignments.',
    name: 'Dispatching System',
    problem: 'Service teams need a way to assign workers and follow jobs from request to completion.',
    description: 'A dispatching application for coordinating assignments and tracking service jobs end to end.',
    application: 'For teams that dispatch workers to service requests.',
    tech: ['Next.js', 'Laravel', 'Docker', 'npm', 'NGINX'],
  },
  {
    id: 'ticketing',
    title: 'Bring event setup and ticket sales together.',
    name: 'Ticketing System',
    problem: 'Event organizers need to manage event information, ticket inventory, and checkout together.',
    description: 'An event and ticketing platform covering event creation, ticket inventory, and purchasing.',
    application: 'For organizers setting up events and selling tickets online.',
    tech: ['Vue', 'Laravel', 'Docker', 'npm', 'NGINX'],
  },
];
