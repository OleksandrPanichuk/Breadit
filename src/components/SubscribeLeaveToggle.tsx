'use client'

import { Button } from '@/components/ui/Button'
import { useCustomToasts } from '@/hooks/use-custom-toast'
import { useToast } from '@/hooks/use-toast'
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'

interface ISubscribeLeaveToggleProps {
	isSubscribed: boolean
	subredditId: string
	subredditName: string
}

const SubscribeLeaveToggle: FC<ISubscribeLeaveToggleProps> = ({
	isSubscribed,
	subredditId,
	subredditName
}) => {
	const { toast } = useToast()
	const { loginToast } = useCustomToasts()

	const router = useRouter()

	const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToSubredditPayload = {
				subredditId
			}

			const { data } = await axios.post<string>(
				'/api/subreddit/subscribe',
				payload
			)
			return data
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return loginToast()
				}
			}

			return toast({
				title: 'There was a problem.',
				description: 'Something went wrong. Please try again.',
				variant: 'destructive'
			})
		},
		onSuccess: () => {
			startTransition(() => {
				router.refresh()
			})
			toast({
				title: 'Subscribed!',
				description: `You are now subscribed to r/${subredditName}`
			})
		}
	})

	const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToSubredditPayload = {
				subredditId
			}

			const { data } = await axios.post('/api/subreddit/unsubscribe', payload)
			return data as string
		},
		onError: (err: AxiosError) => {
			toast({
				title: 'Error',
				description: err.response?.data as string,
				variant: 'destructive'
			})
		},
		onSuccess: () => {
			startTransition(() => {
				router.refresh()
			})
			toast({
				title: 'Unsubscribed!',
				description: `You are now unsubscribed from/${subredditName}`
			})
		}
	})

	return isSubscribed ? (
		<Button
			className="w-full mt-1 mb-4"
			isLoading={isUnsubLoading}
			disabled={isUnsubLoading}
			onClick={() => unsubscribe()}
		>
			Leave community
		</Button>
	) : (
		<Button
			isLoading={isSubLoading}
			disabled={isSubLoading}
			className="w-full mt-1 mb-4"
			onClick={() => subscribe()}
		>
			Join to post
		</Button>
	)
}

export default SubscribeLeaveToggle
