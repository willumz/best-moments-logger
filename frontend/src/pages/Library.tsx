import axios from "axios";
import React, { useState, useEffect } from "react";
import LibraryMedia from "../components/LibraryMedia";
import { Media, LibraryItem } from "../data_models";

const Library = () => {
  const [media, setMedia] = useState<Media[]>([]);
  useEffect(() => {
    axios.get("/api/libraryitem").then(res => {
      res.data.forEach((libraryitem: LibraryItem) => {
        axios.get(`/api/media/${libraryitem.media_id}`).then(res => {
          setMedia(media => [...media, res.data]);
        });
      });
    });
  }, []);
  return (
    <div className="bg-slate-900 w-full min-w-screen min-h-screen h-full p-20">
      <div className="grid grid-cols-auto-fill gap-5">
        {
          media.map(m => (<LibraryMedia key={m.id} media={m} />))
        }
      </div>
    </div>
  )
}

export default Library