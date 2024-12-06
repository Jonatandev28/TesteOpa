'use client'

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const index = () => {
  const router = useRouter()
  const { data } = useAuth()

  useEffect(() => {
    if (data) {
      router.push('/chat')
    } else {
      router.push('/login')
    }
  }, [data])

  return null
}

export default index
