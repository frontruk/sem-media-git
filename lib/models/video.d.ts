export interface YoutubeVideoModel {
    videoId: string;
    title: string;
    thumbnailUrl: string;
    channelTitle: string;
    channelId: string;
    publishedAt?: string;
    description: string;
}
export declare class VideoModel {
    videoId: string;
    title: string;
    thumbnailUrl: string;
    channelTitle: string;
    channelId: string;
    description: string;
    constructor(videoId: string, title: string, thumbnailUrl: string, channelTitle: string, channelId: string, description: string);
}
