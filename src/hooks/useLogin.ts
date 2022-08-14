import { useState } from "react";

const useLogin = (
  API_URL?: string
): [boolean, (token: string, email: string) => void] => {
  const [status, setStatus] = useState<boolean>(false);

  const handleLogin = (token: string, email: string) => {
    fetch(`${API_URL ?? process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        account: process.env.NEXT_PUBLIC_ACCOUNT!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, email }),
    }).then((res) => setStatus(res.ok));
  };

  return [status, handleLogin];
};

export default useLogin;
