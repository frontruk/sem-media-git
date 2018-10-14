import { OnInit, EventEmitter, OnChanges, NgZone } from '@angular/core';
import { CropperComponent as AngularCropperjsComponent } from 'angular-cropperjs';
import { SemMediaService } from '../../sem-media.service';
export declare class SemCropperComponent implements OnInit, OnChanges {
    private zone;
    _mediaService: SemMediaService;
    imageCropper: AngularCropperjsComponent;
    imageData: string;
    croppedImage: string;
    config: any;
    editMode: boolean;
    key: number;
    enabledCropper: EventEmitter<any>;
    croppedImageEvent: EventEmitter<any>;
    cropperConfig: any;
    editVisible: Boolean;
    croppedData: any;
    croppedStyle: any;
    hoverActive: Boolean;
    constructor(zone: NgZone, _mediaService: SemMediaService);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    imageLoaded(): void;
    loadImageFailed(): void;
    editImage(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
}
