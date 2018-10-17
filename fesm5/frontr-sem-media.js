import { Injectable, NgZone, Pipe, Inject, PLATFORM_ID, NgModule, Component, Output, EventEmitter, Input, ViewChild, ChangeDetectionStrategy, Injector, ViewEncapsulation, defineInjectable, inject } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { __spread, __values } from 'tslib';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SemUiButtonModule, SemUiButtonFabModule, SemUiOverlayDialogModule, SemUiTabsModule, SemUiThumbnailLargeModule } from '@frontr/sem-ui';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FileDropModule } from 'ngx-file-drop';
import { NgxPaginationModule } from 'ngx-pagination';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemMediaService = /** @class */ (function () {
    function SemMediaService(zone) {
        this.zone = zone;
        this.allImages = [];
        this.tempImage = (/** @type {?} */ ({}));
        this.imageComponentChanges = new Subject();
        this.imageLoadChanges = new Subject();
        this.imageConfigChanges = new Subject();
        this.tempChanges = new Subject();
        this.tempImage.editMode = false,
            this.tempImage.fileName = '';
        this.tempImage.controlBox = {
            allText: '',
            metaTitle: '',
            config: {
                fit: false,
                crop: false,
                zoom: 0,
                rotate: 0,
                apply: false,
            }
        };
        this.tempImage.croppedImage = '';
        this.tempImage.uploadedImage = '';
    }
    /**
     * @param {?} event
     * @param {?} fileName
     * @return {?}
     */
    SemMediaService.prototype.onLoadEnd = /**
     * @param {?} event
     * @param {?} fileName
     * @return {?}
     */
    function (event, fileName) {
        var _this = this;
        this.zone.run(function () {
            _this.tempImage.fileName = fileName;
            _this.tempImage.uploadedImage = event.target.result;
            // this.disableAllImageEdit();
            _this.allImages.push(cloneDeep(_this.tempImage));
            _this.imageLoadChanges.next(cloneDeep(_this.allImages));
        });
    };
    /**
     * @param {?} image
     * @return {?}
     */
    SemMediaService.prototype.putImage = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        var _this = this;
        /** @type {?} */
        var fileReader = new FileReader();
        fileReader.onloadend = function (e) { return _this.onLoadEnd(e, image.name); };
        fileReader.readAsDataURL(image);
    };
    /**
     * @param {?} key
     * @param {?} croppedImage
     * @return {?}
     */
    SemMediaService.prototype.putCroppedImage = /**
     * @param {?} key
     * @param {?} croppedImage
     * @return {?}
     */
    function (key, croppedImage) {
        this.allImages[key].croppedImage = croppedImage;
        this.allImages[key].editMode = false;
        this.imageComponentChanges.next(cloneDeep(this.allImages));
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    };
    /**
     * @return {?}
     */
    SemMediaService.prototype.disableAllImageEdit = /**
     * @return {?}
     */
    function () {
        for (var i = 0; i < this.allImages.length; i++) {
            this.allImages[i].editMode = false;
        }
    };
    /**
     * @param {?} index
     * @param {?} formData
     * @return {?}
     */
    SemMediaService.prototype.formChanged = /**
     * @param {?} index
     * @param {?} formData
     * @return {?}
     */
    function (index, formData) {
        this.allImages[index].controlBox.allText = formData.allText;
        this.allImages[index].controlBox.metaTitle = formData.metaTitle;
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    };
    /**
     * @param {?} index
     * @param {?} mode
     * @return {?}
     */
    SemMediaService.prototype.onEditImage = /**
     * @param {?} index
     * @param {?} mode
     * @return {?}
     */
    function (index, mode) {
        switch (mode) {
            case 'FIT':
                this.allImages[index].controlBox.config.fit = true;
                break;
            case 'CROP':
                this.allImages[index].controlBox.config.crop = true;
                break;
            case 'ZOOM_IN':
                this.allImages[index].controlBox.config.zoom = 0.1;
                break;
            case 'ZOOM_OUT':
                this.allImages[index].controlBox.config.zoom = -0.1;
                break;
            case 'ROTATE_LEFT':
                this.allImages[index].controlBox.config.rotate = 90;
                break;
            case 'ROTATE_RIGHT':
                this.allImages[index].controlBox.config.rotate = -90;
                break;
            case 'APPLY':
                this.allImages[index].controlBox.config.apply = true;
                // this.allImages[index].editMode = false;
                break;
        }
        this.imageConfigChanges.next(this.allImages[index].controlBox.config);
        /**
         * remove in prod version
         */
        // this.tempChanges.next(_.cloneDeep(this.allImages));
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaService.prototype.onEditEnable = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.allImages.forEach(function (image, i) {
            if (index === i) {
                image.editMode = true;
            }
            else {
                image.editMode = false;
            }
        });
        this.imageComponentChanges.next(cloneDeep(this.allImages));
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaService.prototype.clearConfig = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.allImages[index].controlBox.config.fit = false;
        this.allImages[index].controlBox.config.crop = false;
        this.allImages[index].controlBox.config.rotate = 0;
        this.allImages[index].controlBox.config.zoom = 0;
        this.allImages[index].controlBox.config.apply = false;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaService.prototype.onDeleteImage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.allImages.splice(index, 1);
        this.imageComponentChanges.next(this.allImages);
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    };
    /**
     * @return {?}
     */
    SemMediaService.prototype.clearImages = /**
     * @return {?}
     */
    function () {
        this.allImages = [];
        this.imageComponentChanges.next(this.allImages);
        this.tempChanges.next(this.allImages);
    };
    SemMediaService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    SemMediaService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    /** @nocollapse */ SemMediaService.ngInjectableDef = defineInjectable({ factory: function SemMediaService_Factory() { return new SemMediaService(inject(NgZone)); }, token: SemMediaService, providedIn: "root" });
    return SemMediaService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemVideoService = /** @class */ (function () {
    function SemVideoService(http, platformId) {
        this.http = http;
        this.platformId = platformId;
    }
    /**
     * @param {?} query
     * @return {?}
     */
    SemVideoService.prototype.fetchVideos = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        return this.http
            .get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + query + "\n        &type=video\n        &key=AIzaSyCVYzrBm1lzl9iZtNArxlwRym1LnUdQpPs");
        // .pipe(
        //   map(response => response )
        // );
    };
    SemVideoService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    SemVideoService.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    /** @nocollapse */ SemVideoService.ngInjectableDef = defineInjectable({ factory: function SemVideoService_Factory() { return new SemVideoService(inject(HttpClient), inject(PLATFORM_ID)); }, token: SemVideoService, providedIn: "root" });
    return SemVideoService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemMediaPanelSettingsComponent = /** @class */ (function () {
    function SemMediaPanelSettingsComponent(platformId) {
        this.platformId = platformId;
        // Please get these outputs working
        this.cropped = new EventEmitter();
        this.uploaded = new EventEmitter();
        this.editImage = new EventEmitter();
        this.deleteImage = new EventEmitter();
        this.changedForm = new EventEmitter();
        this.changedEditMode = new EventEmitter();
        this.showUploadEvent = new EventEmitter();
        this.myForm = {};
        this.imageList = [];
        this.visibleControlPanel = false;
    }
    /**
     * @return {?}
     */
    SemMediaPanelSettingsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.visibleControlPanel = this.editVisible;
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SemMediaPanelSettingsComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.userImages.length > 0) {
            /** @type {?} */
            var temp = {
                allText: this.userImages[this.key].controlBox.allText,
                metaTitle: this.userImages[this.key].controlBox.metaTitle
            };
            this.myForm = cloneDeep(temp);
        }
    };
    /**
     * @param {?} file
     * @return {?}
     */
    SemMediaPanelSettingsComponent.prototype.onImageLoaded = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        this.visibleControlPanel = false;
        this.uploaded.emit(file);
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    SemMediaPanelSettingsComponent.prototype.onChangedMode = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        this.changedEditMode.emit(mode);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaPanelSettingsComponent.prototype.onEdit = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.editImage.emit(index);
        this.key = index;
        this.visibleControlPanel = true;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaPanelSettingsComponent.prototype.onDelete = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.deleteImage.emit(index);
    };
    /**
     * @param {?} formData
     * @return {?}
     */
    SemMediaPanelSettingsComponent.prototype.onChangedForm = /**
     * @param {?} formData
     * @return {?}
     */
    function (formData) {
        this.changedForm.emit(formData);
    };
    SemMediaPanelSettingsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sem-panel',
                    template: "<div class=\"dialog-container--header\">\n  <span class=\"sem-icon-back\" (click)=\"showUploadEvent.emit()\"></span>\n</div>\n<!-- Upload Mode -->\n<sem-upload *ngIf=\"!editVisible\" (doneImage)=\"onImageLoaded($event)\"></sem-upload>\n<!-- Edit Mode -->\n<sem-media-edit\n  *ngIf=\"editVisible\"\n  (selectedEditMode)=\"onChangedMode($event)\"\n  (formChanged)=\"onChangedForm($event)\"\n  [formData]=\"myForm\"\n></sem-media-edit>\n<div *ngIf=\"!editVisible\">\n  <div\n    *ngFor=\"let image of imageNameList; let i = index\"\n    class=\"p2 flex justify-between\">\n    <div>\n      <span class=\"sem-icon-image align-middle\"></span>\n      {{image}}\n    </div>\n    <div>\n      <span class=\"sem-icon-style px1\" (click)=\"onEdit(i)\"></span>\n      <span class=\"sem-icon-delete\" (click)=\"onDelete(i)\"></span>\n    </div>\n  </div>\n</div>\n",
                    styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2,:host .img-cropper{margin-top:1rem}.mr2,:host .img-cropper{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2,:host form{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute,:host .img-cropper{position:absolute}.fixed{position:fixed}.top-0,:host .img-cropper{top:0}.right-0,:host .img-cropper{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host .img-cropper{width:650px}"]
                },] },
    ];
    SemMediaPanelSettingsComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    SemMediaPanelSettingsComponent.propDecorators = {
        cropped: [{ type: Output }],
        uploaded: [{ type: Output }],
        editImage: [{ type: Output }],
        deleteImage: [{ type: Output }],
        changedForm: [{ type: Output }],
        changedEditMode: [{ type: Output }],
        showUploadEvent: [{ type: Output }],
        editVisible: [{ type: Input }],
        key: [{ type: Input }],
        imageNameList: [{ type: Input }],
        userImages: [{ type: Input }]
    };
    return SemMediaPanelSettingsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemUploadComponent = /** @class */ (function () {
    function SemUploadComponent(zone) {
        this.zone = zone;
        this.doneImage = new EventEmitter();
        this.visibleImage = false;
        this.files = [];
    }
    /**
     * @return {?}
     */
    SemUploadComponent.prototype.loadedImage = /**
     * @return {?}
     */
    function () {
        this.visibleImage = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SemUploadComponent.prototype.dropped = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this.files = event.files;
        try {
            for (var _a = __values(event.files), _b = _a.next(); !_b.done; _b = _a.next()) {
                var droppedFile = _b.value;
                // Is it a file?
                if (droppedFile.fileEntry.isFile) {
                    /** @type {?} */
                    var fileEntry = (/** @type {?} */ (droppedFile.fileEntry));
                    fileEntry.file(function (file) {
                        _this.doneImage.emit(file);
                        /**
                        // You could upload it like this:
                        const formData = new FormData()
                        formData.append('logo', file, relativePath)
              
                        // Headers
                        const headers = new HttpHeaders({
                          'security-token': 'mytoken'
                        })
              
                        this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                        .subscribe(data => {
                          // Sanitized logo returned from backend
                        })
                        **/
                    });
                }
                else {
                    // It was a directory (empty directories are added, otherwise only files)
                    /** @type {?} */
                    var fileEntry = (/** @type {?} */ (droppedFile.fileEntry));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SemUploadComponent.prototype.fileChangeEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        try {
            for (var _a = __values(event.target.files), _b = _a.next(); !_b.done; _b = _a.next()) {
                var chosenFile = _b.value;
                this.doneImage.emit(chosenFile);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _c;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SemUploadComponent.prototype.fileOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SemUploadComponent.prototype.fileLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
    };
    SemUploadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sem-upload',
                    template: "<div class=\"center\">\n  <div>\n    <file-drop\n      headertext=\"Drop files here\"\n      (onFileDrop)=\"dropped($event)\" \n      (onFileOver)=\"fileOver($event)\"\n      (onFileLeave)=\"fileLeave($event)\"\n      customstyle=\"drop-area\"\n    ></file-drop>\n    <label for=\"file-upload\" class=\"upload-btn\">\n      Choose file\n    </label>\n    <input\n      id=\"file-upload\"\n      type=\"file\"\n      (change)=\"fileChangeEvent($event)\"\n      accept=\"image/*\"\n      multiple>\n  </div>\n</div>",
                    styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host .control{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1,:host .control{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .control,:host .upload-btn{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2,:host .upload-btn{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative,:host .control{position:relative}.absolute,:host .control .label-icon{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{display:block;padding:1rem}:host input[type=file]{display:none}:host input[type=checkbox]{display:none}:host .upload-btn{background:#05dcb6;color:#fff;border-radius:12px 12px 0}:host .control{color:#fff;width:100%;border-radius:12px 12px 0;background-color:#444d63}:host .control:focus{outline:0}:host .control .label-icon{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:1em}"]
                },] },
    ];
    SemUploadComponent.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    SemUploadComponent.propDecorators = {
        doneImage: [{ type: Output }]
    };
    return SemUploadComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemCropperComponent = /** @class */ (function () {
    function SemCropperComponent(zone, _mediaService) {
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
            ready: function (e) {
                e.target.cropper.clear();
            }
        };
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    SemCropperComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.config && this.imageCropper) {
            if (changes.config.currentValue && changes.config.currentValue.fit) {
                this.imageCropper.cropper.reset();
            }
            if (changes.config.currentValue && changes.config.currentValue.crop) ;
            if (changes.config.currentValue && changes.config.currentValue.zoom !== 0) {
                this.imageCropper.cropper.zoom(changes.config.currentValue.zoom);
            }
            if (changes.config.currentValue && changes.config.currentValue.rotate !== 0) {
                this.imageCropper.cropper.rotate(changes.config.currentValue.rotate);
            }
            if (changes.config.currentValue && changes.config.currentValue.apply) {
                /** @type {?} */
                var croppedImage = this.imageCropper.cropper.getCroppedCanvas().toDataURL('image/jpg');
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
    };
    /**
     * @return {?}
     */
    SemCropperComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    SemCropperComponent.prototype.imageLoaded = /**
     * @return {?}
     */
    function () {
        // show cropper
    };
    /**
     * @return {?}
     */
    SemCropperComponent.prototype.loadImageFailed = /**
     * @return {?}
     */
    function () {
        // show message
    };
    /**
     * @return {?}
     */
    SemCropperComponent.prototype.editImage = /**
     * @return {?}
     */
    function () {
        this.croppedImage = '';
        this.enabledCropper.emit();
    };
    /**
     * @return {?}
     */
    SemCropperComponent.prototype.onMouseEnter = /**
     * @return {?}
     */
    function () {
        this.hoverActive = true;
    };
    /**
     * @return {?}
     */
    SemCropperComponent.prototype.onMouseLeave = /**
     * @return {?}
     */
    function () {
        this.hoverActive = false;
    };
    SemCropperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sem-cropper',
                    template: "<div\n  class=\"img-cropper\"\n  (mouseenter)=\"onMouseEnter()\"\n  (mouseleave)=\"onMouseLeave()\">\n  <div class=\"edit-overlay\" [class.active]=\"hoverActive\" (dblclick)=\"editImage()\">\n    <button *ngIf=\"hoverActive\" [@enterAnimation] class=\"p3\" (click)=\"editImage()\">Edit Me!</button>\n  </div>\n  <img\n    *ngIf=\"!croppedImage && !editMode\"\n    [src]=\"imageData\"\n    class=\"preview-image\"\n    (dblclick)=\"editImage()\"\n  >\n  <angular-cropper\n    *ngIf=\"editMode\"\n    #imageCropper\n    [cropperOptions]=\"cropperConfig\"\n    [imageUrl]=\"imageData\"\n  ></angular-cropper>\n  <img\n    *ngIf=\"croppedImage && !editMode\"\n    [src]=\"croppedImage\"\n    class=\"fit\"\n    [ngStyle]=\"croppedStyle\"\n    (dblclick)=\"editImage()\">\n  \n</div>\n",
                    styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .edit-overlay button{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3,:host .edit-overlay button{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{display:block}:host .img-cropper{position:relative}:host .preview-image{width:100%}:host .edit-overlay{position:absolute;top:0;left:0;width:100%;height:100%;transition:.2s ease-in}:host .edit-overlay.active{background-color:rgba(0,0,0,.2)}:host .edit-overlay button{background-color:rgba(255,255,255,.6);position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}"],
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
    SemCropperComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: SemMediaService }
    ]; };
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
    return SemCropperComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemControlsComponent = /** @class */ (function () {
    function SemControlsComponent() {
        this.pressedFit = new EventEmitter();
        this.pressedCrop = new EventEmitter();
        this.pressedRotateLeft = new EventEmitter();
        this.pressedRotateRight = new EventEmitter();
        this.pressedZoomIn = new EventEmitter();
        this.pressedZoomOut = new EventEmitter();
    }
    SemControlsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sem-controls',
                    template: "<div class=\"flex my1\">\n  <div class=\"col-6 px1\">\n    <div>\n      <button for=\"fit-control\" class=\"control\" (click)=\"pressedFit.emit()\">\n        <span class=\"sem-icon-resize label-icon\"></span>Fit\n      </button>\n    </div>\n    <div>\n      <button for=\"rotate-left-control\" class=\"control\" (click)=\"pressedRotateLeft.emit()\">\n        <span class=\"sem-icon-resize label-icon\"></span>Rotate Left\n      </button>\n    </div>\n    <div>\n      <button for=\"zoom-in-control\" class=\"control\" (click)=\"pressedZoomIn.emit()\">\n        <span class=\"sem-icon-resize label-icon\"></span>Zoom in\n      </button>\n    </div>\n  </div>\n  <div class=\"col-6 px1\">\n      <div>\n        <button for=\"crop-control\" class=\"control\" (click)=\"pressedCrop.emit()\">\n          <span class=\"sem-icon-resize label-icon\"></span>Crop\n        </button>\n      </div>\n      <div>\n        <button for=\"rotate-right-control\" class=\"control\" (click)=\"pressedRotateRight.emit()\">\n          <span class=\"sem-icon-resize label-icon\"></span>Rotate right\n        </button>\n      </div>\n      <div>\n        <button for=\"zoom-out-control\" class=\"control\" (click)=\"pressedZoomOut.emit()\">\n          <span class=\"sem-icon-resize label-icon\"></span>Zoom out\n        </button>\n      </div>\n  </div>\n</div>",
                    styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host .control{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1,:host .control{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .control{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative,:host .control{position:relative}.absolute,:host .control .label-icon{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host .control{color:#fff;width:100%;border-radius:12px 12px 0;background-color:#444d63}:host .control:focus{outline:0}:host .control .label-icon{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:1em}"],
                },] },
    ];
    SemControlsComponent.propDecorators = {
        pressedFit: [{ type: Output }],
        pressedCrop: [{ type: Output }],
        pressedRotateLeft: [{ type: Output }],
        pressedRotateRight: [{ type: Output }],
        pressedZoomIn: [{ type: Output }],
        pressedZoomOut: [{ type: Output }]
    };
    return SemControlsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SlidePanelComponent = /** @class */ (function () {
    function SlidePanelComponent() {
        this.activePane = 'left';
    }
    SlidePanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sem-slide-panel',
                    styles: [":host{display:block;overflow:hidden}.panes{height:100%;width:200%;transition-duration:.5s;display:flex}.panes div{flex:1}"],
                    template: "<div class=\"panes\" [@slide]=\"activePane\">\n  <div><ng-content select=\"[leftPane]\"></ng-content></div>\n  <div><ng-content select=\"[rightPane]\"></ng-content></div>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('slide', [
                            state('left', style({ transform: 'translateX(0)' })),
                            state('right', style({ transform: 'translateX(-50%)' })),
                            transition('left <=> right', animate('1s'))
                        ])
                    ]
                },] },
    ];
    SlidePanelComponent.propDecorators = {
        activePane: [{ type: Input }]
    };
    return SlidePanelComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemMediaSettingsComponent = /** @class */ (function () {
    function SemMediaSettingsComponent(_mediaService, _fb) {
        this._mediaService = _mediaService;
        this._fb = _fb;
        this.pressedImages = new EventEmitter();
        this.pressedDelete = new EventEmitter();
        this.pressedDuplicate = new EventEmitter();
        this.pressedSettings = new EventEmitter();
        this.isLeftVisible = true;
        this.viewModeForm = this._fb.group({
            viewMode: ''
        });
    }
    /**
     * @return {?}
     */
    SemMediaSettingsComponent.prototype.onDelete = /**
     * @return {?}
     */
    function () {
        this.pressedDelete.emit();
    };
    /**
     * @return {?}
     */
    SemMediaSettingsComponent.prototype.onImages = /**
     * @return {?}
     */
    function () {
        this.pressedImages.emit();
    };
    /**
     * @return {?}
     */
    SemMediaSettingsComponent.prototype.onDuplicate = /**
     * @return {?}
     */
    function () {
        this.pressedDuplicate.emit();
    };
    /**
     * @return {?}
     */
    SemMediaSettingsComponent.prototype.onSettings = /**
     * @return {?}
     */
    function () {
        this.isLeftVisible = false;
        // this.pressedSettings.emit();
    };
    SemMediaSettingsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sem-settings',
                    template: "<div>\n  <div class=\"dialog-container--header\">\n    <span class=\"sem-icon-back\" (click)=\"isLeftVisible=true\"></span>\n  </div>\n  <sem-slide-panel [activePane]=\"isLeftVisible? 'left': 'right'\">\n    <div leftPane>\n      <div semui-section-body class=\"p2\">\n        <ul semui-list class=\"user-nav\">\n          <li\n            semui-list-item\n            list-item\n            semui-importance=\"dark\"\n            class=\"py1\"\n            (click)=\"onImages()\"\n          >\n            <i class=\"sem-icon-style default\"  aria-hidden=\"true\"></i>\n            <span> Images</span>\n          </li>\n          <li\n            semui-list-item\n            list-item\n            semui-importance=\"dark\"\n            class=\"py1\"\n            (click)=\"onSettings()\"\n          >\n            <i class=\"sem-icon-settings default\"  aria-hidden=\"true\"></i>\n            <span> Settings</span>\n          </li>\n          <li\n            semui-list-item\n            list-item\n            semui-importance=\"dark\"\n            class=\"py1\"\n            (click)=\"onDuplicate()\"\n          >\n            <i class=\"sem-icon-sites default\"  aria-hidden=\"true\"></i>\n            <span> Duplicate</span>\n          </li>\n          <li\n            semui-list-item\n            list-item\n            semui-importance=\"dark\"\n            class=\"py1\"\n            (click)=\"onDelete()\"\n          >\n            <i class=\"sem-icon-delete default\"  aria-hidden=\"true\"></i>\n            <span> Delete</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <div rightPane>\n      <form [formGroup]=\"viewModeForm\" class=\"p2\">\n        <input type=\"radio\"\n        value=\"grid\"\n        id=\"grid\"\n        formControlName=\"viewMode\">\n        <label for=\"grid\"><span class=\"sem-icon-style default\"></span></label>\n        <input type=\"radio\"\n          value=\"carousel\"\n          id=\"carousel\"\n          formControlName=\"viewMode\">\n        <label for=\"carousel\"><span class=\"sem-icon-settings default\"></span></label>\n        <input type=\"radio\"\n          value=\"list\"\n          id=\"list\"\n          formControlName=\"viewMode\">\n        <label for=\"list\"><span class=\"sem-icon-settings default\"></span></label>\n      </form>\n      {{viewModeForm.value | json}}\n    </div>\n  </sem-slide-panel>\n\n\n</div>\n",
                    styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex,:host form{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around,:host form{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host form input[type=radio]{display:none}:host form input[type=radio]:checked+label{background:#ccc}:host form label span{font-size:30px}"]
                },] },
    ];
    SemMediaSettingsComponent.ctorParameters = function () { return [
        { type: SemMediaService },
        { type: FormBuilder }
    ]; };
    SemMediaSettingsComponent.propDecorators = {
        pressedImages: [{ type: Output }],
        pressedDelete: [{ type: Output }],
        pressedDuplicate: [{ type: Output }],
        pressedSettings: [{ type: Output }]
    };
    return SemMediaSettingsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MediaEditComponent = /** @class */ (function () {
    function MediaEditComponent(_fb) {
        this._fb = _fb;
        this.selectedEditMode = new EventEmitter();
        this.formChanged = new EventEmitter();
        this.myForm = this._fb.group({
            allText: '',
            metaTitle: '',
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MediaEditComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.myForm.patchValue({
            allText: this.formData.allText,
            metaTitle: this.formData.metaTitle
        });
    };
    /**
     * @return {?}
     */
    MediaEditComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.myForm.valueChanges.subscribe(function (data) {
            _this.formChanged.emit(data);
        });
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    MediaEditComponent.prototype.onPress = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        this.selectedEditMode.emit(mode);
    };
    MediaEditComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sem-media-edit',
                    template: "<form [formGroup]=\"myForm\" class=\"p2\">\n  <label>All Text</label>\n  <input type=\"text\"\n    class=\"sem-input\"\n    id=\"all-text\"\n    formControlName=\"allText\">\n  <label>Meta Title</label>\n  <input type=\"text\"\n    class=\"sem-input\"\n    id=\"meta-title\"\n    formControlName=\"metaTitle\">\n</form>\n<sem-controls\n  (pressedFit)=\"onPress('FIT')\"\n  (pressedCrop)=\"onPress('CROP')\"\n  (pressedRotateLeft)=\"onPress('ROTATE_LEFT')\"\n  (pressedRotateRight)=\"onPress('ROTATE_RIGHT')\"\n  (pressedZoomIn)=\"onPress('ZOOM_IN')\"\n  (pressedZoomOut)=\"onPress('ZOOM_OUT')\">\n</sem-controls>\n<div class=\"px2 flex justify-end\">\n  <button for=\"crop-control\" class=\"control\" (click)=\"onPress('APPLY')\" >\n    Apply\n  </button>\n</div>\n<!-- <div><pre><code>{{ myForm?.value | json }}</code></pre></div> -->\n",
                    styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host .control{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1,:host .control{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .control{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3,:host .control{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative,:host .control{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host .control{color:#fff;border:none;border-radius:12px 12px 0;background-color:#05dcb6}:host .control:focus{outline:0}"]
                },] },
    ];
    MediaEditComponent.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    MediaEditComponent.propDecorators = {
        selectedEditMode: [{ type: Output }],
        formChanged: [{ type: Output }],
        formData: [{ type: Input }]
    };
    return MediaEditComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemMediaContainerComponent = /** @class */ (function () {
    function SemMediaContainerComponent(_mediaService, injector) {
        var _this = this;
        this._mediaService = _mediaService;
        this.injector = injector;
        this.widget = {
            componentName: '',
            data: "\n    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer ook a galley of type\n    and scrambled it to make a type specimen book. It has survived not only five ce nturies, but also the leap into electronic\n    typesetting, remaining essentially unchanged. It was popu larised in the 1960s with the release of Letraset sheets\n    containing"
        };
        this.userImages = [];
        this.editVisible = false;
        this.uploadPanelFlag = true;
        this.imageNameList = [];
        this.isTestAOpened = false;
        this.widget = this.injector.get('widget');
        if (this.widget.componentName === 'SemMediaContainerComponent') {
            console.log('Got the wysiwyg data', this.widget);
        }
        this._mediaService.imageComponentChanges.subscribe(function (allImages) {
            /** @type {?} */
            var editMode = false;
            _this.imageNameList = [];
            _this.userImages = allImages;
            try {
                for (var allImages_1 = __values(allImages), allImages_1_1 = allImages_1.next(); !allImages_1_1.done; allImages_1_1 = allImages_1.next()) {
                    var image = allImages_1_1.value;
                    editMode = editMode || image.editMode;
                    _this.imageNameList.push(image.fileName);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (allImages_1_1 && !allImages_1_1.done && (_a = allImages_1.return)) _a.call(allImages_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            setTimeout(function () {
                _this.editVisible = editMode;
            });
            var e_1, _a;
        });
        this._mediaService.imageConfigChanges.subscribe(function (config) {
            _this.config = cloneDeep(config);
        });
        this._mediaService.imageLoadChanges.subscribe(function (allImages) {
            _this.tempImages = allImages;
            _this.imageNameList = [];
            _this.userImages = allImages;
            try {
                for (var allImages_2 = __values(allImages), allImages_2_1 = allImages_2.next(); !allImages_2_1.done; allImages_2_1 = allImages_2.next()) {
                    var image = allImages_2_1.value;
                    _this.imageNameList.push(image.fileName);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (allImages_2_1 && !allImages_2_1.done && (_a = allImages_2.return)) _a.call(allImages_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            _this.key = allImages.length - 1;
            _this.editVisible = false;
            if (allImages.length > 1) {
                _this.uploadPanelFlag = false;
            }
            var e_2, _a;
        });
        this._mediaService.tempChanges.subscribe(function (allImages) {
            _this.tempImages = allImages;
        });
    }
    /**
     * @return {?}
     */
    SemMediaContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} image
     * @return {?}
     */
    SemMediaContainerComponent.prototype.uploadedImage = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        this._mediaService.putImage(image);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onEnableEditImage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._mediaService.onEditEnable(index);
        this.uploadPanelFlag = true;
        this.key = index;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onEditImage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.key = index;
        this._mediaService.onEditEnable(index);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onDeleteImage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._mediaService.onDeleteImage(index);
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onMenu = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        switch (mode) {
            case 'IMAGES':
                this.uploadPanelFlag = true;
                break;
            case 'DUPLICATE':
                break;
            case 'SETTINGS':
                break;
            case 'DELETE':
                this._mediaService.clearImages();
                this.imageNameList = [];
                this.uploadPanelFlag = true;
                break;
        }
    };
    /**
     * @param {?} formData
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onChangedForm = /**
     * @param {?} formData
     * @return {?}
     */
    function (formData) {
        this._mediaService.formChanged(this.key, formData);
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onChangedEditMode = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        if (mode === 'APPLY') {
            // this.editVisible = false;
            if (this.imageNameList.length > 1) {
                this.uploadPanelFlag = false;
            }
        }
        this._mediaService.onEditImage(this.key, mode);
        this._mediaService.clearConfig(this.key);
    };
    /**
     * @param {?} index
     * @param {?} croppedImage
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onCroppedImage = /**
     * @param {?} index
     * @param {?} croppedImage
     * @return {?}
     */
    function (index, croppedImage) {
        this._mediaService.putCroppedImage(index, croppedImage);
    };
    /**
     * @param {?} isOpened
     * @return {?}
     */
    SemMediaContainerComponent.prototype.openTestA = /**
     * @param {?} isOpened
     * @return {?}
     */
    function (isOpened) {
        this.isTestAOpened = isOpened;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SemMediaContainerComponent.prototype.croppedImage = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        console.log('not sure', item);
    };
    SemMediaContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sem-media-container',
                    template: "<div class=\"sem-dnd-container sem-media-container\">\n  <div class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      corner=\"top-right\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"secondary\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openTestA(!isTestAOpened)\"\n    >\n        <span class=\"sem-icon-profile-accent\">\n        <span class=\"path1\"></span><span class=\"path2\"></span>\n        </span>\n    </button>\n    <semui-overlay-dialog\n      [overlayOrigin]=\"chatOverlay\"\n      [isOpened]=\"isTestAOpened\"\n      (close)=\"openTestA(false)\"\n      (open)=\"openTestA(true)\"\n      [overlayWidth]=\"'auto'\"\n    >\n\n      <div *ngIf=\"uploadPanelFlag\" class=\"temp-container dialog-container left\">\n        <div class=\"dialog-container--body\">\n          <sem-panel\n            [editVisible]=\"editVisible\"\n            [key]=\"key\"\n            [imageNameList]=\"imageNameList\"\n            (cropped)=\"croppedImage($event)\"\n            (uploaded)=\"uploadedImage($event)\"\n            (changedForm)=\"onChangedForm($event)\"\n            (editImage)=\"onEditImage($event)\"\n            (deleteImage)=\"onDeleteImage($event)\"\n            (changedEditMode)=\"onChangedEditMode($event)\"\n            (showUploadEvent)=\"editVisible = false\"\n            [userImages]=\"userImages\"\n          ></sem-panel>\n        </div>\n      </div>\n      <div *ngIf=\"!uploadPanelFlag\"\n           class=\"settings-container dialog-container mt4\">\n        <sem-settings\n          (pressedImages)=\"onMenu('IMAGES')\"\n          (pressedDuplicate)=\"onMenu('DUPLICATE')\"\n          (pressedSettings)=\"onMenu('SETTINGS')\"\n          (pressedDelete)=\"onMenu('DELETE')\"\n        >\n        </sem-settings>\n      </div>\n\n    </semui-overlay-dialog>\n  </div>\n</div>\n\n\n<div class=\"flex flex-column\">\n\n  <!-- <pre>{{tempImages | json}}</pre> -->\n</div>\n<div *ngIf=\"userImages\" class=\"preview-container\">\n  <sem-cropper\n    *ngFor=\"let image of userImages;let key = index\"\n    [imageData]=\"image.uploadedImage\"\n    [croppedImage]=\"image.croppedImage\"\n    [editMode]=\"image.editMode\"\n    [config]=\"config\"\n    [key]=\"key\"\n    (enabledCropper)=\"onEnableEditImage(key)\"\n    (croppedImageEvent)=\"onCroppedImage(key, $event)\"\n  ></sem-cropper>\n</div>\n",
                    styles: [":host(){background-color:#f5e5e5;display:block;border:1px solid #8b0000;height:100%}"]
                },] },
    ];
    SemMediaContainerComponent.ctorParameters = function () { return [
        { type: SemMediaService },
        { type: Injector }
    ]; };
    return SemMediaContainerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var UiSharedModules = [
    SemUiButtonModule,
    SemUiButtonFabModule,
    SemUiOverlayDialogModule,
    SemUiTabsModule,
    SemUiThumbnailLargeModule
];
var SemUiKitSharedModule = /** @class */ (function () {
    function SemUiKitSharedModule() {
    }
    SemUiKitSharedModule.decorators = [
        { type: NgModule, args: [{
                    exports: __spread(UiSharedModules)
                },] },
    ];
    return SemUiKitSharedModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var MATERIAL_MODULES = [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,
];
var SemMaterialSharedModule = /** @class */ (function () {
    function SemMaterialSharedModule() {
    }
    SemMaterialSharedModule.decorators = [
        { type: NgModule, args: [{
                    exports: __spread(MATERIAL_MODULES)
                },] },
    ];
    return SemMaterialSharedModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var YoutubeSafeUrlPipe = /** @class */ (function () {
    function YoutubeSafeUrlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} videoId
     * @return {?}
     */
    YoutubeSafeUrlPipe.prototype.transform = /**
     * @param {?} videoId
     * @return {?}
     */
    function (videoId) {
        return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + videoId + "?autoplay=1");
    };
    YoutubeSafeUrlPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'youtubeSafeUrl'
                },] },
    ];
    YoutubeSafeUrlPipe.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return YoutubeSafeUrlPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var VideoModel = /** @class */ (function () {
    function VideoModel(videoId, title, thumbnailUrl, channelTitle, channelId, description) {
        this.videoId = videoId;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.channelTitle = channelTitle;
        this.channelId = channelId;
        this.description = description;
        this.videoId = videoId;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.channelTitle = channelTitle;
        this.channelId = channelId;
        this.description = description;
    }
    return VideoModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemVideoSettingsPanelComponent = /** @class */ (function () {
    // @Output()
    // searchChange: EventEmitter<string> = new EventEmitter<string>();
    function SemVideoSettingsPanelComponent(semVideoService) {
        this.semVideoService = semVideoService;
        this.close = new EventEmitter();
        // results: Array<YoutubeVideoModel>;
        this.results = [];
        this.page = 1;
        // videoList: Array<any>;
        this.selected = new EventEmitter();
    }
    /**
     * @return {?}
     */
    SemVideoSettingsPanelComponent.prototype.loadSettings = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} query
     * @return {?}
     */
    SemVideoSettingsPanelComponent.prototype.search = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        var _this = this;
        console.log('query', query);
        this.semVideoService.fetchVideos(query).subscribe(function (data) {
            _this.results = data.items.map(function (item) {
                return new VideoModel(item.id.videoId, item.snippet.title, item.snippet.thumbnails.high.url, item.snippet.channelTitle, item.snippet.channelId, item.snippet.description);
            });
        });
    };
    /**
     * @param {?} query
     * @return {?}
     */
    SemVideoSettingsPanelComponent.prototype.worked = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        console.log('query', query);
    };
    /**
     * @return {?}
     */
    SemVideoSettingsPanelComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} item
     * @return {?}
     */
    SemVideoSettingsPanelComponent.prototype.addVideo = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.selected.emit(item);
    };
    SemVideoSettingsPanelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    // tslint:disable-next-line:component-selector,
                    selector: 'sem-video-settings-panel',
                    template: "<div class=\"dialog-container--header\">\n  <span class=\"sem-icon-back\"></span>\n</div>\n<div class=\"dialog-container--body_spaced\">\n  <div semui-tabs #tabsVertical [showTabs]=\"true\" [vertical]=\"true\" >\n    <div semui-tab #tabsV1 [title]=\"'Video Url'\">\n      <div semui-section-body>\n        Tab 1 content\n      </div>\n    </div>\n    <div semui-tab #tabsV2 [title]=\"'Search'\">\n      <br>\n      <div class=\"sem-video-container\">\n          <!-- Section Body -->\n          <div semui-section-body>\n            <!-- Search -->\n            <div>\n              <div>\n                <!-- YouTube Search -->\n                <label>Search Youtube</label>\n                <span class=\"input-prefix\">\n                  <span class=\"sem-icon-search prefix\"></span>\n                   <input\n                     type=\"text\"\n                     class=\"sem-input\"\n                     name=\"search\"\n                     id=\"search\"\n                     placeholder=\"Search\"\n                     autofocus\n                     (keyup)=\"search(textBox.value)\"\n                     #textBox\n                   />\n                </span>\n              </div>\n              <span  field-prefix class=\"icon icon-search prefix\"></span>\n              <div class=\"sem-video-container--results\">\n\n                <div *ngIf=\"results.length == 0\" class=\"sem-video-container--results_item\">\n                  <figure semui-thumbnail class=\"pt2\">\n                         <span class=\"sem-video-container--results_preview\" card-image></span>\n                          <figcaption sem-section-footer>\n                            <div class=\"figcaption-container\">\n                                <h2 class=\"primary-caption\">\n                                  Loding\n                                </h2>\n                                <span class=\"sub-caption\">\n                                Loding\n                                </span>\n                            </div>\n                          </figcaption>\n                  </figure>\n                </div>\n                <div *ngFor=\"let item of results | paginate: config\" class=\"sem-video-container--results_item\">\n                    <figure semui-thumbnail class=\"pt2\">\n                      <span class=\"sem-video-container--results_preview\" card-image>\n                          <img *ngIf=\"item.thumbnailUrl\" [src]=\"item.thumbnailUrl\"  />\n                      </span>\n                      <figcaption sem-section-footer>\n                        <div class=\"figcaption-container\">\n                          <h2\n                            class=\"primary-caption\"\n                          >\n                            {{ item.title}}\n                          </h2>\n                          <span\n                            class=\"sub-caption\">\n                           {{ item.publishedAt}}\n                          </span>\n                          <br/>\n                          <span\n                            class=\" relative sem-button-- sem-button sem-button--primary\"\n                            card-setting-button (click)=\"addVideo(item)\"\n                          >\n                            Add this\n                          </span>\n                          <!--<button-->\n                            <!--sem-btn-fab-->\n                            <!--corner=\"none\"-->\n                            <!--semui-theme=\"light\"-->\n                            <!--sem-importance=\"default\"-->\n                            <!--card-setting-button (click)=\"loadSettings()\"-->\n                          <!--&gt;-->\n                            <!--<span class=\"sem-icon-ellipse\"></span>-->\n                          <!--</button>-->\n                        </div>\n                      </figcaption>\n                    </figure>\n                </div>\n\n              </div>\n            </div>\n          </div>\n          <!-- Section Footer -->\n          <div semui-section-footer>\n              <pagination-template\n                class=\"sem-pagination-container py2\"\n                #p=\"paginationApi\"\n                [id]=\"config.id\"\n                (pageChange)=\"config.currentPage = $event\">\n                <div class=\"sem-pagination-nav\">\n                  <div\n                    class=\"sem-pagination-previous\"\n                    [class.disabled]=\"p.isFirstPage()\">\n                    <a *ngIf=\"!p.isFirstPage()\" (click)=\"p.previous()\"> < </a>\n                  </div>\n                  <div\n                    *ngFor=\"let page of p.pages\"\n                    class=\"sem-pagination\"\n                    [class.active]=\"p.getCurrent() === page.value\">\n                    <a (click)=\"p.setCurrent(page.value)\" *ngIf=\"p.getCurrent() !== page.value\">\n                      {{ page.label }}\n                    </a>\n                    <div *ngIf=\"p.getCurrent() === page.value\">\n                      {{ page.label }}\n                    </div>\n                  </div>\n                  <div\n                    class=\"sem-pagination-next\"\n                    [class.disabled]=\"p.isLastPage()\">\n                    <a *ngIf=\"!p.isLastPage()\" (click)=\"p.next()\"> > </a>\n                  </div>\n                </div>\n              </pagination-template>\n\n          </div>\n      </div>\n    </div>\n  </div>\n</div>\n<!--<div *ngFor=\"let item of results results$ | async | paginate: config\">-->\n",
                    styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{background:#fff}.sem-video-container{width:210px}.sem-video-container--results_preview{min-height:96px;display:block;background-color:#dedede}"]
                },] },
    ];
    SemVideoSettingsPanelComponent.ctorParameters = function () { return [
        { type: SemVideoService }
    ]; };
    SemVideoSettingsPanelComponent.propDecorators = {
        close: [{ type: Output }],
        config: [{ type: Input }],
        selected: [{ type: Output }]
    };
    return SemVideoSettingsPanelComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemVideoContainerComponent = /** @class */ (function () {
    function SemVideoContainerComponent(injector) {
        this.injector = injector;
        this.widget = {
            componentName: '',
            data: {
                channelId: 'UC4rlAVgAK0SGk-yTfe48Qpw',
                channelTitle: 'BRIGHT SIDE',
                description: 'How to Stay Healthy. We all have days when we feel absolutely exhausted or sometimes a little down in the dumps. But if you find yourself constantly catching ...',
                thumbnailUrl: 'https://i.ytimg.com/vi/kyoS1edY5tM/hqdefault.jpg',
                title: '10 Warning Signs You Have Vitamin D Deficiency',
                videoId: 'kyoS1edY5tM'
            }
        };
        this.isTestAOpened = false;
        this.paginationConfig = {
            id: 'custom',
            itemsPerPage: 2,
            currentPage: 1
        };
        this.widget = this.injector.get('widget');
        if (this.widget.componentName === 'SemVideoContainerComponent') {
            console.log('Got the wysiwyg data', this.widget);
        }
    }
    /**
     * @param {?} query
     * @return {?}
     */
    SemVideoContainerComponent.prototype.search = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        console.log('query is outputed', query);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SemVideoContainerComponent.prototype.selectedItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        console.log('item select', item);
        this.widget.data = item;
    };
    /**
     * @return {?}
     */
    SemVideoContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} item
     * @return {?}
     */
    SemVideoContainerComponent.prototype.closeOverlay = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { };
    /**
     * @param {?} isOpened
     * @return {?}
     */
    SemVideoContainerComponent.prototype.openTestA = /**
     * @param {?} isOpened
     * @return {?}
     */
    function (isOpened) {
        this.isTestAOpened = isOpened;
    };
    SemVideoContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sem-video-container',
                    template: "<div class=\"sem-dnd-container\">\n  <div class=\"embed-container\" *ngIf=\"widget.data.hasOwnProperty('videoId')\">\n    <iframe width=\"100%\"\n    height=\"100%\"\n    frameborder=\"0\"\n    allowfullscreen\n    [src]=\"widget.data.videoId | youtubeSafeUrl\"\n    style=\"border: solid 1px black\" >\n    </iframe>\n  </div>\n  <div class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      corner=\"top-right\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"secondary\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openTestA(!isTestAOpened)\"\n    >\n        <span class=\"sem-icon-profile-accent\">\n        <span class=\"path1\"></span><span class=\"path2\"></span>\n        </span>\n    </button>\n    <semui-overlay-dialog\n      [overlayOrigin]=\"chatOverlay\"\n      [isOpened]=\"isTestAOpened\"\n      (close)=\"openTestA(false)\"\n      (open)=\"openTestA(true)\"\n      [overlayWidth]=\"'auto'\"\n    >\n        <sem-video-settings-panel\n          [config]=\"paginationConfig\"\n          (selected)=\"selectedItem($event)\"\n          (close)=\"closeOverlay($event)\">\n        </sem-video-settings-panel>\n\n    </semui-overlay-dialog>\n  </div>\n</div>\n",
                    styles: [":host{background-color:#f5e5e5;display:block;border:1px solid #8b0000;height:100%}.embed-container{height:100vh}"]
                },] },
    ];
    SemVideoContainerComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return SemVideoContainerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SemMediaModule = /** @class */ (function () {
    function SemMediaModule() {
    }
    /**
     * @return {?}
     */
    SemMediaModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: SemMediaModule,
            providers: [SemMediaService, SemVideoService]
        };
    };
    SemMediaModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        HttpClientModule,
                        NgxPaginationModule,
                        ReactiveFormsModule,
                        ImageCropperModule,
                        FileDropModule,
                        AngularCropperjsModule,
                        BrowserAnimationsModule,
                        SemMaterialSharedModule,
                        SemUiKitSharedModule
                    ],
                    declarations: [
                        SemMediaPanelSettingsComponent,
                        SemUploadComponent,
                        SemCropperComponent,
                        SemControlsComponent,
                        SemMediaSettingsComponent,
                        MediaEditComponent,
                        SlidePanelComponent,
                        SemMediaContainerComponent,
                        YoutubeSafeUrlPipe,
                        SemVideoSettingsPanelComponent,
                        SemVideoContainerComponent,
                    ],
                    exports: [
                        SemMediaPanelSettingsComponent,
                        SemUploadComponent,
                        SemCropperComponent,
                        SemControlsComponent,
                        SemMediaSettingsComponent,
                        MediaEditComponent,
                        SlidePanelComponent,
                        SemMediaContainerComponent,
                        SemVideoSettingsPanelComponent,
                        SemVideoContainerComponent
                    ],
                    providers: [
                        SemMediaService,
                        SemVideoService
                    ]
                },] },
    ];
    return SemMediaModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { SemMediaService, SemVideoService, SemMediaModule, SemControlsComponent, SemCropperComponent, MediaEditComponent, SemUploadComponent, SlidePanelComponent, SemMediaContainerComponent, SemMediaPanelSettingsComponent, SemMediaSettingsComponent, SemVideoContainerComponent, SemVideoSettingsPanelComponent, VideoModel, YoutubeSafeUrlPipe as ɵc, SemMaterialSharedModule as ɵa, SemUiKitSharedModule as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRyLXNlbS1tZWRpYS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS1tZWRpYS5zZXJ2aWNlLnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvc2VtLXZpZGVvLnNlcnZpY2UudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS1tZWRpYS1wYW5lbC9zZW0tbWVkaWEtcGFuZWwuY29tcG9uZW50LnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvY29tcG9uZW50cy9tZWRpYS1pbWFnZS11cGxvYWQvbWVkaWEtdXBsb2FkLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbXBvbmVudHMvbWVkaWEtY3JvcHBlci9tZWRpYS1jcm9wcGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbXBvbmVudHMvbWVkaWEtY29udHJvbHMvbWVkaWEtY29udHJvbHMuY29tcG5lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb21wb25lbnRzL3NsaWRlLXBhbmVsL3NsaWRlLXBhbmVsLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXNldHRpbmdzL3NlbS1tZWRpYS1zZXR0aW5ncy5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb21wb25lbnRzL21lZGlhLWVkaXQvbWVkaWEtZWRpdC5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9zZW0tdWktc2hhcmVkLm1vZHVsZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS1tYXRlcmlhbC1zaGFyZWQubW9kdWxlLnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvc2FmZS11cmwucGlwZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL21vZGVscy92aWRlby50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbnRhaW5lcnMvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsL3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbC5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9zZW0tbWVkaWEubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW1hZ2VNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2ltYWdlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2VtTWVkaWFTZXJ2aWNlIHtcbiAgYWxsSW1hZ2VzPzogQXJyYXk8SW1hZ2VNb2RlbD4gPSBbXTtcbiAgdGVtcEltYWdlOiBJbWFnZU1vZGVsID0ge30gYXMgYW55O1xuICBwdWJsaWMgaW1hZ2VDb21wb25lbnRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBpbWFnZUxvYWRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBpbWFnZUNvbmZpZ0NoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIHRlbXBDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMudGVtcEltYWdlLmVkaXRNb2RlID0gZmFsc2UsXG4gICAgdGhpcy50ZW1wSW1hZ2UuZmlsZU5hbWUgPSAnJztcbiAgICB0aGlzLnRlbXBJbWFnZS5jb250cm9sQm94ID0ge1xuICAgICAgYWxsVGV4dDogJycsXG4gICAgICBtZXRhVGl0bGU6ICcnLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGZpdDogZmFsc2UsXG4gICAgICAgIGNyb3A6IGZhbHNlLFxuICAgICAgICB6b29tOiAwLFxuICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgIGFwcGx5OiBmYWxzZSxcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMudGVtcEltYWdlLmNyb3BwZWRJbWFnZSA9ICcnO1xuICAgIHRoaXMudGVtcEltYWdlLnVwbG9hZGVkSW1hZ2UgPSAnJztcbiAgfVxuICBwdWJsaWMgb25Mb2FkRW5kKGV2ZW50LCBmaWxlTmFtZSkge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2UuZmlsZU5hbWUgPSBmaWxlTmFtZTtcbiAgICAgIHRoaXMudGVtcEltYWdlLnVwbG9hZGVkSW1hZ2UgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgLy8gdGhpcy5kaXNhYmxlQWxsSW1hZ2VFZGl0KCk7XG4gICAgICB0aGlzLmFsbEltYWdlcy5wdXNoKF8uY2xvbmVEZWVwKHRoaXMudGVtcEltYWdlKSk7XG4gICAgICB0aGlzLmltYWdlTG9hZENoYW5nZXMubmV4dChfLmNsb25lRGVlcCh0aGlzLmFsbEltYWdlcykpO1xuICAgIH0pO1xuICB9XG4gIHB1dEltYWdlKGltYWdlOiBGaWxlKSB7XG4gICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZmlsZVJlYWRlci5vbmxvYWRlbmQgPSAoZSkgPT4gdGhpcy5vbkxvYWRFbmQoZSwgaW1hZ2UubmFtZSk7XG4gICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGltYWdlKTtcbiAgfVxuICBwdXRDcm9wcGVkSW1hZ2Uoa2V5OiBudW1iZXIsIGNyb3BwZWRJbWFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5hbGxJbWFnZXNba2V5XS5jcm9wcGVkSW1hZ2UgPSBjcm9wcGVkSW1hZ2U7XG4gICAgdGhpcy5hbGxJbWFnZXNba2V5XS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBkaXNhYmxlQWxsSW1hZ2VFZGl0KCkge1xuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHRoaXMuYWxsSW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFsbEltYWdlc1tpXS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3JtQ2hhbmdlZChpbmRleCwgZm9ybURhdGEpIHtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5hbGxUZXh0ID0gZm9ybURhdGEuYWxsVGV4dDtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5tZXRhVGl0bGUgPSBmb3JtRGF0YS5tZXRhVGl0bGU7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbiAgb25FZGl0SW1hZ2UoaW5kZXgsIG1vZGUpIHtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgJ0ZJVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5maXQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0NST1AnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuY3JvcCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnWk9PTV9JTic6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy56b29tID0gMC4xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1pPT01fT1VUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnpvb20gPSAtMC4xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1JPVEFURV9MRUZUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnJvdGF0ZSA9IDkwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1JPVEFURV9SSUdIVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5yb3RhdGUgPSAtOTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQVBQTFknOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuYXBwbHkgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLmFsbEltYWdlc1tpbmRleF0uZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuaW1hZ2VDb25maWdDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgLy8gdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuYWxsSW1hZ2VzKSk7XG4gIH1cbiAgb25FZGl0RW5hYmxlKGluZGV4KSB7XG4gICAgdGhpcy5hbGxJbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGkpID0+IHtcbiAgICAgIGlmIChpbmRleCA9PT0gaSkge1xuICAgICAgICBpbWFnZS5lZGl0TW9kZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWFnZS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBjbGVhckNvbmZpZyhpbmRleCkge1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5maXQgPSBmYWxzZTtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuY3JvcCA9IGZhbHNlO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5yb3RhdGUgPSAwO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy56b29tID0gMDtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuYXBwbHkgPSBmYWxzZTtcbiAgfVxuICBvbkRlbGV0ZUltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5hbGxJbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBjbGVhckltYWdlcygpIHtcbiAgICB0aGlzLmFsbEltYWdlcyA9IFtdO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL2ludGVybmFsL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlbVZpZGVvU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIHJlYWRvbmx5IGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoUExBVEZPUk1fSUQpIHB1YmxpYyBwbGF0Zm9ybUlkOiBPYmplY3QpIHsgfVxuXG4gIGZldGNoVmlkZW9zKHF1ZXJ5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaD9wYXJ0PXNuaXBwZXQmbWF4UmVzdWx0cz01JnE9JHtxdWVyeX1cbiAgICAgICAgJnR5cGU9dmlkZW9cbiAgICAgICAgJmtleT1BSXphU3lDVll6ckJtMWx6bDlpWnROQXJ4bHdSeW0xTG5VZFFwUHNgKTtcbiAgICAgIC8vIC5waXBlKFxuICAgICAgLy8gICBtYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UgKVxuICAgICAgLy8gKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCxcbiAgT25DaGFuZ2VzLCBJbmplY3QsIFBMQVRGT1JNX0lEXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIEZvcm1BcnJheSwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNlbU1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS1tZWRpYS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tcGFuZWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1oZWFkZXJcIj5cbiAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCIgKGNsaWNrKT1cInNob3dVcGxvYWRFdmVudC5lbWl0KClcIj48L3NwYW4+XG48L2Rpdj5cbjwhLS0gVXBsb2FkIE1vZGUgLS0+XG48c2VtLXVwbG9hZCAqbmdJZj1cIiFlZGl0VmlzaWJsZVwiIChkb25lSW1hZ2UpPVwib25JbWFnZUxvYWRlZCgkZXZlbnQpXCI+PC9zZW0tdXBsb2FkPlxuPCEtLSBFZGl0IE1vZGUgLS0+XG48c2VtLW1lZGlhLWVkaXRcbiAgKm5nSWY9XCJlZGl0VmlzaWJsZVwiXG4gIChzZWxlY3RlZEVkaXRNb2RlKT1cIm9uQ2hhbmdlZE1vZGUoJGV2ZW50KVwiXG4gIChmb3JtQ2hhbmdlZCk9XCJvbkNoYW5nZWRGb3JtKCRldmVudClcIlxuICBbZm9ybURhdGFdPVwibXlGb3JtXCJcbj48L3NlbS1tZWRpYS1lZGl0PlxuPGRpdiAqbmdJZj1cIiFlZGl0VmlzaWJsZVwiPlxuICA8ZGl2XG4gICAgKm5nRm9yPVwibGV0IGltYWdlIG9mIGltYWdlTmFtZUxpc3Q7IGxldCBpID0gaW5kZXhcIlxuICAgIGNsYXNzPVwicDIgZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICA8ZGl2PlxuICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1pbWFnZSBhbGlnbi1taWRkbGVcIj48L3NwYW4+XG4gICAgICB7e2ltYWdlfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1zdHlsZSBweDFcIiAoY2xpY2spPVwib25FZGl0KGkpXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1kZWxldGVcIiAoY2xpY2spPVwib25EZWxldGUoaSlcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2Nre2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMXttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDIsOmhvc3QgLmltZy1jcm9wcGVye21hcmdpbi10b3A6MXJlbX0ubXIyLDpob3N0IC5pbWctY3JvcHBlcnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxe3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAyLDpob3N0IGZvcm17cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgye3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgze3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZXtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGUsOmhvc3QgLmltZy1jcm9wcGVye3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTAsOmhvc3QgLmltZy1jcm9wcGVye3RvcDowfS5yaWdodC0wLDpob3N0IC5pbWctY3JvcHBlcntyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0IC5pbWctY3JvcHBlcnt3aWR0aDo2NTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYVBhbmVsU2V0dGluZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8vIFBsZWFzZSBnZXQgdGhlc2Ugb3V0cHV0cyB3b3JraW5nXG4gIEBPdXRwdXQoKSBjcm9wcGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB1cGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZWRpdEltYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBkZWxldGVJbWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY2hhbmdlZEZvcm0gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNoYW5nZWRFZGl0TW9kZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2hvd1VwbG9hZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyBteUZvcm06IGFueSA9IHt9O1xuICBwdWJsaWMgaW1hZ2VMaXN0OiBBcnJheTxhbnk+ID0gW107XG4gIHB1YmxpYyB2aXNpYmxlQ29udHJvbFBhbmVsOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZWRpdFZpc2libGU6IEJvb2xlYW47XG4gIEBJbnB1dCgpIGtleTogbnVtYmVyO1xuICBASW5wdXQoKSBpbWFnZU5hbWVMaXN0OiBBcnJheTxzdHJpbmc+O1xuICBASW5wdXQoKSB1c2VySW1hZ2VzOiBBcnJheTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHJlYWRvbmx5IHBsYXRmb3JtSWQ6IGFueSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMudmlzaWJsZUNvbnRyb2xQYW5lbCA9IHRoaXMuZWRpdFZpc2libGU7XG4gICAgfVxuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIGlmICh0aGlzLnVzZXJJbWFnZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdGVtcCA9IHtcbiAgICAgICAgYWxsVGV4dDogdGhpcy51c2VySW1hZ2VzW3RoaXMua2V5XS5jb250cm9sQm94LmFsbFRleHQsXG4gICAgICAgIG1ldGFUaXRsZTogdGhpcy51c2VySW1hZ2VzW3RoaXMua2V5XS5jb250cm9sQm94Lm1ldGFUaXRsZVxuICAgICAgfTtcbiAgICAgIHRoaXMubXlGb3JtID0gXy5jbG9uZURlZXAodGVtcCk7XG4gICAgfVxuICB9XG4gIG9uSW1hZ2VMb2FkZWQoZmlsZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52aXNpYmxlQ29udHJvbFBhbmVsID0gZmFsc2U7XG4gICAgdGhpcy51cGxvYWRlZC5lbWl0KGZpbGUpO1xuICB9XG4gIG9uQ2hhbmdlZE1vZGUobW9kZSkge1xuICAgIHRoaXMuY2hhbmdlZEVkaXRNb2RlLmVtaXQobW9kZSk7XG4gIH1cbiAgb25FZGl0KGluZGV4KSB7XG4gICAgdGhpcy5lZGl0SW1hZ2UuZW1pdChpbmRleCk7XG4gICAgdGhpcy5rZXkgPSBpbmRleDtcbiAgICB0aGlzLnZpc2libGVDb250cm9sUGFuZWwgPSB0cnVlO1xuICB9XG4gIG9uRGVsZXRlKGluZGV4KSB7XG4gICAgdGhpcy5kZWxldGVJbWFnZS5lbWl0KGluZGV4KTtcbiAgfVxuICBvbkNoYW5nZWRGb3JtKGZvcm1EYXRhOiBhbnkpIHtcbiAgICB0aGlzLmNoYW5nZWRGb3JtLmVtaXQoZm9ybURhdGEpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwbG9hZEV2ZW50LCBVcGxvYWRGaWxlLCBGaWxlU3lzdGVtRmlsZUVudHJ5LCBGaWxlU3lzdGVtRGlyZWN0b3J5RW50cnkgfSBmcm9tICduZ3gtZmlsZS1kcm9wJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLXVwbG9hZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNlbnRlclwiPlxuICA8ZGl2PlxuICAgIDxmaWxlLWRyb3BcbiAgICAgIGhlYWRlcnRleHQ9XCJEcm9wIGZpbGVzIGhlcmVcIlxuICAgICAgKG9uRmlsZURyb3ApPVwiZHJvcHBlZCgkZXZlbnQpXCIgXG4gICAgICAob25GaWxlT3Zlcik9XCJmaWxlT3ZlcigkZXZlbnQpXCJcbiAgICAgIChvbkZpbGVMZWF2ZSk9XCJmaWxlTGVhdmUoJGV2ZW50KVwiXG4gICAgICBjdXN0b21zdHlsZT1cImRyb3AtYXJlYVwiXG4gICAgPjwvZmlsZS1kcm9wPlxuICAgIDxsYWJlbCBmb3I9XCJmaWxlLXVwbG9hZFwiIGNsYXNzPVwidXBsb2FkLWJ0blwiPlxuICAgICAgQ2hvb3NlIGZpbGVcbiAgICA8L2xhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgaWQ9XCJmaWxlLXVwbG9hZFwiXG4gICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAoY2hhbmdlKT1cImZpbGVDaGFuZ2VFdmVudCgkZXZlbnQpXCJcbiAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgbXVsdGlwbGU+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5oMXtmb250LXNpemU6MnJlbX0uaDJ7Zm9udC1zaXplOjEuNXJlbX0uaDN7Zm9udC1zaXplOjEuMjVyZW19Lmg0e2ZvbnQtc2l6ZToxcmVtfS5oNXtmb250LXNpemU6Ljg3NXJlbX0uaDZ7Zm9udC1zaXplOi43NXJlbX0uZm9udC1mYW1pbHktaW5oZXJpdHtmb250LWZhbWlseTppbmhlcml0fS5mb250LXNpemUtaW5oZXJpdHtmb250LXNpemU6aW5oZXJpdH0udGV4dC1kZWNvcmF0aW9uLW5vbmV7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmJvbGR7Zm9udC13ZWlnaHQ6NzAwfS5yZWd1bGFye2ZvbnQtd2VpZ2h0OjQwMH0uaXRhbGlje2ZvbnQtc3R5bGU6aXRhbGljfS5jYXBze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMmVtfS5sZWZ0LWFsaWdue3RleHQtYWxpZ246bGVmdH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5yaWdodC1hbGlnbnt0ZXh0LWFsaWduOnJpZ2h0fS5qdXN0aWZ5e3RleHQtYWxpZ246anVzdGlmeX0ubm93cmFwe3doaXRlLXNwYWNlOm5vd3JhcH0uYnJlYWstd29yZHt3b3JkLXdyYXA6YnJlYWstd29yZH0ubGluZS1oZWlnaHQtMXtsaW5lLWhlaWdodDoxfS5saW5lLWhlaWdodC0ye2xpbmUtaGVpZ2h0OjEuMTI1fS5saW5lLWhlaWdodC0ze2xpbmUtaGVpZ2h0OjEuMjV9LmxpbmUtaGVpZ2h0LTR7bGluZS1oZWlnaHQ6MS41fS5saXN0LXN0eWxlLW5vbmV7bGlzdC1zdHlsZTpub25lfS51bmRlcmxpbmV7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udHJ1bmNhdGV7bWF4LXdpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5saXN0LXJlc2V0e2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nLWxlZnQ6MH0uaW5saW5le2Rpc3BsYXk6aW5saW5lfS5ibG9jayw6aG9zdCAuY29udHJvbHtkaXNwbGF5OmJsb2NrfS5pbmxpbmUtYmxvY2t7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhYmxle2Rpc3BsYXk6dGFibGV9LnRhYmxlLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsfS5vdmVyZmxvdy1oaWRkZW57b3ZlcmZsb3c6aGlkZGVufS5vdmVyZmxvdy1zY3JvbGx7b3ZlcmZsb3c6c2Nyb2xsfS5vdmVyZmxvdy1hdXRve292ZXJmbG93OmF1dG99LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcIiBcIjtkaXNwbGF5OnRhYmxlfS5jbGVhcmZpeDphZnRlcntjbGVhcjpib3RofS5sZWZ0e2Zsb2F0OmxlZnR9LnJpZ2h0e2Zsb2F0OnJpZ2h0fS5maXR7bWF4LXdpZHRoOjEwMCV9Lm1heC13aWR0aC0xe21heC13aWR0aDoyNHJlbX0ubWF4LXdpZHRoLTJ7bWF4LXdpZHRoOjMycmVtfS5tYXgtd2lkdGgtM3ttYXgtd2lkdGg6NDhyZW19Lm1heC13aWR0aC00e21heC13aWR0aDo2NHJlbX0uYm9yZGVyLWJveHtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFsaWduLWJhc2VsaW5le3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5hbGlnbi10b3B7dmVydGljYWwtYWxpZ246dG9wfS5hbGlnbi1taWRkbGV7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hbGlnbi1ib3R0b217dmVydGljYWwtYWxpZ246Ym90dG9tfS5tMHttYXJnaW46MH0ubXQwe21hcmdpbi10b3A6MH0ubXIwe21hcmdpbi1yaWdodDowfS5tYjB7bWFyZ2luLWJvdHRvbTowfS5tbDB7bWFyZ2luLWxlZnQ6MH0ubXgwe21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjB9Lm15MHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowfS5tMXttYXJnaW46LjVyZW19Lm10MXttYXJnaW4tdG9wOi41cmVtfS5tcjF7bWFyZ2luLXJpZ2h0Oi41cmVtfS5tYjEsOmhvc3QgLmNvbnRyb2x7bWFyZ2luLWJvdHRvbTouNXJlbX0ubWwxe21hcmdpbi1sZWZ0Oi41cmVtfS5teDF7bWFyZ2luLWxlZnQ6LjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtfS5teTF7bWFyZ2luLXRvcDouNXJlbTttYXJnaW4tYm90dG9tOi41cmVtfS5tMnttYXJnaW46MXJlbX0ubXQye21hcmdpbi10b3A6MXJlbX0ubXIye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTEsOmhvc3QgLmNvbnRyb2wsOmhvc3QgLnVwbG9hZC1idG57cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDJ7cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgyLDpob3N0IC51cGxvYWQtYnRue3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgze3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZSw6aG9zdCAuY29udHJvbHtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGUsOmhvc3QgLmNvbnRyb2wgLmxhYmVsLWljb257cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMHt0b3A6MH0ucmlnaHQtMHtyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0e2Rpc3BsYXk6YmxvY2s7cGFkZGluZzoxcmVtfTpob3N0IGlucHV0W3R5cGU9ZmlsZV17ZGlzcGxheTpub25lfTpob3N0IGlucHV0W3R5cGU9Y2hlY2tib3hde2Rpc3BsYXk6bm9uZX06aG9zdCAudXBsb2FkLWJ0bntiYWNrZ3JvdW5kOiMwNWRjYjY7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjEycHggMTJweCAwfTpob3N0IC5jb250cm9se2NvbG9yOiNmZmY7d2lkdGg6MTAwJTtib3JkZXItcmFkaXVzOjEycHggMTJweCAwO2JhY2tncm91bmQtY29sb3I6IzQ0NGQ2M306aG9zdCAuY29udHJvbDpmb2N1c3tvdXRsaW5lOjB9Omhvc3QgLmNvbnRyb2wgLmxhYmVsLWljb257dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2xlZnQ6MWVtfWBdXG59KVxuXG5leHBvcnQgY2xhc3MgU2VtVXBsb2FkQ29tcG9uZW50IHtcblxuICBAT3V0cHV0KCkgcHVibGljIGRvbmVJbWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyB2aXNpYmxlSW1hZ2U6IEJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGZpbGVzOiBVcGxvYWRGaWxlW10gPSBbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgcHVibGljIGxvYWRlZEltYWdlKCkge1xuICAgIHRoaXMudmlzaWJsZUltYWdlID0gdHJ1ZTtcbiAgfVxuICBwdWJsaWMgZHJvcHBlZChldmVudDogVXBsb2FkRXZlbnQpIHtcbiAgICB0aGlzLmZpbGVzID0gZXZlbnQuZmlsZXM7XG5cbiAgICBmb3IgKGNvbnN0IGRyb3BwZWRGaWxlIG9mIGV2ZW50LmZpbGVzKSB7XG5cbiAgICAgIC8vIElzIGl0IGEgZmlsZT9cbiAgICAgIGlmIChkcm9wcGVkRmlsZS5maWxlRW50cnkuaXNGaWxlKSB7XG4gICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGRyb3BwZWRGaWxlLmZpbGVFbnRyeSBhcyBGaWxlU3lzdGVtRmlsZUVudHJ5O1xuICAgICAgICBmaWxlRW50cnkuZmlsZSgoZmlsZTogRmlsZSkgPT4ge1xuICAgICAgICAgIHRoaXMuZG9uZUltYWdlLmVtaXQoZmlsZSk7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgLy8gWW91IGNvdWxkIHVwbG9hZCBpdCBsaWtlIHRoaXM6XG4gICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbG9nbycsIGZpbGUsIHJlbGF0aXZlUGF0aClcblxuICAgICAgICAgIC8vIEhlYWRlcnNcbiAgICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICdzZWN1cml0eS10b2tlbic6ICdteXRva2VuJ1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgICB0aGlzLmh0dHAucG9zdCgnaHR0cHM6Ly9teWJhY2tlbmQuY29tL2FwaS91cGxvYWQvc2FuaXRpemUtYW5kLXNhdmUtbG9nbycsIGZvcm1EYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMsIHJlc3BvbnNlVHlwZTogJ2Jsb2InIH0pXG4gICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIC8vIFNhbml0aXplZCBsb2dvIHJldHVybmVkIGZyb20gYmFja2VuZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgKiovXG5cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJdCB3YXMgYSBkaXJlY3RvcnkgKGVtcHR5IGRpcmVjdG9yaWVzIGFyZSBhZGRlZCwgb3RoZXJ3aXNlIG9ubHkgZmlsZXMpXG4gICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGRyb3BwZWRGaWxlLmZpbGVFbnRyeSBhcyBGaWxlU3lzdGVtRGlyZWN0b3J5RW50cnk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZpbGVDaGFuZ2VFdmVudChldmVudCkge1xuICAgIGZvciAoY29uc3QgY2hvc2VuRmlsZSBvZiBldmVudC50YXJnZXQuZmlsZXMpIHtcbiAgICAgIHRoaXMuZG9uZUltYWdlLmVtaXQoY2hvc2VuRmlsZSk7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBmaWxlT3ZlcihldmVudCkge1xuICB9XG5cbiAgcHVibGljIGZpbGVMZWF2ZShldmVudCkge1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlcywgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIGFuaW1hdGUsXG4gIHRyYW5zaXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBBbmd1bGFyQ3JvcHBlcmpzQ29tcG9uZW50IH0gZnJvbSAnYW5ndWxhci1jcm9wcGVyanMnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tY3JvcHBlcicsXG4gIHRlbXBsYXRlOiBgPGRpdlxuICBjbGFzcz1cImltZy1jcm9wcGVyXCJcbiAgKG1vdXNlZW50ZXIpPVwib25Nb3VzZUVudGVyKClcIlxuICAobW91c2VsZWF2ZSk9XCJvbk1vdXNlTGVhdmUoKVwiPlxuICA8ZGl2IGNsYXNzPVwiZWRpdC1vdmVybGF5XCIgW2NsYXNzLmFjdGl2ZV09XCJob3ZlckFjdGl2ZVwiIChkYmxjbGljayk9XCJlZGl0SW1hZ2UoKVwiPlxuICAgIDxidXR0b24gKm5nSWY9XCJob3ZlckFjdGl2ZVwiIFtAZW50ZXJBbmltYXRpb25dIGNsYXNzPVwicDNcIiAoY2xpY2spPVwiZWRpdEltYWdlKClcIj5FZGl0IE1lITwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGltZ1xuICAgICpuZ0lmPVwiIWNyb3BwZWRJbWFnZSAmJiAhZWRpdE1vZGVcIlxuICAgIFtzcmNdPVwiaW1hZ2VEYXRhXCJcbiAgICBjbGFzcz1cInByZXZpZXctaW1hZ2VcIlxuICAgIChkYmxjbGljayk9XCJlZGl0SW1hZ2UoKVwiXG4gID5cbiAgPGFuZ3VsYXItY3JvcHBlclxuICAgICpuZ0lmPVwiZWRpdE1vZGVcIlxuICAgICNpbWFnZUNyb3BwZXJcbiAgICBbY3JvcHBlck9wdGlvbnNdPVwiY3JvcHBlckNvbmZpZ1wiXG4gICAgW2ltYWdlVXJsXT1cImltYWdlRGF0YVwiXG4gID48L2FuZ3VsYXItY3JvcHBlcj5cbiAgPGltZ1xuICAgICpuZ0lmPVwiY3JvcHBlZEltYWdlICYmICFlZGl0TW9kZVwiXG4gICAgW3NyY109XCJjcm9wcGVkSW1hZ2VcIlxuICAgIGNsYXNzPVwiZml0XCJcbiAgICBbbmdTdHlsZV09XCJjcm9wcGVkU3R5bGVcIlxuICAgIChkYmxjbGljayk9XCJlZGl0SW1hZ2UoKVwiPlxuICBcbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5oMXtmb250LXNpemU6MnJlbX0uaDJ7Zm9udC1zaXplOjEuNXJlbX0uaDN7Zm9udC1zaXplOjEuMjVyZW19Lmg0e2ZvbnQtc2l6ZToxcmVtfS5oNXtmb250LXNpemU6Ljg3NXJlbX0uaDZ7Zm9udC1zaXplOi43NXJlbX0uZm9udC1mYW1pbHktaW5oZXJpdHtmb250LWZhbWlseTppbmhlcml0fS5mb250LXNpemUtaW5oZXJpdHtmb250LXNpemU6aW5oZXJpdH0udGV4dC1kZWNvcmF0aW9uLW5vbmV7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmJvbGR7Zm9udC13ZWlnaHQ6NzAwfS5yZWd1bGFye2ZvbnQtd2VpZ2h0OjQwMH0uaXRhbGlje2ZvbnQtc3R5bGU6aXRhbGljfS5jYXBze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMmVtfS5sZWZ0LWFsaWdue3RleHQtYWxpZ246bGVmdH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5yaWdodC1hbGlnbnt0ZXh0LWFsaWduOnJpZ2h0fS5qdXN0aWZ5e3RleHQtYWxpZ246anVzdGlmeX0ubm93cmFwe3doaXRlLXNwYWNlOm5vd3JhcH0uYnJlYWstd29yZHt3b3JkLXdyYXA6YnJlYWstd29yZH0ubGluZS1oZWlnaHQtMXtsaW5lLWhlaWdodDoxfS5saW5lLWhlaWdodC0ye2xpbmUtaGVpZ2h0OjEuMTI1fS5saW5lLWhlaWdodC0ze2xpbmUtaGVpZ2h0OjEuMjV9LmxpbmUtaGVpZ2h0LTR7bGluZS1oZWlnaHQ6MS41fS5saXN0LXN0eWxlLW5vbmV7bGlzdC1zdHlsZTpub25lfS51bmRlcmxpbmV7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udHJ1bmNhdGV7bWF4LXdpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5saXN0LXJlc2V0e2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nLWxlZnQ6MH0uaW5saW5le2Rpc3BsYXk6aW5saW5lfS5ibG9ja3tkaXNwbGF5OmJsb2NrfS5pbmxpbmUtYmxvY2t7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhYmxle2Rpc3BsYXk6dGFibGV9LnRhYmxlLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsfS5vdmVyZmxvdy1oaWRkZW57b3ZlcmZsb3c6aGlkZGVufS5vdmVyZmxvdy1zY3JvbGx7b3ZlcmZsb3c6c2Nyb2xsfS5vdmVyZmxvdy1hdXRve292ZXJmbG93OmF1dG99LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcIiBcIjtkaXNwbGF5OnRhYmxlfS5jbGVhcmZpeDphZnRlcntjbGVhcjpib3RofS5sZWZ0e2Zsb2F0OmxlZnR9LnJpZ2h0e2Zsb2F0OnJpZ2h0fS5maXR7bWF4LXdpZHRoOjEwMCV9Lm1heC13aWR0aC0xe21heC13aWR0aDoyNHJlbX0ubWF4LXdpZHRoLTJ7bWF4LXdpZHRoOjMycmVtfS5tYXgtd2lkdGgtM3ttYXgtd2lkdGg6NDhyZW19Lm1heC13aWR0aC00e21heC13aWR0aDo2NHJlbX0uYm9yZGVyLWJveHtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFsaWduLWJhc2VsaW5le3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5hbGlnbi10b3B7dmVydGljYWwtYWxpZ246dG9wfS5hbGlnbi1taWRkbGV7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hbGlnbi1ib3R0b217dmVydGljYWwtYWxpZ246Ym90dG9tfS5tMHttYXJnaW46MH0ubXQwe21hcmdpbi10b3A6MH0ubXIwe21hcmdpbi1yaWdodDowfS5tYjB7bWFyZ2luLWJvdHRvbTowfS5tbDB7bWFyZ2luLWxlZnQ6MH0ubXgwe21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjB9Lm15MHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowfS5tMXttYXJnaW46LjVyZW19Lm10MXttYXJnaW4tdG9wOi41cmVtfS5tcjF7bWFyZ2luLXJpZ2h0Oi41cmVtfS5tYjF7bWFyZ2luLWJvdHRvbTouNXJlbX0ubWwxe21hcmdpbi1sZWZ0Oi41cmVtfS5teDF7bWFyZ2luLWxlZnQ6LjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtfS5teTF7bWFyZ2luLXRvcDouNXJlbTttYXJnaW4tYm90dG9tOi41cmVtfS5tMnttYXJnaW46MXJlbX0ubXQye21hcmdpbi10b3A6MXJlbX0ubXIye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTEsOmhvc3QgLmVkaXQtb3ZlcmxheSBidXR0b257cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDJ7cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgye3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgzLDpob3N0IC5lZGl0LW92ZXJsYXkgYnV0dG9ue3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZXtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGV7cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMHt0b3A6MH0ucmlnaHQtMHtyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0e2Rpc3BsYXk6YmxvY2t9Omhvc3QgLmltZy1jcm9wcGVye3Bvc2l0aW9uOnJlbGF0aXZlfTpob3N0IC5wcmV2aWV3LWltYWdle3dpZHRoOjEwMCV9Omhvc3QgLmVkaXQtb3ZlcmxheXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt0cmFuc2l0aW9uOi4ycyBlYXNlLWlufTpob3N0IC5lZGl0LW92ZXJsYXkuYWN0aXZle2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMil9Omhvc3QgLmVkaXQtb3ZlcmxheSBidXR0b257YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC42KTtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjUwJTt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKX1gXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXG4gICAgICAnZW50ZXJBbmltYXRpb24nLCBbXG4gICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxuICAgICAgICAgIGFuaW1hdGUoJzUwMG1zJywgc3R5bGUoe29wYWNpdHk6IDF9KSlcbiAgICAgICAgXSksXG4gICAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMX0pLFxuICAgICAgICAgIGFuaW1hdGUoJzUwMG1zJywgc3R5bGUoe29wYWNpdHk6IDB9KSlcbiAgICAgICAgXSlcbiAgICAgIF1cbiAgICApXG4gIF0sXG59KVxuXG5leHBvcnQgY2xhc3MgU2VtQ3JvcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgnaW1hZ2VDcm9wcGVyJykgcHVibGljIGltYWdlQ3JvcHBlcjogQW5ndWxhckNyb3BwZXJqc0NvbXBvbmVudDtcbiAgQElucHV0KCkgaW1hZ2VEYXRhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNyb3BwZWRJbWFnZTogc3RyaW5nO1xuICBASW5wdXQoKSBjb25maWc6IGFueSA9IHt9O1xuICBASW5wdXQoKSBlZGl0TW9kZTogYm9vbGVhbjtcbiAgQElucHV0KCkga2V5OiBudW1iZXI7XG4gIEBPdXRwdXQoKSBlbmFibGVkQ3JvcHBlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY3JvcHBlZEltYWdlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgY3JvcHBlckNvbmZpZzogYW55O1xuICBlZGl0VmlzaWJsZTogQm9vbGVhbiA9ICBmYWxzZTtcbiAgY3JvcHBlZERhdGE6IGFueTtcbiAgY3JvcHBlZFN0eWxlOiBhbnk7XG4gIGhvdmVyQWN0aXZlOiBCb29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lLCBwdWJsaWMgX21lZGlhU2VydmljZTogU2VtTWVkaWFTZXJ2aWNlKSB7XG4gICAgdGhpcy5jcm9wcGVyQ29uZmlnID0ge1xuICAgICAgbW92YWJsZTogdHJ1ZSxcbiAgICAgIHNjYWxhYmxlOiBmYWxzZSxcbiAgICAgIHpvb21hYmxlOiB0cnVlLFxuICAgICAgdmlld01vZGU6IDEsXG4gICAgICBndWlkZXM6IHRydWUsXG4gICAgICByb3RhdGFibGU6IHRydWUsXG4gICAgICBkcmFnTW9kZTogJ21vdmUnLFxuICAgICAgY2hlY2tDcm9zc09yaWdpbjogdHJ1ZSxcbiAgICAgIHJlYWR5OiAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5jcm9wcGVyLmNsZWFyKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmNvbmZpZyAmJiB0aGlzLmltYWdlQ3JvcHBlcikge1xuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuZml0KSB7XG4gICAgICAgIHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIucmVzZXQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLmNyb3ApIHtcbiAgICAgICAgLy8gdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5zZXREcmFnTW9kZSgnY3JvcCcpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuem9vbSAhPT0gMCkge1xuICAgICAgICB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLnpvb20oY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLnpvb20pO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUucm90YXRlICE9PSAwKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIucm90YXRlKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5yb3RhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuYXBwbHkpIHtcbiAgICAgICAgY29uc3QgY3JvcHBlZEltYWdlID0gdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5nZXRDcm9wcGVkQ2FudmFzKCkudG9EYXRhVVJMKCdpbWFnZS9qcGcnKTtcbiAgICAgICAgdGhpcy5jcm9wcGVkRGF0YSA9IHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIuZ2V0Q3JvcEJveERhdGEoKTtcbiAgICAgICAgdGhpcy5jcm9wcGVkU3R5bGUgPSB7XG4gICAgICAgICAgJ3RvcC5weCc6IHRoaXMuY3JvcHBlZERhdGEudG9wLFxuICAgICAgICAgICdsZWZ0LnB4JzogdGhpcy5jcm9wcGVkRGF0YS5sZWZ0LFxuICAgICAgICAgICd3aWR0aC5weCc6IHRoaXMuY3JvcHBlZERhdGEud2lkdGgsXG4gICAgICAgICAgJ2hlaWdodC5weCc6IHRoaXMuY3JvcHBlZERhdGEuaGVpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyb3BwZWRJbWFnZUV2ZW50LmVtaXQoY3JvcHBlZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZXMua2V5ICYmIGNoYW5nZXMua2V5LmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5rZXkgPSBjaGFuZ2VzLmtleS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG4gIG5nT25Jbml0KCkge31cbiAgaW1hZ2VMb2FkZWQoKSB7XG4gICAgICAvLyBzaG93IGNyb3BwZXJcbiAgfVxuICBsb2FkSW1hZ2VGYWlsZWQoKSB7XG4gICAgICAvLyBzaG93IG1lc3NhZ2VcbiAgfVxuICBlZGl0SW1hZ2UoKSB7XG4gICAgdGhpcy5jcm9wcGVkSW1hZ2UgPSAnJztcbiAgICB0aGlzLmVuYWJsZWRDcm9wcGVyLmVtaXQoKTtcbiAgfVxuICBvbk1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy5ob3ZlckFjdGl2ZSA9IHRydWU7XG4gIH1cbiAgb25Nb3VzZUxlYXZlKCkge1xuICAgIHRoaXMuaG92ZXJBY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tY29udHJvbHMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmbGV4IG15MVwiPlxuICA8ZGl2IGNsYXNzPVwiY29sLTYgcHgxXCI+XG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gZm9yPVwiZml0LWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZEZpdC5lbWl0KClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1yZXNpemUgbGFiZWwtaWNvblwiPjwvc3Bhbj5GaXRcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIGZvcj1cInJvdGF0ZS1sZWZ0LWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZFJvdGF0ZUxlZnQuZW1pdCgpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcmVzaXplIGxhYmVsLWljb25cIj48L3NwYW4+Um90YXRlIExlZnRcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIGZvcj1cInpvb20taW4tY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJwcmVzc2VkWm9vbUluLmVtaXQoKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXJlc2l6ZSBsYWJlbC1pY29uXCI+PC9zcGFuPlpvb20gaW5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbC02IHB4MVwiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPGJ1dHRvbiBmb3I9XCJjcm9wLWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZENyb3AuZW1pdCgpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1yZXNpemUgbGFiZWwtaWNvblwiPjwvc3Bhbj5Dcm9wXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8YnV0dG9uIGZvcj1cInJvdGF0ZS1yaWdodC1jb250cm9sXCIgY2xhc3M9XCJjb250cm9sXCIgKGNsaWNrKT1cInByZXNzZWRSb3RhdGVSaWdodC5lbWl0KClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXJlc2l6ZSBsYWJlbC1pY29uXCI+PC9zcGFuPlJvdGF0ZSByaWdodFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGJ1dHRvbiBmb3I9XCJ6b29tLW91dC1jb250cm9sXCIgY2xhc3M9XCJjb250cm9sXCIgKGNsaWNrKT1cInByZXNzZWRab29tT3V0LmVtaXQoKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcmVzaXplIGxhYmVsLWljb25cIj48L3NwYW4+Wm9vbSBvdXRcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2NrLDpob3N0IC5jb250cm9se2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMSw6aG9zdCAuY29udHJvbHttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MSw6aG9zdCAuY29udHJvbHtwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDN7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZlLDpob3N0IC5jb250cm9se3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZSw6aG9zdCAuY29udHJvbCAubGFiZWwtaWNvbntwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3QgLmNvbnRyb2x7Y29sb3I6I2ZmZjt3aWR0aDoxMDAlO2JvcmRlci1yYWRpdXM6MTJweCAxMnB4IDA7YmFja2dyb3VuZC1jb2xvcjojNDQ0ZDYzfTpob3N0IC5jb250cm9sOmZvY3Vze291dGxpbmU6MH06aG9zdCAuY29udHJvbCAubGFiZWwtaWNvbnt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7bGVmdDoxZW19YF0sXG59KVxuXG5leHBvcnQgY2xhc3MgU2VtQ29udHJvbHNDb21wb25lbnQge1xuICBAT3V0cHV0KCkgcHVibGljIHByZXNzZWRGaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBwcmVzc2VkQ3JvcCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHVibGljIHByZXNzZWRSb3RhdGVMZWZ0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZFJvdGF0ZVJpZ2h0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZFpvb21JbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHVibGljIHByZXNzZWRab29tT3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG59XG5cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBpbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFBhbmVUeXBlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tc2xpZGUtcGFuZWwnLFxuICBzdHlsZXM6IFtgOmhvc3R7ZGlzcGxheTpibG9jaztvdmVyZmxvdzpoaWRkZW59LnBhbmVze2hlaWdodDoxMDAlO3dpZHRoOjIwMCU7dHJhbnNpdGlvbi1kdXJhdGlvbjouNXM7ZGlzcGxheTpmbGV4fS5wYW5lcyBkaXZ7ZmxleDoxfWBdLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYW5lc1wiIFtAc2xpZGVdPVwiYWN0aXZlUGFuZVwiPlxuICA8ZGl2PjxuZy1jb250ZW50IHNlbGVjdD1cIltsZWZ0UGFuZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gIDxkaXY+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW3JpZ2h0UGFuZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG48L2Rpdj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3NsaWRlJywgW1xuICAgICAgc3RhdGUoJ2xlZnQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknIH0pKSxcbiAgICAgIHN0YXRlKCdyaWdodCcsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScgfSkpLFxuICAgICAgdHJhbnNpdGlvbignbGVmdCA8PT4gcmlnaHQnLCBhbmltYXRlKCcxcycpKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVQYW5lbENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGFjdGl2ZVBhbmU6IFBhbmVUeXBlID0gJ2xlZnQnO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNlbU1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS1tZWRpYS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLXNldHRpbmdzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0taGVhZGVyXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCIgKGNsaWNrKT1cImlzTGVmdFZpc2libGU9dHJ1ZVwiPjwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxzZW0tc2xpZGUtcGFuZWwgW2FjdGl2ZVBhbmVdPVwiaXNMZWZ0VmlzaWJsZT8gJ2xlZnQnOiAncmlnaHQnXCI+XG4gICAgPGRpdiBsZWZ0UGFuZT5cbiAgICAgIDxkaXYgc2VtdWktc2VjdGlvbi1ib2R5IGNsYXNzPVwicDJcIj5cbiAgICAgICAgPHVsIHNlbXVpLWxpc3QgY2xhc3M9XCJ1c2VyLW5hdlwiPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICBsaXN0LWl0ZW1cbiAgICAgICAgICAgIHNlbXVpLWltcG9ydGFuY2U9XCJkYXJrXCJcbiAgICAgICAgICAgIGNsYXNzPVwicHkxXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkltYWdlcygpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aSBjbGFzcz1cInNlbS1pY29uLXN0eWxlIGRlZmF1bHRcIiAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPHNwYW4+IEltYWdlczwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICBsaXN0LWl0ZW1cbiAgICAgICAgICAgIHNlbXVpLWltcG9ydGFuY2U9XCJkYXJrXCJcbiAgICAgICAgICAgIGNsYXNzPVwicHkxXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvblNldHRpbmdzKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwic2VtLWljb24tc2V0dGluZ3MgZGVmYXVsdFwiICBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8c3Bhbj4gU2V0dGluZ3M8L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIHNlbXVpLWxpc3QtaXRlbVxuICAgICAgICAgICAgbGlzdC1pdGVtXG4gICAgICAgICAgICBzZW11aS1pbXBvcnRhbmNlPVwiZGFya1wiXG4gICAgICAgICAgICBjbGFzcz1cInB5MVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25EdXBsaWNhdGUoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJzZW0taWNvbi1zaXRlcyBkZWZhdWx0XCIgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuPiBEdXBsaWNhdGU8L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIHNlbXVpLWxpc3QtaXRlbVxuICAgICAgICAgICAgbGlzdC1pdGVtXG4gICAgICAgICAgICBzZW11aS1pbXBvcnRhbmNlPVwiZGFya1wiXG4gICAgICAgICAgICBjbGFzcz1cInB5MVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25EZWxldGUoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJzZW0taWNvbi1kZWxldGUgZGVmYXVsdFwiICBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8c3Bhbj4gRGVsZXRlPC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHJpZ2h0UGFuZT5cbiAgICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwidmlld01vZGVGb3JtXCIgY2xhc3M9XCJwMlwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgdmFsdWU9XCJncmlkXCJcbiAgICAgICAgaWQ9XCJncmlkXCJcbiAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidmlld01vZGVcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImdyaWRcIj48c3BhbiBjbGFzcz1cInNlbS1pY29uLXN0eWxlIGRlZmF1bHRcIj48L3NwYW4+PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgdmFsdWU9XCJjYXJvdXNlbFwiXG4gICAgICAgICAgaWQ9XCJjYXJvdXNlbFwiXG4gICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidmlld01vZGVcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImNhcm91c2VsXCI+PHNwYW4gY2xhc3M9XCJzZW0taWNvbi1zZXR0aW5ncyBkZWZhdWx0XCI+PC9zcGFuPjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgIHZhbHVlPVwibGlzdFwiXG4gICAgICAgICAgaWQ9XCJsaXN0XCJcbiAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ2aWV3TW9kZVwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwibGlzdFwiPjxzcGFuIGNsYXNzPVwic2VtLWljb24tc2V0dGluZ3MgZGVmYXVsdFwiPjwvc3Bhbj48L2xhYmVsPlxuICAgICAgPC9mb3JtPlxuICAgICAge3t2aWV3TW9kZUZvcm0udmFsdWUgfCBqc29ufX1cbiAgICA8L2Rpdj5cbiAgPC9zZW0tc2xpZGUtcGFuZWw+XG5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2Nre2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMXttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MXtwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDN7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXgsOmhvc3QgZm9ybXtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZCw6aG9zdCBmb3Jte2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZXtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGV7cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMHt0b3A6MH0ucmlnaHQtMHtyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0IGZvcm0gaW5wdXRbdHlwZT1yYWRpb117ZGlzcGxheTpub25lfTpob3N0IGZvcm0gaW5wdXRbdHlwZT1yYWRpb106Y2hlY2tlZCtsYWJlbHtiYWNrZ3JvdW5kOiNjY2N9Omhvc3QgZm9ybSBsYWJlbCBzcGFue2ZvbnQtc2l6ZTozMHB4fWBdXG59KVxuXG5leHBvcnQgY2xhc3MgU2VtTWVkaWFTZXR0aW5nc0NvbXBvbmVudCB7XG4gIEBPdXRwdXQoKSBwcmVzc2VkSW1hZ2VzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwcmVzc2VkRGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwcmVzc2VkRHVwbGljYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwcmVzc2VkU2V0dGluZ3MgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHVibGljIGlzTGVmdFZpc2libGU6IEJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgdmlld01vZGVGb3JtOiBGb3JtR3JvdXA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9tZWRpYVNlcnZpY2U6IFNlbU1lZGlhU2VydmljZSwgcHJpdmF0ZSBfZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgdGhpcy52aWV3TW9kZUZvcm0gPSB0aGlzLl9mYi5ncm91cCh7XG4gICAgICB2aWV3TW9kZTogJydcbiAgICB9KTtcbiAgfVxuICBvbkRlbGV0ZSgpIHtcbiAgICB0aGlzLnByZXNzZWREZWxldGUuZW1pdCgpO1xuICB9XG4gIG9uSW1hZ2VzKCkge1xuICAgIHRoaXMucHJlc3NlZEltYWdlcy5lbWl0KCk7XG4gIH1cbiAgb25EdXBsaWNhdGUoKSB7XG4gICAgdGhpcy5wcmVzc2VkRHVwbGljYXRlLmVtaXQoKTtcbiAgfVxuICBvblNldHRpbmdzKCkge1xuICAgIHRoaXMuaXNMZWZ0VmlzaWJsZSA9IGZhbHNlO1xuICAgIC8vIHRoaXMucHJlc3NlZFNldHRpbmdzLmVtaXQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tbWVkaWEtZWRpdCcsXG4gIHRlbXBsYXRlOiBgPGZvcm0gW2Zvcm1Hcm91cF09XCJteUZvcm1cIiBjbGFzcz1cInAyXCI+XG4gIDxsYWJlbD5BbGwgVGV4dDwvbGFiZWw+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgY2xhc3M9XCJzZW0taW5wdXRcIlxuICAgIGlkPVwiYWxsLXRleHRcIlxuICAgIGZvcm1Db250cm9sTmFtZT1cImFsbFRleHRcIj5cbiAgPGxhYmVsPk1ldGEgVGl0bGU8L2xhYmVsPlxuICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgIGNsYXNzPVwic2VtLWlucHV0XCJcbiAgICBpZD1cIm1ldGEtdGl0bGVcIlxuICAgIGZvcm1Db250cm9sTmFtZT1cIm1ldGFUaXRsZVwiPlxuPC9mb3JtPlxuPHNlbS1jb250cm9sc1xuICAocHJlc3NlZEZpdCk9XCJvblByZXNzKCdGSVQnKVwiXG4gIChwcmVzc2VkQ3JvcCk9XCJvblByZXNzKCdDUk9QJylcIlxuICAocHJlc3NlZFJvdGF0ZUxlZnQpPVwib25QcmVzcygnUk9UQVRFX0xFRlQnKVwiXG4gIChwcmVzc2VkUm90YXRlUmlnaHQpPVwib25QcmVzcygnUk9UQVRFX1JJR0hUJylcIlxuICAocHJlc3NlZFpvb21Jbik9XCJvblByZXNzKCdaT09NX0lOJylcIlxuICAocHJlc3NlZFpvb21PdXQpPVwib25QcmVzcygnWk9PTV9PVVQnKVwiPlxuPC9zZW0tY29udHJvbHM+XG48ZGl2IGNsYXNzPVwicHgyIGZsZXgganVzdGlmeS1lbmRcIj5cbiAgPGJ1dHRvbiBmb3I9XCJjcm9wLWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwib25QcmVzcygnQVBQTFknKVwiID5cbiAgICBBcHBseVxuICA8L2J1dHRvbj5cbjwvZGl2PlxuPCEtLSA8ZGl2PjxwcmU+PGNvZGU+e3sgbXlGb3JtPy52YWx1ZSB8IGpzb24gfX08L2NvZGU+PC9wcmU+PC9kaXY+IC0tPlxuYCxcbiAgc3R5bGVzOiBbYC5oMXtmb250LXNpemU6MnJlbX0uaDJ7Zm9udC1zaXplOjEuNXJlbX0uaDN7Zm9udC1zaXplOjEuMjVyZW19Lmg0e2ZvbnQtc2l6ZToxcmVtfS5oNXtmb250LXNpemU6Ljg3NXJlbX0uaDZ7Zm9udC1zaXplOi43NXJlbX0uZm9udC1mYW1pbHktaW5oZXJpdHtmb250LWZhbWlseTppbmhlcml0fS5mb250LXNpemUtaW5oZXJpdHtmb250LXNpemU6aW5oZXJpdH0udGV4dC1kZWNvcmF0aW9uLW5vbmV7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmJvbGR7Zm9udC13ZWlnaHQ6NzAwfS5yZWd1bGFye2ZvbnQtd2VpZ2h0OjQwMH0uaXRhbGlje2ZvbnQtc3R5bGU6aXRhbGljfS5jYXBze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMmVtfS5sZWZ0LWFsaWdue3RleHQtYWxpZ246bGVmdH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5yaWdodC1hbGlnbnt0ZXh0LWFsaWduOnJpZ2h0fS5qdXN0aWZ5e3RleHQtYWxpZ246anVzdGlmeX0ubm93cmFwe3doaXRlLXNwYWNlOm5vd3JhcH0uYnJlYWstd29yZHt3b3JkLXdyYXA6YnJlYWstd29yZH0ubGluZS1oZWlnaHQtMXtsaW5lLWhlaWdodDoxfS5saW5lLWhlaWdodC0ye2xpbmUtaGVpZ2h0OjEuMTI1fS5saW5lLWhlaWdodC0ze2xpbmUtaGVpZ2h0OjEuMjV9LmxpbmUtaGVpZ2h0LTR7bGluZS1oZWlnaHQ6MS41fS5saXN0LXN0eWxlLW5vbmV7bGlzdC1zdHlsZTpub25lfS51bmRlcmxpbmV7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udHJ1bmNhdGV7bWF4LXdpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5saXN0LXJlc2V0e2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nLWxlZnQ6MH0uaW5saW5le2Rpc3BsYXk6aW5saW5lfS5ibG9jayw6aG9zdCAuY29udHJvbHtkaXNwbGF5OmJsb2NrfS5pbmxpbmUtYmxvY2t7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhYmxle2Rpc3BsYXk6dGFibGV9LnRhYmxlLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsfS5vdmVyZmxvdy1oaWRkZW57b3ZlcmZsb3c6aGlkZGVufS5vdmVyZmxvdy1zY3JvbGx7b3ZlcmZsb3c6c2Nyb2xsfS5vdmVyZmxvdy1hdXRve292ZXJmbG93OmF1dG99LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcIiBcIjtkaXNwbGF5OnRhYmxlfS5jbGVhcmZpeDphZnRlcntjbGVhcjpib3RofS5sZWZ0e2Zsb2F0OmxlZnR9LnJpZ2h0e2Zsb2F0OnJpZ2h0fS5maXR7bWF4LXdpZHRoOjEwMCV9Lm1heC13aWR0aC0xe21heC13aWR0aDoyNHJlbX0ubWF4LXdpZHRoLTJ7bWF4LXdpZHRoOjMycmVtfS5tYXgtd2lkdGgtM3ttYXgtd2lkdGg6NDhyZW19Lm1heC13aWR0aC00e21heC13aWR0aDo2NHJlbX0uYm9yZGVyLWJveHtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFsaWduLWJhc2VsaW5le3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5hbGlnbi10b3B7dmVydGljYWwtYWxpZ246dG9wfS5hbGlnbi1taWRkbGV7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hbGlnbi1ib3R0b217dmVydGljYWwtYWxpZ246Ym90dG9tfS5tMHttYXJnaW46MH0ubXQwe21hcmdpbi10b3A6MH0ubXIwe21hcmdpbi1yaWdodDowfS5tYjB7bWFyZ2luLWJvdHRvbTowfS5tbDB7bWFyZ2luLWxlZnQ6MH0ubXgwe21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjB9Lm15MHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowfS5tMXttYXJnaW46LjVyZW19Lm10MXttYXJnaW4tdG9wOi41cmVtfS5tcjF7bWFyZ2luLXJpZ2h0Oi41cmVtfS5tYjEsOmhvc3QgLmNvbnRyb2x7bWFyZ2luLWJvdHRvbTouNXJlbX0ubWwxe21hcmdpbi1sZWZ0Oi41cmVtfS5teDF7bWFyZ2luLWxlZnQ6LjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtfS5teTF7bWFyZ2luLXRvcDouNXJlbTttYXJnaW4tYm90dG9tOi41cmVtfS5tMnttYXJnaW46MXJlbX0ubXQye21hcmdpbi10b3A6MXJlbX0ubXIye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTEsOmhvc3QgLmNvbnRyb2x7cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDJ7cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgye3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgzLDpob3N0IC5jb250cm9se3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZSw6aG9zdCAuY29udHJvbHtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGV7cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMHt0b3A6MH0ucmlnaHQtMHtyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0IC5jb250cm9se2NvbG9yOiNmZmY7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czoxMnB4IDEycHggMDtiYWNrZ3JvdW5kLWNvbG9yOiMwNWRjYjZ9Omhvc3QgLmNvbnRyb2w6Zm9jdXN7b3V0bGluZTowfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQE91dHB1dCgpIHNlbGVjdGVkRWRpdE1vZGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGZvcm1DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBJbnB1dCgpIGZvcm1EYXRhOiBhbnk7XG4gIHB1YmxpYyBteUZvcm06IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgdGhpcy5teUZvcm0gPSB0aGlzLl9mYi5ncm91cCh7XG4gICAgICBhbGxUZXh0IDogJycsXG4gICAgICBtZXRhVGl0bGU6ICcnLFxuICAgIH0pO1xuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIHRoaXMubXlGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgYWxsVGV4dDogdGhpcy5mb3JtRGF0YS5hbGxUZXh0LFxuICAgICAgbWV0YVRpdGxlOiB0aGlzLmZvcm1EYXRhLm1ldGFUaXRsZVxuICAgIH0pO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubXlGb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuZm9ybUNoYW5nZWQuZW1pdChkYXRhKTtcbiAgICB9KTtcbiAgfVxuICBvblByZXNzKG1vZGUpIHtcbiAgICB0aGlzLnNlbGVjdGVkRWRpdE1vZGUuZW1pdChtb2RlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsICBPdXRwdXQsIEluamVjdG9yLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNlbU1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS1tZWRpYS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLW1lZGlhLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyIHNlbS1tZWRpYS1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyLS1uYXZcIj5cbiAgICA8YnV0dG9uXG4gICAgICBzZW0tYnRuLWZhYlxuICAgICAgY29ybmVyPVwidG9wLXJpZ2h0XCJcbiAgICAgIHNlbXVpLXRoZW1lPVwibGlnaHRcIlxuICAgICAgY2xhc3M9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIFwiXG4gICAgICBzZW0taW1wb3J0YW5jZT1cInNlY29uZGFyeVwiXG4gICAgICAjY2hhdE92ZXJsYXk9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAgIChjbGljayk9XCJvcGVuVGVzdEEoIWlzVGVzdEFPcGVuZWQpXCJcbiAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcHJvZmlsZS1hY2NlbnRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRoMVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInBhdGgyXCI+PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPHNlbXVpLW92ZXJsYXktZGlhbG9nXG4gICAgICBbb3ZlcmxheU9yaWdpbl09XCJjaGF0T3ZlcmxheVwiXG4gICAgICBbaXNPcGVuZWRdPVwiaXNUZXN0QU9wZW5lZFwiXG4gICAgICAoY2xvc2UpPVwib3BlblRlc3RBKGZhbHNlKVwiXG4gICAgICAob3Blbik9XCJvcGVuVGVzdEEodHJ1ZSlcIlxuICAgICAgW292ZXJsYXlXaWR0aF09XCInYXV0bydcIlxuICAgID5cblxuICAgICAgPGRpdiAqbmdJZj1cInVwbG9hZFBhbmVsRmxhZ1wiIGNsYXNzPVwidGVtcC1jb250YWluZXIgZGlhbG9nLWNvbnRhaW5lciBsZWZ0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1ib2R5XCI+XG4gICAgICAgICAgPHNlbS1wYW5lbFxuICAgICAgICAgICAgW2VkaXRWaXNpYmxlXT1cImVkaXRWaXNpYmxlXCJcbiAgICAgICAgICAgIFtrZXldPVwia2V5XCJcbiAgICAgICAgICAgIFtpbWFnZU5hbWVMaXN0XT1cImltYWdlTmFtZUxpc3RcIlxuICAgICAgICAgICAgKGNyb3BwZWQpPVwiY3JvcHBlZEltYWdlKCRldmVudClcIlxuICAgICAgICAgICAgKHVwbG9hZGVkKT1cInVwbG9hZGVkSW1hZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAoY2hhbmdlZEZvcm0pPVwib25DaGFuZ2VkRm9ybSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChlZGl0SW1hZ2UpPVwib25FZGl0SW1hZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZGVsZXRlSW1hZ2UpPVwib25EZWxldGVJbWFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChjaGFuZ2VkRWRpdE1vZGUpPVwib25DaGFuZ2VkRWRpdE1vZGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAoc2hvd1VwbG9hZEV2ZW50KT1cImVkaXRWaXNpYmxlID0gZmFsc2VcIlxuICAgICAgICAgICAgW3VzZXJJbWFnZXNdPVwidXNlckltYWdlc1wiXG4gICAgICAgICAgPjwvc2VtLXBhbmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cIiF1cGxvYWRQYW5lbEZsYWdcIlxuICAgICAgICAgICBjbGFzcz1cInNldHRpbmdzLWNvbnRhaW5lciBkaWFsb2ctY29udGFpbmVyIG10NFwiPlxuICAgICAgICA8c2VtLXNldHRpbmdzXG4gICAgICAgICAgKHByZXNzZWRJbWFnZXMpPVwib25NZW51KCdJTUFHRVMnKVwiXG4gICAgICAgICAgKHByZXNzZWREdXBsaWNhdGUpPVwib25NZW51KCdEVVBMSUNBVEUnKVwiXG4gICAgICAgICAgKHByZXNzZWRTZXR0aW5ncyk9XCJvbk1lbnUoJ1NFVFRJTkdTJylcIlxuICAgICAgICAgIChwcmVzc2VkRGVsZXRlKT1cIm9uTWVudSgnREVMRVRFJylcIlxuICAgICAgICA+XG4gICAgICAgIDwvc2VtLXNldHRpbmdzPlxuICAgICAgPC9kaXY+XG5cbiAgICA8L3NlbXVpLW92ZXJsYXktZGlhbG9nPlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5cbjxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtY29sdW1uXCI+XG5cbiAgPCEtLSA8cHJlPnt7dGVtcEltYWdlcyB8IGpzb259fTwvcHJlPiAtLT5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cInVzZXJJbWFnZXNcIiBjbGFzcz1cInByZXZpZXctY29udGFpbmVyXCI+XG4gIDxzZW0tY3JvcHBlclxuICAgICpuZ0Zvcj1cImxldCBpbWFnZSBvZiB1c2VySW1hZ2VzO2xldCBrZXkgPSBpbmRleFwiXG4gICAgW2ltYWdlRGF0YV09XCJpbWFnZS51cGxvYWRlZEltYWdlXCJcbiAgICBbY3JvcHBlZEltYWdlXT1cImltYWdlLmNyb3BwZWRJbWFnZVwiXG4gICAgW2VkaXRNb2RlXT1cImltYWdlLmVkaXRNb2RlXCJcbiAgICBbY29uZmlnXT1cImNvbmZpZ1wiXG4gICAgW2tleV09XCJrZXlcIlxuICAgIChlbmFibGVkQ3JvcHBlcik9XCJvbkVuYWJsZUVkaXRJbWFnZShrZXkpXCJcbiAgICAoY3JvcHBlZEltYWdlRXZlbnQpPVwib25Dcm9wcGVkSW1hZ2Uoa2V5LCAkZXZlbnQpXCJcbiAgPjwvc2VtLWNyb3BwZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCgpe2JhY2tncm91bmQtY29sb3I6I2Y1ZTVlNTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgIzhiMDAwMDtoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyB3aWRnZXQgPSB7XG4gICAgY29tcG9uZW50TmFtZTogJycsXG4gICAgZGF0YTogIGBcbiAgICBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnkncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciBvb2sgYSBnYWxsZXkgb2YgdHlwZVxuICAgIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2UgbnR1cmllcywgYnV0IGFsc28gdGhlIGxlYXAgaW50byBlbGVjdHJvbmljXG4gICAgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1IGxhcmlzZWQgaW4gdGhlIDE5NjBzIHdpdGggdGhlIHJlbGVhc2Ugb2YgTGV0cmFzZXQgc2hlZXRzXG4gICAgY29udGFpbmluZ2BcbiAgfTtcbiAgdXNlckltYWdlcz86IEFycmF5PGFueT4gPSBbXTtcbiAgZWRpdFZpc2libGU6IEJvb2xlYW4gPSBmYWxzZTtcbiAga2V5OiBOdW1iZXI7XG4gIHVwbG9hZFBhbmVsRmxhZzogQm9vbGVhbiA9IHRydWU7XG4gIGltYWdlTmFtZUxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY29uZmlnOiBhbnk7XG4gIHRlbXBJbWFnZXM6IEFycmF5PGFueT47XG4gIGlzVGVzdEFPcGVuZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZWRpYVNlcnZpY2U6IFNlbU1lZGlhU2VydmljZSwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCd3aWRnZXQnKTtcbiAgICBpZih0aGlzLndpZGdldC5jb21wb25lbnROYW1lID09PSAnU2VtTWVkaWFDb250YWluZXJDb21wb25lbnQnKSB7XG4gICAgICBjb25zb2xlLmxvZygnR290IHRoZSB3eXNpd3lnIGRhdGEnLCB0aGlzLndpZGdldCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5zdWJzY3JpYmUoYWxsSW1hZ2VzID0+IHtcbiAgICAgIGxldCBlZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0ID0gW107XG4gICAgICB0aGlzLnVzZXJJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGFsbEltYWdlcykge1xuICAgICAgICBlZGl0TW9kZSA9IGVkaXRNb2RlIHx8IGltYWdlLmVkaXRNb2RlO1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QucHVzaChpbWFnZS5maWxlTmFtZSk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5lZGl0VmlzaWJsZSA9IGVkaXRNb2RlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmltYWdlQ29uZmlnQ2hhbmdlcy5zdWJzY3JpYmUoY29uZmlnID0+IHtcbiAgICAgIHRoaXMuY29uZmlnID0gXy5jbG9uZURlZXAoY29uZmlnKTtcbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuaW1hZ2VMb2FkQ2hhbmdlcy5zdWJzY3JpYmUoYWxsSW1hZ2VzID0+IHtcbiAgICAgIHRoaXMudGVtcEltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdCA9IFtdO1xuICAgICAgdGhpcy51c2VySW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgZm9yIChjb25zdCBpbWFnZSBvZiBhbGxJbWFnZXMpIHtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0LnB1c2goaW1hZ2UuZmlsZU5hbWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5rZXkgPSBhbGxJbWFnZXMubGVuZ3RoIC0gMTtcbiAgICAgIHRoaXMuZWRpdFZpc2libGUgPSBmYWxzZTtcbiAgICAgIGlmIChhbGxJbWFnZXMubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS50ZW1wQ2hhbmdlcy5zdWJzY3JpYmUoYWxsSW1hZ2VzID0+IHtcbiAgICAgIHRoaXMudGVtcEltYWdlcyA9IGFsbEltYWdlcztcbiAgICB9KTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICB1cGxvYWRlZEltYWdlKGltYWdlOiBGaWxlKSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLnB1dEltYWdlKGltYWdlKTtcbiAgfVxuICBvbkVuYWJsZUVkaXRJbWFnZShpbmRleCkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkVkaXRFbmFibGUoaW5kZXgpO1xuICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gdHJ1ZTtcbiAgICB0aGlzLmtleSA9IGluZGV4O1xuICB9XG4gIG9uRWRpdEltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5rZXkgPSBpbmRleDtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0RW5hYmxlKGluZGV4KTtcbiAgfVxuICBvbkRlbGV0ZUltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRGVsZXRlSW1hZ2UoaW5kZXgpO1xuICB9XG4gIG9uTWVudShtb2RlKSB7XG4gICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICBjYXNlICdJTUFHRVMnOlxuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRFVQTElDQVRFJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdTRVRUSU5HUyc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnREVMRVRFJzpcbiAgICAgICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmNsZWFySW1hZ2VzKCk7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBvbkNoYW5nZWRGb3JtKGZvcm1EYXRhOiBhbnkpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuZm9ybUNoYW5nZWQodGhpcy5rZXksIGZvcm1EYXRhKTtcbiAgfVxuICBvbkNoYW5nZWRFZGl0TW9kZShtb2RlOiBzdHJpbmcpIHtcbiAgICBpZiAobW9kZSA9PT0gJ0FQUExZJykge1xuICAgICAgLy8gdGhpcy5lZGl0VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMuaW1hZ2VOYW1lTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkVkaXRJbWFnZSh0aGlzLmtleSwgbW9kZSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmNsZWFyQ29uZmlnKHRoaXMua2V5KTtcbiAgfVxuICBvbkNyb3BwZWRJbWFnZShpbmRleCwgY3JvcHBlZEltYWdlKSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLnB1dENyb3BwZWRJbWFnZShpbmRleCwgY3JvcHBlZEltYWdlKTtcbiAgfVxuICBvcGVuVGVzdEEoaXNPcGVuZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmlzVGVzdEFPcGVuZWQgPSBpc09wZW5lZDtcbiAgfVxuICBjcm9wcGVkSW1hZ2UoaXRlbSl7XG4gICAgY29uc29sZS5sb2coJ25vdCBzdXJlJywgaXRlbSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFNlbVVpQnV0dG9uTW9kdWxlLFxuICBTZW1VaUJ1dHRvbkZhYk1vZHVsZSxcbiAgU2VtVWlPdmVybGF5RGlhbG9nTW9kdWxlLFxuICBTZW1VaVRhYnNNb2R1bGUsXG4gIFNlbVVpVGh1bWJuYWlsTGFyZ2VNb2R1bGVcbn0gZnJvbSAnQGZyb250ci9zZW0tdWknO1xuXG5jb25zdCBVaVNoYXJlZE1vZHVsZXMgPSBbXG4gIFNlbVVpQnV0dG9uTW9kdWxlLFxuICBTZW1VaUJ1dHRvbkZhYk1vZHVsZSxcbiAgU2VtVWlPdmVybGF5RGlhbG9nTW9kdWxlLFxuICBTZW1VaVRhYnNNb2R1bGUsXG4gIFNlbVVpVGh1bWJuYWlsTGFyZ2VNb2R1bGVcbl1cblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogWy4uLlVpU2hhcmVkTW9kdWxlc11cbn0pXG5leHBvcnQgY2xhc3MgU2VtVWlLaXRTaGFyZWRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgT2JzZXJ2ZXJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IFNjcm9sbERpc3BhdGNoTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBDZGtTdGVwcGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3N0ZXBwZXInO1xuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5jb25zdCBNQVRFUklBTF9NT0RVTEVTID0gW1xuICAvLyBDREtcbiAgQTExeU1vZHVsZSxcbiAgQmlkaU1vZHVsZSxcbiAgT2JzZXJ2ZXJzTW9kdWxlLFxuICBPdmVybGF5TW9kdWxlLFxuICBQbGF0Zm9ybU1vZHVsZSxcbiAgUG9ydGFsTW9kdWxlLFxuICBTY3JvbGxEaXNwYXRjaE1vZHVsZSxcbiAgQ2RrU3RlcHBlck1vZHVsZSxcbiAgQ2RrVGFibGVNb2R1bGUsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbLi4uTUFURVJJQUxfTU9EVUxFU11cbn0pXG5leHBvcnQgY2xhc3MgU2VtTWF0ZXJpYWxTaGFyZWRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQFBpcGUoe1xuICBuYW1lOiAneW91dHViZVNhZmVVcmwnXG59KVxuZXhwb3J0IGNsYXNzIFlvdXR1YmVTYWZlVXJsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpe1xuXG4gIH1cblxuICB0cmFuc2Zvcm0odmlkZW9JZDogc3RyaW5nKTogU2FmZVJlc291cmNlVXJsIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKFxuICAgICAgYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dmlkZW9JZH0/YXV0b3BsYXk9MWApO1xuICB9XG5cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgWW91dHViZVZpZGVvTW9kZWwge1xuICAgIHZpZGVvSWQ6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHRodW1ibmFpbFVybDogc3RyaW5nO1xuICAgIGNoYW5uZWxUaXRsZTogc3RyaW5nO1xuICAgIGNoYW5uZWxJZDogc3RyaW5nO1xuICAgIHB1Ymxpc2hlZEF0Pzogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG5leHBvcnQgY2xhc3MgVmlkZW9Nb2RlbCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB2aWRlb0lkOiBzdHJpbmcsXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXG4gICAgcHVibGljIHRodW1ibmFpbFVybDogc3RyaW5nLFxuICAgIHB1YmxpYyBjaGFubmVsVGl0bGU6IHN0cmluZyxcbiAgICBwdWJsaWMgY2hhbm5lbElkOiBzdHJpbmcsXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZGVvSWQgPSB2aWRlb0lkO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLnRodW1ibmFpbFVybCA9IHRodW1ibmFpbFVybDtcbiAgICB0aGlzLmNoYW5uZWxUaXRsZSA9IGNoYW5uZWxUaXRsZTtcbiAgICB0aGlzLmNoYW5uZWxJZCA9IGNoYW5uZWxJZDtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaWRlb01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzLyc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSW5zdGFuY2UgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBTZW1WaWRlb1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tdmlkZW8uc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yLFxuICBzZWxlY3RvcjogJ3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWhlYWRlclwiPlxuICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIj48L3NwYW4+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1ib2R5X3NwYWNlZFwiPlxuICA8ZGl2IHNlbXVpLXRhYnMgI3RhYnNWZXJ0aWNhbCBbc2hvd1RhYnNdPVwidHJ1ZVwiIFt2ZXJ0aWNhbF09XCJ0cnVlXCIgPlxuICAgIDxkaXYgc2VtdWktdGFiICN0YWJzVjEgW3RpdGxlXT1cIidWaWRlbyBVcmwnXCI+XG4gICAgICA8ZGl2IHNlbXVpLXNlY3Rpb24tYm9keT5cbiAgICAgICAgVGFiIDEgY29udGVudFxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBzZW11aS10YWIgI3RhYnNWMiBbdGl0bGVdPVwiJ1NlYXJjaCdcIj5cbiAgICAgIDxicj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZW0tdmlkZW8tY29udGFpbmVyXCI+XG4gICAgICAgICAgPCEtLSBTZWN0aW9uIEJvZHkgLS0+XG4gICAgICAgICAgPGRpdiBzZW11aS1zZWN0aW9uLWJvZHk+XG4gICAgICAgICAgICA8IS0tIFNlYXJjaCAtLT5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPCEtLSBZb3VUdWJlIFNlYXJjaCAtLT5cbiAgICAgICAgICAgICAgICA8bGFiZWw+U2VhcmNoIFlvdXR1YmU8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtcHJlZml4XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXNlYXJjaCBwcmVmaXhcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNlbS1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgIGlkPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgICAgICAgKGtleXVwKT1cInNlYXJjaCh0ZXh0Qm94LnZhbHVlKVwiXG4gICAgICAgICAgICAgICAgICAgICAjdGV4dEJveFxuICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gIGZpZWxkLXByZWZpeCBjbGFzcz1cImljb24gaWNvbi1zZWFyY2ggcHJlZml4XCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c1wiPlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInJlc3VsdHMubGVuZ3RoID09IDBcIiBjbGFzcz1cInNlbS12aWRlby1jb250YWluZXItLXJlc3VsdHNfaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBzZW11aS10aHVtYm5haWwgY2xhc3M9XCJwdDJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS12aWRlby1jb250YWluZXItLXJlc3VsdHNfcHJldmlld1wiIGNhcmQtaW1hZ2U+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlnY2FwdGlvbiBzZW0tc2VjdGlvbi1mb290ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZ2NhcHRpb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInByaW1hcnktY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN1Yi1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmlnY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgcmVzdWx0cyB8IHBhZ2luYXRlOiBjb25maWdcIiBjbGFzcz1cInNlbS12aWRlby1jb250YWluZXItLXJlc3VsdHNfaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIHNlbXVpLXRodW1ibmFpbCBjbGFzcz1cInB0MlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c19wcmV2aWV3XCIgY2FyZC1pbWFnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyAqbmdJZj1cIml0ZW0udGh1bWJuYWlsVXJsXCIgW3NyY109XCJpdGVtLnRodW1ibmFpbFVybFwiICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZmlnY2FwdGlvbiBzZW0tc2VjdGlvbi1mb290ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlnY2FwdGlvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LWNhcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgaXRlbS50aXRsZX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzdWItY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgaXRlbS5wdWJsaXNoZWRBdH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIiByZWxhdGl2ZSBzZW0tYnV0dG9uLS0gc2VtLWJ1dHRvbiBzZW0tYnV0dG9uLS1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkLXNldHRpbmctYnV0dG9uIChjbGljayk9XCJhZGRWaWRlbyhpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGQgdGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08YnV0dG9uLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLXNlbS1idG4tZmFiLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLWNvcm5lcj1cIm5vbmVcIi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1zZW11aS10aGVtZT1cImxpZ2h0XCItLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tc2VtLWltcG9ydGFuY2U9XCJkZWZhdWx0XCItLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tY2FyZC1zZXR0aW5nLWJ1dHRvbiAoY2xpY2spPVwibG9hZFNldHRpbmdzKClcIi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tJmd0Oy0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08c3BhbiBjbGFzcz1cInNlbS1pY29uLWVsbGlwc2VcIj48L3NwYW4+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08L2J1dHRvbj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZmlnY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8IS0tIFNlY3Rpb24gRm9vdGVyIC0tPlxuICAgICAgICAgIDxkaXYgc2VtdWktc2VjdGlvbi1mb290ZXI+XG4gICAgICAgICAgICAgIDxwYWdpbmF0aW9uLXRlbXBsYXRlXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJzZW0tcGFnaW5hdGlvbi1jb250YWluZXIgcHkyXCJcbiAgICAgICAgICAgICAgICAjcD1cInBhZ2luYXRpb25BcGlcIlxuICAgICAgICAgICAgICAgIFtpZF09XCJjb25maWcuaWRcIlxuICAgICAgICAgICAgICAgIChwYWdlQ2hhbmdlKT1cImNvbmZpZy5jdXJyZW50UGFnZSA9ICRldmVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZW0tcGFnaW5hdGlvbi1uYXZcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzZW0tcGFnaW5hdGlvbi1wcmV2aW91c1wiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwLmlzRmlyc3RQYWdlKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhcC5pc0ZpcnN0UGFnZSgpXCIgKGNsaWNrKT1cInAucHJldmlvdXMoKVwiPiA8IDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcGFnZSBvZiBwLnBhZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzZW0tcGFnaW5hdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwicC5nZXRDdXJyZW50KCkgPT09IHBhZ2UudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cInAuc2V0Q3VycmVudChwYWdlLnZhbHVlKVwiICpuZ0lmPVwicC5nZXRDdXJyZW50KCkgIT09IHBhZ2UudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBwYWdlLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInAuZ2V0Q3VycmVudCgpID09PSBwYWdlLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3sgcGFnZS5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNlbS1wYWdpbmF0aW9uLW5leHRcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicC5pc0xhc3RQYWdlKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhcC5pc0xhc3RQYWdlKClcIiAoY2xpY2spPVwicC5uZXh0KClcIj4gPiA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9wYWdpbmF0aW9uLXRlbXBsYXRlPlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbjwhLS08ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJlc3VsdHMgcmVzdWx0cyQgfCBhc3luYyB8IHBhZ2luYXRlOiBjb25maWdcIj4tLT5cbmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2ssOmhvc3R7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxe21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10MnttYXJnaW4tdG9wOjFyZW19Lm1yMnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxe3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAye3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4MntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4M3twYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleHtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0YXJ0e2FsaWduLWNvbnRlbnQ6ZmxleC1zdGFydH0uY29udGVudC1lbmR7YWxpZ24tY29udGVudDpmbGV4LWVuZH0uY29udGVudC1jZW50ZXJ7YWxpZ24tY29udGVudDpjZW50ZXJ9LmNvbnRlbnQtYmV0d2VlbnthbGlnbi1jb250ZW50OnNwYWNlLWJldHdlZW59LmNvbnRlbnQtYXJvdW5ke2FsaWduLWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0cmV0Y2h7YWxpZ24tY29udGVudDpzdHJldGNofS5mbGV4LWF1dG97ZmxleDoxIDEgYXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjB9LmZsZXgtbm9uZXtmbGV4Om5vbmV9Lm9yZGVyLTB7b3JkZXI6MH0ub3JkZXItMXtvcmRlcjoxfS5vcmRlci0ye29yZGVyOjJ9Lm9yZGVyLTN7b3JkZXI6M30ub3JkZXItbGFzdHtvcmRlcjo5OTk5OX0ucmVsYXRpdmV7cG9zaXRpb246cmVsYXRpdmV9LmFic29sdXRle3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTB7dG9wOjB9LnJpZ2h0LTB7cmlnaHQ6MH0uYm90dG9tLTB7Ym90dG9tOjB9LmxlZnQtMHtsZWZ0OjB9Lnoxe3otaW5kZXg6MX0uejJ7ei1pbmRleDoyfS56M3t6LWluZGV4OjN9Lno0e3otaW5kZXg6NH0uYm9yZGVye2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MXB4fS5ib3JkZXItdG9we2JvcmRlci10b3Atc3R5bGU6c29saWQ7Ym9yZGVyLXRvcC13aWR0aDoxcHh9LmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweH0uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5ib3JkZXItbGVmdHtib3JkZXItbGVmdC1zdHlsZTpzb2xpZDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmJvcmRlci1ub25le2JvcmRlcjowfS5yb3VuZGVke2JvcmRlci1yYWRpdXM6M3B4fS5jaXJjbGV7Ym9yZGVyLXJhZGl1czo1MCV9LnJvdW5kZWQtdG9we2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LnJvdW5kZWQtcmlnaHR7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0ucm91bmRlZC1ib3R0b217Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0ucm91bmRlZC1sZWZ0e2JvcmRlci1yYWRpdXM6M3B4IDAgMCAzcHh9Lm5vdC1yb3VuZGVke2JvcmRlci1yYWRpdXM6MH0uaGlkZXtwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7aGVpZ2h0OjFweDt3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpfUBtZWRpYSAobWF4LXdpZHRoOjQwZW0pey54cy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pIGFuZCAobWF4LXdpZHRoOjUyZW0pey5zbS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pIGFuZCAobWF4LXdpZHRoOjY0ZW0pey5tZC1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdHtiYWNrZ3JvdW5kOiNmZmZ9LnNlbS12aWRlby1jb250YWluZXJ7d2lkdGg6MjEwcHh9LnNlbS12aWRlby1jb250YWluZXItLXJlc3VsdHNfcHJldmlld3ttaW4taGVpZ2h0Ojk2cHg7ZGlzcGxheTpibG9jaztiYWNrZ3JvdW5kLWNvbG9yOiNkZWRlZGV9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9TZXR0aW5nc1BhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQE91dHB1dCgpIGNsb3NlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAvLyByZXN1bHRzOiBBcnJheTxZb3V0dWJlVmlkZW9Nb2RlbD47XG4gIHJlc3VsdHM6IEFycmF5PGFueT4gPSBbXTtcbiAgQElucHV0KCkgIGNvbmZpZztcbiAgcGFnZTogbnVtYmVyID0gMTtcbiAgLy8gdmlkZW9MaXN0OiBBcnJheTxhbnk+O1xuXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbG9hZFNldHRpbmdzKCl7fVxuICBzZWFyY2gocXVlcnkpIHtcbiAgICBjb25zb2xlLmxvZygncXVlcnknLCBxdWVyeSk7XG4gICAgdGhpcy5zZW1WaWRlb1NlcnZpY2UuZmV0Y2hWaWRlb3MocXVlcnkpLnN1YnNjcmliZSgoZGF0YTphbnkpID0+IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IGRhdGEuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFZpZGVvTW9kZWwoXG4gICAgICAgICAgaXRlbS5pZC52aWRlb0lkLFxuICAgICAgICAgIGl0ZW0uc25pcHBldC50aXRsZSxcbiAgICAgICAgICBpdGVtLnNuaXBwZXQudGh1bWJuYWlscy5oaWdoLnVybCxcbiAgICAgICAgICBpdGVtLnNuaXBwZXQuY2hhbm5lbFRpdGxlLFxuICAgICAgICAgIGl0ZW0uc25pcHBldC5jaGFubmVsSWQsXG4gICAgICAgICAgaXRlbS5zbmlwcGV0LmRlc2NyaXB0aW9uKVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB3b3JrZWQocXVlcnkpe1xuICAgIGNvbnNvbGUubG9nKCdxdWVyeScsIHF1ZXJ5KTtcbiAgfVxuICAvLyBAT3V0cHV0KClcbiAgLy8gc2VhcmNoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VtVmlkZW9TZXJ2aWNlOiBTZW1WaWRlb1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge31cblxuICBhZGRWaWRlbyhpdGVtKXtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQoaXRlbSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgLCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWW91dHViZVZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tdmlkZW8tY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cImVtYmVkLWNvbnRhaW5lclwiICpuZ0lmPVwid2lkZ2V0LmRhdGEuaGFzT3duUHJvcGVydHkoJ3ZpZGVvSWQnKVwiPlxuICAgIDxpZnJhbWUgd2lkdGg9XCIxMDAlXCJcbiAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICBmcmFtZWJvcmRlcj1cIjBcIlxuICAgIGFsbG93ZnVsbHNjcmVlblxuICAgIFtzcmNdPVwid2lkZ2V0LmRhdGEudmlkZW9JZCB8IHlvdXR1YmVTYWZlVXJsXCJcbiAgICBzdHlsZT1cImJvcmRlcjogc29saWQgMXB4IGJsYWNrXCIgPlxuICAgIDwvaWZyYW1lPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyLS1uYXZcIj5cbiAgICA8YnV0dG9uXG4gICAgICBzZW0tYnRuLWZhYlxuICAgICAgY29ybmVyPVwidG9wLXJpZ2h0XCJcbiAgICAgIHNlbXVpLXRoZW1lPVwibGlnaHRcIlxuICAgICAgY2xhc3M9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIFwiXG4gICAgICBzZW0taW1wb3J0YW5jZT1cInNlY29uZGFyeVwiXG4gICAgICAjY2hhdE92ZXJsYXk9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAgIChjbGljayk9XCJvcGVuVGVzdEEoIWlzVGVzdEFPcGVuZWQpXCJcbiAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcHJvZmlsZS1hY2NlbnRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRoMVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInBhdGgyXCI+PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPHNlbXVpLW92ZXJsYXktZGlhbG9nXG4gICAgICBbb3ZlcmxheU9yaWdpbl09XCJjaGF0T3ZlcmxheVwiXG4gICAgICBbaXNPcGVuZWRdPVwiaXNUZXN0QU9wZW5lZFwiXG4gICAgICAoY2xvc2UpPVwib3BlblRlc3RBKGZhbHNlKVwiXG4gICAgICAob3Blbik9XCJvcGVuVGVzdEEodHJ1ZSlcIlxuICAgICAgW292ZXJsYXlXaWR0aF09XCInYXV0bydcIlxuICAgID5cbiAgICAgICAgPHNlbS12aWRlby1zZXR0aW5ncy1wYW5lbFxuICAgICAgICAgIFtjb25maWddPVwicGFnaW5hdGlvbkNvbmZpZ1wiXG4gICAgICAgICAgKHNlbGVjdGVkKT1cInNlbGVjdGVkSXRlbSgkZXZlbnQpXCJcbiAgICAgICAgICAoY2xvc2UpPVwiY2xvc2VPdmVybGF5KCRldmVudClcIj5cbiAgICAgICAgPC9zZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWw+XG5cbiAgICA8L3NlbXVpLW92ZXJsYXktZGlhbG9nPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e2JhY2tncm91bmQtY29sb3I6I2Y1ZTVlNTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgIzhiMDAwMDtoZWlnaHQ6MTAwJX0uZW1iZWQtY29udGFpbmVye2hlaWdodDoxMDB2aH1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyB3aWRnZXQgPSB7XG4gICAgY29tcG9uZW50TmFtZTogJycsXG4gICAgZGF0YToge1xuICAgICAgICBjaGFubmVsSWQ6ICdVQzRybEFWZ0FLMFNHay15VGZlNDhRcHcnLFxuICAgICAgICBjaGFubmVsVGl0bGU6ICdCUklHSFQgU0lERScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSG93IHRvIFN0YXkgSGVhbHRoeS4gV2UgYWxsIGhhdmUgZGF5cyB3aGVuIHdlIGZlZWwgYWJzb2x1dGVseSBleGhhdXN0ZWQgb3Igc29tZXRpbWVzIGEgbGl0dGxlIGRvd24gaW4gdGhlIGR1bXBzLiBCdXQgaWYgeW91IGZpbmQgeW91cnNlbGYgY29uc3RhbnRseSBjYXRjaGluZyAuLi4nLFxuICAgICAgICB0aHVtYm5haWxVcmw6ICdodHRwczovL2kueXRpbWcuY29tL3ZpL2t5b1MxZWRZNXRNL2hxZGVmYXVsdC5qcGcnLFxuICAgICAgICB0aXRsZTogJzEwIFdhcm5pbmcgU2lnbnMgWW91IEhhdmUgVml0YW1pbiBEIERlZmljaWVuY3knLFxuICAgICAgICB2aWRlb0lkOiAna3lvUzFlZFk1dE0nXG4gICAgICB9XG4gIH07XG5cblxuICBwdWJsaWMgaXNPcGVuZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBpc1Rlc3RBT3BlbmVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCd3aWRnZXQnKTtcbiAgICBpZih0aGlzLndpZGdldC5jb21wb25lbnROYW1lID09PSAnU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQnKSB7XG4gICAgICBjb25zb2xlLmxvZygnR290IHRoZSB3eXNpd3lnIGRhdGEnLCB0aGlzLndpZGdldCk7XG4gICAgfVxuICB9XG4gIHBhZ2luYXRpb25Db25maWc6IFBhZ2luYXRpb25JbnN0YW5jZSA9IHtcbiAgICBpZDogJ2N1c3RvbScsXG4gICAgaXRlbXNQZXJQYWdlOiAyLFxuICAgIGN1cnJlbnRQYWdlOiAxXG4gIH07XG4gIHNlYXJjaChxdWVyeSk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdxdWVyeSBpcyBvdXRwdXRlZCcsIHF1ZXJ5KVxuICB9XG5cbiAgc2VsZWN0ZWRJdGVtKGl0ZW0pOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnaXRlbSBzZWxlY3QnLCBpdGVtKVxuICAgIHRoaXMud2lkZ2V0LmRhdGEgPSBpdGVtO1xuICB9XG4gIG5nT25Jbml0KCkge31cbiAgY2xvc2VPdmVybGF5KGl0ZW0pOiB2b2lkIHt9XG5cbiAgb3BlblRlc3RBKGlzT3BlbmVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gaXNPcGVuZWQ7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQge1xuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1zTW9kdWxlLFxuICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU2VtTWVkaWFQYW5lbFNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS1tZWRpYS1wYW5lbC9zZW0tbWVkaWEtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1pbWFnZS11cGxvYWQvbWVkaWEtdXBsb2FkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1Dcm9wcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21lZGlhLWNyb3BwZXIvbWVkaWEtY3JvcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtQ29udHJvbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtY29udHJvbHMvbWVkaWEtY29udHJvbHMuY29tcG5lbnQnO1xuaW1wb3J0IHsgU2xpZGVQYW5lbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zbGlkZS1wYW5lbC9zbGlkZS1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXR0aW5nc0NvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9zZW0tbWVkaWEtc2V0dGluZ3Mvc2VtLW1lZGlhLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWRpYUVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtZWRpdC9tZWRpYS1lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9zZW0tbWVkaWEtY29udGFpbmVyL3NlbS1tZWRpYS1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbVVpS2l0U2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zZW0tdWktc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBTZW1NYXRlcmlhbFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2VtLW1hdGVyaWFsLXNoYXJlZC5tb2R1bGUnO1xuXG5pbXBvcnQgeyBJbWFnZUNyb3BwZXJNb2R1bGUgfSBmcm9tICduZ3gtaW1hZ2UtY3JvcHBlcic7XG5pbXBvcnQgeyBGaWxlRHJvcE1vZHVsZSB9IGZyb20gJ25neC1maWxlLWRyb3AnO1xuaW1wb3J0IHsgQW5ndWxhckNyb3BwZXJqc01vZHVsZSB9IGZyb20gJ2FuZ3VsYXItY3JvcHBlcmpzJztcblxuaW1wb3J0IHsgTmd4UGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IFlvdXR1YmVTYWZlVXJsUGlwZSB9IGZyb20gJy4vc2FmZS11cmwucGlwZSc7XG5cbmltcG9ydCB7IFNlbVZpZGVvU2V0dGluZ3NQYW5lbENvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9zZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWwvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9zZW0tdmlkZW8tY29udGFpbmVyL3NlbS12aWRlby1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbVZpZGVvU2VydmljZSB9IGZyb20gJy4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi9zZW0tbWVkaWEuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIE5neFBhZ2luYXRpb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBJbWFnZUNyb3BwZXJNb2R1bGUsXG4gICAgRmlsZURyb3BNb2R1bGUsXG4gICAgQW5ndWxhckNyb3BwZXJqc01vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBTZW1NYXRlcmlhbFNoYXJlZE1vZHVsZSxcbiAgICBTZW1VaUtpdFNoYXJlZE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTZW1NZWRpYVBhbmVsU2V0dGluZ3NDb21wb25lbnQsXG4gICAgU2VtVXBsb2FkQ29tcG9uZW50LFxuICAgIFNlbUNyb3BwZXJDb21wb25lbnQsXG4gICAgU2VtQ29udHJvbHNDb21wb25lbnQsXG4gICAgU2VtTWVkaWFTZXR0aW5nc0NvbXBvbmVudCxcbiAgICBNZWRpYUVkaXRDb21wb25lbnQsXG4gICAgU2xpZGVQYW5lbENvbXBvbmVudCxcbiAgICBTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBZb3V0dWJlU2FmZVVybFBpcGUsXG4gICAgU2VtVmlkZW9TZXR0aW5nc1BhbmVsQ29tcG9uZW50LFxuICAgIFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU2VtTWVkaWFQYW5lbFNldHRpbmdzQ29tcG9uZW50LFxuICAgIFNlbVVwbG9hZENvbXBvbmVudCxcbiAgICBTZW1Dcm9wcGVyQ29tcG9uZW50LFxuICAgIFNlbUNvbnRyb2xzQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhU2V0dGluZ3NDb21wb25lbnQsXG4gICAgTWVkaWFFZGl0Q29tcG9uZW50LFxuICAgIFNsaWRlUGFuZWxDb21wb25lbnQsXG4gICAgU2VtTWVkaWFDb250YWluZXJDb21wb25lbnQsXG4gICAgU2VtVmlkZW9TZXR0aW5nc1BhbmVsQ29tcG9uZW50LFxuICAgIFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNlbU1lZGlhU2VydmljZSxcbiAgICBTZW1WaWRlb1NlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU2VtTWVkaWFNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtTZW1NZWRpYVNlcnZpY2UsIFNlbVZpZGVvU2VydmljZV1cbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJfLmNsb25lRGVlcCIsInRzbGliXzEuX192YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFnQkUseUJBQW1CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBUC9CLGNBQVMsR0FBdUIsRUFBRSxDQUFDO1FBQ25DLGNBQVMsc0JBQWUsRUFBRSxFQUFPLENBQUM7UUFDM0IsMEJBQXFCLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7UUFDekQscUJBQWdCLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7UUFDcEQsdUJBQWtCLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7UUFDdEQsZ0JBQVcsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUdwRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLO1lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRztZQUMxQixPQUFPLEVBQUUsRUFBRTtZQUNYLFNBQVMsRUFBRSxFQUFFO1lBQ2IsTUFBTSxFQUFFO2dCQUNOLEdBQUcsRUFBRSxLQUFLO2dCQUNWLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxDQUFDO2dCQUNQLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2I7U0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZ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