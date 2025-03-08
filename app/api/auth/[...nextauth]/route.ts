import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("请输入邮箱和密码");
          }

          const client = await clientPromise;
          if (!client) {
            console.error('认证服务：数据库客户端未初始化');
            throw new Error("服务器连接错误");
          }

          const db = client.db("fortarc");
          if (!db) {
            console.error('认证服务：无法访问数据库');
            throw new Error("数据库访问错误");
          }

          const collection = db.collection("users");
          if (!collection) {
            console.error('认证服务：无法访问users集合');
            throw new Error("数据库集合访问错误");
          }

          const user = await collection.findOne({ email: credentials.email });

          if (!user || !user.hashedPassword) {
            throw new Error("用户不存在");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error("密码错误");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image
          };
        } catch (error) {
          console.error('认证失败:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30天
    updateAge: 24 * 60 * 60 // 每24小时更新一次
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 // 与 session maxAge 保持一致
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };