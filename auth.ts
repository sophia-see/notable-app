import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import db from "./db/drizzle"
import { usersTable } from "./db/usersSchema"
import { eq } from "drizzle-orm"
import { compare } from "bcryptjs"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({token, user}){
      if (user)
        token.id = user.id

      return token
    },
    session({session, token}){
      session.user.id = token.id as string

      return session
    }
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: { prompt: "select_account" }
      }
    }),
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, credentials.email as string));

        if (!user)
          throw new Error("Incorrect credentials")
        else {
          const passwordCorrect = await compare(credentials.password as string, user.password as string);

          if (!passwordCorrect)
            throw new Error("Incorrect credentials")
        }

        return {
          id: user.id.toString(),
          email: user.email
        }
      }
    })
  ],
})