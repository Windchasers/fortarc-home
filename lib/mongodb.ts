import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('请在环境变量中设置 MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
// 简化连接选项，移除可能导致问题的TLS配置
const options = {
  connectTimeoutMS: 30000, // 增加连接超时时间
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 30000, // 增加服务器选择超时时间
  retryWrites: true,
  retryReads: true
};

console.log('MongoDB连接配置初始化，URI格式检查:', 
  uri.startsWith('mongodb+srv://') ? 'URI格式正确' : 'URI格式可能有问题');

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // 在开发环境中使用全局变量来避免热重载时创建多个连接
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // 在生产环境中为每个请求创建新的连接
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;