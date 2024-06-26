import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { ClerkProvider } from '@clerk/nextjs'

import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toasr-provider'

export const metadata = {
	title: 'Admin Dashboard',
	description: 'Admin Dashboard'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<ToasterProvider />
					<ModalProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
