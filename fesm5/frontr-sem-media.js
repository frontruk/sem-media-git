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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRyLXNlbS1tZWRpYS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS1tZWRpYS5zZXJ2aWNlLnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvc2VtLXZpZGVvLnNlcnZpY2UudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS1tZWRpYS1wYW5lbC9zZW0tbWVkaWEtcGFuZWwuY29tcG9uZW50LnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvY29tcG9uZW50cy9tZWRpYS1pbWFnZS11cGxvYWQvbWVkaWEtdXBsb2FkLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbXBvbmVudHMvbWVkaWEtY3JvcHBlci9tZWRpYS1jcm9wcGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbXBvbmVudHMvbWVkaWEtY29udHJvbHMvbWVkaWEtY29udHJvbHMuY29tcG5lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb21wb25lbnRzL3NsaWRlLXBhbmVsL3NsaWRlLXBhbmVsLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXNldHRpbmdzL3NlbS1tZWRpYS1zZXR0aW5ncy5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb21wb25lbnRzL21lZGlhLWVkaXQvbWVkaWEtZWRpdC5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9zZW0tdWktc2hhcmVkLm1vZHVsZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS1tYXRlcmlhbC1zaGFyZWQubW9kdWxlLnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvc2FmZS11cmwucGlwZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL21vZGVscy92aWRlby50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbnRhaW5lcnMvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsL3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbC5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9zZW0tbWVkaWEubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW1hZ2VNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2ltYWdlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2VtTWVkaWFTZXJ2aWNlIHtcbiAgYWxsSW1hZ2VzPzogQXJyYXk8SW1hZ2VNb2RlbD4gPSBbXTtcbiAgdGVtcEltYWdlOiBJbWFnZU1vZGVsID0ge30gYXMgYW55O1xuICBwdWJsaWMgaW1hZ2VDb21wb25lbnRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBpbWFnZUxvYWRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBpbWFnZUNvbmZpZ0NoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIHRlbXBDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMudGVtcEltYWdlLmVkaXRNb2RlID0gZmFsc2UsXG4gICAgdGhpcy50ZW1wSW1hZ2UuZmlsZU5hbWUgPSAnJztcbiAgICB0aGlzLnRlbXBJbWFnZS5jb250cm9sQm94ID0ge1xuICAgICAgYWxsVGV4dDogJycsXG4gICAgICBtZXRhVGl0bGU6ICcnLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGZpdDogZmFsc2UsXG4gICAgICAgIGNyb3A6IGZhbHNlLFxuICAgICAgICB6b29tOiAwLFxuICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgIGFwcGx5OiBmYWxzZSxcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMudGVtcEltYWdlLmNyb3BwZWRJbWFnZSA9ICcnO1xuICAgIHRoaXMudGVtcEltYWdlLnVwbG9hZGVkSW1hZ2UgPSAnJztcbiAgfVxuICBwdWJsaWMgb25Mb2FkRW5kKGV2ZW50LCBmaWxlTmFtZSkge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2UuZmlsZU5hbWUgPSBmaWxlTmFtZTtcbiAgICAgIHRoaXMudGVtcEltYWdlLnVwbG9hZGVkSW1hZ2UgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgLy8gdGhpcy5kaXNhYmxlQWxsSW1hZ2VFZGl0KCk7XG4gICAgICB0aGlzLmFsbEltYWdlcy5wdXNoKF8uY2xvbmVEZWVwKHRoaXMudGVtcEltYWdlKSk7XG4gICAgICB0aGlzLmltYWdlTG9hZENoYW5nZXMubmV4dChfLmNsb25lRGVlcCh0aGlzLmFsbEltYWdlcykpO1xuICAgIH0pO1xuICB9XG4gIHB1dEltYWdlKGltYWdlOiBGaWxlKSB7XG4gICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZmlsZVJlYWRlci5vbmxvYWRlbmQgPSAoZSkgPT4gdGhpcy5vbkxvYWRFbmQoZSwgaW1hZ2UubmFtZSk7XG4gICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGltYWdlKTtcbiAgfVxuICBwdXRDcm9wcGVkSW1hZ2Uoa2V5OiBudW1iZXIsIGNyb3BwZWRJbWFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5hbGxJbWFnZXNba2V5XS5jcm9wcGVkSW1hZ2UgPSBjcm9wcGVkSW1hZ2U7XG4gICAgdGhpcy5hbGxJbWFnZXNba2V5XS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBkaXNhYmxlQWxsSW1hZ2VFZGl0KCkge1xuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHRoaXMuYWxsSW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFsbEltYWdlc1tpXS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3JtQ2hhbmdlZChpbmRleCwgZm9ybURhdGEpIHtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5hbGxUZXh0ID0gZm9ybURhdGEuYWxsVGV4dDtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5tZXRhVGl0bGUgPSBmb3JtRGF0YS5tZXRhVGl0bGU7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbiAgb25FZGl0SW1hZ2UoaW5kZXgsIG1vZGUpIHtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgJ0ZJVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5maXQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0NST1AnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuY3JvcCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnWk9PTV9JTic6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy56b29tID0gMC4xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1pPT01fT1VUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnpvb20gPSAtMC4xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1JPVEFURV9MRUZUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnJvdGF0ZSA9IDkwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1JPVEFURV9SSUdIVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5yb3RhdGUgPSAtOTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQVBQTFknOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuYXBwbHkgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLmFsbEltYWdlc1tpbmRleF0uZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuaW1hZ2VDb25maWdDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgLy8gdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuYWxsSW1hZ2VzKSk7XG4gIH1cbiAgb25FZGl0RW5hYmxlKGluZGV4KSB7XG4gICAgdGhpcy5hbGxJbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGkpID0+IHtcbiAgICAgIGlmIChpbmRleCA9PT0gaSkge1xuICAgICAgICBpbWFnZS5lZGl0TW9kZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWFnZS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBjbGVhckNvbmZpZyhpbmRleCkge1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5maXQgPSBmYWxzZTtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuY3JvcCA9IGZhbHNlO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5yb3RhdGUgPSAwO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy56b29tID0gMDtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuYXBwbHkgPSBmYWxzZTtcbiAgfVxuICBvbkRlbGV0ZUltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5hbGxJbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBjbGVhckltYWdlcygpIHtcbiAgICB0aGlzLmFsbEltYWdlcyA9IFtdO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvciggQEluamVjdChIdHRwQ2xpZW50KSBwcm90ZWN0ZWQgcmVhZG9ubHkgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChQTEFURk9STV9JRCkgcHVibGljIHBsYXRmb3JtSWQ6IE9iamVjdCkgeyB9XG5cbiAgcHVibGljIGZldGNoVmlkZW9zKHF1ZXJ5OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQoYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvc2VhcmNoP3BhcnQ9c25pcHBldCZtYXhSZXN1bHRzPTUmcT0ke3F1ZXJ5fVxuICAgICAgICAmdHlwZT12aWRlb1xuICAgICAgICAma2V5PUFJemFTeUNWWXpyQm0xbHpsOWladE5Bcnhsd1J5bTFMblVkUXBQc2ApO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LFxuICBPbkNoYW5nZXMsIEluamVjdCwgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUFycmF5LCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1wYW5lbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWhlYWRlclwiPlxuICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIiAoY2xpY2spPVwic2hvd1VwbG9hZEV2ZW50LmVtaXQoKVwiPjwvc3Bhbj5cbjwvZGl2PlxuPCEtLSBVcGxvYWQgTW9kZSAtLT5cbjxzZW0tdXBsb2FkICpuZ0lmPVwiIWVkaXRWaXNpYmxlXCIgKGRvbmVJbWFnZSk9XCJvbkltYWdlTG9hZGVkKCRldmVudClcIj48L3NlbS11cGxvYWQ+XG48IS0tIEVkaXQgTW9kZSAtLT5cbjxzZW0tbWVkaWEtZWRpdFxuICAqbmdJZj1cImVkaXRWaXNpYmxlXCJcbiAgKHNlbGVjdGVkRWRpdE1vZGUpPVwib25DaGFuZ2VkTW9kZSgkZXZlbnQpXCJcbiAgKGZvcm1DaGFuZ2VkKT1cIm9uQ2hhbmdlZEZvcm0oJGV2ZW50KVwiXG4gIFtmb3JtRGF0YV09XCJteUZvcm1cIlxuPjwvc2VtLW1lZGlhLWVkaXQ+XG48ZGl2ICpuZ0lmPVwiIWVkaXRWaXNpYmxlXCI+XG4gIDxkaXZcbiAgICAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VOYW1lTGlzdDsgbGV0IGkgPSBpbmRleFwiXG4gICAgY2xhc3M9XCJwMiBmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWltYWdlIGFsaWduLW1pZGRsZVwiPjwvc3Bhbj5cbiAgICAgIHt7aW1hZ2V9fVxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXN0eWxlIHB4MVwiIChjbGljayk9XCJvbkVkaXQoaSlcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWRlbGV0ZVwiIChjbGljayk9XCJvbkRlbGV0ZShpKVwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2t7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxe21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10Miw6aG9zdCAuaW1nLWNyb3BwZXJ7bWFyZ2luLXRvcDoxcmVtfS5tcjIsOmhvc3QgLmltZy1jcm9wcGVye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTF7cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDIsOmhvc3QgZm9ybXtwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDN7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZle3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZSw6aG9zdCAuaW1nLWNyb3BwZXJ7cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMCw6aG9zdCAuaW1nLWNyb3BwZXJ7dG9wOjB9LnJpZ2h0LTAsOmhvc3QgLmltZy1jcm9wcGVye3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3QgLmltZy1jcm9wcGVye3dpZHRoOjY1MHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhUGFuZWxTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLy8gUGxlYXNlIGdldCB0aGVzZSBvdXRwdXRzIHdvcmtpbmdcbiAgQE91dHB1dCgpIGNyb3BwZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHVwbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBlZGl0SW1hZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGRlbGV0ZUltYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2VkRm9ybSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY2hhbmdlZEVkaXRNb2RlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzaG93VXBsb2FkRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHVibGljIG15Rm9ybTogYW55ID0ge307XG4gIHB1YmxpYyBpbWFnZUxpc3Q6IEFycmF5PGFueT4gPSBbXTtcbiAgcHVibGljIHZpc2libGVDb250cm9sUGFuZWw6IEJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBlZGl0VmlzaWJsZTogQm9vbGVhbjtcbiAgQElucHV0KCkga2V5OiBudW1iZXI7XG4gIEBJbnB1dCgpIGltYWdlTmFtZUxpc3Q6IEFycmF5PHN0cmluZz47XG4gIEBJbnB1dCgpIHVzZXJJbWFnZXM6IEFycmF5PGFueT47XG5cbiAgY29uc3RydWN0b3IoIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZDogYW55KSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy52aXNpYmxlQ29udHJvbFBhbmVsID0gdGhpcy5lZGl0VmlzaWJsZTtcbiAgICB9XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgaWYgKHRoaXMudXNlckltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0ZW1wID0ge1xuICAgICAgICBhbGxUZXh0OiB0aGlzLnVzZXJJbWFnZXNbdGhpcy5rZXldLmNvbnRyb2xCb3guYWxsVGV4dCxcbiAgICAgICAgbWV0YVRpdGxlOiB0aGlzLnVzZXJJbWFnZXNbdGhpcy5rZXldLmNvbnRyb2xCb3gubWV0YVRpdGxlXG4gICAgICB9O1xuICAgICAgdGhpcy5teUZvcm0gPSBfLmNsb25lRGVlcCh0ZW1wKTtcbiAgICB9XG4gIH1cbiAgb25JbWFnZUxvYWRlZChmaWxlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZpc2libGVDb250cm9sUGFuZWwgPSBmYWxzZTtcbiAgICB0aGlzLnVwbG9hZGVkLmVtaXQoZmlsZSk7XG4gIH1cbiAgb25DaGFuZ2VkTW9kZShtb2RlKSB7XG4gICAgdGhpcy5jaGFuZ2VkRWRpdE1vZGUuZW1pdChtb2RlKTtcbiAgfVxuICBvbkVkaXQoaW5kZXgpIHtcbiAgICB0aGlzLmVkaXRJbWFnZS5lbWl0KGluZGV4KTtcbiAgICB0aGlzLmtleSA9IGluZGV4O1xuICAgIHRoaXMudmlzaWJsZUNvbnRyb2xQYW5lbCA9IHRydWU7XG4gIH1cbiAgb25EZWxldGUoaW5kZXgpIHtcbiAgICB0aGlzLmRlbGV0ZUltYWdlLmVtaXQoaW5kZXgpO1xuICB9XG4gIG9uQ2hhbmdlZEZvcm0oZm9ybURhdGE6IGFueSkge1xuICAgIHRoaXMuY2hhbmdlZEZvcm0uZW1pdChmb3JtRGF0YSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBsb2FkRXZlbnQsIFVwbG9hZEZpbGUsIEZpbGVTeXN0ZW1GaWxlRW50cnksIEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeSB9IGZyb20gJ25neC1maWxlLWRyb3AnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tdXBsb2FkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+XG4gIDxkaXY+XG4gICAgPGZpbGUtZHJvcFxuICAgICAgaGVhZGVydGV4dD1cIkRyb3AgZmlsZXMgaGVyZVwiXG4gICAgICAob25GaWxlRHJvcCk9XCJkcm9wcGVkKCRldmVudClcIiBcbiAgICAgIChvbkZpbGVPdmVyKT1cImZpbGVPdmVyKCRldmVudClcIlxuICAgICAgKG9uRmlsZUxlYXZlKT1cImZpbGVMZWF2ZSgkZXZlbnQpXCJcbiAgICAgIGN1c3RvbXN0eWxlPVwiZHJvcC1hcmVhXCJcbiAgICA+PC9maWxlLWRyb3A+XG4gICAgPGxhYmVsIGZvcj1cImZpbGUtdXBsb2FkXCIgY2xhc3M9XCJ1cGxvYWQtYnRuXCI+XG4gICAgICBDaG9vc2UgZmlsZVxuICAgIDwvbGFiZWw+XG4gICAgPGlucHV0XG4gICAgICBpZD1cImZpbGUtdXBsb2FkXCJcbiAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgIChjaGFuZ2UpPVwiZmlsZUNoYW5nZUV2ZW50KCRldmVudClcIlxuICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICBtdWx0aXBsZT5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2NrLDpob3N0IC5jb250cm9se2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMSw6aG9zdCAuY29udHJvbHttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MSw6aG9zdCAuY29udHJvbCw6aG9zdCAudXBsb2FkLWJ0bntwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDIsOmhvc3QgLnVwbG9hZC1idG57cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDN7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZlLDpob3N0IC5jb250cm9se3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZSw6aG9zdCAuY29udHJvbCAubGFiZWwtaWNvbntwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3R7ZGlzcGxheTpibG9jaztwYWRkaW5nOjFyZW19Omhvc3QgaW5wdXRbdHlwZT1maWxlXXtkaXNwbGF5Om5vbmV9Omhvc3QgaW5wdXRbdHlwZT1jaGVja2JveF17ZGlzcGxheTpub25lfTpob3N0IC51cGxvYWQtYnRue2JhY2tncm91bmQ6IzA1ZGNiNjtjb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6MTJweCAxMnB4IDB9Omhvc3QgLmNvbnRyb2x7Y29sb3I6I2ZmZjt3aWR0aDoxMDAlO2JvcmRlci1yYWRpdXM6MTJweCAxMnB4IDA7YmFja2dyb3VuZC1jb2xvcjojNDQ0ZDYzfTpob3N0IC5jb250cm9sOmZvY3Vze291dGxpbmU6MH06aG9zdCAuY29udHJvbCAubGFiZWwtaWNvbnt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7bGVmdDoxZW19YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW1VcGxvYWRDb21wb25lbnQge1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgZG9uZUltYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIHZpc2libGVJbWFnZTogQm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZmlsZXM6IFVwbG9hZEZpbGVbXSA9IFtdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cblxuICBwdWJsaWMgbG9hZGVkSW1hZ2UoKSB7XG4gICAgdGhpcy52aXNpYmxlSW1hZ2UgPSB0cnVlO1xuICB9XG4gIHB1YmxpYyBkcm9wcGVkKGV2ZW50OiBVcGxvYWRFdmVudCkge1xuICAgIHRoaXMuZmlsZXMgPSBldmVudC5maWxlcztcblxuICAgIGZvciAoY29uc3QgZHJvcHBlZEZpbGUgb2YgZXZlbnQuZmlsZXMpIHtcblxuICAgICAgLy8gSXMgaXQgYSBmaWxlP1xuICAgICAgaWYgKGRyb3BwZWRGaWxlLmZpbGVFbnRyeS5pc0ZpbGUpIHtcbiAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gZHJvcHBlZEZpbGUuZmlsZUVudHJ5IGFzIEZpbGVTeXN0ZW1GaWxlRW50cnk7XG4gICAgICAgIGZpbGVFbnRyeS5maWxlKChmaWxlOiBGaWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5kb25lSW1hZ2UuZW1pdChmaWxlKTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAvLyBZb3UgY291bGQgdXBsb2FkIGl0IGxpa2UgdGhpczpcbiAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdsb2dvJywgZmlsZSwgcmVsYXRpdmVQYXRoKVxuXG4gICAgICAgICAgLy8gSGVhZGVyc1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgJ3NlY3VyaXR5LXRva2VuJzogJ215dG9rZW4nXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KCdodHRwczovL215YmFja2VuZC5jb20vYXBpL3VwbG9hZC9zYW5pdGl6ZS1hbmQtc2F2ZS1sb2dvJywgZm9ybURhdGEsIHsgaGVhZGVyczogaGVhZGVycywgcmVzcG9uc2VUeXBlOiAnYmxvYicgfSlcbiAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgLy8gU2FuaXRpemVkIGxvZ28gcmV0dXJuZWQgZnJvbSBiYWNrZW5kXG4gICAgICAgICAgfSlcbiAgICAgICAgICAqKi9cblxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0IHdhcyBhIGRpcmVjdG9yeSAoZW1wdHkgZGlyZWN0b3JpZXMgYXJlIGFkZGVkLCBvdGhlcndpc2Ugb25seSBmaWxlcylcbiAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gZHJvcHBlZEZpbGUuZmlsZUVudHJ5IGFzIEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZmlsZUNoYW5nZUV2ZW50KGV2ZW50KSB7XG4gICAgZm9yIChjb25zdCBjaG9zZW5GaWxlIG9mIGV2ZW50LnRhcmdldC5maWxlcykge1xuICAgICAgdGhpcy5kb25lSW1hZ2UuZW1pdChjaG9zZW5GaWxlKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIGZpbGVPdmVyKGV2ZW50KSB7XG4gIH1cblxuICBwdWJsaWMgZmlsZUxlYXZlKGV2ZW50KSB7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgT25DaGFuZ2VzLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFuZ3VsYXJDcm9wcGVyanNDb21wb25lbnQgfSBmcm9tICdhbmd1bGFyLWNyb3BwZXJqcyc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1jcm9wcGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIGNsYXNzPVwiaW1nLWNyb3BwZXJcIlxuICAobW91c2VlbnRlcik9XCJvbk1vdXNlRW50ZXIoKVwiXG4gIChtb3VzZWxlYXZlKT1cIm9uTW91c2VMZWF2ZSgpXCI+XG4gIDxkaXYgY2xhc3M9XCJlZGl0LW92ZXJsYXlcIiBbY2xhc3MuYWN0aXZlXT1cImhvdmVyQWN0aXZlXCIgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCI+XG4gICAgPGJ1dHRvbiAqbmdJZj1cImhvdmVyQWN0aXZlXCIgW0BlbnRlckFuaW1hdGlvbl0gY2xhc3M9XCJwM1wiIChjbGljayk9XCJlZGl0SW1hZ2UoKVwiPkVkaXQgTWUhPC9idXR0b24+XG4gIDwvZGl2PlxuICA8aW1nXG4gICAgKm5nSWY9XCIhY3JvcHBlZEltYWdlICYmICFlZGl0TW9kZVwiXG4gICAgW3NyY109XCJpbWFnZURhdGFcIlxuICAgIGNsYXNzPVwicHJldmlldy1pbWFnZVwiXG4gICAgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCJcbiAgPlxuICA8YW5ndWxhci1jcm9wcGVyXG4gICAgKm5nSWY9XCJlZGl0TW9kZVwiXG4gICAgI2ltYWdlQ3JvcHBlclxuICAgIFtjcm9wcGVyT3B0aW9uc109XCJjcm9wcGVyQ29uZmlnXCJcbiAgICBbaW1hZ2VVcmxdPVwiaW1hZ2VEYXRhXCJcbiAgPjwvYW5ndWxhci1jcm9wcGVyPlxuICA8aW1nXG4gICAgKm5nSWY9XCJjcm9wcGVkSW1hZ2UgJiYgIWVkaXRNb2RlXCJcbiAgICBbc3JjXT1cImNyb3BwZWRJbWFnZVwiXG4gICAgY2xhc3M9XCJmaXRcIlxuICAgIFtuZ1N0eWxlXT1cImNyb3BwZWRTdHlsZVwiXG4gICAgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCI+XG4gIFxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2Nre2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMXttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MSw6aG9zdCAuZWRpdC1vdmVybGF5IGJ1dHRvbntwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDMsOmhvc3QgLmVkaXQtb3ZlcmxheSBidXR0b257cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZle3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZXtwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3R7ZGlzcGxheTpibG9ja306aG9zdCAuaW1nLWNyb3BwZXJ7cG9zaXRpb246cmVsYXRpdmV9Omhvc3QgLnByZXZpZXctaW1hZ2V7d2lkdGg6MTAwJX06aG9zdCAuZWRpdC1vdmVybGF5e3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3RyYW5zaXRpb246LjJzIGVhc2UtaW59Omhvc3QgLmVkaXQtb3ZlcmxheS5hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4yKX06aG9zdCAuZWRpdC1vdmVybGF5IGJ1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjYpO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NTAlO3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpfWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcbiAgICAgICdlbnRlckFuaW1hdGlvbicsIFtcbiAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwfSksXG4gICAgICAgICAgYW5pbWF0ZSgnNTAwbXMnLCBzdHlsZSh7b3BhY2l0eTogMX0pKVxuICAgICAgICBdKSxcbiAgICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAxfSksXG4gICAgICAgICAgYW5pbWF0ZSgnNTAwbXMnLCBzdHlsZSh7b3BhY2l0eTogMH0pKVxuICAgICAgICBdKVxuICAgICAgXVxuICAgIClcbiAgXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW1Dcm9wcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCdpbWFnZUNyb3BwZXInKSBwdWJsaWMgaW1hZ2VDcm9wcGVyOiBBbmd1bGFyQ3JvcHBlcmpzQ29tcG9uZW50O1xuICBASW5wdXQoKSBpbWFnZURhdGE6IHN0cmluZztcbiAgQElucHV0KCkgY3JvcHBlZEltYWdlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbmZpZzogYW55ID0ge307XG4gIEBJbnB1dCgpIGVkaXRNb2RlOiBib29sZWFuO1xuICBASW5wdXQoKSBrZXk6IG51bWJlcjtcbiAgQE91dHB1dCgpIGVuYWJsZWRDcm9wcGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjcm9wcGVkSW1hZ2VFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBjcm9wcGVyQ29uZmlnOiBhbnk7XG4gIGVkaXRWaXNpYmxlOiBCb29sZWFuID0gIGZhbHNlO1xuICBjcm9wcGVkRGF0YTogYW55O1xuICBjcm9wcGVkU3R5bGU6IGFueTtcbiAgaG92ZXJBY3RpdmU6IEJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHB1YmxpYyBfbWVkaWFTZXJ2aWNlOiBTZW1NZWRpYVNlcnZpY2UpIHtcbiAgICB0aGlzLmNyb3BwZXJDb25maWcgPSB7XG4gICAgICBtb3ZhYmxlOiB0cnVlLFxuICAgICAgc2NhbGFibGU6IGZhbHNlLFxuICAgICAgem9vbWFibGU6IHRydWUsXG4gICAgICB2aWV3TW9kZTogMSxcbiAgICAgIGd1aWRlczogdHJ1ZSxcbiAgICAgIHJvdGF0YWJsZTogdHJ1ZSxcbiAgICAgIGRyYWdNb2RlOiAnbW92ZScsXG4gICAgICBjaGVja0Nyb3NzT3JpZ2luOiB0cnVlLFxuICAgICAgcmVhZHk6IChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LmNyb3BwZXIuY2xlYXIoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuY29uZmlnICYmIHRoaXMuaW1hZ2VDcm9wcGVyKSB7XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5maXQpIHtcbiAgICAgICAgdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5yZXNldCgpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuY3JvcCkge1xuICAgICAgICAvLyB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLnNldERyYWdNb2RlKCdjcm9wJyk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS56b29tICE9PSAwKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIuem9vbShjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuem9vbSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5yb3RhdGUgIT09IDApIHtcbiAgICAgICAgdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5yb3RhdGUoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLnJvdGF0ZSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5hcHBseSkge1xuICAgICAgICBjb25zdCBjcm9wcGVkSW1hZ2UgPSB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLmdldENyb3BwZWRDYW52YXMoKS50b0RhdGFVUkwoJ2ltYWdlL2pwZycpO1xuICAgICAgICB0aGlzLmNyb3BwZWREYXRhID0gdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5nZXRDcm9wQm94RGF0YSgpO1xuICAgICAgICB0aGlzLmNyb3BwZWRTdHlsZSA9IHtcbiAgICAgICAgICAndG9wLnB4JzogdGhpcy5jcm9wcGVkRGF0YS50b3AsXG4gICAgICAgICAgJ2xlZnQucHgnOiB0aGlzLmNyb3BwZWREYXRhLmxlZnQsXG4gICAgICAgICAgJ3dpZHRoLnB4JzogdGhpcy5jcm9wcGVkRGF0YS53aWR0aCxcbiAgICAgICAgICAnaGVpZ2h0LnB4JzogdGhpcy5jcm9wcGVkRGF0YS5oZWlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JvcHBlZEltYWdlRXZlbnQuZW1pdChjcm9wcGVkSW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5rZXkgJiYgY2hhbmdlcy5rZXkuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmtleSA9IGNoYW5nZXMua2V5LmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cbiAgbmdPbkluaXQoKSB7fVxuICBpbWFnZUxvYWRlZCgpIHtcbiAgICAgIC8vIHNob3cgY3JvcHBlclxuICB9XG4gIGxvYWRJbWFnZUZhaWxlZCgpIHtcbiAgICAgIC8vIHNob3cgbWVzc2FnZVxuICB9XG4gIGVkaXRJbWFnZSgpIHtcbiAgICB0aGlzLmNyb3BwZWRJbWFnZSA9ICcnO1xuICAgIHRoaXMuZW5hYmxlZENyb3BwZXIuZW1pdCgpO1xuICB9XG4gIG9uTW91c2VFbnRlcigpIHtcbiAgICB0aGlzLmhvdmVyQWN0aXZlID0gdHJ1ZTtcbiAgfVxuICBvbk1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5ob3ZlckFjdGl2ZSA9IGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1jb250cm9scycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImZsZXggbXkxXCI+XG4gIDxkaXYgY2xhc3M9XCJjb2wtNiBweDFcIj5cbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvbiBmb3I9XCJmaXQtY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJwcmVzc2VkRml0LmVtaXQoKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXJlc2l6ZSBsYWJlbC1pY29uXCI+PC9zcGFuPkZpdFxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gZm9yPVwicm90YXRlLWxlZnQtY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJwcmVzc2VkUm90YXRlTGVmdC5lbWl0KClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1yZXNpemUgbGFiZWwtaWNvblwiPjwvc3Bhbj5Sb3RhdGUgTGVmdFxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gZm9yPVwiem9vbS1pbi1jb250cm9sXCIgY2xhc3M9XCJjb250cm9sXCIgKGNsaWNrKT1cInByZXNzZWRab29tSW4uZW1pdCgpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcmVzaXplIGxhYmVsLWljb25cIj48L3NwYW4+Wm9vbSBpblxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29sLTYgcHgxXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8YnV0dG9uIGZvcj1cImNyb3AtY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJwcmVzc2VkQ3JvcC5lbWl0KClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXJlc2l6ZSBsYWJlbC1pY29uXCI+PC9zcGFuPkNyb3BcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxidXR0b24gZm9yPVwicm90YXRlLXJpZ2h0LWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZFJvdGF0ZVJpZ2h0LmVtaXQoKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcmVzaXplIGxhYmVsLWljb25cIj48L3NwYW4+Um90YXRlIHJpZ2h0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8YnV0dG9uIGZvcj1cInpvb20tb3V0LWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZFpvb21PdXQuZW1pdCgpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1yZXNpemUgbGFiZWwtaWNvblwiPjwvc3Bhbj5ab29tIG91dFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2ssOmhvc3QgLmNvbnRyb2x7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxLDpob3N0IC5jb250cm9se21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10MnttYXJnaW4tdG9wOjFyZW19Lm1yMnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxLDpob3N0IC5jb250cm9se3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAye3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4MntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4M3twYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleHtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0YXJ0e2FsaWduLWNvbnRlbnQ6ZmxleC1zdGFydH0uY29udGVudC1lbmR7YWxpZ24tY29udGVudDpmbGV4LWVuZH0uY29udGVudC1jZW50ZXJ7YWxpZ24tY29udGVudDpjZW50ZXJ9LmNvbnRlbnQtYmV0d2VlbnthbGlnbi1jb250ZW50OnNwYWNlLWJldHdlZW59LmNvbnRlbnQtYXJvdW5ke2FsaWduLWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0cmV0Y2h7YWxpZ24tY29udGVudDpzdHJldGNofS5mbGV4LWF1dG97ZmxleDoxIDEgYXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjB9LmZsZXgtbm9uZXtmbGV4Om5vbmV9Lm9yZGVyLTB7b3JkZXI6MH0ub3JkZXItMXtvcmRlcjoxfS5vcmRlci0ye29yZGVyOjJ9Lm9yZGVyLTN7b3JkZXI6M30ub3JkZXItbGFzdHtvcmRlcjo5OTk5OX0ucmVsYXRpdmUsOmhvc3QgLmNvbnRyb2x7cG9zaXRpb246cmVsYXRpdmV9LmFic29sdXRlLDpob3N0IC5jb250cm9sIC5sYWJlbC1pY29ue3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTB7dG9wOjB9LnJpZ2h0LTB7cmlnaHQ6MH0uYm90dG9tLTB7Ym90dG9tOjB9LmxlZnQtMHtsZWZ0OjB9Lnoxe3otaW5kZXg6MX0uejJ7ei1pbmRleDoyfS56M3t6LWluZGV4OjN9Lno0e3otaW5kZXg6NH0uYm9yZGVye2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MXB4fS5ib3JkZXItdG9we2JvcmRlci10b3Atc3R5bGU6c29saWQ7Ym9yZGVyLXRvcC13aWR0aDoxcHh9LmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweH0uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5ib3JkZXItbGVmdHtib3JkZXItbGVmdC1zdHlsZTpzb2xpZDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmJvcmRlci1ub25le2JvcmRlcjowfS5yb3VuZGVke2JvcmRlci1yYWRpdXM6M3B4fS5jaXJjbGV7Ym9yZGVyLXJhZGl1czo1MCV9LnJvdW5kZWQtdG9we2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LnJvdW5kZWQtcmlnaHR7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0ucm91bmRlZC1ib3R0b217Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0ucm91bmRlZC1sZWZ0e2JvcmRlci1yYWRpdXM6M3B4IDAgMCAzcHh9Lm5vdC1yb3VuZGVke2JvcmRlci1yYWRpdXM6MH0uaGlkZXtwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7aGVpZ2h0OjFweDt3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpfUBtZWRpYSAobWF4LXdpZHRoOjQwZW0pey54cy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pIGFuZCAobWF4LXdpZHRoOjUyZW0pey5zbS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pIGFuZCAobWF4LXdpZHRoOjY0ZW0pey5tZC1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdCAuY29udHJvbHtjb2xvcjojZmZmO3dpZHRoOjEwMCU7Ym9yZGVyLXJhZGl1czoxMnB4IDEycHggMDtiYWNrZ3JvdW5kLWNvbG9yOiM0NDRkNjN9Omhvc3QgLmNvbnRyb2w6Zm9jdXN7b3V0bGluZTowfTpob3N0IC5jb250cm9sIC5sYWJlbC1pY29ue3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtsZWZ0OjFlbX1gXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW1Db250cm9sc0NvbXBvbmVudCB7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZEZpdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHVibGljIHByZXNzZWRDcm9wID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZFJvdGF0ZUxlZnQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBwcmVzc2VkUm90YXRlUmlnaHQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBwcmVzc2VkWm9vbUluID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZFpvb21PdXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbn1cblxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuZXhwb3J0IHR5cGUgUGFuZVR5cGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1zbGlkZS1wYW5lbCcsXG4gIHN0eWxlczogW2A6aG9zdHtkaXNwbGF5OmJsb2NrO292ZXJmbG93OmhpZGRlbn0ucGFuZXN7aGVpZ2h0OjEwMCU7d2lkdGg6MjAwJTt0cmFuc2l0aW9uLWR1cmF0aW9uOi41cztkaXNwbGF5OmZsZXh9LnBhbmVzIGRpdntmbGV4OjF9YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhbmVzXCIgW0BzbGlkZV09XCJhY3RpdmVQYW5lXCI+XG4gIDxkaXY+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW2xlZnRQYW5lXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgPGRpdj48bmctY29udGVudCBzZWxlY3Q9XCJbcmlnaHRQYW5lXVwiPjwvbmctY29udGVudD48L2Rpdj5cbjwvZGl2PmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc2xpZGUnLCBbXG4gICAgICBzdGF0ZSgnbGVmdCcsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScgfSkpLFxuICAgICAgc3RhdGUoJ3JpZ2h0Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdsZWZ0IDw9PiByaWdodCcsIGFuaW1hdGUoJzFzJykpXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZVBhbmVsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgYWN0aXZlUGFuZTogUGFuZVR5cGUgPSAnbGVmdCc7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tc2V0dGluZ3MnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1oZWFkZXJcIj5cbiAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIiAoY2xpY2spPVwiaXNMZWZ0VmlzaWJsZT10cnVlXCI+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPHNlbS1zbGlkZS1wYW5lbCBbYWN0aXZlUGFuZV09XCJpc0xlZnRWaXNpYmxlPyAnbGVmdCc6ICdyaWdodCdcIj5cbiAgICA8ZGl2IGxlZnRQYW5lPlxuICAgICAgPGRpdiBzZW11aS1zZWN0aW9uLWJvZHkgY2xhc3M9XCJwMlwiPlxuICAgICAgICA8dWwgc2VtdWktbGlzdCBjbGFzcz1cInVzZXItbmF2XCI+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBzZW11aS1saXN0LWl0ZW1cbiAgICAgICAgICAgIGxpc3QtaXRlbVxuICAgICAgICAgICAgc2VtdWktaW1wb3J0YW5jZT1cImRhcmtcIlxuICAgICAgICAgICAgY2xhc3M9XCJweTFcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uSW1hZ2VzKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwic2VtLWljb24tc3R5bGUgZGVmYXVsdFwiICBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8c3Bhbj4gSW1hZ2VzPC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBzZW11aS1saXN0LWl0ZW1cbiAgICAgICAgICAgIGxpc3QtaXRlbVxuICAgICAgICAgICAgc2VtdWktaW1wb3J0YW5jZT1cImRhcmtcIlxuICAgICAgICAgICAgY2xhc3M9XCJweTFcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uU2V0dGluZ3MoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJzZW0taWNvbi1zZXR0aW5ncyBkZWZhdWx0XCIgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuPiBTZXR0aW5nczwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICBsaXN0LWl0ZW1cbiAgICAgICAgICAgIHNlbXVpLWltcG9ydGFuY2U9XCJkYXJrXCJcbiAgICAgICAgICAgIGNsYXNzPVwicHkxXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkR1cGxpY2F0ZSgpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aSBjbGFzcz1cInNlbS1pY29uLXNpdGVzIGRlZmF1bHRcIiAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPHNwYW4+IER1cGxpY2F0ZTwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICBsaXN0LWl0ZW1cbiAgICAgICAgICAgIHNlbXVpLWltcG9ydGFuY2U9XCJkYXJrXCJcbiAgICAgICAgICAgIGNsYXNzPVwicHkxXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkRlbGV0ZSgpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aSBjbGFzcz1cInNlbS1pY29uLWRlbGV0ZSBkZWZhdWx0XCIgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuPiBEZWxldGU8L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgcmlnaHRQYW5lPlxuICAgICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJ2aWV3TW9kZUZvcm1cIiBjbGFzcz1cInAyXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIlxuICAgICAgICB2YWx1ZT1cImdyaWRcIlxuICAgICAgICBpZD1cImdyaWRcIlxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ2aWV3TW9kZVwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwiZ3JpZFwiPjxzcGFuIGNsYXNzPVwic2VtLWljb24tc3R5bGUgZGVmYXVsdFwiPjwvc3Bhbj48L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICB2YWx1ZT1cImNhcm91c2VsXCJcbiAgICAgICAgICBpZD1cImNhcm91c2VsXCJcbiAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ2aWV3TW9kZVwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwiY2Fyb3VzZWxcIj48c3BhbiBjbGFzcz1cInNlbS1pY29uLXNldHRpbmdzIGRlZmF1bHRcIj48L3NwYW4+PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgdmFsdWU9XCJsaXN0XCJcbiAgICAgICAgICBpZD1cImxpc3RcIlxuICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInZpZXdNb2RlXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJsaXN0XCI+PHNwYW4gY2xhc3M9XCJzZW0taWNvbi1zZXR0aW5ncyBkZWZhdWx0XCI+PC9zcGFuPjwvbGFiZWw+XG4gICAgICA8L2Zvcm0+XG4gICAgICB7e3ZpZXdNb2RlRm9ybS52YWx1ZSB8IGpzb259fVxuICAgIDwvZGl2PlxuICA8L3NlbS1zbGlkZS1wYW5lbD5cblxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2t7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxe21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10MnttYXJnaW4tdG9wOjFyZW19Lm1yMnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxe3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAye3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4MntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4M3twYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleCw6aG9zdCBmb3Jte2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5kLDpob3N0IGZvcm17anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZle3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZXtwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3QgZm9ybSBpbnB1dFt0eXBlPXJhZGlvXXtkaXNwbGF5Om5vbmV9Omhvc3QgZm9ybSBpbnB1dFt0eXBlPXJhZGlvXTpjaGVja2VkK2xhYmVse2JhY2tncm91bmQ6I2NjY306aG9zdCBmb3JtIGxhYmVsIHNwYW57Zm9udC1zaXplOjMwcHh9YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW1NZWRpYVNldHRpbmdzQ29tcG9uZW50IHtcbiAgQE91dHB1dCgpIHByZXNzZWRJbWFnZXMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHByZXNzZWREZWxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHByZXNzZWREdXBsaWNhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHByZXNzZWRTZXR0aW5ncyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwdWJsaWMgaXNMZWZ0VmlzaWJsZTogQm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyB2aWV3TW9kZUZvcm06IEZvcm1Hcm91cDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX21lZGlhU2VydmljZTogU2VtTWVkaWFTZXJ2aWNlLCBwcml2YXRlIF9mYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB0aGlzLnZpZXdNb2RlRm9ybSA9IHRoaXMuX2ZiLmdyb3VwKHtcbiAgICAgIHZpZXdNb2RlOiAnJ1xuICAgIH0pO1xuICB9XG4gIG9uRGVsZXRlKCkge1xuICAgIHRoaXMucHJlc3NlZERlbGV0ZS5lbWl0KCk7XG4gIH1cbiAgb25JbWFnZXMoKSB7XG4gICAgdGhpcy5wcmVzc2VkSW1hZ2VzLmVtaXQoKTtcbiAgfVxuICBvbkR1cGxpY2F0ZSgpIHtcbiAgICB0aGlzLnByZXNzZWREdXBsaWNhdGUuZW1pdCgpO1xuICB9XG4gIG9uU2V0dGluZ3MoKSB7XG4gICAgdGhpcy5pc0xlZnRWaXNpYmxlID0gZmFsc2U7XG4gICAgLy8gdGhpcy5wcmVzc2VkU2V0dGluZ3MuZW1pdCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1tZWRpYS1lZGl0JyxcbiAgdGVtcGxhdGU6IGA8Zm9ybSBbZm9ybUdyb3VwXT1cIm15Rm9ybVwiIGNsYXNzPVwicDJcIj5cbiAgPGxhYmVsPkFsbCBUZXh0PC9sYWJlbD5cbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICBjbGFzcz1cInNlbS1pbnB1dFwiXG4gICAgaWQ9XCJhbGwtdGV4dFwiXG4gICAgZm9ybUNvbnRyb2xOYW1lPVwiYWxsVGV4dFwiPlxuICA8bGFiZWw+TWV0YSBUaXRsZTwvbGFiZWw+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgY2xhc3M9XCJzZW0taW5wdXRcIlxuICAgIGlkPVwibWV0YS10aXRsZVwiXG4gICAgZm9ybUNvbnRyb2xOYW1lPVwibWV0YVRpdGxlXCI+XG48L2Zvcm0+XG48c2VtLWNvbnRyb2xzXG4gIChwcmVzc2VkRml0KT1cIm9uUHJlc3MoJ0ZJVCcpXCJcbiAgKHByZXNzZWRDcm9wKT1cIm9uUHJlc3MoJ0NST1AnKVwiXG4gIChwcmVzc2VkUm90YXRlTGVmdCk9XCJvblByZXNzKCdST1RBVEVfTEVGVCcpXCJcbiAgKHByZXNzZWRSb3RhdGVSaWdodCk9XCJvblByZXNzKCdST1RBVEVfUklHSFQnKVwiXG4gIChwcmVzc2VkWm9vbUluKT1cIm9uUHJlc3MoJ1pPT01fSU4nKVwiXG4gIChwcmVzc2VkWm9vbU91dCk9XCJvblByZXNzKCdaT09NX09VVCcpXCI+XG48L3NlbS1jb250cm9scz5cbjxkaXYgY2xhc3M9XCJweDIgZmxleCBqdXN0aWZ5LWVuZFwiPlxuICA8YnV0dG9uIGZvcj1cImNyb3AtY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJvblByZXNzKCdBUFBMWScpXCIgPlxuICAgIEFwcGx5XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG48IS0tIDxkaXY+PHByZT48Y29kZT57eyBteUZvcm0/LnZhbHVlIHwganNvbiB9fTwvY29kZT48L3ByZT48L2Rpdj4gLS0+XG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2NrLDpob3N0IC5jb250cm9se2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMSw6aG9zdCAuY29udHJvbHttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MSw6aG9zdCAuY29udHJvbHtwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDMsOmhvc3QgLmNvbnRyb2x7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZlLDpob3N0IC5jb250cm9se3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZXtwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3QgLmNvbnRyb2x7Y29sb3I6I2ZmZjtib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjEycHggMTJweCAwO2JhY2tncm91bmQtY29sb3I6IzA1ZGNiNn06aG9zdCAuY29udHJvbDpmb2N1c3tvdXRsaW5lOjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRFZGl0TW9kZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZm9ybUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQElucHV0KCkgZm9ybURhdGE6IGFueTtcbiAgcHVibGljIG15Rm9ybTogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB0aGlzLm15Rm9ybSA9IHRoaXMuX2ZiLmdyb3VwKHtcbiAgICAgIGFsbFRleHQgOiAnJyxcbiAgICAgIG1ldGFUaXRsZTogJycsXG4gICAgfSk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgdGhpcy5teUZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICBhbGxUZXh0OiB0aGlzLmZvcm1EYXRhLmFsbFRleHQsXG4gICAgICBtZXRhVGl0bGU6IHRoaXMuZm9ybURhdGEubWV0YVRpdGxlXG4gICAgfSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5teUZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5mb3JtQ2hhbmdlZC5lbWl0KGRhdGEpO1xuICAgIH0pO1xuICB9XG4gIG9uUHJlc3MobW9kZSkge1xuICAgIHRoaXMuc2VsZWN0ZWRFZGl0TW9kZS5lbWl0KG1vZGUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgIE91dHB1dCwgSW5qZWN0b3IsIFZpZXdDaGlsZCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tbWVkaWEtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXIgc2VtLW1lZGlhLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXItLW5hdlwiPlxuICAgIDxidXR0b25cbiAgICAgIHNlbS1idG4tZmFiXG4gICAgICBjb3JuZXI9XCJ0b3AtcmlnaHRcIlxuICAgICAgc2VtdWktdGhlbWU9XCJsaWdodFwiXG4gICAgICBjbGFzcz1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgXCJcbiAgICAgIHNlbS1pbXBvcnRhbmNlPVwic2Vjb25kYXJ5XCJcbiAgICAgICNjaGF0T3ZlcmxheT1cImNka092ZXJsYXlPcmlnaW5cIlxuICAgICAgY2RrT3ZlcmxheU9yaWdpblxuICAgICAgKGNsaWNrKT1cIm9wZW5UZXN0QSghaXNUZXN0QU9wZW5lZClcIlxuICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1wcm9maWxlLWFjY2VudFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBhdGgxXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwicGF0aDJcIj48L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8c2VtdWktb3ZlcmxheS1kaWFsb2dcbiAgICAgIFtvdmVybGF5T3JpZ2luXT1cImNoYXRPdmVybGF5XCJcbiAgICAgIFtpc09wZW5lZF09XCJpc1Rlc3RBT3BlbmVkXCJcbiAgICAgIChjbG9zZSk9XCJvcGVuVGVzdEEoZmFsc2UpXCJcbiAgICAgIChvcGVuKT1cIm9wZW5UZXN0QSh0cnVlKVwiXG4gICAgICBbb3ZlcmxheVdpZHRoXT1cIidhdXRvJ1wiXG4gICAgPlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwidXBsb2FkUGFuZWxGbGFnXCIgY2xhc3M9XCJ0ZW1wLWNvbnRhaW5lciBkaWFsb2ctY29udGFpbmVyIGxlZnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWJvZHlcIj5cbiAgICAgICAgICA8c2VtLXBhbmVsXG4gICAgICAgICAgICBbZWRpdFZpc2libGVdPVwiZWRpdFZpc2libGVcIlxuICAgICAgICAgICAgW2tleV09XCJrZXlcIlxuICAgICAgICAgICAgW2ltYWdlTmFtZUxpc3RdPVwiaW1hZ2VOYW1lTGlzdFwiXG4gICAgICAgICAgICAoY3JvcHBlZCk9XCJjcm9wcGVkSW1hZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAodXBsb2FkZWQpPVwidXBsb2FkZWRJbWFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChjaGFuZ2VkRm9ybSk9XCJvbkNoYW5nZWRGb3JtKCRldmVudClcIlxuICAgICAgICAgICAgKGVkaXRJbWFnZSk9XCJvbkVkaXRJbWFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChkZWxldGVJbWFnZSk9XCJvbkRlbGV0ZUltYWdlKCRldmVudClcIlxuICAgICAgICAgICAgKGNoYW5nZWRFZGl0TW9kZSk9XCJvbkNoYW5nZWRFZGl0TW9kZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChzaG93VXBsb2FkRXZlbnQpPVwiZWRpdFZpc2libGUgPSBmYWxzZVwiXG4gICAgICAgICAgICBbdXNlckltYWdlc109XCJ1c2VySW1hZ2VzXCJcbiAgICAgICAgICA+PC9zZW0tcGFuZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwiIXVwbG9hZFBhbmVsRmxhZ1wiXG4gICAgICAgICAgIGNsYXNzPVwic2V0dGluZ3MtY29udGFpbmVyIGRpYWxvZy1jb250YWluZXIgbXQ0XCI+XG4gICAgICAgIDxzZW0tc2V0dGluZ3NcbiAgICAgICAgICAocHJlc3NlZEltYWdlcyk9XCJvbk1lbnUoJ0lNQUdFUycpXCJcbiAgICAgICAgICAocHJlc3NlZER1cGxpY2F0ZSk9XCJvbk1lbnUoJ0RVUExJQ0FURScpXCJcbiAgICAgICAgICAocHJlc3NlZFNldHRpbmdzKT1cIm9uTWVudSgnU0VUVElOR1MnKVwiXG4gICAgICAgICAgKHByZXNzZWREZWxldGUpPVwib25NZW51KCdERUxFVEUnKVwiXG4gICAgICAgID5cbiAgICAgICAgPC9zZW0tc2V0dGluZ3M+XG4gICAgICA8L2Rpdj5cblxuICAgIDwvc2VtdWktb3ZlcmxheS1kaWFsb2c+XG4gIDwvZGl2PlxuPC9kaXY+XG5cblxuPGRpdiBjbGFzcz1cImZsZXggZmxleC1jb2x1bW5cIj5cblxuICA8IS0tIDxwcmU+e3t0ZW1wSW1hZ2VzIHwganNvbn19PC9wcmU+IC0tPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwidXNlckltYWdlc1wiIGNsYXNzPVwicHJldmlldy1jb250YWluZXJcIj5cbiAgPHNlbS1jcm9wcGVyXG4gICAgKm5nRm9yPVwibGV0IGltYWdlIG9mIHVzZXJJbWFnZXM7bGV0IGtleSA9IGluZGV4XCJcbiAgICBbaW1hZ2VEYXRhXT1cImltYWdlLnVwbG9hZGVkSW1hZ2VcIlxuICAgIFtjcm9wcGVkSW1hZ2VdPVwiaW1hZ2UuY3JvcHBlZEltYWdlXCJcbiAgICBbZWRpdE1vZGVdPVwiaW1hZ2UuZWRpdE1vZGVcIlxuICAgIFtjb25maWddPVwiY29uZmlnXCJcbiAgICBba2V5XT1cImtleVwiXG4gICAgKGVuYWJsZWRDcm9wcGVyKT1cIm9uRW5hYmxlRWRpdEltYWdlKGtleSlcIlxuICAgIChjcm9wcGVkSW1hZ2VFdmVudCk9XCJvbkNyb3BwZWRJbWFnZShrZXksICRldmVudClcIlxuICA+PC9zZW0tY3JvcHBlcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0KCl7YmFja2dyb3VuZC1jb2xvcjojZjVlNWU1O2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjOGIwMDAwO2hlaWdodDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIHdpZGdldCA9IHtcbiAgICBjb21wb25lbnROYW1lOiAnJyxcbiAgICBkYXRhOiAgYFxuICAgIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeSdzIHN0YW5kYXJkIGR1bW15IHRleHQgZXZlciBzaW5jZSB0aGUgMTUwMHMsIHdoZW4gYW4gdW5rbm93biBwcmludGVyIG9vayBhIGdhbGxleSBvZiB0eXBlXG4gICAgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZSBudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWNcbiAgICB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHUgbGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHNcbiAgICBjb250YWluaW5nYFxuICB9O1xuICB1c2VySW1hZ2VzPzogQXJyYXk8YW55PiA9IFtdO1xuICBlZGl0VmlzaWJsZTogQm9vbGVhbiA9IGZhbHNlO1xuICBrZXk6IE51bWJlcjtcbiAgdXBsb2FkUGFuZWxGbGFnOiBCb29sZWFuID0gdHJ1ZTtcbiAgaW1hZ2VOYW1lTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjb25maWc6IGFueTtcbiAgdGVtcEltYWdlczogQXJyYXk8YW55PjtcbiAgaXNUZXN0QU9wZW5lZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lZGlhU2VydmljZTogU2VtTWVkaWFTZXJ2aWNlLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy5pbmplY3Rvci5nZXQoJ3dpZGdldCcpO1xuICAgIGlmKHRoaXMud2lkZ2V0LmNvbXBvbmVudE5hbWUgPT09ICdTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdHb3QgdGhlIHd5c2l3eWcgZGF0YScsIHRoaXMud2lkZ2V0KTtcbiAgICB9XG5cbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgbGV0IGVkaXRNb2RlID0gZmFsc2U7XG4gICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXNlckltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgYWxsSW1hZ2VzKSB7XG4gICAgICAgIGVkaXRNb2RlID0gZWRpdE1vZGUgfHwgaW1hZ2UuZWRpdE1vZGU7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdC5wdXNoKGltYWdlLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmVkaXRWaXNpYmxlID0gZWRpdE1vZGU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuaW1hZ2VDb25maWdDaGFuZ2VzLnN1YnNjcmliZShjb25maWcgPT4ge1xuICAgICAgdGhpcy5jb25maWcgPSBfLmNsb25lRGVlcChjb25maWcpO1xuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUxvYWRDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0ID0gW107XG4gICAgICB0aGlzLnVzZXJJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGFsbEltYWdlcykge1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QucHVzaChpbWFnZS5maWxlTmFtZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmtleSA9IGFsbEltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgdGhpcy5lZGl0VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgaWYgKGFsbEltYWdlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLnRlbXBDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgIH0pO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICB9XG4gIHVwbG9hZGVkSW1hZ2UoaW1hZ2U6IEZpbGUpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UucHV0SW1hZ2UoaW1hZ2UpO1xuICB9XG4gIG9uRW5hYmxlRWRpdEltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEVuYWJsZShpbmRleCk7XG4gICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgIHRoaXMua2V5ID0gaW5kZXg7XG4gIH1cbiAgb25FZGl0SW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLmtleSA9IGluZGV4O1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkVkaXRFbmFibGUoaW5kZXgpO1xuICB9XG4gIG9uRGVsZXRlSW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25EZWxldGVJbWFnZShpbmRleCk7XG4gIH1cbiAgb25NZW51KG1vZGUpIHtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgJ0lNQUdFUyc6XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdEVVBMSUNBVEUnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1NFVFRJTkdTJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdERUxFVEUnOlxuICAgICAgICB0aGlzLl9tZWRpYVNlcnZpY2UuY2xlYXJJbWFnZXMoKTtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0ID0gW107XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIG9uQ2hhbmdlZEZvcm0oZm9ybURhdGE6IGFueSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5mb3JtQ2hhbmdlZCh0aGlzLmtleSwgZm9ybURhdGEpO1xuICB9XG4gIG9uQ2hhbmdlZEVkaXRNb2RlKG1vZGU6IHN0cmluZykge1xuICAgIGlmIChtb2RlID09PSAnQVBQTFknKSB7XG4gICAgICAvLyB0aGlzLmVkaXRWaXNpYmxlID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5pbWFnZU5hbWVMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEltYWdlKHRoaXMua2V5LCBtb2RlKTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuY2xlYXJDb25maWcodGhpcy5rZXkpO1xuICB9XG4gIG9uQ3JvcHBlZEltYWdlKGluZGV4LCBjcm9wcGVkSW1hZ2UpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UucHV0Q3JvcHBlZEltYWdlKGluZGV4LCBjcm9wcGVkSW1hZ2UpO1xuICB9XG4gIG9wZW5UZXN0QShpc09wZW5lZDogYm9vbGVhbikge1xuICAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IGlzT3BlbmVkO1xuICB9XG4gIGNyb3BwZWRJbWFnZShpdGVtKXtcbiAgICBjb25zb2xlLmxvZygnbm90IHN1cmUnLCBpdGVtKVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU2VtVWlCdXR0b25Nb2R1bGUsXG4gIFNlbVVpQnV0dG9uRmFiTW9kdWxlLFxuICBTZW1VaU92ZXJsYXlEaWFsb2dNb2R1bGUsXG4gIFNlbVVpVGFic01vZHVsZSxcbiAgU2VtVWlUaHVtYm5haWxMYXJnZU1vZHVsZVxufSBmcm9tICdAZnJvbnRyL3NlbS11aSc7XG5cbmNvbnN0IFVpU2hhcmVkTW9kdWxlcyA9IFtcbiAgU2VtVWlCdXR0b25Nb2R1bGUsXG4gIFNlbVVpQnV0dG9uRmFiTW9kdWxlLFxuICBTZW1VaU92ZXJsYXlEaWFsb2dNb2R1bGUsXG4gIFNlbVVpVGFic01vZHVsZSxcbiAgU2VtVWlUaHVtYm5haWxMYXJnZU1vZHVsZVxuXVxuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbLi4uVWlTaGFyZWRNb2R1bGVzXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1VaUtpdFNoYXJlZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBPYnNlcnZlcnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgU2Nyb2xsRGlzcGF0Y2hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENka1N0ZXBwZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc3RlcHBlcic7XG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmNvbnN0IE1BVEVSSUFMX01PRFVMRVMgPSBbXG4gIC8vIENES1xuICBBMTF5TW9kdWxlLFxuICBCaWRpTW9kdWxlLFxuICBPYnNlcnZlcnNNb2R1bGUsXG4gIE92ZXJsYXlNb2R1bGUsXG4gIFBsYXRmb3JtTW9kdWxlLFxuICBQb3J0YWxNb2R1bGUsXG4gIFNjcm9sbERpc3BhdGNoTW9kdWxlLFxuICBDZGtTdGVwcGVyTW9kdWxlLFxuICBDZGtUYWJsZU1vZHVsZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFsuLi5NQVRFUklBTF9NT0RVTEVTXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NYXRlcmlhbFNoYXJlZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICd5b3V0dWJlU2FmZVVybCdcbn0pXG5leHBvcnQgY2xhc3MgWW91dHViZVNhZmVVcmxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcil7XG5cbiAgfVxuXG4gIHRyYW5zZm9ybSh2aWRlb0lkOiBzdHJpbmcpOiBTYWZlUmVzb3VyY2VVcmwge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoXG4gICAgICBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt2aWRlb0lkfT9hdXRvcGxheT0xYCk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBZb3V0dWJlVmlkZW9Nb2RlbCB7XG4gICAgdmlkZW9JZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgdGh1bWJuYWlsVXJsOiBzdHJpbmc7XG4gICAgY2hhbm5lbFRpdGxlOiBzdHJpbmc7XG4gICAgY2hhbm5lbElkOiBzdHJpbmc7XG4gICAgcHVibGlzaGVkQXQ/OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBWaWRlb01vZGVsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHZpZGVvSWQ6IHN0cmluZyxcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcbiAgICBwdWJsaWMgdGh1bWJuYWlsVXJsOiBzdHJpbmcsXG4gICAgcHVibGljIGNoYW5uZWxUaXRsZTogc3RyaW5nLFxuICAgIHB1YmxpYyBjaGFubmVsSWQ6IHN0cmluZyxcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIHRoaXMudmlkZW9JZCA9IHZpZGVvSWQ7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMudGh1bWJuYWlsVXJsID0gdGh1bWJuYWlsVXJsO1xuICAgIHRoaXMuY2hhbm5lbFRpdGxlID0gY2hhbm5lbFRpdGxlO1xuICAgIHRoaXMuY2hhbm5lbElkID0gY2hhbm5lbElkO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvJztcbmltcG9ydCB7IFBhZ2luYXRpb25JbnN0YW5jZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IFNlbVZpZGVvU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS12aWRlby5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3IsXG4gIHNlbGVjdG9yOiAnc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0taGVhZGVyXCI+XG4gIDxzcGFuIGNsYXNzPVwic2VtLWljb24tYmFja1wiPjwvc3Bhbj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWJvZHlfc3BhY2VkXCI+XG4gIDxkaXYgc2VtdWktdGFicyAjdGFic1ZlcnRpY2FsIFtzaG93VGFic109XCJ0cnVlXCIgW3ZlcnRpY2FsXT1cInRydWVcIiA+XG4gICAgPGRpdiBzZW11aS10YWIgI3RhYnNWMSBbdGl0bGVdPVwiJ1ZpZGVvIFVybCdcIj5cbiAgICAgIDxkaXYgc2VtdWktc2VjdGlvbi1ib2R5PlxuICAgICAgICBUYWIgMSBjb250ZW50XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHNlbXVpLXRhYiAjdGFic1YyIFt0aXRsZV09XCInU2VhcmNoJ1wiPlxuICAgICAgPGJyPlxuICAgICAgPGRpdiBjbGFzcz1cInNlbS12aWRlby1jb250YWluZXJcIj5cbiAgICAgICAgICA8IS0tIFNlY3Rpb24gQm9keSAtLT5cbiAgICAgICAgICA8ZGl2IHNlbXVpLXNlY3Rpb24tYm9keT5cbiAgICAgICAgICAgIDwhLS0gU2VhcmNoIC0tPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8IS0tIFlvdVR1YmUgU2VhcmNoIC0tPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5TZWFyY2ggWW91dHViZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1wcmVmaXhcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tc2VhcmNoIHByZWZpeFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic2VtLWlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgaWQ9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgICAgICAgICAoa2V5dXApPVwic2VhcmNoKHRleHRCb3gudmFsdWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICN0ZXh0Qm94XG4gICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiAgZmllbGQtcHJlZml4IGNsYXNzPVwiaWNvbiBpY29uLXNlYXJjaCBwcmVmaXhcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZW0tdmlkZW8tY29udGFpbmVyLS1yZXN1bHRzXCI+XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicmVzdWx0cy5sZW5ndGggPT0gMFwiIGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c19pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8ZmlndXJlIHNlbXVpLXRodW1ibmFpbCBjbGFzcz1cInB0MlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c19wcmV2aWV3XCIgY2FyZC1pbWFnZT48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWdjYXB0aW9uIHNlbS1zZWN0aW9uLWZvb3Rlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlnY2FwdGlvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwicHJpbWFyeS1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9kaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3ViLWNhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9kaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWdjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiByZXN1bHRzIHwgcGFnaW5hdGU6IGNvbmZpZ1wiIGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c19pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgc2VtdWktdGh1bWJuYWlsIGNsYXNzPVwicHQyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0tdmlkZW8tY29udGFpbmVyLS1yZXN1bHRzX3ByZXZpZXdcIiBjYXJkLWltYWdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nICpuZ0lmPVwiaXRlbS50aHVtYm5haWxVcmxcIiBbc3JjXT1cIml0ZW0udGh1bWJuYWlsVXJsXCIgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxmaWdjYXB0aW9uIHNlbS1zZWN0aW9uLWZvb3Rlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWdjYXB0aW9uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktY2FwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpdGVtLnRpdGxlfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInN1Yi1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpdGVtLnB1Ymxpc2hlZEF0fX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiIHJlbGF0aXZlIHNlbS1idXR0b24tLSBzZW0tYnV0dG9uIHNlbS1idXR0b24tLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQtc2V0dGluZy1idXR0b24gKGNsaWNrKT1cImFkZFZpZGVvKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFkZCB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxidXR0b24tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tc2VtLWJ0bi1mYWItLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tY29ybmVyPVwibm9uZVwiLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLXNlbXVpLXRoZW1lPVwibGlnaHRcIi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1zZW0taW1wb3J0YW5jZT1cImRlZmF1bHRcIi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1jYXJkLXNldHRpbmctYnV0dG9uIChjbGljayk9XCJsb2FkU2V0dGluZ3MoKVwiLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0mZ3Q7LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxzcGFuIGNsYXNzPVwic2VtLWljb24tZWxsaXBzZVwiPjwvc3Bhbj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvYnV0dG9uPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9maWdjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwhLS0gU2VjdGlvbiBGb290ZXIgLS0+XG4gICAgICAgICAgPGRpdiBzZW11aS1zZWN0aW9uLWZvb3Rlcj5cbiAgICAgICAgICAgICAgPHBhZ2luYXRpb24tdGVtcGxhdGVcbiAgICAgICAgICAgICAgICBjbGFzcz1cInNlbS1wYWdpbmF0aW9uLWNvbnRhaW5lciBweTJcIlxuICAgICAgICAgICAgICAgICNwPVwicGFnaW5hdGlvbkFwaVwiXG4gICAgICAgICAgICAgICAgW2lkXT1cImNvbmZpZy5pZFwiXG4gICAgICAgICAgICAgICAgKHBhZ2VDaGFuZ2UpPVwiY29uZmlnLmN1cnJlbnRQYWdlID0gJGV2ZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbS1wYWdpbmF0aW9uLW5hdlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNlbS1wYWdpbmF0aW9uLXByZXZpb3VzXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInAuaXNGaXJzdFBhZ2UoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFwLmlzRmlyc3RQYWdlKClcIiAoY2xpY2spPVwicC5wcmV2aW91cygpXCI+IDwgPC9hPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBwYWdlIG9mIHAucGFnZXNcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNlbS1wYWdpbmF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJwLmdldEN1cnJlbnQoKSA9PT0gcGFnZS52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwicC5zZXRDdXJyZW50KHBhZ2UudmFsdWUpXCIgKm5nSWY9XCJwLmdldEN1cnJlbnQoKSAhPT0gcGFnZS52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt7IHBhZ2UubGFiZWwgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicC5nZXRDdXJyZW50KCkgPT09IHBhZ2UudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBwYWdlLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic2VtLXBhZ2luYXRpb24tbmV4dFwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwLmlzTGFzdFBhZ2UoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFwLmlzTGFzdFBhZ2UoKVwiIChjbGljayk9XCJwLm5leHQoKVwiPiA+IDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3BhZ2luYXRpb24tdGVtcGxhdGU+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuPCEtLTxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgcmVzdWx0cyByZXN1bHRzJCB8IGFzeW5jIHwgcGFnaW5hdGU6IGNvbmZpZ1wiPi0tPlxuYCxcbiAgc3R5bGVzOiBbYC5oMXtmb250LXNpemU6MnJlbX0uaDJ7Zm9udC1zaXplOjEuNXJlbX0uaDN7Zm9udC1zaXplOjEuMjVyZW19Lmg0e2ZvbnQtc2l6ZToxcmVtfS5oNXtmb250LXNpemU6Ljg3NXJlbX0uaDZ7Zm9udC1zaXplOi43NXJlbX0uZm9udC1mYW1pbHktaW5oZXJpdHtmb250LWZhbWlseTppbmhlcml0fS5mb250LXNpemUtaW5oZXJpdHtmb250LXNpemU6aW5oZXJpdH0udGV4dC1kZWNvcmF0aW9uLW5vbmV7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmJvbGR7Zm9udC13ZWlnaHQ6NzAwfS5yZWd1bGFye2ZvbnQtd2VpZ2h0OjQwMH0uaXRhbGlje2ZvbnQtc3R5bGU6aXRhbGljfS5jYXBze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMmVtfS5sZWZ0LWFsaWdue3RleHQtYWxpZ246bGVmdH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5yaWdodC1hbGlnbnt0ZXh0LWFsaWduOnJpZ2h0fS5qdXN0aWZ5e3RleHQtYWxpZ246anVzdGlmeX0ubm93cmFwe3doaXRlLXNwYWNlOm5vd3JhcH0uYnJlYWstd29yZHt3b3JkLXdyYXA6YnJlYWstd29yZH0ubGluZS1oZWlnaHQtMXtsaW5lLWhlaWdodDoxfS5saW5lLWhlaWdodC0ye2xpbmUtaGVpZ2h0OjEuMTI1fS5saW5lLWhlaWdodC0ze2xpbmUtaGVpZ2h0OjEuMjV9LmxpbmUtaGVpZ2h0LTR7bGluZS1oZWlnaHQ6MS41fS5saXN0LXN0eWxlLW5vbmV7bGlzdC1zdHlsZTpub25lfS51bmRlcmxpbmV7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udHJ1bmNhdGV7bWF4LXdpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5saXN0LXJlc2V0e2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nLWxlZnQ6MH0uaW5saW5le2Rpc3BsYXk6aW5saW5lfS5ibG9jayw6aG9zdHtkaXNwbGF5OmJsb2NrfS5pbmxpbmUtYmxvY2t7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhYmxle2Rpc3BsYXk6dGFibGV9LnRhYmxlLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsfS5vdmVyZmxvdy1oaWRkZW57b3ZlcmZsb3c6aGlkZGVufS5vdmVyZmxvdy1zY3JvbGx7b3ZlcmZsb3c6c2Nyb2xsfS5vdmVyZmxvdy1hdXRve292ZXJmbG93OmF1dG99LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcIiBcIjtkaXNwbGF5OnRhYmxlfS5jbGVhcmZpeDphZnRlcntjbGVhcjpib3RofS5sZWZ0e2Zsb2F0OmxlZnR9LnJpZ2h0e2Zsb2F0OnJpZ2h0fS5maXR7bWF4LXdpZHRoOjEwMCV9Lm1heC13aWR0aC0xe21heC13aWR0aDoyNHJlbX0ubWF4LXdpZHRoLTJ7bWF4LXdpZHRoOjMycmVtfS5tYXgtd2lkdGgtM3ttYXgtd2lkdGg6NDhyZW19Lm1heC13aWR0aC00e21heC13aWR0aDo2NHJlbX0uYm9yZGVyLWJveHtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFsaWduLWJhc2VsaW5le3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5hbGlnbi10b3B7dmVydGljYWwtYWxpZ246dG9wfS5hbGlnbi1taWRkbGV7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hbGlnbi1ib3R0b217dmVydGljYWwtYWxpZ246Ym90dG9tfS5tMHttYXJnaW46MH0ubXQwe21hcmdpbi10b3A6MH0ubXIwe21hcmdpbi1yaWdodDowfS5tYjB7bWFyZ2luLWJvdHRvbTowfS5tbDB7bWFyZ2luLWxlZnQ6MH0ubXgwe21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjB9Lm15MHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowfS5tMXttYXJnaW46LjVyZW19Lm10MXttYXJnaW4tdG9wOi41cmVtfS5tcjF7bWFyZ2luLXJpZ2h0Oi41cmVtfS5tYjF7bWFyZ2luLWJvdHRvbTouNXJlbX0ubWwxe21hcmdpbi1sZWZ0Oi41cmVtfS5teDF7bWFyZ2luLWxlZnQ6LjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtfS5teTF7bWFyZ2luLXRvcDouNXJlbTttYXJnaW4tYm90dG9tOi41cmVtfS5tMnttYXJnaW46MXJlbX0ubXQye21hcmdpbi10b3A6MXJlbX0ubXIye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTF7cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDJ7cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgye3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgze3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZXtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGV7cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMHt0b3A6MH0ucmlnaHQtMHtyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0e2JhY2tncm91bmQ6I2ZmZn0uc2VtLXZpZGVvLWNvbnRhaW5lcnt3aWR0aDoyMTBweH0uc2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c19wcmV2aWV3e21pbi1oZWlnaHQ6OTZweDtkaXNwbGF5OmJsb2NrO2JhY2tncm91bmQtY29sb3I6I2RlZGVkZX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1WaWRlb1NldHRpbmdzUGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KCkgY2xvc2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIC8vIHJlc3VsdHM6IEFycmF5PFlvdXR1YmVWaWRlb01vZGVsPjtcbiAgcmVzdWx0czogQXJyYXk8YW55PiA9IFtdO1xuICBASW5wdXQoKSAgY29uZmlnO1xuICBwYWdlOiBudW1iZXIgPSAxO1xuICAvLyB2aWRlb0xpc3Q6IEFycmF5PGFueT47XG5cbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBsb2FkU2V0dGluZ3MoKXt9XG4gIHNlYXJjaChxdWVyeSkge1xuICAgIGNvbnNvbGUubG9nKCdxdWVyeScsIHF1ZXJ5KTtcbiAgICB0aGlzLnNlbVZpZGVvU2VydmljZS5mZXRjaFZpZGVvcyhxdWVyeSkuc3Vic2NyaWJlKChkYXRhOmFueSkgPT4ge1xuICAgICAgdGhpcy5yZXN1bHRzID0gZGF0YS5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgVmlkZW9Nb2RlbChcbiAgICAgICAgICBpdGVtLmlkLnZpZGVvSWQsXG4gICAgICAgICAgaXRlbS5zbmlwcGV0LnRpdGxlLFxuICAgICAgICAgIGl0ZW0uc25pcHBldC50aHVtYm5haWxzLmhpZ2gudXJsLFxuICAgICAgICAgIGl0ZW0uc25pcHBldC5jaGFubmVsVGl0bGUsXG4gICAgICAgICAgaXRlbS5zbmlwcGV0LmNoYW5uZWxJZCxcbiAgICAgICAgICBpdGVtLnNuaXBwZXQuZGVzY3JpcHRpb24pXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHdvcmtlZChxdWVyeSl7XG4gICAgY29uc29sZS5sb2coJ3F1ZXJ5JywgcXVlcnkpO1xuICB9XG4gIC8vIEBPdXRwdXQoKVxuICAvLyBzZWFyY2hDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZW1WaWRlb1NlcnZpY2U6IFNlbVZpZGVvU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIGFkZFZpZGVvKGl0ZW0pe1xuICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChpdGVtKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCAsIEV2ZW50RW1pdHRlciwgSW5wdXQsICBPdXRwdXQsIEluamVjdG9yLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBZb3V0dWJlVmlkZW9Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy92aWRlbyc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSW5zdGFuY2UgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBTZW1WaWRlb1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tdmlkZW8uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS12aWRlby1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiZW1iZWQtY29udGFpbmVyXCIgKm5nSWY9XCJ3aWRnZXQuZGF0YS5oYXNPd25Qcm9wZXJ0eSgndmlkZW9JZCcpXCI+XG4gICAgPGlmcmFtZSB3aWR0aD1cIjEwMCVcIlxuICAgIGhlaWdodD1cIjEwMCVcIlxuICAgIGZyYW1lYm9yZGVyPVwiMFwiXG4gICAgYWxsb3dmdWxsc2NyZWVuXG4gICAgW3NyY109XCJ3aWRnZXQuZGF0YS52aWRlb0lkIHwgeW91dHViZVNhZmVVcmxcIlxuICAgIHN0eWxlPVwiYm9yZGVyOiBzb2xpZCAxcHggYmxhY2tcIiA+XG4gICAgPC9pZnJhbWU+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXItLW5hdlwiPlxuICAgIDxidXR0b25cbiAgICAgIHNlbS1idG4tZmFiXG4gICAgICBjb3JuZXI9XCJ0b3AtcmlnaHRcIlxuICAgICAgc2VtdWktdGhlbWU9XCJsaWdodFwiXG4gICAgICBjbGFzcz1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgXCJcbiAgICAgIHNlbS1pbXBvcnRhbmNlPVwic2Vjb25kYXJ5XCJcbiAgICAgICNjaGF0T3ZlcmxheT1cImNka092ZXJsYXlPcmlnaW5cIlxuICAgICAgY2RrT3ZlcmxheU9yaWdpblxuICAgICAgKGNsaWNrKT1cIm9wZW5UZXN0QSghaXNUZXN0QU9wZW5lZClcIlxuICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1wcm9maWxlLWFjY2VudFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBhdGgxXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwicGF0aDJcIj48L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8c2VtdWktb3ZlcmxheS1kaWFsb2dcbiAgICAgIFtvdmVybGF5T3JpZ2luXT1cImNoYXRPdmVybGF5XCJcbiAgICAgIFtpc09wZW5lZF09XCJpc1Rlc3RBT3BlbmVkXCJcbiAgICAgIChjbG9zZSk9XCJvcGVuVGVzdEEoZmFsc2UpXCJcbiAgICAgIChvcGVuKT1cIm9wZW5UZXN0QSh0cnVlKVwiXG4gICAgICBbb3ZlcmxheVdpZHRoXT1cIidhdXRvJ1wiXG4gICAgPlxuICAgICAgICA8c2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsXG4gICAgICAgICAgW2NvbmZpZ109XCJwYWdpbmF0aW9uQ29uZmlnXCJcbiAgICAgICAgICAoc2VsZWN0ZWQpPVwic2VsZWN0ZWRJdGVtKCRldmVudClcIlxuICAgICAgICAgIChjbG9zZSk9XCJjbG9zZU92ZXJsYXkoJGV2ZW50KVwiPlxuICAgICAgICA8L3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbD5cblxuICAgIDwvc2VtdWktb3ZlcmxheS1kaWFsb2c+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7YmFja2dyb3VuZC1jb2xvcjojZjVlNWU1O2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjOGIwMDAwO2hlaWdodDoxMDAlfS5lbWJlZC1jb250YWluZXJ7aGVpZ2h0OjEwMHZofWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIHdpZGdldCA9IHtcbiAgICBjb21wb25lbnROYW1lOiAnJyxcbiAgICBkYXRhOiB7XG4gICAgICAgIGNoYW5uZWxJZDogJ1VDNHJsQVZnQUswU0drLXlUZmU0OFFwdycsXG4gICAgICAgIGNoYW5uZWxUaXRsZTogJ0JSSUdIVCBTSURFJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdIb3cgdG8gU3RheSBIZWFsdGh5LiBXZSBhbGwgaGF2ZSBkYXlzIHdoZW4gd2UgZmVlbCBhYnNvbHV0ZWx5IGV4aGF1c3RlZCBvciBzb21ldGltZXMgYSBsaXR0bGUgZG93biBpbiB0aGUgZHVtcHMuIEJ1dCBpZiB5b3UgZmluZCB5b3Vyc2VsZiBjb25zdGFudGx5IGNhdGNoaW5nIC4uLicsXG4gICAgICAgIHRodW1ibmFpbFVybDogJ2h0dHBzOi8vaS55dGltZy5jb20vdmkva3lvUzFlZFk1dE0vaHFkZWZhdWx0LmpwZycsXG4gICAgICAgIHRpdGxlOiAnMTAgV2FybmluZyBTaWducyBZb3UgSGF2ZSBWaXRhbWluIEQgRGVmaWNpZW5jeScsXG4gICAgICAgIHZpZGVvSWQ6ICdreW9TMWVkWTV0TSdcbiAgICAgIH1cbiAgfTtcblxuXG4gIHB1YmxpYyBpc09wZW5lZDogYm9vbGVhbjtcbiAgcHVibGljIGlzVGVzdEFPcGVuZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy5pbmplY3Rvci5nZXQoJ3dpZGdldCcpO1xuICAgIGlmKHRoaXMud2lkZ2V0LmNvbXBvbmVudE5hbWUgPT09ICdTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudCcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdHb3QgdGhlIHd5c2l3eWcgZGF0YScsIHRoaXMud2lkZ2V0KTtcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkNvbmZpZzogUGFnaW5hdGlvbkluc3RhbmNlID0ge1xuICAgIGlkOiAnY3VzdG9tJyxcbiAgICBpdGVtc1BlclBhZ2U6IDIsXG4gICAgY3VycmVudFBhZ2U6IDFcbiAgfTtcbiAgc2VhcmNoKHF1ZXJ5KTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ3F1ZXJ5IGlzIG91dHB1dGVkJywgcXVlcnkpXG4gIH1cblxuICBzZWxlY3RlZEl0ZW0oaXRlbSk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdpdGVtIHNlbGVjdCcsIGl0ZW0pXG4gICAgdGhpcy53aWRnZXQuZGF0YSA9IGl0ZW07XG4gIH1cbiAgbmdPbkluaXQoKSB7fVxuICBjbG9zZU92ZXJsYXkoaXRlbSk6IHZvaWQge31cblxuICBvcGVuVGVzdEEoaXNPcGVuZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzVGVzdEFPcGVuZWQgPSBpc09wZW5lZDtcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7XG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE5nTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybXNNb2R1bGUsXG4gIFJlYWN0aXZlRm9ybXNNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTZW1NZWRpYVBhbmVsU2V0dGluZ3NDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXBhbmVsL3NlbS1tZWRpYS1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtVXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21lZGlhLWltYWdlLXVwbG9hZC9tZWRpYS11cGxvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbUNyb3BwZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtY3JvcHBlci9tZWRpYS1jcm9wcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1Db250cm9sc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1jb250cm9scy9tZWRpYS1jb250cm9scy5jb21wbmVudCc7XG5pbXBvcnQgeyBTbGlkZVBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3NsaWRlLXBhbmVsL3NsaWRlLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1NZWRpYVNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS1tZWRpYS1zZXR0aW5ncy9zZW0tbWVkaWEtc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZGlhRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1lZGl0L21lZGlhLWVkaXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtVWlLaXRTaGFyZWRNb2R1bGUgfSBmcm9tICcuL3NlbS11aS1zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFNlbU1hdGVyaWFsU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zZW0tbWF0ZXJpYWwtc2hhcmVkLm1vZHVsZSc7XG5cbmltcG9ydCB7IEltYWdlQ3JvcHBlck1vZHVsZSB9IGZyb20gJ25neC1pbWFnZS1jcm9wcGVyJztcbmltcG9ydCB7IEZpbGVEcm9wTW9kdWxlIH0gZnJvbSAnbmd4LWZpbGUtZHJvcCc7XG5pbXBvcnQgeyBBbmd1bGFyQ3JvcHBlcmpzTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1jcm9wcGVyanMnO1xuXG5pbXBvcnQgeyBOZ3hQYWdpbmF0aW9uTW9kdWxlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgWW91dHViZVNhZmVVcmxQaXBlIH0gZnJvbSAnLi9zYWZlLXVybC5waXBlJztcblxuaW1wb3J0IHsgU2VtVmlkZW9TZXR0aW5nc1BhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbC9zZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi9zZW0tdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuL3NlbS1tZWRpYS5zZXJ2aWNlJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTmd4UGFnaW5hdGlvbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEltYWdlQ3JvcHBlck1vZHVsZSxcbiAgICBGaWxlRHJvcE1vZHVsZSxcbiAgICBBbmd1bGFyQ3JvcHBlcmpzTW9kdWxlLFxuICAgIFNlbU1hdGVyaWFsU2hhcmVkTW9kdWxlLFxuICAgIFNlbVVpS2l0U2hhcmVkTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFNlbU1lZGlhUGFuZWxTZXR0aW5nc0NvbXBvbmVudCxcbiAgICBTZW1VcGxvYWRDb21wb25lbnQsXG4gICAgU2VtQ3JvcHBlckNvbXBvbmVudCxcbiAgICBTZW1Db250cm9sc0NvbXBvbmVudCxcbiAgICBTZW1NZWRpYVNldHRpbmdzQ29tcG9uZW50LFxuICAgIE1lZGlhRWRpdENvbXBvbmVudCxcbiAgICBTbGlkZVBhbmVsQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFlvdXR1YmVTYWZlVXJsUGlwZSxcbiAgICBTZW1WaWRlb1NldHRpbmdzUGFuZWxDb21wb25lbnQsXG4gICAgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTZW1NZWRpYVBhbmVsU2V0dGluZ3NDb21wb25lbnQsXG4gICAgU2VtVXBsb2FkQ29tcG9uZW50LFxuICAgIFNlbUNyb3BwZXJDb21wb25lbnQsXG4gICAgU2VtQ29udHJvbHNDb21wb25lbnQsXG4gICAgU2VtTWVkaWFTZXR0aW5nc0NvbXBvbmVudCxcbiAgICBNZWRpYUVkaXRDb21wb25lbnQsXG4gICAgU2xpZGVQYW5lbENvbXBvbmVudCxcbiAgICBTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBTZW1WaWRlb1NldHRpbmdzUGFuZWxDb21wb25lbnQsXG4gICAgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgU2VtTWVkaWFTZXJ2aWNlLFxuICAgIFNlbVZpZGVvU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTZW1NZWRpYU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1NlbU1lZGlhU2VydmljZSwgU2VtVmlkZW9TZXJ2aWNlXVxuICAgIH1c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