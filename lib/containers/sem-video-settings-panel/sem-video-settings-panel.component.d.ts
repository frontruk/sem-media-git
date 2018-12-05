import { EventEmitter } from '@angular/core';
import { SemVideoService } from '../../sem-video.service';
import { YoutubeVideoModel } from '../../models/video';
import { VideoObject } from '../sem-video-container/sem-video-container.component';
export declare class SemVideoSettingsPanelComponent {
    private semVideoService;
    close: EventEmitter<boolean>;
    selected: EventEmitter<VideoObject>;
    config: any;
    dataId: string;
    results: Array<YoutubeVideoModel>;
    page: number;
    constructor(semVideoService: SemVideoService);
    loadSettings(): void;
    search(query: any): void;
    addVideo(item: YoutubeVideoModel): void;
    closeDialog(): void;
}
