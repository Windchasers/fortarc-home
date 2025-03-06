import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: '请提供邮箱和密码' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('fortarc');
    const collection = db.collection('users');

    // 检查邮箱是否已被注册
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 12);

    // 创建用户
    const result = await collection.insertOne({
      email,
      hashedPassword,
      createdAt: new Date()
    });

    return NextResponse.json(
      { message: '注册成功' },
      { status: 201 }
    );
  } catch (error) {
    console.error('用户注册失败:', error);
    return NextResponse.json(
      { error: '注册过程中发生错误' },
      { status: 500 }
    );
  }
}