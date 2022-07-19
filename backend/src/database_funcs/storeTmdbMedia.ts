import * as media from "./media";
import * as series from "./series";
import * as episode from "./episode";
import { MovieDb } from "moviedb-promise";
import mariadb from "mariadb";
import { Media } from "../data_models";

export default function storeTmdbMedia(moviedb: MovieDb, pool: mariadb.Pool, tmdb_id: number, is_tv: boolean, callback: (media: Media) => any): void  {
    try {
        if (is_tv) {
            moviedb.tvInfo(tmdb_id).then((details: any) => {
                media
                    .create(
                        pool,
                        details.name,
                        details.poster_path
                            ? `https://image.tmdb.org/t/p/original${details.poster_path}`
                            : "",
                        details.id,
                        true
                    )
                    .then(mediaRes => {
                        details.seasons.forEach((seasonRes: any) => {
                            series
                                .create(
                                    pool,
                                    mediaRes.id,
                                    seasonRes.name,
                                    seasonRes.poster_path
                                        ? `https://image.tmdb.org/t/p/original${seasonRes.poster_path}`
                                        : "",
                                    seasonRes.season_number,
                                    seasonRes.id
                                )
                                .then(seriesRes => {
                                    moviedb
                                        .seasonInfo({
                                            id: details.id,
                                            season_number: seasonRes.season_number,
                                        })
                                        .then((season_details: any) => {
                                            season_details.episodes.forEach((episodeRes: any) => {
                                                episode.create(
                                                    pool,
                                                    seriesRes.id,
                                                    episodeRes.name,
                                                    episodeRes.episode_number,
                                                    episodeRes.still_path
                                                        ? `https://image.tmdb.org/t/p/original${episodeRes.still_path}`
                                                        : "",
                                                    episodeRes.id
                                                );
                                            });
                                        });
                                });
                        });
                        callback(mediaRes);
                    });
            });
        } else {
            moviedb.movieInfo(tmdb_id).then((details: any) => {
                media
                    .create(
                        pool,
                        details.title,
                        details.poster_path
                            ? `https://image.tmdb.org/t/p/original${details.poster_path}`
                            : "",
                        details.id,
                        false
                    )
                    .then(mediaRes => {
                        callback(mediaRes);
                    });
            });
        }
    } catch(err) {
        throw err;
    }
}