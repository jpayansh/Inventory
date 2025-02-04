# Inventory Management System

## Overview
This is a **Full-Stack Inventory Management System** built with **Next.js (TypeScript)** for the frontend and **PostgreSQL** as the database. The system allows managing products, vendors, stock, orders, and invoices with features like authentication, invoice generation (PDF download), and order processing.

## Features
- **User Authentication**: Secure login system.
- **Products Management**: Add, view, and manage products.
- **Companies Management**: Add, view, and manage companies.
- **Stock Management**: Add stock linked with existing products.
- **Order Management**: Place orders from existing companies and available stock.
- **Proforma Invoice Generation**: Generate and download invoices before finalizing the order.
- **Order Completion & Final Invoice**: Once an order is completed, it moves to the invoices table with a unique invoice number.
- **Tables for Data Management**:
  - Products Table
  - Vendors Table
  - Orders Table
  - Invoices Table

## Tech Stack
- **Frontend**: Next.js (TypeScript)
- **Backend**: API Routes in Next.js
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **PDF Generation**: `pdf-lib` or `react-pdf`

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (LTS version)
- PostgreSQL
- Yarn or npm

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd inventory-management
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up the database:
   - Create a PostgreSQL database.
   - Configure `.env` file:
     ```env
     DATABASE_URL=postgresql://user:password@localhost:5432/inventory_db
     ```
4. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Usage
- **Login** to access the dashboard.
- **Manage Products & Companies** before adding stock.
- **Add Stock** to track product inventory.
- **Create Orders** from available stock and vendors.
- **Generate & Download Proforma Invoice** before finalizing orders.
- **Complete Orders** to move them to invoices.
- **View Invoices** with unique invoice numbers.

## Future Enhancements
- Role-based access control (Admin/User)
- Enhanced dashboard analytics
- Email notifications for orders

## License
This project is open-source and available under the [MIT License](LICENSE).

## Contact
For queries or contributions, reach out at `your-email@example.com`. 🚀

