"use server"
import { cookies } from "next/headers"

export const saveTokens = async(accessToken: string, refreshToken: string) =>{
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, { path: "/" });
    cookieStore.set("refreshToken", refreshToken, { path: "/" });
}

export const clearTokens = async() =>{
    const cookieStore = await cookies();
    cookieStore.set("accessToken", "", { path: "/", maxAge: 0 });
    cookieStore.set("refreshToken", "", { path: "/", maxAge: 0 });
}

export const getCurrentUser = async() =>{
    const accessToken = (await cookies()).get("accessToken")?.value || undefined;
    const refreshToken = (await cookies()).get("refreshToken")?.value || undefined;
    return {accessToken, refreshToken};
}