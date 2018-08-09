import { EventEmitter, NgZone } from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
export declare class SemUploadComponent {
    private zone;
    doneImage: EventEmitter<any>;
    visibleImage: Boolean;
    files: UploadFile[];
    constructor(zone: NgZone);
    loadedImage(): void;
    dropped(event: UploadEvent): void;
    fileChangeEvent(event: any): void;
    fileOver(event: any): void;
    fileLeave(event: any): void;
}
