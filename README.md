

## 📌 Project Overview

**DigiPay** is a modern, responsive, and role-based client application for the DigiPay digital wallet system, similar to popular digital wallets like Bkash or Nagad.  

This frontend is built using **React (Vite)**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**. It communicates seamlessly with the backend API to provide a secure, fast, and user-friendly experience for **Admins**, **Agents**, and **Users**.  

The application allows users to manage their wallets, view transaction history, and perform financial operations such as sending money, withdrawing, and cashing in/out (for Agents). Admins can manage users, approve or suspend agents, view all transactions, and block/unblock wallets.  

---

## 🚀 Features

### Role-Based Access

- **Admin:**  
  - Manage all users and agents  
  - Approve or suspend agents  
  - Block or unblock user wallets  
  - View all transactions across the platform  
  - Toggle user/agent roles  

- **Agent:**  
  - Perform cash-in (add money) and cash-out (withdraw money) operations for users  
  - Access user transaction history  

- **Normal User:**  
  - View personal wallet balance and transaction history  
  - Perform top-up (add money), withdraw money, and send money to other users  

### General Frontend Features

- ✅ Authentication & role-based authorization using JWT  
- ✅ Responsive UI with Tailwind CSS and shadcn/ui components  
- ✅ Loading spinners and error handling using RTK Query  
- ✅ Interactive dashboards for Admin, Agent, and User  
- ✅ Copy-to-clipboard functionality for Auth IDs  
- ✅ SweetAlert2 for notifications and confirmations  
- ✅ Modern reusable components for buttons, cards, inputs, avatars, badges, etc.  

---

---

## 🛠️ Technologies Used

- **Frontend Framework:** React (Vite)  
- **Language:** TypeScript  
- **State Management:** Redux Toolkit & RTK Query  
- **Styling:** Tailwind CSS, shadcn/ui  
- **Routing:** React Router DOM  
- **Icons:** lucide-react  
- **Notifications & Alerts:** SweetAlert2  
- **Backend API:** Node.js, Express.js, MongoDB  

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/2244jhalak/DigiPay.git
cd B5A5-DigiPay-Frontend
