import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//*---LOGIN LOGIC BELOW----//

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    //* check if there is an user with the above data;

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: "invalid credentials" },
        { status: 400 }
      );
    }

    //* check if password is correct
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return NextResponse.json(
        { error: "Inavlid credentials" },
        { status: 400 }
      );
    }

    //* create token data
    const tokenData = {
      id: user._id,
      username: user.username,
    };

    //* create jwt token using the above data
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 201 }
    );

    response.cookies.set("user", token, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
