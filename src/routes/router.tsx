import Main from "@/pages/layouts/Main";
import Home from "@/pages/home/Home";
import Signup from "@/pages/auth/Signup";
import Login from "@/pages/auth/Login";
import UserDashboard from "@/pages/dashboard/user/UserDashboard";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import AgentDashboard from "@/pages/dashboard/agent/AgentDashboard";
import Unauthorized from "@/pages/dashboard/Unauthorized";
import PrivateRoute from "@/routes/PrivateRoute";
import RoleRedirect from "@/pages/dashboard/RoleRedirect";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import { createBrowserRouter } from "react-router";
import UserProfile from "@/pages/dashboard/user/UserProfile";
import UserWallet from "@/pages/dashboard/user/UserWallet";
import Topup from "@/pages/dashboard/user/Topup";
import Withdraw from "@/pages/dashboard/user/Withdraw";
import SendMoney from "@/pages/dashboard/user/SendMoney";
import UserTransactions from "@/pages/dashboard/user/UserTransactions";
import AgentProfile from "@/pages/dashboard/agent/AgentProfile";
import CashIn from "@/pages/dashboard/agent/CashIn";
import AgentWallet from "@/pages/dashboard/agent/AgentWallet";
import CashOut from "@/pages/dashboard/agent/CashOut";
import AgentTransactions from "@/pages/dashboard/agent/AgentTransactions";
import AdminTransactions from "@/pages/dashboard/admin/AdminTransactions";
import AdminAllUsers from "@/pages/dashboard/admin/ManageUsers";
import AdminProfile from "@/pages/dashboard/admin/AdminProfile";
import AdminWallet from "@/pages/dashboard/admin/AdminWallet";
import ManageWallets from "@/pages/dashboard/admin/ManageWallets";

import CreateUser from "@/pages/dashboard/admin/CreateUser";
import FAQ from "@/pages/faq/FAQ";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import Features from "@/pages/features/Features";
import NotFound from "@/pages/notFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [{ path: "/", element: <Home /> }],
  },
  { path: "/features", element: <Features /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> },

  // Dashboard wrapper
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <RoleRedirect />
      </PrivateRoute>
    ),
  },

  // USER Dashboard
  {
    path: "/user-dashboard",
    element: (
      <PrivateRoute roles={["user"]}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <UserDashboard /> },
      { path: "profile", element:  <UserProfile />},
      { path: "wallet", element: <UserWallet /> },
      { path: "topup", element: <Topup /> },
      { path: "withdraw", element: <Withdraw /> },
      { path: "send-money", element: <SendMoney /> },
      { path: "transactions",  element: <UserTransactions />},
    ],
  },

  // ADMIN Dashboard
  {
    path: "/admin-dashboard",
    element: (
      <PrivateRoute roles={["admin"]}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "profile", element:  <AdminProfile />},
      { path: "wallet", element: <AdminWallet /> },
      { path: "manage-wallet", element: <ManageWallets/> },
      { path: "manage-users", element: <AdminAllUsers /> },
      { path: "create-user", element: <CreateUser /> },
      { path: "transactions",  element: <AdminTransactions />},
    ],
  },

  // AGENT Dashboard
  {
    path: "/agent-dashboard",
    element: (
      <PrivateRoute roles={["agent"]}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AgentDashboard /> },
      
      { path: "profile", element:  <AgentProfile />},
      { path: "wallet", element: <AgentWallet /> },
      { path: "cash-in", element: <CashIn /> },
      { path: "cash-out", element: <CashOut /> },
      { path: "transactions",  element: <AgentTransactions />},
    ],
  },

  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
]);
