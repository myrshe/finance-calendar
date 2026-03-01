import { Button } from "@/shared/ui/button";

export const LoginButton = () => {
  const handleLogin = () => {
    console.log("Login");
  };

  return <Button onClick={handleLogin}>Войти</Button>;
};