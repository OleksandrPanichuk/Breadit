import Link from "next/link"
import { redirect } from 'next/navigation'

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/Button"
import SignUp from "@/components/SignUp"
import { getAuthSession } from "@/lib/auth"
import { ChevronLeft } from "lucide-react"


const page = async () => {
  const auth = await getAuthSession()
  if (auth?.user.id) return redirect('/')
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link href={'/'} className={cn(buttonVariants({ variant: 'ghost' }), 'self-start -mt-20')}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>
        <SignUp />
      </div>
    </div>
  )
}
export default page

