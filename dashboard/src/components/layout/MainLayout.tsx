'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, DollarSign, Activity, Target } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-3xl font-bold text-gray-900">Personal Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Track your finances, fitness, and goals</p>
      </div>
    </header>
  );
}

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Overview', icon: Home },
    { href: '/finances', label: 'Finances', icon: DollarSign },
    { href: '/fitness', label: 'Fitness', icon: Activity },
    { href: '/goals', label: 'Goals', icon: Target },
  ];

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
