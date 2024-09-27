import axios from "axios";

export const getVerificationTokenByToken = async(
    token: string
) => {
    try {
        const verificationToken = await axios.get(`http://localhost:5000/auth/verification_token_by_token/${token}`)

        return verificationToken.data;
    } catch{
        return null;
    }
}

export const getVerificationTokenByEmail = async(
    email: string
) => {
    try {
        const verificationToken = await axios.get(`http://localhost:5000/auth/verification_token_by_email/${email}`)

        return verificationToken.data;
    } catch{
        return null;
    }
}