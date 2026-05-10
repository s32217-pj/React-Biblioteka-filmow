'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./components/Nav";
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
