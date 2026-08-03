import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { auth, signOut } from '../../auth';


const AuthButtons = async () => {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          Hi, {session.user.name}
        </span>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button variant="ghost" className="font-medium" type="submit">
            Logout
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" className="font-medium" >
        <Link href="/signin">Login</Link>
      </Button>

      <Button className="font-medium shadow-sm" >
        <Link href="/sign-up">Register</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;