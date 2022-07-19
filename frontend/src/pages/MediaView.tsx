import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Media, Series } from "../data_models";
import MediaPoster from "../components/MediaPoster";
import SeriesPoster from "../components/SeriesPoster";

const MediaView = () => {
    let { id } = useParams();
    const [media, setMedia] = useState<Media>({
        id: -1,
        name: "Loading...",
        image_url: "",
        tmdb_id: -1,
        is_tv: false,
    });
    const [series, setSeries] = useState<Series[]>([]);
    useEffect(() => {
        axios.get(`/api/media/${id}`).then(res => {
            setMedia(res.data);
            if (res.data.is_tv) {
              axios.get(`/api/media/${id}/series`).then(res => {
                res.data.sort((a: Series, b: Series) => a.order - b.order);
                setSeries(res.data);
              });
            }
        });
    }, [id]);
    return (
        <div className="bg-slate-900 w-full min-w-screen min-h-screen h-full p-20">
            <div className="inline-block">
                <MediaPoster className="inline" media={media}/>
                <p className="text-white text-[4rem] inline align-top p-[3rem]">
                    {media.name}
                </p>
            </div>
            {
                media.is_tv ? (
                    <div className="grid grid-cols-auto-fill gap-5 my-10">
                        {
                            series.map(s => (<SeriesPoster key={s.id} series={s} />))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default MediaView;