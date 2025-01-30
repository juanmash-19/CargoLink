import Link from "next/link";
export default function MarketPlaceLayout8({
children
}:{
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col">
            <header className="w-full shawdow-lg h-20 flex items-center justify-center">
               <Link className="bg-red-400 p-5 rounded-lg" href="/marketplace/product">Go to</Link>
            </header>
            { children }
        </main>

    );
}
