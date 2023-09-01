'use client'
import { FC, useState } from "react"
import { signIn } from 'next-auth/react'

import { cn } from "@/lib/utils"
import { Button } from "./ui/Button"
import { Icons } from "./Icons"
import { useToast } from "@/hooks/use-toast"


interface IUserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {

}


const UserAuthForm: FC<IUserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true)
      await signIn('google')
    } catch (err) {
      toast({
        title: 'There was a problem.',
        description: 'There was an error logging in with Google.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div {...props} className={cn('flex justify-center', className)}>
      <Button isLoading={isLoading} disabled={isLoading} onClick={() => loginWithGoogle()} size={'sm'} className="w-full" >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm