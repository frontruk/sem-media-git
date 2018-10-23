import { OnInit, EventEmitter } from '@angular/core';
import { SemVideoService } from '../../sem-video.service';
export declare class SemVideoSettingsPanelComponent implements OnInit {
    private semVideoService;
    close: EventEmitter<boolean>;
    selected: EventEmitter<any>;
    results: Array<any>;
    config: any;
    page: number;
    loadSettings(): void;
    search(query: any): void;
    constructor(semVideoService: SemVideoService);
    ngOnInit(): void;
    addVideo(item: any): void;
    closeDialog(): void;
}
