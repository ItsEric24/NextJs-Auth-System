import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request) {
  try {
    const userName = await getTokenData(request);

    const user = await User.findOne({ username: userName }).select("-password");

    return NextResponse.json(
      { message: "User found", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
