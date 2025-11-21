# Applications

This directory contains all the applications in the moving company monorepo.

## Current Applications

### Quote Request Form (`/apps/quote-request`)
Customer-facing application for requesting moving quotes. This app guides users through a multi-step wizard to collect information about their move including inventory, services needed, and scheduling preferences.

**Status:** Ready to migrate from root directory

### Customer Portal (`/apps/customer-portal`)
Self-service portal for customers to manage their bookings, track moving status, and communicate with the moving company.

**Status:** Placeholder - Not yet implemented

### CRM (`/apps/crm`)
Internal customer relationship management system for managing leads, quotes, bookings, and customer communications.

**Status:** Placeholder - Not yet implemented

### Mover App (`/apps/mover-app`)
Mobile-first application for movers and drivers to manage their daily schedules, access job details, and update job status.

**Status:** Placeholder - Not yet implemented

## Running Applications

Once migrated, each application can be run independently:

```bash
npm run dev:quote-request
npm run dev:customer-portal
npm run dev:crm
npm run dev:mover-app
```

## Building Applications

Build all applications:
```bash
npm run build
```

Build individual applications:
```bash
npm run build:quote-request
npm run build:customer-portal
npm run build:crm
npm run build:mover-app
```
