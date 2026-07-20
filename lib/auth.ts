import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-dev-secret-do-not-use-in-prod",
);

const TOKEN_EXPIRY = "2h";

export interface AuthPayload extends JWTPayload {
  role: "admin";
}

/**
 * Sign a JWT token for the admin user.
 */
export async function signToken(): Promise<string> {
  return new SignJWT({ role: "admin" } as AuthPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT token. Returns the payload if valid, null if invalid.
 */
export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as AuthPayload;
  } catch {
    return null;
  }
}
