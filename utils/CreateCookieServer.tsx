"use server";

import { cookies } from "next/headers";

export async function createTokenCookie(value: string)  {
  if (value === "") return;
  
(await cookies()).set({
    name: "tokenServer",
    value: value,
    httpOnly: true,
    secure: true,
    path: "/",
  });
}
