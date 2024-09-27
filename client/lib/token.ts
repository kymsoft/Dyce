import {v4 as uuidv4} from "uuid";
import crypto from "crypto"
// import { db } from "./db";
import { getVerificationTokenByEmail } from "../data/verification-token";
import { getPasswordResetTokenByEmail } from "../data/password-reset-token";
import axios from "axios";



export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
  
    const existingToken = await getPasswordResetTokenByEmail(email);
  
    if (existingToken?.data) {
      await axios.delete(`http://localhost:5000/auth/password_reset_token/${existingToken?.data.id}`)
    }
    const passwordResetToken = await axios.post('http://localhost:5000/auth/password_reset_token', {email, token, expires})
    
    return passwordResetToken;
    }

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken?.data){
        await axios.delete(`http://localhost:5000/auth/verification_token/${existingToken?.data.id}`)
    }

    const verificationToken = await axios.post('http://localhost:5000/auth/verification_token', {email, token, expires})

    return verificationToken;
};

