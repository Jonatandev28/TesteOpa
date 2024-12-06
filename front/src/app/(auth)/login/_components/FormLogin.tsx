'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import DefaultInput from "@/components/forms/DefaultInput"
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth"

const schema = z
  .object({
    email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
    password: z.string().min(4, 'Campo obrigatório, pelo menos 4 caracteres'),
  })

const FormLogin = () => {
  const { login } = useAuth()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    login(data, router)
  }

  return (
    <Card>
      <CardContent className="p-12">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-bold">Acesse sua Conta</h1>
          <p className="text-xs opacity-80">Insira suas credenciais para fazer login</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="space-y-4">
              <DefaultInput name="email" label="Email" form={form} type="email" />
              <DefaultInput name="password" label="Senha" form={form} type="password" />
              <div className="flex items-center space-x-2 opacity-80">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Continue conectado
                </label>
              </div>
            </div>
            <Button className="w-full mt-8">
              Acessar
              <ArrowRight size={20} />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="bg-accent justify-center p-4 rounded-b-3xl">
        <Link href="/register" className="text-xs font-medium hover:opacity-80 transition-all">Criar uma nova conta</Link>
      </CardFooter>
    </Card>
  )
}

export default FormLogin