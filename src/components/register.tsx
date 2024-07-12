"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import  Link from "next/link"
import {SubmitHandler, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/validations/registerSchema"
import toast, { Toaster } from "react-hot-toast";


type registerData = {
  username: string;
  email: string;
  password: string;
};


export function Register() {
  const {register, handleSubmit} = useForm<registerData>(
    {
      resolver: zodResolver(registerSchema)
    }
  )

  const onSubmit:SubmitHandler<registerData> = (data: registerData) => {
    console.log(data)
  }

  const onError = () => {
    toast.error("Invalid credentials, register")
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <p className="text-center text-muted-foreground">Enter your user infor</p>
        <form onSubmit={handleSubmit(onSubmit,onError)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text"placeholder="Enter your username" {...register("username")}></Input>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" {...register("email")}></Input>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" type="password" {...register("password")}/>
          </div>
          <Button type="submit" className="w-full bg-black text-white">Register</Button>            
          <span>Already have an account?</span>
          <Link href={"/login"}>
                <Button className="w-full bg-black text-white">Go to login</Button>
          </Link>
        </form>
        <p className="text-xs text-center text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
