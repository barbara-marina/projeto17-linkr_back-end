import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import dotenv from "dotenv";

import router from "./routes/index.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(morgan('dev'));
app.use(router);

<<<<<<< HEAD
const port = process.env.PORT
=======
const port = process.env.PORT || 4000;
>>>>>>> d5ceb7aa61e68bb3992f895b7938271aeb5a38f1

app.listen(port, () => {
    console.log(chalk.bold.cyanBright(`Server is up and runnig on port ${port}`));
});
<<<<<<< HEAD
=======

>>>>>>> d5ceb7aa61e68bb3992f895b7938271aeb5a38f1
