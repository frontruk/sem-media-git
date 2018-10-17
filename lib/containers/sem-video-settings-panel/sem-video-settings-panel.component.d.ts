import { OnInit, EventEmitter } from '@angular/core';
import { SemVideoService } from '../../sem-video.service';
export declare class SemVideoSettingsPanelComponent implements OnInit {
    private semVideoService;
    close: EventEmitter<string>;
    results: Array<any>;
    config: any;
    page: number;
    selected: EventEmitter<any>;
    loadSettings(): void;
    search(query: any): void;
    worked(query: any): void;
    constructor(semVideoService: SemVideoService);
    ngOnInit(): void;
    addVideo(item: any): void;
}
