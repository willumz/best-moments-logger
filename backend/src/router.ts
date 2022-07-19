import express from "express";

import * as sql from "./database_funcs";
import { TmdbItem } from "./data_models";

const router = express.Router();

router.get("/tag", (req, res) => {
    sql.tag.getAll(req.pool).then(tags => {
        res.json(tags);
    });
});

router.post("/tag", (req, res) => {
    if (!req.body.name) return res.json({ error: "No name provided" });
    sql.tag.create(req.pool, req.body.name).then(tag => {
        res.json(tag);
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

router.post("/log", (req, res) => {
    if (!req.body.media_id && !req.body.episode_id)
        return res.json({ error: "No media_id or episode_id provided" });
    if (req.body.media_id && req.body.episode_id)
        return res.json({ error: "Both media_id and episode_id provided" });
    if (!req.body.time) return res.json({ error: "No time provided" });
    let content_id: { id: number; type: 0 | 1 }; // 0 = media, 1 = episode
    if (req.body.media_id) content_id = { id: parseInt(req.body.media_id), type: 0 };
    else content_id = { id: parseInt(req.body.episode_id), type: 1 };
    if (content_id.id === NaN) return res.json({ error: "Invalid media/episode id" });
    sql.log.create(req.pool, content_id, req.body.note || "", req.body.time).then(log => {
        res.json(log);
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

router.post("/libraryitem", (req, res) => {
    let tmdb_id = parseInt(req.body.tmdb_id);
    let is_tv = req.body.is_tv;
    if (tmdb_id === NaN) res.json({ error: "Invalid tmdb_id" });
    if (is_tv === undefined) res.json({ error: "No is_tv provided" });
    sql.media.checkTmdbPresent(req.pool, tmdb_id, is_tv).then(id => {
        if (id) {
            sql.libraryitem.create(req.pool, id).then(libraryitem => {
                res.json(libraryitem);
            });
        } else {
            sql.storeTmdbMedia(req.moviedb, req.pool, tmdb_id, is_tv, media => {
                sql.libraryitem.create(req.pool, media.id).then(libraryitem => {
                    return libraryitem;
                });
            })
        }
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
