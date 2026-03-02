// export { auth as proxy } from '@/auth';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { auth: proxy } = NextAuth(authConfig);