"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { LoginSchema, NewPasswordSchema } from "@/schemas";
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
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token")
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    
    
    startTransition(() => {
      newPassword(values, token)
        .then((data)=>{
          setError(data?.error);
          setSuccess(data?.success);
        })
    });
  };
  return (
    <AuthWrapper
    headerLabel="Password Reset"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/signin"
      backButtonRequest=""
  >
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
           
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your new password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-[#6300ae] hover:bg-[#3E006E]"
          >
            Reset Password
          </Button>
        </form>
      </Form>
  </AuthWrapper>
);
};

export default NewPasswordForm;
