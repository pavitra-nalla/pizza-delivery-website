import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import MenuPage from "./pages/MenuPage";
import DashboardPage from "./pages/DashboardPage";
import PizzaBuilderPage from "./pages/PizzaBuilderPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pizza-builder" element={<PizzaBuilderPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-tracking" element={<OrderTrackingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
