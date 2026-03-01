import { Link } from "react-router-dom";
import { useUser } from "@/entities/user/model/useUser";
import { routes } from "@/shared/config/routes/routes";
import { LoginButton } from "@/features/auth/login-button";
import PersonalAccountIcon from '@/shared/assets/icons/logoPersonalAcount.svg?react'

export const UserMenu = () => {
  const { user } = useUser();

  if (!user) {
    return <LoginButton />;
  }

  return (
    <Link to={routes.profile} className="flex gap-3">
      <PersonalAccountIcon />
      {user.name}
    </Link>
  );
};
