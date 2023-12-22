'use client'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { ExtendedPost } from '@/types/db.d'
import Post from './Post'
import { Loader2 } from 'lucide-react'

interface IPostFeedProps {
	initialPosts: ExtendedPost[]
	subredditName?: string
}

const PostFeed: React.FunctionComponent<IPostFeedProps> = ({
	initialPosts,
	subredditName
}) => {
	const lastPostRef = useRef<HTMLElement>(null)
	const { data: session } = useSession()
	const { ref, entry } = useIntersection({
		root: lastPostRef.current,
		threshold: 1
	})

	const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		['infinite-query'],
		async ({ pageParam = 1 }) => {
			const query =
				`/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
				(!!subredditName ? `&subredditName=${subredditName}` : '')

			const { data } = await axios.get(query)
			return data as ExtendedPost[]
		},
		{
			getNextPageParam: (_, pages) => {
				return pages.length + 1
			},
			initialData: { pages: [initialPosts], pageParams: [1] },
		}
	)
	const posts = data?.pages.flatMap((page) => page) ?? initialPosts

	useEffect(() => {
		if (entry?.isIntersecting) {
			fetchNextPage()
		}
	}, [entry, fetchNextPage])

	return (
		<ul className="flex flex-col col-span-2 space-y-6">
			{posts?.map((post, i) => {
				const votesAmt = post.votes.reduce((acc, vote) => {
					if (vote.type === 'UP') return acc + 1
					if (vote.type === 'DOWN') return acc - 1
					return acc
				}, 0)

				const currentVote = post.votes.find(
					(vote) => vote.userId === session?.user.id
				)

				if (i === posts.length - 1) {
					return (
						<li key={post.id} ref={ref}>
							<Post
								post={post}
								subredditName={post.subreddit.name}
								commentAmt={post.comments.length}
								currentVote={currentVote}
								votesAmt={votesAmt}
							/>
						</li>
					)
				}

				return (
					<li key={post.id}>
						<Post
							post={post}
							subredditName={post.subreddit.name}
							commentAmt={post.comments.length}
							currentVote={currentVote}
							votesAmt={votesAmt}
						/>
					</li>
				)
			})}
			{isFetchingNextPage && (
				<li className="flex justify-center">
					<Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
				</li>
			)}
		</ul>
	)
}

export default PostFeed
