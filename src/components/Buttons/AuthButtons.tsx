import React from 'react'
import Link from 'next/link'
import {Button} from "@/components/ui/button"
const AuthButtons = () => {
  return (
    <div>
        <div className="flex items-center gap-3">
          <Button variant="ghost"  className="font-medium">
            <Link href="/signin">Login</Link>
          </Button>

          <Button  className="font-medium shadow-sm">
            <Link href="/signup">Register</Link>
          </Button>
        </div>
    </div>
  )
}

export default AuthButtons