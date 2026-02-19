import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");

  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;;
}

// Format Errors
// 格式化错误
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any): string {
  if (error.name === "ZodError") {
    // Handle Zod error - collect all field error messages
    // 处理 Zod 错误 - 收集所有字段错误消息
    //当 Zod 验证失败时，它会抛出一个 ZodError ，这个错误对象包含一个 issues 数组，里面记录了 所有验证失败的问题 。
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fieldErrors = (error.issues || []).map((issue: any) => {
      const message = issue.message;
      return typeof message === "string" ? message : JSON.stringify(message);
    });

    return fieldErrors.map((err: string) => `${err}.`).join("\n");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle Prisma unique constraint error (P2002 = unique violation)
    // 处理 Prisma 唯一约束错误（P2002 = 唯一性冲突）
    const field = error.meta?.driverAdapterError?.cause?.constraint?.fields[0]
      ? error.meta?.driverAdapterError?.cause?.constraint?.fields[0]
      : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    // 处理其他错误
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

// Round to 2 decimal places
export const round2 = (value: number | string) => {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100; // avoid rounding errors
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error('value is not a number nor a string');
  }
};


// 格式化 Prisma Decimal 为两位小数字符串
export function formatDecimal(value:  number | string): string {
  return Number(value).toFixed(2);
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
});

// Format currency
export function formatCurrency(amount: number | string | null) {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return 'NaN';
  }
}