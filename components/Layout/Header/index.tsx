"use client";
import GlobalContext from "@/context/store";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import Link from "next/link";
import { useContext } from "react";

const Header = () => {
    const { chain, setChain, chainInstance } = useContext(GlobalContext);

    const changeHandler = (value: string) => {
        setChain(value);
    }

    return (
        <header className="p-4 mx-auto w-full max-w-5xl flex items-center justify-between font-mono text-sm">
            <div className="text-3xl font-bold"><Link href={"/"}>Trackit</Link></div>
            <nav className="flex gap-20">
                <Link href={"/"}>My assets</Link>
                <Link href={"/top-holders"}>Top holders</Link>
            </nav>
            <div className="flex items-center gap-1">
                <select
                    className="py-2 rounded-lg"
                    onChange={(e) => changeHandler(e.target.value)}
                    name="chain" id="chain"
                >
                    <option value="apt">APT</option>
                    <option value="sui">SUI</option>
                    <option value="icp">ICP</option>
                </select>
                <WalletSelector />
            </div>
        </header>
    )
}

export default Header;