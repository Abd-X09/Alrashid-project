# Price Comparator App

## Overview

This is a full-stack price comparison application built with React, TypeScript, Express.js, and PostgreSQL. The app allows users to browse products across different categories and regions, view pricing information, vote on price accuracy, and add new products. It features a bilingual interface supporting both Arabic and English with right-to-left (RTL) layout support for Arabic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: Zustand for client-side state (i18n) and TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: Custom i18n solution with Arabic and English support, including RTL layout

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **Build Tool**: ESBuild for production builds
- **Development**: tsx for TypeScript execution in development

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless connection
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection Pooling**: Neon serverless pool with WebSocket support

### Database Schema Design
- **Categories**: Product categorization (food, cleaning, medicine, personal care)
- **Regions**: Geographic regions with currency support (Saudi Arabia, UAE, Egypt, USA)
- **Products**: Core product information with bilingual names and descriptions
- **Product Prices**: Region-specific pricing with voting mechanism
- **Product Votes**: User voting system for price accuracy
- **Price History**: Historical price tracking for trend analysis

### API Structure
- **RESTful Design**: Standard HTTP methods with JSON responses
- **Error Handling**: Centralized error middleware with proper status codes
- **Logging**: Request/response logging with performance metrics
- **Validation**: Zod schema validation for API inputs

### Authentication and Authorization
- **Session-based Authentication**: Using express-session with PostgreSQL store
- **IP-based Voting**: Vote tracking by user IP address to prevent duplicate votes
- **No User Registration**: Anonymous usage with IP-based rate limiting

## External Dependencies

### Core Framework Dependencies
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database operations and schema management
- **TanStack Query**: Server state management and caching
- **Shadcn/ui**: Pre-built accessible UI components
- **Radix UI**: Headless UI primitives for complex components

### Development and Build Tools
- **Vite**: Frontend build tool with React plugin
- **ESBuild**: Backend bundling for production
- **TypeScript**: Static type checking across the stack
- **Tailwind CSS**: Utility-first CSS framework

### Data Handling Libraries
- **Zod**: Runtime type validation and schema parsing
- **React Hook Form**: Form state management and validation
- **date-fns**: Date manipulation with internationalization support

### UI and Interaction Libraries
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management
- **clsx**: Conditional CSS class composition
- **cmdk**: Command palette and search interface