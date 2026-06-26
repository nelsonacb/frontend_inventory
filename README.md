# 🖥️ Inventory Management Frontend

[![React](https://img.shields.io/badge/React-18.x-61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4.x-brown)](https://zustand-demo.pmnd.rs/)
[![TanStack Table](https://img.shields.io/badge/TanStack_Table-8.x-FF4154)](https://tanstack.com/table)

> A modern, responsive web application for small retail inventory management. Built with React, TypeScript, Tailwind CSS, Zustand, and TanStack Table.

![App Screenshot](./screenshot.png) <!-- You can replace with your actual screenshot -->

## ✨ Features

- 🔐 **Authentication** – Login & register with JWT
- 📊 **Dashboard** – Key metrics, sales chart, low‑stock alerts
- 📦 **Product Management** – Full CRUD, QR code generation, barcode scanning
- 🏷️ **Category Management** – CRUD with color labels
- 🏢 **Warehouse Management** – Multi‑warehouse support
- 🔄 **Stock Movements** – Record purchases, sales, adjustments, transfers
- 🔔 **Alerts** – Real‑time low‑stock notifications
- 📈 **Reports** – Sales trends with Recharts, CSV export
- 📸 **QR/Barcode Scanner** – Scan from camera
- 🌐 **Responsive** – Works on mobile, tablet, and desktop

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see [backend README]

### Installation

```bash
git clone <your-repo-url>
cd frontend
npm install
```

## Environment Variables

Create a .env file:
VITE_API_BASE_URL=http://localhost:5000/api

## Development Server

npm run dev
The app will be available at http://localhost:3000.

## Build for Production

npm run build

## 🗂️ Project Structure

src/
├── services/ # Axios client and API services
├── components/ # Reusable UI components
│ ├── forms/ # Form components
│ ├── layout/ # Sidebar, Header, Layout
│ ├── tables/ # Table components (using TanStack Table)
│ └── ui/ # Buttons, Modals, DataTable, etc.
├── hooks/ # Custom hooks (useToast, useAuth, etc.)
├── pages/ # Page views (Dashboard, Products, etc.)
├── store/ # Zustand stores (auth, products, categories, etc.)
├── interfaces/ # TypeScript interfaces
├── utils/ # Helper functions
├── routes/ # React Router configuration
├── main.tsx
└── index.css

## 🧭 Navigation (Sidebar)

Dashboard

Products

Categories

Warehouses

Movements

Alerts

Reports

QR Scanner

## 📄 License

MIT
