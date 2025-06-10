import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  
  if (!id) {
    return NextResponse.json(
      { error: '缺少产品ID' },
      { status: 400 }
    );
  }

  try {
    let _id;
    try {
      _id = new ObjectId(id);
    } catch {
      return NextResponse.json(
        { error: '无效的产品ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('fortarc');
    const collection = db.collection('products');

    const product = await collection.findOne({ _id });

    if (!product) {
      return NextResponse.json(
        { error: '产品未找到' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('获取产品详情失败:', error);
    return NextResponse.json(
      { error: '获取产品详情失败' },
      { status: 500 }
    );
  }
}