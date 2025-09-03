# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for water management in Galician communities ("Gestión Comunal de Aguas en Galicia"). The app manages water infrastructure incidents, maintenance tasks, and quality analyses.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

### Framework & Stack
- **Next.js 15** with App Router and React 19
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components (New York variant)
- **React Hook Form** with Zod validation
- **Lucide React** for icons

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
  - `src/app/page.tsx` - Main dashboard/lobby with incidents and tasks overview
  - `src/app/layout.tsx` - Root layout with TabBar navigation
  - `src/app/dashboard/` - All dashboard functionality:
    - `incidencias/` - Incident management (create, edit)
    - `tareas/` - Task management and registration
    - `registros/` - Historical records (incidents, maintenance, analyses, water points)
    - `nuevo-registro/` - New record creation flows
    - `atencion/` - Items requiring attention
    - `mas/` - Additional features
- `src/components/ui/` - shadcn/ui components with custom navigation
- `src/lib/utils.ts` - Utility functions (cn for className merging)

### Key Features
- **Mobile-first design** with responsive TabBar navigation
- **Incident tracking** with priority levels and status management
- **Task scheduling** with due date tracking and registration
- **Water point management** including maintenance and analysis records
- **Multi-type registrations**: counters, maintenance, incidents, analyses

### Styling & Components
- Uses shadcn/ui component library configured in `components.json`
- Tailwind CSS with custom configuration
- Component aliases: `@/components`, `@/lib`, `@/hooks`
- CSS variables for theming with neutral base color

### Data Patterns
The app currently uses mock data structures for:
- Incidents (with title, location, priority, date)
- Tasks (with due dates, types: Maintenance/Analysis/Inspection)
- Water quality analyses and maintenance records

### Navigation
- **TabBar** (mobile): Home, Registros, Más
- **Desktop**: Additional navigation in header
- Route structure follows App Router conventions with dynamic segments `[id]`