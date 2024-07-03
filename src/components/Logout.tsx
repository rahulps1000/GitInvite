"use client"
import { signOut } from "next-auth/react"

const Logout = () => {
  return (
    <button onClick={() => signOut()}>Logout</button>
  )
}

export default Logout