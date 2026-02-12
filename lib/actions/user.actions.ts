'use server';

// import { isRedirectError } from 'next/dist/client/components/redirect';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signIn, signOut } from '@/auth';
import { signInFormSchema } from '../validator';

// Sign in the user with credentials
// 使用凭据登录用户
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {

  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    // console.log(user);

    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: 'Invalid email or password' };
  }
}

// Sign the user out
// 退出用户
export async function signOutUser() {
  await signOut();
}

