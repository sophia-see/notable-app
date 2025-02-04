"use server"

import { signIn } from "@/auth";
import db from "@/db/drizzle";
import { usersTable } from "@/db/usersSchema";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { passwordSchema } from "@/validation/passwordSchema";
import { compare, hash } from "bcryptjs";
import { z } from "zod";

interface RegisterUserProps {
  email: string;
  password: string;
  passwordConfirm: string;
}
export const registerUser = async ({email, password, passwordConfirm}: RegisterUserProps) => {
  try {
    const newUserSchema = z.object({
      email: z.string().email()
    }).and(passwordMatchSchema);

    const newUserValidation = newUserSchema.safeParse({
      email,
      password,
      passwordConfirm
    })

    if (!newUserValidation.success) {
      return {
        error: true,
        message: newUserValidation.error.issues[0]?.message ?? "An error occurred."
      }
    }

    const hashedPassword = await hash(password, 10);

    await db.insert(usersTable).values({
      email,
      password: hashedPassword
    });
  } catch (error: any) {
    if (error?.code === "23505")
      return {
        error: true,
        message: "An account is already registered with that email address."
      }

    return {
      error: true,
      message: "An error occurred.",
    };
  }
}

interface LoginUserProps {
  email: string;
  password: string;
}

export const loginUser = async ({email, password}: LoginUserProps) => {
  const userSchema = z.object({
    email: z.string().email(),
    password: passwordSchema
  })

  const userValidation = userSchema.safeParse({email, password});

  if (!userValidation.success)
    return {
      error: true,
      message: userValidation.error.issues[0]?.message ?? "An error occurred."
    }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false
    })
  } catch (error) {
    return {
      error: true,
      message: "Incorrect email or password"
    }
  }
}