import Link from "next/link";
import Header from "@/components/molecules/Header";

export default function MarketplaceLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col">
      <Header />
      { children }
    </main>
  );
}