# Migration Guide: Quote Request Form to Monorepo

This guide provides step-by-step instructions for migrating the Quote Request Form application from the root directory to the monorepo structure at `/apps/quote-request`.

## Overview

The current Quote Request Form application is fully functional and ready for migration. The application uses relative imports throughout, making it straightforward to relocate without breaking dependencies.

## Pre-Migration Checklist

- [x] Monorepo structure created (`/apps` and `/packages` directories)
- [x] Root-level `package.json` configured with workspaces
- [x] Shared package configurations created
- [x] Base TypeScript configuration established
- [ ] Current application tested and verified working
- [ ] Backup of current state created

## Migration Steps

### Step 1: Create Quote Request App Structure

```bash
mkdir -p apps/quote-request
```

### Step 2: Move Application Files

Move the following files and directories to `/apps/quote-request`:

```bash
mv src apps/quote-request/
mv index.html apps/quote-request/
mv vite.config.ts apps/quote-request/
mv tsconfig.app.json apps/quote-request/
mv tsconfig.node.json apps/quote-request/
mv eslint.config.js apps/quote-request/
mv tailwind.config.js apps/quote-request/
mv postcss.config.js apps/quote-request/
```

### Step 3: Move Environment Variables

```bash
mv .env apps/quote-request/.env
```

**Note:** Each app will have its own `.env` file for app-specific configuration.

### Step 4: Create App-Specific package.json

Create `/apps/quote-request/package.json`:

```json
{
  "name": "@moving-company/quote-request",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit -p tsconfig.app.json"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.57.4",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

### Step 5: Update Root package.json Scripts

Update the root `package.json` to add app-specific scripts:

```json
{
  "scripts": {
    "dev": "npm run dev --workspace=@moving-company/quote-request",
    "build": "npm run build --workspace=@moving-company/quote-request",
    "lint": "npm run lint --workspace=@moving-company/quote-request",
    "preview": "npm run preview --workspace=@moving-company/quote-request",
    "typecheck": "npm run typecheck --workspace=@moving-company/quote-request",
    "dev:quote": "npm run dev --workspace=@moving-company/quote-request",
    "build:quote": "npm run build --workspace=@moving-company/quote-request",
    "clean": "rm -rf node_modules apps/*/node_modules packages/*/node_modules",
    "clean:build": "rm -rf dist apps/*/dist packages/*/dist"
  }
}
```

### Step 6: Update TypeScript Configuration

Update `/apps/quote-request/tsconfig.app.json` to extend the base config:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### Step 7: Update Tailwind Configuration

Update `/apps/quote-request/tailwind.config.js` to use relative paths:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Step 8: Update Vite Configuration (if needed)

The existing Vite config should work as-is, but verify paths are relative.

### Step 9: Reinstall Dependencies

```bash
npm install
```

This will set up workspace linking and install dependencies for all packages.

### Step 10: Test the Application

```bash
npm run dev:quote
```

Verify that:
- The application starts without errors
- All pages and components load correctly
- No import errors in the console
- Hot module replacement (HMR) works
- Build process completes successfully

```bash
npm run build:quote
```

### Step 11: Clean Up Root Directory

After successful migration, remove the old files from root:

```bash
rm -rf src
rm index.html
rm package.json.backup
```

Keep these files in root:
- `package.json` (workspace root)
- `tsconfig.base.json`
- `.gitignore`
- `README.md`
- `MIGRATION.md`
- `/apps` directory
- `/packages` directory

## Post-Migration Tasks

### Identify Shared Components for Extraction

Review the following components that should eventually move to `@moving-company/ui`:

**UI Components:**
- `/src/components/ui/buttons/*` → `@moving-company/ui/buttons`
- `/src/components/ui/forms/*` → `@moving-company/ui/forms`
- `/src/components/ui/data-display/*` → `@moving-company/ui/data-display`
- `/src/components/ui/overlay/*` → `@moving-company/ui/overlay`

**Utilities:**
- `/src/utils/helpers/*` → `@moving-company/utils/helpers`

**Types:**
- Extract interfaces and types from components → `@moving-company/types`

### Next Steps

1. Test the migrated application thoroughly
2. Update documentation with new file paths
3. Consider extracting shared components to packages
4. Set up the next application (customer-portal)
5. Implement consistent styling across all apps

## Troubleshooting

### Import Errors After Migration

If you encounter import errors, verify:
- All relative paths are correct
- TypeScript configuration extends the base config
- Dependencies are installed in the correct location

### Vite Build Errors

Ensure:
- `index.html` is in the correct location
- Vite config paths are relative
- Output directory is properly configured

### Environment Variable Issues

Verify:
- `.env` file is in the app directory
- Environment variables use the `VITE_` prefix
- Variables are being loaded by Vite

## Rollback Plan

If migration fails:

1. Restore from backup:
   ```bash
   git reset --hard HEAD
   ```

2. Or manually move files back:
   ```bash
   mv apps/quote-request/src ./
   mv apps/quote-request/index.html ./
   # ... move other files back
   ```

3. Restore original `package.json`:
   ```bash
   cp package.json.backup package.json
   npm install
   ```

## Migration Verification Checklist

- [ ] Application starts without errors
- [ ] All routes and pages are accessible
- [ ] Components render correctly
- [ ] Forms submit properly
- [ ] API calls work (Supabase connection)
- [ ] Build process completes successfully
- [ ] TypeScript compilation has no errors
- [ ] Linting passes
- [ ] Hot module replacement works in development

## Notes

- The current application uses only relative imports, making it safe to relocate
- No path aliases (`@/`) are used, so no import rewrites are needed
- All configuration files are self-contained and portable
- The application has no external file dependencies outside its directory structure
- Supabase environment variables are properly scoped to the application

## Support

If you encounter issues during migration, refer to:
- Root `README.md` for monorepo structure overview
- `/apps/README.md` for application-specific documentation
- `/packages/README.md` for shared package documentation
