import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Product, ProductFilters } from '@/lib/models/product';

export async function GET(request: Request) {
  try {
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

    const client = await clientPromise;
    const db = client.db('fortarc');
    const collection = db.collection('products');

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
    return NextResponse.json(
      { error: '获取产品列表失败' },
      { status: 500 }
    );
  }
}