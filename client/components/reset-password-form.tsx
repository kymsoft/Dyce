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
import { useSearchParams } from "next/navigation";
import axios from "axios";

const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

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

            const res = await axios.post('http://localhost:5000/auth/login', values)
                setError(res.data.error)
                setSuccess(res.data.success)

                console.log(res)
        })
    }
  }
  return (
    <AuthWrapper
    headerLabel="Forgot your password?"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/signin"
      backButtonRequest=""
  >
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
           
          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="youremail@example.com"
                      type="email"
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
            Send Reset Mail
          </Button>
        </form>
      </Form>
  </AuthWrapper>
);
};

export default ResetPasswordForm;
