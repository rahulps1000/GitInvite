// middleware.ts
import { NextRequest, NextResponse } from "next/server";

type RateLimitOptions = {
  maxRequests: number;
  windowMs: number;
};

type RequestData = {
  count: number;
  timestamp: number;
};

const requestCounts = new Map<string, RequestData>();

const rateLimit = (options: RateLimitOptions) => {
  const { maxRequests, windowMs } = options;

  return (req: NextRequest) => {
    const ip = req.headers.get("x-forwarded-for") || req.ip;
    const currentTime = Date.now();

    if (!requestCounts.has(ip!)) {
      requestCounts.set(ip!, { count: 1, timestamp: currentTime });
      return NextResponse.next();
    } else {
      const requestData = requestCounts.get(ip!)!;
      const timeDifference = currentTime - requestData.timestamp;

      if (timeDifference < windowMs) {
        if (requestData.count < maxRequests) {
          requestData.count++;
          return NextResponse.next();
        } else {
          return new NextResponse(
            "Too many requests, please try again later.",
            { status: 429 }
          );
        }
      } else {
        requestCounts.set(ip!, { count: 1, timestamp: currentTime });
        return NextResponse.next();
      }
    }
  };
};

export const middleware = rateLimit({
  maxRequests: 5,
  windowMs: 60 * 1000, // 1 minute
});

export const config = {
  matcher: "/invite/:hash*",
};

function removeExpiredIps(windowMs: number): void {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.timestamp > windowMs) {
      requestCounts.delete(ip);
    }
  }
}

setInterval(() => removeExpiredIps(60000), 60000);
