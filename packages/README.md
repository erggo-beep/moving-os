# Shared Packages

This directory contains shared packages used across multiple applications in the monorepo.

## Packages

### UI Components (`@moving-company/ui`)
Reusable React components shared across all applications. This ensures consistent design and behavior throughout the platform.

**Planned components:**
- Buttons, forms, and input elements
- Cards and data display components
- Modals, dialogs, and overlays
- Navigation components
- Layout components

**Status:** Ready for migration of existing UI components from quote-request app

### Utilities (`@moving-company/utils`)
Shared utility functions and helpers used across applications.

**Planned utilities:**
- Date/time helpers
- Formatting functions
- Validation helpers
- API utilities
- Common business logic

**Status:** Ready for migration of existing utils from quote-request app

### Types (`@moving-company/types`)
Shared TypeScript type definitions and interfaces used across the platform.

**Planned types:**
- Customer and booking types
- Inventory and item types
- Service and pricing types
- User and authentication types
- API request/response types

**Status:** Ready for migration of existing types from quote-request app

## Using Packages

Import shared packages in your application:

```typescript
import { Button, Modal } from '@moving-company/ui';
import { formatDate, calculateVolume } from '@moving-company/utils';
import type { Customer, Booking } from '@moving-company/types';
```

## Development

Each package has its own `package.json` and can be developed independently. Changes to shared packages are immediately available to all applications through workspace linking.
