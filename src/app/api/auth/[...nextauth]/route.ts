import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await pool.query(
          "SELECT id, email, password, role FROM users WHERE email = $1",
          [credentials.email]
        );

        const user = res.rows[0];

        // Usuario no existe
        if (!user || !user.password) {
          return null;
        }

        const passwordOk = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // Contraseña incorrecta
        if (!passwordOk) {
          return null;
        }

        // ✅ Usuario válido
        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = (user as any).role;
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      (session.user as any).role = token.role;
    }
    return session;
  },
},


  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
