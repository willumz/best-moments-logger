import express from "express";
import mariadb from "mariadb";
import { MovieDb } from "moviedb-promise";
import bodyParser from "body-parser";

import * as sql from "./database_funcs";
import router from "./router";

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "best_moments_logger";
const TMDB_KEY = process.env.TMDB_KEY || "";

const pool = mariadb.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

const moviedb = new MovieDb(TMDB_KEY);

sql.init(pool).then(() => {
    const app = express();

    app.use(express.static("static/"));

    let jsonParser = bodyParser.json();

    app.use(
        "/api",
        jsonParser,
        (req, res, next) => {
            req.pool = pool; // pass pool as req object
            req.moviedb = moviedb; // pass moviedb as req object
            next();
        },
        router
    );

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
