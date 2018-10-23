import { EventEmitter } from '@angular/core';
import { SemVideoService } from '../../sem-video.service';
import { YoutubeVideoModel } from '../../models/video';
export declare class SemVideoSettingsPanelComponent {
    private semVideoService;
    close: EventEmitter<boolean>;
    selected: EventEmitter<YoutubeVideoModel>;
    config: any;
    results: Array<YoutubeVideoModel>;
    page: number;
    constructor(semVideoService: SemVideoService);
    loadSettings(): void;
    search(query: any): void;
    addVideo(item: any): void;
    closeDialog(): void;
}
