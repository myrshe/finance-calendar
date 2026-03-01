import { UserMenu } from "@/features/auth/user-menu/ui/UserMenu";
import { navigation } from "@/shared/config/routes/navigation";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed left-1/2 -translate-x-1/2 top-2 w-[89vw] min-h-[60px] px-8 bg-background rounded-xl flex justify-between items-center">
      <div className="w-full flex items-center justify-between">
        <nav className="h-full flex items-center gap-[2.25rem]">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-base h-[3.4rem] flex items-center rounded-xl px-1 ${isActive ? "bg-foreground text-background" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div>
        <UserMenu />
      </div>
    </header>
  );
};
