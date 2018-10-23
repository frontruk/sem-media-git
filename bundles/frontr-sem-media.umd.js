(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('lodash'), require('rxjs'), require('@angular/common/http'), require('@angular/common'), require('@angular/animations'), require('@angular/forms'), require('@frontr/sem-ui'), require('@angular/cdk/a11y'), require('@angular/cdk/bidi'), require('@angular/cdk/overlay'), require('@angular/cdk/observers'), require('@angular/cdk/platform'), require('@angular/cdk/portal'), require('@angular/cdk/scrolling'), require('@angular/cdk/stepper'), require('@angular/cdk/table'), require('@angular/platform-browser'), require('ngx-image-cropper'), require('ngx-file-drop'), require('angular-cropperjs'), require('ngx-pagination')) :
    typeof define === 'function' && define.amd ? define('@frontr/sem-media', ['exports', '@angular/core', 'lodash', 'rxjs', '@angular/common/http', '@angular/common', '@angular/animations', '@angular/forms', '@frontr/sem-ui', '@angular/cdk/a11y', '@angular/cdk/bidi', '@angular/cdk/overlay', '@angular/cdk/observers', '@angular/cdk/platform', '@angular/cdk/portal', '@angular/cdk/scrolling', '@angular/cdk/stepper', '@angular/cdk/table', '@angular/platform-browser', 'ngx-image-cropper', 'ngx-file-drop', 'angular-cropperjs', 'ngx-pagination'], factory) :
    (factory((global.frontr = global.frontr || {}, global.frontr['sem-media'] = {}),global.ng.core,null,global.rxjs,global.ng.common.http,global.ng.common,global.ng.animations,global.ng.forms,null,global.ng.cdk.a11y,global.ng.cdk.bidi,global.ng.cdk.overlay,global.ng.cdk.observers,global.ng.cdk.platform,global.ng.cdk.portal,global.ng.cdk.scrolling,global.ng.cdk.stepper,global.ng.cdk.table,global.ng.platformBrowser,null,null,null,null));
}(this, (function (exports,i0,_,rxjs,i1,common,animations,forms,semUi,a11y,bidi,overlay,observers,platform,portal,scrolling,stepper,table,platformBrowser,ngxImageCropper,ngxFileDrop,angularCropperjs,ngxPagination) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SemMediaService = (function () {
        function SemMediaService(zone) {
            this.zone = zone;
            this.allImages = [];
            this.tempImage = (({}));
            this.imageComponentChanges = new rxjs.Subject();
            this.imageLoadChanges = new rxjs.Subject();
            this.imageConfigChanges = new rxjs.Subject();
            this.tempChanges = new rxjs.Subject();
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
                    _this.allImages.push(_.cloneDeep(_this.tempImage));
                    _this.imageLoadChanges.next(_.cloneDeep(_this.allImages));
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
                this.imageComponentChanges.next(_.cloneDeep(this.allImages));
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
                this.imageComponentChanges.next(_.cloneDeep(this.allImages));
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        SemMediaService.ctorParameters = function () {
            return [
                { type: i0.NgZone }
            ];
        };
        /** @nocollapse */ SemMediaService.ngInjectableDef = i0.defineInjectable({ factory: function SemMediaService_Factory() { return new SemMediaService(i0.inject(i0.NgZone)); }, token: SemMediaService, providedIn: "root" });
        return SemMediaService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SemVideoService = (function () {
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
                    .get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + query + "\n      &type=video&key=AIzaSyBsuhhgJzgHhC-zSHSakzDgB2H4Ke3gW54");
            };
        SemVideoService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        SemVideoService.ctorParameters = function () {
            return [
                { type: i1.HttpClient, decorators: [{ type: i0.Inject, args: [i1.HttpClient,] }] },
                { type: Object, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] }
            ];
        };
        /** @nocollapse */ SemVideoService.ngInjectableDef = i0.defineInjectable({ factory: function SemVideoService_Factory() { return new SemVideoService(i0.inject(i1.HttpClient), i0.inject(i0.PLATFORM_ID)); }, token: SemVideoService, providedIn: "root" });
        return SemVideoService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SemMediaPanelSettingsComponent = (function () {
        function SemMediaPanelSettingsComponent(platformId) {
            this.platformId = platformId;
            // Please get these outputs working
            this.cropped = new i0.EventEmitter();
            this.uploaded = new i0.EventEmitter();
            this.editImage = new i0.EventEmitter();
            this.deleteImage = new i0.EventEmitter();
            this.changedForm = new i0.EventEmitter();
            this.changedEditMode = new i0.EventEmitter();
            this.showUploadEvent = new i0.EventEmitter();
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
                if (common.isPlatformBrowser(this.platformId)) {
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
                    this.myForm = _.cloneDeep(temp);
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
        /**
         * @return {?}
         */
        SemMediaPanelSettingsComponent.prototype.closeDialog = /**
         * @return {?}
         */
            function () {
            };
        SemMediaPanelSettingsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'sem-panel',
                        template: "<div class=\"dialog-container--header\">\n  <span class=\"sem-icon-back\" (click)=\"showUploadEvent.emit()\"></span>\n\n  <span (click)=\"closeDialog()\">\n    <span class=\"sem-icon-back\"></span>\n    Close\n  </span>\n</div>\n\n<!-- Upload Mode -->\n<sem-upload *ngIf=\"!editVisible\" (doneImage)=\"onImageLoaded($event)\"></sem-upload>\n<!-- Edit Mode -->\n<sem-media-edit\n  *ngIf=\"editVisible\"\n  (selectedEditMode)=\"onChangedMode($event)\"\n  (formChanged)=\"onChangedForm($event)\"\n  [formData]=\"myForm\"\n></sem-media-edit>\n<div *ngIf=\"!editVisible\">\n  <div\n    *ngFor=\"let image of imageNameList; let i = index\"\n    class=\"p2 flex justify-between\">\n    <div>\n      <span class=\"sem-icon-image align-middle\"></span>\n      {{image}}\n    </div>\n    <div>\n      <span class=\"sem-icon-style px1\" (click)=\"onEdit(i)\"></span>\n      <span class=\"sem-icon-delete\" (click)=\"onDelete(i)\"></span>\n    </div>\n  </div>\n</div>\n",
                        styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2,:host .img-cropper{margin-top:1rem}.mr2,:host .img-cropper{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2,:host form{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute,:host .img-cropper{position:absolute}.fixed{position:fixed}.top-0,:host .img-cropper{top:0}.right-0,:host .img-cropper{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host .img-cropper{width:650px}"]
                    },] },
        ];
        SemMediaPanelSettingsComponent.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] }
            ];
        };
        SemMediaPanelSettingsComponent.propDecorators = {
            cropped: [{ type: i0.Output }],
            uploaded: [{ type: i0.Output }],
            editImage: [{ type: i0.Output }],
            deleteImage: [{ type: i0.Output }],
            changedForm: [{ type: i0.Output }],
            changedEditMode: [{ type: i0.Output }],
            showUploadEvent: [{ type: i0.Output }],
            editVisible: [{ type: i0.Input }],
            key: [{ type: i0.Input }],
            imageNameList: [{ type: i0.Input }],
            userImages: [{ type: i0.Input }]
        };
        return SemMediaPanelSettingsComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SemUploadComponent = (function () {
        function SemUploadComponent(zone) {
            this.zone = zone;
            this.doneImage = new i0.EventEmitter();
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
                            var fileEntry = ((droppedFile.fileEntry));
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
                            var fileEntry = ((droppedFile.fileEntry));
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
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
            { type: i0.Component, args: [{
                        selector: 'sem-upload',
                        template: "<div class=\"center\">\n  <div>\n    <file-drop\n      headertext=\"Drop files here\"\n      (onFileDrop)=\"dropped($event)\" \n      (onFileOver)=\"fileOver($event)\"\n      (onFileLeave)=\"fileLeave($event)\"\n      customstyle=\"drop-area\"\n    ></file-drop>\n    <label for=\"file-upload\" class=\"upload-btn\">\n      Choose file\n    </label>\n    <input\n      id=\"file-upload\"\n      type=\"file\"\n      (change)=\"fileChangeEvent($event)\"\n      accept=\"image/*\"\n      multiple>\n  </div>\n</div>",
                        styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host .control{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1,:host .control{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .control,:host .upload-btn{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2,:host .upload-btn{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative,:host .control{position:relative}.absolute,:host .control .label-icon{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{display:block;padding:1rem}:host input[type=file]{display:none}:host input[type=checkbox]{display:none}:host .upload-btn{background:#05dcb6;color:#fff;border-radius:12px 12px 0}:host .control{color:#fff;width:100%;border-radius:12px 12px 0;background-color:#444d63}:host .control:focus{outline:0}:host .control .label-icon{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:1em}"]
                    },] },
        ];
        SemUploadComponent.ctorParameters = function () {
            return [
                { type: i0.NgZone }
            ];
        };
        SemUploadComponent.propDecorators = {
            doneImage: [{ type: i0.Output }]
        };
        return SemUploadComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SemCropperComponent = (function () {
        function SemCropperComponent(zone, _mediaService) {
            this.zone = zone;
            this._mediaService = _mediaService;
            this.config = {};
            this.enabledCropper = new i0.EventEmitter();
            this.croppedImageEvent = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'sem-cropper',
                        template: "<div\n  class=\"img-cropper\"\n  (mouseenter)=\"onMouseEnter()\"\n  (mouseleave)=\"onMouseLeave()\">\n  <div class=\"edit-overlay\" [class.active]=\"hoverActive\" (dblclick)=\"editImage()\">\n    <button *ngIf=\"hoverActive\" [@enterAnimation] class=\"p3\" (click)=\"editImage()\">Edit Me!</button>\n  </div>\n  <img\n    *ngIf=\"!croppedImage && !editMode\"\n    [src]=\"imageData\"\n    class=\"preview-image\"\n    (dblclick)=\"editImage()\"\n  >\n  <angular-cropper\n    *ngIf=\"editMode\"\n    #imageCropper\n    [cropperOptions]=\"cropperConfig\"\n    [imageUrl]=\"imageData\"\n  ></angular-cropper>\n  <img\n    *ngIf=\"croppedImage && !editMode\"\n    [src]=\"croppedImage\"\n    class=\"fit\"\n    [ngStyle]=\"croppedStyle\"\n    (dblclick)=\"editImage()\">\n  \n</div>\n",
                        styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .edit-overlay button{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3,:host .edit-overlay button{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{display:block}:host .img-cropper{position:relative}:host .preview-image{width:100%}:host .edit-overlay{position:absolute;top:0;left:0;width:100%;height:100%;transition:.2s ease-in}:host .edit-overlay.active{background-color:rgba(0,0,0,.2)}:host .edit-overlay button{background-color:rgba(255,255,255,.6);position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}"],
                        animations: [
                            animations.trigger('enterAnimation', [
                                animations.transition(':enter', [
                                    animations.style({ opacity: 0 }),
                                    animations.animate('500ms', animations.style({ opacity: 1 }))
                                ]),
                                animations.transition(':leave', [
                                    animations.style({ opacity: 1 }),
                                    animations.animate('500ms', animations.style({ opacity: 0 }))
                                ])
                            ])
                        ],
                    },] },
        ];
        SemCropperComponent.ctorParameters = function () {
            return [
                { type: i0.NgZone },
                { type: SemMediaService }
            ];
        };
        SemCropperComponent.propDecorators = {
            imageCropper: [{ type: i0.ViewChild, args: ['imageCropper',] }],
            imageData: [{ type: i0.Input }],
            croppedImage: [{ type: i0.Input }],
            config: [{ type: i0.Input }],
            editMode: [{ type: i0.Input }],
            key: [{ type: i0.Input }],
            enabledCropper: [{ type: i0.Output }],
            croppedImageEvent: [{ type: i0.Output }]
        };
        return SemCropperComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SemControlsComponent = (function () {
        function SemControlsComponent() {
            this.pressedFit = new i0.EventEmitter();
            this.pressedCrop = new i0.EventEmitter();
            this.pressedRotateLeft = new i0.EventEmitter();
            this.pressedRotateRight = new i0.EventEmitter();
            this.pressedZoomIn = new i0.EventEmitter();
            this.pressedZoomOut = new i0.EventEmitter();
        }
        SemControlsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'sem-controls',
                        template: "<div class=\"flex my1\">\n  <div class=\"col-6 px1\">\n    <div>\n      <button for=\"fit-control\" class=\"control\" (click)=\"pressedFit.emit()\">\n        <span class=\"sem-icon-resize label-icon\"></span>Fit\n      </button>\n    </div>\n    <div>\n      <button for=\"rotate-left-control\" class=\"control\" (click)=\"pressedRotateLeft.emit()\">\n        <span class=\"sem-icon-resize label-icon\"></span>Rotate Left\n      </button>\n    </div>\n    <div>\n      <button for=\"zoom-in-control\" class=\"control\" (click)=\"pressedZoomIn.emit()\">\n        <span class=\"sem-icon-resize label-icon\"></span>Zoom in\n      </button>\n    </div>\n  </div>\n  <div class=\"col-6 px1\">\n      <div>\n        <button for=\"crop-control\" class=\"control\" (click)=\"pressedCrop.emit()\">\n          <span class=\"sem-icon-resize label-icon\"></span>Crop\n        </button>\n      </div>\n      <div>\n        <button for=\"rotate-right-control\" class=\"control\" (click)=\"pressedRotateRight.emit()\">\n          <span class=\"sem-icon-resize label-icon\"></span>Rotate right\n        </button>\n      </div>\n      <div>\n        <button for=\"zoom-out-control\" class=\"control\" (click)=\"pressedZoomOut.emit()\">\n          <span class=\"sem-icon-resize label-icon\"></span>Zoom out\n        </button>\n      </div>\n  </div>\n</div>",
                        styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host .control{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1,:host .control{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .control{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative,:host .control{position:relative}.absolute,:host .control .label-icon{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host .control{color:#fff;width:100%;border-radius:12px 12px 0;background-color:#444d63}:host .control:focus{outline:0}:host .control .label-icon{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:1em}"],
                    },] },
        ];
        SemControlsComponent.propDecorators = {
            pressedFit: [{ type: i0.Output }],
            pressedCrop: [{ type: i0.Output }],
            pressedRotateLeft: [{ type: i0.Output }],
            pressedRotateRight: [{ type: i0.Output }],
            pressedZoomIn: [{ type: i0.Output }],
            pressedZoomOut: [{ type: i0.Output }]
        };
        return SemControlsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SlidePanelComponent = (function () {
        function SlidePanelComponent() {
            this.activePane = 'left';
        }
        SlidePanelComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'sem-slide-panel',
                        styles: [":host{display:block;overflow:hidden}.panes{height:100%;width:200%;transition-duration:.5s;display:flex}.panes div{flex:1}"],
                        template: "<div class=\"panes\" [@slide]=\"activePane\">\n  <div><ng-content select=\"[leftPane]\"></ng-content></div>\n  <div><ng-content select=\"[rightPane]\"></ng-content></div>\n</div>",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        animations: [
                            animations.trigger('slide', [
                                animations.state('left', animations.style({ transform: 'translateX(0)' })),
                                animations.state('right', animations.style({ transform: 'translateX(-50%)' })),
                                animations.transition('left <=> right', animations.animate('1s'))
                            ])
                        ]
                    },] },
        ];
        SlidePanelComponent.propDecorators = {
            activePane: [{ type: i0.Input }]
        };
        return SlidePanelComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SemMediaSettingsComponent = (function () {
        function SemMediaSettingsComponent(_mediaService, _fb) {
            this._mediaService = _mediaService;
            this._fb = _fb;
            this.pressedImages = new i0.EventEmitter();
            this.pressedDelete = new i0.EventEmitter();
            this.pressedDuplicate = new i0.EventEmitter();
            this.pressedSettings = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'sem-settings',
                        template: "<div>\n  <div class=\"dialog-container--header\">\n    <span class=\"sem-icon-back\" (click)=\"isLeftVisible=true\"></span>\n  </div>\n  <sem-slide-panel [activePane]=\"isLeftVisible? 'left': 'right'\">\n    <div leftPane>\n      <div semui-section-body class=\"p2\">\n        <ul semui-list class=\"user-nav\">\n          <li\n            semui-list-item\n            list-item\n            semui-importance=\"dark\"\n            class=\"py1\"\n            (click)=\"onImages()\"\n          >\n            <i class=\"sem-icon-style default\"  aria-hidden=\"true\"></i>\n            <span> Images</span>\n          </li>\n          <li\n            semui-list-item\n            list-item\n            semui-importance=\"dark\"\n            class=\"py1\"\n            (click)=\"onSettings()\"\n          >\n            <i class=\"sem-icon-settings default\"  aria-hidden=\"true\"></i>\n            <span> Settings</span>\n          </li>\n          <li\n            semui-list-item\n            list-item\n            semui-importance=\"dark\"\n            class=\"py1\"\n            (click)=\"onDuplicate()\"\n          >\n            <i class=\"sem-icon-sites default\"  aria-hidden=\"true\"></i>\n            <span> Duplicate</span>\n          </li>\n          <li\n            semui-list-item\n            list-item\n            semui-importance=\"dark\"\n            class=\"py1\"\n            (click)=\"onDelete()\"\n          >\n            <i class=\"sem-icon-delete default\"  aria-hidden=\"true\"></i>\n            <span> Delete</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <div rightPane>\n      <form [formGroup]=\"viewModeForm\" class=\"p2\">\n        <input type=\"radio\"\n        value=\"grid\"\n        id=\"grid\"\n        formControlName=\"viewMode\">\n        <label for=\"grid\"><span class=\"sem-icon-style default\"></span></label>\n        <input type=\"radio\"\n          value=\"carousel\"\n          id=\"carousel\"\n          formControlName=\"viewMode\">\n        <label for=\"carousel\"><span class=\"sem-icon-settings default\"></span></label>\n        <input type=\"radio\"\n          value=\"list\"\n          id=\"list\"\n          formControlName=\"viewMode\">\n        <label for=\"list\"><span class=\"sem-icon-settings default\"></span></label>\n      </form>\n      {{viewModeForm.value | json}}\n    </div>\n  </sem-slide-panel>\n\n\n</div>\n",
                        styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex,:host form{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around,:host form{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host form input[type=radio]{display:none}:host form input[type=radio]:checked+label{background:#ccc}:host form label span{font-size:30px}"]
                    },] },
        ];
        SemMediaSettingsComponent.ctorParameters = function () {
            return [
                { type: SemMediaService },
                { type: forms.FormBuilder }
            ];
        };
        SemMediaSettingsComponent.propDecorators = {
            pressedImages: [{ type: i0.Output }],
            pressedDelete: [{ type: i0.Output }],
            pressedDuplicate: [{ type: i0.Output }],
            pressedSettings: [{ type: i0.Output }]
        };
        return SemMediaSettingsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MediaEditComponent = (function () {
        function MediaEditComponent(_fb) {
            this._fb = _fb;
            this.selectedEditMode = new i0.EventEmitter();
            this.formChanged = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'sem-media-edit',
                        template: "<form [formGroup]=\"myForm\" class=\"p2\">\n  <label>All Text</label>\n  <input type=\"text\"\n    class=\"sem-input\"\n    id=\"all-text\"\n    formControlName=\"allText\">\n  <label>Meta Title</label>\n  <input type=\"text\"\n    class=\"sem-input\"\n    id=\"meta-title\"\n    formControlName=\"metaTitle\">\n</form>\n<sem-controls\n  (pressedFit)=\"onPress('FIT')\"\n  (pressedCrop)=\"onPress('CROP')\"\n  (pressedRotateLeft)=\"onPress('ROTATE_LEFT')\"\n  (pressedRotateRight)=\"onPress('ROTATE_RIGHT')\"\n  (pressedZoomIn)=\"onPress('ZOOM_IN')\"\n  (pressedZoomOut)=\"onPress('ZOOM_OUT')\">\n</sem-controls>\n<div class=\"px2 flex justify-end\">\n  <button for=\"crop-control\" class=\"control\" (click)=\"onPress('APPLY')\" >\n    Apply\n  </button>\n</div>\n<!-- <div><pre><code>{{ myForm?.value | json }}</code></pre></div> -->\n",
                        styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host .control{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1,:host .control{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .control{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3,:host .control{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative,:host .control{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host .control{color:#fff;border:none;border-radius:12px 12px 0;background-color:#05dcb6}:host .control:focus{outline:0}"]
                    },] },
        ];
        MediaEditComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder }
            ];
        };
        MediaEditComponent.propDecorators = {
            selectedEditMode: [{ type: i0.Output }],
            formChanged: [{ type: i0.Output }],
            formData: [{ type: i0.Input }]
        };
        return MediaEditComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SemMediaContainerComponent = (function () {
        function SemMediaContainerComponent(_mediaService, injector) {
            // this.widget = this.injector.get('widget');
            // if(this.widget.componentName === 'SemMediaContainerComponent') {
            //   console.log('Got the wysiwyg data', this.widget);
            // }
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (allImages_1_1 && !allImages_1_1.done && (_a = allImages_1.return))
                            _a.call(allImages_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                setTimeout(function () {
                    _this.editVisible = editMode;
                });
                var e_1, _a;
            });
            this._mediaService.imageConfigChanges.subscribe(function (config) {
                _this.config = _.cloneDeep(config);
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
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (allImages_2_1 && !allImages_2_1.done && (_a = allImages_2.return))
                            _a.call(allImages_2);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
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
            { type: i0.Component, args: [{
                        selector: 'sem-media-container',
                        template: "<div class=\"sem-dnd-container sem-media-container\">\n  <div class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      corner=\"top-right\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"secondary\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openTestA(!isTestAOpened)\"\n    >\n        <span class=\"sem-icon-profile-accent\">\n        <span class=\"path1\"></span><span class=\"path2\"></span>\n        </span>\n    </button>\n    <semui-overlay-dialog\n      [overlayOrigin]=\"chatOverlay\"\n      [isOpened]=\"isTestAOpened\"\n      (close)=\"openTestA(false)\"\n      (open)=\"openTestA(true)\"\n      [overlayWidth]=\"'auto'\"\n    >\n\n      <div *ngIf=\"uploadPanelFlag\" class=\"temp-container dialog-container bg-default left\">\n        <div class=\"dialog-container--body\">\n          <sem-panel\n            [editVisible]=\"editVisible\"\n            [key]=\"key\"\n            [imageNameList]=\"imageNameList\"\n            (cropped)=\"croppedImage($event)\"\n            (uploaded)=\"uploadedImage($event)\"\n            (changedForm)=\"onChangedForm($event)\"\n            (editImage)=\"onEditImage($event)\"\n            (deleteImage)=\"onDeleteImage($event)\"\n            (changedEditMode)=\"onChangedEditMode($event)\"\n            (showUploadEvent)=\"editVisible = false\"\n            [userImages]=\"userImages\"\n          ></sem-panel>\n        </div>\n      </div>\n      <div *ngIf=\"!uploadPanelFlag\"\n           class=\"settings-container dialog-container bg-default mt4\">\n        <sem-settings\n          (pressedImages)=\"onMenu('IMAGES')\"\n          (pressedDuplicate)=\"onMenu('DUPLICATE')\"\n          (pressedSettings)=\"onMenu('SETTINGS')\"\n          (pressedDelete)=\"onMenu('DELETE')\"\n        >\n        </sem-settings>\n      </div>\n\n    </semui-overlay-dialog>\n  </div>\n</div>\n\n\n<div class=\"flex flex-column\">\n\n  <!-- <pre>{{tempImages | json}}</pre> -->\n</div>\n<div *ngIf=\"userImages\" class=\"preview-container\">\n  <sem-cropper\n    *ngFor=\"let image of userImages;let key = index\"\n    [imageData]=\"image.uploadedImage\"\n    [croppedImage]=\"image.croppedImage\"\n    [editMode]=\"image.editMode\"\n    [config]=\"config\"\n    [key]=\"key\"\n    (enabledCropper)=\"onEnableEditImage(key)\"\n    (croppedImageEvent)=\"onCroppedImage(key, $event)\"\n  ></sem-cropper>\n</div>\n",
                        styles: [":host(){background-color:#f5e5e5;display:block;border:1px solid #8b0000;height:100%}"]
                    },] },
        ];
        SemMediaContainerComponent.ctorParameters = function () {
            return [
                { type: SemMediaService },
                { type: i0.Injector }
            ];
        };
        return SemMediaContainerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var UiSharedModules = [
        semUi.SemUiButtonModule,
        semUi.SemUiButtonFabModule,
        semUi.SemUiOverlayDialogModule,
        semUi.SemUiTabsModule,
        semUi.SemUiThumbnailLargeModule
    ];
    var SemUiKitSharedModule = (function () {
        function SemUiKitSharedModule() {
        }
        SemUiKitSharedModule.decorators = [
            { type: i0.NgModule, args: [{
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
        a11y.A11yModule,
        bidi.BidiModule,
        observers.ObserversModule,
        overlay.OverlayModule,
        platform.PlatformModule,
        portal.PortalModule,
        scrolling.ScrollDispatchModule,
        stepper.CdkStepperModule,
        table.CdkTableModule,
    ];
    var SemMaterialSharedModule = (function () {
        function SemMaterialSharedModule() {
        }
        SemMaterialSharedModule.decorators = [
            { type: i0.NgModule, args: [{
                        exports: __spread(MATERIAL_MODULES)
                    },] },
        ];
        return SemMaterialSharedModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var YoutubeSafeUrlPipe = (function () {
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
            { type: i0.Pipe, args: [{
                        name: 'youtubeSafeUrl'
                    },] },
        ];
        YoutubeSafeUrlPipe.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer }
            ];
        };
        return YoutubeSafeUrlPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var VideoModel = (function () {
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
    var SemVideoSettingsPanelComponent = (function () {
        function SemVideoSettingsPanelComponent(semVideoService) {
            this.semVideoService = semVideoService;
            this.close = new i0.EventEmitter();
            this.selected = new i0.EventEmitter();
            this.results = [];
            this.page = 1;
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
        /**
         * @return {?}
         */
        SemVideoSettingsPanelComponent.prototype.closeDialog = /**
         * @return {?}
         */
            function () {
                this.close.emit(false);
            };
        SemVideoSettingsPanelComponent.decorators = [
            { type: i0.Component, args: [{
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        // tslint:disable-next-line:component-selector,
                        selector: '[sem-video-settings-panel]',
                        template: "<div class=\"dialog-container--header\">\n  <span (click)=\"closeDialog()\">\n    <span class=\"sem-icon-back\"></span>\n    Close\n  </span>\n</div>\n<div class=\"dialog-container--body_spaced bg-default\">\n  <div semui-tabs #tabsVertical [showTabs]=\"true\" [vertical]=\"true\" >\n    <div semui-tab #tabsV1 [title]=\"'Video Url'\">\n      <div semui-section-body>\n        Tab 1 content\n      </div>\n    </div>\n    <div semui-tab #tabsV2 [title]=\"'Search'\">\n      <div class=\"sem-video-container\">\n          <!-- Section Body -->\n          <div semui-section-body>\n            <!-- Search -->\n            <div>\n              <div>\n                <!-- YouTube Search -->\n                <label>Search Youtube</label>\n                <span class=\"input-prefix\">\n                  <span class=\"sem-icon-search prefix\"></span>\n                   <input\n                     type=\"text\"\n                     class=\"sem-input\"\n                     name=\"search\"\n                     id=\"search\"\n                     placeholder=\"Search\"\n                     autofocus\n                     (keyup)=\"search(textBox.value)\"\n                     #textBox\n                   />\n                </span>\n              </div>\n              <span  field-prefix class=\"icon icon-search prefix\"></span>\n              <div class=\"sem-video-container--results\">\n\n                <div *ngIf=\"results.length == 0\" class=\"sem-video-container--results_item\">\n                  <figure semui-thumbnail class=\"pt2\">\n                         <span class=\"sem-video-container--results_preview\" card-image></span>\n                          <figcaption sem-section-footer>\n                            <div class=\"figcaption-container\">\n                                <h2 class=\"primary-caption\">\n                                  Loding\n                                </h2>\n                                <span class=\"sub-caption\">\n                                Loding\n                                </span>\n                            </div>\n                          </figcaption>\n                  </figure>\n                </div>\n                <div *ngFor=\"let item of results | paginate: config\" class=\"sem-video-container--results_item\">\n                    <figure semui-thumbnail class=\"pt2\">\n                      <span class=\"sem-video-container--results_preview\" card-image>\n                          <img *ngIf=\"item.thumbnailUrl\" [src]=\"item.thumbnailUrl\"  />\n                      </span>\n                      <figcaption sem-section-footer>\n                        <div class=\"figcaption-container\">\n                          <h2\n                            class=\"primary-caption\"\n                          >\n                            {{ item.title}}\n                          </h2>\n                          <span\n                            class=\"sub-caption\">\n                           {{ item.publishedAt}}\n                          </span>\n                          <br/>\n                          <span\n                            class=\" relative sem-button-- sem-button sem-button--primary\"\n                            card-setting-button (click)=\"addVideo(item)\"\n                          >\n                            Add this\n                          </span>\n                          <!--<button-->\n                            <!--sem-btn-fab-->\n                            <!--corner=\"none\"-->\n                            <!--semui-theme=\"light\"-->\n                            <!--sem-importance=\"default\"-->\n                            <!--card-setting-button (click)=\"loadSettings()\"-->\n                          <!--&gt;-->\n                            <!--<span class=\"sem-icon-ellipse\"></span>-->\n                          <!--</button>-->\n                        </div>\n                      </figcaption>\n                    </figure>\n                </div>\n              </div>\n            </div>\n          </div>\n          <!-- Section Footer -->\n          <div semui-section-footer>\n              <pagination-template\n                class=\"sem-pagination-container py2\"\n                #p=\"paginationApi\"\n                [id]=\"config.id\"\n                (pageChange)=\"config.currentPage = $event\">\n                <div class=\"sem-pagination-nav\">\n                  <div\n                    class=\"sem-pagination-previous\"\n                    [class.disabled]=\"p.isFirstPage()\">\n                    <a *ngIf=\"!p.isFirstPage()\" (click)=\"p.previous()\"> < </a>\n                  </div>\n                  <div\n                    *ngFor=\"let page of p.pages\"\n                    class=\"sem-pagination\"\n                    [class.active]=\"p.getCurrent() === page.value\">\n                    <a (click)=\"p.setCurrent(page.value)\" *ngIf=\"p.getCurrent() !== page.value\">\n                      {{ page.label }}\n                    </a>\n                    <div *ngIf=\"p.getCurrent() === page.value\">\n                      {{ page.label }}\n                    </div>\n                  </div>\n                  <div\n                    class=\"sem-pagination-next\"\n                    [class.disabled]=\"p.isLastPage()\">\n                    <a *ngIf=\"!p.isLastPage()\" (click)=\"p.next()\"> > </a>\n                  </div>\n                </div>\n              </pagination-template>\n\n          </div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                        styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{background:#fff}.sem-video-container{width:210px}.sem-video-container--results_preview{min-height:96px;display:block;background-color:#dedede}"]
                    },] },
        ];
        SemVideoSettingsPanelComponent.ctorParameters = function () {
            return [
                { type: SemVideoService }
            ];
        };
        SemVideoSettingsPanelComponent.propDecorators = {
            close: [{ type: i0.Output }],
            selected: [{ type: i0.Output }],
            config: [{ type: i0.Input }]
        };
        return SemVideoSettingsPanelComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SemVideoContainerComponent = (function () {
        function SemVideoContainerComponent(injector) {
            this.injector = injector;
            this.dataChange = new i0.EventEmitter();
            this.isTestAOpened = false;
            this.paginationConfig = {
                id: 'custom',
                itemsPerPage: 2,
                currentPage: 1
            };
        }
        /**
         * @param {?} item
         * @return {?}
         */
        SemVideoContainerComponent.prototype.selectedItem = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                // this.dataChange.emit(item);
                // TODO Need enable this when you test it
                this.data = item;
            };
        /**
         * @return {?}
         */
        SemVideoContainerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        /**
         * @param {?} toggleStatus
         * @return {?}
         */
        SemVideoContainerComponent.prototype.closeOverlay = /**
         * @param {?} toggleStatus
         * @return {?}
         */
            function (toggleStatus) {
                this.isTestAOpened = toggleStatus;
            };
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
            { type: i0.Component, args: [{
                        // tslint:disable-next-line:component-selector,
                        selector: '[sem-video-container]',
                        template: "\n<div class=\"sem-dnd-container\">\n  <div class=\"embed-container\" *ngIf=\"data && data.hasOwnProperty('videoId')\">\n    <iframe width=\"100%\"\n    height=\"100%\"\n    frameborder=\"0\"\n    allowfullscreen\n    [src]=\"data.videoId | youtubeSafeUrl\"\n    style=\"border: solid 1px black\" >\n    </iframe>\n  </div>\n  <div class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      corner=\"top-right\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"secondary\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openTestA(!isTestAOpened)\"\n    >\n        <span class=\"sem-icon-profile-accent\">\n        <span class=\"path1\"></span><span class=\"path2\"></span>\n        </span>\n    </button>\n    <semui-overlay-dialog\n      [overlayOrigin]=\"chatOverlay\"\n      [isOpened]=\"isTestAOpened\"\n      (close)=\"openTestA(false)\"\n      (open)=\"openTestA(true)\"\n      [overlayWidth]=\"'auto'\"\n    >\n        <div sem-video-settings-panel\n          [config]=\"paginationConfig\"\n          (selected)=\"selectedItem($event)\"\n          (close)=\"closeOverlay($event)\">\n        </div>\n\n    </semui-overlay-dialog>\n  </div>\n</div>\n",
                        styles: [":host{background-color:#f5e5e5;display:block;border:1px solid #8b0000}"]
                    },] },
        ];
        SemVideoContainerComponent.ctorParameters = function () {
            return [
                { type: i0.Injector }
            ];
        };
        SemVideoContainerComponent.propDecorators = {
            data: [{ type: i0.Input }],
            dataChange: [{ type: i0.Output }]
        };
        return SemVideoContainerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SemMediaModule = (function () {
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
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            i1.HttpClientModule,
                            ngxPagination.NgxPaginationModule,
                            forms.ReactiveFormsModule,
                            ngxImageCropper.ImageCropperModule,
                            ngxFileDrop.FileDropModule,
                            angularCropperjs.AngularCropperjsModule,
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

    exports.SemMediaService = SemMediaService;
    exports.SemVideoService = SemVideoService;
    exports.SemMediaModule = SemMediaModule;
    exports.SemControlsComponent = SemControlsComponent;
    exports.SemCropperComponent = SemCropperComponent;
    exports.MediaEditComponent = MediaEditComponent;
    exports.SemUploadComponent = SemUploadComponent;
    exports.SlidePanelComponent = SlidePanelComponent;
    exports.SemMediaContainerComponent = SemMediaContainerComponent;
    exports.SemMediaPanelSettingsComponent = SemMediaPanelSettingsComponent;
    exports.SemMediaSettingsComponent = SemMediaSettingsComponent;
    exports.SemVideoContainerComponent = SemVideoContainerComponent;
    exports.SemVideoSettingsPanelComponent = SemVideoSettingsPanelComponent;
    exports.VideoModel = VideoModel;
    exports.ɵc = YoutubeSafeUrlPipe;
    exports.ɵa = SemMaterialSharedModule;
    exports.ɵb = SemUiKitSharedModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRyLXNlbS1tZWRpYS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9zZW0tbWVkaWEuc2VydmljZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS12aWRlby5zZXJ2aWNlLnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvY29udGFpbmVycy9zZW0tbWVkaWEtcGFuZWwvc2VtLW1lZGlhLXBhbmVsLmNvbXBvbmVudC50cyIsbnVsbCwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvY29tcG9uZW50cy9tZWRpYS1pbWFnZS11cGxvYWQvbWVkaWEtdXBsb2FkLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbXBvbmVudHMvbWVkaWEtY3JvcHBlci9tZWRpYS1jcm9wcGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbXBvbmVudHMvbWVkaWEtY29udHJvbHMvbWVkaWEtY29udHJvbHMuY29tcG5lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb21wb25lbnRzL3NsaWRlLXBhbmVsL3NsaWRlLXBhbmVsLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXNldHRpbmdzL3NlbS1tZWRpYS1zZXR0aW5ncy5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb21wb25lbnRzL21lZGlhLWVkaXQvbWVkaWEtZWRpdC5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9zZW0tdWktc2hhcmVkLm1vZHVsZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS1tYXRlcmlhbC1zaGFyZWQubW9kdWxlLnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvc2FmZS11cmwucGlwZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL21vZGVscy92aWRlby50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbnRhaW5lcnMvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsL3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbC5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9zZW0tbWVkaWEubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW1hZ2VNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2ltYWdlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2VtTWVkaWFTZXJ2aWNlIHtcbiAgYWxsSW1hZ2VzPzogQXJyYXk8SW1hZ2VNb2RlbD4gPSBbXTtcbiAgdGVtcEltYWdlOiBJbWFnZU1vZGVsID0ge30gYXMgYW55O1xuICBwdWJsaWMgaW1hZ2VDb21wb25lbnRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBpbWFnZUxvYWRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBpbWFnZUNvbmZpZ0NoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIHRlbXBDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMudGVtcEltYWdlLmVkaXRNb2RlID0gZmFsc2UsXG4gICAgdGhpcy50ZW1wSW1hZ2UuZmlsZU5hbWUgPSAnJztcbiAgICB0aGlzLnRlbXBJbWFnZS5jb250cm9sQm94ID0ge1xuICAgICAgYWxsVGV4dDogJycsXG4gICAgICBtZXRhVGl0bGU6ICcnLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGZpdDogZmFsc2UsXG4gICAgICAgIGNyb3A6IGZhbHNlLFxuICAgICAgICB6b29tOiAwLFxuICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgIGFwcGx5OiBmYWxzZSxcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMudGVtcEltYWdlLmNyb3BwZWRJbWFnZSA9ICcnO1xuICAgIHRoaXMudGVtcEltYWdlLnVwbG9hZGVkSW1hZ2UgPSAnJztcbiAgfVxuICBwdWJsaWMgb25Mb2FkRW5kKGV2ZW50LCBmaWxlTmFtZSkge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2UuZmlsZU5hbWUgPSBmaWxlTmFtZTtcbiAgICAgIHRoaXMudGVtcEltYWdlLnVwbG9hZGVkSW1hZ2UgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgLy8gdGhpcy5kaXNhYmxlQWxsSW1hZ2VFZGl0KCk7XG4gICAgICB0aGlzLmFsbEltYWdlcy5wdXNoKF8uY2xvbmVEZWVwKHRoaXMudGVtcEltYWdlKSk7XG4gICAgICB0aGlzLmltYWdlTG9hZENoYW5nZXMubmV4dChfLmNsb25lRGVlcCh0aGlzLmFsbEltYWdlcykpO1xuICAgIH0pO1xuICB9XG4gIHB1dEltYWdlKGltYWdlOiBGaWxlKSB7XG4gICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZmlsZVJlYWRlci5vbmxvYWRlbmQgPSAoZSkgPT4gdGhpcy5vbkxvYWRFbmQoZSwgaW1hZ2UubmFtZSk7XG4gICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGltYWdlKTtcbiAgfVxuICBwdXRDcm9wcGVkSW1hZ2Uoa2V5OiBudW1iZXIsIGNyb3BwZWRJbWFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5hbGxJbWFnZXNba2V5XS5jcm9wcGVkSW1hZ2UgPSBjcm9wcGVkSW1hZ2U7XG4gICAgdGhpcy5hbGxJbWFnZXNba2V5XS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBkaXNhYmxlQWxsSW1hZ2VFZGl0KCkge1xuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHRoaXMuYWxsSW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFsbEltYWdlc1tpXS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3JtQ2hhbmdlZChpbmRleCwgZm9ybURhdGEpIHtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5hbGxUZXh0ID0gZm9ybURhdGEuYWxsVGV4dDtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5tZXRhVGl0bGUgPSBmb3JtRGF0YS5tZXRhVGl0bGU7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbiAgb25FZGl0SW1hZ2UoaW5kZXgsIG1vZGUpIHtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgJ0ZJVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5maXQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0NST1AnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuY3JvcCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnWk9PTV9JTic6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy56b29tID0gMC4xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1pPT01fT1VUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnpvb20gPSAtMC4xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1JPVEFURV9MRUZUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnJvdGF0ZSA9IDkwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1JPVEFURV9SSUdIVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5yb3RhdGUgPSAtOTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQVBQTFknOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuYXBwbHkgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLmFsbEltYWdlc1tpbmRleF0uZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuaW1hZ2VDb25maWdDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgLy8gdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuYWxsSW1hZ2VzKSk7XG4gIH1cbiAgb25FZGl0RW5hYmxlKGluZGV4KSB7XG4gICAgdGhpcy5hbGxJbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGkpID0+IHtcbiAgICAgIGlmIChpbmRleCA9PT0gaSkge1xuICAgICAgICBpbWFnZS5lZGl0TW9kZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWFnZS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBjbGVhckNvbmZpZyhpbmRleCkge1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5maXQgPSBmYWxzZTtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuY3JvcCA9IGZhbHNlO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5yb3RhdGUgPSAwO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy56b29tID0gMDtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuYXBwbHkgPSBmYWxzZTtcbiAgfVxuICBvbkRlbGV0ZUltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5hbGxJbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBjbGVhckltYWdlcygpIHtcbiAgICB0aGlzLmFsbEltYWdlcyA9IFtdO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvciggQEluamVjdChIdHRwQ2xpZW50KSBwcm90ZWN0ZWQgcmVhZG9ubHkgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChQTEFURk9STV9JRCkgcHVibGljIHBsYXRmb3JtSWQ6IE9iamVjdCkgeyB9XG5cbiAgcHVibGljIGZldGNoVmlkZW9zKHF1ZXJ5OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQoYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvc2VhcmNoP3BhcnQ9c25pcHBldCZtYXhSZXN1bHRzPTUmcT0ke3F1ZXJ5fVxuICAgICAgJnR5cGU9dmlkZW8ma2V5PUFJemFTeUJzdWhoZ0p6Z0hoQy16U0hTYWt6RGdCMkg0S2UzZ1c1NGApO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LFxuICBPbkNoYW5nZXMsIEluamVjdCwgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUFycmF5LCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1wYW5lbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWhlYWRlclwiPlxuICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIiAoY2xpY2spPVwic2hvd1VwbG9hZEV2ZW50LmVtaXQoKVwiPjwvc3Bhbj5cblxuICA8c3BhbiAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tYmFja1wiPjwvc3Bhbj5cbiAgICBDbG9zZVxuICA8L3NwYW4+XG48L2Rpdj5cblxuPCEtLSBVcGxvYWQgTW9kZSAtLT5cbjxzZW0tdXBsb2FkICpuZ0lmPVwiIWVkaXRWaXNpYmxlXCIgKGRvbmVJbWFnZSk9XCJvbkltYWdlTG9hZGVkKCRldmVudClcIj48L3NlbS11cGxvYWQ+XG48IS0tIEVkaXQgTW9kZSAtLT5cbjxzZW0tbWVkaWEtZWRpdFxuICAqbmdJZj1cImVkaXRWaXNpYmxlXCJcbiAgKHNlbGVjdGVkRWRpdE1vZGUpPVwib25DaGFuZ2VkTW9kZSgkZXZlbnQpXCJcbiAgKGZvcm1DaGFuZ2VkKT1cIm9uQ2hhbmdlZEZvcm0oJGV2ZW50KVwiXG4gIFtmb3JtRGF0YV09XCJteUZvcm1cIlxuPjwvc2VtLW1lZGlhLWVkaXQ+XG48ZGl2ICpuZ0lmPVwiIWVkaXRWaXNpYmxlXCI+XG4gIDxkaXZcbiAgICAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VOYW1lTGlzdDsgbGV0IGkgPSBpbmRleFwiXG4gICAgY2xhc3M9XCJwMiBmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWltYWdlIGFsaWduLW1pZGRsZVwiPjwvc3Bhbj5cbiAgICAgIHt7aW1hZ2V9fVxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXN0eWxlIHB4MVwiIChjbGljayk9XCJvbkVkaXQoaSlcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWRlbGV0ZVwiIChjbGljayk9XCJvbkRlbGV0ZShpKVwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2t7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxe21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10Miw6aG9zdCAuaW1nLWNyb3BwZXJ7bWFyZ2luLXRvcDoxcmVtfS5tcjIsOmhvc3QgLmltZy1jcm9wcGVye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTF7cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDIsOmhvc3QgZm9ybXtwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDN7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZle3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZSw6aG9zdCAuaW1nLWNyb3BwZXJ7cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMCw6aG9zdCAuaW1nLWNyb3BwZXJ7dG9wOjB9LnJpZ2h0LTAsOmhvc3QgLmltZy1jcm9wcGVye3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3QgLmltZy1jcm9wcGVye3dpZHRoOjY1MHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhUGFuZWxTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLy8gUGxlYXNlIGdldCB0aGVzZSBvdXRwdXRzIHdvcmtpbmdcbiAgQE91dHB1dCgpIGNyb3BwZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHVwbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBlZGl0SW1hZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGRlbGV0ZUltYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2VkRm9ybSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY2hhbmdlZEVkaXRNb2RlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzaG93VXBsb2FkRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHVibGljIG15Rm9ybTogYW55ID0ge307XG4gIHB1YmxpYyBpbWFnZUxpc3Q6IEFycmF5PGFueT4gPSBbXTtcbiAgcHVibGljIHZpc2libGVDb250cm9sUGFuZWw6IEJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBlZGl0VmlzaWJsZTogQm9vbGVhbjtcbiAgQElucHV0KCkga2V5OiBudW1iZXI7XG4gIEBJbnB1dCgpIGltYWdlTmFtZUxpc3Q6IEFycmF5PHN0cmluZz47XG4gIEBJbnB1dCgpIHVzZXJJbWFnZXM6IEFycmF5PGFueT47XG5cbiAgY29uc3RydWN0b3IoIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZDogYW55KSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy52aXNpYmxlQ29udHJvbFBhbmVsID0gdGhpcy5lZGl0VmlzaWJsZTtcbiAgICB9XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgaWYgKHRoaXMudXNlckltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0ZW1wID0ge1xuICAgICAgICBhbGxUZXh0OiB0aGlzLnVzZXJJbWFnZXNbdGhpcy5rZXldLmNvbnRyb2xCb3guYWxsVGV4dCxcbiAgICAgICAgbWV0YVRpdGxlOiB0aGlzLnVzZXJJbWFnZXNbdGhpcy5rZXldLmNvbnRyb2xCb3gubWV0YVRpdGxlXG4gICAgICB9O1xuICAgICAgdGhpcy5teUZvcm0gPSBfLmNsb25lRGVlcCh0ZW1wKTtcbiAgICB9XG4gIH1cbiAgb25JbWFnZUxvYWRlZChmaWxlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZpc2libGVDb250cm9sUGFuZWwgPSBmYWxzZTtcbiAgICB0aGlzLnVwbG9hZGVkLmVtaXQoZmlsZSk7XG4gIH1cbiAgb25DaGFuZ2VkTW9kZShtb2RlKSB7XG4gICAgdGhpcy5jaGFuZ2VkRWRpdE1vZGUuZW1pdChtb2RlKTtcbiAgfVxuICBvbkVkaXQoaW5kZXgpIHtcbiAgICB0aGlzLmVkaXRJbWFnZS5lbWl0KGluZGV4KTtcbiAgICB0aGlzLmtleSA9IGluZGV4O1xuICAgIHRoaXMudmlzaWJsZUNvbnRyb2xQYW5lbCA9IHRydWU7XG4gIH1cbiAgb25EZWxldGUoaW5kZXgpIHtcbiAgICB0aGlzLmRlbGV0ZUltYWdlLmVtaXQoaW5kZXgpO1xuICB9XG4gIG9uQ2hhbmdlZEZvcm0oZm9ybURhdGE6IGFueSkge1xuICAgIHRoaXMuY2hhbmdlZEZvcm0uZW1pdChmb3JtRGF0YSk7XG4gIH1cbiAgY2xvc2VEaWFsb2coKXtcblxuICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBsb2FkRXZlbnQsIFVwbG9hZEZpbGUsIEZpbGVTeXN0ZW1GaWxlRW50cnksIEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeSB9IGZyb20gJ25neC1maWxlLWRyb3AnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tdXBsb2FkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+XG4gIDxkaXY+XG4gICAgPGZpbGUtZHJvcFxuICAgICAgaGVhZGVydGV4dD1cIkRyb3AgZmlsZXMgaGVyZVwiXG4gICAgICAob25GaWxlRHJvcCk9XCJkcm9wcGVkKCRldmVudClcIiBcbiAgICAgIChvbkZpbGVPdmVyKT1cImZpbGVPdmVyKCRldmVudClcIlxuICAgICAgKG9uRmlsZUxlYXZlKT1cImZpbGVMZWF2ZSgkZXZlbnQpXCJcbiAgICAgIGN1c3RvbXN0eWxlPVwiZHJvcC1hcmVhXCJcbiAgICA+PC9maWxlLWRyb3A+XG4gICAgPGxhYmVsIGZvcj1cImZpbGUtdXBsb2FkXCIgY2xhc3M9XCJ1cGxvYWQtYnRuXCI+XG4gICAgICBDaG9vc2UgZmlsZVxuICAgIDwvbGFiZWw+XG4gICAgPGlucHV0XG4gICAgICBpZD1cImZpbGUtdXBsb2FkXCJcbiAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgIChjaGFuZ2UpPVwiZmlsZUNoYW5nZUV2ZW50KCRldmVudClcIlxuICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICBtdWx0aXBsZT5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2NrLDpob3N0IC5jb250cm9se2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMSw6aG9zdCAuY29udHJvbHttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MSw6aG9zdCAuY29udHJvbCw6aG9zdCAudXBsb2FkLWJ0bntwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDIsOmhvc3QgLnVwbG9hZC1idG57cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDN7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZlLDpob3N0IC5jb250cm9se3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZSw6aG9zdCAuY29udHJvbCAubGFiZWwtaWNvbntwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3R7ZGlzcGxheTpibG9jaztwYWRkaW5nOjFyZW19Omhvc3QgaW5wdXRbdHlwZT1maWxlXXtkaXNwbGF5Om5vbmV9Omhvc3QgaW5wdXRbdHlwZT1jaGVja2JveF17ZGlzcGxheTpub25lfTpob3N0IC51cGxvYWQtYnRue2JhY2tncm91bmQ6IzA1ZGNiNjtjb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6MTJweCAxMnB4IDB9Omhvc3QgLmNvbnRyb2x7Y29sb3I6I2ZmZjt3aWR0aDoxMDAlO2JvcmRlci1yYWRpdXM6MTJweCAxMnB4IDA7YmFja2dyb3VuZC1jb2xvcjojNDQ0ZDYzfTpob3N0IC5jb250cm9sOmZvY3Vze291dGxpbmU6MH06aG9zdCAuY29udHJvbCAubGFiZWwtaWNvbnt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7bGVmdDoxZW19YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW1VcGxvYWRDb21wb25lbnQge1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgZG9uZUltYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIHZpc2libGVJbWFnZTogQm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZmlsZXM6IFVwbG9hZEZpbGVbXSA9IFtdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cblxuICBwdWJsaWMgbG9hZGVkSW1hZ2UoKSB7XG4gICAgdGhpcy52aXNpYmxlSW1hZ2UgPSB0cnVlO1xuICB9XG4gIHB1YmxpYyBkcm9wcGVkKGV2ZW50OiBVcGxvYWRFdmVudCkge1xuICAgIHRoaXMuZmlsZXMgPSBldmVudC5maWxlcztcblxuICAgIGZvciAoY29uc3QgZHJvcHBlZEZpbGUgb2YgZXZlbnQuZmlsZXMpIHtcblxuICAgICAgLy8gSXMgaXQgYSBmaWxlP1xuICAgICAgaWYgKGRyb3BwZWRGaWxlLmZpbGVFbnRyeS5pc0ZpbGUpIHtcbiAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gZHJvcHBlZEZpbGUuZmlsZUVudHJ5IGFzIEZpbGVTeXN0ZW1GaWxlRW50cnk7XG4gICAgICAgIGZpbGVFbnRyeS5maWxlKChmaWxlOiBGaWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5kb25lSW1hZ2UuZW1pdChmaWxlKTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAvLyBZb3UgY291bGQgdXBsb2FkIGl0IGxpa2UgdGhpczpcbiAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdsb2dvJywgZmlsZSwgcmVsYXRpdmVQYXRoKVxuXG4gICAgICAgICAgLy8gSGVhZGVyc1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgJ3NlY3VyaXR5LXRva2VuJzogJ215dG9rZW4nXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KCdodHRwczovL215YmFja2VuZC5jb20vYXBpL3VwbG9hZC9zYW5pdGl6ZS1hbmQtc2F2ZS1sb2dvJywgZm9ybURhdGEsIHsgaGVhZGVyczogaGVhZGVycywgcmVzcG9uc2VUeXBlOiAnYmxvYicgfSlcbiAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgLy8gU2FuaXRpemVkIGxvZ28gcmV0dXJuZWQgZnJvbSBiYWNrZW5kXG4gICAgICAgICAgfSlcbiAgICAgICAgICAqKi9cblxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0IHdhcyBhIGRpcmVjdG9yeSAoZW1wdHkgZGlyZWN0b3JpZXMgYXJlIGFkZGVkLCBvdGhlcndpc2Ugb25seSBmaWxlcylcbiAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gZHJvcHBlZEZpbGUuZmlsZUVudHJ5IGFzIEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZmlsZUNoYW5nZUV2ZW50KGV2ZW50KSB7XG4gICAgZm9yIChjb25zdCBjaG9zZW5GaWxlIG9mIGV2ZW50LnRhcmdldC5maWxlcykge1xuICAgICAgdGhpcy5kb25lSW1hZ2UuZW1pdChjaG9zZW5GaWxlKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIGZpbGVPdmVyKGV2ZW50KSB7XG4gIH1cblxuICBwdWJsaWMgZmlsZUxlYXZlKGV2ZW50KSB7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgT25DaGFuZ2VzLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFuZ3VsYXJDcm9wcGVyanNDb21wb25lbnQgfSBmcm9tICdhbmd1bGFyLWNyb3BwZXJqcyc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1jcm9wcGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIGNsYXNzPVwiaW1nLWNyb3BwZXJcIlxuICAobW91c2VlbnRlcik9XCJvbk1vdXNlRW50ZXIoKVwiXG4gIChtb3VzZWxlYXZlKT1cIm9uTW91c2VMZWF2ZSgpXCI+XG4gIDxkaXYgY2xhc3M9XCJlZGl0LW92ZXJsYXlcIiBbY2xhc3MuYWN0aXZlXT1cImhvdmVyQWN0aXZlXCIgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCI+XG4gICAgPGJ1dHRvbiAqbmdJZj1cImhvdmVyQWN0aXZlXCIgW0BlbnRlckFuaW1hdGlvbl0gY2xhc3M9XCJwM1wiIChjbGljayk9XCJlZGl0SW1hZ2UoKVwiPkVkaXQgTWUhPC9idXR0b24+XG4gIDwvZGl2PlxuICA8aW1nXG4gICAgKm5nSWY9XCIhY3JvcHBlZEltYWdlICYmICFlZGl0TW9kZVwiXG4gICAgW3NyY109XCJpbWFnZURhdGFcIlxuICAgIGNsYXNzPVwicHJldmlldy1pbWFnZVwiXG4gICAgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCJcbiAgPlxuICA8YW5ndWxhci1jcm9wcGVyXG4gICAgKm5nSWY9XCJlZGl0TW9kZVwiXG4gICAgI2ltYWdlQ3JvcHBlclxuICAgIFtjcm9wcGVyT3B0aW9uc109XCJjcm9wcGVyQ29uZmlnXCJcbiAgICBbaW1hZ2VVcmxdPVwiaW1hZ2VEYXRhXCJcbiAgPjwvYW5ndWxhci1jcm9wcGVyPlxuICA8aW1nXG4gICAgKm5nSWY9XCJjcm9wcGVkSW1hZ2UgJiYgIWVkaXRNb2RlXCJcbiAgICBbc3JjXT1cImNyb3BwZWRJbWFnZVwiXG4gICAgY2xhc3M9XCJmaXRcIlxuICAgIFtuZ1N0eWxlXT1cImNyb3BwZWRTdHlsZVwiXG4gICAgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCI+XG4gIFxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2Nre2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMXttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MSw6aG9zdCAuZWRpdC1vdmVybGF5IGJ1dHRvbntwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDMsOmhvc3QgLmVkaXQtb3ZlcmxheSBidXR0b257cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZle3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZXtwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3R7ZGlzcGxheTpibG9ja306aG9zdCAuaW1nLWNyb3BwZXJ7cG9zaXRpb246cmVsYXRpdmV9Omhvc3QgLnByZXZpZXctaW1hZ2V7d2lkdGg6MTAwJX06aG9zdCAuZWRpdC1vdmVybGF5e3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3RyYW5zaXRpb246LjJzIGVhc2UtaW59Omhvc3QgLmVkaXQtb3ZlcmxheS5hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4yKX06aG9zdCAuZWRpdC1vdmVybGF5IGJ1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjYpO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NTAlO3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpfWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcbiAgICAgICdlbnRlckFuaW1hdGlvbicsIFtcbiAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwfSksXG4gICAgICAgICAgYW5pbWF0ZSgnNTAwbXMnLCBzdHlsZSh7b3BhY2l0eTogMX0pKVxuICAgICAgICBdKSxcbiAgICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAxfSksXG4gICAgICAgICAgYW5pbWF0ZSgnNTAwbXMnLCBzdHlsZSh7b3BhY2l0eTogMH0pKVxuICAgICAgICBdKVxuICAgICAgXVxuICAgIClcbiAgXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW1Dcm9wcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCdpbWFnZUNyb3BwZXInKSBwdWJsaWMgaW1hZ2VDcm9wcGVyOiBBbmd1bGFyQ3JvcHBlcmpzQ29tcG9uZW50O1xuICBASW5wdXQoKSBpbWFnZURhdGE6IHN0cmluZztcbiAgQElucHV0KCkgY3JvcHBlZEltYWdlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbmZpZzogYW55ID0ge307XG4gIEBJbnB1dCgpIGVkaXRNb2RlOiBib29sZWFuO1xuICBASW5wdXQoKSBrZXk6IG51bWJlcjtcbiAgQE91dHB1dCgpIGVuYWJsZWRDcm9wcGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjcm9wcGVkSW1hZ2VFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBjcm9wcGVyQ29uZmlnOiBhbnk7XG4gIGVkaXRWaXNpYmxlOiBCb29sZWFuID0gIGZhbHNlO1xuICBjcm9wcGVkRGF0YTogYW55O1xuICBjcm9wcGVkU3R5bGU6IGFueTtcbiAgaG92ZXJBY3RpdmU6IEJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHB1YmxpYyBfbWVkaWFTZXJ2aWNlOiBTZW1NZWRpYVNlcnZpY2UpIHtcbiAgICB0aGlzLmNyb3BwZXJDb25maWcgPSB7XG4gICAgICBtb3ZhYmxlOiB0cnVlLFxuICAgICAgc2NhbGFibGU6IGZhbHNlLFxuICAgICAgem9vbWFibGU6IHRydWUsXG4gICAgICB2aWV3TW9kZTogMSxcbiAgICAgIGd1aWRlczogdHJ1ZSxcbiAgICAgIHJvdGF0YWJsZTogdHJ1ZSxcbiAgICAgIGRyYWdNb2RlOiAnbW92ZScsXG4gICAgICBjaGVja0Nyb3NzT3JpZ2luOiB0cnVlLFxuICAgICAgcmVhZHk6IChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LmNyb3BwZXIuY2xlYXIoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuY29uZmlnICYmIHRoaXMuaW1hZ2VDcm9wcGVyKSB7XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5maXQpIHtcbiAgICAgICAgdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5yZXNldCgpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuY3JvcCkge1xuICAgICAgICAvLyB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLnNldERyYWdNb2RlKCdjcm9wJyk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS56b29tICE9PSAwKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIuem9vbShjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuem9vbSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5yb3RhdGUgIT09IDApIHtcbiAgICAgICAgdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5yb3RhdGUoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLnJvdGF0ZSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5hcHBseSkge1xuICAgICAgICBjb25zdCBjcm9wcGVkSW1hZ2UgPSB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLmdldENyb3BwZWRDYW52YXMoKS50b0RhdGFVUkwoJ2ltYWdlL2pwZycpO1xuICAgICAgICB0aGlzLmNyb3BwZWREYXRhID0gdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5nZXRDcm9wQm94RGF0YSgpO1xuICAgICAgICB0aGlzLmNyb3BwZWRTdHlsZSA9IHtcbiAgICAgICAgICAndG9wLnB4JzogdGhpcy5jcm9wcGVkRGF0YS50b3AsXG4gICAgICAgICAgJ2xlZnQucHgnOiB0aGlzLmNyb3BwZWREYXRhLmxlZnQsXG4gICAgICAgICAgJ3dpZHRoLnB4JzogdGhpcy5jcm9wcGVkRGF0YS53aWR0aCxcbiAgICAgICAgICAnaGVpZ2h0LnB4JzogdGhpcy5jcm9wcGVkRGF0YS5oZWlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JvcHBlZEltYWdlRXZlbnQuZW1pdChjcm9wcGVkSW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5rZXkgJiYgY2hhbmdlcy5rZXkuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmtleSA9IGNoYW5nZXMua2V5LmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cbiAgbmdPbkluaXQoKSB7fVxuICBpbWFnZUxvYWRlZCgpIHtcbiAgICAgIC8vIHNob3cgY3JvcHBlclxuICB9XG4gIGxvYWRJbWFnZUZhaWxlZCgpIHtcbiAgICAgIC8vIHNob3cgbWVzc2FnZVxuICB9XG4gIGVkaXRJbWFnZSgpIHtcbiAgICB0aGlzLmNyb3BwZWRJbWFnZSA9ICcnO1xuICAgIHRoaXMuZW5hYmxlZENyb3BwZXIuZW1pdCgpO1xuICB9XG4gIG9uTW91c2VFbnRlcigpIHtcbiAgICB0aGlzLmhvdmVyQWN0aXZlID0gdHJ1ZTtcbiAgfVxuICBvbk1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5ob3ZlckFjdGl2ZSA9IGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1jb250cm9scycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImZsZXggbXkxXCI+XG4gIDxkaXYgY2xhc3M9XCJjb2wtNiBweDFcIj5cbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvbiBmb3I9XCJmaXQtY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJwcmVzc2VkRml0LmVtaXQoKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXJlc2l6ZSBsYWJlbC1pY29uXCI+PC9zcGFuPkZpdFxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gZm9yPVwicm90YXRlLWxlZnQtY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJwcmVzc2VkUm90YXRlTGVmdC5lbWl0KClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1yZXNpemUgbGFiZWwtaWNvblwiPjwvc3Bhbj5Sb3RhdGUgTGVmdFxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gZm9yPVwiem9vbS1pbi1jb250cm9sXCIgY2xhc3M9XCJjb250cm9sXCIgKGNsaWNrKT1cInByZXNzZWRab29tSW4uZW1pdCgpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcmVzaXplIGxhYmVsLWljb25cIj48L3NwYW4+Wm9vbSBpblxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29sLTYgcHgxXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8YnV0dG9uIGZvcj1cImNyb3AtY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJwcmVzc2VkQ3JvcC5lbWl0KClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXJlc2l6ZSBsYWJlbC1pY29uXCI+PC9zcGFuPkNyb3BcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxidXR0b24gZm9yPVwicm90YXRlLXJpZ2h0LWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZFJvdGF0ZVJpZ2h0LmVtaXQoKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcmVzaXplIGxhYmVsLWljb25cIj48L3NwYW4+Um90YXRlIHJpZ2h0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8YnV0dG9uIGZvcj1cInpvb20tb3V0LWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZFpvb21PdXQuZW1pdCgpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1yZXNpemUgbGFiZWwtaWNvblwiPjwvc3Bhbj5ab29tIG91dFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2ssOmhvc3QgLmNvbnRyb2x7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxLDpob3N0IC5jb250cm9se21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10MnttYXJnaW4tdG9wOjFyZW19Lm1yMnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxLDpob3N0IC5jb250cm9se3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAye3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4MntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4M3twYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleHtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0YXJ0e2FsaWduLWNvbnRlbnQ6ZmxleC1zdGFydH0uY29udGVudC1lbmR7YWxpZ24tY29udGVudDpmbGV4LWVuZH0uY29udGVudC1jZW50ZXJ7YWxpZ24tY29udGVudDpjZW50ZXJ9LmNvbnRlbnQtYmV0d2VlbnthbGlnbi1jb250ZW50OnNwYWNlLWJldHdlZW59LmNvbnRlbnQtYXJvdW5ke2FsaWduLWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0cmV0Y2h7YWxpZ24tY29udGVudDpzdHJldGNofS5mbGV4LWF1dG97ZmxleDoxIDEgYXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjB9LmZsZXgtbm9uZXtmbGV4Om5vbmV9Lm9yZGVyLTB7b3JkZXI6MH0ub3JkZXItMXtvcmRlcjoxfS5vcmRlci0ye29yZGVyOjJ9Lm9yZGVyLTN7b3JkZXI6M30ub3JkZXItbGFzdHtvcmRlcjo5OTk5OX0ucmVsYXRpdmUsOmhvc3QgLmNvbnRyb2x7cG9zaXRpb246cmVsYXRpdmV9LmFic29sdXRlLDpob3N0IC5jb250cm9sIC5sYWJlbC1pY29ue3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTB7dG9wOjB9LnJpZ2h0LTB7cmlnaHQ6MH0uYm90dG9tLTB7Ym90dG9tOjB9LmxlZnQtMHtsZWZ0OjB9Lnoxe3otaW5kZXg6MX0uejJ7ei1pbmRleDoyfS56M3t6LWluZGV4OjN9Lno0e3otaW5kZXg6NH0uYm9yZGVye2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MXB4fS5ib3JkZXItdG9we2JvcmRlci10b3Atc3R5bGU6c29saWQ7Ym9yZGVyLXRvcC13aWR0aDoxcHh9LmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweH0uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5ib3JkZXItbGVmdHtib3JkZXItbGVmdC1zdHlsZTpzb2xpZDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmJvcmRlci1ub25le2JvcmRlcjowfS5yb3VuZGVke2JvcmRlci1yYWRpdXM6M3B4fS5jaXJjbGV7Ym9yZGVyLXJhZGl1czo1MCV9LnJvdW5kZWQtdG9we2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LnJvdW5kZWQtcmlnaHR7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0ucm91bmRlZC1ib3R0b217Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0ucm91bmRlZC1sZWZ0e2JvcmRlci1yYWRpdXM6M3B4IDAgMCAzcHh9Lm5vdC1yb3VuZGVke2JvcmRlci1yYWRpdXM6MH0uaGlkZXtwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7aGVpZ2h0OjFweDt3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpfUBtZWRpYSAobWF4LXdpZHRoOjQwZW0pey54cy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pIGFuZCAobWF4LXdpZHRoOjUyZW0pey5zbS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pIGFuZCAobWF4LXdpZHRoOjY0ZW0pey5tZC1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdCAuY29udHJvbHtjb2xvcjojZmZmO3dpZHRoOjEwMCU7Ym9yZGVyLXJhZGl1czoxMnB4IDEycHggMDtiYWNrZ3JvdW5kLWNvbG9yOiM0NDRkNjN9Omhvc3QgLmNvbnRyb2w6Zm9jdXN7b3V0bGluZTowfTpob3N0IC5jb250cm9sIC5sYWJlbC1pY29ue3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtsZWZ0OjFlbX1gXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW1Db250cm9sc0NvbXBvbmVudCB7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZEZpdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHVibGljIHByZXNzZWRDcm9wID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZFJvdGF0ZUxlZnQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBwcmVzc2VkUm90YXRlUmlnaHQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBwcmVzc2VkWm9vbUluID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZFpvb21PdXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbn1cblxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuZXhwb3J0IHR5cGUgUGFuZVR5cGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1zbGlkZS1wYW5lbCcsXG4gIHN0eWxlczogW2A6aG9zdHtkaXNwbGF5OmJsb2NrO292ZXJmbG93OmhpZGRlbn0ucGFuZXN7aGVpZ2h0OjEwMCU7d2lkdGg6MjAwJTt0cmFuc2l0aW9uLWR1cmF0aW9uOi41cztkaXNwbGF5OmZsZXh9LnBhbmVzIGRpdntmbGV4OjF9YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhbmVzXCIgW0BzbGlkZV09XCJhY3RpdmVQYW5lXCI+XG4gIDxkaXY+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW2xlZnRQYW5lXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgPGRpdj48bmctY29udGVudCBzZWxlY3Q9XCJbcmlnaHRQYW5lXVwiPjwvbmctY29udGVudD48L2Rpdj5cbjwvZGl2PmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc2xpZGUnLCBbXG4gICAgICBzdGF0ZSgnbGVmdCcsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScgfSkpLFxuICAgICAgc3RhdGUoJ3JpZ2h0Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdsZWZ0IDw9PiByaWdodCcsIGFuaW1hdGUoJzFzJykpXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZVBhbmVsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgYWN0aXZlUGFuZTogUGFuZVR5cGUgPSAnbGVmdCc7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tc2V0dGluZ3MnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1oZWFkZXJcIj5cbiAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIiAoY2xpY2spPVwiaXNMZWZ0VmlzaWJsZT10cnVlXCI+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPHNlbS1zbGlkZS1wYW5lbCBbYWN0aXZlUGFuZV09XCJpc0xlZnRWaXNpYmxlPyAnbGVmdCc6ICdyaWdodCdcIj5cbiAgICA8ZGl2IGxlZnRQYW5lPlxuICAgICAgPGRpdiBzZW11aS1zZWN0aW9uLWJvZHkgY2xhc3M9XCJwMlwiPlxuICAgICAgICA8dWwgc2VtdWktbGlzdCBjbGFzcz1cInVzZXItbmF2XCI+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBzZW11aS1saXN0LWl0ZW1cbiAgICAgICAgICAgIGxpc3QtaXRlbVxuICAgICAgICAgICAgc2VtdWktaW1wb3J0YW5jZT1cImRhcmtcIlxuICAgICAgICAgICAgY2xhc3M9XCJweTFcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uSW1hZ2VzKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwic2VtLWljb24tc3R5bGUgZGVmYXVsdFwiICBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8c3Bhbj4gSW1hZ2VzPC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBzZW11aS1saXN0LWl0ZW1cbiAgICAgICAgICAgIGxpc3QtaXRlbVxuICAgICAgICAgICAgc2VtdWktaW1wb3J0YW5jZT1cImRhcmtcIlxuICAgICAgICAgICAgY2xhc3M9XCJweTFcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uU2V0dGluZ3MoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJzZW0taWNvbi1zZXR0aW5ncyBkZWZhdWx0XCIgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuPiBTZXR0aW5nczwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICBsaXN0LWl0ZW1cbiAgICAgICAgICAgIHNlbXVpLWltcG9ydGFuY2U9XCJkYXJrXCJcbiAgICAgICAgICAgIGNsYXNzPVwicHkxXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkR1cGxpY2F0ZSgpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aSBjbGFzcz1cInNlbS1pY29uLXNpdGVzIGRlZmF1bHRcIiAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPHNwYW4+IER1cGxpY2F0ZTwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICBsaXN0LWl0ZW1cbiAgICAgICAgICAgIHNlbXVpLWltcG9ydGFuY2U9XCJkYXJrXCJcbiAgICAgICAgICAgIGNsYXNzPVwicHkxXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkRlbGV0ZSgpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aSBjbGFzcz1cInNlbS1pY29uLWRlbGV0ZSBkZWZhdWx0XCIgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuPiBEZWxldGU8L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgcmlnaHRQYW5lPlxuICAgICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJ2aWV3TW9kZUZvcm1cIiBjbGFzcz1cInAyXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIlxuICAgICAgICB2YWx1ZT1cImdyaWRcIlxuICAgICAgICBpZD1cImdyaWRcIlxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ2aWV3TW9kZVwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwiZ3JpZFwiPjxzcGFuIGNsYXNzPVwic2VtLWljb24tc3R5bGUgZGVmYXVsdFwiPjwvc3Bhbj48L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICB2YWx1ZT1cImNhcm91c2VsXCJcbiAgICAgICAgICBpZD1cImNhcm91c2VsXCJcbiAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ2aWV3TW9kZVwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwiY2Fyb3VzZWxcIj48c3BhbiBjbGFzcz1cInNlbS1pY29uLXNldHRpbmdzIGRlZmF1bHRcIj48L3NwYW4+PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgdmFsdWU9XCJsaXN0XCJcbiAgICAgICAgICBpZD1cImxpc3RcIlxuICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInZpZXdNb2RlXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJsaXN0XCI+PHNwYW4gY2xhc3M9XCJzZW0taWNvbi1zZXR0aW5ncyBkZWZhdWx0XCI+PC9zcGFuPjwvbGFiZWw+XG4gICAgICA8L2Zvcm0+XG4gICAgICB7e3ZpZXdNb2RlRm9ybS52YWx1ZSB8IGpzb259fVxuICAgIDwvZGl2PlxuICA8L3NlbS1zbGlkZS1wYW5lbD5cblxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2t7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxe21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10MnttYXJnaW4tdG9wOjFyZW19Lm1yMnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxe3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAye3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4MntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4M3twYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleCw6aG9zdCBmb3Jte2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5kLDpob3N0IGZvcm17anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZle3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZXtwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3QgZm9ybSBpbnB1dFt0eXBlPXJhZGlvXXtkaXNwbGF5Om5vbmV9Omhvc3QgZm9ybSBpbnB1dFt0eXBlPXJhZGlvXTpjaGVja2VkK2xhYmVse2JhY2tncm91bmQ6I2NjY306aG9zdCBmb3JtIGxhYmVsIHNwYW57Zm9udC1zaXplOjMwcHh9YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW1NZWRpYVNldHRpbmdzQ29tcG9uZW50IHtcbiAgQE91dHB1dCgpIHByZXNzZWRJbWFnZXMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHByZXNzZWREZWxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHByZXNzZWREdXBsaWNhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHByZXNzZWRTZXR0aW5ncyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwdWJsaWMgaXNMZWZ0VmlzaWJsZTogQm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyB2aWV3TW9kZUZvcm06IEZvcm1Hcm91cDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX21lZGlhU2VydmljZTogU2VtTWVkaWFTZXJ2aWNlLCBwcml2YXRlIF9mYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB0aGlzLnZpZXdNb2RlRm9ybSA9IHRoaXMuX2ZiLmdyb3VwKHtcbiAgICAgIHZpZXdNb2RlOiAnJ1xuICAgIH0pO1xuICB9XG4gIG9uRGVsZXRlKCkge1xuICAgIHRoaXMucHJlc3NlZERlbGV0ZS5lbWl0KCk7XG4gIH1cbiAgb25JbWFnZXMoKSB7XG4gICAgdGhpcy5wcmVzc2VkSW1hZ2VzLmVtaXQoKTtcbiAgfVxuICBvbkR1cGxpY2F0ZSgpIHtcbiAgICB0aGlzLnByZXNzZWREdXBsaWNhdGUuZW1pdCgpO1xuICB9XG4gIG9uU2V0dGluZ3MoKSB7XG4gICAgdGhpcy5pc0xlZnRWaXNpYmxlID0gZmFsc2U7XG4gICAgLy8gdGhpcy5wcmVzc2VkU2V0dGluZ3MuZW1pdCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1tZWRpYS1lZGl0JyxcbiAgdGVtcGxhdGU6IGA8Zm9ybSBbZm9ybUdyb3VwXT1cIm15Rm9ybVwiIGNsYXNzPVwicDJcIj5cbiAgPGxhYmVsPkFsbCBUZXh0PC9sYWJlbD5cbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICBjbGFzcz1cInNlbS1pbnB1dFwiXG4gICAgaWQ9XCJhbGwtdGV4dFwiXG4gICAgZm9ybUNvbnRyb2xOYW1lPVwiYWxsVGV4dFwiPlxuICA8bGFiZWw+TWV0YSBUaXRsZTwvbGFiZWw+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgY2xhc3M9XCJzZW0taW5wdXRcIlxuICAgIGlkPVwibWV0YS10aXRsZVwiXG4gICAgZm9ybUNvbnRyb2xOYW1lPVwibWV0YVRpdGxlXCI+XG48L2Zvcm0+XG48c2VtLWNvbnRyb2xzXG4gIChwcmVzc2VkRml0KT1cIm9uUHJlc3MoJ0ZJVCcpXCJcbiAgKHByZXNzZWRDcm9wKT1cIm9uUHJlc3MoJ0NST1AnKVwiXG4gIChwcmVzc2VkUm90YXRlTGVmdCk9XCJvblByZXNzKCdST1RBVEVfTEVGVCcpXCJcbiAgKHByZXNzZWRSb3RhdGVSaWdodCk9XCJvblByZXNzKCdST1RBVEVfUklHSFQnKVwiXG4gIChwcmVzc2VkWm9vbUluKT1cIm9uUHJlc3MoJ1pPT01fSU4nKVwiXG4gIChwcmVzc2VkWm9vbU91dCk9XCJvblByZXNzKCdaT09NX09VVCcpXCI+XG48L3NlbS1jb250cm9scz5cbjxkaXYgY2xhc3M9XCJweDIgZmxleCBqdXN0aWZ5LWVuZFwiPlxuICA8YnV0dG9uIGZvcj1cImNyb3AtY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJvblByZXNzKCdBUFBMWScpXCIgPlxuICAgIEFwcGx5XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG48IS0tIDxkaXY+PHByZT48Y29kZT57eyBteUZvcm0/LnZhbHVlIHwganNvbiB9fTwvY29kZT48L3ByZT48L2Rpdj4gLS0+XG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2NrLDpob3N0IC5jb250cm9se2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMSw6aG9zdCAuY29udHJvbHttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MSw6aG9zdCAuY29udHJvbHtwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDMsOmhvc3QgLmNvbnRyb2x7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZlLDpob3N0IC5jb250cm9se3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZXtwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3QgLmNvbnRyb2x7Y29sb3I6I2ZmZjtib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjEycHggMTJweCAwO2JhY2tncm91bmQtY29sb3I6IzA1ZGNiNn06aG9zdCAuY29udHJvbDpmb2N1c3tvdXRsaW5lOjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRFZGl0TW9kZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZm9ybUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQElucHV0KCkgZm9ybURhdGE6IGFueTtcbiAgcHVibGljIG15Rm9ybTogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB0aGlzLm15Rm9ybSA9IHRoaXMuX2ZiLmdyb3VwKHtcbiAgICAgIGFsbFRleHQgOiAnJyxcbiAgICAgIG1ldGFUaXRsZTogJycsXG4gICAgfSk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgdGhpcy5teUZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICBhbGxUZXh0OiB0aGlzLmZvcm1EYXRhLmFsbFRleHQsXG4gICAgICBtZXRhVGl0bGU6IHRoaXMuZm9ybURhdGEubWV0YVRpdGxlXG4gICAgfSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5teUZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5mb3JtQ2hhbmdlZC5lbWl0KGRhdGEpO1xuICAgIH0pO1xuICB9XG4gIG9uUHJlc3MobW9kZSkge1xuICAgIHRoaXMuc2VsZWN0ZWRFZGl0TW9kZS5lbWl0KG1vZGUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgIE91dHB1dCwgSW5qZWN0b3IsIFZpZXdDaGlsZCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tbWVkaWEtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXIgc2VtLW1lZGlhLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXItLW5hdlwiPlxuICAgIDxidXR0b25cbiAgICAgIHNlbS1idG4tZmFiXG4gICAgICBjb3JuZXI9XCJ0b3AtcmlnaHRcIlxuICAgICAgc2VtdWktdGhlbWU9XCJsaWdodFwiXG4gICAgICBjbGFzcz1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgXCJcbiAgICAgIHNlbS1pbXBvcnRhbmNlPVwic2Vjb25kYXJ5XCJcbiAgICAgICNjaGF0T3ZlcmxheT1cImNka092ZXJsYXlPcmlnaW5cIlxuICAgICAgY2RrT3ZlcmxheU9yaWdpblxuICAgICAgKGNsaWNrKT1cIm9wZW5UZXN0QSghaXNUZXN0QU9wZW5lZClcIlxuICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1wcm9maWxlLWFjY2VudFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBhdGgxXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwicGF0aDJcIj48L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8c2VtdWktb3ZlcmxheS1kaWFsb2dcbiAgICAgIFtvdmVybGF5T3JpZ2luXT1cImNoYXRPdmVybGF5XCJcbiAgICAgIFtpc09wZW5lZF09XCJpc1Rlc3RBT3BlbmVkXCJcbiAgICAgIChjbG9zZSk9XCJvcGVuVGVzdEEoZmFsc2UpXCJcbiAgICAgIChvcGVuKT1cIm9wZW5UZXN0QSh0cnVlKVwiXG4gICAgICBbb3ZlcmxheVdpZHRoXT1cIidhdXRvJ1wiXG4gICAgPlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwidXBsb2FkUGFuZWxGbGFnXCIgY2xhc3M9XCJ0ZW1wLWNvbnRhaW5lciBkaWFsb2ctY29udGFpbmVyIGJnLWRlZmF1bHQgbGVmdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0tYm9keVwiPlxuICAgICAgICAgIDxzZW0tcGFuZWxcbiAgICAgICAgICAgIFtlZGl0VmlzaWJsZV09XCJlZGl0VmlzaWJsZVwiXG4gICAgICAgICAgICBba2V5XT1cImtleVwiXG4gICAgICAgICAgICBbaW1hZ2VOYW1lTGlzdF09XCJpbWFnZU5hbWVMaXN0XCJcbiAgICAgICAgICAgIChjcm9wcGVkKT1cImNyb3BwZWRJbWFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICh1cGxvYWRlZCk9XCJ1cGxvYWRlZEltYWdlKCRldmVudClcIlxuICAgICAgICAgICAgKGNoYW5nZWRGb3JtKT1cIm9uQ2hhbmdlZEZvcm0oJGV2ZW50KVwiXG4gICAgICAgICAgICAoZWRpdEltYWdlKT1cIm9uRWRpdEltYWdlKCRldmVudClcIlxuICAgICAgICAgICAgKGRlbGV0ZUltYWdlKT1cIm9uRGVsZXRlSW1hZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAoY2hhbmdlZEVkaXRNb2RlKT1cIm9uQ2hhbmdlZEVkaXRNb2RlKCRldmVudClcIlxuICAgICAgICAgICAgKHNob3dVcGxvYWRFdmVudCk9XCJlZGl0VmlzaWJsZSA9IGZhbHNlXCJcbiAgICAgICAgICAgIFt1c2VySW1hZ2VzXT1cInVzZXJJbWFnZXNcIlxuICAgICAgICAgID48L3NlbS1wYW5lbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCIhdXBsb2FkUGFuZWxGbGFnXCJcbiAgICAgICAgICAgY2xhc3M9XCJzZXR0aW5ncy1jb250YWluZXIgZGlhbG9nLWNvbnRhaW5lciBiZy1kZWZhdWx0IG10NFwiPlxuICAgICAgICA8c2VtLXNldHRpbmdzXG4gICAgICAgICAgKHByZXNzZWRJbWFnZXMpPVwib25NZW51KCdJTUFHRVMnKVwiXG4gICAgICAgICAgKHByZXNzZWREdXBsaWNhdGUpPVwib25NZW51KCdEVVBMSUNBVEUnKVwiXG4gICAgICAgICAgKHByZXNzZWRTZXR0aW5ncyk9XCJvbk1lbnUoJ1NFVFRJTkdTJylcIlxuICAgICAgICAgIChwcmVzc2VkRGVsZXRlKT1cIm9uTWVudSgnREVMRVRFJylcIlxuICAgICAgICA+XG4gICAgICAgIDwvc2VtLXNldHRpbmdzPlxuICAgICAgPC9kaXY+XG5cbiAgICA8L3NlbXVpLW92ZXJsYXktZGlhbG9nPlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5cbjxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtY29sdW1uXCI+XG5cbiAgPCEtLSA8cHJlPnt7dGVtcEltYWdlcyB8IGpzb259fTwvcHJlPiAtLT5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cInVzZXJJbWFnZXNcIiBjbGFzcz1cInByZXZpZXctY29udGFpbmVyXCI+XG4gIDxzZW0tY3JvcHBlclxuICAgICpuZ0Zvcj1cImxldCBpbWFnZSBvZiB1c2VySW1hZ2VzO2xldCBrZXkgPSBpbmRleFwiXG4gICAgW2ltYWdlRGF0YV09XCJpbWFnZS51cGxvYWRlZEltYWdlXCJcbiAgICBbY3JvcHBlZEltYWdlXT1cImltYWdlLmNyb3BwZWRJbWFnZVwiXG4gICAgW2VkaXRNb2RlXT1cImltYWdlLmVkaXRNb2RlXCJcbiAgICBbY29uZmlnXT1cImNvbmZpZ1wiXG4gICAgW2tleV09XCJrZXlcIlxuICAgIChlbmFibGVkQ3JvcHBlcik9XCJvbkVuYWJsZUVkaXRJbWFnZShrZXkpXCJcbiAgICAoY3JvcHBlZEltYWdlRXZlbnQpPVwib25Dcm9wcGVkSW1hZ2Uoa2V5LCAkZXZlbnQpXCJcbiAgPjwvc2VtLWNyb3BwZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCgpe2JhY2tncm91bmQtY29sb3I6I2Y1ZTVlNTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgIzhiMDAwMDtoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyB3aWRnZXQgPSB7XG4gICAgY29tcG9uZW50TmFtZTogJycsXG4gICAgZGF0YTogIGBcbiAgICBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnkncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciBvb2sgYSBnYWxsZXkgb2YgdHlwZVxuICAgIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2UgbnR1cmllcywgYnV0IGFsc28gdGhlIGxlYXAgaW50byBlbGVjdHJvbmljXG4gICAgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1IGxhcmlzZWQgaW4gdGhlIDE5NjBzIHdpdGggdGhlIHJlbGVhc2Ugb2YgTGV0cmFzZXQgc2hlZXRzXG4gICAgY29udGFpbmluZ2BcbiAgfTtcblxuXG4gIHVzZXJJbWFnZXM/OiBBcnJheTxhbnk+ID0gW107XG4gIGVkaXRWaXNpYmxlOiBCb29sZWFuID0gZmFsc2U7XG4gIGtleTogTnVtYmVyO1xuICB1cGxvYWRQYW5lbEZsYWc6IEJvb2xlYW4gPSB0cnVlO1xuICBpbWFnZU5hbWVMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbmZpZzogYW55O1xuICB0ZW1wSW1hZ2VzOiBBcnJheTxhbnk+O1xuICBpc1Rlc3RBT3BlbmVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVkaWFTZXJ2aWNlOiBTZW1NZWRpYVNlcnZpY2UsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgLy8gdGhpcy53aWRnZXQgPSB0aGlzLmluamVjdG9yLmdldCgnd2lkZ2V0Jyk7XG4gICAgLy8gaWYodGhpcy53aWRnZXQuY29tcG9uZW50TmFtZSA9PT0gJ1NlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50Jykge1xuICAgIC8vICAgY29uc29sZS5sb2coJ0dvdCB0aGUgd3lzaXd5ZyBkYXRhJywgdGhpcy53aWRnZXQpO1xuICAgIC8vIH1cblxuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUNvbXBvbmVudENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICBsZXQgZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdCA9IFtdO1xuICAgICAgdGhpcy51c2VySW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgZm9yIChjb25zdCBpbWFnZSBvZiBhbGxJbWFnZXMpIHtcbiAgICAgICAgZWRpdE1vZGUgPSBlZGl0TW9kZSB8fCBpbWFnZS5lZGl0TW9kZTtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0LnB1c2goaW1hZ2UuZmlsZU5hbWUpO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZWRpdFZpc2libGUgPSBlZGl0TW9kZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUNvbmZpZ0NoYW5nZXMuc3Vic2NyaWJlKGNvbmZpZyA9PiB7XG4gICAgICB0aGlzLmNvbmZpZyA9IF8uY2xvbmVEZWVwKGNvbmZpZyk7XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmltYWdlTG9hZENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXNlckltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgYWxsSW1hZ2VzKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdC5wdXNoKGltYWdlLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMua2V5ID0gYWxsSW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgICB0aGlzLmVkaXRWaXNpYmxlID0gZmFsc2U7XG4gICAgICBpZiAoYWxsSW1hZ2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UudGVtcENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgfSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgdXBsb2FkZWRJbWFnZShpbWFnZTogRmlsZSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5wdXRJbWFnZShpbWFnZSk7XG4gIH1cbiAgb25FbmFibGVFZGl0SW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0RW5hYmxlKGluZGV4KTtcbiAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IHRydWU7XG4gICAgdGhpcy5rZXkgPSBpbmRleDtcbiAgfVxuICBvbkVkaXRJbWFnZShpbmRleCkge1xuICAgIHRoaXMua2V5ID0gaW5kZXg7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEVuYWJsZShpbmRleCk7XG4gIH1cbiAgb25EZWxldGVJbWFnZShpbmRleCkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkRlbGV0ZUltYWdlKGluZGV4KTtcbiAgfVxuICBvbk1lbnUobW9kZSkge1xuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAnSU1BR0VTJzpcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RVUExJQ0FURSc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU0VUVElOR1MnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RFTEVURSc6XG4gICAgICAgIHRoaXMuX21lZGlhU2VydmljZS5jbGVhckltYWdlcygpO1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgb25DaGFuZ2VkRm9ybShmb3JtRGF0YTogYW55KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmZvcm1DaGFuZ2VkKHRoaXMua2V5LCBmb3JtRGF0YSk7XG4gIH1cbiAgb25DaGFuZ2VkRWRpdE1vZGUobW9kZTogc3RyaW5nKSB7XG4gICAgaWYgKG1vZGUgPT09ICdBUFBMWScpIHtcbiAgICAgIC8vIHRoaXMuZWRpdFZpc2libGUgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmltYWdlTmFtZUxpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0SW1hZ2UodGhpcy5rZXksIG1vZGUpO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5jbGVhckNvbmZpZyh0aGlzLmtleSk7XG4gIH1cbiAgb25Dcm9wcGVkSW1hZ2UoaW5kZXgsIGNyb3BwZWRJbWFnZSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5wdXRDcm9wcGVkSW1hZ2UoaW5kZXgsIGNyb3BwZWRJbWFnZSk7XG4gIH1cbiAgb3BlblRlc3RBKGlzT3BlbmVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gaXNPcGVuZWQ7XG4gIH1cbiAgY3JvcHBlZEltYWdlKGl0ZW0pe1xuICAgIGNvbnNvbGUubG9nKCdub3Qgc3VyZScsIGl0ZW0pXG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBTZW1VaUJ1dHRvbk1vZHVsZSxcbiAgU2VtVWlCdXR0b25GYWJNb2R1bGUsXG4gIFNlbVVpT3ZlcmxheURpYWxvZ01vZHVsZSxcbiAgU2VtVWlUYWJzTW9kdWxlLFxuICBTZW1VaVRodW1ibmFpbExhcmdlTW9kdWxlXG59IGZyb20gJ0Bmcm9udHIvc2VtLXVpJztcblxuY29uc3QgVWlTaGFyZWRNb2R1bGVzID0gW1xuICBTZW1VaUJ1dHRvbk1vZHVsZSxcbiAgU2VtVWlCdXR0b25GYWJNb2R1bGUsXG4gIFNlbVVpT3ZlcmxheURpYWxvZ01vZHVsZSxcbiAgU2VtVWlUYWJzTW9kdWxlLFxuICBTZW1VaVRodW1ibmFpbExhcmdlTW9kdWxlXG5dXG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFsuLi5VaVNoYXJlZE1vZHVsZXNdXG59KVxuZXhwb3J0IGNsYXNzIFNlbVVpS2l0U2hhcmVkTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE9ic2VydmVyc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vYnNlcnZlcnMnO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBTY3JvbGxEaXNwYXRjaE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQ2RrU3RlcHBlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuY29uc3QgTUFURVJJQUxfTU9EVUxFUyA9IFtcbiAgLy8gQ0RLXG4gIEExMXlNb2R1bGUsXG4gIEJpZGlNb2R1bGUsXG4gIE9ic2VydmVyc01vZHVsZSxcbiAgT3ZlcmxheU1vZHVsZSxcbiAgUGxhdGZvcm1Nb2R1bGUsXG4gIFBvcnRhbE1vZHVsZSxcbiAgU2Nyb2xsRGlzcGF0Y2hNb2R1bGUsXG4gIENka1N0ZXBwZXJNb2R1bGUsXG4gIENka1RhYmxlTW9kdWxlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogWy4uLk1BVEVSSUFMX01PRFVMRVNdXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1hdGVyaWFsU2hhcmVkTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3lvdXR1YmVTYWZlVXJsJ1xufSlcbmV4cG9ydCBjbGFzcyBZb3V0dWJlU2FmZVVybFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKXtcblxuICB9XG5cbiAgdHJhbnNmb3JtKHZpZGVvSWQ6IHN0cmluZyk6IFNhZmVSZXNvdXJjZVVybCB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChcbiAgICAgIGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3ZpZGVvSWR9P2F1dG9wbGF5PTFgKTtcbiAgfVxuXG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIFlvdXR1YmVWaWRlb01vZGVsIHtcbiAgICB2aWRlb0lkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICB0aHVtYm5haWxVcmw6IHN0cmluZztcbiAgICBjaGFubmVsVGl0bGU6IHN0cmluZztcbiAgICBjaGFubmVsSWQ6IHN0cmluZztcbiAgICBwdWJsaXNoZWRBdD86IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIFZpZGVvTW9kZWwge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdmlkZW9JZDogc3RyaW5nLFxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuICAgIHB1YmxpYyB0aHVtYm5haWxVcmw6IHN0cmluZyxcbiAgICBwdWJsaWMgY2hhbm5lbFRpdGxlOiBzdHJpbmcsXG4gICAgcHVibGljIGNoYW5uZWxJZDogc3RyaW5nLFxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy52aWRlb0lkID0gdmlkZW9JZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50aHVtYm5haWxVcmwgPSB0aHVtYm5haWxVcmw7XG4gICAgdGhpcy5jaGFubmVsVGl0bGUgPSBjaGFubmVsVGl0bGU7XG4gICAgdGhpcy5jaGFubmVsSWQgPSBjaGFubmVsSWQ7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlkZW9Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy8nO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgWW91dHViZVZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdmlkZW8nO1xuXG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvcixcbiAgc2VsZWN0b3I6ICdbc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsXScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWhlYWRlclwiPlxuICA8c3BhbiAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tYmFja1wiPjwvc3Bhbj5cbiAgICBDbG9zZVxuICA8L3NwYW4+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1ib2R5X3NwYWNlZCBiZy1kZWZhdWx0XCI+XG4gIDxkaXYgc2VtdWktdGFicyAjdGFic1ZlcnRpY2FsIFtzaG93VGFic109XCJ0cnVlXCIgW3ZlcnRpY2FsXT1cInRydWVcIiA+XG4gICAgPGRpdiBzZW11aS10YWIgI3RhYnNWMSBbdGl0bGVdPVwiJ1ZpZGVvIFVybCdcIj5cbiAgICAgIDxkaXYgc2VtdWktc2VjdGlvbi1ib2R5PlxuICAgICAgICBUYWIgMSBjb250ZW50XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHNlbXVpLXRhYiAjdGFic1YyIFt0aXRsZV09XCInU2VhcmNoJ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInNlbS12aWRlby1jb250YWluZXJcIj5cbiAgICAgICAgICA8IS0tIFNlY3Rpb24gQm9keSAtLT5cbiAgICAgICAgICA8ZGl2IHNlbXVpLXNlY3Rpb24tYm9keT5cbiAgICAgICAgICAgIDwhLS0gU2VhcmNoIC0tPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8IS0tIFlvdVR1YmUgU2VhcmNoIC0tPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5TZWFyY2ggWW91dHViZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1wcmVmaXhcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tc2VhcmNoIHByZWZpeFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic2VtLWlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgaWQ9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgICAgICAgICAoa2V5dXApPVwic2VhcmNoKHRleHRCb3gudmFsdWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICN0ZXh0Qm94XG4gICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiAgZmllbGQtcHJlZml4IGNsYXNzPVwiaWNvbiBpY29uLXNlYXJjaCBwcmVmaXhcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZW0tdmlkZW8tY29udGFpbmVyLS1yZXN1bHRzXCI+XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicmVzdWx0cy5sZW5ndGggPT0gMFwiIGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c19pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8ZmlndXJlIHNlbXVpLXRodW1ibmFpbCBjbGFzcz1cInB0MlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c19wcmV2aWV3XCIgY2FyZC1pbWFnZT48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWdjYXB0aW9uIHNlbS1zZWN0aW9uLWZvb3Rlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlnY2FwdGlvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwicHJpbWFyeS1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9kaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3ViLWNhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9kaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWdjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiByZXN1bHRzIHwgcGFnaW5hdGU6IGNvbmZpZ1wiIGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c19pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgc2VtdWktdGh1bWJuYWlsIGNsYXNzPVwicHQyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0tdmlkZW8tY29udGFpbmVyLS1yZXN1bHRzX3ByZXZpZXdcIiBjYXJkLWltYWdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nICpuZ0lmPVwiaXRlbS50aHVtYm5haWxVcmxcIiBbc3JjXT1cIml0ZW0udGh1bWJuYWlsVXJsXCIgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxmaWdjYXB0aW9uIHNlbS1zZWN0aW9uLWZvb3Rlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWdjYXB0aW9uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktY2FwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpdGVtLnRpdGxlfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInN1Yi1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpdGVtLnB1Ymxpc2hlZEF0fX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiIHJlbGF0aXZlIHNlbS1idXR0b24tLSBzZW0tYnV0dG9uIHNlbS1idXR0b24tLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQtc2V0dGluZy1idXR0b24gKGNsaWNrKT1cImFkZFZpZGVvKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFkZCB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxidXR0b24tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tc2VtLWJ0bi1mYWItLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tY29ybmVyPVwibm9uZVwiLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLXNlbXVpLXRoZW1lPVwibGlnaHRcIi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1zZW0taW1wb3J0YW5jZT1cImRlZmF1bHRcIi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1jYXJkLXNldHRpbmctYnV0dG9uIChjbGljayk9XCJsb2FkU2V0dGluZ3MoKVwiLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0mZ3Q7LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxzcGFuIGNsYXNzPVwic2VtLWljb24tZWxsaXBzZVwiPjwvc3Bhbj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvYnV0dG9uPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9maWdjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8IS0tIFNlY3Rpb24gRm9vdGVyIC0tPlxuICAgICAgICAgIDxkaXYgc2VtdWktc2VjdGlvbi1mb290ZXI+XG4gICAgICAgICAgICAgIDxwYWdpbmF0aW9uLXRlbXBsYXRlXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJzZW0tcGFnaW5hdGlvbi1jb250YWluZXIgcHkyXCJcbiAgICAgICAgICAgICAgICAjcD1cInBhZ2luYXRpb25BcGlcIlxuICAgICAgICAgICAgICAgIFtpZF09XCJjb25maWcuaWRcIlxuICAgICAgICAgICAgICAgIChwYWdlQ2hhbmdlKT1cImNvbmZpZy5jdXJyZW50UGFnZSA9ICRldmVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZW0tcGFnaW5hdGlvbi1uYXZcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzZW0tcGFnaW5hdGlvbi1wcmV2aW91c1wiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwLmlzRmlyc3RQYWdlKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhcC5pc0ZpcnN0UGFnZSgpXCIgKGNsaWNrKT1cInAucHJldmlvdXMoKVwiPiA8IDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcGFnZSBvZiBwLnBhZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzZW0tcGFnaW5hdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwicC5nZXRDdXJyZW50KCkgPT09IHBhZ2UudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cInAuc2V0Q3VycmVudChwYWdlLnZhbHVlKVwiICpuZ0lmPVwicC5nZXRDdXJyZW50KCkgIT09IHBhZ2UudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBwYWdlLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInAuZ2V0Q3VycmVudCgpID09PSBwYWdlLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3sgcGFnZS5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNlbS1wYWdpbmF0aW9uLW5leHRcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicC5pc0xhc3RQYWdlKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhcC5pc0xhc3RQYWdlKClcIiAoY2xpY2spPVwicC5uZXh0KClcIj4gPiA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9wYWdpbmF0aW9uLXRlbXBsYXRlPlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2ssOmhvc3R7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxe21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10MnttYXJnaW4tdG9wOjFyZW19Lm1yMnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxe3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAye3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4MntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4M3twYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleHtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0YXJ0e2FsaWduLWNvbnRlbnQ6ZmxleC1zdGFydH0uY29udGVudC1lbmR7YWxpZ24tY29udGVudDpmbGV4LWVuZH0uY29udGVudC1jZW50ZXJ7YWxpZ24tY29udGVudDpjZW50ZXJ9LmNvbnRlbnQtYmV0d2VlbnthbGlnbi1jb250ZW50OnNwYWNlLWJldHdlZW59LmNvbnRlbnQtYXJvdW5ke2FsaWduLWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0cmV0Y2h7YWxpZ24tY29udGVudDpzdHJldGNofS5mbGV4LWF1dG97ZmxleDoxIDEgYXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjB9LmZsZXgtbm9uZXtmbGV4Om5vbmV9Lm9yZGVyLTB7b3JkZXI6MH0ub3JkZXItMXtvcmRlcjoxfS5vcmRlci0ye29yZGVyOjJ9Lm9yZGVyLTN7b3JkZXI6M30ub3JkZXItbGFzdHtvcmRlcjo5OTk5OX0ucmVsYXRpdmV7cG9zaXRpb246cmVsYXRpdmV9LmFic29sdXRle3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTB7dG9wOjB9LnJpZ2h0LTB7cmlnaHQ6MH0uYm90dG9tLTB7Ym90dG9tOjB9LmxlZnQtMHtsZWZ0OjB9Lnoxe3otaW5kZXg6MX0uejJ7ei1pbmRleDoyfS56M3t6LWluZGV4OjN9Lno0e3otaW5kZXg6NH0uYm9yZGVye2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MXB4fS5ib3JkZXItdG9we2JvcmRlci10b3Atc3R5bGU6c29saWQ7Ym9yZGVyLXRvcC13aWR0aDoxcHh9LmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweH0uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5ib3JkZXItbGVmdHtib3JkZXItbGVmdC1zdHlsZTpzb2xpZDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmJvcmRlci1ub25le2JvcmRlcjowfS5yb3VuZGVke2JvcmRlci1yYWRpdXM6M3B4fS5jaXJjbGV7Ym9yZGVyLXJhZGl1czo1MCV9LnJvdW5kZWQtdG9we2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LnJvdW5kZWQtcmlnaHR7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0ucm91bmRlZC1ib3R0b217Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0ucm91bmRlZC1sZWZ0e2JvcmRlci1yYWRpdXM6M3B4IDAgMCAzcHh9Lm5vdC1yb3VuZGVke2JvcmRlci1yYWRpdXM6MH0uaGlkZXtwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7aGVpZ2h0OjFweDt3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpfUBtZWRpYSAobWF4LXdpZHRoOjQwZW0pey54cy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pIGFuZCAobWF4LXdpZHRoOjUyZW0pey5zbS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pIGFuZCAobWF4LXdpZHRoOjY0ZW0pey5tZC1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdHtiYWNrZ3JvdW5kOiNmZmZ9LnNlbS12aWRlby1jb250YWluZXJ7d2lkdGg6MjEwcHh9LnNlbS12aWRlby1jb250YWluZXItLXJlc3VsdHNfcHJldmlld3ttaW4taGVpZ2h0Ojk2cHg7ZGlzcGxheTpibG9jaztiYWNrZ3JvdW5kLWNvbG9yOiNkZWRlZGV9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9TZXR0aW5nc1BhbmVsQ29tcG9uZW50IHtcbiAgQE91dHB1dCgpIGNsb3NlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPFlvdXR1YmVWaWRlb01vZGVsPiA9IG5ldyBFdmVudEVtaXR0ZXI8WW91dHViZVZpZGVvTW9kZWw+KCk7XG4gIEBJbnB1dCgpICBjb25maWc7XG4gIHJlc3VsdHM6IEFycmF5PFlvdXR1YmVWaWRlb01vZGVsPiA9IFtdO1xuICBwYWdlOiBudW1iZXIgPSAxO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlbVZpZGVvU2VydmljZTogU2VtVmlkZW9TZXJ2aWNlKSB7IH1cbiAgbG9hZFNldHRpbmdzKCl7fVxuICBzZWFyY2gocXVlcnkpIHtcbiAgICBjb25zb2xlLmxvZygncXVlcnknLCBxdWVyeSk7XG4gICAgdGhpcy5zZW1WaWRlb1NlcnZpY2UuZmV0Y2hWaWRlb3MocXVlcnkpLnN1YnNjcmliZSgoZGF0YTphbnkpID0+IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IGRhdGEuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFZpZGVvTW9kZWwoXG4gICAgICAgICAgaXRlbS5pZC52aWRlb0lkLFxuICAgICAgICAgIGl0ZW0uc25pcHBldC50aXRsZSxcbiAgICAgICAgICBpdGVtLnNuaXBwZXQudGh1bWJuYWlscy5oaWdoLnVybCxcbiAgICAgICAgICBpdGVtLnNuaXBwZXQuY2hhbm5lbFRpdGxlLFxuICAgICAgICAgIGl0ZW0uc25pcHBldC5jaGFubmVsSWQsXG4gICAgICAgICAgaXRlbS5zbmlwcGV0LmRlc2NyaXB0aW9uKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGFkZFZpZGVvKGl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQoaXRlbSk7XG4gIH1cbiAgY2xvc2VEaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZS5lbWl0KGZhbHNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgLCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWW91dHViZVZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdmlkZW8nO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvcixcbiAgc2VsZWN0b3I6ICdbc2VtLXZpZGVvLWNvbnRhaW5lcl0nLFxuICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJlbWJlZC1jb250YWluZXJcIiAqbmdJZj1cImRhdGEgJiYgZGF0YS5oYXNPd25Qcm9wZXJ0eSgndmlkZW9JZCcpXCI+XG4gICAgPGlmcmFtZSB3aWR0aD1cIjEwMCVcIlxuICAgIGhlaWdodD1cIjEwMCVcIlxuICAgIGZyYW1lYm9yZGVyPVwiMFwiXG4gICAgYWxsb3dmdWxsc2NyZWVuXG4gICAgW3NyY109XCJkYXRhLnZpZGVvSWQgfCB5b3V0dWJlU2FmZVVybFwiXG4gICAgc3R5bGU9XCJib3JkZXI6IHNvbGlkIDFweCBibGFja1wiID5cbiAgICA8L2lmcmFtZT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lci0tbmF2XCI+XG4gICAgPGJ1dHRvblxuICAgICAgc2VtLWJ0bi1mYWJcbiAgICAgIGNvcm5lcj1cInRvcC1yaWdodFwiXG4gICAgICBzZW11aS10aGVtZT1cImxpZ2h0XCJcbiAgICAgIGNsYXNzPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBcIlxuICAgICAgc2VtLWltcG9ydGFuY2U9XCJzZWNvbmRhcnlcIlxuICAgICAgI2NoYXRPdmVybGF5PVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgICBjZGtPdmVybGF5T3JpZ2luXG4gICAgICAoY2xpY2spPVwib3BlblRlc3RBKCFpc1Rlc3RBT3BlbmVkKVwiXG4gICAgPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXByb2ZpbGUtYWNjZW50XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGF0aDFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJwYXRoMlwiPjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxzZW11aS1vdmVybGF5LWRpYWxvZ1xuICAgICAgW292ZXJsYXlPcmlnaW5dPVwiY2hhdE92ZXJsYXlcIlxuICAgICAgW2lzT3BlbmVkXT1cImlzVGVzdEFPcGVuZWRcIlxuICAgICAgKGNsb3NlKT1cIm9wZW5UZXN0QShmYWxzZSlcIlxuICAgICAgKG9wZW4pPVwib3BlblRlc3RBKHRydWUpXCJcbiAgICAgIFtvdmVybGF5V2lkdGhdPVwiJ2F1dG8nXCJcbiAgICA+XG4gICAgICAgIDxkaXYgc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsXG4gICAgICAgICAgW2NvbmZpZ109XCJwYWdpbmF0aW9uQ29uZmlnXCJcbiAgICAgICAgICAoc2VsZWN0ZWQpPVwic2VsZWN0ZWRJdGVtKCRldmVudClcIlxuICAgICAgICAgIChjbG9zZSk9XCJjbG9zZU92ZXJsYXkoJGV2ZW50KVwiPlxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvc2VtdWktb3ZlcmxheS1kaWFsb2c+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7YmFja2dyb3VuZC1jb2xvcjojZjVlNWU1O2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjOGIwMDAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YTogWW91dHViZVZpZGVvTW9kZWw7XG4gIEBPdXRwdXQoKSBkYXRhQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyBpc1Rlc3RBT3BlbmVkID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuICBwYWdpbmF0aW9uQ29uZmlnOiBQYWdpbmF0aW9uSW5zdGFuY2UgPSB7XG4gICAgaWQ6ICdjdXN0b20nLFxuICAgIGl0ZW1zUGVyUGFnZTogMixcbiAgICBjdXJyZW50UGFnZTogMVxuICB9O1xuICBzZWxlY3RlZEl0ZW0oaXRlbTogWW91dHViZVZpZGVvTW9kZWwpOiB2b2lkIHtcbiAgICAvLyB0aGlzLmRhdGFDaGFuZ2UuZW1pdChpdGVtKTtcbiAgICAvLyBUT0RPIE5lZWQgZW5hYmxlIHRoaXMgd2hlbiB5b3UgdGVzdCBpdFxuICAgIHRoaXMuZGF0YSA9IGl0ZW07XG4gIH1cbiAgbmdPbkluaXQoKSB7fVxuICBjbG9zZU92ZXJsYXkodG9nZ2xlU3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gdG9nZ2xlU3RhdHVzO1xuICB9XG4gIG9wZW5UZXN0QShpc09wZW5lZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IGlzT3BlbmVkO1xuICB9XG5cblxufVxuIiwiaW1wb3J0IHtcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgTmdNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGb3Jtc01vZHVsZSxcbiAgUmVhY3RpdmVGb3Jtc01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNlbU1lZGlhUGFuZWxTZXR0aW5nc0NvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9zZW0tbWVkaWEtcGFuZWwvc2VtLW1lZGlhLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1VcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtaW1hZ2UtdXBsb2FkL21lZGlhLXVwbG9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtQ3JvcHBlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1jcm9wcGVyL21lZGlhLWNyb3BwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbUNvbnRyb2xzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21lZGlhLWNvbnRyb2xzL21lZGlhLWNvbnRyb2xzLmNvbXBuZW50JztcbmltcG9ydCB7IFNsaWRlUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2xpZGUtcGFuZWwvc2xpZGUtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbU1lZGlhU2V0dGluZ3NDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXNldHRpbmdzL3NlbS1tZWRpYS1zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVkaWFFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21lZGlhLWVkaXQvbWVkaWEtZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtTWVkaWFDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLW1lZGlhLWNvbnRhaW5lci9zZW0tbWVkaWEtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1VaUtpdFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2VtLXVpLXNoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgU2VtTWF0ZXJpYWxTaGFyZWRNb2R1bGUgfSBmcm9tICcuL3NlbS1tYXRlcmlhbC1zaGFyZWQubW9kdWxlJztcblxuaW1wb3J0IHsgSW1hZ2VDcm9wcGVyTW9kdWxlIH0gZnJvbSAnbmd4LWltYWdlLWNyb3BwZXInO1xuaW1wb3J0IHsgRmlsZURyb3BNb2R1bGUgfSBmcm9tICduZ3gtZmlsZS1kcm9wJztcbmltcG9ydCB7IEFuZ3VsYXJDcm9wcGVyanNNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWNyb3BwZXJqcyc7XG5cbmltcG9ydCB7IE5neFBhZ2luYXRpb25Nb2R1bGUgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBZb3V0dWJlU2FmZVVybFBpcGUgfSBmcm9tICcuL3NhZmUtdXJsLnBpcGUnO1xuXG5pbXBvcnQgeyBTZW1WaWRlb1NldHRpbmdzUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsL3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLXZpZGVvLWNvbnRhaW5lci9zZW0tdmlkZW8tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1WaWRlb1NlcnZpY2UgfSBmcm9tICcuL3NlbS12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbU1lZGlhU2VydmljZSB9IGZyb20gJy4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBOZ3hQYWdpbmF0aW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgSW1hZ2VDcm9wcGVyTW9kdWxlLFxuICAgIEZpbGVEcm9wTW9kdWxlLFxuICAgIEFuZ3VsYXJDcm9wcGVyanNNb2R1bGUsXG4gICAgU2VtTWF0ZXJpYWxTaGFyZWRNb2R1bGUsXG4gICAgU2VtVWlLaXRTaGFyZWRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2VtTWVkaWFQYW5lbFNldHRpbmdzQ29tcG9uZW50LFxuICAgIFNlbVVwbG9hZENvbXBvbmVudCxcbiAgICBTZW1Dcm9wcGVyQ29tcG9uZW50LFxuICAgIFNlbUNvbnRyb2xzQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhU2V0dGluZ3NDb21wb25lbnQsXG4gICAgTWVkaWFFZGl0Q29tcG9uZW50LFxuICAgIFNsaWRlUGFuZWxDb21wb25lbnQsXG4gICAgU2VtTWVkaWFDb250YWluZXJDb21wb25lbnQsXG4gICAgWW91dHViZVNhZmVVcmxQaXBlLFxuICAgIFNlbVZpZGVvU2V0dGluZ3NQYW5lbENvbXBvbmVudCxcbiAgICBTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNlbU1lZGlhUGFuZWxTZXR0aW5nc0NvbXBvbmVudCxcbiAgICBTZW1VcGxvYWRDb21wb25lbnQsXG4gICAgU2VtQ3JvcHBlckNvbXBvbmVudCxcbiAgICBTZW1Db250cm9sc0NvbXBvbmVudCxcbiAgICBTZW1NZWRpYVNldHRpbmdzQ29tcG9uZW50LFxuICAgIE1lZGlhRWRpdENvbXBvbmVudCxcbiAgICBTbGlkZVBhbmVsQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFNlbVZpZGVvU2V0dGluZ3NQYW5lbENvbXBvbmVudCxcbiAgICBTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTZW1NZWRpYVNlcnZpY2UsXG4gICAgU2VtVmlkZW9TZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtTWVkaWFNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNlbU1lZGlhTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbU2VtTWVkaWFTZXJ2aWNlLCBTZW1WaWRlb1NlcnZpY2VdXG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiU3ViamVjdCIsIl8uY2xvbmVEZWVwIiwiSW5qZWN0YWJsZSIsIk5nWm9uZSIsIkh0dHBDbGllbnQiLCJJbmplY3QiLCJQTEFURk9STV9JRCIsIkV2ZW50RW1pdHRlciIsImlzUGxhdGZvcm1Ccm93c2VyIiwiQ29tcG9uZW50IiwiT3V0cHV0IiwiSW5wdXQiLCJ0c2xpYl8xLl9fdmFsdWVzIiwidHJpZ2dlciIsInRyYW5zaXRpb24iLCJzdHlsZSIsImFuaW1hdGUiLCJWaWV3Q2hpbGQiLCJDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSIsInN0YXRlIiwiRm9ybUJ1aWxkZXIiLCJJbmplY3RvciIsIlNlbVVpQnV0dG9uTW9kdWxlIiwiU2VtVWlCdXR0b25GYWJNb2R1bGUiLCJTZW1VaU92ZXJsYXlEaWFsb2dNb2R1bGUiLCJTZW1VaVRhYnNNb2R1bGUiLCJTZW1VaVRodW1ibmFpbExhcmdlTW9kdWxlIiwiTmdNb2R1bGUiLCJBMTF5TW9kdWxlIiwiQmlkaU1vZHVsZSIsIk9ic2VydmVyc01vZHVsZSIsIk92ZXJsYXlNb2R1bGUiLCJQbGF0Zm9ybU1vZHVsZSIsIlBvcnRhbE1vZHVsZSIsIlNjcm9sbERpc3BhdGNoTW9kdWxlIiwiQ2RrU3RlcHBlck1vZHVsZSIsIkNka1RhYmxlTW9kdWxlIiwiUGlwZSIsIkRvbVNhbml0aXplciIsIlZpZXdFbmNhcHN1bGF0aW9uIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIiwiTmd4UGFnaW5hdGlvbk1vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJJbWFnZUNyb3BwZXJNb2R1bGUiLCJGaWxlRHJvcE1vZHVsZSIsIkFuZ3VsYXJDcm9wcGVyanNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQWdCRSx5QkFBbUIsSUFBWTtZQUFaLFNBQUksR0FBSixJQUFJLENBQVE7WUFQL0IsY0FBUyxHQUF1QixFQUFFLENBQUM7WUFDbkMsY0FBUyxLQUFlLEVBQUUsRUFBTyxDQUFDO1lBQzNCLDBCQUFxQixHQUFpQixJQUFJQSxZQUFPLEVBQU8sQ0FBQztZQUN6RCxxQkFBZ0IsR0FBaUIsSUFBSUEsWUFBTyxFQUFPLENBQUM7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