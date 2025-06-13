import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import catchAxiosError from "../../utils/catchAxiosError";

export const AddAuthorizedUserAPI = async ({
    passwordId,
    email,
    encryptedPassword,
    iv,
    expiresAt,
}: {
    passwordId: string;
    email: string;
    encryptedPassword: string;
    iv: string;
    expiresAt?: string;
}) => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token;
        const response = await axios.post(
            `${BASE_URL}/authorize/user/${passwordId}`,
            { email, encryptedPassword, iv, expiresAt },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        catchAxiosError(error, "AddAuthorizedUserAPI");
        throw error;
    }
};

export const GetAuthorizedPasswordsAPI = async () => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token;
        const response = await axios.get(`${BASE_URL}/authorize/passwords`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        catchAxiosError(error, "GetAuthorizedPasswordsAPI");
        throw error;
    }
};
export const GetAuthorizedUsersAPI = async () => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token;
        const response = await axios.get(`${BASE_URL}/authorize/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        catchAxiosError(error, "GetAuthorizedUsersAPI");
        throw error;
    }
};

export const DeleteAuthorizedUserAPI = async ({ authorizedId }: { authorizedId: string }) => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token;
        const response = await axios.delete(`${BASE_URL}/authorize/user/${authorizedId}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        catchAxiosError(error, "DeleteAuthorizedUserAPI");
        throw error;
    }
};

export const EditAuthorizedUserAPI = async ({
    authorizedId,
    expiresAt,
}: {
    authorizedId: string;
    expiresAt?: string;
}) => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token;
        const response = await axios.put(
            `${BASE_URL}/authorize/user/${authorizedId}/edit`,
            { expiresAt },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        catchAxiosError(error, "EditAuthorizedUserAPI");
        throw error;
    }
};

export const ToggleAuthorizedUserAPI = async ({ authorizedId }: { authorizedId: string }) => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token;
        const response = await axios.put(
            `${BASE_URL}/authorize/user/${authorizedId}/toggleAuthorize`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        catchAxiosError(error, "ToggleAuthorizedUserAPI");
        throw error;
    }
};
