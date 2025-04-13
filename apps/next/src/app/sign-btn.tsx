'use client'
import { createAuthClient } from "better-auth/react";
import { anonymousClient } from "better-auth/client/plugins"
import {useEffect, useState} from "react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    anonymousClient()
  ]
})

export const {
  signIn,
  signOut,
  signUp,
  useSession
} = authClient;


export default function SignInBtn() {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = useSession()
  console.log("session", session)
  const loggedIn = !!session
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/me').then(res => res.json())
      .then(res => {
        console.log("me",res);
      })
  }, [loggedIn])

  return <>
    <button
      className={"w-fit m-2 border p-2 text-center"}
      disabled={loading}
      onClick={async () => {
        await signIn.anonymous();
      }}
    >
      Sign in Anonymous
    </button>
  </>
}