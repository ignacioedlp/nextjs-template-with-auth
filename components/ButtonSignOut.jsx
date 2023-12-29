"use client"
import React from 'react'
import { signOut } from "next-auth/react";


function ButtonSignOut() {
  return (
    <button className=" bg-red-600 px-5 py-2 rounded-md" onClick={async () => await signOut()}>
      Logout
    </button>
  )
}

export default ButtonSignOut