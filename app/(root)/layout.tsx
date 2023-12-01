import Topbar from "@/components/nav/Topbar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Topbar />
            <main>
                {children}
            </main>
        </div>
    )
}
