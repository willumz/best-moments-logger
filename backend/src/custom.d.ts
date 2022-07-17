declare namespace Express {
    export interface Request {
        pool?: mariadb.Pool;
        moviedb?: MovieDb;
    }
}
