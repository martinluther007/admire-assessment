import dotenv from "dotenv";
import server from "./app";
import mongoose from "mongoose";
import chalk from "chalk";

dotenv.config({ path: "./config.env" });
const PORT: number | string = process.env.PORT || 8000;
const db_string: string = process.env.DB_CONNECTION_STRING?.replace(
  "<password>",
  process.env.DB_PASSWORD as string
)!;

mongoose
  .connect(db_string)
  .then(({ connection }: any) => console.log(chalk.blue(connection.host)))
  .catch(() =>
    console.log(chalk.red("------------ DB CONNECTION FAILED -------------"))
  );
server.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
