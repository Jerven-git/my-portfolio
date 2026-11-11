# Jerven Latayada — Software Development & Digital Solutions

An existing React portfolio refactored into a services website for business owners, startups, and prospective clients. The original Crafted and interactive Mission Grid identities remain available.

## Local development

```sh
npm ci
npm run dev
```

## Validation and build

```sh
npm run lint
npm run build
npm run preview
```

The Vite build uses a relative base for custom domains and GitHub Pages project paths. No deployment configuration is changed by the services refactor.

## Content and sections

- `src/content/business.js`: shared navigation, positioning, services, solution examples, and editable email inquiry outline.
- `src/content/projects.js`: project descriptions, roles, technologies, links, and private/staging status shared by both identities.
- `src/App.jsx`: Hero → Services → Solutions → Projects → About → Contact.
- `src/index.css`: existing design tokens and mode-specific responsive styling.

Project inquiries use the existing email address through `mailto:` links. Visitors send an email from their own mail app; the site has no submission backend or simulated success message. The email address is also visible for copying.

The existing CV remains at `public/cv.pdf`, with its source and generator in `cv/`. It is outside the primary website journey. `npm run cv` retains the original PDF generation workflow.
