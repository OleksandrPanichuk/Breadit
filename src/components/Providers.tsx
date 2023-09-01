'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
	const client = new QueryClient({})

	return (
		<QueryClientProvider client={client}>
			<SessionProvider>{children}</SessionProvider>
		</QueryClientProvider>
	)
}

export default Providers
