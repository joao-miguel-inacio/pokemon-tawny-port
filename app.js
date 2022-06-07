import "dotenv/config";

import "./db/index.js";

import express from "express";
const app = express()

import hbs from "hbs";
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
hbs.registerPartials(__dirname + '/views/partials');

//require("./config")(app);
import aFunction from "./config/index.js";
aFunction(app);

import capitalized from "./utils/capitalized.js";

const projectName = "pokemon-tawny-port";

app.locals.appTitle = `${capitalized(projectName)}`;
app.locals.anonymous = true;

import index from "./routes/index.routes.js";
app.use("/", index);

import authRoutes from "./routes/auth.routes.js";
app.use("/auth", authRoutes);

import appRoutes from "./routes/app.routes.js";
app.use("/app", appRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
import aSecondFunction from "./error-handling/index.js";

export default app;