import React from 'react'

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}){
  return (
    <main className='flex gap-10 justofy-between h-full bg-slate-300'>
        <section className='flex-1 bg-red-400'>This is the AuthLayout</section>
        <section className='flex-1'>
            {children}
        </section>
    </main>
  );
}
