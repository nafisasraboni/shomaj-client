import { createAuth } from "@/lib/auth";
import { registrationSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function authHandler(request: Request) {
  if (request.method === "POST" && new URL(request.url).pathname.endsWith("/sign-up/email")) {
    const body = await request.clone().json().catch(() => null);
    const result = registrationSchema.safeParse({
      name: body?.name,
      email: body?.email,
      photoURL: body?.image,
      password: body?.password,
    });

    if (!result.success) {
      return Response.json({ message: result.error.issues[0]?.message ?? "Invalid registration details" }, { status: 400 });
    }
  }

  return createAuth().handler(request);
}

export const GET = authHandler;
export const POST = authHandler;
