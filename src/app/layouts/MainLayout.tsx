import { Header } from "@/widgets/header";

export function MainLayout({children}) {
    return (
      <div className="min-h-screen flex flex-col px-2">
        <Header />
        <main className="mt-20 w-full max-w-[1702px] mx-auto ">
          {children}
        </main>
      </div>
    );
}