import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "@/utils/auth-shared";

const resolveBaseUrl = () => {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!configuredBaseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not set");
  }

  return configuredBaseUrl.replace(/\/+$/, "");
};

const buildTargetUrl = (pathSegments: string[] = [], requestUrl: string) => {
  const url = new URL(requestUrl);
  const path = pathSegments.join("/");
  const query = url.search;
  return `${resolveBaseUrl()}/${path}${query}`;
};

const proxyRequest = async (
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) => {
  const { path } = await context.params;
  const targetUrl = buildTargetUrl(path, request.url);
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  if (!headers.has("Authorization") && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const body = ["GET", "HEAD"].includes(request.method)
    ? undefined
    : await request.text();

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  const responseBody = await response.text();
  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  return new NextResponse(responseBody, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}
