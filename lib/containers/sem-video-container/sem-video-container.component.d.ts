import { OnInit, EventEmitter, Injector } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
export declare class SemVideoContainerComponent implements OnInit {
    private injector;
    data: any;
    dataChange: EventEmitter<any>;
    isOpened: boolean;
    isTestAOpened: boolean;
    constructor(injector: Injector);
    paginationConfig: PaginationInstance;
    selectedItem(item: any): void;
    ngOnInit(): void;
    closeOverlay(toggleStatus: boolean): void;
    openTestA(isOpened: boolean): void;
}
