"use server";

import bcrypt from "bcryptjs";

import * as z from "zod";
import { RegisterSchema } from "../schemas";
import { getUserByEmail } from "../data/users";
import { generateVerificationToken } from "../lib/token";
import { sendVerificationEmail } from "../lib/mail";
import axios from "axios";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields"};
    }

    const { email, password, firstname, lastname, username, phonenumber } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)
    if (existingUser){
        return { error: "Email already in use" };
    }


    await axios.post("http://localhost:5000/auth/register", {email, password, firstname, lastname, username, phonenumber});

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.data.email, verificationToken.data.token);

   
    return {success: "Confirmation email sent!"}
}