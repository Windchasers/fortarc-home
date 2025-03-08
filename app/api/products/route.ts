import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Product, ProductFilters } from '@/lib/models/product';

export async function GET(request: Request) {
  try {
    // 检查数据库连接状态
    const client = await clientPromise;
    if (!client) {
      console.error('数据库客户端未初始化');
      return NextResponse.json(
        { error: '服务器连接错误' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filters: ProductFilters = {
      category: searchParams.get('category') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      sortBy: (searchParams.get('sortBy') as 'price' | 'createdAt') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 12
    };

    const db = client.db('fortarc');
    if (!db) {
      console.error('无法访问数据库');
      return NextResponse.json(
        { error: '数据库访问错误' },
        { status: 500 }
      );
    }

    const collection = db.collection('products');
    if (!collection) {
      console.error('无法访问products集合');
      return NextResponse.json(
        { error: '数据库集合访问错误' },
        { status: 500 }
      );
    }

    // 构建查询条件
    const query: any = {};
    if (filters.category) query.category = filters.category;
    if (filters.minPrice) query.price = { $gte: filters.minPrice };
    if (filters.maxPrice) query.price = { ...query.price, $lte: filters.maxPrice };

    // 构建排序条件
    const sort: any = {};
    sort[filters.sortBy || 'createdAt'] = filters.sortOrder === 'asc' ? 1 : -1;

    // 计算分页
    const skip = ((filters.page || 1) - 1) * (filters.pageSize || 12);

    // 执行查询
    const [products, total] = await Promise.all([
      collection
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(filters.pageSize || 12)
        .toArray(),
      collection.countDocuments(query)
    ]);

    return NextResponse.json({
      products,
      total,
      page: filters.page || 1,
      pageSize: filters.pageSize || 12
    });
  } catch (error) {
    console.error('获取产品列表失败:', error);
    let errorMessage = '获取产品列表失败';
    if (error instanceof Error) {
      if (error.name === 'MongoServerError') {
        errorMessage = '数据库连接失败，请稍后重试';
      } else if (error.name === 'MongoNetworkError') {
        errorMessage = '网络连接失败，请检查网络设置';
      }
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}