'use client'

import DefaultInput from "@/components/forms/DefaultInput"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { api } from "@/service/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { generateRandomNumber } from "@/utils/functions"

const schema = z
  .object({
    email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
    name: z.string().min(1, 'Campo obrigatório'),
    password: z.string().min(4, 'Campo obrigatório, pelo menos 4 caracteres'),
    confirmPassword: z
      .string()
      .min(4, 'Campo obrigatório, pelo menos 4 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem corresponder',
    path: ['confirmPassword'],
  })

const FormRegister = () => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const formatData = {
      email: data.email,
      name: data.name,
      password: data.password,
      photo: 'https://i.pravatar.cc/300?u=a' + generateRandomNumber()
    }
    try {
      const res = await api.post('/auth/register', formatData)
      toast.success(res.data.message)
      router.push('/login')
    } catch (error: any) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <Card>
      <CardContent className="p-12">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-bold">Criar uma Conta</h1>
          <p className="text-xs opacity-80">Insira seus dados para criar uma conta</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="space-y-4">
              <DefaultInput name="email" label="Email" type="email" form={form} />
              <DefaultInput name="name" label="Usuário" form={form} />
              <DefaultInput name="password" label="Senha" form={form} type="password" />
              <DefaultInput name="confirmPassword" label="Confirmar Senha" form={form} type="password" />
            </div>
            <Button className="w-full mt-8">
              Criar Conta
              <ArrowRight size={20} />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="bg-accent justify-center p-4 rounded-b-3xl">
        <Link href="/login" className="text-xs font-medium hover:opacity-80 transition-all">Já possui uma conta</Link>
      </CardFooter>
    </Card>
  )
}

export default FormRegister