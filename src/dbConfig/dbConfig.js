import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });
  } catch (error) {
    console.log("Error connecting to mongoDB: ", error.message);
  }
}
