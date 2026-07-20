import { LoginForm } from "@/components/admin/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — Until You",
  robots: "noindex, nofollow",
};

export default function AdminLoginPage() {
  return <LoginForm />;
}
