// 示例数据仅用于开发和测试目的

// 用户表示例数据
export const userExample = {
  _id: "507f1f77bcf86cd799439011",
  name: "张三",
  email: "zhangsan@example.com",
  hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewfJPAJl.esgmXyS", // 原密码：Test123456
  image: "https://example.com/avatars/zhangsan.jpg",
  emailVerified: new Date("2024-01-15T08:30:00.000Z"),
  createdAt: new Date("2024-01-15T08:00:00.000Z"),
  updatedAt: new Date("2024-01-15T08:30:00.000Z")
};

// 账户表示例数据（用于OAuth关联）
export const accountExample = {
  _id: "507f1f77bcf86cd799439012",
  userId: "507f1f77bcf86cd799439011",
  type: "oauth",
  provider: "google",
  providerAccountId: "123456789",
  refresh_token: "refreshtoken123",
  access_token: "accesstoken123",
  expires_at: 1674284461,
  token_type: "Bearer",
  scope: "openid profile email",
  id_token: "idtoken123",
  createdAt: new Date("2024-01-15T08:15:00.000Z"),
  updatedAt: new Date("2024-01-15T08:15:00.000Z")
};

// 会话表示例数据
export const sessionExample = {
  _id: "507f1f77bcf86cd799439013",
  sessionToken: "8a7b6c5d4e3f2g1h",
  userId: "507f1f77bcf86cd799439011",
  expires: new Date("2024-02-15T08:00:00.000Z"),
  createdAt: new Date("2024-01-15T08:20:00.000Z"),
  updatedAt: new Date("2024-01-15T08:20:00.000Z")
};

// 验证令牌表示例数据（用于邮箱验证等）
export const verificationTokenExample = {
  _id: "507f1f77bcf86cd799439014",
  token: "verificationtoken123",
  identifier: "zhangsan@example.com",
  expires: new Date("2024-01-16T08:00:00.000Z"),
  createdAt: new Date("2024-01-15T08:25:00.000Z"),
  updatedAt: new Date("2024-01-15T08:25:00.000Z")
};
