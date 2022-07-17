import express from "express";

import * as sql from "./database_funcs";
import { TmdbItem } from "./data_models";

const router = express.Router();

router.get("/tag", (req, res) => {
    sql.tag.getAll(req.pool).then(tags => {
        res.json(tags);
    });
});

router.get("/tag/:id", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid tag id" });
    sql.tag.get(req.pool, id).then(tag => {
        res.json(tag);
    });
});

router.get("/media", (req, res) => {
    sql.media.getAll(req.pool).then(media => {
        res.json(media);
    });
});

router.get("/media/:id", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid media id" });
    sql.media.get(req.pool, id).then(media => {
        res.json(media);
    });
});

router.get("/media/:id/series", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid media id" });
    sql.media.getSeries(req.pool, id).then(series => {
        res.json(series);
    });
});

router.get("/media/:id/tag", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid media id" });
    sql.media.getTags(req.pool, id).then(tags => {
        res.json(tags);
    });
});

router.get("/media/:id/log", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid media id" });
    sql.media.getLogs(req.pool, id).then(logs => {
        res.json(logs);
    });
});

router.get("/series", (req, res) => {
    sql.series.getAll(req.pool).then(series => {
        res.json(series);
    });
});

router.get("/series/:id", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid series id" });
    sql.series.get(req.pool, id).then(series => {
        res.json(series);
    });
});

router.get("/series/:id/episode", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid series id" });
    sql.series.getEpisodes(req.pool, id).then(episodes => {
        res.json(episodes);
    });
});

router.get("/series/:id/tag", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid series id" });
    sql.series.getTags(req.pool, id).then(tags => {
        res.json(tags);
    });
});

router.get("/episode", (req, res) => {
    sql.episode.getAll(req.pool).then(episodes => {
        res.json(episodes);
    });
});

router.get("/episode/:id", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid episode id" });
    sql.episode.get(req.pool, id).then(episode => {
        res.json(episode);
    });
});

router.get("/episode/:id/tag", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid episode id" });
    sql.episode.getTags(req.pool, id).then(tags => {
        res.json(tags);
    });
});

router.get("/episode/:id/log", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid episode id" });
    sql.episode.getLogs(req.pool, id).then(logs => {
        res.json(logs);
    });
});

router.get("/log", (req, res) => {
    sql.log.getAll(req.pool).then(logs => {
        res.json(logs);
    });
});

router.get("/log/:id", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid log id" });
    sql.log.get(req.pool, id).then(log => {
        res.json(log);
    });
});

router.get("/log/:id/tag", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid log id" });
    sql.log.getTags(req.pool, id).then(tags => {
        res.json(tags);
    });
});

router.get("/libraryitem", (req, res) => {
    sql.libraryitem.getAll(req.pool).then(libraryitems => {
        res.json(libraryitems);
    });
});

router.get("/libraryitem/:id", (req, res) => {
    let id = parseInt(req.params.id);
    if (id === NaN) return res.json({ error: "Invalid libraryitem id" });
    sql.libraryitem.get(req.pool, id).then(libraryitem => {
        res.json(libraryitem);
    });
});

router.get("/tmdbitem", (req, res) => {
    let search = req.query.search;
    let tmdbitems: TmdbItem[] = [];
    if (search === undefined) return res.json({ error: "No search query" });
    req.moviedb.searchMulti(search).then((results: any) => {
        results.results.forEach((result: any) => {
            tmdbitems.push({
                id: result.id,
                name: result.name,
                image_url: result.poster_path
                    ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                    : null,
            });
        });
        res.json(tmdbitems);
    });
});

export default router;
