import axios from "axios";
import React, { useState } from "react";
import { ContentId, Log } from "../data_models";

interface Props {
    content_id: ContentId.ContentId;
    pushLog: (log: Log) => void;
    small?: boolean;
    defaultNote?: string;
    defaultTime?: number;
    updateRecordId?: number;
    onDelete?: () => void;
}

const LogEntry = (props: Props) => {
    
    const secondsToFormattedTime = (time_seconds: number): string => {
        let minutes = Math.floor(time_seconds / 60);
        let seconds = time_seconds % 60;
        let hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    const [renderedTime, setRenderedTime] = useState(props.defaultTime === undefined ? "00:00:00" : secondsToFormattedTime(props.defaultTime));
    const [note, setNote] = useState(props.defaultNote === undefined ? "" : props.defaultNote);

    const keyDown = (e: any) => {
        e.preventDefault();
        let time = renderedTime.replaceAll(":", "").replace(/^0+/, "");
        if (["Backspace", "Delete"].includes(e.key)) time = time.substring(0, time.length-1);
        else if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
            if (time.length < 6) time += e.key;
        }
        let t = time.padStart(6, "0");
        t = `${t.substring(0, 2)}:${t.substring(2, 4)}:${t.substring(4,6)}`
        setRenderedTime(t);
    };
    
    const clickBtn = (e: any) => {
        let time = renderedTime.replaceAll(":", "")
        let hours = parseInt(time.substring(0, 2));
        let minutes = parseInt(time.substring(2, 4));
        let seconds = parseInt(time.substring(4, 6));
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        if (props.updateRecordId === undefined) {
            axios.post("/api/log", {
                content_id: props.content_id,
                note: note,
                time: totalSeconds
            }).then(res => {
                props.pushLog(res.data);
                setNote("");
                setRenderedTime("00:00:00");
            });
        } else {
            axios.patch(`/api/log/${props.updateRecordId}`, {
                content_id: props.content_id,
                note: note,
                time: totalSeconds
            }).then(res => {
                props.pushLog(res.data);
                setNote("");
                setRenderedTime("00:00:00");
            });
        }
    };

  return (
    <div className="py-6 px-2 inline-block">
        <input className={`rounded-md bg-slate-700 text-white text-2xl p-2 inline-block ${props.small ? "h-5" : "h-10"} align-top`} onKeyDown={keyDown} size={8} type="text" value={renderedTime} />
        <textarea className={`rounded-md bg-slate-700 text-white text-lg p-2 inline-block ${props.small ? "h-5" : "h-10"} mx-2 align-top resize-none`} placeholder="Note..." value={note} onInput={(e: any) => setNote(e.target.value)} />
        <br />
        <button className="rounded-md bg-blue-800 text-white text-lg p-2 inline-block my-2 w-20" onClick={clickBtn}>Log</button>
        {props.onDelete && <button className="rounded-md bg-red-800 text-white text-lg p-2 inline-block my-2 w-20" onClick={props.onDelete}>Delete</button>}
    </div>
  )
}

export default LogEntry