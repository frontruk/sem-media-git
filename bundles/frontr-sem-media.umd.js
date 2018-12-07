(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('lodash'), require('rxjs'), require('@angular/common/http'), require('@angular/common'), require('@angular/animations'), require('@angular/forms'), require('@frontr/sem-ui'), require('@angular/cdk/a11y'), require('@angular/cdk/bidi'), require('@angular/cdk/overlay'), require('@angular/cdk/observers'), require('@angular/cdk/platform'), require('@angular/cdk/portal'), require('@angular/cdk/scrolling'), require('@angular/cdk/stepper'), require('@angular/cdk/table'), require('@angular/platform-browser'), require('ngx-image-cropper'), require('ngx-file-drop'), require('angular-cropperjs'), require('ngx-pagination')) :
    typeof define === 'function' && define.amd ? define('@frontr/sem-media', ['exports', '@angular/core', 'lodash', 'rxjs', '@angular/common/http', '@angular/common', '@angular/animations', '@angular/forms', '@frontr/sem-ui', '@angular/cdk/a11y', '@angular/cdk/bidi', '@angular/cdk/overlay', '@angular/cdk/observers', '@angular/cdk/platform', '@angular/cdk/portal', '@angular/cdk/scrolling', '@angular/cdk/stepper', '@angular/cdk/table', '@angular/platform-browser', 'ngx-image-cropper', 'ngx-file-drop', 'angular-cropperjs', 'ngx-pagination'], factory) :
    (factory((global.frontr = global.frontr || {}, global.frontr['sem-media'] = {}),global.ng.core,null,global.rxjs,global.ng.common.http,global.ng.common,global.ng.animations,global.ng.forms,null,global.ng.cdk.a11y,global.ng.cdk.bidi,global.ng.cdk.overlay,global.ng.cdk.observers,global.ng.cdk.platform,global.ng.cdk.portal,global.ng.cdk.scrolling,global.ng.cdk.stepper,global.ng.cdk.table,global.ng.platformBrowser,null,null,null,null));
}(this, (function (exports,i0,_,rxjs,i1,common,animations,forms,semUi,a11y,bidi,overlay,observers,platform,portal,scrolling,stepper,table,platformBrowser,ngxImageCropper,ngxFileDrop,angularCropperjs,ngxPagination) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.itemSeelcted = false;
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
         * @param {?} item
         * @return {?}
         */
        SemMediaPanelSettingsComponent.prototype.onEdit = /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
            function (index, item) {
                this.editImage.emit(index);
                this.key = index;
                this.visibleControlPanel = true;
                this.itemSeelcted = { i: index, data: item };
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
                this.itemSeelcted = false;
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
        /**
         * @param {?} item
         * @return {?}
         */
        SemMediaPanelSettingsComponent.prototype.editSelected = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
            };
        SemMediaPanelSettingsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'sem-panel',
                        template: "<!--<div class=\"dialog-container&#45;&#45;header\">-->\n  <!--<span class=\"sem-icon-back\" (click)=\"showUploadEvent.emit()\"></span>-->\n\n  <!--<span (click)=\"closeDialog()\">-->\n    <!--<span class=\"sem-icon-back\"></span>-->\n    <!--Close-->\n  <!--</span>-->\n<!--</div>-->\n\n<!-- Upload Mode -->\n\n<!-- Edit Mode -->\n\n\n<!--<hr>-->\n<!--<h4>Creating look and feel</h4>-->\n\n\n<div class=\"dialog-container bg-default left\" style=\"width:100%;\">\n  <div class=\"dialog-container--body\">\n    <div>\n      <div semui-tabs #tabs >\n        <div semui-tab #tab0 [title]=\"'Tab 0'\" class=\"tab-navigation\">\n          <ul semui-list>\n\n            <li semui-list-item\n                list-item\n                semui-importance=\"dark\"\n                (click)=\"tabs.tabClicked(uploadImage)\"\n            >\n              <i class=\"fa icon-sites\"  aria-hidden=\"true\"></i>\n              <span>Upload image</span>\n            </li>\n            <li\n              semui-list-item\n              list-item\n              sem-importance=\"default\"\n              (click)=\"tabs.tabClicked(editImage)\"\n            >\n              <i class=\"fa icon-settings\"  aria-hidden=\"true\"></i>\n              <span>Edit image</span>\n            </li>\n          </ul>\n        </div>\n        <div semui-tab #uploadImage [title]=\"'Upload Image'\" >\n          <div class=\"dialog-container--header\">\n             <span (click)=\"tabs.tabClicked(tab0)\">\n                <span class=\"sem-icon-back\"></span>\n                Close\n            </span>\n          </div>\n          <hr>\n          Upload image\n\n          <div class=\"table flex flex-wrap list-reset px1\" *ngIf=\"!itemSeelcted\">\n            <div\n              *ngIf=\"!editVisible\"\n              sem-upload\n              class=\"col-4 border\"\n              (doneImage)=\"onImageLoaded($event)\"></div>\n            <ng-container  *ngIf=\"!editVisible\">\n              <div class=\"col-4 border\"\n                  *ngFor=\"let item of imageNameList; let i = index\" >\n                {{item}}\n                <img\n                  (click)=\"onEdit(i, item)\"\n                  class=\"rounded\"\n                  src=\"http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg\" class=\"fit\" />\n              </div>\n            </ng-container>\n          </div>\n          <div *ngIf=\"itemSeelcted\">\n            <span class=\"px2\"> {{itemSeelcted | json}}</span>\n            <img\n              (click)=\"editSelected(itemSeelcted)\"\n              class=\"rounded fit px2\"\n              src=\"http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg\"\n            />\n            <sem-media-edit\n              *ngIf=\"editVisible\"\n              (selectedEditMode)=\"onChangedMode($event)\"\n              (formChanged)=\"onChangedForm($event)\"\n              [formData]=\"myForm\"\n            ></sem-media-edit>\n\n            <button sem-button sem-importance=\"secondary\"\n                    (click)=\"onDelete(itemSeelcted)\">Delete</button>\n          </div>\n\n        </div >\n        <div semui-tab #editImage [title]=\"'Edit Image'\" >\n          <div class=\"dialog-container--header\">\n             <span (click)=\"tabs.tabClicked(tab0)\">\n                <span class=\"sem-icon-back\"></span>\n                Close\n             </span>\n          </div>\n          <hr>\n          Edit Image\n        </div >\n        <div semui-tab #tab3 [title]=\"'Tab 3'\">\n          <div class=\"dialog-container--header\">\n             <span (click)=\"tabs.tabClicked(tab0)\">\n                <span class=\"sem-icon-back\"></span>\n                Close\n             </span>\n          </div>\n          <hr>\n          Tab 3 Content\n        </div>\n        <div semui-tab semui-tab #tab4 [title]=\"'Tab 4'\">\n          <div class=\"dialog-container--header\">\n             <span (click)=\"tabs.tabClicked(tab0)\">\n                <span class=\"sem-icon-back\"></span>\n                Close\n             </span>\n          </div>\n          <hr>\n          Tab 4 Content\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n",
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                        selector: '[sem-upload]',
                        template: "<div class=\"center\">\n  <div>\n    <file-drop\n      headertext=\"Drop files here\"\n      (onFileDrop)=\"dropped($event)\"\n      (onFileOver)=\"fileOver($event)\"\n      (onFileLeave)=\"fileLeave($event)\"\n      customstyle=\"drop-area\"\n    ></file-drop>\n    <label >\n\n    </label>\n    <label\n      for=\"file-upload\"\n      class=\"semui-label sem-label-button sem-label-button--primary inline-block px1\">\n      <span class=\"sem-icon-inbox\"></span>\n    </label>\n    <input\n      class=\"sem-input-button--primary\"\n      value=\"Upload\"\n      id=\"file-upload\"\n      type=\"file\"\n      (change)=\"fileChangeEvent($event)\"\n      accept=\"image/*\"\n      multiple>\n\n\n\n  </div>\n</div>\n",
                        styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host .control{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1,:host .control{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .control,:host .upload-btn{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2,:host .upload-btn{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative,:host .control{position:relative}.absolute,:host .control .label-icon{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{display:block}:host input[type=file]{display:none}:host input[type=checkbox]{display:none}:host .upload-btn{background:#05dcb6;color:#fff;border-radius:12px 12px 0}:host .control{color:#fff;width:100%;border-radius:12px 12px 0;background-color:#444d63}:host .control:focus{outline:0}:host .control .label-icon{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:1em}"]
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                        selector: '[sem-cropper]',
                        template: "<div\n  class=\"img-cropper\"\n  (mouseenter)=\"onMouseEnter()\"\n  (mouseleave)=\"onMouseLeave()\">\n  <div class=\"edit-overlay\" [class.active]=\"hoverActive\" (dblclick)=\"editImage()\">\n    <button *ngIf=\"hoverActive\" [@enterAnimation] class=\"p3\" (click)=\"editImage()\">Edit Me!</button>\n  </div>\n  <img\n    *ngIf=\"!croppedImage && !editMode\"\n    [src]=\"imageData\"\n    class=\"preview-image\"\n    (dblclick)=\"editImage()\"\n  >\n  <angular-cropper\n    *ngIf=\"editMode\"\n    #imageCropper\n    [cropperOptions]=\"cropperConfig\"\n    [imageUrl]=\"imageData\"\n  ></angular-cropper>\n  <img\n    *ngIf=\"croppedImage && !editMode\"\n    [src]=\"croppedImage\"\n    class=\"fit w100\"\n    [ngStyle]=\"croppedStyle\"\n    (dblclick)=\"editImage()\">\n\n</div>\n",
                        styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .edit-overlay button{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3,:host .edit-overlay button{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{display:block}:host .w100{width:100%}:host .img-cropper{position:relative}:host .preview-image{width:100%}:host .edit-overlay{position:absolute;top:0;left:0;width:100%;height:100%;transition:.2s ease-in}:host .edit-overlay.active{background-color:rgba(0,0,0,.2)}:host .edit-overlay button{background-color:rgba(255,255,255,.6);position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}"],
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.dataChange = new i0.EventEmitter();
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
         * @param {?} status
         * @return {?}
         */
        SemMediaContainerComponent.prototype.openSettings = /**
         * @param {?} status
         * @return {?}
         */
            function (status) {
                this.isTestAOpened = status;
                this.dataChange.emit({
                    data: this.data,
                    status: status
                });
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
                        // tslint:disable-next-line:component-selector,
                        selector: '[sem-media-container]',
                        template: "<div class=\"sem-dnd-container sem-media-container\">\n\n\n\n  <div *ngIf=\"userImages\" class=\"preview-container\">\n    <div sem-cropper\n      *ngFor=\"let image of userImages;let key = index\"\n      [imageData]=\"image.uploadedImage\"\n      [croppedImage]=\"image.croppedImage\"\n      [editMode]=\"image.editMode\"\n      [config]=\"config\"\n      [key]=\"key\"\n      (enabledCropper)=\"onEnableEditImage(key)\"\n      (croppedImageEvent)=\"onCroppedImage(key, $event)\"\n    ></div>\n  </div>\n  <div class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      small\n      corner=\"top-left\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"inverted\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openSettings(!isTestAOpened)\"\n    >\n      <span class=\"sem-icon-drop_icon\"></span>\n    </button>\n  </div>\n</div>\n",
                        styles: [":host(){background-color:#f5e5e5;display:block;border:1px solid #8b0000;height:100%}.img-cropper{height:100%}"]
                    },] },
        ];
        SemMediaContainerComponent.ctorParameters = function () {
            return [
                { type: SemMediaService },
                { type: i0.Injector }
            ];
        };
        SemMediaContainerComponent.propDecorators = {
            data: [{ type: i0.Input }],
            dataChange: [{ type: i0.Output }]
        };
        return SemMediaContainerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var UiSharedModules = [
        semUi.SemUiButtonModule,
        semUi.SemUiButtonDndModule,
        semUi.SemUiButtonFabModule,
        semUi.SemUiOverlayDialogModule,
        semUi.SemUiTabsModule,
        semUi.SemUiListModule,
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                this.selected.emit({ id: this.dataId, data: item });
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
                        styles: [".h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{background:#fff}.sem-video-container--results_preview{min-height:96px;display:block;background-color:#dedede}"]
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
            config: [{ type: i0.Input }],
            dataId: [{ type: i0.Input }]
        };
        return SemVideoSettingsPanelComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SemVideoContainerComponent = (function () {
        function SemVideoContainerComponent(injector) {
            this.injector = injector;
            this.dataChange = new i0.EventEmitter();
            this.selectedItem = new i0.EventEmitter();
            this.editMode = false;
            this.isTestAOpened = false;
        }
        /**
         * @return {?}
         */
        SemVideoContainerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        // paginationConfig: PaginationInstance = {
        //   id: 'custom',
        //   itemsPerPage: 2,
        //   currentPage: 1
        // };
        // selectedItem(item: YoutubeVideoModel): void {
        //   this.dataChange.emit(item);
        //   // TODO Need enable this when you test it
        //   // this.data = item;
        // }
        // closeOverlay(toggleStatus: boolean): void {
        //   this.isTestAOpened = toggleStatus;
        // }
        // openTestA(isOpened: boolean): void {
        //   this.isTestAOpened = isOpened;
        // }
        //
        // setSelected(id: string) {
        //   this.selectedItem.emit(data.id);
        // }
        // paginationConfig: PaginationInstance = {
        //   id: 'custom',
        //   itemsPerPage: 2,
        //   currentPage: 1
        // };
        // selectedItem(item: YoutubeVideoModel): void {
        //   this.dataChange.emit(item);
        //   // TODO Need enable this when you test it
        //   // this.data = item;
        // }
        // closeOverlay(toggleStatus: boolean): void {
        //   this.isTestAOpened = toggleStatus;
        // }
        // openTestA(isOpened: boolean): void {
        //   this.isTestAOpened = isOpened;
        // }
        //
        // setSelected(id: string) {
        //   this.selectedItem.emit(data.id);
        // }
        /**
         * @param {?} status
         * @return {?}
         */
        SemVideoContainerComponent.prototype.openSettings =
            // paginationConfig: PaginationInstance = {
            //   id: 'custom',
            //   itemsPerPage: 2,
            //   currentPage: 1
            // };
            // selectedItem(item: YoutubeVideoModel): void {
            //   this.dataChange.emit(item);
            //   // TODO Need enable this when you test it
            //   // this.data = item;
            // }
            // closeOverlay(toggleStatus: boolean): void {
            //   this.isTestAOpened = toggleStatus;
            // }
            // openTestA(isOpened: boolean): void {
            //   this.isTestAOpened = isOpened;
            // }
            //
            // setSelected(id: string) {
            //   this.selectedItem.emit(data.id);
            // }
            /**
             * @param {?} status
             * @return {?}
             */
            function (status) {
                // this.isTestAOpened = status;
                this.dataChange.emit(this.data);
            };
        SemVideoContainerComponent.decorators = [
            { type: i0.Component, args: [{
                        // tslint:disable-next-line:component-selector,
                        selector: '[sem-video-container]',
                        template: "\n<div class=\"sem-dnd-container\" *ngIf=\"data.data !== null\">\n  <div class=\"embed-container\" *ngIf=\"data.data.hasOwnProperty('videoId')\">\n    <iframe width=\"100%\"\n    height=\"100%\"\n    frameborder=\"0\"\n    allowfullscreen\n    [src]=\"data.data.videoId | youtubeSafeUrl\"\n    style=\"border: solid 1px black\" >\n    </iframe>\n  </div>\n\n\n  <div *ngIf=\"editMode\" class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      small\n      corner=\"top-left\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"inverted\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openSettings(!isTestAOpened)\"\n    >\n      <span class=\"sem-icon-drop_icon\"></span>\n    </button>\n    <!--<semui-overlay-dialog-->\n      <!--[overlayOrigin]=\"chatOverlay\"-->\n      <!--[isOpened]=\"isTestAOpened\"-->\n      <!--(close)=\"setSelected(false)\"-->\n      <!--(open)=\"setSelected(true)\"-->\n      <!--[overlayWidth]=\"'auto'\"-->\n    <!--&gt;-->\n    <!--</semui-overlay-dialog>-->\n  </div>\n</div>\n",
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
            dataChange: [{ type: i0.Output }],
            selectedItem: [{ type: i0.Output }],
            editMode: [{ type: i0.Input }]
        };
        return SemVideoContainerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SemMediaSettingsContainerComponent = (function () {
        function SemMediaSettingsContainerComponent(_mediaService, injector) {
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
        SemMediaSettingsContainerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @param {?} image
         * @return {?}
         */
        SemMediaSettingsContainerComponent.prototype.uploadedImage = /**
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
        SemMediaSettingsContainerComponent.prototype.onEnableEditImage = /**
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
        SemMediaSettingsContainerComponent.prototype.onEditImage = /**
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
        SemMediaSettingsContainerComponent.prototype.onDeleteImage = /**
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
        SemMediaSettingsContainerComponent.prototype.onMenu = /**
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
        SemMediaSettingsContainerComponent.prototype.onChangedForm = /**
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
        SemMediaSettingsContainerComponent.prototype.onChangedEditMode = /**
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
        SemMediaSettingsContainerComponent.prototype.onCroppedImage = /**
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
        SemMediaSettingsContainerComponent.prototype.openTestA = /**
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
        SemMediaSettingsContainerComponent.prototype.croppedImage = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                console.log('not sure', item);
            };
        SemMediaSettingsContainerComponent.decorators = [
            { type: i0.Component, args: [{
                        // tslint:disable-next-line:component-selector,
                        selector: '[sem-media-settings-container]',
                        template: " <div *ngIf=\"uploadPanelFlag\" class=\"dialog-container bg-default left\" style=\"width:100%;\">\n  <div class=\"dialog-container--body\">\n    <sem-panel\n      [editVisible]=\"editVisible\"\n      [key]=\"key\"\n      [imageNameList]=\"imageNameList\"\n      (cropped)=\"croppedImage($event)\"\n      (uploaded)=\"uploadedImage($event)\"\n      (changedForm)=\"onChangedForm($event)\"\n      (editImage)=\"onEditImage($event)\"\n      (deleteImage)=\"onDeleteImage($event)\"\n      (changedEditMode)=\"onChangedEditMode($event)\"\n      (showUploadEvent)=\"editVisible = false\"\n      [userImages]=\"userImages\"\n    ></sem-panel>\n  </div>\n</div>\n<div *ngIf=\"!uploadPanelFlag\"\n     class=\"settings-container dialog-container bg-default mt4\">\n        <sem-settings\n          (pressedImages)=\"onMenu('IMAGES')\"\n          (pressedDuplicate)=\"onMenu('DUPLICATE')\"\n          (pressedSettings)=\"onMenu('SETTINGS')\"\n          (pressedDelete)=\"onMenu('DELETE')\"\n        >\n        </sem-settings>\n</div>\n\n",
                        styles: [":host(){display:block;border:1px solid #8b0000}.img-cropper{height:100%}"]
                    },] },
        ];
        SemMediaSettingsContainerComponent.ctorParameters = function () {
            return [
                { type: SemMediaService },
                { type: i0.Injector }
            ];
        };
        return SemMediaSettingsContainerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                            // NoopAnimationsModule,
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
                            SemMediaSettingsContainerComponent
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
                            SemVideoContainerComponent,
                            SemMediaSettingsContainerComponent
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    exports.ɵd = SemMediaSettingsContainerComponent;
    exports.ɵc = YoutubeSafeUrlPipe;
    exports.ɵa = SemMaterialSharedModule;
    exports.ɵb = SemUiKitSharedModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRyLXNlbS1tZWRpYS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9zZW0tbWVkaWEuc2VydmljZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS12aWRlby5zZXJ2aWNlLnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvY29udGFpbmVycy9zZW0tbWVkaWEtcGFuZWwvc2VtLW1lZGlhLXBhbmVsLmNvbXBvbmVudC50cyIsbnVsbCwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvY29tcG9uZW50cy9tZWRpYS1pbWFnZS11cGxvYWQvbWVkaWEtdXBsb2FkLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbXBvbmVudHMvbWVkaWEtY3JvcHBlci9tZWRpYS1jcm9wcGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbXBvbmVudHMvbWVkaWEtY29udHJvbHMvbWVkaWEtY29udHJvbHMuY29tcG5lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb21wb25lbnRzL3NsaWRlLXBhbmVsL3NsaWRlLXBhbmVsLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXNldHRpbmdzL3NlbS1tZWRpYS1zZXR0aW5ncy5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb21wb25lbnRzL21lZGlhLWVkaXQvbWVkaWEtZWRpdC5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9zZW0tdWktc2hhcmVkLm1vZHVsZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS1tYXRlcmlhbC1zaGFyZWQubW9kdWxlLnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvc2FmZS11cmwucGlwZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL21vZGVscy92aWRlby50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbnRhaW5lcnMvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsL3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbC5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS1tZWRpYS1zZXR0aW5ncy1jb250YWluZXIvc2VtLW1lZGlhLXNldHRpbmdzLWNvbnRhaW5lci50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS1tZWRpYS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbWFnZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvaW1hZ2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYVNlcnZpY2Uge1xuICBhbGxJbWFnZXM/OiBBcnJheTxJbWFnZU1vZGVsPiA9IFtdO1xuICB0ZW1wSW1hZ2U6IEltYWdlTW9kZWwgPSB7fSBhcyBhbnk7XG4gIHB1YmxpYyBpbWFnZUNvbXBvbmVudENoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIGltYWdlTG9hZENoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIGltYWdlQ29uZmlnQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgdGVtcENoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy50ZW1wSW1hZ2UuZWRpdE1vZGUgPSBmYWxzZSxcbiAgICB0aGlzLnRlbXBJbWFnZS5maWxlTmFtZSA9ICcnO1xuICAgIHRoaXMudGVtcEltYWdlLmNvbnRyb2xCb3ggPSB7XG4gICAgICBhbGxUZXh0OiAnJyxcbiAgICAgIG1ldGFUaXRsZTogJycsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgZml0OiBmYWxzZSxcbiAgICAgICAgY3JvcDogZmFsc2UsXG4gICAgICAgIHpvb206IDAsXG4gICAgICAgIHJvdGF0ZTogMCxcbiAgICAgICAgYXBwbHk6IGZhbHNlLFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy50ZW1wSW1hZ2UuY3JvcHBlZEltYWdlID0gJyc7XG4gICAgdGhpcy50ZW1wSW1hZ2UudXBsb2FkZWRJbWFnZSA9ICcnO1xuICB9XG4gIHB1YmxpYyBvbkxvYWRFbmQoZXZlbnQsIGZpbGVOYW1lKSB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZS5maWxlTmFtZSA9IGZpbGVOYW1lO1xuICAgICAgdGhpcy50ZW1wSW1hZ2UudXBsb2FkZWRJbWFnZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAvLyB0aGlzLmRpc2FibGVBbGxJbWFnZUVkaXQoKTtcbiAgICAgIHRoaXMuYWxsSW1hZ2VzLnB1c2goXy5jbG9uZURlZXAodGhpcy50ZW1wSW1hZ2UpKTtcbiAgICAgIHRoaXMuaW1hZ2VMb2FkQ2hhbmdlcy5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuYWxsSW1hZ2VzKSk7XG4gICAgfSk7XG4gIH1cbiAgcHV0SW1hZ2UoaW1hZ2U6IEZpbGUpIHtcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmaWxlUmVhZGVyLm9ubG9hZGVuZCA9IChlKSA9PiB0aGlzLm9uTG9hZEVuZChlLCBpbWFnZS5uYW1lKTtcbiAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoaW1hZ2UpO1xuICB9XG4gIHB1dENyb3BwZWRJbWFnZShrZXk6IG51bWJlciwgY3JvcHBlZEltYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFsbEltYWdlc1trZXldLmNyb3BwZWRJbWFnZSA9IGNyb3BwZWRJbWFnZTtcbiAgICB0aGlzLmFsbEltYWdlc1trZXldLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgdGhpcy5pbWFnZUNvbXBvbmVudENoYW5nZXMubmV4dChfLmNsb25lRGVlcCh0aGlzLmFsbEltYWdlcykpO1xuICAgIC8qKlxuICAgICAqIHJlbW92ZSBpbiBwcm9kIHZlcnNpb25cbiAgICAgKi9cbiAgICB0aGlzLnRlbXBDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICB9XG4gIGRpc2FibGVBbGxJbWFnZUVkaXQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgdGhpcy5hbGxJbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYWxsSW1hZ2VzW2ldLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvcm1DaGFuZ2VkKGluZGV4LCBmb3JtRGF0YSkge1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmFsbFRleHQgPSBmb3JtRGF0YS5hbGxUZXh0O1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94Lm1ldGFUaXRsZSA9IGZvcm1EYXRhLm1ldGFUaXRsZTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBvbkVkaXRJbWFnZShpbmRleCwgbW9kZSkge1xuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAnRklUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmZpdCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQ1JPUCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5jcm9wID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdaT09NX0lOJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnpvb20gPSAwLjE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnWk9PTV9PVVQnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuem9vbSA9IC0wLjE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUk9UQVRFX0xFRlQnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcucm90YXRlID0gOTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUk9UQVRFX1JJR0hUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnJvdGF0ZSA9IC05MDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBUFBMWSc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5hcHBseSA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5pbWFnZUNvbmZpZ0NoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcpO1xuICAgIC8qKlxuICAgICAqIHJlbW92ZSBpbiBwcm9kIHZlcnNpb25cbiAgICAgKi9cbiAgICAvLyB0aGlzLnRlbXBDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgfVxuICBvbkVkaXRFbmFibGUoaW5kZXgpIHtcbiAgICB0aGlzLmFsbEltYWdlcy5mb3JFYWNoKChpbWFnZSwgaSkgPT4ge1xuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XG4gICAgICAgIGltYWdlLmVkaXRNb2RlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltYWdlLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pbWFnZUNvbXBvbmVudENoYW5nZXMubmV4dChfLmNsb25lRGVlcCh0aGlzLmFsbEltYWdlcykpO1xuICAgIC8qKlxuICAgICAqIHJlbW92ZSBpbiBwcm9kIHZlcnNpb25cbiAgICAgKi9cbiAgICB0aGlzLnRlbXBDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICB9XG4gIGNsZWFyQ29uZmlnKGluZGV4KSB7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmZpdCA9IGZhbHNlO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5jcm9wID0gZmFsc2U7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnJvdGF0ZSA9IDA7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnpvb20gPSAwO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5hcHBseSA9IGZhbHNlO1xuICB9XG4gIG9uRGVsZXRlSW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLmFsbEltYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICAgIC8qKlxuICAgICAqIHJlbW92ZSBpbiBwcm9kIHZlcnNpb25cbiAgICAgKi9cbiAgICB0aGlzLnRlbXBDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICB9XG4gIGNsZWFySW1hZ2VzKCkge1xuICAgIHRoaXMuYWxsSW1hZ2VzID0gW107XG4gICAgdGhpcy5pbWFnZUNvbXBvbmVudENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZW1WaWRlb1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCByZWFkb25seSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwdWJsaWMgcGxhdGZvcm1JZDogT2JqZWN0KSB7IH1cblxuICBwdWJsaWMgZmV0Y2hWaWRlb3MocXVlcnk6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldChgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My9zZWFyY2g/cGFydD1zbmlwcGV0Jm1heFJlc3VsdHM9NSZxPSR7cXVlcnl9XG4gICAgICAmdHlwZT12aWRlbyZrZXk9QUl6YVN5QnN1aGhnSnpnSGhDLXpTSFNha3pEZ0IySDRLZTNnVzU0YCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsXG4gIE9uQ2hhbmdlcywgSW5qZWN0LCBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBGb3JtQXJyYXksIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLXBhbmVsJyxcbiAgdGVtcGxhdGU6IGA8IS0tPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXImIzQ1OyYjNDU7aGVhZGVyXCI+LS0+XG4gIDwhLS08c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIiAoY2xpY2spPVwic2hvd1VwbG9hZEV2ZW50LmVtaXQoKVwiPjwvc3Bhbj4tLT5cblxuICA8IS0tPHNwYW4gKGNsaWNrKT1cImNsb3NlRGlhbG9nKClcIj4tLT5cbiAgICA8IS0tPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCI+PC9zcGFuPi0tPlxuICAgIDwhLS1DbG9zZS0tPlxuICA8IS0tPC9zcGFuPi0tPlxuPCEtLTwvZGl2Pi0tPlxuXG48IS0tIFVwbG9hZCBNb2RlIC0tPlxuXG48IS0tIEVkaXQgTW9kZSAtLT5cblxuXG48IS0tPGhyPi0tPlxuPCEtLTxoND5DcmVhdGluZyBsb29rIGFuZCBmZWVsPC9oND4tLT5cblxuXG48ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lciBiZy1kZWZhdWx0IGxlZnRcIiBzdHlsZT1cIndpZHRoOjEwMCU7XCI+XG4gIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1ib2R5XCI+XG4gICAgPGRpdj5cbiAgICAgIDxkaXYgc2VtdWktdGFicyAjdGFicyA+XG4gICAgICAgIDxkaXYgc2VtdWktdGFiICN0YWIwIFt0aXRsZV09XCInVGFiIDAnXCIgY2xhc3M9XCJ0YWItbmF2aWdhdGlvblwiPlxuICAgICAgICAgIDx1bCBzZW11aS1saXN0PlxuXG4gICAgICAgICAgICA8bGkgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICAgICAgbGlzdC1pdGVtXG4gICAgICAgICAgICAgICAgc2VtdWktaW1wb3J0YW5jZT1cImRhcmtcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJ0YWJzLnRhYkNsaWNrZWQodXBsb2FkSW1hZ2UpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBpY29uLXNpdGVzXCIgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgPHNwYW4+VXBsb2FkIGltYWdlPC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICBzZW11aS1saXN0LWl0ZW1cbiAgICAgICAgICAgICAgbGlzdC1pdGVtXG4gICAgICAgICAgICAgIHNlbS1pbXBvcnRhbmNlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJ0YWJzLnRhYkNsaWNrZWQoZWRpdEltYWdlKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgaWNvbi1zZXR0aW5nc1wiICBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgIDxzcGFuPkVkaXQgaW1hZ2U8L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHNlbXVpLXRhYiAjdXBsb2FkSW1hZ2UgW3RpdGxlXT1cIidVcGxvYWQgSW1hZ2UnXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1oZWFkZXJcIj5cbiAgICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwidGFicy50YWJDbGlja2VkKHRhYjApXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIENsb3NlXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGhyPlxuICAgICAgICAgIFVwbG9hZCBpbWFnZVxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlIGZsZXggZmxleC13cmFwIGxpc3QtcmVzZXQgcHgxXCIgKm5nSWY9XCIhaXRlbVNlZWxjdGVkXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICpuZ0lmPVwiIWVkaXRWaXNpYmxlXCJcbiAgICAgICAgICAgICAgc2VtLXVwbG9hZFxuICAgICAgICAgICAgICBjbGFzcz1cImNvbC00IGJvcmRlclwiXG4gICAgICAgICAgICAgIChkb25lSW1hZ2UpPVwib25JbWFnZUxvYWRlZCgkZXZlbnQpXCI+PC9kaXY+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICAqbmdJZj1cIiFlZGl0VmlzaWJsZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTQgYm9yZGVyXCJcbiAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGltYWdlTmFtZUxpc3Q7IGxldCBpID0gaW5kZXhcIiA+XG4gICAgICAgICAgICAgICAge3tpdGVtfX1cbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25FZGl0KGksIGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwicm91bmRlZFwiXG4gICAgICAgICAgICAgICAgICBzcmM9XCJodHRwOi8vZDJ2NTJrM2NsOXZlZGQuY2xvdWRmcm9udC5uZXQvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci1zcXVhcmUuc3ZnXCIgY2xhc3M9XCJmaXRcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtU2VlbGN0ZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHgyXCI+IHt7aXRlbVNlZWxjdGVkIHwganNvbn19PC9zcGFuPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAoY2xpY2spPVwiZWRpdFNlbGVjdGVkKGl0ZW1TZWVsY3RlZClcIlxuICAgICAgICAgICAgICBjbGFzcz1cInJvdW5kZWQgZml0IHB4MlwiXG4gICAgICAgICAgICAgIHNyYz1cImh0dHA6Ly9kMnY1MmszY2w5dmVkZC5jbG91ZGZyb250Lm5ldC9hc3NldHMvaW1hZ2VzL3BsYWNlaG9sZGVyLXNxdWFyZS5zdmdcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxzZW0tbWVkaWEtZWRpdFxuICAgICAgICAgICAgICAqbmdJZj1cImVkaXRWaXNpYmxlXCJcbiAgICAgICAgICAgICAgKHNlbGVjdGVkRWRpdE1vZGUpPVwib25DaGFuZ2VkTW9kZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgKGZvcm1DaGFuZ2VkKT1cIm9uQ2hhbmdlZEZvcm0oJGV2ZW50KVwiXG4gICAgICAgICAgICAgIFtmb3JtRGF0YV09XCJteUZvcm1cIlxuICAgICAgICAgICAgPjwvc2VtLW1lZGlhLWVkaXQ+XG5cbiAgICAgICAgICAgIDxidXR0b24gc2VtLWJ1dHRvbiBzZW0taW1wb3J0YW5jZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkRlbGV0ZShpdGVtU2VlbGN0ZWQpXCI+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXYgPlxuICAgICAgICA8ZGl2IHNlbXVpLXRhYiAjZWRpdEltYWdlIFt0aXRsZV09XCInRWRpdCBJbWFnZSdcIiA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWhlYWRlclwiPlxuICAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJ0YWJzLnRhYkNsaWNrZWQodGFiMClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgQ2xvc2VcbiAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGhyPlxuICAgICAgICAgIEVkaXQgSW1hZ2VcbiAgICAgICAgPC9kaXYgPlxuICAgICAgICA8ZGl2IHNlbXVpLXRhYiAjdGFiMyBbdGl0bGVdPVwiJ1RhYiAzJ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1oZWFkZXJcIj5cbiAgICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwidGFicy50YWJDbGlja2VkKHRhYjApXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIENsb3NlXG4gICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxocj5cbiAgICAgICAgICBUYWIgMyBDb250ZW50XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHNlbXVpLXRhYiBzZW11aS10YWIgI3RhYjQgW3RpdGxlXT1cIidUYWIgNCdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0taGVhZGVyXCI+XG4gICAgICAgICAgICAgPHNwYW4gKGNsaWNrKT1cInRhYnMudGFiQ2xpY2tlZCh0YWIwKVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tYmFja1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICBDbG9zZVxuICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aHI+XG4gICAgICAgICAgVGFiIDQgQ29udGVudFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2Nre2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMXttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDIsOmhvc3QgLmltZy1jcm9wcGVye21hcmdpbi10b3A6MXJlbX0ubXIyLDpob3N0IC5pbWctY3JvcHBlcnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxe3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAyLDpob3N0IGZvcm17cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgye3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgze3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZXtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGUsOmhvc3QgLmltZy1jcm9wcGVye3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTAsOmhvc3QgLmltZy1jcm9wcGVye3RvcDowfS5yaWdodC0wLDpob3N0IC5pbWctY3JvcHBlcntyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0IC5pbWctY3JvcHBlcnt3aWR0aDo2NTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYVBhbmVsU2V0dGluZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8vIFBsZWFzZSBnZXQgdGhlc2Ugb3V0cHV0cyB3b3JraW5nXG4gIEBPdXRwdXQoKSBjcm9wcGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB1cGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZWRpdEltYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBkZWxldGVJbWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY2hhbmdlZEZvcm0gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNoYW5nZWRFZGl0TW9kZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2hvd1VwbG9hZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyBteUZvcm06IGFueSA9IHt9O1xuICBwdWJsaWMgaW1hZ2VMaXN0OiBBcnJheTxhbnk+ID0gW107XG4gIHB1YmxpYyB2aXNpYmxlQ29udHJvbFBhbmVsOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZWRpdFZpc2libGU6IEJvb2xlYW47XG4gIEBJbnB1dCgpIGtleTogbnVtYmVyO1xuICBASW5wdXQoKSBpbWFnZU5hbWVMaXN0OiBBcnJheTxzdHJpbmc+O1xuICBASW5wdXQoKSB1c2VySW1hZ2VzOiBBcnJheTxhbnk+O1xuXG4gIGl0ZW1TZWVsY3RlZDogYW55ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZDogYW55KSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy52aXNpYmxlQ29udHJvbFBhbmVsID0gdGhpcy5lZGl0VmlzaWJsZTtcbiAgICB9XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgaWYgKHRoaXMudXNlckltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0ZW1wID0ge1xuICAgICAgICBhbGxUZXh0OiB0aGlzLnVzZXJJbWFnZXNbdGhpcy5rZXldLmNvbnRyb2xCb3guYWxsVGV4dCxcbiAgICAgICAgbWV0YVRpdGxlOiB0aGlzLnVzZXJJbWFnZXNbdGhpcy5rZXldLmNvbnRyb2xCb3gubWV0YVRpdGxlXG4gICAgICB9O1xuICAgICAgdGhpcy5teUZvcm0gPSBfLmNsb25lRGVlcCh0ZW1wKTtcbiAgICB9XG4gIH1cbiAgb25JbWFnZUxvYWRlZChmaWxlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZpc2libGVDb250cm9sUGFuZWwgPSBmYWxzZTtcbiAgICB0aGlzLnVwbG9hZGVkLmVtaXQoZmlsZSk7XG4gIH1cbiAgb25DaGFuZ2VkTW9kZShtb2RlKSB7XG4gICAgdGhpcy5jaGFuZ2VkRWRpdE1vZGUuZW1pdChtb2RlKTtcbiAgfVxuICBvbkVkaXQoaW5kZXgsIGl0ZW0pIHtcbiAgICB0aGlzLmVkaXRJbWFnZS5lbWl0KGluZGV4KTtcbiAgICB0aGlzLmtleSA9IGluZGV4O1xuICAgIHRoaXMudmlzaWJsZUNvbnRyb2xQYW5lbCA9IHRydWU7XG4gICAgdGhpcy5pdGVtU2VlbGN0ZWQgPSB7IGk6IGluZGV4LCBkYXRhOiBpdGVtfTtcbiAgfVxuICBvbkRlbGV0ZShpbmRleCkge1xuICAgIHRoaXMuZGVsZXRlSW1hZ2UuZW1pdChpbmRleCk7XG4gICAgdGhpcy5pdGVtU2VlbGN0ZWQgPSBmYWxzZTtcbiAgfVxuICBvbkNoYW5nZWRGb3JtKGZvcm1EYXRhOiBhbnkpIHtcbiAgICB0aGlzLmNoYW5nZWRGb3JtLmVtaXQoZm9ybURhdGEpO1xuICB9XG4gIGNsb3NlRGlhbG9nKCl7XG5cbiAgfVxuXG4gIGVkaXRTZWxlY3RlZChpdGVtKTogdm9pZHtcblxuICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBsb2FkRXZlbnQsIFVwbG9hZEZpbGUsIEZpbGVTeXN0ZW1GaWxlRW50cnksIEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeSB9IGZyb20gJ25neC1maWxlLWRyb3AnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbc2VtLXVwbG9hZF0nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5cbiAgPGRpdj5cbiAgICA8ZmlsZS1kcm9wXG4gICAgICBoZWFkZXJ0ZXh0PVwiRHJvcCBmaWxlcyBoZXJlXCJcbiAgICAgIChvbkZpbGVEcm9wKT1cImRyb3BwZWQoJGV2ZW50KVwiXG4gICAgICAob25GaWxlT3Zlcik9XCJmaWxlT3ZlcigkZXZlbnQpXCJcbiAgICAgIChvbkZpbGVMZWF2ZSk9XCJmaWxlTGVhdmUoJGV2ZW50KVwiXG4gICAgICBjdXN0b21zdHlsZT1cImRyb3AtYXJlYVwiXG4gICAgPjwvZmlsZS1kcm9wPlxuICAgIDxsYWJlbCA+XG5cbiAgICA8L2xhYmVsPlxuICAgIDxsYWJlbFxuICAgICAgZm9yPVwiZmlsZS11cGxvYWRcIlxuICAgICAgY2xhc3M9XCJzZW11aS1sYWJlbCBzZW0tbGFiZWwtYnV0dG9uIHNlbS1sYWJlbC1idXR0b24tLXByaW1hcnkgaW5saW5lLWJsb2NrIHB4MVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1pbmJveFwiPjwvc3Bhbj5cbiAgICA8L2xhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgY2xhc3M9XCJzZW0taW5wdXQtYnV0dG9uLS1wcmltYXJ5XCJcbiAgICAgIHZhbHVlPVwiVXBsb2FkXCJcbiAgICAgIGlkPVwiZmlsZS11cGxvYWRcIlxuICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgKGNoYW5nZSk9XCJmaWxlQ2hhbmdlRXZlbnQoJGV2ZW50KVwiXG4gICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgIG11bHRpcGxlPlxuXG5cblxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5oMXtmb250LXNpemU6MnJlbX0uaDJ7Zm9udC1zaXplOjEuNXJlbX0uaDN7Zm9udC1zaXplOjEuMjVyZW19Lmg0e2ZvbnQtc2l6ZToxcmVtfS5oNXtmb250LXNpemU6Ljg3NXJlbX0uaDZ7Zm9udC1zaXplOi43NXJlbX0uZm9udC1mYW1pbHktaW5oZXJpdHtmb250LWZhbWlseTppbmhlcml0fS5mb250LXNpemUtaW5oZXJpdHtmb250LXNpemU6aW5oZXJpdH0udGV4dC1kZWNvcmF0aW9uLW5vbmV7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmJvbGR7Zm9udC13ZWlnaHQ6NzAwfS5yZWd1bGFye2ZvbnQtd2VpZ2h0OjQwMH0uaXRhbGlje2ZvbnQtc3R5bGU6aXRhbGljfS5jYXBze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMmVtfS5sZWZ0LWFsaWdue3RleHQtYWxpZ246bGVmdH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5yaWdodC1hbGlnbnt0ZXh0LWFsaWduOnJpZ2h0fS5qdXN0aWZ5e3RleHQtYWxpZ246anVzdGlmeX0ubm93cmFwe3doaXRlLXNwYWNlOm5vd3JhcH0uYnJlYWstd29yZHt3b3JkLXdyYXA6YnJlYWstd29yZH0ubGluZS1oZWlnaHQtMXtsaW5lLWhlaWdodDoxfS5saW5lLWhlaWdodC0ye2xpbmUtaGVpZ2h0OjEuMTI1fS5saW5lLWhlaWdodC0ze2xpbmUtaGVpZ2h0OjEuMjV9LmxpbmUtaGVpZ2h0LTR7bGluZS1oZWlnaHQ6MS41fS5saXN0LXN0eWxlLW5vbmV7bGlzdC1zdHlsZTpub25lfS51bmRlcmxpbmV7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udHJ1bmNhdGV7bWF4LXdpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5saXN0LXJlc2V0e2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nLWxlZnQ6MH0uaW5saW5le2Rpc3BsYXk6aW5saW5lfS5ibG9jayw6aG9zdCAuY29udHJvbHtkaXNwbGF5OmJsb2NrfS5pbmxpbmUtYmxvY2t7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhYmxle2Rpc3BsYXk6dGFibGV9LnRhYmxlLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsfS5vdmVyZmxvdy1oaWRkZW57b3ZlcmZsb3c6aGlkZGVufS5vdmVyZmxvdy1zY3JvbGx7b3ZlcmZsb3c6c2Nyb2xsfS5vdmVyZmxvdy1hdXRve292ZXJmbG93OmF1dG99LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcIiBcIjtkaXNwbGF5OnRhYmxlfS5jbGVhcmZpeDphZnRlcntjbGVhcjpib3RofS5sZWZ0e2Zsb2F0OmxlZnR9LnJpZ2h0e2Zsb2F0OnJpZ2h0fS5maXR7bWF4LXdpZHRoOjEwMCV9Lm1heC13aWR0aC0xe21heC13aWR0aDoyNHJlbX0ubWF4LXdpZHRoLTJ7bWF4LXdpZHRoOjMycmVtfS5tYXgtd2lkdGgtM3ttYXgtd2lkdGg6NDhyZW19Lm1heC13aWR0aC00e21heC13aWR0aDo2NHJlbX0uYm9yZGVyLWJveHtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFsaWduLWJhc2VsaW5le3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5hbGlnbi10b3B7dmVydGljYWwtYWxpZ246dG9wfS5hbGlnbi1taWRkbGV7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hbGlnbi1ib3R0b217dmVydGljYWwtYWxpZ246Ym90dG9tfS5tMHttYXJnaW46MH0ubXQwe21hcmdpbi10b3A6MH0ubXIwe21hcmdpbi1yaWdodDowfS5tYjB7bWFyZ2luLWJvdHRvbTowfS5tbDB7bWFyZ2luLWxlZnQ6MH0ubXgwe21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjB9Lm15MHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowfS5tMXttYXJnaW46LjVyZW19Lm10MXttYXJnaW4tdG9wOi41cmVtfS5tcjF7bWFyZ2luLXJpZ2h0Oi41cmVtfS5tYjEsOmhvc3QgLmNvbnRyb2x7bWFyZ2luLWJvdHRvbTouNXJlbX0ubWwxe21hcmdpbi1sZWZ0Oi41cmVtfS5teDF7bWFyZ2luLWxlZnQ6LjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtfS5teTF7bWFyZ2luLXRvcDouNXJlbTttYXJnaW4tYm90dG9tOi41cmVtfS5tMnttYXJnaW46MXJlbX0ubXQye21hcmdpbi10b3A6MXJlbX0ubXIye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTEsOmhvc3QgLmNvbnRyb2wsOmhvc3QgLnVwbG9hZC1idG57cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDJ7cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgyLDpob3N0IC51cGxvYWQtYnRue3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgze3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZSw6aG9zdCAuY29udHJvbHtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGUsOmhvc3QgLmNvbnRyb2wgLmxhYmVsLWljb257cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMHt0b3A6MH0ucmlnaHQtMHtyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0e2Rpc3BsYXk6YmxvY2t9Omhvc3QgaW5wdXRbdHlwZT1maWxlXXtkaXNwbGF5Om5vbmV9Omhvc3QgaW5wdXRbdHlwZT1jaGVja2JveF17ZGlzcGxheTpub25lfTpob3N0IC51cGxvYWQtYnRue2JhY2tncm91bmQ6IzA1ZGNiNjtjb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6MTJweCAxMnB4IDB9Omhvc3QgLmNvbnRyb2x7Y29sb3I6I2ZmZjt3aWR0aDoxMDAlO2JvcmRlci1yYWRpdXM6MTJweCAxMnB4IDA7YmFja2dyb3VuZC1jb2xvcjojNDQ0ZDYzfTpob3N0IC5jb250cm9sOmZvY3Vze291dGxpbmU6MH06aG9zdCAuY29udHJvbCAubGFiZWwtaWNvbnt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7bGVmdDoxZW19YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW1VcGxvYWRDb21wb25lbnQge1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgZG9uZUltYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIHZpc2libGVJbWFnZTogQm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZmlsZXM6IFVwbG9hZEZpbGVbXSA9IFtdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cblxuICBwdWJsaWMgbG9hZGVkSW1hZ2UoKSB7XG4gICAgdGhpcy52aXNpYmxlSW1hZ2UgPSB0cnVlO1xuICB9XG4gIHB1YmxpYyBkcm9wcGVkKGV2ZW50OiBVcGxvYWRFdmVudCkge1xuICAgIHRoaXMuZmlsZXMgPSBldmVudC5maWxlcztcblxuICAgIGZvciAoY29uc3QgZHJvcHBlZEZpbGUgb2YgZXZlbnQuZmlsZXMpIHtcblxuICAgICAgLy8gSXMgaXQgYSBmaWxlP1xuICAgICAgaWYgKGRyb3BwZWRGaWxlLmZpbGVFbnRyeS5pc0ZpbGUpIHtcbiAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gZHJvcHBlZEZpbGUuZmlsZUVudHJ5IGFzIEZpbGVTeXN0ZW1GaWxlRW50cnk7XG4gICAgICAgIGZpbGVFbnRyeS5maWxlKChmaWxlOiBGaWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5kb25lSW1hZ2UuZW1pdChmaWxlKTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAvLyBZb3UgY291bGQgdXBsb2FkIGl0IGxpa2UgdGhpczpcbiAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdsb2dvJywgZmlsZSwgcmVsYXRpdmVQYXRoKVxuXG4gICAgICAgICAgLy8gSGVhZGVyc1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgJ3NlY3VyaXR5LXRva2VuJzogJ215dG9rZW4nXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KCdodHRwczovL215YmFja2VuZC5jb20vYXBpL3VwbG9hZC9zYW5pdGl6ZS1hbmQtc2F2ZS1sb2dvJywgZm9ybURhdGEsIHsgaGVhZGVyczogaGVhZGVycywgcmVzcG9uc2VUeXBlOiAnYmxvYicgfSlcbiAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgLy8gU2FuaXRpemVkIGxvZ28gcmV0dXJuZWQgZnJvbSBiYWNrZW5kXG4gICAgICAgICAgfSlcbiAgICAgICAgICAqKi9cblxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0IHdhcyBhIGRpcmVjdG9yeSAoZW1wdHkgZGlyZWN0b3JpZXMgYXJlIGFkZGVkLCBvdGhlcndpc2Ugb25seSBmaWxlcylcbiAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gZHJvcHBlZEZpbGUuZmlsZUVudHJ5IGFzIEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZmlsZUNoYW5nZUV2ZW50KGV2ZW50KSB7XG4gICAgZm9yIChjb25zdCBjaG9zZW5GaWxlIG9mIGV2ZW50LnRhcmdldC5maWxlcykge1xuICAgICAgdGhpcy5kb25lSW1hZ2UuZW1pdChjaG9zZW5GaWxlKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIGZpbGVPdmVyKGV2ZW50KSB7XG4gIH1cblxuICBwdWJsaWMgZmlsZUxlYXZlKGV2ZW50KSB7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgT25DaGFuZ2VzLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFuZ3VsYXJDcm9wcGVyanNDb21wb25lbnQgfSBmcm9tICdhbmd1bGFyLWNyb3BwZXJqcyc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tzZW0tY3JvcHBlcl0nLFxuICB0ZW1wbGF0ZTogYDxkaXZcbiAgY2xhc3M9XCJpbWctY3JvcHBlclwiXG4gIChtb3VzZWVudGVyKT1cIm9uTW91c2VFbnRlcigpXCJcbiAgKG1vdXNlbGVhdmUpPVwib25Nb3VzZUxlYXZlKClcIj5cbiAgPGRpdiBjbGFzcz1cImVkaXQtb3ZlcmxheVwiIFtjbGFzcy5hY3RpdmVdPVwiaG92ZXJBY3RpdmVcIiAoZGJsY2xpY2spPVwiZWRpdEltYWdlKClcIj5cbiAgICA8YnV0dG9uICpuZ0lmPVwiaG92ZXJBY3RpdmVcIiBbQGVudGVyQW5pbWF0aW9uXSBjbGFzcz1cInAzXCIgKGNsaWNrKT1cImVkaXRJbWFnZSgpXCI+RWRpdCBNZSE8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxpbWdcbiAgICAqbmdJZj1cIiFjcm9wcGVkSW1hZ2UgJiYgIWVkaXRNb2RlXCJcbiAgICBbc3JjXT1cImltYWdlRGF0YVwiXG4gICAgY2xhc3M9XCJwcmV2aWV3LWltYWdlXCJcbiAgICAoZGJsY2xpY2spPVwiZWRpdEltYWdlKClcIlxuICA+XG4gIDxhbmd1bGFyLWNyb3BwZXJcbiAgICAqbmdJZj1cImVkaXRNb2RlXCJcbiAgICAjaW1hZ2VDcm9wcGVyXG4gICAgW2Nyb3BwZXJPcHRpb25zXT1cImNyb3BwZXJDb25maWdcIlxuICAgIFtpbWFnZVVybF09XCJpbWFnZURhdGFcIlxuICA+PC9hbmd1bGFyLWNyb3BwZXI+XG4gIDxpbWdcbiAgICAqbmdJZj1cImNyb3BwZWRJbWFnZSAmJiAhZWRpdE1vZGVcIlxuICAgIFtzcmNdPVwiY3JvcHBlZEltYWdlXCJcbiAgICBjbGFzcz1cImZpdCB3MTAwXCJcbiAgICBbbmdTdHlsZV09XCJjcm9wcGVkU3R5bGVcIlxuICAgIChkYmxjbGljayk9XCJlZGl0SW1hZ2UoKVwiPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2t7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxe21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10MnttYXJnaW4tdG9wOjFyZW19Lm1yMnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxLDpob3N0IC5lZGl0LW92ZXJsYXkgYnV0dG9ue3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAye3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4MntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4Myw6aG9zdCAuZWRpdC1vdmVybGF5IGJ1dHRvbntwYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleHtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0YXJ0e2FsaWduLWNvbnRlbnQ6ZmxleC1zdGFydH0uY29udGVudC1lbmR7YWxpZ24tY29udGVudDpmbGV4LWVuZH0uY29udGVudC1jZW50ZXJ7YWxpZ24tY29udGVudDpjZW50ZXJ9LmNvbnRlbnQtYmV0d2VlbnthbGlnbi1jb250ZW50OnNwYWNlLWJldHdlZW59LmNvbnRlbnQtYXJvdW5ke2FsaWduLWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0cmV0Y2h7YWxpZ24tY29udGVudDpzdHJldGNofS5mbGV4LWF1dG97ZmxleDoxIDEgYXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjB9LmZsZXgtbm9uZXtmbGV4Om5vbmV9Lm9yZGVyLTB7b3JkZXI6MH0ub3JkZXItMXtvcmRlcjoxfS5vcmRlci0ye29yZGVyOjJ9Lm9yZGVyLTN7b3JkZXI6M30ub3JkZXItbGFzdHtvcmRlcjo5OTk5OX0ucmVsYXRpdmV7cG9zaXRpb246cmVsYXRpdmV9LmFic29sdXRle3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTB7dG9wOjB9LnJpZ2h0LTB7cmlnaHQ6MH0uYm90dG9tLTB7Ym90dG9tOjB9LmxlZnQtMHtsZWZ0OjB9Lnoxe3otaW5kZXg6MX0uejJ7ei1pbmRleDoyfS56M3t6LWluZGV4OjN9Lno0e3otaW5kZXg6NH0uYm9yZGVye2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MXB4fS5ib3JkZXItdG9we2JvcmRlci10b3Atc3R5bGU6c29saWQ7Ym9yZGVyLXRvcC13aWR0aDoxcHh9LmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweH0uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5ib3JkZXItbGVmdHtib3JkZXItbGVmdC1zdHlsZTpzb2xpZDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmJvcmRlci1ub25le2JvcmRlcjowfS5yb3VuZGVke2JvcmRlci1yYWRpdXM6M3B4fS5jaXJjbGV7Ym9yZGVyLXJhZGl1czo1MCV9LnJvdW5kZWQtdG9we2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LnJvdW5kZWQtcmlnaHR7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0ucm91bmRlZC1ib3R0b217Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0ucm91bmRlZC1sZWZ0e2JvcmRlci1yYWRpdXM6M3B4IDAgMCAzcHh9Lm5vdC1yb3VuZGVke2JvcmRlci1yYWRpdXM6MH0uaGlkZXtwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7aGVpZ2h0OjFweDt3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpfUBtZWRpYSAobWF4LXdpZHRoOjQwZW0pey54cy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pIGFuZCAobWF4LXdpZHRoOjUyZW0pey5zbS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pIGFuZCAobWF4LXdpZHRoOjY0ZW0pey5tZC1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdHtkaXNwbGF5OmJsb2NrfTpob3N0IC53MTAwe3dpZHRoOjEwMCV9Omhvc3QgLmltZy1jcm9wcGVye3Bvc2l0aW9uOnJlbGF0aXZlfTpob3N0IC5wcmV2aWV3LWltYWdle3dpZHRoOjEwMCV9Omhvc3QgLmVkaXQtb3ZlcmxheXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt0cmFuc2l0aW9uOi4ycyBlYXNlLWlufTpob3N0IC5lZGl0LW92ZXJsYXkuYWN0aXZle2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMil9Omhvc3QgLmVkaXQtb3ZlcmxheSBidXR0b257YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC42KTtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjUwJTt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKX1gXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXG4gICAgICAnZW50ZXJBbmltYXRpb24nLCBbXG4gICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxuICAgICAgICAgIGFuaW1hdGUoJzUwMG1zJywgc3R5bGUoe29wYWNpdHk6IDF9KSlcbiAgICAgICAgXSksXG4gICAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMX0pLFxuICAgICAgICAgIGFuaW1hdGUoJzUwMG1zJywgc3R5bGUoe29wYWNpdHk6IDB9KSlcbiAgICAgICAgXSlcbiAgICAgIF1cbiAgICApXG4gIF0sXG59KVxuXG5leHBvcnQgY2xhc3MgU2VtQ3JvcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgnaW1hZ2VDcm9wcGVyJykgcHVibGljIGltYWdlQ3JvcHBlcjogQW5ndWxhckNyb3BwZXJqc0NvbXBvbmVudDtcbiAgQElucHV0KCkgaW1hZ2VEYXRhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNyb3BwZWRJbWFnZTogc3RyaW5nO1xuICBASW5wdXQoKSBjb25maWc6IGFueSA9IHt9O1xuICBASW5wdXQoKSBlZGl0TW9kZTogYm9vbGVhbjtcbiAgQElucHV0KCkga2V5OiBudW1iZXI7XG4gIEBPdXRwdXQoKSBlbmFibGVkQ3JvcHBlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY3JvcHBlZEltYWdlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgY3JvcHBlckNvbmZpZzogYW55O1xuICBlZGl0VmlzaWJsZTogQm9vbGVhbiA9ICBmYWxzZTtcbiAgY3JvcHBlZERhdGE6IGFueTtcbiAgY3JvcHBlZFN0eWxlOiBhbnk7XG4gIGhvdmVyQWN0aXZlOiBCb29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lLCBwdWJsaWMgX21lZGlhU2VydmljZTogU2VtTWVkaWFTZXJ2aWNlKSB7XG4gICAgdGhpcy5jcm9wcGVyQ29uZmlnID0ge1xuICAgICAgbW92YWJsZTogdHJ1ZSxcbiAgICAgIHNjYWxhYmxlOiBmYWxzZSxcbiAgICAgIHpvb21hYmxlOiB0cnVlLFxuICAgICAgdmlld01vZGU6IDEsXG4gICAgICBndWlkZXM6IHRydWUsXG4gICAgICByb3RhdGFibGU6IHRydWUsXG4gICAgICBkcmFnTW9kZTogJ21vdmUnLFxuICAgICAgY2hlY2tDcm9zc09yaWdpbjogdHJ1ZSxcbiAgICAgIHJlYWR5OiAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5jcm9wcGVyLmNsZWFyKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmNvbmZpZyAmJiB0aGlzLmltYWdlQ3JvcHBlcikge1xuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuZml0KSB7XG4gICAgICAgIHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIucmVzZXQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLmNyb3ApIHtcbiAgICAgICAgLy8gdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5zZXREcmFnTW9kZSgnY3JvcCcpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuem9vbSAhPT0gMCkge1xuICAgICAgICB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLnpvb20oY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLnpvb20pO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUucm90YXRlICE9PSAwKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIucm90YXRlKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5yb3RhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuYXBwbHkpIHtcbiAgICAgICAgY29uc3QgY3JvcHBlZEltYWdlID0gdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci5nZXRDcm9wcGVkQ2FudmFzKCkudG9EYXRhVVJMKCdpbWFnZS9qcGcnKTtcbiAgICAgICAgdGhpcy5jcm9wcGVkRGF0YSA9IHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIuZ2V0Q3JvcEJveERhdGEoKTtcbiAgICAgICAgdGhpcy5jcm9wcGVkU3R5bGUgPSB7XG4gICAgICAgICAgJ3RvcC5weCc6IHRoaXMuY3JvcHBlZERhdGEudG9wLFxuICAgICAgICAgICdsZWZ0LnB4JzogdGhpcy5jcm9wcGVkRGF0YS5sZWZ0LFxuICAgICAgICAgICd3aWR0aC5weCc6IHRoaXMuY3JvcHBlZERhdGEud2lkdGgsXG4gICAgICAgICAgJ2hlaWdodC5weCc6IHRoaXMuY3JvcHBlZERhdGEuaGVpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyb3BwZWRJbWFnZUV2ZW50LmVtaXQoY3JvcHBlZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZXMua2V5ICYmIGNoYW5nZXMua2V5LmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5rZXkgPSBjaGFuZ2VzLmtleS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG4gIG5nT25Jbml0KCkge31cbiAgaW1hZ2VMb2FkZWQoKSB7XG4gICAgICAvLyBzaG93IGNyb3BwZXJcbiAgfVxuICBsb2FkSW1hZ2VGYWlsZWQoKSB7XG4gICAgICAvLyBzaG93IG1lc3NhZ2VcbiAgfVxuICBlZGl0SW1hZ2UoKSB7XG4gICAgdGhpcy5jcm9wcGVkSW1hZ2UgPSAnJztcbiAgICB0aGlzLmVuYWJsZWRDcm9wcGVyLmVtaXQoKTtcbiAgfVxuICBvbk1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy5ob3ZlckFjdGl2ZSA9IHRydWU7XG4gIH1cbiAgb25Nb3VzZUxlYXZlKCkge1xuICAgIHRoaXMuaG92ZXJBY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tY29udHJvbHMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmbGV4IG15MVwiPlxuICA8ZGl2IGNsYXNzPVwiY29sLTYgcHgxXCI+XG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gZm9yPVwiZml0LWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZEZpdC5lbWl0KClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1yZXNpemUgbGFiZWwtaWNvblwiPjwvc3Bhbj5GaXRcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIGZvcj1cInJvdGF0ZS1sZWZ0LWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZFJvdGF0ZUxlZnQuZW1pdCgpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcmVzaXplIGxhYmVsLWljb25cIj48L3NwYW4+Um90YXRlIExlZnRcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIGZvcj1cInpvb20taW4tY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJwcmVzc2VkWm9vbUluLmVtaXQoKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXJlc2l6ZSBsYWJlbC1pY29uXCI+PC9zcGFuPlpvb20gaW5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbC02IHB4MVwiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPGJ1dHRvbiBmb3I9XCJjcm9wLWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZENyb3AuZW1pdCgpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1yZXNpemUgbGFiZWwtaWNvblwiPjwvc3Bhbj5Dcm9wXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8YnV0dG9uIGZvcj1cInJvdGF0ZS1yaWdodC1jb250cm9sXCIgY2xhc3M9XCJjb250cm9sXCIgKGNsaWNrKT1cInByZXNzZWRSb3RhdGVSaWdodC5lbWl0KClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXJlc2l6ZSBsYWJlbC1pY29uXCI+PC9zcGFuPlJvdGF0ZSByaWdodFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGJ1dHRvbiBmb3I9XCJ6b29tLW91dC1jb250cm9sXCIgY2xhc3M9XCJjb250cm9sXCIgKGNsaWNrKT1cInByZXNzZWRab29tT3V0LmVtaXQoKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcmVzaXplIGxhYmVsLWljb25cIj48L3NwYW4+Wm9vbSBvdXRcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2NrLDpob3N0IC5jb250cm9se2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMSw6aG9zdCAuY29udHJvbHttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MSw6aG9zdCAuY29udHJvbHtwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDN7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZlLDpob3N0IC5jb250cm9se3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZSw6aG9zdCAuY29udHJvbCAubGFiZWwtaWNvbntwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3QgLmNvbnRyb2x7Y29sb3I6I2ZmZjt3aWR0aDoxMDAlO2JvcmRlci1yYWRpdXM6MTJweCAxMnB4IDA7YmFja2dyb3VuZC1jb2xvcjojNDQ0ZDYzfTpob3N0IC5jb250cm9sOmZvY3Vze291dGxpbmU6MH06aG9zdCAuY29udHJvbCAubGFiZWwtaWNvbnt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7bGVmdDoxZW19YF0sXG59KVxuXG5leHBvcnQgY2xhc3MgU2VtQ29udHJvbHNDb21wb25lbnQge1xuICBAT3V0cHV0KCkgcHVibGljIHByZXNzZWRGaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBwcmVzc2VkQ3JvcCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHVibGljIHByZXNzZWRSb3RhdGVMZWZ0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZFJvdGF0ZVJpZ2h0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZFpvb21JbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHVibGljIHByZXNzZWRab29tT3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG59XG5cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBpbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFBhbmVUeXBlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tc2xpZGUtcGFuZWwnLFxuICBzdHlsZXM6IFtgOmhvc3R7ZGlzcGxheTpibG9jaztvdmVyZmxvdzpoaWRkZW59LnBhbmVze2hlaWdodDoxMDAlO3dpZHRoOjIwMCU7dHJhbnNpdGlvbi1kdXJhdGlvbjouNXM7ZGlzcGxheTpmbGV4fS5wYW5lcyBkaXZ7ZmxleDoxfWBdLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYW5lc1wiIFtAc2xpZGVdPVwiYWN0aXZlUGFuZVwiPlxuICA8ZGl2PjxuZy1jb250ZW50IHNlbGVjdD1cIltsZWZ0UGFuZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gIDxkaXY+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW3JpZ2h0UGFuZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG48L2Rpdj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3NsaWRlJywgW1xuICAgICAgc3RhdGUoJ2xlZnQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknIH0pKSxcbiAgICAgIHN0YXRlKCdyaWdodCcsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScgfSkpLFxuICAgICAgdHJhbnNpdGlvbignbGVmdCA8PT4gcmlnaHQnLCBhbmltYXRlKCcxcycpKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVQYW5lbENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGFjdGl2ZVBhbmU6IFBhbmVUeXBlID0gJ2xlZnQnO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNlbU1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS1tZWRpYS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLXNldHRpbmdzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0taGVhZGVyXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCIgKGNsaWNrKT1cImlzTGVmdFZpc2libGU9dHJ1ZVwiPjwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxzZW0tc2xpZGUtcGFuZWwgW2FjdGl2ZVBhbmVdPVwiaXNMZWZ0VmlzaWJsZT8gJ2xlZnQnOiAncmlnaHQnXCI+XG4gICAgPGRpdiBsZWZ0UGFuZT5cbiAgICAgIDxkaXYgc2VtdWktc2VjdGlvbi1ib2R5IGNsYXNzPVwicDJcIj5cbiAgICAgICAgPHVsIHNlbXVpLWxpc3QgY2xhc3M9XCJ1c2VyLW5hdlwiPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICBsaXN0LWl0ZW1cbiAgICAgICAgICAgIHNlbXVpLWltcG9ydGFuY2U9XCJkYXJrXCJcbiAgICAgICAgICAgIGNsYXNzPVwicHkxXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkltYWdlcygpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aSBjbGFzcz1cInNlbS1pY29uLXN0eWxlIGRlZmF1bHRcIiAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPHNwYW4+IEltYWdlczwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICBsaXN0LWl0ZW1cbiAgICAgICAgICAgIHNlbXVpLWltcG9ydGFuY2U9XCJkYXJrXCJcbiAgICAgICAgICAgIGNsYXNzPVwicHkxXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvblNldHRpbmdzKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwic2VtLWljb24tc2V0dGluZ3MgZGVmYXVsdFwiICBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8c3Bhbj4gU2V0dGluZ3M8L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIHNlbXVpLWxpc3QtaXRlbVxuICAgICAgICAgICAgbGlzdC1pdGVtXG4gICAgICAgICAgICBzZW11aS1pbXBvcnRhbmNlPVwiZGFya1wiXG4gICAgICAgICAgICBjbGFzcz1cInB5MVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25EdXBsaWNhdGUoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJzZW0taWNvbi1zaXRlcyBkZWZhdWx0XCIgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuPiBEdXBsaWNhdGU8L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIHNlbXVpLWxpc3QtaXRlbVxuICAgICAgICAgICAgbGlzdC1pdGVtXG4gICAgICAgICAgICBzZW11aS1pbXBvcnRhbmNlPVwiZGFya1wiXG4gICAgICAgICAgICBjbGFzcz1cInB5MVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25EZWxldGUoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJzZW0taWNvbi1kZWxldGUgZGVmYXVsdFwiICBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8c3Bhbj4gRGVsZXRlPC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHJpZ2h0UGFuZT5cbiAgICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwidmlld01vZGVGb3JtXCIgY2xhc3M9XCJwMlwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgdmFsdWU9XCJncmlkXCJcbiAgICAgICAgaWQ9XCJncmlkXCJcbiAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidmlld01vZGVcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImdyaWRcIj48c3BhbiBjbGFzcz1cInNlbS1pY29uLXN0eWxlIGRlZmF1bHRcIj48L3NwYW4+PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgdmFsdWU9XCJjYXJvdXNlbFwiXG4gICAgICAgICAgaWQ9XCJjYXJvdXNlbFwiXG4gICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidmlld01vZGVcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImNhcm91c2VsXCI+PHNwYW4gY2xhc3M9XCJzZW0taWNvbi1zZXR0aW5ncyBkZWZhdWx0XCI+PC9zcGFuPjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgIHZhbHVlPVwibGlzdFwiXG4gICAgICAgICAgaWQ9XCJsaXN0XCJcbiAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ2aWV3TW9kZVwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwibGlzdFwiPjxzcGFuIGNsYXNzPVwic2VtLWljb24tc2V0dGluZ3MgZGVmYXVsdFwiPjwvc3Bhbj48L2xhYmVsPlxuICAgICAgPC9mb3JtPlxuICAgICAge3t2aWV3TW9kZUZvcm0udmFsdWUgfCBqc29ufX1cbiAgICA8L2Rpdj5cbiAgPC9zZW0tc2xpZGUtcGFuZWw+XG5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2Nre2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMXttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MXtwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDN7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXgsOmhvc3QgZm9ybXtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZCw6aG9zdCBmb3Jte2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZXtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGV7cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMHt0b3A6MH0ucmlnaHQtMHtyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0IGZvcm0gaW5wdXRbdHlwZT1yYWRpb117ZGlzcGxheTpub25lfTpob3N0IGZvcm0gaW5wdXRbdHlwZT1yYWRpb106Y2hlY2tlZCtsYWJlbHtiYWNrZ3JvdW5kOiNjY2N9Omhvc3QgZm9ybSBsYWJlbCBzcGFue2ZvbnQtc2l6ZTozMHB4fWBdXG59KVxuXG5leHBvcnQgY2xhc3MgU2VtTWVkaWFTZXR0aW5nc0NvbXBvbmVudCB7XG4gIEBPdXRwdXQoKSBwcmVzc2VkSW1hZ2VzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwcmVzc2VkRGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwcmVzc2VkRHVwbGljYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwcmVzc2VkU2V0dGluZ3MgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHVibGljIGlzTGVmdFZpc2libGU6IEJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgdmlld01vZGVGb3JtOiBGb3JtR3JvdXA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9tZWRpYVNlcnZpY2U6IFNlbU1lZGlhU2VydmljZSwgcHJpdmF0ZSBfZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgdGhpcy52aWV3TW9kZUZvcm0gPSB0aGlzLl9mYi5ncm91cCh7XG4gICAgICB2aWV3TW9kZTogJydcbiAgICB9KTtcbiAgfVxuICBvbkRlbGV0ZSgpIHtcbiAgICB0aGlzLnByZXNzZWREZWxldGUuZW1pdCgpO1xuICB9XG4gIG9uSW1hZ2VzKCkge1xuICAgIHRoaXMucHJlc3NlZEltYWdlcy5lbWl0KCk7XG4gIH1cbiAgb25EdXBsaWNhdGUoKSB7XG4gICAgdGhpcy5wcmVzc2VkRHVwbGljYXRlLmVtaXQoKTtcbiAgfVxuICBvblNldHRpbmdzKCkge1xuICAgIHRoaXMuaXNMZWZ0VmlzaWJsZSA9IGZhbHNlO1xuICAgIC8vIHRoaXMucHJlc3NlZFNldHRpbmdzLmVtaXQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tbWVkaWEtZWRpdCcsXG4gIHRlbXBsYXRlOiBgPGZvcm0gW2Zvcm1Hcm91cF09XCJteUZvcm1cIiBjbGFzcz1cInAyXCI+XG4gIDxsYWJlbD5BbGwgVGV4dDwvbGFiZWw+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgY2xhc3M9XCJzZW0taW5wdXRcIlxuICAgIGlkPVwiYWxsLXRleHRcIlxuICAgIGZvcm1Db250cm9sTmFtZT1cImFsbFRleHRcIj5cbiAgPGxhYmVsPk1ldGEgVGl0bGU8L2xhYmVsPlxuICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgIGNsYXNzPVwic2VtLWlucHV0XCJcbiAgICBpZD1cIm1ldGEtdGl0bGVcIlxuICAgIGZvcm1Db250cm9sTmFtZT1cIm1ldGFUaXRsZVwiPlxuPC9mb3JtPlxuPHNlbS1jb250cm9sc1xuICAocHJlc3NlZEZpdCk9XCJvblByZXNzKCdGSVQnKVwiXG4gIChwcmVzc2VkQ3JvcCk9XCJvblByZXNzKCdDUk9QJylcIlxuICAocHJlc3NlZFJvdGF0ZUxlZnQpPVwib25QcmVzcygnUk9UQVRFX0xFRlQnKVwiXG4gIChwcmVzc2VkUm90YXRlUmlnaHQpPVwib25QcmVzcygnUk9UQVRFX1JJR0hUJylcIlxuICAocHJlc3NlZFpvb21Jbik9XCJvblByZXNzKCdaT09NX0lOJylcIlxuICAocHJlc3NlZFpvb21PdXQpPVwib25QcmVzcygnWk9PTV9PVVQnKVwiPlxuPC9zZW0tY29udHJvbHM+XG48ZGl2IGNsYXNzPVwicHgyIGZsZXgganVzdGlmeS1lbmRcIj5cbiAgPGJ1dHRvbiBmb3I9XCJjcm9wLWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwib25QcmVzcygnQVBQTFknKVwiID5cbiAgICBBcHBseVxuICA8L2J1dHRvbj5cbjwvZGl2PlxuPCEtLSA8ZGl2PjxwcmU+PGNvZGU+e3sgbXlGb3JtPy52YWx1ZSB8IGpzb24gfX08L2NvZGU+PC9wcmU+PC9kaXY+IC0tPlxuYCxcbiAgc3R5bGVzOiBbYC5oMXtmb250LXNpemU6MnJlbX0uaDJ7Zm9udC1zaXplOjEuNXJlbX0uaDN7Zm9udC1zaXplOjEuMjVyZW19Lmg0e2ZvbnQtc2l6ZToxcmVtfS5oNXtmb250LXNpemU6Ljg3NXJlbX0uaDZ7Zm9udC1zaXplOi43NXJlbX0uZm9udC1mYW1pbHktaW5oZXJpdHtmb250LWZhbWlseTppbmhlcml0fS5mb250LXNpemUtaW5oZXJpdHtmb250LXNpemU6aW5oZXJpdH0udGV4dC1kZWNvcmF0aW9uLW5vbmV7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmJvbGR7Zm9udC13ZWlnaHQ6NzAwfS5yZWd1bGFye2ZvbnQtd2VpZ2h0OjQwMH0uaXRhbGlje2ZvbnQtc3R5bGU6aXRhbGljfS5jYXBze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMmVtfS5sZWZ0LWFsaWdue3RleHQtYWxpZ246bGVmdH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5yaWdodC1hbGlnbnt0ZXh0LWFsaWduOnJpZ2h0fS5qdXN0aWZ5e3RleHQtYWxpZ246anVzdGlmeX0ubm93cmFwe3doaXRlLXNwYWNlOm5vd3JhcH0uYnJlYWstd29yZHt3b3JkLXdyYXA6YnJlYWstd29yZH0ubGluZS1oZWlnaHQtMXtsaW5lLWhlaWdodDoxfS5saW5lLWhlaWdodC0ye2xpbmUtaGVpZ2h0OjEuMTI1fS5saW5lLWhlaWdodC0ze2xpbmUtaGVpZ2h0OjEuMjV9LmxpbmUtaGVpZ2h0LTR7bGluZS1oZWlnaHQ6MS41fS5saXN0LXN0eWxlLW5vbmV7bGlzdC1zdHlsZTpub25lfS51bmRlcmxpbmV7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udHJ1bmNhdGV7bWF4LXdpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5saXN0LXJlc2V0e2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nLWxlZnQ6MH0uaW5saW5le2Rpc3BsYXk6aW5saW5lfS5ibG9jayw6aG9zdCAuY29udHJvbHtkaXNwbGF5OmJsb2NrfS5pbmxpbmUtYmxvY2t7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhYmxle2Rpc3BsYXk6dGFibGV9LnRhYmxlLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsfS5vdmVyZmxvdy1oaWRkZW57b3ZlcmZsb3c6aGlkZGVufS5vdmVyZmxvdy1zY3JvbGx7b3ZlcmZsb3c6c2Nyb2xsfS5vdmVyZmxvdy1hdXRve292ZXJmbG93OmF1dG99LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcIiBcIjtkaXNwbGF5OnRhYmxlfS5jbGVhcmZpeDphZnRlcntjbGVhcjpib3RofS5sZWZ0e2Zsb2F0OmxlZnR9LnJpZ2h0e2Zsb2F0OnJpZ2h0fS5maXR7bWF4LXdpZHRoOjEwMCV9Lm1heC13aWR0aC0xe21heC13aWR0aDoyNHJlbX0ubWF4LXdpZHRoLTJ7bWF4LXdpZHRoOjMycmVtfS5tYXgtd2lkdGgtM3ttYXgtd2lkdGg6NDhyZW19Lm1heC13aWR0aC00e21heC13aWR0aDo2NHJlbX0uYm9yZGVyLWJveHtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFsaWduLWJhc2VsaW5le3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5hbGlnbi10b3B7dmVydGljYWwtYWxpZ246dG9wfS5hbGlnbi1taWRkbGV7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hbGlnbi1ib3R0b217dmVydGljYWwtYWxpZ246Ym90dG9tfS5tMHttYXJnaW46MH0ubXQwe21hcmdpbi10b3A6MH0ubXIwe21hcmdpbi1yaWdodDowfS5tYjB7bWFyZ2luLWJvdHRvbTowfS5tbDB7bWFyZ2luLWxlZnQ6MH0ubXgwe21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjB9Lm15MHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowfS5tMXttYXJnaW46LjVyZW19Lm10MXttYXJnaW4tdG9wOi41cmVtfS5tcjF7bWFyZ2luLXJpZ2h0Oi41cmVtfS5tYjEsOmhvc3QgLmNvbnRyb2x7bWFyZ2luLWJvdHRvbTouNXJlbX0ubWwxe21hcmdpbi1sZWZ0Oi41cmVtfS5teDF7bWFyZ2luLWxlZnQ6LjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtfS5teTF7bWFyZ2luLXRvcDouNXJlbTttYXJnaW4tYm90dG9tOi41cmVtfS5tMnttYXJnaW46MXJlbX0ubXQye21hcmdpbi10b3A6MXJlbX0ubXIye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTEsOmhvc3QgLmNvbnRyb2x7cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDJ7cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgye3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgzLDpob3N0IC5jb250cm9se3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZSw6aG9zdCAuY29udHJvbHtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGV7cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMHt0b3A6MH0ucmlnaHQtMHtyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0IC5jb250cm9se2NvbG9yOiNmZmY7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czoxMnB4IDEycHggMDtiYWNrZ3JvdW5kLWNvbG9yOiMwNWRjYjZ9Omhvc3QgLmNvbnRyb2w6Zm9jdXN7b3V0bGluZTowfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQE91dHB1dCgpIHNlbGVjdGVkRWRpdE1vZGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGZvcm1DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBJbnB1dCgpIGZvcm1EYXRhOiBhbnk7XG4gIHB1YmxpYyBteUZvcm06IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgdGhpcy5teUZvcm0gPSB0aGlzLl9mYi5ncm91cCh7XG4gICAgICBhbGxUZXh0IDogJycsXG4gICAgICBtZXRhVGl0bGU6ICcnLFxuICAgIH0pO1xuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIHRoaXMubXlGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgYWxsVGV4dDogdGhpcy5mb3JtRGF0YS5hbGxUZXh0LFxuICAgICAgbWV0YVRpdGxlOiB0aGlzLmZvcm1EYXRhLm1ldGFUaXRsZVxuICAgIH0pO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubXlGb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuZm9ybUNoYW5nZWQuZW1pdChkYXRhKTtcbiAgICB9KTtcbiAgfVxuICBvblByZXNzKG1vZGUpIHtcbiAgICB0aGlzLnNlbGVjdGVkRWRpdE1vZGUuZW1pdChtb2RlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsICBPdXRwdXQsIEluamVjdG9yLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNlbU1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS1tZWRpYS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3IsXG4gIHNlbGVjdG9yOiAnW3NlbS1tZWRpYS1jb250YWluZXJdJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXIgc2VtLW1lZGlhLWNvbnRhaW5lclwiPlxuXG5cblxuICA8ZGl2ICpuZ0lmPVwidXNlckltYWdlc1wiIGNsYXNzPVwicHJldmlldy1jb250YWluZXJcIj5cbiAgICA8ZGl2IHNlbS1jcm9wcGVyXG4gICAgICAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgdXNlckltYWdlcztsZXQga2V5ID0gaW5kZXhcIlxuICAgICAgW2ltYWdlRGF0YV09XCJpbWFnZS51cGxvYWRlZEltYWdlXCJcbiAgICAgIFtjcm9wcGVkSW1hZ2VdPVwiaW1hZ2UuY3JvcHBlZEltYWdlXCJcbiAgICAgIFtlZGl0TW9kZV09XCJpbWFnZS5lZGl0TW9kZVwiXG4gICAgICBbY29uZmlnXT1cImNvbmZpZ1wiXG4gICAgICBba2V5XT1cImtleVwiXG4gICAgICAoZW5hYmxlZENyb3BwZXIpPVwib25FbmFibGVFZGl0SW1hZ2Uoa2V5KVwiXG4gICAgICAoY3JvcHBlZEltYWdlRXZlbnQpPVwib25Dcm9wcGVkSW1hZ2Uoa2V5LCAkZXZlbnQpXCJcbiAgICA+PC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXItLW5hdlwiPlxuICAgIDxidXR0b25cbiAgICAgIHNlbS1idG4tZmFiXG4gICAgICBzbWFsbFxuICAgICAgY29ybmVyPVwidG9wLWxlZnRcIlxuICAgICAgc2VtdWktdGhlbWU9XCJsaWdodFwiXG4gICAgICBjbGFzcz1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgXCJcbiAgICAgIHNlbS1pbXBvcnRhbmNlPVwiaW52ZXJ0ZWRcIlxuICAgICAgI2NoYXRPdmVybGF5PVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgICBjZGtPdmVybGF5T3JpZ2luXG4gICAgICAoY2xpY2spPVwib3BlblNldHRpbmdzKCFpc1Rlc3RBT3BlbmVkKVwiXG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1kcm9wX2ljb25cIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3QoKXtiYWNrZ3JvdW5kLWNvbG9yOiNmNWU1ZTU7ZGlzcGxheTpibG9jaztib3JkZXI6MXB4IHNvbGlkICM4YjAwMDA7aGVpZ2h0OjEwMCV9LmltZy1jcm9wcGVye2hlaWdodDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIHdpZGdldCA9IHtcbiAgICBjb21wb25lbnROYW1lOiAnJyxcbiAgICBkYXRhOiAgYFxuICAgIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeSdzIHN0YW5kYXJkIGR1bW15IHRleHQgZXZlciBzaW5jZSB0aGUgMTUwMHMsIHdoZW4gYW4gdW5rbm93biBwcmludGVyIG9vayBhIGdhbGxleSBvZiB0eXBlXG4gICAgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZSBudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWNcbiAgICB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHUgbGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHNcbiAgICBjb250YWluaW5nYFxuICB9O1xuXG4gIHVzZXJJbWFnZXM/OiBBcnJheTxhbnk+ID0gW107XG4gIGVkaXRWaXNpYmxlOiBCb29sZWFuID0gZmFsc2U7XG4gIGtleTogTnVtYmVyO1xuICB1cGxvYWRQYW5lbEZsYWc6IEJvb2xlYW4gPSB0cnVlO1xuICBpbWFnZU5hbWVMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbmZpZzogYW55O1xuICB0ZW1wSW1hZ2VzOiBBcnJheTxhbnk+O1xuICBpc1Rlc3RBT3BlbmVkID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZGF0YTtcbiAgQE91dHB1dCgpIGRhdGFDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lZGlhU2VydmljZTogU2VtTWVkaWFTZXJ2aWNlLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIC8vIHRoaXMud2lkZ2V0ID0gdGhpcy5pbmplY3Rvci5nZXQoJ3dpZGdldCcpO1xuICAgIC8vIGlmKHRoaXMud2lkZ2V0LmNvbXBvbmVudE5hbWUgPT09ICdTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCcpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdHb3QgdGhlIHd5c2l3eWcgZGF0YScsIHRoaXMud2lkZ2V0KTtcbiAgICAvLyB9XG5cbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgbGV0IGVkaXRNb2RlID0gZmFsc2U7XG4gICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXNlckltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgYWxsSW1hZ2VzKSB7XG4gICAgICAgIGVkaXRNb2RlID0gZWRpdE1vZGUgfHwgaW1hZ2UuZWRpdE1vZGU7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdC5wdXNoKGltYWdlLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmVkaXRWaXNpYmxlID0gZWRpdE1vZGU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuaW1hZ2VDb25maWdDaGFuZ2VzLnN1YnNjcmliZShjb25maWcgPT4ge1xuICAgICAgdGhpcy5jb25maWcgPSBfLmNsb25lRGVlcChjb25maWcpO1xuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUxvYWRDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0ID0gW107XG4gICAgICB0aGlzLnVzZXJJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGFsbEltYWdlcykge1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QucHVzaChpbWFnZS5maWxlTmFtZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmtleSA9IGFsbEltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgdGhpcy5lZGl0VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgaWYgKGFsbEltYWdlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLnRlbXBDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgIH0pO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICB9XG4gIHVwbG9hZGVkSW1hZ2UoaW1hZ2U6IEZpbGUpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UucHV0SW1hZ2UoaW1hZ2UpO1xuICB9XG4gIG9uRW5hYmxlRWRpdEltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEVuYWJsZShpbmRleCk7XG4gICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgIHRoaXMua2V5ID0gaW5kZXg7XG4gIH1cbiAgb25FZGl0SW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLmtleSA9IGluZGV4O1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkVkaXRFbmFibGUoaW5kZXgpO1xuICB9XG4gIG9uRGVsZXRlSW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25EZWxldGVJbWFnZShpbmRleCk7XG4gIH1cbiAgb25NZW51KG1vZGUpIHtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgJ0lNQUdFUyc6XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdEVVBMSUNBVEUnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1NFVFRJTkdTJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdERUxFVEUnOlxuICAgICAgICB0aGlzLl9tZWRpYVNlcnZpY2UuY2xlYXJJbWFnZXMoKTtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0ID0gW107XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIG9uQ2hhbmdlZEZvcm0oZm9ybURhdGE6IGFueSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5mb3JtQ2hhbmdlZCh0aGlzLmtleSwgZm9ybURhdGEpO1xuICB9XG4gIG9uQ2hhbmdlZEVkaXRNb2RlKG1vZGU6IHN0cmluZykge1xuICAgIGlmIChtb2RlID09PSAnQVBQTFknKSB7XG4gICAgICAvLyB0aGlzLmVkaXRWaXNpYmxlID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5pbWFnZU5hbWVMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEltYWdlKHRoaXMua2V5LCBtb2RlKTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuY2xlYXJDb25maWcodGhpcy5rZXkpO1xuICB9XG4gIG9uQ3JvcHBlZEltYWdlKGluZGV4LCBjcm9wcGVkSW1hZ2UpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UucHV0Q3JvcHBlZEltYWdlKGluZGV4LCBjcm9wcGVkSW1hZ2UpO1xuICB9XG4gIG9wZW5TZXR0aW5ncyhzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmlzVGVzdEFPcGVuZWQgPSBzdGF0dXM7XG4gICAgdGhpcy5kYXRhQ2hhbmdlLmVtaXQoXG4gICAgICB7XG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgIH1cbiAgICApXG4gIH1cbiAgY3JvcHBlZEltYWdlKGl0ZW0pe1xuICAgIGNvbnNvbGUubG9nKCdub3Qgc3VyZScsIGl0ZW0pXG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBTZW1VaUJ1dHRvbk1vZHVsZSxcbiAgU2VtVWlCdXR0b25GYWJNb2R1bGUsXG4gIFNlbVVpT3ZlcmxheURpYWxvZ01vZHVsZSxcbiAgU2VtVWlUYWJzTW9kdWxlLFxuICBTZW1VaUxpc3RNb2R1bGUsXG4gIFNlbVVpVGh1bWJuYWlsTGFyZ2VNb2R1bGUsXG4gIFNlbVVpQnV0dG9uRG5kTW9kdWxlXG59IGZyb20gJ0Bmcm9udHIvc2VtLXVpJztcblxuY29uc3QgVWlTaGFyZWRNb2R1bGVzID0gW1xuICBTZW1VaUJ1dHRvbk1vZHVsZSxcbiAgU2VtVWlCdXR0b25EbmRNb2R1bGUsXG4gIFNlbVVpQnV0dG9uRmFiTW9kdWxlLFxuICBTZW1VaU92ZXJsYXlEaWFsb2dNb2R1bGUsXG4gIFNlbVVpVGFic01vZHVsZSxcbiAgU2VtVWlMaXN0TW9kdWxlLFxuICBTZW1VaVRodW1ibmFpbExhcmdlTW9kdWxlXG5dXG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFsuLi5VaVNoYXJlZE1vZHVsZXNdXG59KVxuZXhwb3J0IGNsYXNzIFNlbVVpS2l0U2hhcmVkTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE9ic2VydmVyc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vYnNlcnZlcnMnO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBTY3JvbGxEaXNwYXRjaE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQ2RrU3RlcHBlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuY29uc3QgTUFURVJJQUxfTU9EVUxFUyA9IFtcbiAgLy8gQ0RLXG4gIEExMXlNb2R1bGUsXG4gIEJpZGlNb2R1bGUsXG4gIE9ic2VydmVyc01vZHVsZSxcbiAgT3ZlcmxheU1vZHVsZSxcbiAgUGxhdGZvcm1Nb2R1bGUsXG4gIFBvcnRhbE1vZHVsZSxcbiAgU2Nyb2xsRGlzcGF0Y2hNb2R1bGUsXG4gIENka1N0ZXBwZXJNb2R1bGUsXG4gIENka1RhYmxlTW9kdWxlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogWy4uLk1BVEVSSUFMX01PRFVMRVNdXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1hdGVyaWFsU2hhcmVkTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3lvdXR1YmVTYWZlVXJsJ1xufSlcbmV4cG9ydCBjbGFzcyBZb3V0dWJlU2FmZVVybFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKXtcblxuICB9XG5cbiAgdHJhbnNmb3JtKHZpZGVvSWQ6IHN0cmluZyk6IFNhZmVSZXNvdXJjZVVybCB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChcbiAgICAgIGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3ZpZGVvSWR9P2F1dG9wbGF5PTFgKTtcbiAgfVxuXG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIFlvdXR1YmVWaWRlb01vZGVsIHtcbiAgICB2aWRlb0lkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICB0aHVtYm5haWxVcmw6IHN0cmluZztcbiAgICBjaGFubmVsVGl0bGU6IHN0cmluZztcbiAgICBjaGFubmVsSWQ6IHN0cmluZztcbiAgICBwdWJsaXNoZWRBdD86IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIFZpZGVvTW9kZWwge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdmlkZW9JZDogc3RyaW5nLFxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuICAgIHB1YmxpYyB0aHVtYm5haWxVcmw6IHN0cmluZyxcbiAgICBwdWJsaWMgY2hhbm5lbFRpdGxlOiBzdHJpbmcsXG4gICAgcHVibGljIGNoYW5uZWxJZDogc3RyaW5nLFxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy52aWRlb0lkID0gdmlkZW9JZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50aHVtYm5haWxVcmwgPSB0aHVtYm5haWxVcmw7XG4gICAgdGhpcy5jaGFubmVsVGl0bGUgPSBjaGFubmVsVGl0bGU7XG4gICAgdGhpcy5jaGFubmVsSWQgPSBjaGFubmVsSWQ7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlkZW9Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy8nO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgWW91dHViZVZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdmlkZW8nO1xuaW1wb3J0IHsgVmlkZW9PYmplY3QgfSBmcm9tICcuLi9zZW0tdmlkZW8tY29udGFpbmVyL3NlbS12aWRlby1jb250YWluZXIuY29tcG9uZW50JztcblxuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3IsXG4gIHNlbGVjdG9yOiAnW3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbF0nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1oZWFkZXJcIj5cbiAgPHNwYW4gKGNsaWNrKT1cImNsb3NlRGlhbG9nKClcIj5cbiAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIj48L3NwYW4+XG4gICAgQ2xvc2VcbiAgPC9zcGFuPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0tYm9keV9zcGFjZWQgYmctZGVmYXVsdFwiPlxuICA8ZGl2IHNlbXVpLXRhYnMgI3RhYnNWZXJ0aWNhbCBbc2hvd1RhYnNdPVwidHJ1ZVwiIFt2ZXJ0aWNhbF09XCJ0cnVlXCIgPlxuICAgIDxkaXYgc2VtdWktdGFiICN0YWJzVjEgW3RpdGxlXT1cIidWaWRlbyBVcmwnXCI+XG4gICAgICA8ZGl2IHNlbXVpLXNlY3Rpb24tYm9keT5cbiAgICAgICAgVGFiIDEgY29udGVudFxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBzZW11aS10YWIgI3RhYnNWMiBbdGl0bGVdPVwiJ1NlYXJjaCdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZW0tdmlkZW8tY29udGFpbmVyXCI+XG4gICAgICAgICAgPCEtLSBTZWN0aW9uIEJvZHkgLS0+XG4gICAgICAgICAgPGRpdiBzZW11aS1zZWN0aW9uLWJvZHk+XG4gICAgICAgICAgICA8IS0tIFNlYXJjaCAtLT5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPCEtLSBZb3VUdWJlIFNlYXJjaCAtLT5cbiAgICAgICAgICAgICAgICA8bGFiZWw+U2VhcmNoIFlvdXR1YmU8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtcHJlZml4XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXNlYXJjaCBwcmVmaXhcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNlbS1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgIGlkPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgICAgICAgKGtleXVwKT1cInNlYXJjaCh0ZXh0Qm94LnZhbHVlKVwiXG4gICAgICAgICAgICAgICAgICAgICAjdGV4dEJveFxuICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gIGZpZWxkLXByZWZpeCBjbGFzcz1cImljb24gaWNvbi1zZWFyY2ggcHJlZml4XCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c1wiPlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInJlc3VsdHMubGVuZ3RoID09IDBcIiBjbGFzcz1cInNlbS12aWRlby1jb250YWluZXItLXJlc3VsdHNfaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBzZW11aS10aHVtYm5haWwgY2xhc3M9XCJwdDJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS12aWRlby1jb250YWluZXItLXJlc3VsdHNfcHJldmlld1wiIGNhcmQtaW1hZ2U+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlnY2FwdGlvbiBzZW0tc2VjdGlvbi1mb290ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZ2NhcHRpb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInByaW1hcnktY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN1Yi1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmlnY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgcmVzdWx0cyB8IHBhZ2luYXRlOiBjb25maWdcIiBjbGFzcz1cInNlbS12aWRlby1jb250YWluZXItLXJlc3VsdHNfaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIHNlbXVpLXRodW1ibmFpbCBjbGFzcz1cInB0MlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c19wcmV2aWV3XCIgY2FyZC1pbWFnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyAqbmdJZj1cIml0ZW0udGh1bWJuYWlsVXJsXCIgW3NyY109XCJpdGVtLnRodW1ibmFpbFVybFwiICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZmlnY2FwdGlvbiBzZW0tc2VjdGlvbi1mb290ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlnY2FwdGlvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LWNhcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgaXRlbS50aXRsZX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzdWItY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgaXRlbS5wdWJsaXNoZWRBdH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIiByZWxhdGl2ZSBzZW0tYnV0dG9uLS0gc2VtLWJ1dHRvbiBzZW0tYnV0dG9uLS1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkLXNldHRpbmctYnV0dG9uIChjbGljayk9XCJhZGRWaWRlbyhpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGQgdGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08YnV0dG9uLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLXNlbS1idG4tZmFiLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLWNvcm5lcj1cIm5vbmVcIi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1zZW11aS10aGVtZT1cImxpZ2h0XCItLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tc2VtLWltcG9ydGFuY2U9XCJkZWZhdWx0XCItLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tY2FyZC1zZXR0aW5nLWJ1dHRvbiAoY2xpY2spPVwibG9hZFNldHRpbmdzKClcIi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tJmd0Oy0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08c3BhbiBjbGFzcz1cInNlbS1pY29uLWVsbGlwc2VcIj48L3NwYW4+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08L2J1dHRvbj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZmlnY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLSBTZWN0aW9uIEZvb3RlciAtLT5cbiAgICAgICAgICA8ZGl2IHNlbXVpLXNlY3Rpb24tZm9vdGVyPlxuICAgICAgICAgICAgICA8cGFnaW5hdGlvbi10ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIGNsYXNzPVwic2VtLXBhZ2luYXRpb24tY29udGFpbmVyIHB5MlwiXG4gICAgICAgICAgICAgICAgI3A9XCJwYWdpbmF0aW9uQXBpXCJcbiAgICAgICAgICAgICAgICBbaWRdPVwiY29uZmlnLmlkXCJcbiAgICAgICAgICAgICAgICAocGFnZUNoYW5nZSk9XCJjb25maWcuY3VycmVudFBhZ2UgPSAkZXZlbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VtLXBhZ2luYXRpb24tbmF2XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic2VtLXBhZ2luYXRpb24tcHJldmlvdXNcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicC5pc0ZpcnN0UGFnZSgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIXAuaXNGaXJzdFBhZ2UoKVwiIChjbGljayk9XCJwLnByZXZpb3VzKClcIj4gPCA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHBhZ2Ugb2YgcC5wYWdlc1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic2VtLXBhZ2luYXRpb25cIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInAuZ2V0Q3VycmVudCgpID09PSBwYWdlLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJwLnNldEN1cnJlbnQocGFnZS52YWx1ZSlcIiAqbmdJZj1cInAuZ2V0Q3VycmVudCgpICE9PSBwYWdlLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3sgcGFnZS5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJwLmdldEN1cnJlbnQoKSA9PT0gcGFnZS52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt7IHBhZ2UubGFiZWwgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzZW0tcGFnaW5hdGlvbi1uZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInAuaXNMYXN0UGFnZSgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIXAuaXNMYXN0UGFnZSgpXCIgKGNsaWNrKT1cInAubmV4dCgpXCI+ID4gPC9hPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvcGFnaW5hdGlvbi10ZW1wbGF0ZT5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2NrLDpob3N0e2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMXttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MXtwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDN7cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZle3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZXtwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3R7YmFja2dyb3VuZDojZmZmfS5zZW0tdmlkZW8tY29udGFpbmVyLS1yZXN1bHRzX3ByZXZpZXd7bWluLWhlaWdodDo5NnB4O2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZC1jb2xvcjojZGVkZWRlfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbVZpZGVvU2V0dGluZ3NQYW5lbENvbXBvbmVudCB7XG4gIEBPdXRwdXQoKSBjbG9zZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxWaWRlb09iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPFZpZGVvT2JqZWN0PigpO1xuICBASW5wdXQoKSAgY29uZmlnO1xuICBASW5wdXQoKSBkYXRhSWQ6IHN0cmluZztcbiAgcmVzdWx0czogQXJyYXk8WW91dHViZVZpZGVvTW9kZWw+ID0gW107XG4gIHBhZ2U6IG51bWJlciA9IDE7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VtVmlkZW9TZXJ2aWNlOiBTZW1WaWRlb1NlcnZpY2UpIHsgfVxuICBsb2FkU2V0dGluZ3MoKXt9XG4gIHNlYXJjaChxdWVyeSkge1xuICAgIGNvbnNvbGUubG9nKCdxdWVyeScsIHF1ZXJ5KTtcbiAgICB0aGlzLnNlbVZpZGVvU2VydmljZS5mZXRjaFZpZGVvcyhxdWVyeSkuc3Vic2NyaWJlKChkYXRhOmFueSkgPT4ge1xuICAgICAgdGhpcy5yZXN1bHRzID0gZGF0YS5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgVmlkZW9Nb2RlbChcbiAgICAgICAgICBpdGVtLmlkLnZpZGVvSWQsXG4gICAgICAgICAgaXRlbS5zbmlwcGV0LnRpdGxlLFxuICAgICAgICAgIGl0ZW0uc25pcHBldC50aHVtYm5haWxzLmhpZ2gudXJsLFxuICAgICAgICAgIGl0ZW0uc25pcHBldC5jaGFubmVsVGl0bGUsXG4gICAgICAgICAgaXRlbS5zbmlwcGV0LmNoYW5uZWxJZCxcbiAgICAgICAgICBpdGVtLnNuaXBwZXQuZGVzY3JpcHRpb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgYWRkVmlkZW8oaXRlbTogWW91dHViZVZpZGVvTW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQoe2lkOiB0aGlzLmRhdGFJZCwgZGF0YTogaXRlbSB9KTtcbiAgfVxuICBjbG9zZURpYWxvZygpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlLmVtaXQoZmFsc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCAsIEV2ZW50RW1pdHRlciwgSW5wdXQsICBPdXRwdXQsIEluamVjdG9yLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBZb3V0dWJlVmlkZW9Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy92aWRlbyc7XG4vLyBpbXBvcnQgeyBQYWdpbmF0aW9uSW5zdGFuY2UgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG4vLyBpbXBvcnQgeyBTZW1WaWRlb1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tdmlkZW8uc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlkZW9PYmplY3Qge1xuICBpZDogc3RyaW5nO1xuICBkYXRhOiBZb3V0dWJlVmlkZW9Nb2RlbCB8IG51bGw7XG59XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yLFxuICBzZWxlY3RvcjogJ1tzZW0tdmlkZW8tY29udGFpbmVyXScsXG4gIHRlbXBsYXRlOiBgXG48ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXJcIiAqbmdJZj1cImRhdGEuZGF0YSAhPT0gbnVsbFwiPlxuICA8ZGl2IGNsYXNzPVwiZW1iZWQtY29udGFpbmVyXCIgKm5nSWY9XCJkYXRhLmRhdGEuaGFzT3duUHJvcGVydHkoJ3ZpZGVvSWQnKVwiPlxuICAgIDxpZnJhbWUgd2lkdGg9XCIxMDAlXCJcbiAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICBmcmFtZWJvcmRlcj1cIjBcIlxuICAgIGFsbG93ZnVsbHNjcmVlblxuICAgIFtzcmNdPVwiZGF0YS5kYXRhLnZpZGVvSWQgfCB5b3V0dWJlU2FmZVVybFwiXG4gICAgc3R5bGU9XCJib3JkZXI6IHNvbGlkIDFweCBibGFja1wiID5cbiAgICA8L2lmcmFtZT5cbiAgPC9kaXY+XG5cblxuICA8ZGl2ICpuZ0lmPVwiZWRpdE1vZGVcIiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyLS1uYXZcIj5cbiAgICA8YnV0dG9uXG4gICAgICBzZW0tYnRuLWZhYlxuICAgICAgc21hbGxcbiAgICAgIGNvcm5lcj1cInRvcC1sZWZ0XCJcbiAgICAgIHNlbXVpLXRoZW1lPVwibGlnaHRcIlxuICAgICAgY2xhc3M9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIFwiXG4gICAgICBzZW0taW1wb3J0YW5jZT1cImludmVydGVkXCJcbiAgICAgICNjaGF0T3ZlcmxheT1cImNka092ZXJsYXlPcmlnaW5cIlxuICAgICAgY2RrT3ZlcmxheU9yaWdpblxuICAgICAgKGNsaWNrKT1cIm9wZW5TZXR0aW5ncyghaXNUZXN0QU9wZW5lZClcIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tZHJvcF9pY29uXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDwhLS08c2VtdWktb3ZlcmxheS1kaWFsb2ctLT5cbiAgICAgIDwhLS1bb3ZlcmxheU9yaWdpbl09XCJjaGF0T3ZlcmxheVwiLS0+XG4gICAgICA8IS0tW2lzT3BlbmVkXT1cImlzVGVzdEFPcGVuZWRcIi0tPlxuICAgICAgPCEtLShjbG9zZSk9XCJzZXRTZWxlY3RlZChmYWxzZSlcIi0tPlxuICAgICAgPCEtLShvcGVuKT1cInNldFNlbGVjdGVkKHRydWUpXCItLT5cbiAgICAgIDwhLS1bb3ZlcmxheVdpZHRoXT1cIidhdXRvJ1wiLS0+XG4gICAgPCEtLSZndDstLT5cbiAgICA8IS0tPC9zZW11aS1vdmVybGF5LWRpYWxvZz4tLT5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdHtiYWNrZ3JvdW5kLWNvbG9yOiNmNWU1ZTU7ZGlzcGxheTpibG9jaztib3JkZXI6MXB4IHNvbGlkICM4YjAwMDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhOiBWaWRlb09iamVjdDtcbiAgQE91dHB1dCgpIGRhdGFDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBASW5wdXQoKSBlZGl0TW9kZSA9IGZhbHNlO1xuXG4gIHB1YmxpYyBpc1Rlc3RBT3BlbmVkID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuICBuZ09uSW5pdCgpIHt9XG5cbiAgLy8gcGFnaW5hdGlvbkNvbmZpZzogUGFnaW5hdGlvbkluc3RhbmNlID0ge1xuICAvLyAgIGlkOiAnY3VzdG9tJyxcbiAgLy8gICBpdGVtc1BlclBhZ2U6IDIsXG4gIC8vICAgY3VycmVudFBhZ2U6IDFcbiAgLy8gfTtcbiAgLy8gc2VsZWN0ZWRJdGVtKGl0ZW06IFlvdXR1YmVWaWRlb01vZGVsKTogdm9pZCB7XG4gIC8vICAgdGhpcy5kYXRhQ2hhbmdlLmVtaXQoaXRlbSk7XG4gIC8vICAgLy8gVE9ETyBOZWVkIGVuYWJsZSB0aGlzIHdoZW4geW91IHRlc3QgaXRcbiAgLy8gICAvLyB0aGlzLmRhdGEgPSBpdGVtO1xuICAvLyB9XG4gIC8vIGNsb3NlT3ZlcmxheSh0b2dnbGVTdGF0dXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgLy8gICB0aGlzLmlzVGVzdEFPcGVuZWQgPSB0b2dnbGVTdGF0dXM7XG4gIC8vIH1cblxuICAvLyBvcGVuVGVzdEEoaXNPcGVuZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgLy8gICB0aGlzLmlzVGVzdEFPcGVuZWQgPSBpc09wZW5lZDtcbiAgLy8gfVxuICAvL1xuICAvLyBzZXRTZWxlY3RlZChpZDogc3RyaW5nKSB7XG4gIC8vICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChkYXRhLmlkKTtcbiAgLy8gfVxuXG5cbiAgb3BlblNldHRpbmdzKHN0YXR1czogYm9vbGVhbikge1xuICAgIC8vIHRoaXMuaXNUZXN0QU9wZW5lZCA9IHN0YXR1cztcbiAgICB0aGlzLmRhdGFDaGFuZ2UuZW1pdCh0aGlzLmRhdGEpXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsICBPdXRwdXQsIEluamVjdG9yLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNlbU1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS1tZWRpYS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3IsXG4gIHNlbGVjdG9yOiAnW3NlbS1tZWRpYS1zZXR0aW5ncy1jb250YWluZXJdJyxcbiAgdGVtcGxhdGU6IGAgPGRpdiAqbmdJZj1cInVwbG9hZFBhbmVsRmxhZ1wiIGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lciBiZy1kZWZhdWx0IGxlZnRcIiBzdHlsZT1cIndpZHRoOjEwMCU7XCI+XG4gIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1ib2R5XCI+XG4gICAgPHNlbS1wYW5lbFxuICAgICAgW2VkaXRWaXNpYmxlXT1cImVkaXRWaXNpYmxlXCJcbiAgICAgIFtrZXldPVwia2V5XCJcbiAgICAgIFtpbWFnZU5hbWVMaXN0XT1cImltYWdlTmFtZUxpc3RcIlxuICAgICAgKGNyb3BwZWQpPVwiY3JvcHBlZEltYWdlKCRldmVudClcIlxuICAgICAgKHVwbG9hZGVkKT1cInVwbG9hZGVkSW1hZ2UoJGV2ZW50KVwiXG4gICAgICAoY2hhbmdlZEZvcm0pPVwib25DaGFuZ2VkRm9ybSgkZXZlbnQpXCJcbiAgICAgIChlZGl0SW1hZ2UpPVwib25FZGl0SW1hZ2UoJGV2ZW50KVwiXG4gICAgICAoZGVsZXRlSW1hZ2UpPVwib25EZWxldGVJbWFnZSgkZXZlbnQpXCJcbiAgICAgIChjaGFuZ2VkRWRpdE1vZGUpPVwib25DaGFuZ2VkRWRpdE1vZGUoJGV2ZW50KVwiXG4gICAgICAoc2hvd1VwbG9hZEV2ZW50KT1cImVkaXRWaXNpYmxlID0gZmFsc2VcIlxuICAgICAgW3VzZXJJbWFnZXNdPVwidXNlckltYWdlc1wiXG4gICAgPjwvc2VtLXBhbmVsPlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIiF1cGxvYWRQYW5lbEZsYWdcIlxuICAgICBjbGFzcz1cInNldHRpbmdzLWNvbnRhaW5lciBkaWFsb2ctY29udGFpbmVyIGJnLWRlZmF1bHQgbXQ0XCI+XG4gICAgICAgIDxzZW0tc2V0dGluZ3NcbiAgICAgICAgICAocHJlc3NlZEltYWdlcyk9XCJvbk1lbnUoJ0lNQUdFUycpXCJcbiAgICAgICAgICAocHJlc3NlZER1cGxpY2F0ZSk9XCJvbk1lbnUoJ0RVUExJQ0FURScpXCJcbiAgICAgICAgICAocHJlc3NlZFNldHRpbmdzKT1cIm9uTWVudSgnU0VUVElOR1MnKVwiXG4gICAgICAgICAgKHByZXNzZWREZWxldGUpPVwib25NZW51KCdERUxFVEUnKVwiXG4gICAgICAgID5cbiAgICAgICAgPC9zZW0tc2V0dGluZ3M+XG48L2Rpdj5cblxuYCxcbiAgc3R5bGVzOiBbYDpob3N0KCl7ZGlzcGxheTpibG9jaztib3JkZXI6MXB4IHNvbGlkICM4YjAwMDB9LmltZy1jcm9wcGVye2hlaWdodDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhU2V0dGluZ3NDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgd2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudE5hbWU6ICcnLFxuICAgIGRhdGE6ICBgXG4gICAgTG9yZW0gSXBzdW0gaGFzIGJlZW4gdGhlIGluZHVzdHJ5J3Mgc3RhbmRhcmQgZHVtbXkgdGV4dCBldmVyIHNpbmNlIHRoZSAxNTAwcywgd2hlbiBhbiB1bmtub3duIHByaW50ZXIgb29rIGEgZ2FsbGV5IG9mIHR5cGVcbiAgICBhbmQgc2NyYW1ibGVkIGl0IHRvIG1ha2UgYSB0eXBlIHNwZWNpbWVuIGJvb2suIEl0IGhhcyBzdXJ2aXZlZCBub3Qgb25seSBmaXZlIGNlIG50dXJpZXMsIGJ1dCBhbHNvIHRoZSBsZWFwIGludG8gZWxlY3Ryb25pY1xuICAgIHR5cGVzZXR0aW5nLCByZW1haW5pbmcgZXNzZW50aWFsbHkgdW5jaGFuZ2VkLiBJdCB3YXMgcG9wdSBsYXJpc2VkIGluIHRoZSAxOTYwcyB3aXRoIHRoZSByZWxlYXNlIG9mIExldHJhc2V0IHNoZWV0c1xuICAgIGNvbnRhaW5pbmdgXG4gIH07XG5cblxuICB1c2VySW1hZ2VzPzogQXJyYXk8YW55PiA9IFtdO1xuICBlZGl0VmlzaWJsZTogQm9vbGVhbiA9IGZhbHNlO1xuICBrZXk6IE51bWJlcjtcbiAgdXBsb2FkUGFuZWxGbGFnOiBCb29sZWFuID0gdHJ1ZTtcbiAgaW1hZ2VOYW1lTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjb25maWc6IGFueTtcbiAgdGVtcEltYWdlczogQXJyYXk8YW55PjtcbiAgaXNUZXN0QU9wZW5lZCA9IGZhbHNlO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVkaWFTZXJ2aWNlOiBTZW1NZWRpYVNlcnZpY2UsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgLy8gdGhpcy53aWRnZXQgPSB0aGlzLmluamVjdG9yLmdldCgnd2lkZ2V0Jyk7XG4gICAgLy8gaWYodGhpcy53aWRnZXQuY29tcG9uZW50TmFtZSA9PT0gJ1NlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50Jykge1xuICAgIC8vICAgY29uc29sZS5sb2coJ0dvdCB0aGUgd3lzaXd5ZyBkYXRhJywgdGhpcy53aWRnZXQpO1xuICAgIC8vIH1cblxuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUNvbXBvbmVudENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICBsZXQgZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdCA9IFtdO1xuICAgICAgdGhpcy51c2VySW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgZm9yIChjb25zdCBpbWFnZSBvZiBhbGxJbWFnZXMpIHtcbiAgICAgICAgZWRpdE1vZGUgPSBlZGl0TW9kZSB8fCBpbWFnZS5lZGl0TW9kZTtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0LnB1c2goaW1hZ2UuZmlsZU5hbWUpO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZWRpdFZpc2libGUgPSBlZGl0TW9kZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUNvbmZpZ0NoYW5nZXMuc3Vic2NyaWJlKGNvbmZpZyA9PiB7XG4gICAgICB0aGlzLmNvbmZpZyA9IF8uY2xvbmVEZWVwKGNvbmZpZyk7XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmltYWdlTG9hZENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXNlckltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgYWxsSW1hZ2VzKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdC5wdXNoKGltYWdlLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMua2V5ID0gYWxsSW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgICB0aGlzLmVkaXRWaXNpYmxlID0gZmFsc2U7XG4gICAgICBpZiAoYWxsSW1hZ2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UudGVtcENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgfSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgdXBsb2FkZWRJbWFnZShpbWFnZTogRmlsZSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5wdXRJbWFnZShpbWFnZSk7XG4gIH1cbiAgb25FbmFibGVFZGl0SW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0RW5hYmxlKGluZGV4KTtcbiAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IHRydWU7XG4gICAgdGhpcy5rZXkgPSBpbmRleDtcbiAgfVxuICBvbkVkaXRJbWFnZShpbmRleCkge1xuICAgIHRoaXMua2V5ID0gaW5kZXg7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEVuYWJsZShpbmRleCk7XG4gIH1cbiAgb25EZWxldGVJbWFnZShpbmRleCkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkRlbGV0ZUltYWdlKGluZGV4KTtcbiAgfVxuICBvbk1lbnUobW9kZSkge1xuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAnSU1BR0VTJzpcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RVUExJQ0FURSc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU0VUVElOR1MnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RFTEVURSc6XG4gICAgICAgIHRoaXMuX21lZGlhU2VydmljZS5jbGVhckltYWdlcygpO1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgb25DaGFuZ2VkRm9ybShmb3JtRGF0YTogYW55KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmZvcm1DaGFuZ2VkKHRoaXMua2V5LCBmb3JtRGF0YSk7XG4gIH1cbiAgb25DaGFuZ2VkRWRpdE1vZGUobW9kZTogc3RyaW5nKSB7XG4gICAgaWYgKG1vZGUgPT09ICdBUFBMWScpIHtcbiAgICAgIC8vIHRoaXMuZWRpdFZpc2libGUgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmltYWdlTmFtZUxpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0SW1hZ2UodGhpcy5rZXksIG1vZGUpO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5jbGVhckNvbmZpZyh0aGlzLmtleSk7XG4gIH1cbiAgb25Dcm9wcGVkSW1hZ2UoaW5kZXgsIGNyb3BwZWRJbWFnZSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5wdXRDcm9wcGVkSW1hZ2UoaW5kZXgsIGNyb3BwZWRJbWFnZSk7XG4gIH1cbiAgb3BlblRlc3RBKGlzT3BlbmVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gaXNPcGVuZWQ7XG4gIH1cblxuXG5cbiAgY3JvcHBlZEltYWdlKGl0ZW0pe1xuICAgIGNvbnNvbGUubG9nKCdub3Qgc3VyZScsIGl0ZW0pXG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE5nTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybXNNb2R1bGUsXG4gIFJlYWN0aXZlRm9ybXNNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTZW1NZWRpYVBhbmVsU2V0dGluZ3NDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXBhbmVsL3NlbS1tZWRpYS1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtVXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21lZGlhLWltYWdlLXVwbG9hZC9tZWRpYS11cGxvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbUNyb3BwZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtY3JvcHBlci9tZWRpYS1jcm9wcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1Db250cm9sc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1jb250cm9scy9tZWRpYS1jb250cm9scy5jb21wbmVudCc7XG5pbXBvcnQgeyBTbGlkZVBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3NsaWRlLXBhbmVsL3NsaWRlLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1NZWRpYVNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS1tZWRpYS1zZXR0aW5ncy9zZW0tbWVkaWEtc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZGlhRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1lZGl0L21lZGlhLWVkaXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtVWlLaXRTaGFyZWRNb2R1bGUgfSBmcm9tICcuL3NlbS11aS1zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFNlbU1hdGVyaWFsU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zZW0tbWF0ZXJpYWwtc2hhcmVkLm1vZHVsZSc7XG5cbmltcG9ydCB7IEltYWdlQ3JvcHBlck1vZHVsZSB9IGZyb20gJ25neC1pbWFnZS1jcm9wcGVyJztcbmltcG9ydCB7IEZpbGVEcm9wTW9kdWxlIH0gZnJvbSAnbmd4LWZpbGUtZHJvcCc7XG5pbXBvcnQgeyBBbmd1bGFyQ3JvcHBlcmpzTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1jcm9wcGVyanMnO1xuXG5pbXBvcnQgeyBOZ3hQYWdpbmF0aW9uTW9kdWxlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgWW91dHViZVNhZmVVcmxQaXBlIH0gZnJvbSAnLi9zYWZlLXVybC5waXBlJztcblxuaW1wb3J0IHsgU2VtVmlkZW9TZXR0aW5nc1BhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbC9zZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi9zZW0tdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuL3NlbS1tZWRpYS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbU1lZGlhU2V0dGluZ3NDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXNldHRpbmdzLWNvbnRhaW5lci9zZW0tbWVkaWEtc2V0dGluZ3MtY29udGFpbmVyJztcbmltcG9ydCB7IE5vb3BBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIC8vIE5vb3BBbmltYXRpb25zTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTmd4UGFnaW5hdGlvbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEltYWdlQ3JvcHBlck1vZHVsZSxcbiAgICBGaWxlRHJvcE1vZHVsZSxcbiAgICBBbmd1bGFyQ3JvcHBlcmpzTW9kdWxlLFxuICAgIFNlbU1hdGVyaWFsU2hhcmVkTW9kdWxlLFxuICAgIFNlbVVpS2l0U2hhcmVkTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFNlbU1lZGlhUGFuZWxTZXR0aW5nc0NvbXBvbmVudCxcbiAgICBTZW1VcGxvYWRDb21wb25lbnQsXG4gICAgU2VtQ3JvcHBlckNvbXBvbmVudCxcbiAgICBTZW1Db250cm9sc0NvbXBvbmVudCxcbiAgICBTZW1NZWRpYVNldHRpbmdzQ29tcG9uZW50LFxuICAgIE1lZGlhRWRpdENvbXBvbmVudCxcbiAgICBTbGlkZVBhbmVsQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFlvdXR1YmVTYWZlVXJsUGlwZSxcbiAgICBTZW1WaWRlb1NldHRpbmdzUGFuZWxDb21wb25lbnQsXG4gICAgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQsXG4gICAgU2VtTWVkaWFTZXR0aW5nc0NvbnRhaW5lckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU2VtTWVkaWFQYW5lbFNldHRpbmdzQ29tcG9uZW50LFxuICAgIFNlbVVwbG9hZENvbXBvbmVudCxcbiAgICBTZW1Dcm9wcGVyQ29tcG9uZW50LFxuICAgIFNlbUNvbnRyb2xzQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhU2V0dGluZ3NDb21wb25lbnQsXG4gICAgTWVkaWFFZGl0Q29tcG9uZW50LFxuICAgIFNsaWRlUGFuZWxDb21wb25lbnQsXG4gICAgU2VtTWVkaWFDb250YWluZXJDb21wb25lbnQsXG4gICAgU2VtVmlkZW9TZXR0aW5nc1BhbmVsQ29tcG9uZW50LFxuICAgIFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhU2V0dGluZ3NDb250YWluZXJDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgU2VtTWVkaWFTZXJ2aWNlLFxuICAgIFNlbVZpZGVvU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTZW1NZWRpYU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1NlbU1lZGlhU2VydmljZSwgU2VtVmlkZW9TZXJ2aWNlXVxuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIlN1YmplY3QiLCJfLmNsb25lRGVlcCIsIkluamVjdGFibGUiLCJOZ1pvbmUiLCJIdHRwQ2xpZW50IiwiSW5qZWN0IiwiUExBVEZPUk1fSUQiLCJFdmVudEVtaXR0ZXIiLCJpc1BsYXRmb3JtQnJvd3NlciIsIkNvbXBvbmVudCIsIk91dHB1dCIsIklucHV0IiwidHNsaWJfMS5fX3ZhbHVlcyIsInRyaWdnZXIiLCJ0cmFuc2l0aW9uIiwic3R5bGUiLCJhbmltYXRlIiwiVmlld0NoaWxkIiwiQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kiLCJzdGF0ZSIsIkZvcm1CdWlsZGVyIiwiSW5qZWN0b3IiLCJTZW1VaUJ1dHRvbk1vZHVsZSIsIlNlbVVpQnV0dG9uRG5kTW9kdWxlIiwiU2VtVWlCdXR0b25GYWJNb2R1bGUiLCJTZW1VaU92ZXJsYXlEaWFsb2dNb2R1bGUiLCJTZW1VaVRhYnNNb2R1bGUiLCJTZW1VaUxpc3RNb2R1bGUiLCJTZW1VaVRodW1ibmFpbExhcmdlTW9kdWxlIiwiTmdNb2R1bGUiLCJBMTF5TW9kdWxlIiwiQmlkaU1vZHVsZSIsIk9ic2VydmVyc01vZHVsZSIsIk92ZXJsYXlNb2R1bGUiLCJQbGF0Zm9ybU1vZHVsZSIsIlBvcnRhbE1vZHVsZSIsIlNjcm9sbERpc3BhdGNoTW9kdWxlIiwiQ2RrU3RlcHBlck1vZHVsZSIsIkNka1RhYmxlTW9kdWxlIiwiUGlwZSIsIkRvbVNhbml0aXplciIsIlZpZXdFbmNhcHN1bGF0aW9uIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIiwiTmd4UGFnaW5hdGlvbk1vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJJbWFnZUNyb3BwZXJNb2R1bGUiLCJGaWxlRHJvcE1vZHVsZSIsIkFuZ3VsYXJDcm9wcGVyanNNb2R1bGUiXSwibWFwcGluZ3MiOiI7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