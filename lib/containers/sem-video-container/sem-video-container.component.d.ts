import { OnInit, EventEmitter, Injector } from '@angular/core';
import { YoutubeVideoModel } from '../../models/video';
export interface VideoObject {
    id: string;
    data: YoutubeVideoModel | null;
}
export declare class SemVideoContainerComponent implements OnInit {
    private injector;
    data: VideoObject;
    dataChange: EventEmitter<any>;
    selectedItem: EventEmitter<string>;
    editMode: boolean;
    isTestAOpened: boolean;
    constructor(injector: Injector);
    ngOnInit(): void;
    openSettings(status: boolean): void;
}
