export type Password = {
    url: string;
    title: string;
    email: string;
    notes: string;
    encryptedPassword: string;
    iv?: string;
    logo?: string
    category: string;
}

export type PasswordFormValues  =  {
    password: string
    url: string;
    title: string;
    email: string;
    notes: string;
}