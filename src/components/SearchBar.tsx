'use client'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState, useRef } from 'react'
import { Prisma, Subreddit } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { Users, Loader2 } from 'lucide-react'
import debounce from 'lodash.debounce'

import axios from 'axios'
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandEmpty
} from './ui/Command'

import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const SearchBar = () => {
	const [input, setInput] = useState<string>('')

	const commandRef = useRef<HTMLDivElement>(null)

	useOnClickOutside(commandRef, () => {
		setInput('')
	})

	const {
		data: queryResults,
		refetch,
		isFetched
	} = useQuery({
		queryFn: async () => {
			if (!input) return []

			const { data } = await axios.get(`/api/search?q=${input}`)
			return data as (Subreddit & {
				_count: Prisma.SubredditCountOutputType
			})[]
		},
		queryKey: ['search-query'],
		enabled: false
	})

	const request = debounce(() => {
		refetch()
	}, 300)

	const debounceRequest = useCallback(() => {
		request()
	}, [])

	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		setInput('')
	}, [pathname])


	return (
		<Command
			ref={commandRef}
			className="relative rounded-lg border max-w-lg z-50 overflow-visible"
		>
			<CommandInput
				className="outline-none border-none focus:border-none focus:outline-none ring-0"
				placeholder="Search communities..."
				value={input}
				onValueChange={(text) => {
					setInput(text)
					debounceRequest()
				}}
			/>
			{input.length > 0 && (
				<CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
					{isFetched && <CommandEmpty>No results found.</CommandEmpty>}
					{(queryResults?.length ?? 0) > 0 && (
						<CommandGroup heading="Communities">
							{queryResults?.map((result) => (
								<CommandItem
									key={result.id}
									onSelect={(e) => {
										router.push(`/r/${e}`)
										router.refresh()
									}}
									value={result.name}
								>
									<Users className="mr-2 h-4 w-4" />
									<a href={`/r/${result.name}`}>{result.name}</a>
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			)}
		</Command>
	)
}

export default SearchBar
