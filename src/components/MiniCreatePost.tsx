'use client'

import { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'
import { ImageIcon, Link2 } from 'lucide-react'

import UserAvatar from '@/components/UserAvatar'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface IMiniCreatePostProps {
	session: Session | null
}

const MiniCreatePost: FC<IMiniCreatePostProps> = ({ session }) => {
	const router = useRouter()
	const pathname = usePathname()
	
	return (
		<li className="overflow-hidden rounded-md bg-white shadow list-none">
			<div className="h-full px-6 py-4 flex flex-wrap justify-between gap-3 md:gap-6">
				<div className="relative">
					<UserAvatar
						user={{
							name: session?.user.name ?? null,
							image: session?.user.image ?? null
						}}
					/>
				</div>
				<Input
					readOnly
					placeholder="Create post"
					onClick={() => router.push(pathname + '/submit')}
				/>
				<div className="flex items-center gap-6">
					<Button
						variant={'ghost'}
						onClick={() => router.push(pathname + '/submit')}
					>
						<ImageIcon className="text-zinc-600" />
					</Button>
					<Button
						onClick={() => router.push(pathname + '/submit')}
						variant="ghost"
					>
						<Link2 className="text-zinc-600" />
					</Button>
				</div>
			</div>
		</li>
	)
}

export default MiniCreatePost
