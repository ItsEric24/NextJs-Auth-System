import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getTokenData(request) {
  try {
    const token = request.cookies.get("user")?.value || "";

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    return decodedToken.username;
  } catch (error) {
    throw new Error(error.message);
  }
}
