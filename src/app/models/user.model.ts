export interface User {
    username: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    role?: {
        roleName: string;
    };
} 