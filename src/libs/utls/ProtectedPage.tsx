"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/");
      }
    };
    handleLogin();
  }, []);

  return children;
}
