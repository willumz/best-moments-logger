import axios from "axios";
import React, { useEffect, useState } from "react";
import { ContentId, Log } from "../data_models";
import LogRecord from "./LogRecord";
import LogEntry from "./LogEntry";

interface Props {
    content_id: ContentId.ContentId;
}

const LogPane = (props: Props) => {
    const pushLog = (log: Log) => {
        setLogs([...logs, log]);
    }

    const updateLogs = (log: Log) => {
        setLogs(logs.map(l => {
            if (l.id === log.id) {
                return log;
            }
            return l;
        }));
    };

    const deleteLog = (log_id: number) => {
        setLogs(logs.filter(l => l.id !== log_id));
    }

    const [logs, setLogs] = useState<Log[]>([]);
    useEffect(() => {
        axios.get(`/api/${props.content_id.type === ContentId.ContentIdType.Media ? "media" : "episode"}/${props.content_id.id}}/log`).then(res => {
            setLogs(res.data);
        });
    }, [props.content_id]);
  return (
    <>
        <LogEntry content_id={props.content_id} pushLog={pushLog} />
        <div className="py-6">
            {
                logs.sort((a: Log, b: Log) => a.time - b.time).map(l => (<><LogRecord key={l.id} log={l} updateLogs={updateLogs} deleteLog={deleteLog} /><br /></>))
            }
        </div>
    </>
  )
}

export default LogPane