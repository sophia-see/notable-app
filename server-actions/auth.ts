"use server"

import { auth, signIn, signOut } from "@/auth";
import db from "@/db/drizzle";
import { usersTable } from "@/db/usersSchema";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { passwordSchema } from "@/validation/passwordSchema";
import { compare, hash } from "bcryptjs";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import { passwordResetTokensTable } from "@/db/passwordResetTokensSchema";
import { mailer } from "@/lib/email";
import { redirect } from "next/dist/server/api-utils";

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

export const resetPassword = async (emailAddress: string) => {
  const session = await auth();

  if (session?.user?.email)
    return {
      error: true,
      message: "You are already logged in"
    }

  const [user] = await db.select({
      id: usersTable.id
  }).from(usersTable).where(eq(usersTable.email, emailAddress));

  if (!user)
    return;

  const token = randomBytes(32).toString("hex");
  const tokenExpiry = new Date(Date.now() + 3600000);

  await db.insert(passwordResetTokensTable).values({
    userId: user.id,
    token,
    tokenExpiry
  }).onConflictDoUpdate({
    target: passwordResetTokensTable.userId,
    set: {
      token,
      tokenExpiry
    }
  })

  const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

  await mailer.sendMail({
    from: "test@resend.dev",
    subject: "Your password reset request",
    to: emailAddress,
    html: `Hey, ${emailAddress}! You request to reset your password. Here's your password reset link. This link will expire in 1 hour: <a href="${resetLink}">${resetLink}</a>`
  })
}

interface UpdatePasswordProps {
  token: string;
  password: string;
  passwordConfirm: string;
}

export const updatePassword = async ({token, password, passwordConfirm}: UpdatePasswordProps) => {
  const passwordValidation = passwordMatchSchema.safeParse({
    password,
    passwordConfirm
  });

  if (!passwordValidation.success) {
    return {
      error: true,
      message: passwordValidation.error.issues[0]?.message ?? "An error occurred."
    }
  }

  const session = await auth();

  if (!session?.user?.email) {
    return {
      error: true,
      message: "Already logged in. Please log out to change your password."
    }
  }

  let isTokenValid = false

  if (token) {
    const [passwordResetToken] = await db.select().from(passwordResetTokensTable).where(eq(passwordResetTokensTable.token, token));

    const now = Date.now();

    if (!!passwordResetToken?.tokenExpiry && now < passwordResetToken.tokenExpiry.getTime()) {
      isTokenValid = true;
    }

    if (!isTokenValid) {
      return {
        error: true,
        message: "Your token is invalid or has expired",
        tokenInvalid: true
      }
    }

    const hashedPassword = await hash(password, 10);

    await db.update(usersTable).set({
      password: hashedPassword
    }).where(eq(usersTable.id, passwordResetToken.userId!))

    await db.delete(passwordResetTokensTable).where(eq(passwordResetTokensTable.id, passwordResetToken.id))
  }
}

export const loginWithGoogle = async () => {
  await signIn("google")
}

export const logout = async () => {
  await signOut();
}

interface ChangePasswordProps {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

export const changePassword = async ({oldPassword, password, passwordConfirm}: ChangePasswordProps) => {
  const passwordValidation = passwordMatchSchema.safeParse({
    password,
    passwordConfirm
  });

  if (!passwordValidation.success) {
    return {
      error: true,
      message: passwordValidation.error.issues[0]?.message ?? "An error occurred."
    }
  }

  const session = await auth();

  if (!session?.user?.email) {
    return {
      error: true,
      message: "You should be logged in to change your password."
    }
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, session.user.email as string));

  const isPasswordCorrect = await compare(oldPassword, user.password as string);

  if (!isPasswordCorrect)
    return {
      error: true,
      message: "Incorrect old password"
    }
  
  const hashedPassword = await hash(password, 10);

  await db.update(usersTable).set({
    password: hashedPassword
  }).where(eq(usersTable.id, user.id!))
}