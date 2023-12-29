'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

const User = () => {
  const { data: session } = useSession();

  return (
    <h1 className="text-3xl font-bold">Hello, {session?.user.username}!</h1>
  )
}

export default User