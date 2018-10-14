/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, NgZone } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AngularCropperjsComponent } from 'angular-cropperjs';
import { SemMediaService } from '../../sem-media.service';
export class SemCropperComponent {
    /**
     * @param {?} zone
     * @param {?} _mediaService
     */
    constructor(zone, _mediaService) {
        this.zone = zone;
        this._mediaService = _mediaService;
        this.config = {};
        this.enabledCropper = new EventEmitter();
        this.croppedImageEvent = new EventEmitter();
        this.editVisible = false;
        this.hoverActive = false;
        this.cropperConfig = {
            movable: true,
            scalable: false,
            zoomable: true,
            viewMode: 1,
            guides: true,
            rotatable: true,
            dragMode: 'move',
            checkCrossOrigin: true,
            ready: (e) => {
                e.target.cropper.clear();
            }
        };
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.config && this.imageCropper) {
            if (changes.config.currentValue && changes.config.currentValue.fit) {
                this.imageCropper.cropper.reset();
            }
            if (changes.config.currentValue && changes.config.currentValue.crop) {
                // this.imageCropper.cropper.setDragMode('crop');
            }
            if (changes.config.currentValue && changes.config.currentValue.zoom !== 0) {
                this.imageCropper.cropper.zoom(changes.config.currentValue.zoom);
            }
            if (changes.config.currentValue && changes.config.currentValue.rotate !== 0) {
                this.imageCropper.cropper.rotate(changes.config.currentValue.rotate);
            }
            if (changes.config.currentValue && changes.config.currentValue.apply) {
                /** @type {?} */
                const croppedImage = this.imageCropper.cropper.getCroppedCanvas().toDataURL('image/jpg');
                this.croppedData = this.imageCropper.cropper.getCropBoxData();
                this.croppedStyle = {
                    'top.px': this.croppedData.top,
                    'left.px': this.croppedData.left,
                    'width.px': this.croppedData.width,
                    'height.px': this.croppedData.height,
                };
                this.croppedImageEvent.emit(croppedImage);
            }
        }
        if (changes.key && changes.key.currentValue) {
            this.key = changes.key.currentValue;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    imageLoaded() {
        // show cropper
    }
    /**
     * @return {?}
     */
    loadImageFailed() {
        // show message
    }
    /**
     * @return {?}
     */
    editImage() {
        this.croppedImage = '';
        this.enabledCropper.emit();
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.hoverActive = true;
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.hoverActive = false;
    }
}
SemCropperComponent.decorators = [
    { type: Component, args: [{
                selector: 'sem-cropper',
                template: `<div
  class="img-cropper"
  (mouseenter)="onMouseEnter()"
  (mouseleave)="onMouseLeave()">
  <div class="edit-overlay" [class.active]="hoverActive" (dblclick)="editImage()">
    <button *ngIf="hoverActive" [@enterAnimation] class="p3" (click)="editImage()">Edit Me!</button>
  </div>
  <img
    *ngIf="!croppedImage && !editMode"
    [src]="imageData"
    class="preview-image"
    (dblclick)="editImage()"
  >
  <angular-cropper
    *ngIf="editMode"
    #imageCropper
    [cropperOptions]="cropperConfig"
    [imageUrl]="imageData"
  ></angular-cropper>
  <img
    *ngIf="croppedImage && !editMode"
    [src]="croppedImage"
    class="fit"
    [ngStyle]="croppedStyle"
    (dblclick)="editImage()">
  
</div>
`,
                styles: [`.h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:" ";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .edit-overlay button{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3,:host .edit-overlay button{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{display:block}:host .img-cropper{position:relative}:host .preview-image{width:100%}:host .edit-overlay{position:absolute;top:0;left:0;width:100%;height:100%;transition:.2s ease-in}:host .edit-overlay.active{background-color:rgba(0,0,0,.2)}:host .edit-overlay button{background-color:rgba(255,255,255,.6);position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}`],
                animations: [
                    trigger('enterAnimation', [
                        transition(':enter', [
                            style({ opacity: 0 }),
                            animate('500ms', style({ opacity: 1 }))
                        ]),
                        transition(':leave', [
                            style({ opacity: 1 }),
                            animate('500ms', style({ opacity: 0 }))
                        ])
                    ])
                ],
            },] },
];
SemCropperComponent.ctorParameters = () => [
    { type: NgZone },
    { type: SemMediaService }
];
SemCropperComponent.propDecorators = {
    imageCropper: [{ type: ViewChild, args: ['imageCropper',] }],
    imageData: [{ type: Input }],
    croppedImage: [{ type: Input }],
    config: [{ type: Input }],
    editMode: [{ type: Input }],
    key: [{ type: Input }],
    enabledCropper: [{ type: Output }],
    croppedImageEvent: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    SemCropperComponent.prototype.imageCropper;
    /** @type {?} */
    SemCropperComponent.prototype.imageData;
    /** @type {?} */
    SemCropperComponent.prototype.croppedImage;
    /** @type {?} */
    SemCropperComponent.prototype.config;
    /** @type {?} */
    SemCropperComponent.prototype.editMode;
    /** @type {?} */
    SemCropperComponent.prototype.key;
    /** @type {?} */
    SemCropperComponent.prototype.enabledCropper;
    /** @type {?} */
    SemCropperComponent.prototype.croppedImageEvent;
    /** @type {?} */
    SemCropperComponent.prototype.cropperConfig;
    /** @type {?} */
    SemCropperComponent.prototype.editVisible;
    /** @type {?} */
    SemCropperComponent.prototype.croppedData;
    /** @type {?} */
    SemCropperComponent.prototype.croppedStyle;
    /** @type {?} */
    SemCropperComponent.prototype.hoverActive;
    /** @type {?} */
    SemCropperComponent.prototype.zone;
    /** @type {?} */
    SemCropperComponent.prototype._mediaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL21lZGlhLWNyb3BwZXIvbWVkaWEtY3JvcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQ0wsT0FBTyxFQUVQLEtBQUssRUFDTCxPQUFPLEVBQ1AsVUFBVSxFQUNYLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBaUQxRCxNQUFNOzs7OztJQWNKLFlBQW9CLElBQVksRUFBUyxhQUE4QjtRQUFuRCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBVjlELFdBQU0sR0FBUSxFQUFFLENBQUM7UUFHaEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3pDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFdEQsZ0JBQVcsR0FBYSxLQUFLLENBQUM7UUFHOUIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFM0IsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNuQixPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQztZQUNYLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7WUFDZixRQUFRLEVBQUUsTUFBTTtZQUNoQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLEtBQUssRUFBRSxDQUFDLENB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QUNqQiwyQ0FBa0I7O0lBQ2xCLDBDQUE2Qjs7SUFDakIsbUNBQW9COztJQUFFLDRDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgT25DaGFuZ2VzLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFuZ3VsYXJDcm9wcGVyanNDb21wb25lbnQgfSBmcm9tICdhbmd1bGFyLWNyb3BwZXJqcyc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1jcm9wcGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIGNsYXNzPVwiaW1nLWNyb3BwZXJcIlxuICAobW91c2VlbnRlcik9XCJvbk1vdXNlRW50ZXIoKVwiXG4gIChtb3VzZWxlYXZlKT1cIm9uTW91c2VMZWF2ZSgpXCI+XG4gIDxkaXYgY2xhc3M9XCJlZGl0LW92ZXJsYXlcIiBbY2xhc3MuYWN0aXZlXT1cImhvdmVyQWN0aXZlXCIgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCI+XG4gICAgPGJ1dHRvbiAqbmdJZj1cImhvdmVyQWN0aXZlXCIgW0BlbnRlckFuaW1hdGlvbl0gY2xhc3M9XCJwM1wiIChjbGljayk9XCJlZGl0SW1hZ2UoKVwiPkVkaXQgTWUhPC9idXR0b24+XG4gIDwvZGl2PlxuICA8aW1nXG4gICAgKm5nSWY9XCIhY3JvcHBlZEltYWdlICYmICFlZGl0TW9kZVwiXG4gICAgW3NyY109XCJpbWFnZURhdGFcIlxuICAgIGNsYXNzPVwicHJldmlldy1pbWFnZVwiXG4gICAgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCJcbiAgPlxuICA8YW5ndWxhci1jcm9wcGVyXG4gICAgKm5nSWY9XCJlZGl0TW9kZVwiXG4gICAgI2ltYWdlQ3JvcHBlclxuICAgIFtjcm9wcGVyT3B0aW9uc109XCJjcm9wcGVyQ29uZmlnXCJcbiAgICBbaW1hZ2VVcmxdPVwiaW1hZ2VEYXRhXCJcbiAgPjwvYW5ndWxhci1jcm9wcGVyPlxuICA8aW1nXG4gICAgKm5nSWY9XCJjcm9wcGVkSW1hZ2UgJiYgIWVkaXRNb2RlXCJcbiAgICBbc3JjXT1cImNyb3BwZWRJbWFnZVwiXG4gICAgY2xhc3M9XCJmaXRcIlxuICAgIFtuZ1N0eWxlXT1cImNyb3BwZWRTdHlsZVwiXG4gICAgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCI+XG4gIFxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2Nre2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMXttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MSw6aG9zdCAuZWRpdC1vdmVybGF5IGJ1dHRvbntwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDMsOmhvc3QgLmVkaXQtb3ZlcmxheSBidXR0b257cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZle3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZXtwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3R7ZGlzcGxheTpibG9ja306aG9zdCAuaW1nLWNyb3BwZXJ7cG9zaXRpb246cmVsYXRpdmV9Omhvc3QgLnByZXZpZXctaW1hZ2V7d2lkdGg6MTAwJX06aG9zdCAuZWRpdC1vdmVybGF5e3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3RyYW5zaXRpb246LjJzIGVhc2UtaW59Omhvc3QgLmVkaXQtb3ZlcmxheS5hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4yKX06aG9zdCAuZWRpdC1vdmVybGF5IGJ1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjYpO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NTAlO3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpfWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcbiAgICAgICdlbnRlckFuaW1hdGlvbicsIFtcbiAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwfSksXG4gICAgICAgICAgYW5pbWF0ZSgnNTAwbXMnLCBzdHlsZSh7b3BhY2l0eTogMX0pKVxuICAgICAgICBdKSxcbiAgICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAxfSksXG4gICAgICAgICAgYW5pbWF0ZSgnNTAwbXMnLCBzdHlsZSh7b3BhY2l0eTogMH0pKVxuICAgICAgICBdKVxuICAgICAgXVxuICAgIClcbiAgXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW1Dcm9wcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCdpbWFnZUNyb3BwZXInKSBwdWJsaWMgaW1hZ2VDcm9wcGVyOiBBbmd1bGFyQ3JvcHBlcmpzQ29tcG9uZW50O1xuICBASW5wdXQoKSBpbWFnZURhdGE6IHN0cmluZztcbiAgQElucHV0KCkgY3JvcHBlZEltYWdlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbmZpZzogYW55ID0ge307XG4gIEBJbnB1dCgpIGVkaXRNb2RlOiBib29sZWFuO1xuICBASW5wdXQoKSBrZXk6IG51bWJlcjtcbiAgQE91dHB1dCgpIGVuYWJsZWRDcm9wcGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjcm9wcGVkSW1hZ2VFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBjcm9wcGVyQ29uZmlnOiBhbnk7XG4gIGVkaXRWaXNpYmxlOiBCb29sZWFuID0gIGZhbHNlO1xuICBjcm9wcGVkRGF0YTogYW55O1xuICBjcm9wcGVkU3R5bGU6IGFueTtcbiAgaG92ZXJBY3RpdmU6IEJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHB1YmxpYyBfbWVkaWFTZXJ2aWNlOiBTZW1NZWRpYVNlcnZpY2UpIHtcbiAgICB0aGlzLmNyb3BwZXJDb25maWcgPSB7XG4gICAgICBtb3ZhYmxlOiB0cnVlLFxuICAgICAgc2NhbGFibGU6IGZhbHNlLFxuICAgICAgem9vbWFibGU6IHRydWUsXG4gICAgICB2aWV3TW9kZTogMSxcbiAgICAgIGd1aWRlczogdHJ1ZSxcbiAgICAgIHJvdGF0YWJsZTogdHJ1ZSxcbiAgICAgIGRyYWdNb2RlOiAnbW92ZScsXG4gICAgICBjaGVja0Nyb3NzT3JpZ2luOiB0cnVlLFxuICAgICAgcmVhZHk6IChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LmNyb3BwZXIuY2xlYXIoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuY29uZmlnICYmIHRoaXMuaW1hZ2VDcm9wcGVyKSB7XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5maXQpIHtcbiAgICAgICAgdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5yZXNldCgpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuY3JvcCkge1xuICAgICAgICAvLyB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLnNldERyYWdNb2RlKCdjcm9wJyk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS56b29tICE9PSAwKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIuem9vbShjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuem9vbSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5yb3RhdGUgIT09IDApIHtcbiAgICAgICAgdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5yb3RhdGUoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLnJvdGF0ZSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5hcHBseSkge1xuICAgICAgICBjb25zdCBjcm9wcGVkSW1hZ2UgPSB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLmdldENyb3BwZWRDYW52YXMoKS50b0RhdGFVUkwoJ2ltYWdlL2pwZycpO1xuICAgICAgICB0aGlzLmNyb3BwZWREYXRhID0gdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5nZXRDcm9wQm94RGF0YSgpO1xuICAgICAgICB0aGlzLmNyb3BwZWRTdHlsZSA9IHtcbiAgICAgICAgICAndG9wLnB4JzogdGhpcy5jcm9wcGVkRGF0YS50b3AsXG4gICAgICAgICAgJ2xlZnQucHgnOiB0aGlzLmNyb3BwZWREYXRhLmxlZnQsXG4gICAgICAgICAgJ3dpZHRoLnB4JzogdGhpcy5jcm9wcGVkRGF0YS53aWR0aCxcbiAgICAgICAgICAnaGVpZ2h0LnB4JzogdGhpcy5jcm9wcGVkRGF0YS5oZWlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JvcHBlZEltYWdlRXZlbnQuZW1pdChjcm9wcGVkSW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5rZXkgJiYgY2hhbmdlcy5rZXkuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmtleSA9IGNoYW5nZXMua2V5LmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cbiAgbmdPbkluaXQoKSB7fVxuICBpbWFnZUxvYWRlZCgpIHtcbiAgICAgIC8vIHNob3cgY3JvcHBlclxuICB9XG4gIGxvYWRJbWFnZUZhaWxlZCgpIHtcbiAgICAgIC8vIHNob3cgbWVzc2FnZVxuICB9XG4gIGVkaXRJbWFnZSgpIHtcbiAgICB0aGlzLmNyb3BwZWRJbWFnZSA9ICcnO1xuICAgIHRoaXMuZW5hYmxlZENyb3BwZXIuZW1pdCgpO1xuICB9XG4gIG9uTW91c2VFbnRlcigpIHtcbiAgICB0aGlzLmhvdmVyQWN0aXZlID0gdHJ1ZTtcbiAgfVxuICBvbk1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5ob3ZlckFjdGl2ZSA9IGZhbHNlO1xuICB9XG59XG4iXX0=