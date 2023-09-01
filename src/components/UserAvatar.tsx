import { User } from 'next-auth'
import { FC } from 'react'
import { Avatar, AvatarFallback} from '@/components/ui/Avatar'
import { Icons } from './Icons'
import { AvatarProps } from '@radix-ui/react-avatar'
import Image from 'next/image'

interface IUserAvatarProps extends AvatarProps {
	user: Pick<User, 'name' | 'image'>
}

const UserAvatar: FC<IUserAvatarProps> = ({ user, ...props }) => {
	return (
		<Avatar {...props}>
			{user.image ? (
				<Image
					fill
					src={user.image}
					alt="profile picture"
					referrerPolicy="no-referrer"
				/>
			) : (
				<AvatarFallback className="">
					<span className="sr-only">{user?.name}</span>
					<Icons.user className="h-4 w-4 rounded-full" />
				</AvatarFallback>
			)}
		</Avatar>
	)
}

export default UserAvatar
