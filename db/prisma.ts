import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/lib/generated/prisma/client";
// import { PrismaClient } from "../lib/generated/prisma/client";
import ws from "ws";

// 设置 WebSocket 连接，使 Neon 能够使用 WebSocket 通信
// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;

// 从环境变量获取数据库连接字符串
// Get database connection string from environment variables
const connectionString = `${process.env.DATABASE_URL}`;

// 使用提供的连接字符串创建一个新的连接池，允许多个并发连接
// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
// const pool = new Pool({ connectionString });

// 使用 Neon 连接池实例化 Prisma 适配器，处理 Prisma 和 Neon 之间的连接
// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
// const adapter = new PrismaNeon(pool);
const adapter = new PrismaNeon({ connectionString });

// 扩展 PrismaClient，添加自定义结果转换器，将 price 和 rating 字段转换为字符串
// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          // 将 Decimal 类型的 price 转换为字符串
          // Convert Decimal type price to string
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          // 将 Decimal 类型的 rating 转换为字符串
          // Convert Decimal type rating to string
          return product.rating.toString();
        },
      },
    },

    cart: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart) {
          return cart.totalPrice.toString();
        },
      },
    },

    order: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(order) {
          return order.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(order) {
          return order.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(order) {
          return order.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(order) {
          return order.totalPrice.toString();
        },
      },
    },
    orderItem: {
      price: {
        compute(orderItem) {
          return orderItem.price.toString();
        },
      },
    },
  },
});
