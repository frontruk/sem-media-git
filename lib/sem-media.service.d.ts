import { NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageModel } from './models/image';
export declare class SemMediaService {
    zone: NgZone;
    allImages?: Array<ImageModel>;
    tempImage: ImageModel;
    imageComponentChanges: Subject<any>;
    imageLoadChanges: Subject<any>;
    imageConfigChanges: Subject<any>;
    tempChanges: Subject<any>;
    constructor(zone: NgZone);
    onLoadEnd(event: any, fileName: any): void;
    putImage(image: File): void;
    putCroppedImage(key: number, croppedImage: string): void;
    disableAllImageEdit(): void;
    formChanged(index: any, formData: any): void;
    onEditImage(index: any, mode: any): void;
    onEditEnable(index: any): void;
    clearConfig(index: any): void;
    onDeleteImage(index: any): void;
    clearImages(): void;
}
