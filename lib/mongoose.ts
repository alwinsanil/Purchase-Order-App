import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const mongooseConnect = () => {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
  if (mongoose.connections[0].readyState) {
    return;
  } else {
    return mongoose
      .connect(MONGODB_URI)
      .catch((error) => console.error(error));
  }
};

export default mongooseConnect;
