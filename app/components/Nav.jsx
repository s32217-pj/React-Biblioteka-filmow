'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/filmy', label: 'Filmy' },
];

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="navbar navbar-dark bg-dark py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" className="navbar-brand fw-bold fs-4">
          Biblioteka Filmów
        </Link>

        <div className="d-flex gap-3">
          {
            links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href
                  ? 'text-warning fw-semibold'
                  : 'text-white'
                  }`}
              >
                {link.label}
              </Link>
            ))
          }
        </div>
      </div>
    </nav>
  )
}