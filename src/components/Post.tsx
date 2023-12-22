import { formatTimeToNow } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useRef, FC, memo } from 'react'

import PostVoteClient from './post-vote/PostVoteClient'
import { Post, User, Vote } from '@prisma/client'
import EditorOutput from './editorjs-renderer'

type PartialVote = Pick<Vote, 'type'>
interface IPostProps {
	post: Post & {
		author: User
		votes: Vote[]
	}
	subredditName: string
	commentAmt: number
	votesAmt: number
	currentVote?: PartialVote
}

const Post = memo(({
	post,
	subredditName,
	commentAmt,
	votesAmt,
	currentVote
}: IPostProps) => {
	const pRef = useRef<HTMLDivElement>(null)
	return (
		<div className="rounded-md bg-white shadow">
			<div className="px-6 py-4 flex justify-between">
				<PostVoteClient
					initialVotesAmt={votesAmt}
					postId={post.id}
					initialVote={currentVote?.type}
					className="flex-col"
				/>

				<div className="w-0 flex-1">
					<div className="max-h-40 mt-1 text-sm text-gray-500">
						{subredditName && (
							<>
								<a
									href={`/r/${subredditName}`}
									className="underline text-zinc-900 text-sm underline-offset-2"
								>
									r/{subredditName}
								</a>
								<span className="px-1">•</span>
							</>
						)}
						<span>Posted by u/{post.author.username}</span>{' '}
						{formatTimeToNow(new Date(post.createdAt))}
					</div>
					<a href={`/r/${subredditName}/post/${post.id}`}>
						<h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
							{post.title}
						</h1>
					</a>

					<div
						className="relative text-sm max-h-40 w-full overflow-clip"
						ref={pRef}
					>
						{post.content && (
							//@ts-ignore
							<EditorOutput data={post.content} />
						)}
						{pRef.current?.clientHeight === 160 && (
							<div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
						)}
					</div>
				</div>
			</div>
			<div className="bg-gray-50 z-20 text-sm p-4 sm:px-6">
				<Link
					href={`/r/${subredditName}/post/${post.id}`}
					className="w-fit flex items-center gap-2"
				>
					<MessageSquare className="h-4 w-4" /> {commentAmt} comments
				</Link>
			</div>
		</div>
	)
})

Post.displayName = 'Post'

export default Post
