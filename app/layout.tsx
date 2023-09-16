import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import RegisterModel from '@/components/models/RegisterModel'
import LoginModel from '@/components/models/LoginModel'
import ToastProvider from '@/providers/ToastProvider'
import getCurrentUser from './actions/getCurrentUser'
import RentModel from '@/components/models/RentModel'
import SearchModel from '@/components/models/SearchModel'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <RegisterModel />
        <LoginModel />
        <RentModel />
        <SearchModel />
        <ToastProvider />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
