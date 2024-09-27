import { DefaultUser } from 'next-auth';
declare module 'next-auth' {
    interface Session {
        user?: DefaultUser & { id: string; emailverified: date };
    }
    interface User extends DefaultUser {
        emailverified: Date;
    }
}
