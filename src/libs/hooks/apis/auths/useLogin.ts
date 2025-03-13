import { useEffect, useState } from "react";
import { useSignMessage } from "wagmi";
import { useAccount, useDisconnect } from "wagmi";
import axiosInstance from "@/libs/apis";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const toast = useToast();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  const login = async (): Promise<boolean> => {
    try {
      if (!address) return false;

      const storedAddress = localStorage.getItem("walletAddress");
      const token = localStorage.getItem("accessToken");

      if (storedAddress === address && token) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
        return true;
      }

      if (storedAddress !== address || !token) {
        localStorage.removeItem("accessToken");
        localStorage.setItem("walletAddress", address || "");

        const message = "Welcome to ADCS.";
        const signature = await signMessageAsync({ message });
        const response: { accessToken: string } = await axiosInstance.post(
          "auth/verify",
          {
            message,
            signature,
          }
        );

        if (response) {
          localStorage.setItem("accessToken", response.accessToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`;
          setIsLogin(true);
          return true;
        } else {
          toast({
            title: "Authentication failed",
            description: "Please try again",
            status: "error",
          });
          return false;
        }
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      disconnect();
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("walletAddress");
    disconnect();
    setIsLogin(false);
    router.push("/");
  };

  const checkUserHasLogin = (): boolean => {
    if (!address) return false;
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? true : false;
  };

  useEffect(() => {
    if (!address) return;
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress && storedAddress !== address) {
      logout();
    }
  }, [address]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(token ? true : false);
  }, []);

  return { login, logout, address, isConnected, isLogin, checkUserHasLogin };
}
