import mariadb from "mariadb";

const CREATE_STATEMENTS = {
    episodes: `
        CREATE TABLE IF NOT EXISTS \`episodes\` (
        \`episode_id\` int(11) NOT NULL AUTO_INCREMENT,
        \`series_id\` int(11) NOT NULL,
        \`name\` varchar(100) DEFAULT NULL,
        \`order\` int(11) DEFAULT NULL,
        \`image_url\` varchar(100) DEFAULT NULL,
        \`tmdb_id\` int(11) DEFAULT NULL,
        PRIMARY KEY (\`episode_id\`),
        KEY \`episodes_FK\` (\`series_id\`),
        CONSTRAINT \`episodes_FK\` FOREIGN KEY (\`series_id\`) REFERENCES \`series\` (\`series_id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
    logs: `
        CREATE TABLE IF NOT EXISTS \`logs\` (
        \`log_id\` int(11) NOT NULL AUTO_INCREMENT,
        \`episode_id\` int(11) DEFAULT NULL COMMENT 'If this then not media_id',
        \`media_id\` int(11) DEFAULT NULL COMMENT 'If this then not episode_id',
        \`time\` int(11) NOT NULL COMMENT 'TIme in seconds from start',
        \`note\` varchar(1000) DEFAULT NULL COMMENT 'The note given alongside the log',
        \`time_created\` datetime DEFAULT NULL COMMENT 'The datetime at which the log was created',
        PRIMARY KEY (\`log_id\`),
        KEY \`logs_episode_FK\` (\`episode_id\`),
        KEY \`logs_media_FK\` (\`media_id\`),
        CONSTRAINT \`logs_episode_FK\` FOREIGN KEY (\`episode_id\`) REFERENCES \`episodes\` (\`episode_id\`) ON UPDATE CASCADE,
        CONSTRAINT \`logs_media_FK\` FOREIGN KEY (\`media_id\`) REFERENCES \`media\` (\`media_id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
    media: `
        CREATE TABLE IF NOT EXISTS \`media\` (
        \`media_id\` int(11) NOT NULL AUTO_INCREMENT,
        \`name\` varchar(100) DEFAULT NULL,
        \`image_url\` varchar(100) DEFAULT NULL,
        \`tmdb_id\` int(11) DEFAULT NULL,
        PRIMARY KEY (\`media_id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
    series: `
        CREATE TABLE IF NOT EXISTS \`series\` (
        \`series_id\` int(11) NOT NULL AUTO_INCREMENT,
        \`media_id\` int(11) NOT NULL,
        \`name\` varchar(100) DEFAULT NULL,
        \`image_url\` varchar(100) DEFAULT NULL,
        \`order\` int(11) DEFAULT NULL,
        \`tmdb_id\` int(11) DEFAULT NULL,
        PRIMARY KEY (\`series_id\`),
        KEY \`series_FK\` (\`media_id\`),
        CONSTRAINT \`series_FK\` FOREIGN KEY (\`media_id\`) REFERENCES \`media\` (\`media_id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
    tag_log: `
        CREATE TABLE IF NOT EXISTS \`tag_log\` (
        \`tag_log_id\` int(11) NOT NULL AUTO_INCREMENT,
        \`tag_id\` int(11) DEFAULT NULL,
        \`log_id\` int(11) DEFAULT NULL,
        PRIMARY KEY (\`tag_log_id\`),
        KEY \`tag_log_tag_FK\` (\`tag_id\`),
        KEY \`tag_log_log_FK\` (\`log_id\`),
        CONSTRAINT \`tag_log_log_FK\` FOREIGN KEY (\`log_id\`) REFERENCES \`logs\` (\`log_id\`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT \`tag_log_tag_FK\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\` (\`tag_id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
    tags: `
        CREATE TABLE IF NOT EXISTS \`tags\` (
        \`tag_id\` int(11) NOT NULL AUTO_INCREMENT,
        \`name\` varchar(100) DEFAULT NULL,
        PRIMARY KEY (\`tag_id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
    tag_episode: `
        CREATE TABLE IF NOT EXISTS \`tag_episode\` (
        \`tag_episode_id\` int(11) auto_increment NOT NULL,
        \`tag_id\` int(11) NULL,
        \`episode_id\` int(11) NULL,
        CONSTRAINT \`tag_episode_PK\` PRIMARY KEY (tag_episode_id),
        CONSTRAINT \`tag_episode_episode_FK\` FOREIGN KEY (episode_id) REFERENCES \`episodes\` (\`episode_id\`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT \`tag_episode_tag_FK\` FOREIGN KEY (tag_id) REFERENCES \`tags\` (\`tag_id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
    tag_series: `
        CREATE TABLE IF NOT EXISTS \`tag_series\` (
        \`tag_series_id\` int(11) auto_increment NOT NULL,
        \`tag_id\` int(11) NULL,
        \`series_id\` int(11) NULL,
        CONSTRAINT \`tag_series_PK\` PRIMARY KEY (tag_series_id),
        CONSTRAINT \`tag_series_series_FK\` FOREIGN KEY (series_id) REFERENCES \`series\` (\`series_id\`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT \`tag_series_tag_FK\` FOREIGN KEY (tag_id) REFERENCES \`tags\` (\`tag_id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
    tag_media: `
        CREATE TABLE IF NOT EXISTS \`tag_media\` (
        \`tag_media_id\` int(11) auto_increment NOT NULL,
        \`tag_id\` int(11) NULL,
        \`media_id\` int(11) NULL,
        CONSTRAINT \`tag_media_PK\` PRIMARY KEY (tag_media_id),
        CONSTRAINT \`tag_media_media_FK\` FOREIGN KEY (media_id) REFERENCES \`media\` (\`media_id\`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT \`tag_media_tag_FK\` FOREIGN KEY (tag_id) REFERENCES \`tags\` (\`tag_id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
    libraryitem: `
        CREATE TABLE IF NOT EXISTS \`libraryitem\` (
        \`libraryitem_id\` int(11) auto_increment NOT NULL,
        \`media_id\` int(11) NULL,
        CONSTRAINT \`libraryitem_PK\` PRIMARY KEY (libraryitem_id),
        CONSTRAINT \`libraryitem_FK\` FOREIGN KEY (media_id) REFERENCES \`media\` (\`media_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
};

export default async function init(pool: mariadb.Pool) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(CREATE_STATEMENTS.media);
        await conn.query(CREATE_STATEMENTS.series);
        await conn.query(CREATE_STATEMENTS.episodes);
        await conn.query(CREATE_STATEMENTS.logs);
        await conn.query(CREATE_STATEMENTS.tags);
        await conn.query(CREATE_STATEMENTS.tag_log);
        await conn.query(CREATE_STATEMENTS.tag_episode);
        await conn.query(CREATE_STATEMENTS.tag_series);
        await conn.query(CREATE_STATEMENTS.tag_media);
        await conn.query(CREATE_STATEMENTS.libraryitem);
        console.log("Initialised database");
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
    // pool.getConnection().then(conn => {
    //     conn.query(CREATE_STATEMENTS.media).then(() => {
    //         conn.query(CREATE_STATEMENTS.series).then(() => {
    //             conn.query(CREATE_STATEMENTS.episodes).then(() => {
    //                 conn.query(CREATE_STATEMENTS.logs).then(() => {
    //                     conn.query(CREATE_STATEMENTS.tags).then(() => {
    //                         conn.query(CREATE_STATEMENTS.tag_log);
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });
}
