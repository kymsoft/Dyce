"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { FormError } from "./ui/form-error";
import { FormSuccess } from "./ui/form-success";
import { AuthWrapper } from "./ui/auth-wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { login } from "@/actions/login";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider"
    : "";
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    const validatedFields = LoginSchema.safeParse(values);
    console.log(values)

    if(!validatedFields.success) {
        setError("Invalid Fields")
    } else {
        startTransition(async()=>{

            const res = await axios.post('http://localhost:5000/auth/login', values);
            login(values)
               .then((data) => {
                if(data?.error){
                    form.reset();
                    setError(data.error)
                }
                if(data?.success){
                    form.reset();
                    setSuccess(data.success)
                }

               })
               .catch(() => setError("Something went wrong"));

            console.log(res)
        })
    }
  }
  return (
    <AuthWrapper
    headerLabel="Welcome back"
    backButtonLabel="Sign Up"
    backButtonHref="/sign-up"
    backButtonRequest="Don't have an account?"
  >
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
           
           <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Link href="/reset-password" className="ml-2 text-[#9400FF] text-sm">forgot password?</Link>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>

          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-[#6300ae] hover:bg-[#3E006E]"
          >
            SignIn
          </Button>
        </form>
      </Form>
  </AuthWrapper>
);
};

export default LoginForm;
