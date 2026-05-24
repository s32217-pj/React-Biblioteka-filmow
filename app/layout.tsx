'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./components/Nav";
import Notifications from "./components/Notifications"
import {FilmProvider} from "./context/FilmContext"
import {ThemeProvider} from "./context/ThemeContext"
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>

          <FilmProvider>
            <Nav />
            <Notifications />
            {children}
          </FilmProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
