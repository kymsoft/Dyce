"use server";

import axios from "axios";
import { getUserByEmail } from "../data/users";
import { getVerificationTokenByToken } from "../data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.data.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.data.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const newEmailVerified = new Date();
  const newEmail = existingToken.data.email

  await axios.put(`http://localhost:5000/users/update-newverification/${existingUser.data.id}`, {newEmailVerified, newEmail})

  await axios.delete(`http://localhost:5000/auth/verification_token/${existingToken.data.id}`)

  return { success: "Email verified!" };
};