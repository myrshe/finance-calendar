import { Header } from "@/widgets/header";

export function MainLayout({children}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main>
                {children}
            </main>
        </div>
    )
}