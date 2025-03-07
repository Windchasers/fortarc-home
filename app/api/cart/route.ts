import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { Cart, CartItem } from '@/lib/models/cart';

// 获取购物车列表
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    try {
      // 获取用户ID
      const user = await db.collection('users').findOne({ email: session.user.email });
      if (!user) {
        return NextResponse.json({ error: '用户账户不存在' }, { status: 404 });
      }

      // 获取购物车数据
      const cart = await db.collection('carts').findOne({ userId: new ObjectId(user._id) });
      if (!cart) {
        return NextResponse.json({ items: [] });
      }

      // 获取购物车中的商品详情
      const productIds = cart.items.map((item: CartItem) => new ObjectId(item.productId));
      const products = await db.collection('products')
        .find({ _id: { $in: productIds } })
        .toArray();

      // 组合购物车数据和商品详情
      const cartItems = cart.items.map((item: CartItem) => {
        const product = products.find(p => p._id.toString() === item.productId.toString());
        return {
          ...item,
          product
        };
      });

      return NextResponse.json({ items: cartItems });
    } catch (dbError) {
      console.error('数据库操作失败:', dbError);
      return NextResponse.json({ error: '数据库操作失败，请稍后重试' }, { status: 500 });
    }
  } catch (error) {
    console.error('获取购物车失败:', error);
    return NextResponse.json({ error: '系统错误，请稍后重试' }, { status: 500 });
  }
}

// 添加商品到购物车
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { productId, quantity, specs } = await req.json();
    if (!productId || !quantity || quantity < 1) {
      return NextResponse.json({ error: '无效的请求参数' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // 获取用户ID
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 检查商品是否存在
    const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
    if (!product) {
      return NextResponse.json({ error: '商品不存在' }, { status: 404 });
    }

    // 更新购物车
    const cartItem: CartItem = {
      productId: new ObjectId(productId),
      quantity,
      specs: specs || {}
    };

    const result = await db.collection('carts').updateOne(
      { userId: new ObjectId(user._id) },
      {
        $push: { items: cartItem },
        $setOnInsert: {
          createdAt: new Date(),
        },
        $set: {
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('添加商品到购物车失败:', error);
    return NextResponse.json({ error: '系统错误，请稍后重试' }, { status: 500 });
  }
}

// 更新购物车商品数量
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { productId, quantity, specs } = await req.json();
    if (!productId || !quantity || quantity < 1) {
      return NextResponse.json({ error: '无效的请求参数' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // 获取用户ID
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 更新购物车商品数量
    const result = await db.collection('carts').updateOne(
      {
        userId: new ObjectId(user._id),
        'items.productId': new ObjectId(productId)
      },
      {
        $set: {
          'items.$.quantity': quantity,
          'items.$.specs': specs || {},
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: '商品不在购物车中' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('更新购物车失败:', error);
    return NextResponse.json({ error: '系统错误，请稍后重试' }, { status: 500 });
  }
}

// 删除购物车商品
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: '无效的请求参数' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // 获取用户ID
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 从购物车中删除商品
    const result = await db.collection('carts').updateOne(
      { userId: new ObjectId(user._id) },
      {
        $pull: { items: { productId: new ObjectId(productId) } },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: '购物车不存在' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除购物车商品失败:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: '系统错误，请稍后重试' }, { status: 500 });
  }
}