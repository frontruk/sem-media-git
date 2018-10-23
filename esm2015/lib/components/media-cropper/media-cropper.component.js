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
                selector: '[sem-cropper]',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL21lZGlhLWNyb3BwZXIvbWVkaWEtY3JvcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQ0wsT0FBTyxFQUVQLEtBQUssRUFDTCxPQUFPLEVBQ1AsVUFBVSxFQUNYLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBaUQxRCxNQUFNOzs7OztJQWNKLFlBQW9CLElBQVksRUFBUyxhQUE4QjtRQUFuRCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBVjlELFdBQU0sR0FBUSxFQUFFLENBQUM7UUFHaEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3pDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFdEQsZ0JBQVcsR0FBYSxLQUFLLENBQUM7UUFHOUIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFM0IsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNuQixPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQztZQUNYLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7WUFDZixRQUFRLEVBQUUsTUFBTTtZQUNoQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLEtBQUssRUFBRSxDQUFDLENB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QUNqQiwyQ0FBa0I7O0lBQ2xCLDBDQUE2Qjs7SUFDakIsbUNBQW9COztJQUFFLDRDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgT25DaGFuZ2VzLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFuZ3VsYXJDcm9wcGVyanNDb21wb25lbnQgfSBmcm9tICdhbmd1bGFyLWNyb3BwZXJqcyc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tzZW0tY3JvcHBlcl0nLFxuICB0ZW1wbGF0ZTogYDxkaXZcbiAgY2xhc3M9XCJpbWctY3JvcHBlclwiXG4gIChtb3VzZWVudGVyKT1cIm9uTW91c2VFbnRlcigpXCJcbiAgKG1vdXNlbGVhdmUpPVwib25Nb3VzZUxlYXZlKClcIj5cbiAgPGRpdiBjbGFzcz1cImVkaXQtb3ZlcmxheVwiIFtjbGFzcy5hY3RpdmVdPVwiaG92ZXJBY3RpdmVcIiAoZGJsY2xpY2spPVwiZWRpdEltYWdlKClcIj5cbiAgICA8YnV0dG9uICpuZ0lmPVwiaG92ZXJBY3RpdmVcIiBbQGVudGVyQW5pbWF0aW9uXSBjbGFzcz1cInAzXCIgKGNsaWNrKT1cImVkaXRJbWFnZSgpXCI+RWRpdCBNZSE8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxpbWdcbiAgICAqbmdJZj1cIiFjcm9wcGVkSW1hZ2UgJiYgIWVkaXRNb2RlXCJcbiAgICBbc3JjXT1cImltYWdlRGF0YVwiXG4gICAgY2xhc3M9XCJwcmV2aWV3LWltYWdlXCJcbiAgICAoZGJsY2xpY2spPVwiZWRpdEltYWdlKClcIlxuICA+XG4gIDxhbmd1bGFyLWNyb3BwZXJcbiAgICAqbmdJZj1cImVkaXRNb2RlXCJcbiAgICAjaW1hZ2VDcm9wcGVyXG4gICAgW2Nyb3BwZXJPcHRpb25zXT1cImNyb3BwZXJDb25maWdcIlxuICAgIFtpbWFnZVVybF09XCJpbWFnZURhdGFcIlxuICA+PC9hbmd1bGFyLWNyb3BwZXI+XG4gIDxpbWdcbiAgICAqbmdJZj1cImNyb3BwZWRJbWFnZSAmJiAhZWRpdE1vZGVcIlxuICAgIFtzcmNdPVwiY3JvcHBlZEltYWdlXCJcbiAgICBjbGFzcz1cImZpdFwiXG4gICAgW25nU3R5bGVdPVwiY3JvcHBlZFN0eWxlXCJcbiAgICAoZGJsY2xpY2spPVwiZWRpdEltYWdlKClcIj5cbiAgXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2t7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxe21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10MnttYXJnaW4tdG9wOjFyZW19Lm1yMnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxLDpob3N0IC5lZGl0LW92ZXJsYXkgYnV0dG9ue3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAye3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4MntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4Myw6aG9zdCAuZWRpdC1vdmVybGF5IGJ1dHRvbntwYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleHtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0YXJ0e2FsaWduLWNvbnRlbnQ6ZmxleC1zdGFydH0uY29udGVudC1lbmR7YWxpZ24tY29udGVudDpmbGV4LWVuZH0uY29udGVudC1jZW50ZXJ7YWxpZ24tY29udGVudDpjZW50ZXJ9LmNvbnRlbnQtYmV0d2VlbnthbGlnbi1jb250ZW50OnNwYWNlLWJldHdlZW59LmNvbnRlbnQtYXJvdW5ke2FsaWduLWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0cmV0Y2h7YWxpZ24tY29udGVudDpzdHJldGNofS5mbGV4LWF1dG97ZmxleDoxIDEgYXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjB9LmZsZXgtbm9uZXtmbGV4Om5vbmV9Lm9yZGVyLTB7b3JkZXI6MH0ub3JkZXItMXtvcmRlcjoxfS5vcmRlci0ye29yZGVyOjJ9Lm9yZGVyLTN7b3JkZXI6M30ub3JkZXItbGFzdHtvcmRlcjo5OTk5OX0ucmVsYXRpdmV7cG9zaXRpb246cmVsYXRpdmV9LmFic29sdXRle3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTB7dG9wOjB9LnJpZ2h0LTB7cmlnaHQ6MH0uYm90dG9tLTB7Ym90dG9tOjB9LmxlZnQtMHtsZWZ0OjB9Lnoxe3otaW5kZXg6MX0uejJ7ei1pbmRleDoyfS56M3t6LWluZGV4OjN9Lno0e3otaW5kZXg6NH0uYm9yZGVye2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MXB4fS5ib3JkZXItdG9we2JvcmRlci10b3Atc3R5bGU6c29saWQ7Ym9yZGVyLXRvcC13aWR0aDoxcHh9LmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweH0uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5ib3JkZXItbGVmdHtib3JkZXItbGVmdC1zdHlsZTpzb2xpZDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmJvcmRlci1ub25le2JvcmRlcjowfS5yb3VuZGVke2JvcmRlci1yYWRpdXM6M3B4fS5jaXJjbGV7Ym9yZGVyLXJhZGl1czo1MCV9LnJvdW5kZWQtdG9we2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LnJvdW5kZWQtcmlnaHR7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0ucm91bmRlZC1ib3R0b217Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0ucm91bmRlZC1sZWZ0e2JvcmRlci1yYWRpdXM6M3B4IDAgMCAzcHh9Lm5vdC1yb3VuZGVke2JvcmRlci1yYWRpdXM6MH0uaGlkZXtwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7aGVpZ2h0OjFweDt3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpfUBtZWRpYSAobWF4LXdpZHRoOjQwZW0pey54cy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pIGFuZCAobWF4LXdpZHRoOjUyZW0pey5zbS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pIGFuZCAobWF4LXdpZHRoOjY0ZW0pey5tZC1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdHtkaXNwbGF5OmJsb2NrfTpob3N0IC5pbWctY3JvcHBlcntwb3NpdGlvbjpyZWxhdGl2ZX06aG9zdCAucHJldmlldy1pbWFnZXt3aWR0aDoxMDAlfTpob3N0IC5lZGl0LW92ZXJsYXl7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dHJhbnNpdGlvbjouMnMgZWFzZS1pbn06aG9zdCAuZWRpdC1vdmVybGF5LmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjIpfTpob3N0IC5lZGl0LW92ZXJsYXkgYnV0dG9ue2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNik7cG9zaXRpb246YWJzb2x1dGU7bGVmdDo1MCU7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSl9YF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFxuICAgICAgJ2VudGVyQW5pbWF0aW9uJywgW1xuICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDB9KSxcbiAgICAgICAgICBhbmltYXRlKCc1MDBtcycsIHN0eWxlKHtvcGFjaXR5OiAxfSkpXG4gICAgICAgIF0pLFxuICAgICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDF9KSxcbiAgICAgICAgICBhbmltYXRlKCc1MDBtcycsIHN0eWxlKHtvcGFjaXR5OiAwfSkpXG4gICAgICAgIF0pXG4gICAgICBdXG4gICAgKVxuICBdLFxufSlcblxuZXhwb3J0IGNsYXNzIFNlbUNyb3BwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoJ2ltYWdlQ3JvcHBlcicpIHB1YmxpYyBpbWFnZUNyb3BwZXI6IEFuZ3VsYXJDcm9wcGVyanNDb21wb25lbnQ7XG4gIEBJbnB1dCgpIGltYWdlRGF0YTogc3RyaW5nO1xuICBASW5wdXQoKSBjcm9wcGVkSW1hZ2U6IHN0cmluZztcbiAgQElucHV0KCkgY29uZmlnOiBhbnkgPSB7fTtcbiAgQElucHV0KCkgZWRpdE1vZGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGtleTogbnVtYmVyO1xuICBAT3V0cHV0KCkgZW5hYmxlZENyb3BwZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNyb3BwZWRJbWFnZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIGNyb3BwZXJDb25maWc6IGFueTtcbiAgZWRpdFZpc2libGU6IEJvb2xlYW4gPSAgZmFsc2U7XG4gIGNyb3BwZWREYXRhOiBhbnk7XG4gIGNyb3BwZWRTdHlsZTogYW55O1xuICBob3ZlckFjdGl2ZTogQm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHVibGljIF9tZWRpYVNlcnZpY2U6IFNlbU1lZGlhU2VydmljZSkge1xuICAgIHRoaXMuY3JvcHBlckNvbmZpZyA9IHtcbiAgICAgIG1vdmFibGU6IHRydWUsXG4gICAgICBzY2FsYWJsZTogZmFsc2UsXG4gICAgICB6b29tYWJsZTogdHJ1ZSxcbiAgICAgIHZpZXdNb2RlOiAxLFxuICAgICAgZ3VpZGVzOiB0cnVlLFxuICAgICAgcm90YXRhYmxlOiB0cnVlLFxuICAgICAgZHJhZ01vZGU6ICdtb3ZlJyxcbiAgICAgIGNoZWNrQ3Jvc3NPcmlnaW46IHRydWUsXG4gICAgICByZWFkeTogKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQuY3JvcHBlci5jbGVhcigpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5jb25maWcgJiYgdGhpcy5pbWFnZUNyb3BwZXIpIHtcbiAgICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLmZpdCkge1xuICAgICAgICB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLnJlc2V0KCk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5jcm9wKSB7XG4gICAgICAgIC8vIHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIuc2V0RHJhZ01vZGUoJ2Nyb3AnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLnpvb20gIT09IDApIHtcbiAgICAgICAgdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci56b29tKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS56b29tKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLnJvdGF0ZSAhPT0gMCkge1xuICAgICAgICB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLnJvdGF0ZShjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUucm90YXRlKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLmFwcGx5KSB7XG4gICAgICAgIGNvbnN0IGNyb3BwZWRJbWFnZSA9IHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIuZ2V0Q3JvcHBlZENhbnZhcygpLnRvRGF0YVVSTCgnaW1hZ2UvanBnJyk7XG4gICAgICAgIHRoaXMuY3JvcHBlZERhdGEgPSB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLmdldENyb3BCb3hEYXRhKCk7XG4gICAgICAgIHRoaXMuY3JvcHBlZFN0eWxlID0ge1xuICAgICAgICAgICd0b3AucHgnOiB0aGlzLmNyb3BwZWREYXRhLnRvcCxcbiAgICAgICAgICAnbGVmdC5weCc6IHRoaXMuY3JvcHBlZERhdGEubGVmdCxcbiAgICAgICAgICAnd2lkdGgucHgnOiB0aGlzLmNyb3BwZWREYXRhLndpZHRoLFxuICAgICAgICAgICdoZWlnaHQucHgnOiB0aGlzLmNyb3BwZWREYXRhLmhlaWdodCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcm9wcGVkSW1hZ2VFdmVudC5lbWl0KGNyb3BwZWRJbWFnZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmtleSAmJiBjaGFuZ2VzLmtleS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMua2V5ID0gY2hhbmdlcy5rZXkuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuICBuZ09uSW5pdCgpIHt9XG4gIGltYWdlTG9hZGVkKCkge1xuICAgICAgLy8gc2hvdyBjcm9wcGVyXG4gIH1cbiAgbG9hZEltYWdlRmFpbGVkKCkge1xuICAgICAgLy8gc2hvdyBtZXNzYWdlXG4gIH1cbiAgZWRpdEltYWdlKCkge1xuICAgIHRoaXMuY3JvcHBlZEltYWdlID0gJyc7XG4gICAgdGhpcy5lbmFibGVkQ3JvcHBlci5lbWl0KCk7XG4gIH1cbiAgb25Nb3VzZUVudGVyKCkge1xuICAgIHRoaXMuaG92ZXJBY3RpdmUgPSB0cnVlO1xuICB9XG4gIG9uTW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLmhvdmVyQWN0aXZlID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==