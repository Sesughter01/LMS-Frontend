import { Providers } from '@/store/provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

import { ToastContainer } from 'react-toastify';


export const metadata: Metadata = {
  title: 'Ingryd Digital Academy',
  description: 'Ingryd DIgital Academy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Providers>
          <>
            {children}

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {/* Same as */}
            <ToastContainer />
          </>
        </Providers>
    
  )
}

// <html lang="en">
//       <body className={inter.className}>

//       </body>
//     </html>