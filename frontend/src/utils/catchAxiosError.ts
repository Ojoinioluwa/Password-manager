import { isAxiosError } from "axios"

const catchAxiosError = (error: unknown, message: string) => {
    if (isAxiosError(error)) {
        console.log(message, error);
        throw new Error(`${message}` )
    }
    throw error
};

export default catchAxiosError;