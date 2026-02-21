"use server";

// import { isRedirectError } from 'next/dist/client/components/redirect';
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn, signOut } from "@/auth";
import {
  signInFormSchema,
  signUpFormSchema,
  paymentMethodSchema,
} from "../validator";
import { hashSync } from "bcrypt-ts-edge"; // 用于密码哈希的库
import { prisma } from "@/db/prisma";

import { redirect } from "next/navigation";
import { formatError } from "../utils";
import { shippingAddressSchema } from "../validator";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";
import { z } from 'zod';
// Sign in the user with credentials
// 使用凭据登录用户
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    // console.log(user);

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}

// Sign the user out
// 退出用户
export async function signOutUser() {
  console.log("signOutUser");
  try {
    await signOut();
    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw error;
  }
}

// Register a new user
// 注册新用户
export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      confirmPassword: formData.get("confirmPassword"),
      password: formData.get("password"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User created successfully" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log("错误名称:", error.name);
    // console.log("错误消息:", error.message);
    // console.log("错误代码:", error.code);
    // // console.log("错误详情:", error.errors);
    // console.log("元数据:", error.meta);
    // console.log("完整错误对象:", error); // 查看所有属性
    // console.log("错误详情:", error.issues);
    // console.log("错误详情:", error.meta?.driverAdapterError?.cause?.constraint?.fields[0]);

    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Get user by ID
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");
  return user;
}

// Update user's address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error("User not authenticated");
    const currentUser = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!currentUser) throw new Error("User not found");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update user's payment method
export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("User not authenticated");
    const currentUser = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!currentUser) throw new Error('User not found');

    const paymentMethod = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: 'User updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}