export enum ContentIdType {
    Media = 0,
    Episode = 1,
}

export interface ContentId {
    id: number;
    type: ContentIdType.Media | ContentIdType.Episode;
}