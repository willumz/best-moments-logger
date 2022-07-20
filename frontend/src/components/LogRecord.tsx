import React, { useEffect, useState } from "react";
import { ContentId, Log } from "../data_models";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogEntry from "./LogEntry";
import axios from "axios";

interface Props {
    log: Log;
    updateLogs: (log: Log) => void;
    deleteLog: (log_id: number) => void;
}

const LogRecord = (props: Props) => {
  const [time, setTime] = useState<string>(props.log.time.toString());
  const [editing, setEditing] = useState<boolean>(false);
  const trimNote = (note: string) => {
    if (note.length > 100) {
      return note.substring(0, 100) + "...";
    }
    return note;
  }
  useEffect(() => {
    let minutes = Math.floor(props.log.time / 60);
    let seconds = props.log.time % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    setTime(`${hours > 0 ? `${hours < 10 ? "0" : ""}${hours}:` : ""}${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
  }, [props.log]);

  const editRecord = () => {
    setEditing(true);
  };

  const updateLog = (log: Log) => {
    setEditing(false);
    props.updateLogs(log);
  }

  const onDelete = () => {
    setEditing(false);
    axios.delete(`/api/log/${props.log.id}`).then(res => {
      props.deleteLog(props.log.id);
    });
  };

  return (
    <>

    { !editing ? (
      <div className="py-2 inline-block w-full">
          <div className="text-white text-lg inline px-2">{time}</div>
          <div className="text-white text-lg inline">{trimNote(props.log.note)}</div>
          <i className="bi bi-pencil-fill inline text-white px-2 hover:text-blue-300 float-right" onClick={editRecord}></i>
        </div>
      ) : (
        <LogEntry content_id={ props.log.media_id === null ? {
          id: props.log.episode_id,
          type: ContentId.ContentIdType.Episode,
        } : {
          id: props.log.media_id,
          type: ContentId.ContentIdType.Media,
        }} pushLog={updateLog} defaultNote={props.log.note} defaultTime={props.log.time} updateRecordId={props.log.id} onDelete={onDelete} />
        )
      }
      </>
  )
}

export default LogRecord;