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
    search(query: any): void;
    selectedItem(item: any): void;
    ngOnInit(): void;
    closeOverlay(item: any): void;
    openTestA(isOpened: boolean): void;
}
