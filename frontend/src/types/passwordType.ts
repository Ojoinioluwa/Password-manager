export type Password = {
    url: string;
    title: string;
    email: string;
    notes: string;
    encryptedPassword: string;
    iv: string;
}

export type PasswordFormValues  =  {
    password: string
    url: string;
    title: string;
    email: string;
    notes: string;
}