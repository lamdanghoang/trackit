import Footer from "./Footer";
import Header from "./Header";
import WalletProvider from "@/components/WalletProvider";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <WalletProvider>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Header />
                {children}
                <Footer />
            </main>
        </WalletProvider>
    );
}

export default Layout;