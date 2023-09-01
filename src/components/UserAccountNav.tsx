"use client"

import { User } from 'next-auth';
import { FC } from 'react';


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import UserAvatar from './UserAvatar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Grid, LogOut, Plus, Settings } from 'lucide-react';

interface IUserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<IUserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar className='h-8 w-8' user={{
          image: user.image || null,
          name: user.name || null
        }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user?.name && <p className='font-medium'>{user.name}</p>}
            {user?.email && <p className='font-medium truncate text-sm text-zinc-700 w-[200px]'>{user.email}</p>}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={'/'}>
            <Grid className='h-4 w-4 mr-2' />
            Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/r/create'}>
            <Plus className='h-4 w-4 mr-2' />
            Create community</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/settings'}>
            <Settings className='h-4 w-4 mr-2' />
            Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={(event) => {
          event.preventDefault()
          signOut({
            callbackUrl: `${window.location.origin}/sign-in`
          })
        }} className='cursor-pointer'>
          <LogOut className='h-4 w-4 mr-2' />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
