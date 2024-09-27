import axios from "axios";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await axios.get(`http://localhost:5000/auth/password_reset_token_by_token/${token}`)

    return passwordResetToken.data;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await axios.get(`http://localhost:5000/auth/password_reset_token_by_email/${email}`)

    return passwordResetToken.data;
  } catch {
    return null;
  }
};