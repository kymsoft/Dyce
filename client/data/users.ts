import axios from "axios"

export const getUserByEmail = async(email: string) => {
    try {
        const user = await axios.get(`http://localhost:5000/users/getUserEmail/${email}`)
        return user.data;
    } catch (err) {
        return null;
    }
}

export const getUserById = async(id: string) => {
    try {
        const user = await axios.get(`http://localhost:5000/users/getUserId/${id}`)
        return user.data;
    } catch (err) {
        return null;
    }
}