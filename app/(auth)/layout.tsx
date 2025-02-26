export default function AuthLayout({
  children
 }: {
  children: React.ReactNode;
 }) {
   return (
     <main className="justify-center items-center">
       { children }
     </main>
   );
 }
