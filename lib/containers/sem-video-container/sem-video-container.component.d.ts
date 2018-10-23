import { OnInit, EventEmitter, Injector } from '@angular/core';
import { YoutubeVideoModel } from '../../models/video';
import { PaginationInstance } from 'ngx-pagination';
export declare class SemVideoContainerComponent implements OnInit {
    private injector;
    data: YoutubeVideoModel;
    dataChange: EventEmitter<any>;
    isTestAOpened: boolean;
    constructor(injector: Injector);
    paginationConfig: PaginationInstance;
    selectedItem(item: YoutubeVideoModel): void;
    ngOnInit(): void;
    closeOverlay(toggleStatus: boolean): void;
    openTestA(isOpened: boolean): void;
}
