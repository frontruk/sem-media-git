import { Injectable, NgZone, Pipe, NgModule, Component, Injector, Inject, PLATFORM_ID, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, defineInjectable, inject } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SemUiButtonModule, SemUiButtonFabModule, SemUiOverlayDialogModule, SemUiTabsModule, SemUiListModule, SemUiThumbnailLargeModule, SemUiButtonDndModule } from '@frontr/sem-ui';
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemMediaService {
    /**
     * @param {?} zone
     */
    constructor(zone) {
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
    onLoadEnd(event, fileName) {
        this.zone.run(() => {
            this.tempImage.fileName = fileName;
            this.tempImage.uploadedImage = event.target.result;
            // this.disableAllImageEdit();
            this.allImages.push(cloneDeep(this.tempImage));
            this.imageLoadChanges.next(cloneDeep(this.allImages));
        });
    }
    /**
     * @param {?} image
     * @return {?}
     */
    putImage(image) {
        /** @type {?} */
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => this.onLoadEnd(e, image.name);
        fileReader.readAsDataURL(image);
    }
    /**
     * @param {?} key
     * @param {?} croppedImage
     * @return {?}
     */
    putCroppedImage(key, croppedImage) {
        this.allImages[key].croppedImage = croppedImage;
        this.allImages[key].editMode = false;
        this.imageComponentChanges.next(cloneDeep(this.allImages));
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    }
    /**
     * @return {?}
     */
    disableAllImageEdit() {
        for (let i = 0; i < this.allImages.length; i++) {
            this.allImages[i].editMode = false;
        }
    }
    /**
     * @param {?} index
     * @param {?} formData
     * @return {?}
     */
    formChanged(index, formData) {
        this.allImages[index].controlBox.allText = formData.allText;
        this.allImages[index].controlBox.metaTitle = formData.metaTitle;
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    }
    /**
     * @param {?} index
     * @param {?} mode
     * @return {?}
     */
    onEditImage(index, mode) {
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
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onEditEnable(index) {
        this.allImages.forEach((image, i) => {
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
    }
    /**
     * @param {?} index
     * @return {?}
     */
    clearConfig(index) {
        this.allImages[index].controlBox.config.fit = false;
        this.allImages[index].controlBox.config.crop = false;
        this.allImages[index].controlBox.config.rotate = 0;
        this.allImages[index].controlBox.config.zoom = 0;
        this.allImages[index].controlBox.config.apply = false;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onDeleteImage(index) {
        this.allImages.splice(index, 1);
        this.imageComponentChanges.next(this.allImages);
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    }
    /**
     * @return {?}
     */
    clearImages() {
        this.allImages = [];
        this.imageComponentChanges.next(this.allImages);
        this.tempChanges.next(this.allImages);
    }
}
SemMediaService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
SemMediaService.ctorParameters = () => [
    { type: NgZone }
];
/** @nocollapse */ SemMediaService.ngInjectableDef = defineInjectable({ factory: function SemMediaService_Factory() { return new SemMediaService(inject(NgZone)); }, token: SemMediaService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemVideoService {
    /**
     * @param {?} http
     * @param {?} platformId
     */
    constructor(http, platformId) {
        this.http = http;
        this.platformId = platformId;
    }
    /**
     * @param {?} query
     * @return {?}
     */
    fetchVideos(query) {
        return this.http
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}
      &type=video&key=AIzaSyBsuhhgJzgHhC-zSHSakzDgB2H4Ke3gW54`);
    }
}
SemVideoService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
SemVideoService.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
/** @nocollapse */ SemVideoService.ngInjectableDef = defineInjectable({ factory: function SemVideoService_Factory() { return new SemVideoService(inject(HttpClient), inject(PLATFORM_ID)); }, token: SemVideoService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemMediaPanelSettingsComponent {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
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
        this.itemSeelcted = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.visibleControlPanel = this.editVisible;
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.userImages.length > 0) {
            /** @type {?} */
            const temp = {
                allText: this.userImages[this.key].controlBox.allText,
                metaTitle: this.userImages[this.key].controlBox.metaTitle
            };
            this.myForm = cloneDeep(temp);
        }
    }
    /**
     * @param {?} file
     * @return {?}
     */
    onImageLoaded(file) {
        this.visibleControlPanel = false;
        this.uploaded.emit(file);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onChangedMode(mode) {
        this.changedEditMode.emit(mode);
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    onEdit(index, item) {
        this.editImage.emit(index);
        this.key = index;
        this.visibleControlPanel = true;
        this.itemSeelcted = { i: index, data: item };
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onDelete(index) {
        this.deleteImage.emit(index);
        this.itemSeelcted = false;
    }
    /**
     * @param {?} formData
     * @return {?}
     */
    onChangedForm(formData) {
        this.changedForm.emit(formData);
    }
    /**
     * @return {?}
     */
    closeDialog() {
    }
    /**
     * @param {?} item
     * @return {?}
     */
    editSelected(item) {
    }
}
SemMediaPanelSettingsComponent.decorators = [
    { type: Component, args: [{
                selector: 'sem-panel',
                template: `<!--<div class="dialog-container&#45;&#45;header">-->
  <!--<span class="sem-icon-back" (click)="showUploadEvent.emit()"></span>-->

  <!--<span (click)="closeDialog()">-->
    <!--<span class="sem-icon-back"></span>-->
    <!--Close-->
  <!--</span>-->
<!--</div>-->

<!-- Upload Mode -->

<!-- Edit Mode -->


<!--<hr>-->
<!--<h4>Creating look and feel</h4>-->


<div class="dialog-container bg-default left" style="width:100%;">
  <div class="dialog-container--body">
    <div>
      <div semui-tabs #tabs >
        <div semui-tab #tab0 [title]="'Tab 0'" class="tab-navigation">
          <ul semui-list>

            <li semui-list-item
                list-item
                semui-importance="dark"
                (click)="tabs.tabClicked(uploadImage)"
            >
              <i class="fa icon-sites"  aria-hidden="true"></i>
              <span>Upload image</span>
            </li>
            <li
              semui-list-item
              list-item
              sem-importance="default"
              (click)="tabs.tabClicked(editImage)"
            >
              <i class="fa icon-settings"  aria-hidden="true"></i>
              <span>Edit image</span>
            </li>
          </ul>
        </div>
        <div semui-tab #uploadImage [title]="'Upload Image'" >
          <div class="dialog-container--header">
             <span (click)="tabs.tabClicked(tab0)">
                <span class="sem-icon-back"></span>
                Close
            </span>
          </div>
          <hr>
          Upload image

          <div class="table flex flex-wrap list-reset px1" *ngIf="!itemSeelcted">
            <div
              *ngIf="!editVisible"
              sem-upload
              class="col-4 border"
              (doneImage)="onImageLoaded($event)"></div>
            <ng-container  *ngIf="!editVisible">
              <div class="col-4 border"
                  *ngFor="let item of imageNameList; let i = index" >
                {{item}}
                <img
                  (click)="onEdit(i, item)"
                  class="rounded"
                  src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" class="fit" />
              </div>
            </ng-container>
          </div>
          <div *ngIf="itemSeelcted">
            <span class="px2"> {{itemSeelcted | json}}</span>
            <img
              (click)="editSelected(itemSeelcted)"
              class="rounded fit px2"
              src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg"
            />
            <sem-media-edit
              *ngIf="editVisible"
              (selectedEditMode)="onChangedMode($event)"
              (formChanged)="onChangedForm($event)"
              [formData]="myForm"
            ></sem-media-edit>

            <button sem-button sem-importance="secondary"
                    (click)="onDelete(itemSeelcted)">Delete</button>
          </div>

        </div >
        <div semui-tab #editImage [title]="'Edit Image'" >
          <div class="dialog-container--header">
             <span (click)="tabs.tabClicked(tab0)">
                <span class="sem-icon-back"></span>
                Close
             </span>
          </div>
          <hr>
          Edit Image
        </div >
        <div semui-tab #tab3 [title]="'Tab 3'">
          <div class="dialog-container--header">
             <span (click)="tabs.tabClicked(tab0)">
                <span class="sem-icon-back"></span>
                Close
             </span>
          </div>
          <hr>
          Tab 3 Content
        </div>
        <div semui-tab semui-tab #tab4 [title]="'Tab 4'">
          <div class="dialog-container--header">
             <span (click)="tabs.tabClicked(tab0)">
                <span class="sem-icon-back"></span>
                Close
             </span>
          </div>
          <hr>
          Tab 4 Content
        </div>
      </div>
    </div>
  </div>
</div>

`,
                styles: [`.h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:" ";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2,:host .img-cropper{margin-top:1rem}.mr2,:host .img-cropper{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2,:host form{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute,:host .img-cropper{position:absolute}.fixed{position:fixed}.top-0,:host .img-cropper{top:0}.right-0,:host .img-cropper{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host .img-cropper{width:650px}`]
            },] },
];
SemMediaPanelSettingsComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemUploadComponent {
    /**
     * @param {?} zone
     */
    constructor(zone) {
        this.zone = zone;
        this.doneImage = new EventEmitter();
        this.visibleImage = false;
        this.files = [];
    }
    /**
     * @return {?}
     */
    loadedImage() {
        this.visibleImage = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dropped(event) {
        this.files = event.files;
        for (const droppedFile of event.files) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                /** @type {?} */
                const fileEntry = (/** @type {?} */ (droppedFile.fileEntry));
                fileEntry.file((file) => {
                    this.doneImage.emit(file);
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
                const fileEntry = (/** @type {?} */ (droppedFile.fileEntry));
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    fileChangeEvent(event) {
        for (const chosenFile of event.target.files) {
            this.doneImage.emit(chosenFile);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    fileOver(event) {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    fileLeave(event) {
    }
}
SemUploadComponent.decorators = [
    { type: Component, args: [{
                selector: '[sem-upload]',
                template: `<div class="center">
  <div>
    <file-drop
      headertext="Drop files here"
      (onFileDrop)="dropped($event)"
      (onFileOver)="fileOver($event)"
      (onFileLeave)="fileLeave($event)"
      customstyle="drop-area"
    ></file-drop>
    <label >

    </label>
    <label
      for="file-upload"
      class="semui-label sem-label-button sem-label-button--primary inline-block px1">
      <span class="sem-icon-inbox"></span>
    </label>
    <input
      class="sem-input-button--primary"
      value="Upload"
      id="file-upload"
      type="file"
      (change)="fileChangeEvent($event)"
      accept="image/*"
      multiple>



  </div>
</div>
`,
                styles: [`.h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host .control{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:" ";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1,:host .control{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .control,:host .upload-btn{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2,:host .upload-btn{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative,:host .control{position:relative}.absolute,:host .control .label-icon{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{display:block}:host input[type=file]{display:none}:host input[type=checkbox]{display:none}:host .upload-btn{background:#05dcb6;color:#fff;border-radius:12px 12px 0}:host .control{color:#fff;width:100%;border-radius:12px 12px 0;background-color:#444d63}:host .control:focus{outline:0}:host .control .label-icon{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:1em}`]
            },] },
];
SemUploadComponent.ctorParameters = () => [
    { type: NgZone }
];
SemUploadComponent.propDecorators = {
    doneImage: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemCropperComponent {
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
            if (changes.config.currentValue && changes.config.currentValue.crop) ;
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
    class="fit w100"
    [ngStyle]="croppedStyle"
    (dblclick)="editImage()">

</div>
`,
                styles: [`.h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:" ";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .edit-overlay button{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3,:host .edit-overlay button{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{display:block}:host .w100{width:100%}:host .img-cropper{position:relative}:host .preview-image{width:100%}:host .edit-overlay{position:absolute;top:0;left:0;width:100%;height:100%;transition:.2s ease-in}:host .edit-overlay.active{background-color:rgba(0,0,0,.2)}:host .edit-overlay button{background-color:rgba(255,255,255,.6);position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}`],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemControlsComponent {
    constructor() {
        this.pressedFit = new EventEmitter();
        this.pressedCrop = new EventEmitter();
        this.pressedRotateLeft = new EventEmitter();
        this.pressedRotateRight = new EventEmitter();
        this.pressedZoomIn = new EventEmitter();
        this.pressedZoomOut = new EventEmitter();
    }
}
SemControlsComponent.decorators = [
    { type: Component, args: [{
                selector: 'sem-controls',
                template: `<div class="flex my1">
  <div class="col-6 px1">
    <div>
      <button for="fit-control" class="control" (click)="pressedFit.emit()">
        <span class="sem-icon-resize label-icon"></span>Fit
      </button>
    </div>
    <div>
      <button for="rotate-left-control" class="control" (click)="pressedRotateLeft.emit()">
        <span class="sem-icon-resize label-icon"></span>Rotate Left
      </button>
    </div>
    <div>
      <button for="zoom-in-control" class="control" (click)="pressedZoomIn.emit()">
        <span class="sem-icon-resize label-icon"></span>Zoom in
      </button>
    </div>
  </div>
  <div class="col-6 px1">
      <div>
        <button for="crop-control" class="control" (click)="pressedCrop.emit()">
          <span class="sem-icon-resize label-icon"></span>Crop
        </button>
      </div>
      <div>
        <button for="rotate-right-control" class="control" (click)="pressedRotateRight.emit()">
          <span class="sem-icon-resize label-icon"></span>Rotate right
        </button>
      </div>
      <div>
        <button for="zoom-out-control" class="control" (click)="pressedZoomOut.emit()">
          <span class="sem-icon-resize label-icon"></span>Zoom out
        </button>
      </div>
  </div>
</div>`,
                styles: [`.h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host .control{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:" ";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1,:host .control{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .control{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative,:host .control{position:relative}.absolute,:host .control .label-icon{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host .control{color:#fff;width:100%;border-radius:12px 12px 0;background-color:#444d63}:host .control:focus{outline:0}:host .control .label-icon{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:1em}`],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SlidePanelComponent {
    constructor() {
        this.activePane = 'left';
    }
}
SlidePanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'sem-slide-panel',
                styles: [`:host{display:block;overflow:hidden}.panes{height:100%;width:200%;transition-duration:.5s;display:flex}.panes div{flex:1}`],
                template: `<div class="panes" [@slide]="activePane">
  <div><ng-content select="[leftPane]"></ng-content></div>
  <div><ng-content select="[rightPane]"></ng-content></div>
</div>`,
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemMediaSettingsComponent {
    /**
     * @param {?} _mediaService
     * @param {?} _fb
     */
    constructor(_mediaService, _fb) {
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
    onDelete() {
        this.pressedDelete.emit();
    }
    /**
     * @return {?}
     */
    onImages() {
        this.pressedImages.emit();
    }
    /**
     * @return {?}
     */
    onDuplicate() {
        this.pressedDuplicate.emit();
    }
    /**
     * @return {?}
     */
    onSettings() {
        this.isLeftVisible = false;
        // this.pressedSettings.emit();
    }
}
SemMediaSettingsComponent.decorators = [
    { type: Component, args: [{
                selector: 'sem-settings',
                template: `<div>
  <div class="dialog-container--header">
    <span class="sem-icon-back" (click)="isLeftVisible=true"></span>
  </div>
  <sem-slide-panel [activePane]="isLeftVisible? 'left': 'right'">
    <div leftPane>
      <div semui-section-body class="p2">
        <ul semui-list class="user-nav">
          <li
            semui-list-item
            list-item
            semui-importance="dark"
            class="py1"
            (click)="onImages()"
          >
            <i class="sem-icon-style default"  aria-hidden="true"></i>
            <span> Images</span>
          </li>
          <li
            semui-list-item
            list-item
            semui-importance="dark"
            class="py1"
            (click)="onSettings()"
          >
            <i class="sem-icon-settings default"  aria-hidden="true"></i>
            <span> Settings</span>
          </li>
          <li
            semui-list-item
            list-item
            semui-importance="dark"
            class="py1"
            (click)="onDuplicate()"
          >
            <i class="sem-icon-sites default"  aria-hidden="true"></i>
            <span> Duplicate</span>
          </li>
          <li
            semui-list-item
            list-item
            semui-importance="dark"
            class="py1"
            (click)="onDelete()"
          >
            <i class="sem-icon-delete default"  aria-hidden="true"></i>
            <span> Delete</span>
          </li>
        </ul>
      </div>
    </div>
    <div rightPane>
      <form [formGroup]="viewModeForm" class="p2">
        <input type="radio"
        value="grid"
        id="grid"
        formControlName="viewMode">
        <label for="grid"><span class="sem-icon-style default"></span></label>
        <input type="radio"
          value="carousel"
          id="carousel"
          formControlName="viewMode">
        <label for="carousel"><span class="sem-icon-settings default"></span></label>
        <input type="radio"
          value="list"
          id="list"
          formControlName="viewMode">
        <label for="list"><span class="sem-icon-settings default"></span></label>
      </form>
      {{viewModeForm.value | json}}
    </div>
  </sem-slide-panel>


</div>
`,
                styles: [`.h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:" ";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex,:host form{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around,:host form{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host form input[type=radio]{display:none}:host form input[type=radio]:checked+label{background:#ccc}:host form label span{font-size:30px}`]
            },] },
];
SemMediaSettingsComponent.ctorParameters = () => [
    { type: SemMediaService },
    { type: FormBuilder }
];
SemMediaSettingsComponent.propDecorators = {
    pressedImages: [{ type: Output }],
    pressedDelete: [{ type: Output }],
    pressedDuplicate: [{ type: Output }],
    pressedSettings: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MediaEditComponent {
    /**
     * @param {?} _fb
     */
    constructor(_fb) {
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
    ngOnChanges(changes) {
        this.myForm.patchValue({
            allText: this.formData.allText,
            metaTitle: this.formData.metaTitle
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.myForm.valueChanges.subscribe((data) => {
            this.formChanged.emit(data);
        });
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onPress(mode) {
        this.selectedEditMode.emit(mode);
    }
}
MediaEditComponent.decorators = [
    { type: Component, args: [{
                selector: 'sem-media-edit',
                template: `<form [formGroup]="myForm" class="p2">
  <label>All Text</label>
  <input type="text"
    class="sem-input"
    id="all-text"
    formControlName="allText">
  <label>Meta Title</label>
  <input type="text"
    class="sem-input"
    id="meta-title"
    formControlName="metaTitle">
</form>
<sem-controls
  (pressedFit)="onPress('FIT')"
  (pressedCrop)="onPress('CROP')"
  (pressedRotateLeft)="onPress('ROTATE_LEFT')"
  (pressedRotateRight)="onPress('ROTATE_RIGHT')"
  (pressedZoomIn)="onPress('ZOOM_IN')"
  (pressedZoomOut)="onPress('ZOOM_OUT')">
</sem-controls>
<div class="px2 flex justify-end">
  <button for="crop-control" class="control" (click)="onPress('APPLY')" >
    Apply
  </button>
</div>
<!-- <div><pre><code>{{ myForm?.value | json }}</code></pre></div> -->
`,
                styles: [`.h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host .control{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:" ";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1,:host .control{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1,:host .control{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3,:host .control{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative,:host .control{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host .control{color:#fff;border:none;border-radius:12px 12px 0;background-color:#05dcb6}:host .control:focus{outline:0}`]
            },] },
];
MediaEditComponent.ctorParameters = () => [
    { type: FormBuilder }
];
MediaEditComponent.propDecorators = {
    selectedEditMode: [{ type: Output }],
    formChanged: [{ type: Output }],
    formData: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemMediaContainerComponent {
    /**
     * @param {?} _mediaService
     * @param {?} injector
     */
    constructor(_mediaService, injector) {
        // this.widget = this.injector.get('widget');
        // if(this.widget.componentName === 'SemMediaContainerComponent') {
        //   console.log('Got the wysiwyg data', this.widget);
        // }
        this._mediaService = _mediaService;
        this.injector = injector;
        this.widget = {
            componentName: '',
            data: `
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer ook a galley of type
    and scrambled it to make a type specimen book. It has survived not only five ce nturies, but also the leap into electronic
    typesetting, remaining essentially unchanged. It was popu larised in the 1960s with the release of Letraset sheets
    containing`
        };
        this.userImages = [];
        this.editVisible = false;
        this.uploadPanelFlag = true;
        this.imageNameList = [];
        this.isTestAOpened = false;
        this.dataChange = new EventEmitter();
        this._mediaService.imageComponentChanges.subscribe(allImages => {
            /** @type {?} */
            let editMode = false;
            this.imageNameList = [];
            this.userImages = allImages;
            for (const image of allImages) {
                editMode = editMode || image.editMode;
                this.imageNameList.push(image.fileName);
            }
            setTimeout(() => {
                this.editVisible = editMode;
            });
        });
        this._mediaService.imageConfigChanges.subscribe(config => {
            this.config = cloneDeep(config);
        });
        this._mediaService.imageLoadChanges.subscribe(allImages => {
            this.tempImages = allImages;
            this.imageNameList = [];
            this.userImages = allImages;
            for (const image of allImages) {
                this.imageNameList.push(image.fileName);
            }
            this.key = allImages.length - 1;
            this.editVisible = false;
            if (allImages.length > 1) {
                this.uploadPanelFlag = false;
            }
        });
        this._mediaService.tempChanges.subscribe(allImages => {
            this.tempImages = allImages;
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} image
     * @return {?}
     */
    uploadedImage(image) {
        this._mediaService.putImage(image);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onEnableEditImage(index) {
        this._mediaService.onEditEnable(index);
        this.uploadPanelFlag = true;
        this.key = index;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onEditImage(index) {
        this.key = index;
        this._mediaService.onEditEnable(index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onDeleteImage(index) {
        this._mediaService.onDeleteImage(index);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onMenu(mode) {
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
    }
    /**
     * @param {?} formData
     * @return {?}
     */
    onChangedForm(formData) {
        this._mediaService.formChanged(this.key, formData);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onChangedEditMode(mode) {
        if (mode === 'APPLY') {
            // this.editVisible = false;
            if (this.imageNameList.length > 1) {
                this.uploadPanelFlag = false;
            }
        }
        this._mediaService.onEditImage(this.key, mode);
        this._mediaService.clearConfig(this.key);
    }
    /**
     * @param {?} index
     * @param {?} croppedImage
     * @return {?}
     */
    onCroppedImage(index, croppedImage) {
        this._mediaService.putCroppedImage(index, croppedImage);
    }
    /**
     * @param {?} status
     * @return {?}
     */
    openSettings(status) {
        this.isTestAOpened = status;
        this.dataChange.emit({
            data: this.data,
            status: status
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    croppedImage(item) {
        console.log('not sure', item);
    }
}
SemMediaContainerComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector,
                selector: '[sem-media-container]',
                template: `<div class="sem-dnd-container sem-media-container">



  <div *ngIf="userImages" class="preview-container">
    <div sem-cropper
      *ngFor="let image of userImages;let key = index"
      [imageData]="image.uploadedImage"
      [croppedImage]="image.croppedImage"
      [editMode]="image.editMode"
      [config]="config"
      [key]="key"
      (enabledCropper)="onEnableEditImage(key)"
      (croppedImageEvent)="onCroppedImage(key, $event)"
    ></div>
  </div>
  <div class="sem-dnd-container--nav">
    <button
      sem-btn-fab
      small
      corner="top-left"
      semui-theme="light"
      class="absolute top-0 right-0 "
      sem-importance="inverted"
      #chatOverlay="cdkOverlayOrigin"
      cdkOverlayOrigin
      (click)="openSettings(!isTestAOpened)"
    >
      <span class="sem-icon-drop_icon"></span>
    </button>
  </div>
</div>
`,
                styles: [`:host(){background-color:#f5e5e5;display:block;border:1px solid #8b0000;height:100%}.img-cropper{height:100%}`]
            },] },
];
SemMediaContainerComponent.ctorParameters = () => [
    { type: SemMediaService },
    { type: Injector }
];
SemMediaContainerComponent.propDecorators = {
    data: [{ type: Input }],
    dataChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const UiSharedModules = [
    SemUiButtonModule,
    SemUiButtonDndModule,
    SemUiButtonFabModule,
    SemUiOverlayDialogModule,
    SemUiTabsModule,
    SemUiListModule,
    SemUiThumbnailLargeModule
];
class SemUiKitSharedModule {
}
SemUiKitSharedModule.decorators = [
    { type: NgModule, args: [{
                exports: [...UiSharedModules]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MATERIAL_MODULES = [
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
class SemMaterialSharedModule {
}
SemMaterialSharedModule.decorators = [
    { type: NgModule, args: [{
                exports: [...MATERIAL_MODULES]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class YoutubeSafeUrlPipe {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} videoId
     * @return {?}
     */
    transform(videoId) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
    }
}
YoutubeSafeUrlPipe.decorators = [
    { type: Pipe, args: [{
                name: 'youtubeSafeUrl'
            },] },
];
YoutubeSafeUrlPipe.ctorParameters = () => [
    { type: DomSanitizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VideoModel {
    /**
     * @param {?} videoId
     * @param {?} title
     * @param {?} thumbnailUrl
     * @param {?} channelTitle
     * @param {?} channelId
     * @param {?} description
     */
    constructor(videoId, title, thumbnailUrl, channelTitle, channelId, description) {
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemVideoSettingsPanelComponent {
    /**
     * @param {?} semVideoService
     */
    constructor(semVideoService) {
        this.semVideoService = semVideoService;
        this.close = new EventEmitter();
        this.selected = new EventEmitter();
        this.results = [];
        this.page = 1;
    }
    /**
     * @return {?}
     */
    loadSettings() { }
    /**
     * @param {?} query
     * @return {?}
     */
    search(query) {
        console.log('query', query);
        this.semVideoService.fetchVideos(query).subscribe((data) => {
            this.results = data.items.map(item => {
                return new VideoModel(item.id.videoId, item.snippet.title, item.snippet.thumbnails.high.url, item.snippet.channelTitle, item.snippet.channelId, item.snippet.description);
            });
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addVideo(item) {
        this.selected.emit({ id: this.dataId, data: item });
    }
    /**
     * @return {?}
     */
    closeDialog() {
        this.close.emit(false);
    }
}
SemVideoSettingsPanelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                // tslint:disable-next-line:component-selector,
                selector: '[sem-video-settings-panel]',
                template: `<div class="dialog-container--header">
  <span (click)="closeDialog()">
    <span class="sem-icon-back"></span>
    Close
  </span>
</div>
<div class="dialog-container--body_spaced bg-default">
  <div semui-tabs #tabsVertical [showTabs]="true" [vertical]="true" >
    <div semui-tab #tabsV1 [title]="'Video Url'">
      <div semui-section-body>
        Tab 1 content
      </div>
    </div>
    <div semui-tab #tabsV2 [title]="'Search'">
      <div class="sem-video-container">
          <!-- Section Body -->
          <div semui-section-body>
            <!-- Search -->
            <div>
              <div>
                <!-- YouTube Search -->
                <label>Search Youtube</label>
                <span class="input-prefix">
                  <span class="sem-icon-search prefix"></span>
                   <input
                     type="text"
                     class="sem-input"
                     name="search"
                     id="search"
                     placeholder="Search"
                     autofocus
                     (keyup)="search(textBox.value)"
                     #textBox
                   />
                </span>
              </div>
              <span  field-prefix class="icon icon-search prefix"></span>
              <div class="sem-video-container--results">

                <div *ngIf="results.length == 0" class="sem-video-container--results_item">
                  <figure semui-thumbnail class="pt2">
                         <span class="sem-video-container--results_preview" card-image></span>
                          <figcaption sem-section-footer>
                            <div class="figcaption-container">
                                <h2 class="primary-caption">
                                  Loding
                                </h2>
                                <span class="sub-caption">
                                Loding
                                </span>
                            </div>
                          </figcaption>
                  </figure>
                </div>
                <div *ngFor="let item of results | paginate: config" class="sem-video-container--results_item">
                    <figure semui-thumbnail class="pt2">
                      <span class="sem-video-container--results_preview" card-image>
                          <img *ngIf="item.thumbnailUrl" [src]="item.thumbnailUrl"  />
                      </span>
                      <figcaption sem-section-footer>
                        <div class="figcaption-container">
                          <h2
                            class="primary-caption"
                          >
                            {{ item.title}}
                          </h2>
                          <span
                            class="sub-caption">
                           {{ item.publishedAt}}
                          </span>
                          <br/>
                          <span
                            class=" relative sem-button-- sem-button sem-button--primary"
                            card-setting-button (click)="addVideo(item)"
                          >
                            Add this
                          </span>
                          <!--<button-->
                            <!--sem-btn-fab-->
                            <!--corner="none"-->
                            <!--semui-theme="light"-->
                            <!--sem-importance="default"-->
                            <!--card-setting-button (click)="loadSettings()"-->
                          <!--&gt;-->
                            <!--<span class="sem-icon-ellipse"></span>-->
                          <!--</button>-->
                        </div>
                      </figcaption>
                    </figure>
                </div>
              </div>
            </div>
          </div>
          <!-- Section Footer -->
          <div semui-section-footer>
              <pagination-template
                class="sem-pagination-container py2"
                #p="paginationApi"
                [id]="config.id"
                (pageChange)="config.currentPage = $event">
                <div class="sem-pagination-nav">
                  <div
                    class="sem-pagination-previous"
                    [class.disabled]="p.isFirstPage()">
                    <a *ngIf="!p.isFirstPage()" (click)="p.previous()"> < </a>
                  </div>
                  <div
                    *ngFor="let page of p.pages"
                    class="sem-pagination"
                    [class.active]="p.getCurrent() === page.value">
                    <a (click)="p.setCurrent(page.value)" *ngIf="p.getCurrent() !== page.value">
                      {{ page.label }}
                    </a>
                    <div *ngIf="p.getCurrent() === page.value">
                      {{ page.label }}
                    </div>
                  </div>
                  <div
                    class="sem-pagination-next"
                    [class.disabled]="p.isLastPage()">
                    <a *ngIf="!p.isLastPage()" (click)="p.next()"> > </a>
                  </div>
                </div>
              </pagination-template>

          </div>
      </div>
    </div>
  </div>
</div>
`,
                styles: [`.h1{font-size:2rem}.h2{font-size:1.5rem}.h3{font-size:1.25rem}.h4{font-size:1rem}.h5{font-size:.875rem}.h6{font-size:.75rem}.font-family-inherit{font-family:inherit}.font-size-inherit{font-size:inherit}.text-decoration-none{text-decoration:none}.bold{font-weight:700}.regular{font-weight:400}.italic{font-style:italic}.caps{text-transform:uppercase;letter-spacing:.2em}.left-align{text-align:left}.center{text-align:center}.right-align{text-align:right}.justify{text-align:justify}.nowrap{white-space:nowrap}.break-word{word-wrap:break-word}.line-height-1{line-height:1}.line-height-2{line-height:1.125}.line-height-3{line-height:1.25}.line-height-4{line-height:1.5}.list-style-none{list-style:none}.underline{text-decoration:underline}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-reset{list-style:none;padding-left:0}.inline{display:inline}.block,:host{display:block}.inline-block{display:inline-block}.table{display:table}.table-cell{display:table-cell}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.clearfix:after,.clearfix:before{content:" ";display:table}.clearfix:after{clear:both}.left{float:left}.right{float:right}.fit{max-width:100%}.max-width-1{max-width:24rem}.max-width-2{max-width:32rem}.max-width-3{max-width:48rem}.max-width-4{max-width:64rem}.border-box{box-sizing:border-box}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.m0{margin:0}.mt0{margin-top:0}.mr0{margin-right:0}.mb0{margin-bottom:0}.ml0{margin-left:0}.mx0{margin-left:0;margin-right:0}.my0{margin-top:0;margin-bottom:0}.m1{margin:.5rem}.mt1{margin-top:.5rem}.mr1{margin-right:.5rem}.mb1{margin-bottom:.5rem}.ml1{margin-left:.5rem}.mx1{margin-left:.5rem;margin-right:.5rem}.my1{margin-top:.5rem;margin-bottom:.5rem}.m2{margin:1rem}.mt2{margin-top:1rem}.mr2{margin-right:1rem}.mb2{margin-bottom:1rem}.ml2{margin-left:1rem}.mx2{margin-left:1rem;margin-right:1rem}.my2{margin-top:1rem;margin-bottom:1rem}.m3{margin:2rem}.mt3{margin-top:2rem}.mr3{margin-right:2rem}.mb3{margin-bottom:2rem}.ml3{margin-left:2rem}.mx3{margin-left:2rem;margin-right:2rem}.my3{margin-top:2rem;margin-bottom:2rem}.m4{margin:4rem}.mt4{margin-top:4rem}.mr4{margin-right:4rem}.mb4{margin-bottom:4rem}.ml4{margin-left:4rem}.mx4{margin-left:4rem;margin-right:4rem}.my4{margin-top:4rem;margin-bottom:4rem}.mxn1{margin-left:-.5rem;margin-right:-.5rem}.mxn2{margin-left:-1rem;margin-right:-1rem}.mxn3{margin-left:-2rem;margin-right:-2rem}.mxn4{margin-left:-4rem;margin-right:-4rem}.ml-auto{margin-left:auto}.mr-auto{margin-right:auto}.mx-auto{margin-left:auto;margin-right:auto}.p0{padding:0}.pt0{padding-top:0}.pr0{padding-right:0}.pb0{padding-bottom:0}.pl0{padding-left:0}.px0{padding-left:0;padding-right:0}.py0{padding-top:0;padding-bottom:0}.p1{padding:.5rem}.pt1{padding-top:.5rem}.pr1{padding-right:.5rem}.pb1{padding-bottom:.5rem}.pl1{padding-left:.5rem}.py1{padding-top:.5rem;padding-bottom:.5rem}.px1{padding-left:.5rem;padding-right:.5rem}.p2{padding:1rem}.pt2{padding-top:1rem}.pr2{padding-right:1rem}.pb2{padding-bottom:1rem}.pl2{padding-left:1rem}.py2{padding-top:1rem;padding-bottom:1rem}.px2{padding-left:1rem;padding-right:1rem}.p3{padding:2rem}.pt3{padding-top:2rem}.pr3{padding-right:2rem}.pb3{padding-bottom:2rem}.pl3{padding-left:2rem}.py3{padding-top:2rem;padding-bottom:2rem}.px3{padding-left:2rem;padding-right:2rem}.p4{padding:4rem}.pt4{padding-top:4rem}.pr4{padding-right:4rem}.pb4{padding-bottom:4rem}.pl4{padding-left:4rem}.py4{padding-top:4rem;padding-bottom:4rem}.px4{padding-left:4rem;padding-right:4rem}.col{float:left;box-sizing:border-box}.col-right{float:right;box-sizing:border-box}.col-1{width:8.33333%}.col-2{width:16.66667%}.col-3{width:25%}.col-4{width:33.33333%}.col-5{width:41.66667%}.col-6{width:50%}.col-7{width:58.33333%}.col-8{width:66.66667%}.col-9{width:75%}.col-10{width:83.33333%}.col-11{width:91.66667%}.col-12{width:100%}.flex{display:flex}@media (min-width:40em){.sm-col{float:left;box-sizing:border-box}.sm-col-right{float:right;box-sizing:border-box}.sm-col-1{width:8.33333%}.sm-col-2{width:16.66667%}.sm-col-3{width:25%}.sm-col-4{width:33.33333%}.sm-col-5{width:41.66667%}.sm-col-6{width:50%}.sm-col-7{width:58.33333%}.sm-col-8{width:66.66667%}.sm-col-9{width:75%}.sm-col-10{width:83.33333%}.sm-col-11{width:91.66667%}.sm-col-12{width:100%}.sm-flex{display:flex}}@media (min-width:52em){.md-col{float:left;box-sizing:border-box}.md-col-right{float:right;box-sizing:border-box}.md-col-1{width:8.33333%}.md-col-2{width:16.66667%}.md-col-3{width:25%}.md-col-4{width:33.33333%}.md-col-5{width:41.66667%}.md-col-6{width:50%}.md-col-7{width:58.33333%}.md-col-8{width:66.66667%}.md-col-9{width:75%}.md-col-10{width:83.33333%}.md-col-11{width:91.66667%}.md-col-12{width:100%}.md-flex{display:flex}}@media (min-width:64em){.lg-col{float:left;box-sizing:border-box}.lg-col-right{float:right;box-sizing:border-box}.lg-col-1{width:8.33333%}.lg-col-2{width:16.66667%}.lg-col-3{width:25%}.lg-col-4{width:33.33333%}.lg-col-5{width:41.66667%}.lg-col-6{width:50%}.lg-col-7{width:58.33333%}.lg-col-8{width:66.66667%}.lg-col-9{width:75%}.lg-col-10{width:83.33333%}.lg-col-11{width:91.66667%}.lg-col-12{width:100%}.lg-flex{display:flex}.lg-hide{display:none!important}}.flex-column{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.self-start{align-self:flex-start}.self-end{align-self:flex-end}.self-center{align-self:center}.self-baseline{align-self:baseline}.self-stretch{align-self:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.content-start{align-content:flex-start}.content-end{align-content:flex-end}.content-center{align-content:center}.content-between{align-content:space-between}.content-around{align-content:space-around}.content-stretch{align-content:stretch}.flex-auto{flex:1 1 auto;min-width:0;min-height:0}.flex-none{flex:none}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-last{order:99999}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.border{border-style:solid;border-width:1px}.border-top{border-top-style:solid;border-top-width:1px}.border-right{border-right-style:solid;border-right-width:1px}.border-bottom{border-bottom-style:solid;border-bottom-width:1px}.border-left{border-left-style:solid;border-left-width:1px}.border-none{border:0}.rounded{border-radius:3px}.circle{border-radius:50%}.rounded-top{border-radius:3px 3px 0 0}.rounded-right{border-radius:0 3px 3px 0}.rounded-bottom{border-radius:0 0 3px 3px}.rounded-left{border-radius:3px 0 0 3px}.not-rounded{border-radius:0}.hide{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}@media (max-width:40em){.xs-hide{display:none!important}}@media (min-width:40em) and (max-width:52em){.sm-hide{display:none!important}}@media (min-width:52em) and (max-width:64em){.md-hide{display:none!important}}.display-none{display:none!important}:host{background:#fff}.sem-video-container--results_preview{min-height:96px;display:block;background-color:#dedede}`]
            },] },
];
SemVideoSettingsPanelComponent.ctorParameters = () => [
    { type: SemVideoService }
];
SemVideoSettingsPanelComponent.propDecorators = {
    close: [{ type: Output }],
    selected: [{ type: Output }],
    config: [{ type: Input }],
    dataId: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemVideoContainerComponent {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.dataChange = new EventEmitter();
        this.selectedItem = new EventEmitter();
        this.editMode = false;
        this.isTestAOpened = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
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
    openSettings(status) {
        // this.isTestAOpened = status;
        this.dataChange.emit(this.data);
    }
}
SemVideoContainerComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector,
                selector: '[sem-video-container]',
                template: `
<div class="sem-dnd-container" *ngIf="data.data !== null">
  <div class="embed-container" *ngIf="data.data.hasOwnProperty('videoId')">
    <iframe width="100%"
    height="100%"
    frameborder="0"
    allowfullscreen
    [src]="data.data.videoId | youtubeSafeUrl"
    style="border: solid 1px black" >
    </iframe>
  </div>


  <div *ngIf="editMode" class="sem-dnd-container--nav">
    <button
      sem-btn-fab
      small
      corner="top-left"
      semui-theme="light"
      class="absolute top-0 right-0 "
      sem-importance="inverted"
      #chatOverlay="cdkOverlayOrigin"
      cdkOverlayOrigin
      (click)="openSettings(!isTestAOpened)"
    >
      <span class="sem-icon-drop_icon"></span>
    </button>
    <!--<semui-overlay-dialog-->
      <!--[overlayOrigin]="chatOverlay"-->
      <!--[isOpened]="isTestAOpened"-->
      <!--(close)="setSelected(false)"-->
      <!--(open)="setSelected(true)"-->
      <!--[overlayWidth]="'auto'"-->
    <!--&gt;-->
    <!--</semui-overlay-dialog>-->
  </div>
</div>
`,
                styles: [`:host{background-color:#f5e5e5;display:block;border:1px solid #8b0000}`]
            },] },
];
SemVideoContainerComponent.ctorParameters = () => [
    { type: Injector }
];
SemVideoContainerComponent.propDecorators = {
    data: [{ type: Input }],
    dataChange: [{ type: Output }],
    selectedItem: [{ type: Output }],
    editMode: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemMediaSettingsContainerComponent {
    /**
     * @param {?} _mediaService
     * @param {?} injector
     */
    constructor(_mediaService, injector) {
        // this.widget = this.injector.get('widget');
        // if(this.widget.componentName === 'SemMediaContainerComponent') {
        //   console.log('Got the wysiwyg data', this.widget);
        // }
        this._mediaService = _mediaService;
        this.injector = injector;
        this.widget = {
            componentName: '',
            data: `
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer ook a galley of type
    and scrambled it to make a type specimen book. It has survived not only five ce nturies, but also the leap into electronic
    typesetting, remaining essentially unchanged. It was popu larised in the 1960s with the release of Letraset sheets
    containing`
        };
        this.userImages = [];
        this.editVisible = false;
        this.uploadPanelFlag = true;
        this.imageNameList = [];
        this.isTestAOpened = false;
        this._mediaService.imageComponentChanges.subscribe(allImages => {
            /** @type {?} */
            let editMode = false;
            this.imageNameList = [];
            this.userImages = allImages;
            for (const image of allImages) {
                editMode = editMode || image.editMode;
                this.imageNameList.push(image.fileName);
            }
            setTimeout(() => {
                this.editVisible = editMode;
            });
        });
        this._mediaService.imageConfigChanges.subscribe(config => {
            this.config = cloneDeep(config);
        });
        this._mediaService.imageLoadChanges.subscribe(allImages => {
            this.tempImages = allImages;
            this.imageNameList = [];
            this.userImages = allImages;
            for (const image of allImages) {
                this.imageNameList.push(image.fileName);
            }
            this.key = allImages.length - 1;
            this.editVisible = false;
            if (allImages.length > 1) {
                this.uploadPanelFlag = false;
            }
        });
        this._mediaService.tempChanges.subscribe(allImages => {
            this.tempImages = allImages;
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} image
     * @return {?}
     */
    uploadedImage(image) {
        this._mediaService.putImage(image);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onEnableEditImage(index) {
        this._mediaService.onEditEnable(index);
        this.uploadPanelFlag = true;
        this.key = index;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onEditImage(index) {
        this.key = index;
        this._mediaService.onEditEnable(index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onDeleteImage(index) {
        this._mediaService.onDeleteImage(index);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onMenu(mode) {
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
    }
    /**
     * @param {?} formData
     * @return {?}
     */
    onChangedForm(formData) {
        this._mediaService.formChanged(this.key, formData);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onChangedEditMode(mode) {
        if (mode === 'APPLY') {
            // this.editVisible = false;
            if (this.imageNameList.length > 1) {
                this.uploadPanelFlag = false;
            }
        }
        this._mediaService.onEditImage(this.key, mode);
        this._mediaService.clearConfig(this.key);
    }
    /**
     * @param {?} index
     * @param {?} croppedImage
     * @return {?}
     */
    onCroppedImage(index, croppedImage) {
        this._mediaService.putCroppedImage(index, croppedImage);
    }
    /**
     * @param {?} isOpened
     * @return {?}
     */
    openTestA(isOpened) {
        this.isTestAOpened = isOpened;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    croppedImage(item) {
        console.log('not sure', item);
    }
}
SemMediaSettingsContainerComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector,
                selector: '[sem-media-settings-container]',
                template: ` <div *ngIf="uploadPanelFlag" class="dialog-container bg-default left" style="width:100%;">
  <div class="dialog-container--body">
    <sem-panel
      [editVisible]="editVisible"
      [key]="key"
      [imageNameList]="imageNameList"
      (cropped)="croppedImage($event)"
      (uploaded)="uploadedImage($event)"
      (changedForm)="onChangedForm($event)"
      (editImage)="onEditImage($event)"
      (deleteImage)="onDeleteImage($event)"
      (changedEditMode)="onChangedEditMode($event)"
      (showUploadEvent)="editVisible = false"
      [userImages]="userImages"
    ></sem-panel>
  </div>
</div>
<div *ngIf="!uploadPanelFlag"
     class="settings-container dialog-container bg-default mt4">
        <sem-settings
          (pressedImages)="onMenu('IMAGES')"
          (pressedDuplicate)="onMenu('DUPLICATE')"
          (pressedSettings)="onMenu('SETTINGS')"
          (pressedDelete)="onMenu('DELETE')"
        >
        </sem-settings>
</div>

`,
                styles: [`:host(){display:block;border:1px solid #8b0000}.img-cropper{height:100%}`]
            },] },
];
SemMediaSettingsContainerComponent.ctorParameters = () => [
    { type: SemMediaService },
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SemMediaModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: SemMediaModule,
            providers: [SemMediaService, SemVideoService]
        };
    }
}
SemMediaModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    // NoopAnimationsModule,
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { SemMediaService, SemVideoService, SemMediaModule, SemControlsComponent, SemCropperComponent, MediaEditComponent, SemUploadComponent, SlidePanelComponent, SemMediaContainerComponent, SemMediaPanelSettingsComponent, SemMediaSettingsComponent, SemVideoContainerComponent, SemVideoSettingsPanelComponent, VideoModel, SemMediaSettingsContainerComponent as ɵd, YoutubeSafeUrlPipe as ɵc, SemMaterialSharedModule as ɵa, SemUiKitSharedModule as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRyLXNlbS1tZWRpYS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS1tZWRpYS5zZXJ2aWNlLnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvc2VtLXZpZGVvLnNlcnZpY2UudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS1tZWRpYS1wYW5lbC9zZW0tbWVkaWEtcGFuZWwuY29tcG9uZW50LnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvY29tcG9uZW50cy9tZWRpYS1pbWFnZS11cGxvYWQvbWVkaWEtdXBsb2FkLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbXBvbmVudHMvbWVkaWEtY3JvcHBlci9tZWRpYS1jcm9wcGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbXBvbmVudHMvbWVkaWEtY29udHJvbHMvbWVkaWEtY29udHJvbHMuY29tcG5lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb21wb25lbnRzL3NsaWRlLXBhbmVsL3NsaWRlLXBhbmVsLmNvbXBvbmVudC50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXNldHRpbmdzL3NlbS1tZWRpYS1zZXR0aW5ncy5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb21wb25lbnRzL21lZGlhLWVkaXQvbWVkaWEtZWRpdC5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9zZW0tdWktc2hhcmVkLm1vZHVsZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS1tYXRlcmlhbC1zaGFyZWQubW9kdWxlLnRzIiwibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS9saWIvc2FmZS11cmwucGlwZS50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL21vZGVscy92aWRlby50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL2NvbnRhaW5lcnMvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsL3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbC5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bmcm9udHIvc2VtLW1lZGlhL2xpYi9jb250YWluZXJzL3NlbS1tZWRpYS1zZXR0aW5ncy1jb250YWluZXIvc2VtLW1lZGlhLXNldHRpbmdzLWNvbnRhaW5lci50cyIsIm5nOi8vQGZyb250ci9zZW0tbWVkaWEvbGliL3NlbS1tZWRpYS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbWFnZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvaW1hZ2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYVNlcnZpY2Uge1xuICBhbGxJbWFnZXM/OiBBcnJheTxJbWFnZU1vZGVsPiA9IFtdO1xuICB0ZW1wSW1hZ2U6IEltYWdlTW9kZWwgPSB7fSBhcyBhbnk7XG4gIHB1YmxpYyBpbWFnZUNvbXBvbmVudENoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIGltYWdlTG9hZENoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIGltYWdlQ29uZmlnQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgdGVtcENoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy50ZW1wSW1hZ2UuZWRpdE1vZGUgPSBmYWxzZSxcbiAgICB0aGlzLnRlbXBJbWFnZS5maWxlTmFtZSA9ICcnO1xuICAgIHRoaXMudGVtcEltYWdlLmNvbnRyb2xCb3ggPSB7XG4gICAgICBhbGxUZXh0OiAnJyxcbiAgICAgIG1ldGFUaXRsZTogJycsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgZml0OiBmYWxzZSxcbiAgICAgICAgY3JvcDogZmFsc2UsXG4gICAgICAgIHpvb206IDAsXG4gICAgICAgIHJvdGF0ZTogMCxcbiAgICAgICAgYXBwbHk6IGZhbHNlLFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy50ZW1wSW1hZ2UuY3JvcHBlZEltYWdlID0gJyc7XG4gICAgdGhpcy50ZW1wSW1hZ2UudXBsb2FkZWRJbWFnZSA9ICcnO1xuICB9XG4gIHB1YmxpYyBvbkxvYWRFbmQoZXZlbnQsIGZpbGVOYW1lKSB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZS5maWxlTmFtZSA9IGZpbGVOYW1lO1xuICAgICAgdGhpcy50ZW1wSW1hZ2UudXBsb2FkZWRJbWFnZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAvLyB0aGlzLmRpc2FibGVBbGxJbWFnZUVkaXQoKTtcbiAgICAgIHRoaXMuYWxsSW1hZ2VzLnB1c2goXy5jbG9uZURlZXAodGhpcy50ZW1wSW1hZ2UpKTtcbiAgICAgIHRoaXMuaW1hZ2VMb2FkQ2hhbmdlcy5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuYWxsSW1hZ2VzKSk7XG4gICAgfSk7XG4gIH1cbiAgcHV0SW1hZ2UoaW1hZ2U6IEZpbGUpIHtcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmaWxlUmVhZGVyLm9ubG9hZGVuZCA9IChlKSA9PiB0aGlzLm9uTG9hZEVuZChlLCBpbWFnZS5uYW1lKTtcbiAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoaW1hZ2UpO1xuICB9XG4gIHB1dENyb3BwZWRJbWFnZShrZXk6IG51bWJlciwgY3JvcHBlZEltYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFsbEltYWdlc1trZXldLmNyb3BwZWRJbWFnZSA9IGNyb3BwZWRJbWFnZTtcbiAgICB0aGlzLmFsbEltYWdlc1trZXldLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgdGhpcy5pbWFnZUNvbXBvbmVudENoYW5nZXMubmV4dChfLmNsb25lRGVlcCh0aGlzLmFsbEltYWdlcykpO1xuICAgIC8qKlxuICAgICAqIHJlbW92ZSBpbiBwcm9kIHZlcnNpb25cbiAgICAgKi9cbiAgICB0aGlzLnRlbXBDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICB9XG4gIGRpc2FibGVBbGxJbWFnZUVkaXQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgdGhpcy5hbGxJbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYWxsSW1hZ2VzW2ldLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvcm1DaGFuZ2VkKGluZGV4LCBmb3JtRGF0YSkge1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmFsbFRleHQgPSBmb3JtRGF0YS5hbGxUZXh0O1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94Lm1ldGFUaXRsZSA9IGZvcm1EYXRhLm1ldGFUaXRsZTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBvbkVkaXRJbWFnZShpbmRleCwgbW9kZSkge1xuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAnRklUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmZpdCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQ1JPUCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5jcm9wID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdaT09NX0lOJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnpvb20gPSAwLjE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnWk9PTV9PVVQnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuem9vbSA9IC0wLjE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUk9UQVRFX0xFRlQnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcucm90YXRlID0gOTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUk9UQVRFX1JJR0hUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnJvdGF0ZSA9IC05MDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBUFBMWSc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5hcHBseSA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5pbWFnZUNvbmZpZ0NoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcpO1xuICAgIC8qKlxuICAgICAqIHJlbW92ZSBpbiBwcm9kIHZlcnNpb25cbiAgICAgKi9cbiAgICAvLyB0aGlzLnRlbXBDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgfVxuICBvbkVkaXRFbmFibGUoaW5kZXgpIHtcbiAgICB0aGlzLmFsbEltYWdlcy5mb3JFYWNoKChpbWFnZSwgaSkgPT4ge1xuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XG4gICAgICAgIGltYWdlLmVkaXRNb2RlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltYWdlLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pbWFnZUNvbXBvbmVudENoYW5nZXMubmV4dChfLmNsb25lRGVlcCh0aGlzLmFsbEltYWdlcykpO1xuICAgIC8qKlxuICAgICAqIHJlbW92ZSBpbiBwcm9kIHZlcnNpb25cbiAgICAgKi9cbiAgICB0aGlzLnRlbXBDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICB9XG4gIGNsZWFyQ29uZmlnKGluZGV4KSB7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmZpdCA9IGZhbHNlO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5jcm9wID0gZmFsc2U7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnJvdGF0ZSA9IDA7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnpvb20gPSAwO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5hcHBseSA9IGZhbHNlO1xuICB9XG4gIG9uRGVsZXRlSW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLmFsbEltYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICAgIC8qKlxuICAgICAqIHJlbW92ZSBpbiBwcm9kIHZlcnNpb25cbiAgICAgKi9cbiAgICB0aGlzLnRlbXBDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICB9XG4gIGNsZWFySW1hZ2VzKCkge1xuICAgIHRoaXMuYWxsSW1hZ2VzID0gW107XG4gICAgdGhpcy5pbWFnZUNvbXBvbmVudENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZW1WaWRlb1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCByZWFkb25seSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwdWJsaWMgcGxhdGZvcm1JZDogT2JqZWN0KSB7IH1cblxuICBwdWJsaWMgZmV0Y2hWaWRlb3MocXVlcnk6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldChgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My9zZWFyY2g/cGFydD1zbmlwcGV0Jm1heFJlc3VsdHM9NSZxPSR7cXVlcnl9XG4gICAgICAmdHlwZT12aWRlbyZrZXk9QUl6YVN5QnN1aGhnSnpnSGhDLXpTSFNha3pEZ0IySDRLZTNnVzU0YCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsXG4gIE9uQ2hhbmdlcywgSW5qZWN0LCBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBGb3JtQXJyYXksIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLXBhbmVsJyxcbiAgdGVtcGxhdGU6IGA8IS0tPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXImIzQ1OyYjNDU7aGVhZGVyXCI+LS0+XG4gIDwhLS08c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIiAoY2xpY2spPVwic2hvd1VwbG9hZEV2ZW50LmVtaXQoKVwiPjwvc3Bhbj4tLT5cblxuICA8IS0tPHNwYW4gKGNsaWNrKT1cImNsb3NlRGlhbG9nKClcIj4tLT5cbiAgICA8IS0tPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCI+PC9zcGFuPi0tPlxuICAgIDwhLS1DbG9zZS0tPlxuICA8IS0tPC9zcGFuPi0tPlxuPCEtLTwvZGl2Pi0tPlxuXG48IS0tIFVwbG9hZCBNb2RlIC0tPlxuXG48IS0tIEVkaXQgTW9kZSAtLT5cblxuXG48IS0tPGhyPi0tPlxuPCEtLTxoND5DcmVhdGluZyBsb29rIGFuZCBmZWVsPC9oND4tLT5cblxuXG48ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lciBiZy1kZWZhdWx0IGxlZnRcIiBzdHlsZT1cIndpZHRoOjEwMCU7XCI+XG4gIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1ib2R5XCI+XG4gICAgPGRpdj5cbiAgICAgIDxkaXYgc2VtdWktdGFicyAjdGFicyA+XG4gICAgICAgIDxkaXYgc2VtdWktdGFiICN0YWIwIFt0aXRsZV09XCInVGFiIDAnXCIgY2xhc3M9XCJ0YWItbmF2aWdhdGlvblwiPlxuICAgICAgICAgIDx1bCBzZW11aS1saXN0PlxuXG4gICAgICAgICAgICA8bGkgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICAgICAgbGlzdC1pdGVtXG4gICAgICAgICAgICAgICAgc2VtdWktaW1wb3J0YW5jZT1cImRhcmtcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJ0YWJzLnRhYkNsaWNrZWQodXBsb2FkSW1hZ2UpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBpY29uLXNpdGVzXCIgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgPHNwYW4+VXBsb2FkIGltYWdlPC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICBzZW11aS1saXN0LWl0ZW1cbiAgICAgICAgICAgICAgbGlzdC1pdGVtXG4gICAgICAgICAgICAgIHNlbS1pbXBvcnRhbmNlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJ0YWJzLnRhYkNsaWNrZWQoZWRpdEltYWdlKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgaWNvbi1zZXR0aW5nc1wiICBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgIDxzcGFuPkVkaXQgaW1hZ2U8L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHNlbXVpLXRhYiAjdXBsb2FkSW1hZ2UgW3RpdGxlXT1cIidVcGxvYWQgSW1hZ2UnXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1oZWFkZXJcIj5cbiAgICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwidGFicy50YWJDbGlja2VkKHRhYjApXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIENsb3NlXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGhyPlxuICAgICAgICAgIFVwbG9hZCBpbWFnZVxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlIGZsZXggZmxleC13cmFwIGxpc3QtcmVzZXQgcHgxXCIgKm5nSWY9XCIhaXRlbVNlZWxjdGVkXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICpuZ0lmPVwiIWVkaXRWaXNpYmxlXCJcbiAgICAgICAgICAgICAgc2VtLXVwbG9hZFxuICAgICAgICAgICAgICBjbGFzcz1cImNvbC00IGJvcmRlclwiXG4gICAgICAgICAgICAgIChkb25lSW1hZ2UpPVwib25JbWFnZUxvYWRlZCgkZXZlbnQpXCI+PC9kaXY+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICAqbmdJZj1cIiFlZGl0VmlzaWJsZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTQgYm9yZGVyXCJcbiAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGltYWdlTmFtZUxpc3Q7IGxldCBpID0gaW5kZXhcIiA+XG4gICAgICAgICAgICAgICAge3tpdGVtfX1cbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25FZGl0KGksIGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwicm91bmRlZFwiXG4gICAgICAgICAgICAgICAgICBzcmM9XCJodHRwOi8vZDJ2NTJrM2NsOXZlZGQuY2xvdWRmcm9udC5uZXQvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci1zcXVhcmUuc3ZnXCIgY2xhc3M9XCJmaXRcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtU2VlbGN0ZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHgyXCI+IHt7aXRlbVNlZWxjdGVkIHwganNvbn19PC9zcGFuPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAoY2xpY2spPVwiZWRpdFNlbGVjdGVkKGl0ZW1TZWVsY3RlZClcIlxuICAgICAgICAgICAgICBjbGFzcz1cInJvdW5kZWQgZml0IHB4MlwiXG4gICAgICAgICAgICAgIHNyYz1cImh0dHA6Ly9kMnY1MmszY2w5dmVkZC5jbG91ZGZyb250Lm5ldC9hc3NldHMvaW1hZ2VzL3BsYWNlaG9sZGVyLXNxdWFyZS5zdmdcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxzZW0tbWVkaWEtZWRpdFxuICAgICAgICAgICAgICAqbmdJZj1cImVkaXRWaXNpYmxlXCJcbiAgICAgICAgICAgICAgKHNlbGVjdGVkRWRpdE1vZGUpPVwib25DaGFuZ2VkTW9kZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgKGZvcm1DaGFuZ2VkKT1cIm9uQ2hhbmdlZEZvcm0oJGV2ZW50KVwiXG4gICAgICAgICAgICAgIFtmb3JtRGF0YV09XCJteUZvcm1cIlxuICAgICAgICAgICAgPjwvc2VtLW1lZGlhLWVkaXQ+XG5cbiAgICAgICAgICAgIDxidXR0b24gc2VtLWJ1dHRvbiBzZW0taW1wb3J0YW5jZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkRlbGV0ZShpdGVtU2VlbGN0ZWQpXCI+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXYgPlxuICAgICAgICA8ZGl2IHNlbXVpLXRhYiAjZWRpdEltYWdlIFt0aXRsZV09XCInRWRpdCBJbWFnZSdcIiA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWhlYWRlclwiPlxuICAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJ0YWJzLnRhYkNsaWNrZWQodGFiMClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgQ2xvc2VcbiAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGhyPlxuICAgICAgICAgIEVkaXQgSW1hZ2VcbiAgICAgICAgPC9kaXYgPlxuICAgICAgICA8ZGl2IHNlbXVpLXRhYiAjdGFiMyBbdGl0bGVdPVwiJ1RhYiAzJ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1oZWFkZXJcIj5cbiAgICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwidGFicy50YWJDbGlja2VkKHRhYjApXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIENsb3NlXG4gICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxocj5cbiAgICAgICAgICBUYWIgMyBDb250ZW50XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHNlbXVpLXRhYiBzZW11aS10YWIgI3RhYjQgW3RpdGxlXT1cIidUYWIgNCdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0taGVhZGVyXCI+XG4gICAgICAgICAgICAgPHNwYW4gKGNsaWNrKT1cInRhYnMudGFiQ2xpY2tlZCh0YWIwKVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tYmFja1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICBDbG9zZVxuICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aHI+XG4gICAgICAgICAgVGFiIDQgQ29udGVudFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2Nre2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMXttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDIsOmhvc3QgLmltZy1jcm9wcGVye21hcmdpbi10b3A6MXJlbX0ubXIyLDpob3N0IC5pbWctY3JvcHBlcnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxe3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAyLDpob3N0IGZvcm17cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgye3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgze3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZXtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGUsOmhvc3QgLmltZy1jcm9wcGVye3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTAsOmhvc3QgLmltZy1jcm9wcGVye3RvcDowfS5yaWdodC0wLDpob3N0IC5pbWctY3JvcHBlcntyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0IC5pbWctY3JvcHBlcnt3aWR0aDo2NTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYVBhbmVsU2V0dGluZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8vIFBsZWFzZSBnZXQgdGhlc2Ugb3V0cHV0cyB3b3JraW5nXG4gIEBPdXRwdXQoKSBjcm9wcGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB1cGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZWRpdEltYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBkZWxldGVJbWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY2hhbmdlZEZvcm0gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNoYW5nZWRFZGl0TW9kZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2hvd1VwbG9hZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyBteUZvcm06IGFueSA9IHt9O1xuICBwdWJsaWMgaW1hZ2VMaXN0OiBBcnJheTxhbnk+ID0gW107XG4gIHB1YmxpYyB2aXNpYmxlQ29udHJvbFBhbmVsOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZWRpdFZpc2libGU6IEJvb2xlYW47XG4gIEBJbnB1dCgpIGtleTogbnVtYmVyO1xuICBASW5wdXQoKSBpbWFnZU5hbWVMaXN0OiBBcnJheTxzdHJpbmc+O1xuICBASW5wdXQoKSB1c2VySW1hZ2VzOiBBcnJheTxhbnk+O1xuXG4gIGl0ZW1TZWVsY3RlZDogYW55ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZDogYW55KSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy52aXNpYmxlQ29udHJvbFBhbmVsID0gdGhpcy5lZGl0VmlzaWJsZTtcbiAgICB9XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgaWYgKHRoaXMudXNlckltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0ZW1wID0ge1xuICAgICAgICBhbGxUZXh0OiB0aGlzLnVzZXJJbWFnZXNbdGhpcy5rZXldLmNvbnRyb2xCb3guYWxsVGV4dCxcbiAgICAgICAgbWV0YVRpdGxlOiB0aGlzLnVzZXJJbWFnZXNbdGhpcy5rZXldLmNvbnRyb2xCb3gubWV0YVRpdGxlXG4gICAgICB9O1xuICAgICAgdGhpcy5teUZvcm0gPSBfLmNsb25lRGVlcCh0ZW1wKTtcbiAgICB9XG4gIH1cbiAgb25JbWFnZUxvYWRlZChmaWxlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZpc2libGVDb250cm9sUGFuZWwgPSBmYWxzZTtcbiAgICB0aGlzLnVwbG9hZGVkLmVtaXQoZmlsZSk7XG4gIH1cbiAgb25DaGFuZ2VkTW9kZShtb2RlKSB7XG4gICAgdGhpcy5jaGFuZ2VkRWRpdE1vZGUuZW1pdChtb2RlKTtcbiAgfVxuICBvbkVkaXQoaW5kZXgsIGl0ZW0pIHtcbiAgICB0aGlzLmVkaXRJbWFnZS5lbWl0KGluZGV4KTtcbiAgICB0aGlzLmtleSA9IGluZGV4O1xuICAgIHRoaXMudmlzaWJsZUNvbnRyb2xQYW5lbCA9IHRydWU7XG4gICAgdGhpcy5pdGVtU2VlbGN0ZWQgPSB7IGk6IGluZGV4LCBkYXRhOiBpdGVtfTtcbiAgfVxuICBvbkRlbGV0ZShpbmRleCkge1xuICAgIHRoaXMuZGVsZXRlSW1hZ2UuZW1pdChpbmRleCk7XG4gICAgdGhpcy5pdGVtU2VlbGN0ZWQgPSBmYWxzZTtcbiAgfVxuICBvbkNoYW5nZWRGb3JtKGZvcm1EYXRhOiBhbnkpIHtcbiAgICB0aGlzLmNoYW5nZWRGb3JtLmVtaXQoZm9ybURhdGEpO1xuICB9XG4gIGNsb3NlRGlhbG9nKCl7XG5cbiAgfVxuXG4gIGVkaXRTZWxlY3RlZChpdGVtKTogdm9pZHtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwbG9hZEV2ZW50LCBVcGxvYWRGaWxlLCBGaWxlU3lzdGVtRmlsZUVudHJ5LCBGaWxlU3lzdGVtRGlyZWN0b3J5RW50cnkgfSBmcm9tICduZ3gtZmlsZS1kcm9wJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW3NlbS11cGxvYWRdJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+XG4gIDxkaXY+XG4gICAgPGZpbGUtZHJvcFxuICAgICAgaGVhZGVydGV4dD1cIkRyb3AgZmlsZXMgaGVyZVwiXG4gICAgICAob25GaWxlRHJvcCk9XCJkcm9wcGVkKCRldmVudClcIlxuICAgICAgKG9uRmlsZU92ZXIpPVwiZmlsZU92ZXIoJGV2ZW50KVwiXG4gICAgICAob25GaWxlTGVhdmUpPVwiZmlsZUxlYXZlKCRldmVudClcIlxuICAgICAgY3VzdG9tc3R5bGU9XCJkcm9wLWFyZWFcIlxuICAgID48L2ZpbGUtZHJvcD5cbiAgICA8bGFiZWwgPlxuXG4gICAgPC9sYWJlbD5cbiAgICA8bGFiZWxcbiAgICAgIGZvcj1cImZpbGUtdXBsb2FkXCJcbiAgICAgIGNsYXNzPVwic2VtdWktbGFiZWwgc2VtLWxhYmVsLWJ1dHRvbiBzZW0tbGFiZWwtYnV0dG9uLS1wcmltYXJ5IGlubGluZS1ibG9jayBweDFcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24taW5ib3hcIj48L3NwYW4+XG4gICAgPC9sYWJlbD5cbiAgICA8aW5wdXRcbiAgICAgIGNsYXNzPVwic2VtLWlucHV0LWJ1dHRvbi0tcHJpbWFyeVwiXG4gICAgICB2YWx1ZT1cIlVwbG9hZFwiXG4gICAgICBpZD1cImZpbGUtdXBsb2FkXCJcbiAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgIChjaGFuZ2UpPVwiZmlsZUNoYW5nZUV2ZW50KCRldmVudClcIlxuICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICBtdWx0aXBsZT5cblxuXG5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2ssOmhvc3QgLmNvbnRyb2x7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxLDpob3N0IC5jb250cm9se21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10MnttYXJnaW4tdG9wOjFyZW19Lm1yMnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxLDpob3N0IC5jb250cm9sLDpob3N0IC51cGxvYWQtYnRue3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAye3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4Miw6aG9zdCAudXBsb2FkLWJ0bntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4M3twYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleHtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0YXJ0e2FsaWduLWNvbnRlbnQ6ZmxleC1zdGFydH0uY29udGVudC1lbmR7YWxpZ24tY29udGVudDpmbGV4LWVuZH0uY29udGVudC1jZW50ZXJ7YWxpZ24tY29udGVudDpjZW50ZXJ9LmNvbnRlbnQtYmV0d2VlbnthbGlnbi1jb250ZW50OnNwYWNlLWJldHdlZW59LmNvbnRlbnQtYXJvdW5ke2FsaWduLWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0cmV0Y2h7YWxpZ24tY29udGVudDpzdHJldGNofS5mbGV4LWF1dG97ZmxleDoxIDEgYXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjB9LmZsZXgtbm9uZXtmbGV4Om5vbmV9Lm9yZGVyLTB7b3JkZXI6MH0ub3JkZXItMXtvcmRlcjoxfS5vcmRlci0ye29yZGVyOjJ9Lm9yZGVyLTN7b3JkZXI6M30ub3JkZXItbGFzdHtvcmRlcjo5OTk5OX0ucmVsYXRpdmUsOmhvc3QgLmNvbnRyb2x7cG9zaXRpb246cmVsYXRpdmV9LmFic29sdXRlLDpob3N0IC5jb250cm9sIC5sYWJlbC1pY29ue3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTB7dG9wOjB9LnJpZ2h0LTB7cmlnaHQ6MH0uYm90dG9tLTB7Ym90dG9tOjB9LmxlZnQtMHtsZWZ0OjB9Lnoxe3otaW5kZXg6MX0uejJ7ei1pbmRleDoyfS56M3t6LWluZGV4OjN9Lno0e3otaW5kZXg6NH0uYm9yZGVye2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MXB4fS5ib3JkZXItdG9we2JvcmRlci10b3Atc3R5bGU6c29saWQ7Ym9yZGVyLXRvcC13aWR0aDoxcHh9LmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweH0uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5ib3JkZXItbGVmdHtib3JkZXItbGVmdC1zdHlsZTpzb2xpZDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmJvcmRlci1ub25le2JvcmRlcjowfS5yb3VuZGVke2JvcmRlci1yYWRpdXM6M3B4fS5jaXJjbGV7Ym9yZGVyLXJhZGl1czo1MCV9LnJvdW5kZWQtdG9we2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LnJvdW5kZWQtcmlnaHR7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0ucm91bmRlZC1ib3R0b217Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0ucm91bmRlZC1sZWZ0e2JvcmRlci1yYWRpdXM6M3B4IDAgMCAzcHh9Lm5vdC1yb3VuZGVke2JvcmRlci1yYWRpdXM6MH0uaGlkZXtwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7aGVpZ2h0OjFweDt3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpfUBtZWRpYSAobWF4LXdpZHRoOjQwZW0pey54cy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pIGFuZCAobWF4LXdpZHRoOjUyZW0pey5zbS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pIGFuZCAobWF4LXdpZHRoOjY0ZW0pey5tZC1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdHtkaXNwbGF5OmJsb2NrfTpob3N0IGlucHV0W3R5cGU9ZmlsZV17ZGlzcGxheTpub25lfTpob3N0IGlucHV0W3R5cGU9Y2hlY2tib3hde2Rpc3BsYXk6bm9uZX06aG9zdCAudXBsb2FkLWJ0bntiYWNrZ3JvdW5kOiMwNWRjYjY7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjEycHggMTJweCAwfTpob3N0IC5jb250cm9se2NvbG9yOiNmZmY7d2lkdGg6MTAwJTtib3JkZXItcmFkaXVzOjEycHggMTJweCAwO2JhY2tncm91bmQtY29sb3I6IzQ0NGQ2M306aG9zdCAuY29udHJvbDpmb2N1c3tvdXRsaW5lOjB9Omhvc3QgLmNvbnRyb2wgLmxhYmVsLWljb257dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2xlZnQ6MWVtfWBdXG59KVxuXG5leHBvcnQgY2xhc3MgU2VtVXBsb2FkQ29tcG9uZW50IHtcblxuICBAT3V0cHV0KCkgcHVibGljIGRvbmVJbWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyB2aXNpYmxlSW1hZ2U6IEJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGZpbGVzOiBVcGxvYWRGaWxlW10gPSBbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgcHVibGljIGxvYWRlZEltYWdlKCkge1xuICAgIHRoaXMudmlzaWJsZUltYWdlID0gdHJ1ZTtcbiAgfVxuICBwdWJsaWMgZHJvcHBlZChldmVudDogVXBsb2FkRXZlbnQpIHtcbiAgICB0aGlzLmZpbGVzID0gZXZlbnQuZmlsZXM7XG5cbiAgICBmb3IgKGNvbnN0IGRyb3BwZWRGaWxlIG9mIGV2ZW50LmZpbGVzKSB7XG5cbiAgICAgIC8vIElzIGl0IGEgZmlsZT9cbiAgICAgIGlmIChkcm9wcGVkRmlsZS5maWxlRW50cnkuaXNGaWxlKSB7XG4gICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGRyb3BwZWRGaWxlLmZpbGVFbnRyeSBhcyBGaWxlU3lzdGVtRmlsZUVudHJ5O1xuICAgICAgICBmaWxlRW50cnkuZmlsZSgoZmlsZTogRmlsZSkgPT4ge1xuICAgICAgICAgIHRoaXMuZG9uZUltYWdlLmVtaXQoZmlsZSk7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgLy8gWW91IGNvdWxkIHVwbG9hZCBpdCBsaWtlIHRoaXM6XG4gICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbG9nbycsIGZpbGUsIHJlbGF0aXZlUGF0aClcblxuICAgICAgICAgIC8vIEhlYWRlcnNcbiAgICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICdzZWN1cml0eS10b2tlbic6ICdteXRva2VuJ1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgICB0aGlzLmh0dHAucG9zdCgnaHR0cHM6Ly9teWJhY2tlbmQuY29tL2FwaS91cGxvYWQvc2FuaXRpemUtYW5kLXNhdmUtbG9nbycsIGZvcm1EYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMsIHJlc3BvbnNlVHlwZTogJ2Jsb2InIH0pXG4gICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIC8vIFNhbml0aXplZCBsb2dvIHJldHVybmVkIGZyb20gYmFja2VuZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgKiovXG5cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJdCB3YXMgYSBkaXJlY3RvcnkgKGVtcHR5IGRpcmVjdG9yaWVzIGFyZSBhZGRlZCwgb3RoZXJ3aXNlIG9ubHkgZmlsZXMpXG4gICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGRyb3BwZWRGaWxlLmZpbGVFbnRyeSBhcyBGaWxlU3lzdGVtRGlyZWN0b3J5RW50cnk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZpbGVDaGFuZ2VFdmVudChldmVudCkge1xuICAgIGZvciAoY29uc3QgY2hvc2VuRmlsZSBvZiBldmVudC50YXJnZXQuZmlsZXMpIHtcbiAgICAgIHRoaXMuZG9uZUltYWdlLmVtaXQoY2hvc2VuRmlsZSk7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBmaWxlT3ZlcihldmVudCkge1xuICB9XG5cbiAgcHVibGljIGZpbGVMZWF2ZShldmVudCkge1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlcywgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIGFuaW1hdGUsXG4gIHRyYW5zaXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBBbmd1bGFyQ3JvcHBlcmpzQ29tcG9uZW50IH0gZnJvbSAnYW5ndWxhci1jcm9wcGVyanMnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbc2VtLWNyb3BwZXJdJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIGNsYXNzPVwiaW1nLWNyb3BwZXJcIlxuICAobW91c2VlbnRlcik9XCJvbk1vdXNlRW50ZXIoKVwiXG4gIChtb3VzZWxlYXZlKT1cIm9uTW91c2VMZWF2ZSgpXCI+XG4gIDxkaXYgY2xhc3M9XCJlZGl0LW92ZXJsYXlcIiBbY2xhc3MuYWN0aXZlXT1cImhvdmVyQWN0aXZlXCIgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCI+XG4gICAgPGJ1dHRvbiAqbmdJZj1cImhvdmVyQWN0aXZlXCIgW0BlbnRlckFuaW1hdGlvbl0gY2xhc3M9XCJwM1wiIChjbGljayk9XCJlZGl0SW1hZ2UoKVwiPkVkaXQgTWUhPC9idXR0b24+XG4gIDwvZGl2PlxuICA8aW1nXG4gICAgKm5nSWY9XCIhY3JvcHBlZEltYWdlICYmICFlZGl0TW9kZVwiXG4gICAgW3NyY109XCJpbWFnZURhdGFcIlxuICAgIGNsYXNzPVwicHJldmlldy1pbWFnZVwiXG4gICAgKGRibGNsaWNrKT1cImVkaXRJbWFnZSgpXCJcbiAgPlxuICA8YW5ndWxhci1jcm9wcGVyXG4gICAgKm5nSWY9XCJlZGl0TW9kZVwiXG4gICAgI2ltYWdlQ3JvcHBlclxuICAgIFtjcm9wcGVyT3B0aW9uc109XCJjcm9wcGVyQ29uZmlnXCJcbiAgICBbaW1hZ2VVcmxdPVwiaW1hZ2VEYXRhXCJcbiAgPjwvYW5ndWxhci1jcm9wcGVyPlxuICA8aW1nXG4gICAgKm5nSWY9XCJjcm9wcGVkSW1hZ2UgJiYgIWVkaXRNb2RlXCJcbiAgICBbc3JjXT1cImNyb3BwZWRJbWFnZVwiXG4gICAgY2xhc3M9XCJmaXQgdzEwMFwiXG4gICAgW25nU3R5bGVdPVwiY3JvcHBlZFN0eWxlXCJcbiAgICAoZGJsY2xpY2spPVwiZWRpdEltYWdlKClcIj5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmgxe2ZvbnQtc2l6ZToycmVtfS5oMntmb250LXNpemU6MS41cmVtfS5oM3tmb250LXNpemU6MS4yNXJlbX0uaDR7Zm9udC1zaXplOjFyZW19Lmg1e2ZvbnQtc2l6ZTouODc1cmVtfS5oNntmb250LXNpemU6Ljc1cmVtfS5mb250LWZhbWlseS1pbmhlcml0e2ZvbnQtZmFtaWx5OmluaGVyaXR9LmZvbnQtc2l6ZS1pbmhlcml0e2ZvbnQtc2l6ZTppbmhlcml0fS50ZXh0LWRlY29yYXRpb24tbm9uZXt0ZXh0LWRlY29yYXRpb246bm9uZX0uYm9sZHtmb250LXdlaWdodDo3MDB9LnJlZ3VsYXJ7Zm9udC13ZWlnaHQ6NDAwfS5pdGFsaWN7Zm9udC1zdHlsZTppdGFsaWN9LmNhcHN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4yZW19LmxlZnQtYWxpZ257dGV4dC1hbGlnbjpsZWZ0fS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnJpZ2h0LWFsaWdue3RleHQtYWxpZ246cmlnaHR9Lmp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS5ub3dyYXB7d2hpdGUtc3BhY2U6bm93cmFwfS5icmVhay13b3Jke3dvcmQtd3JhcDpicmVhay13b3JkfS5saW5lLWhlaWdodC0xe2xpbmUtaGVpZ2h0OjF9LmxpbmUtaGVpZ2h0LTJ7bGluZS1oZWlnaHQ6MS4xMjV9LmxpbmUtaGVpZ2h0LTN7bGluZS1oZWlnaHQ6MS4yNX0ubGluZS1oZWlnaHQtNHtsaW5lLWhlaWdodDoxLjV9Lmxpc3Qtc3R5bGUtbm9uZXtsaXN0LXN0eWxlOm5vbmV9LnVuZGVybGluZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS50cnVuY2F0ZXttYXgtd2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9Lmxpc3QtcmVzZXR7bGlzdC1zdHlsZTpub25lO3BhZGRpbmctbGVmdDowfS5pbmxpbmV7ZGlzcGxheTppbmxpbmV9LmJsb2Nre2Rpc3BsYXk6YmxvY2t9LmlubGluZS1ibG9ja3tkaXNwbGF5OmlubGluZS1ibG9ja30udGFibGV7ZGlzcGxheTp0YWJsZX0udGFibGUtY2VsbHtkaXNwbGF5OnRhYmxlLWNlbGx9Lm92ZXJmbG93LWhpZGRlbntvdmVyZmxvdzpoaWRkZW59Lm92ZXJmbG93LXNjcm9sbHtvdmVyZmxvdzpzY3JvbGx9Lm92ZXJmbG93LWF1dG97b3ZlcmZsb3c6YXV0b30uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVye2NsZWFyOmJvdGh9LmxlZnR7ZmxvYXQ6bGVmdH0ucmlnaHR7ZmxvYXQ6cmlnaHR9LmZpdHttYXgtd2lkdGg6MTAwJX0ubWF4LXdpZHRoLTF7bWF4LXdpZHRoOjI0cmVtfS5tYXgtd2lkdGgtMnttYXgtd2lkdGg6MzJyZW19Lm1heC13aWR0aC0ze21heC13aWR0aDo0OHJlbX0ubWF4LXdpZHRoLTR7bWF4LXdpZHRoOjY0cmVtfS5ib3JkZXItYm94e2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWxpZ24tYmFzZWxpbmV7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LmFsaWduLXRvcHt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmFsaWduLW1pZGRsZXt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFsaWduLWJvdHRvbXt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm0we21hcmdpbjowfS5tdDB7bWFyZ2luLXRvcDowfS5tcjB7bWFyZ2luLXJpZ2h0OjB9Lm1iMHttYXJnaW4tYm90dG9tOjB9Lm1sMHttYXJnaW4tbGVmdDowfS5teDB7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MH0ubXkwe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lm0xe21hcmdpbjouNXJlbX0ubXQxe21hcmdpbi10b3A6LjVyZW19Lm1yMXttYXJnaW4tcmlnaHQ6LjVyZW19Lm1iMXttYXJnaW4tYm90dG9tOi41cmVtfS5tbDF7bWFyZ2luLWxlZnQ6LjVyZW19Lm14MXttYXJnaW4tbGVmdDouNXJlbTttYXJnaW4tcmlnaHQ6LjVyZW19Lm15MXttYXJnaW4tdG9wOi41cmVtO21hcmdpbi1ib3R0b206LjVyZW19Lm0ye21hcmdpbjoxcmVtfS5tdDJ7bWFyZ2luLXRvcDoxcmVtfS5tcjJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MSw6aG9zdCAuZWRpdC1vdmVybGF5IGJ1dHRvbntwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMntwYWRkaW5nOjFyZW19LnB0MntwYWRkaW5nLXRvcDoxcmVtfS5wcjJ7cGFkZGluZy1yaWdodDoxcmVtfS5wYjJ7cGFkZGluZy1ib3R0b206MXJlbX0ucGwye3BhZGRpbmctbGVmdDoxcmVtfS5weTJ7cGFkZGluZy10b3A6MXJlbTtwYWRkaW5nLWJvdHRvbToxcmVtfS5weDJ7cGFkZGluZy1sZWZ0OjFyZW07cGFkZGluZy1yaWdodDoxcmVtfS5wM3twYWRkaW5nOjJyZW19LnB0M3twYWRkaW5nLXRvcDoycmVtfS5wcjN7cGFkZGluZy1yaWdodDoycmVtfS5wYjN7cGFkZGluZy1ib3R0b206MnJlbX0ucGwze3BhZGRpbmctbGVmdDoycmVtfS5weTN7cGFkZGluZy10b3A6MnJlbTtwYWRkaW5nLWJvdHRvbToycmVtfS5weDMsOmhvc3QgLmVkaXQtb3ZlcmxheSBidXR0b257cGFkZGluZy1sZWZ0OjJyZW07cGFkZGluZy1yaWdodDoycmVtfS5wNHtwYWRkaW5nOjRyZW19LnB0NHtwYWRkaW5nLXRvcDo0cmVtfS5wcjR7cGFkZGluZy1yaWdodDo0cmVtfS5wYjR7cGFkZGluZy1ib3R0b206NHJlbX0ucGw0e3BhZGRpbmctbGVmdDo0cmVtfS5weTR7cGFkZGluZy10b3A6NHJlbTtwYWRkaW5nLWJvdHRvbTo0cmVtfS5weDR7cGFkZGluZy1sZWZ0OjRyZW07cGFkZGluZy1yaWdodDo0cmVtfS5jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNvbC0xe3dpZHRoOjguMzMzMzMlfS5jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmNvbC0ze3dpZHRoOjI1JX0uY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmNvbC02e3dpZHRoOjUwJX0uY29sLTd7d2lkdGg6NTguMzMzMzMlfS5jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmNvbC05e3dpZHRoOjc1JX0uY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uY29sLTEye3dpZHRoOjEwMCV9LmZsZXh7ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdGFydHthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9LmNvbnRlbnQtZW5ke2FsaWduLWNvbnRlbnQ6ZmxleC1lbmR9LmNvbnRlbnQtY2VudGVye2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5jb250ZW50LWJldHdlZW57YWxpZ24tY29udGVudDpzcGFjZS1iZXR3ZWVufS5jb250ZW50LWFyb3VuZHthbGlnbi1jb250ZW50OnNwYWNlLWFyb3VuZH0uY29udGVudC1zdHJldGNoe2FsaWduLWNvbnRlbnQ6c3RyZXRjaH0uZmxleC1hdXRve2ZsZXg6MSAxIGF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowfS5mbGV4LW5vbmV7ZmxleDpub25lfS5vcmRlci0we29yZGVyOjB9Lm9yZGVyLTF7b3JkZXI6MX0ub3JkZXItMntvcmRlcjoyfS5vcmRlci0ze29yZGVyOjN9Lm9yZGVyLWxhc3R7b3JkZXI6OTk5OTl9LnJlbGF0aXZle3Bvc2l0aW9uOnJlbGF0aXZlfS5hYnNvbHV0ZXtwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0we3RvcDowfS5yaWdodC0we3JpZ2h0OjB9LmJvdHRvbS0we2JvdHRvbTowfS5sZWZ0LTB7bGVmdDowfS56MXt6LWluZGV4OjF9Lnoye3otaW5kZXg6Mn0uejN7ei1pbmRleDozfS56NHt6LWluZGV4OjR9LmJvcmRlcntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjFweH0uYm9yZGVyLXRvcHtib3JkZXItdG9wLXN0eWxlOnNvbGlkO2JvcmRlci10b3Atd2lkdGg6MXB4fS5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0LXN0eWxlOnNvbGlkO2JvcmRlci1yaWdodC13aWR0aDoxcHh9LmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOjFweH0uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4fS5ib3JkZXItbm9uZXtib3JkZXI6MH0ucm91bmRlZHtib3JkZXItcmFkaXVzOjNweH0uY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfS5yb3VuZGVkLXRvcHtib3JkZXItcmFkaXVzOjNweCAzcHggMCAwfS5yb3VuZGVkLXJpZ2h0e2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDB9LnJvdW5kZWQtYm90dG9te2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9LnJvdW5kZWQtbGVmdHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5ub3Qtcm91bmRlZHtib3JkZXItcmFkaXVzOjB9LmhpZGV7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O2hlaWdodDoxcHg7d2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KX1AbWVkaWEgKG1heC13aWR0aDo0MGVtKXsueHMtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKSBhbmQgKG1heC13aWR0aDo1MmVtKXsuc20taGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKSBhbmQgKG1heC13aWR0aDo2NGVtKXsubWQtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3R7ZGlzcGxheTpibG9ja306aG9zdCAudzEwMHt3aWR0aDoxMDAlfTpob3N0IC5pbWctY3JvcHBlcntwb3NpdGlvbjpyZWxhdGl2ZX06aG9zdCAucHJldmlldy1pbWFnZXt3aWR0aDoxMDAlfTpob3N0IC5lZGl0LW92ZXJsYXl7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dHJhbnNpdGlvbjouMnMgZWFzZS1pbn06aG9zdCAuZWRpdC1vdmVybGF5LmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjIpfTpob3N0IC5lZGl0LW92ZXJsYXkgYnV0dG9ue2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNik7cG9zaXRpb246YWJzb2x1dGU7bGVmdDo1MCU7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSl9YF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFxuICAgICAgJ2VudGVyQW5pbWF0aW9uJywgW1xuICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDB9KSxcbiAgICAgICAgICBhbmltYXRlKCc1MDBtcycsIHN0eWxlKHtvcGFjaXR5OiAxfSkpXG4gICAgICAgIF0pLFxuICAgICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDF9KSxcbiAgICAgICAgICBhbmltYXRlKCc1MDBtcycsIHN0eWxlKHtvcGFjaXR5OiAwfSkpXG4gICAgICAgIF0pXG4gICAgICBdXG4gICAgKVxuICBdLFxufSlcblxuZXhwb3J0IGNsYXNzIFNlbUNyb3BwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoJ2ltYWdlQ3JvcHBlcicpIHB1YmxpYyBpbWFnZUNyb3BwZXI6IEFuZ3VsYXJDcm9wcGVyanNDb21wb25lbnQ7XG4gIEBJbnB1dCgpIGltYWdlRGF0YTogc3RyaW5nO1xuICBASW5wdXQoKSBjcm9wcGVkSW1hZ2U6IHN0cmluZztcbiAgQElucHV0KCkgY29uZmlnOiBhbnkgPSB7fTtcbiAgQElucHV0KCkgZWRpdE1vZGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGtleTogbnVtYmVyO1xuICBAT3V0cHV0KCkgZW5hYmxlZENyb3BwZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNyb3BwZWRJbWFnZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIGNyb3BwZXJDb25maWc6IGFueTtcbiAgZWRpdFZpc2libGU6IEJvb2xlYW4gPSAgZmFsc2U7XG4gIGNyb3BwZWREYXRhOiBhbnk7XG4gIGNyb3BwZWRTdHlsZTogYW55O1xuICBob3ZlckFjdGl2ZTogQm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHVibGljIF9tZWRpYVNlcnZpY2U6IFNlbU1lZGlhU2VydmljZSkge1xuICAgIHRoaXMuY3JvcHBlckNvbmZpZyA9IHtcbiAgICAgIG1vdmFibGU6IHRydWUsXG4gICAgICBzY2FsYWJsZTogZmFsc2UsXG4gICAgICB6b29tYWJsZTogdHJ1ZSxcbiAgICAgIHZpZXdNb2RlOiAxLFxuICAgICAgZ3VpZGVzOiB0cnVlLFxuICAgICAgcm90YXRhYmxlOiB0cnVlLFxuICAgICAgZHJhZ01vZGU6ICdtb3ZlJyxcbiAgICAgIGNoZWNrQ3Jvc3NPcmlnaW46IHRydWUsXG4gICAgICByZWFkeTogKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQuY3JvcHBlci5jbGVhcigpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5jb25maWcgJiYgdGhpcy5pbWFnZUNyb3BwZXIpIHtcbiAgICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLmZpdCkge1xuICAgICAgICB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLnJlc2V0KCk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS5jcm9wKSB7XG4gICAgICAgIC8vIHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIuc2V0RHJhZ01vZGUoJ2Nyb3AnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLnpvb20gIT09IDApIHtcbiAgICAgICAgdGhpcy5pbWFnZUNyb3BwZXIuY3JvcHBlci56b29tKGNoYW5nZXMuY29uZmlnLmN1cnJlbnRWYWx1ZS56b29tKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLnJvdGF0ZSAhPT0gMCkge1xuICAgICAgICB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLnJvdGF0ZShjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUucm90YXRlKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLmFwcGx5KSB7XG4gICAgICAgIGNvbnN0IGNyb3BwZWRJbWFnZSA9IHRoaXMuaW1hZ2VDcm9wcGVyLmNyb3BwZXIuZ2V0Q3JvcHBlZENhbnZhcygpLnRvRGF0YVVSTCgnaW1hZ2UvanBnJyk7XG4gICAgICAgIHRoaXMuY3JvcHBlZERhdGEgPSB0aGlzLmltYWdlQ3JvcHBlci5jcm9wcGVyLmdldENyb3BCb3hEYXRhKCk7XG4gICAgICAgIHRoaXMuY3JvcHBlZFN0eWxlID0ge1xuICAgICAgICAgICd0b3AucHgnOiB0aGlzLmNyb3BwZWREYXRhLnRvcCxcbiAgICAgICAgICAnbGVmdC5weCc6IHRoaXMuY3JvcHBlZERhdGEubGVmdCxcbiAgICAgICAgICAnd2lkdGgucHgnOiB0aGlzLmNyb3BwZWREYXRhLndpZHRoLFxuICAgICAgICAgICdoZWlnaHQucHgnOiB0aGlzLmNyb3BwZWREYXRhLmhlaWdodCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcm9wcGVkSW1hZ2VFdmVudC5lbWl0KGNyb3BwZWRJbWFnZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmtleSAmJiBjaGFuZ2VzLmtleS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMua2V5ID0gY2hhbmdlcy5rZXkuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuICBuZ09uSW5pdCgpIHt9XG4gIGltYWdlTG9hZGVkKCkge1xuICAgICAgLy8gc2hvdyBjcm9wcGVyXG4gIH1cbiAgbG9hZEltYWdlRmFpbGVkKCkge1xuICAgICAgLy8gc2hvdyBtZXNzYWdlXG4gIH1cbiAgZWRpdEltYWdlKCkge1xuICAgIHRoaXMuY3JvcHBlZEltYWdlID0gJyc7XG4gICAgdGhpcy5lbmFibGVkQ3JvcHBlci5lbWl0KCk7XG4gIH1cbiAgb25Nb3VzZUVudGVyKCkge1xuICAgIHRoaXMuaG92ZXJBY3RpdmUgPSB0cnVlO1xuICB9XG4gIG9uTW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLmhvdmVyQWN0aXZlID0gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLWNvbnRyb2xzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZmxleCBteTFcIj5cbiAgPGRpdiBjbGFzcz1cImNvbC02IHB4MVwiPlxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIGZvcj1cImZpdC1jb250cm9sXCIgY2xhc3M9XCJjb250cm9sXCIgKGNsaWNrKT1cInByZXNzZWRGaXQuZW1pdCgpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcmVzaXplIGxhYmVsLWljb25cIj48L3NwYW4+Rml0XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvbiBmb3I9XCJyb3RhdGUtbGVmdC1jb250cm9sXCIgY2xhc3M9XCJjb250cm9sXCIgKGNsaWNrKT1cInByZXNzZWRSb3RhdGVMZWZ0LmVtaXQoKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXJlc2l6ZSBsYWJlbC1pY29uXCI+PC9zcGFuPlJvdGF0ZSBMZWZ0XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvbiBmb3I9XCJ6b29tLWluLWNvbnRyb2xcIiBjbGFzcz1cImNvbnRyb2xcIiAoY2xpY2spPVwicHJlc3NlZFpvb21Jbi5lbWl0KClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1yZXNpemUgbGFiZWwtaWNvblwiPjwvc3Bhbj5ab29tIGluXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2wtNiBweDFcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxidXR0b24gZm9yPVwiY3JvcC1jb250cm9sXCIgY2xhc3M9XCJjb250cm9sXCIgKGNsaWNrKT1cInByZXNzZWRDcm9wLmVtaXQoKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcmVzaXplIGxhYmVsLWljb25cIj48L3NwYW4+Q3JvcFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGJ1dHRvbiBmb3I9XCJyb3RhdGUtcmlnaHQtY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJwcmVzc2VkUm90YXRlUmlnaHQuZW1pdCgpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1yZXNpemUgbGFiZWwtaWNvblwiPjwvc3Bhbj5Sb3RhdGUgcmlnaHRcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxidXR0b24gZm9yPVwiem9vbS1vdXQtY29udHJvbFwiIGNsYXNzPVwiY29udHJvbFwiIChjbGljayk9XCJwcmVzc2VkWm9vbU91dC5lbWl0KClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXJlc2l6ZSBsYWJlbC1pY29uXCI+PC9zcGFuPlpvb20gb3V0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5oMXtmb250LXNpemU6MnJlbX0uaDJ7Zm9udC1zaXplOjEuNXJlbX0uaDN7Zm9udC1zaXplOjEuMjVyZW19Lmg0e2ZvbnQtc2l6ZToxcmVtfS5oNXtmb250LXNpemU6Ljg3NXJlbX0uaDZ7Zm9udC1zaXplOi43NXJlbX0uZm9udC1mYW1pbHktaW5oZXJpdHtmb250LWZhbWlseTppbmhlcml0fS5mb250LXNpemUtaW5oZXJpdHtmb250LXNpemU6aW5oZXJpdH0udGV4dC1kZWNvcmF0aW9uLW5vbmV7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmJvbGR7Zm9udC13ZWlnaHQ6NzAwfS5yZWd1bGFye2ZvbnQtd2VpZ2h0OjQwMH0uaXRhbGlje2ZvbnQtc3R5bGU6aXRhbGljfS5jYXBze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMmVtfS5sZWZ0LWFsaWdue3RleHQtYWxpZ246bGVmdH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5yaWdodC1hbGlnbnt0ZXh0LWFsaWduOnJpZ2h0fS5qdXN0aWZ5e3RleHQtYWxpZ246anVzdGlmeX0ubm93cmFwe3doaXRlLXNwYWNlOm5vd3JhcH0uYnJlYWstd29yZHt3b3JkLXdyYXA6YnJlYWstd29yZH0ubGluZS1oZWlnaHQtMXtsaW5lLWhlaWdodDoxfS5saW5lLWhlaWdodC0ye2xpbmUtaGVpZ2h0OjEuMTI1fS5saW5lLWhlaWdodC0ze2xpbmUtaGVpZ2h0OjEuMjV9LmxpbmUtaGVpZ2h0LTR7bGluZS1oZWlnaHQ6MS41fS5saXN0LXN0eWxlLW5vbmV7bGlzdC1zdHlsZTpub25lfS51bmRlcmxpbmV7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udHJ1bmNhdGV7bWF4LXdpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5saXN0LXJlc2V0e2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nLWxlZnQ6MH0uaW5saW5le2Rpc3BsYXk6aW5saW5lfS5ibG9jayw6aG9zdCAuY29udHJvbHtkaXNwbGF5OmJsb2NrfS5pbmxpbmUtYmxvY2t7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhYmxle2Rpc3BsYXk6dGFibGV9LnRhYmxlLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsfS5vdmVyZmxvdy1oaWRkZW57b3ZlcmZsb3c6aGlkZGVufS5vdmVyZmxvdy1zY3JvbGx7b3ZlcmZsb3c6c2Nyb2xsfS5vdmVyZmxvdy1hdXRve292ZXJmbG93OmF1dG99LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcIiBcIjtkaXNwbGF5OnRhYmxlfS5jbGVhcmZpeDphZnRlcntjbGVhcjpib3RofS5sZWZ0e2Zsb2F0OmxlZnR9LnJpZ2h0e2Zsb2F0OnJpZ2h0fS5maXR7bWF4LXdpZHRoOjEwMCV9Lm1heC13aWR0aC0xe21heC13aWR0aDoyNHJlbX0ubWF4LXdpZHRoLTJ7bWF4LXdpZHRoOjMycmVtfS5tYXgtd2lkdGgtM3ttYXgtd2lkdGg6NDhyZW19Lm1heC13aWR0aC00e21heC13aWR0aDo2NHJlbX0uYm9yZGVyLWJveHtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFsaWduLWJhc2VsaW5le3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5hbGlnbi10b3B7dmVydGljYWwtYWxpZ246dG9wfS5hbGlnbi1taWRkbGV7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hbGlnbi1ib3R0b217dmVydGljYWwtYWxpZ246Ym90dG9tfS5tMHttYXJnaW46MH0ubXQwe21hcmdpbi10b3A6MH0ubXIwe21hcmdpbi1yaWdodDowfS5tYjB7bWFyZ2luLWJvdHRvbTowfS5tbDB7bWFyZ2luLWxlZnQ6MH0ubXgwe21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjB9Lm15MHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowfS5tMXttYXJnaW46LjVyZW19Lm10MXttYXJnaW4tdG9wOi41cmVtfS5tcjF7bWFyZ2luLXJpZ2h0Oi41cmVtfS5tYjEsOmhvc3QgLmNvbnRyb2x7bWFyZ2luLWJvdHRvbTouNXJlbX0ubWwxe21hcmdpbi1sZWZ0Oi41cmVtfS5teDF7bWFyZ2luLWxlZnQ6LjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtfS5teTF7bWFyZ2luLXRvcDouNXJlbTttYXJnaW4tYm90dG9tOi41cmVtfS5tMnttYXJnaW46MXJlbX0ubXQye21hcmdpbi10b3A6MXJlbX0ubXIye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTEsOmhvc3QgLmNvbnRyb2x7cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDJ7cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgye3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgze3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZSw6aG9zdCAuY29udHJvbHtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGUsOmhvc3QgLmNvbnRyb2wgLmxhYmVsLWljb257cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMHt0b3A6MH0ucmlnaHQtMHtyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0IC5jb250cm9se2NvbG9yOiNmZmY7d2lkdGg6MTAwJTtib3JkZXItcmFkaXVzOjEycHggMTJweCAwO2JhY2tncm91bmQtY29sb3I6IzQ0NGQ2M306aG9zdCAuY29udHJvbDpmb2N1c3tvdXRsaW5lOjB9Omhvc3QgLmNvbnRyb2wgLmxhYmVsLWljb257dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2xlZnQ6MWVtfWBdLFxufSlcblxuZXhwb3J0IGNsYXNzIFNlbUNvbnRyb2xzQ29tcG9uZW50IHtcbiAgQE91dHB1dCgpIHB1YmxpYyBwcmVzc2VkRml0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJlc3NlZENyb3AgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBwcmVzc2VkUm90YXRlTGVmdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHVibGljIHByZXNzZWRSb3RhdGVSaWdodCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHVibGljIHByZXNzZWRab29tSW4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBwcmVzc2VkWm9vbU91dCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xufVxuXG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5leHBvcnQgdHlwZSBQYW5lVHlwZSA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLXNsaWRlLXBhbmVsJyxcbiAgc3R5bGVzOiBbYDpob3N0e2Rpc3BsYXk6YmxvY2s7b3ZlcmZsb3c6aGlkZGVufS5wYW5lc3toZWlnaHQ6MTAwJTt3aWR0aDoyMDAlO3RyYW5zaXRpb24tZHVyYXRpb246LjVzO2Rpc3BsYXk6ZmxleH0ucGFuZXMgZGl2e2ZsZXg6MX1gXSxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFuZXNcIiBbQHNsaWRlXT1cImFjdGl2ZVBhbmVcIj5cbiAgPGRpdj48bmctY29udGVudCBzZWxlY3Q9XCJbbGVmdFBhbmVdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICA8ZGl2PjxuZy1jb250ZW50IHNlbGVjdD1cIltyaWdodFBhbmVdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuPC9kaXY+YCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdzbGlkZScsIFtcbiAgICAgIHN0YXRlKCdsZWZ0Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJyB9KSksXG4gICAgICBzdGF0ZSgncmlnaHQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2xlZnQgPD0+IHJpZ2h0JywgYW5pbWF0ZSgnMXMnKSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlUGFuZWxDb21wb25lbnQge1xuICBASW5wdXQoKSBhY3RpdmVQYW5lOiBQYW5lVHlwZSA9ICdsZWZ0Jztcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1zZXR0aW5ncycsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWhlYWRlclwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tYmFja1wiIChjbGljayk9XCJpc0xlZnRWaXNpYmxlPXRydWVcIj48L3NwYW4+XG4gIDwvZGl2PlxuICA8c2VtLXNsaWRlLXBhbmVsIFthY3RpdmVQYW5lXT1cImlzTGVmdFZpc2libGU/ICdsZWZ0JzogJ3JpZ2h0J1wiPlxuICAgIDxkaXYgbGVmdFBhbmU+XG4gICAgICA8ZGl2IHNlbXVpLXNlY3Rpb24tYm9keSBjbGFzcz1cInAyXCI+XG4gICAgICAgIDx1bCBzZW11aS1saXN0IGNsYXNzPVwidXNlci1uYXZcIj5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIHNlbXVpLWxpc3QtaXRlbVxuICAgICAgICAgICAgbGlzdC1pdGVtXG4gICAgICAgICAgICBzZW11aS1pbXBvcnRhbmNlPVwiZGFya1wiXG4gICAgICAgICAgICBjbGFzcz1cInB5MVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25JbWFnZXMoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJzZW0taWNvbi1zdHlsZSBkZWZhdWx0XCIgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuPiBJbWFnZXM8L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIHNlbXVpLWxpc3QtaXRlbVxuICAgICAgICAgICAgbGlzdC1pdGVtXG4gICAgICAgICAgICBzZW11aS1pbXBvcnRhbmNlPVwiZGFya1wiXG4gICAgICAgICAgICBjbGFzcz1cInB5MVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25TZXR0aW5ncygpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aSBjbGFzcz1cInNlbS1pY29uLXNldHRpbmdzIGRlZmF1bHRcIiAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPHNwYW4+IFNldHRpbmdzPC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBzZW11aS1saXN0LWl0ZW1cbiAgICAgICAgICAgIGxpc3QtaXRlbVxuICAgICAgICAgICAgc2VtdWktaW1wb3J0YW5jZT1cImRhcmtcIlxuICAgICAgICAgICAgY2xhc3M9XCJweTFcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uRHVwbGljYXRlKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwic2VtLWljb24tc2l0ZXMgZGVmYXVsdFwiICBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8c3Bhbj4gRHVwbGljYXRlPC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBzZW11aS1saXN0LWl0ZW1cbiAgICAgICAgICAgIGxpc3QtaXRlbVxuICAgICAgICAgICAgc2VtdWktaW1wb3J0YW5jZT1cImRhcmtcIlxuICAgICAgICAgICAgY2xhc3M9XCJweTFcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uRGVsZXRlKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwic2VtLWljb24tZGVsZXRlIGRlZmF1bHRcIiAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPHNwYW4+IERlbGV0ZTwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiByaWdodFBhbmU+XG4gICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInZpZXdNb2RlRm9ybVwiIGNsYXNzPVwicDJcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiXG4gICAgICAgIHZhbHVlPVwiZ3JpZFwiXG4gICAgICAgIGlkPVwiZ3JpZFwiXG4gICAgICAgIGZvcm1Db250cm9sTmFtZT1cInZpZXdNb2RlXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJncmlkXCI+PHNwYW4gY2xhc3M9XCJzZW0taWNvbi1zdHlsZSBkZWZhdWx0XCI+PC9zcGFuPjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgIHZhbHVlPVwiY2Fyb3VzZWxcIlxuICAgICAgICAgIGlkPVwiY2Fyb3VzZWxcIlxuICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInZpZXdNb2RlXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJjYXJvdXNlbFwiPjxzcGFuIGNsYXNzPVwic2VtLWljb24tc2V0dGluZ3MgZGVmYXVsdFwiPjwvc3Bhbj48L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICB2YWx1ZT1cImxpc3RcIlxuICAgICAgICAgIGlkPVwibGlzdFwiXG4gICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidmlld01vZGVcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImxpc3RcIj48c3BhbiBjbGFzcz1cInNlbS1pY29uLXNldHRpbmdzIGRlZmF1bHRcIj48L3NwYW4+PC9sYWJlbD5cbiAgICAgIDwvZm9ybT5cbiAgICAgIHt7dmlld01vZGVGb3JtLnZhbHVlIHwganNvbn19XG4gICAgPC9kaXY+XG4gIDwvc2VtLXNsaWRlLXBhbmVsPlxuXG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5oMXtmb250LXNpemU6MnJlbX0uaDJ7Zm9udC1zaXplOjEuNXJlbX0uaDN7Zm9udC1zaXplOjEuMjVyZW19Lmg0e2ZvbnQtc2l6ZToxcmVtfS5oNXtmb250LXNpemU6Ljg3NXJlbX0uaDZ7Zm9udC1zaXplOi43NXJlbX0uZm9udC1mYW1pbHktaW5oZXJpdHtmb250LWZhbWlseTppbmhlcml0fS5mb250LXNpemUtaW5oZXJpdHtmb250LXNpemU6aW5oZXJpdH0udGV4dC1kZWNvcmF0aW9uLW5vbmV7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmJvbGR7Zm9udC13ZWlnaHQ6NzAwfS5yZWd1bGFye2ZvbnQtd2VpZ2h0OjQwMH0uaXRhbGlje2ZvbnQtc3R5bGU6aXRhbGljfS5jYXBze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMmVtfS5sZWZ0LWFsaWdue3RleHQtYWxpZ246bGVmdH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5yaWdodC1hbGlnbnt0ZXh0LWFsaWduOnJpZ2h0fS5qdXN0aWZ5e3RleHQtYWxpZ246anVzdGlmeX0ubm93cmFwe3doaXRlLXNwYWNlOm5vd3JhcH0uYnJlYWstd29yZHt3b3JkLXdyYXA6YnJlYWstd29yZH0ubGluZS1oZWlnaHQtMXtsaW5lLWhlaWdodDoxfS5saW5lLWhlaWdodC0ye2xpbmUtaGVpZ2h0OjEuMTI1fS5saW5lLWhlaWdodC0ze2xpbmUtaGVpZ2h0OjEuMjV9LmxpbmUtaGVpZ2h0LTR7bGluZS1oZWlnaHQ6MS41fS5saXN0LXN0eWxlLW5vbmV7bGlzdC1zdHlsZTpub25lfS51bmRlcmxpbmV7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udHJ1bmNhdGV7bWF4LXdpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5saXN0LXJlc2V0e2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nLWxlZnQ6MH0uaW5saW5le2Rpc3BsYXk6aW5saW5lfS5ibG9ja3tkaXNwbGF5OmJsb2NrfS5pbmxpbmUtYmxvY2t7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhYmxle2Rpc3BsYXk6dGFibGV9LnRhYmxlLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsfS5vdmVyZmxvdy1oaWRkZW57b3ZlcmZsb3c6aGlkZGVufS5vdmVyZmxvdy1zY3JvbGx7b3ZlcmZsb3c6c2Nyb2xsfS5vdmVyZmxvdy1hdXRve292ZXJmbG93OmF1dG99LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcIiBcIjtkaXNwbGF5OnRhYmxlfS5jbGVhcmZpeDphZnRlcntjbGVhcjpib3RofS5sZWZ0e2Zsb2F0OmxlZnR9LnJpZ2h0e2Zsb2F0OnJpZ2h0fS5maXR7bWF4LXdpZHRoOjEwMCV9Lm1heC13aWR0aC0xe21heC13aWR0aDoyNHJlbX0ubWF4LXdpZHRoLTJ7bWF4LXdpZHRoOjMycmVtfS5tYXgtd2lkdGgtM3ttYXgtd2lkdGg6NDhyZW19Lm1heC13aWR0aC00e21heC13aWR0aDo2NHJlbX0uYm9yZGVyLWJveHtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFsaWduLWJhc2VsaW5le3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5hbGlnbi10b3B7dmVydGljYWwtYWxpZ246dG9wfS5hbGlnbi1taWRkbGV7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hbGlnbi1ib3R0b217dmVydGljYWwtYWxpZ246Ym90dG9tfS5tMHttYXJnaW46MH0ubXQwe21hcmdpbi10b3A6MH0ubXIwe21hcmdpbi1yaWdodDowfS5tYjB7bWFyZ2luLWJvdHRvbTowfS5tbDB7bWFyZ2luLWxlZnQ6MH0ubXgwe21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjB9Lm15MHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowfS5tMXttYXJnaW46LjVyZW19Lm10MXttYXJnaW4tdG9wOi41cmVtfS5tcjF7bWFyZ2luLXJpZ2h0Oi41cmVtfS5tYjF7bWFyZ2luLWJvdHRvbTouNXJlbX0ubWwxe21hcmdpbi1sZWZ0Oi41cmVtfS5teDF7bWFyZ2luLWxlZnQ6LjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtfS5teTF7bWFyZ2luLXRvcDouNXJlbTttYXJnaW4tYm90dG9tOi41cmVtfS5tMnttYXJnaW46MXJlbX0ubXQye21hcmdpbi10b3A6MXJlbX0ubXIye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTF7cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDJ7cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgye3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgze3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4LDpob3N0IGZvcm17ZGlzcGxheTpmbGV4fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pey5zbS1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnNtLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5zbS1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LnNtLWNvbC0ze3dpZHRoOjI1JX0uc20tY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5zbS1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LnNtLWNvbC02e3dpZHRoOjUwJX0uc20tY29sLTd7d2lkdGg6NTguMzMzMzMlfS5zbS1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LnNtLWNvbC05e3dpZHRoOjc1JX0uc20tY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0uc20tY29sLTExe3dpZHRoOjkxLjY2NjY3JX0uc20tY29sLTEye3dpZHRoOjEwMCV9LnNtLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo1MmVtKXsubWQtY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5tZC1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubWQtY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5tZC1jb2wtM3t3aWR0aDoyNSV9Lm1kLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubWQtY29sLTV7d2lkdGg6NDEuNjY2NjclfS5tZC1jb2wtNnt3aWR0aDo1MCV9Lm1kLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubWQtY29sLTh7d2lkdGg6NjYuNjY2NjclfS5tZC1jb2wtOXt3aWR0aDo3NSV9Lm1kLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9Lm1kLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9Lm1kLWNvbC0xMnt3aWR0aDoxMDAlfS5tZC1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NjRlbSl7LmxnLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubGctY29sLTF7d2lkdGg6OC4zMzMzMyV9LmxnLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubGctY29sLTN7d2lkdGg6MjUlfS5sZy1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmxnLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubGctY29sLTZ7d2lkdGg6NTAlfS5sZy1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmxnLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubGctY29sLTl7d2lkdGg6NzUlfS5sZy1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5sZy1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5sZy1jb2wtMTJ7d2lkdGg6MTAwJX0ubGctZmxleHtkaXNwbGF5OmZsZXh9LmxnLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmZsZXgtY29sdW1ue2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uZmxleC13cmFwe2ZsZXgtd3JhcDp3cmFwfS5pdGVtcy1zdGFydHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5pdGVtcy1lbmR7YWxpZ24taXRlbXM6ZmxleC1lbmR9Lml0ZW1zLWNlbnRlcnthbGlnbi1pdGVtczpjZW50ZXJ9Lml0ZW1zLWJhc2VsaW5le2FsaWduLWl0ZW1zOmJhc2VsaW5lfS5pdGVtcy1zdHJldGNoe2FsaWduLWl0ZW1zOnN0cmV0Y2h9LnNlbGYtc3RhcnR7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0fS5zZWxmLWVuZHthbGlnbi1zZWxmOmZsZXgtZW5kfS5zZWxmLWNlbnRlcnthbGlnbi1zZWxmOmNlbnRlcn0uc2VsZi1iYXNlbGluZXthbGlnbi1zZWxmOmJhc2VsaW5lfS5zZWxmLXN0cmV0Y2h7YWxpZ24tc2VsZjpzdHJldGNofS5qdXN0aWZ5LXN0YXJ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5qdXN0aWZ5LWVuZHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lmp1c3RpZnktY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lmp1c3RpZnktYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uanVzdGlmeS1hcm91bmQsOmhvc3QgZm9ybXtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0YXJ0e2FsaWduLWNvbnRlbnQ6ZmxleC1zdGFydH0uY29udGVudC1lbmR7YWxpZ24tY29udGVudDpmbGV4LWVuZH0uY29udGVudC1jZW50ZXJ7YWxpZ24tY29udGVudDpjZW50ZXJ9LmNvbnRlbnQtYmV0d2VlbnthbGlnbi1jb250ZW50OnNwYWNlLWJldHdlZW59LmNvbnRlbnQtYXJvdW5ke2FsaWduLWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0cmV0Y2h7YWxpZ24tY29udGVudDpzdHJldGNofS5mbGV4LWF1dG97ZmxleDoxIDEgYXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjB9LmZsZXgtbm9uZXtmbGV4Om5vbmV9Lm9yZGVyLTB7b3JkZXI6MH0ub3JkZXItMXtvcmRlcjoxfS5vcmRlci0ye29yZGVyOjJ9Lm9yZGVyLTN7b3JkZXI6M30ub3JkZXItbGFzdHtvcmRlcjo5OTk5OX0ucmVsYXRpdmV7cG9zaXRpb246cmVsYXRpdmV9LmFic29sdXRle3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTB7dG9wOjB9LnJpZ2h0LTB7cmlnaHQ6MH0uYm90dG9tLTB7Ym90dG9tOjB9LmxlZnQtMHtsZWZ0OjB9Lnoxe3otaW5kZXg6MX0uejJ7ei1pbmRleDoyfS56M3t6LWluZGV4OjN9Lno0e3otaW5kZXg6NH0uYm9yZGVye2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MXB4fS5ib3JkZXItdG9we2JvcmRlci10b3Atc3R5bGU6c29saWQ7Ym9yZGVyLXRvcC13aWR0aDoxcHh9LmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweH0uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5ib3JkZXItbGVmdHtib3JkZXItbGVmdC1zdHlsZTpzb2xpZDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmJvcmRlci1ub25le2JvcmRlcjowfS5yb3VuZGVke2JvcmRlci1yYWRpdXM6M3B4fS5jaXJjbGV7Ym9yZGVyLXJhZGl1czo1MCV9LnJvdW5kZWQtdG9we2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LnJvdW5kZWQtcmlnaHR7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0ucm91bmRlZC1ib3R0b217Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0ucm91bmRlZC1sZWZ0e2JvcmRlci1yYWRpdXM6M3B4IDAgMCAzcHh9Lm5vdC1yb3VuZGVke2JvcmRlci1yYWRpdXM6MH0uaGlkZXtwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7aGVpZ2h0OjFweDt3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpfUBtZWRpYSAobWF4LXdpZHRoOjQwZW0pey54cy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pIGFuZCAobWF4LXdpZHRoOjUyZW0pey5zbS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pIGFuZCAobWF4LXdpZHRoOjY0ZW0pey5tZC1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdCBmb3JtIGlucHV0W3R5cGU9cmFkaW9de2Rpc3BsYXk6bm9uZX06aG9zdCBmb3JtIGlucHV0W3R5cGU9cmFkaW9dOmNoZWNrZWQrbGFiZWx7YmFja2dyb3VuZDojY2NjfTpob3N0IGZvcm0gbGFiZWwgc3Bhbntmb250LXNpemU6MzBweH1gXVxufSlcblxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhU2V0dGluZ3NDb21wb25lbnQge1xuICBAT3V0cHV0KCkgcHJlc3NlZEltYWdlcyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHJlc3NlZERlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHJlc3NlZER1cGxpY2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHJlc3NlZFNldHRpbmdzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyBpc0xlZnRWaXNpYmxlOiBCb29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIHZpZXdNb2RlRm9ybTogRm9ybUdyb3VwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfbWVkaWFTZXJ2aWNlOiBTZW1NZWRpYVNlcnZpY2UsIHByaXZhdGUgX2ZiOiBGb3JtQnVpbGRlcikge1xuICAgIHRoaXMudmlld01vZGVGb3JtID0gdGhpcy5fZmIuZ3JvdXAoe1xuICAgICAgdmlld01vZGU6ICcnXG4gICAgfSk7XG4gIH1cbiAgb25EZWxldGUoKSB7XG4gICAgdGhpcy5wcmVzc2VkRGVsZXRlLmVtaXQoKTtcbiAgfVxuICBvbkltYWdlcygpIHtcbiAgICB0aGlzLnByZXNzZWRJbWFnZXMuZW1pdCgpO1xuICB9XG4gIG9uRHVwbGljYXRlKCkge1xuICAgIHRoaXMucHJlc3NlZER1cGxpY2F0ZS5lbWl0KCk7XG4gIH1cbiAgb25TZXR0aW5ncygpIHtcbiAgICB0aGlzLmlzTGVmdFZpc2libGUgPSBmYWxzZTtcbiAgICAvLyB0aGlzLnByZXNzZWRTZXR0aW5ncy5lbWl0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLW1lZGlhLWVkaXQnLFxuICB0ZW1wbGF0ZTogYDxmb3JtIFtmb3JtR3JvdXBdPVwibXlGb3JtXCIgY2xhc3M9XCJwMlwiPlxuICA8bGFiZWw+QWxsIFRleHQ8L2xhYmVsPlxuICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgIGNsYXNzPVwic2VtLWlucHV0XCJcbiAgICBpZD1cImFsbC10ZXh0XCJcbiAgICBmb3JtQ29udHJvbE5hbWU9XCJhbGxUZXh0XCI+XG4gIDxsYWJlbD5NZXRhIFRpdGxlPC9sYWJlbD5cbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICBjbGFzcz1cInNlbS1pbnB1dFwiXG4gICAgaWQ9XCJtZXRhLXRpdGxlXCJcbiAgICBmb3JtQ29udHJvbE5hbWU9XCJtZXRhVGl0bGVcIj5cbjwvZm9ybT5cbjxzZW0tY29udHJvbHNcbiAgKHByZXNzZWRGaXQpPVwib25QcmVzcygnRklUJylcIlxuICAocHJlc3NlZENyb3ApPVwib25QcmVzcygnQ1JPUCcpXCJcbiAgKHByZXNzZWRSb3RhdGVMZWZ0KT1cIm9uUHJlc3MoJ1JPVEFURV9MRUZUJylcIlxuICAocHJlc3NlZFJvdGF0ZVJpZ2h0KT1cIm9uUHJlc3MoJ1JPVEFURV9SSUdIVCcpXCJcbiAgKHByZXNzZWRab29tSW4pPVwib25QcmVzcygnWk9PTV9JTicpXCJcbiAgKHByZXNzZWRab29tT3V0KT1cIm9uUHJlc3MoJ1pPT01fT1VUJylcIj5cbjwvc2VtLWNvbnRyb2xzPlxuPGRpdiBjbGFzcz1cInB4MiBmbGV4IGp1c3RpZnktZW5kXCI+XG4gIDxidXR0b24gZm9yPVwiY3JvcC1jb250cm9sXCIgY2xhc3M9XCJjb250cm9sXCIgKGNsaWNrKT1cIm9uUHJlc3MoJ0FQUExZJylcIiA+XG4gICAgQXBwbHlcbiAgPC9idXR0b24+XG48L2Rpdj5cbjwhLS0gPGRpdj48cHJlPjxjb2RlPnt7IG15Rm9ybT8udmFsdWUgfCBqc29uIH19PC9jb2RlPjwvcHJlPjwvZGl2PiAtLT5cbmAsXG4gIHN0eWxlczogW2AuaDF7Zm9udC1zaXplOjJyZW19Lmgye2ZvbnQtc2l6ZToxLjVyZW19Lmgze2ZvbnQtc2l6ZToxLjI1cmVtfS5oNHtmb250LXNpemU6MXJlbX0uaDV7Zm9udC1zaXplOi44NzVyZW19Lmg2e2ZvbnQtc2l6ZTouNzVyZW19LmZvbnQtZmFtaWx5LWluaGVyaXR7Zm9udC1mYW1pbHk6aW5oZXJpdH0uZm9udC1zaXplLWluaGVyaXR7Zm9udC1zaXplOmluaGVyaXR9LnRleHQtZGVjb3JhdGlvbi1ub25le3RleHQtZGVjb3JhdGlvbjpub25lfS5ib2xke2ZvbnQtd2VpZ2h0OjcwMH0ucmVndWxhcntmb250LXdlaWdodDo0MDB9Lml0YWxpY3tmb250LXN0eWxlOml0YWxpY30uY2Fwc3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6LjJlbX0ubGVmdC1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucmlnaHQtYWxpZ257dGV4dC1hbGlnbjpyaWdodH0uanVzdGlmeXt0ZXh0LWFsaWduOmp1c3RpZnl9Lm5vd3JhcHt3aGl0ZS1zcGFjZTpub3dyYXB9LmJyZWFrLXdvcmR7d29yZC13cmFwOmJyZWFrLXdvcmR9LmxpbmUtaGVpZ2h0LTF7bGluZS1oZWlnaHQ6MX0ubGluZS1oZWlnaHQtMntsaW5lLWhlaWdodDoxLjEyNX0ubGluZS1oZWlnaHQtM3tsaW5lLWhlaWdodDoxLjI1fS5saW5lLWhlaWdodC00e2xpbmUtaGVpZ2h0OjEuNX0ubGlzdC1zdHlsZS1ub25le2xpc3Qtc3R5bGU6bm9uZX0udW5kZXJsaW5le3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnRydW5jYXRle21heC13aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0ubGlzdC1yZXNldHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZy1sZWZ0OjB9LmlubGluZXtkaXNwbGF5OmlubGluZX0uYmxvY2ssOmhvc3QgLmNvbnRyb2x7ZGlzcGxheTpibG9ja30uaW5saW5lLWJsb2Nre2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YWJsZXtkaXNwbGF5OnRhYmxlfS50YWJsZS1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbH0ub3ZlcmZsb3ctaGlkZGVue292ZXJmbG93OmhpZGRlbn0ub3ZlcmZsb3ctc2Nyb2xse292ZXJmbG93OnNjcm9sbH0ub3ZlcmZsb3ctYXV0b3tvdmVyZmxvdzphdXRvfS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uY2xlYXJmaXg6YWZ0ZXJ7Y2xlYXI6Ym90aH0ubGVmdHtmbG9hdDpsZWZ0fS5yaWdodHtmbG9hdDpyaWdodH0uZml0e21heC13aWR0aDoxMDAlfS5tYXgtd2lkdGgtMXttYXgtd2lkdGg6MjRyZW19Lm1heC13aWR0aC0ye21heC13aWR0aDozMnJlbX0ubWF4LXdpZHRoLTN7bWF4LXdpZHRoOjQ4cmVtfS5tYXgtd2lkdGgtNHttYXgtd2lkdGg6NjRyZW19LmJvcmRlci1ib3h7Ym94LXNpemluZzpib3JkZXItYm94fS5hbGlnbi1iYXNlbGluZXt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0uYWxpZ24tdG9we3ZlcnRpY2FsLWFsaWduOnRvcH0uYWxpZ24tbWlkZGxle3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWxpZ24tYm90dG9te3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubTB7bWFyZ2luOjB9Lm10MHttYXJnaW4tdG9wOjB9Lm1yMHttYXJnaW4tcmlnaHQ6MH0ubWIwe21hcmdpbi1ib3R0b206MH0ubWwwe21hcmdpbi1sZWZ0OjB9Lm14MHttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5teTB7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0ubTF7bWFyZ2luOi41cmVtfS5tdDF7bWFyZ2luLXRvcDouNXJlbX0ubXIxe21hcmdpbi1yaWdodDouNXJlbX0ubWIxLDpob3N0IC5jb250cm9se21hcmdpbi1ib3R0b206LjVyZW19Lm1sMXttYXJnaW4tbGVmdDouNXJlbX0ubXgxe21hcmdpbi1sZWZ0Oi41cmVtO21hcmdpbi1yaWdodDouNXJlbX0ubXkxe21hcmdpbi10b3A6LjVyZW07bWFyZ2luLWJvdHRvbTouNXJlbX0ubTJ7bWFyZ2luOjFyZW19Lm10MnttYXJnaW4tdG9wOjFyZW19Lm1yMnttYXJnaW4tcmlnaHQ6MXJlbX0ubWIye21hcmdpbi1ib3R0b206MXJlbX0ubWwye21hcmdpbi1sZWZ0OjFyZW19Lm14MnttYXJnaW4tbGVmdDoxcmVtO21hcmdpbi1yaWdodDoxcmVtfS5teTJ7bWFyZ2luLXRvcDoxcmVtO21hcmdpbi1ib3R0b206MXJlbX0ubTN7bWFyZ2luOjJyZW19Lm10M3ttYXJnaW4tdG9wOjJyZW19Lm1yM3ttYXJnaW4tcmlnaHQ6MnJlbX0ubWIze21hcmdpbi1ib3R0b206MnJlbX0ubWwze21hcmdpbi1sZWZ0OjJyZW19Lm14M3ttYXJnaW4tbGVmdDoycmVtO21hcmdpbi1yaWdodDoycmVtfS5teTN7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1ib3R0b206MnJlbX0ubTR7bWFyZ2luOjRyZW19Lm10NHttYXJnaW4tdG9wOjRyZW19Lm1yNHttYXJnaW4tcmlnaHQ6NHJlbX0ubWI0e21hcmdpbi1ib3R0b206NHJlbX0ubWw0e21hcmdpbi1sZWZ0OjRyZW19Lm14NHttYXJnaW4tbGVmdDo0cmVtO21hcmdpbi1yaWdodDo0cmVtfS5teTR7bWFyZ2luLXRvcDo0cmVtO21hcmdpbi1ib3R0b206NHJlbX0ubXhuMXttYXJnaW4tbGVmdDotLjVyZW07bWFyZ2luLXJpZ2h0Oi0uNXJlbX0ubXhuMnttYXJnaW4tbGVmdDotMXJlbTttYXJnaW4tcmlnaHQ6LTFyZW19Lm14bjN7bWFyZ2luLWxlZnQ6LTJyZW07bWFyZ2luLXJpZ2h0Oi0ycmVtfS5teG40e21hcmdpbi1sZWZ0Oi00cmVtO21hcmdpbi1yaWdodDotNHJlbX0ubWwtYXV0b3ttYXJnaW4tbGVmdDphdXRvfS5tci1hdXRve21hcmdpbi1yaWdodDphdXRvfS5teC1hdXRve21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99LnAwe3BhZGRpbmc6MH0ucHQwe3BhZGRpbmctdG9wOjB9LnByMHtwYWRkaW5nLXJpZ2h0OjB9LnBiMHtwYWRkaW5nLWJvdHRvbTowfS5wbDB7cGFkZGluZy1sZWZ0OjB9LnB4MHtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LnB5MHtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnAxe3BhZGRpbmc6LjVyZW19LnB0MXtwYWRkaW5nLXRvcDouNXJlbX0ucHIxe3BhZGRpbmctcmlnaHQ6LjVyZW19LnBiMXtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucGwxe3BhZGRpbmctbGVmdDouNXJlbX0ucHkxLDpob3N0IC5jb250cm9se3BhZGRpbmctdG9wOi41cmVtO3BhZGRpbmctYm90dG9tOi41cmVtfS5weDF7cGFkZGluZy1sZWZ0Oi41cmVtO3BhZGRpbmctcmlnaHQ6LjVyZW19LnAye3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4MntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4Myw6aG9zdCAuY29udHJvbHtwYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleHtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0YXJ0e2FsaWduLWNvbnRlbnQ6ZmxleC1zdGFydH0uY29udGVudC1lbmR7YWxpZ24tY29udGVudDpmbGV4LWVuZH0uY29udGVudC1jZW50ZXJ7YWxpZ24tY29udGVudDpjZW50ZXJ9LmNvbnRlbnQtYmV0d2VlbnthbGlnbi1jb250ZW50OnNwYWNlLWJldHdlZW59LmNvbnRlbnQtYXJvdW5ke2FsaWduLWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0cmV0Y2h7YWxpZ24tY29udGVudDpzdHJldGNofS5mbGV4LWF1dG97ZmxleDoxIDEgYXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjB9LmZsZXgtbm9uZXtmbGV4Om5vbmV9Lm9yZGVyLTB7b3JkZXI6MH0ub3JkZXItMXtvcmRlcjoxfS5vcmRlci0ye29yZGVyOjJ9Lm9yZGVyLTN7b3JkZXI6M30ub3JkZXItbGFzdHtvcmRlcjo5OTk5OX0ucmVsYXRpdmUsOmhvc3QgLmNvbnRyb2x7cG9zaXRpb246cmVsYXRpdmV9LmFic29sdXRle3Bvc2l0aW9uOmFic29sdXRlfS5maXhlZHtwb3NpdGlvbjpmaXhlZH0udG9wLTB7dG9wOjB9LnJpZ2h0LTB7cmlnaHQ6MH0uYm90dG9tLTB7Ym90dG9tOjB9LmxlZnQtMHtsZWZ0OjB9Lnoxe3otaW5kZXg6MX0uejJ7ei1pbmRleDoyfS56M3t6LWluZGV4OjN9Lno0e3otaW5kZXg6NH0uYm9yZGVye2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MXB4fS5ib3JkZXItdG9we2JvcmRlci10b3Atc3R5bGU6c29saWQ7Ym9yZGVyLXRvcC13aWR0aDoxcHh9LmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweH0uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5ib3JkZXItbGVmdHtib3JkZXItbGVmdC1zdHlsZTpzb2xpZDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmJvcmRlci1ub25le2JvcmRlcjowfS5yb3VuZGVke2JvcmRlci1yYWRpdXM6M3B4fS5jaXJjbGV7Ym9yZGVyLXJhZGl1czo1MCV9LnJvdW5kZWQtdG9we2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LnJvdW5kZWQtcmlnaHR7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0ucm91bmRlZC1ib3R0b217Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0ucm91bmRlZC1sZWZ0e2JvcmRlci1yYWRpdXM6M3B4IDAgMCAzcHh9Lm5vdC1yb3VuZGVke2JvcmRlci1yYWRpdXM6MH0uaGlkZXtwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7aGVpZ2h0OjFweDt3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpfUBtZWRpYSAobWF4LXdpZHRoOjQwZW0pey54cy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pIGFuZCAobWF4LXdpZHRoOjUyZW0pey5zbS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pIGFuZCAobWF4LXdpZHRoOjY0ZW0pey5tZC1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdCAuY29udHJvbHtjb2xvcjojZmZmO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6MTJweCAxMnB4IDA7YmFja2dyb3VuZC1jb2xvcjojMDVkY2I2fTpob3N0IC5jb250cm9sOmZvY3Vze291dGxpbmU6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYUVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZEVkaXRNb2RlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBmb3JtQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBASW5wdXQoKSBmb3JtRGF0YTogYW55O1xuICBwdWJsaWMgbXlGb3JtOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZiOiBGb3JtQnVpbGRlcikge1xuICAgIHRoaXMubXlGb3JtID0gdGhpcy5fZmIuZ3JvdXAoe1xuICAgICAgYWxsVGV4dCA6ICcnLFxuICAgICAgbWV0YVRpdGxlOiAnJyxcbiAgICB9KTtcbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICB0aGlzLm15Rm9ybS5wYXRjaFZhbHVlKHtcbiAgICAgIGFsbFRleHQ6IHRoaXMuZm9ybURhdGEuYWxsVGV4dCxcbiAgICAgIG1ldGFUaXRsZTogdGhpcy5mb3JtRGF0YS5tZXRhVGl0bGVcbiAgICB9KTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm15Rm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLmZvcm1DaGFuZ2VkLmVtaXQoZGF0YSk7XG4gICAgfSk7XG4gIH1cbiAgb25QcmVzcyhtb2RlKSB7XG4gICAgdGhpcy5zZWxlY3RlZEVkaXRNb2RlLmVtaXQobW9kZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yLFxuICBzZWxlY3RvcjogJ1tzZW0tbWVkaWEtY29udGFpbmVyXScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyIHNlbS1tZWRpYS1jb250YWluZXJcIj5cblxuXG5cbiAgPGRpdiAqbmdJZj1cInVzZXJJbWFnZXNcIiBjbGFzcz1cInByZXZpZXctY29udGFpbmVyXCI+XG4gICAgPGRpdiBzZW0tY3JvcHBlclxuICAgICAgKm5nRm9yPVwibGV0IGltYWdlIG9mIHVzZXJJbWFnZXM7bGV0IGtleSA9IGluZGV4XCJcbiAgICAgIFtpbWFnZURhdGFdPVwiaW1hZ2UudXBsb2FkZWRJbWFnZVwiXG4gICAgICBbY3JvcHBlZEltYWdlXT1cImltYWdlLmNyb3BwZWRJbWFnZVwiXG4gICAgICBbZWRpdE1vZGVdPVwiaW1hZ2UuZWRpdE1vZGVcIlxuICAgICAgW2NvbmZpZ109XCJjb25maWdcIlxuICAgICAgW2tleV09XCJrZXlcIlxuICAgICAgKGVuYWJsZWRDcm9wcGVyKT1cIm9uRW5hYmxlRWRpdEltYWdlKGtleSlcIlxuICAgICAgKGNyb3BwZWRJbWFnZUV2ZW50KT1cIm9uQ3JvcHBlZEltYWdlKGtleSwgJGV2ZW50KVwiXG4gICAgPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyLS1uYXZcIj5cbiAgICA8YnV0dG9uXG4gICAgICBzZW0tYnRuLWZhYlxuICAgICAgc21hbGxcbiAgICAgIGNvcm5lcj1cInRvcC1sZWZ0XCJcbiAgICAgIHNlbXVpLXRoZW1lPVwibGlnaHRcIlxuICAgICAgY2xhc3M9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIFwiXG4gICAgICBzZW0taW1wb3J0YW5jZT1cImludmVydGVkXCJcbiAgICAgICNjaGF0T3ZlcmxheT1cImNka092ZXJsYXlPcmlnaW5cIlxuICAgICAgY2RrT3ZlcmxheU9yaWdpblxuICAgICAgKGNsaWNrKT1cIm9wZW5TZXR0aW5ncyghaXNUZXN0QU9wZW5lZClcIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tZHJvcF9pY29uXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0KCl7YmFja2dyb3VuZC1jb2xvcjojZjVlNWU1O2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjOGIwMDAwO2hlaWdodDoxMDAlfS5pbWctY3JvcHBlcntoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyB3aWRnZXQgPSB7XG4gICAgY29tcG9uZW50TmFtZTogJycsXG4gICAgZGF0YTogIGBcbiAgICBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnkncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciBvb2sgYSBnYWxsZXkgb2YgdHlwZVxuICAgIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2UgbnR1cmllcywgYnV0IGFsc28gdGhlIGxlYXAgaW50byBlbGVjdHJvbmljXG4gICAgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1IGxhcmlzZWQgaW4gdGhlIDE5NjBzIHdpdGggdGhlIHJlbGVhc2Ugb2YgTGV0cmFzZXQgc2hlZXRzXG4gICAgY29udGFpbmluZ2BcbiAgfTtcblxuICB1c2VySW1hZ2VzPzogQXJyYXk8YW55PiA9IFtdO1xuICBlZGl0VmlzaWJsZTogQm9vbGVhbiA9IGZhbHNlO1xuICBrZXk6IE51bWJlcjtcbiAgdXBsb2FkUGFuZWxGbGFnOiBCb29sZWFuID0gdHJ1ZTtcbiAgaW1hZ2VOYW1lTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjb25maWc6IGFueTtcbiAgdGVtcEltYWdlczogQXJyYXk8YW55PjtcbiAgaXNUZXN0QU9wZW5lZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBPdXRwdXQoKSBkYXRhQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZWRpYVNlcnZpY2U6IFNlbU1lZGlhU2VydmljZSwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAvLyB0aGlzLndpZGdldCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCd3aWRnZXQnKTtcbiAgICAvLyBpZih0aGlzLndpZGdldC5jb21wb25lbnROYW1lID09PSAnU2VtTWVkaWFDb250YWluZXJDb21wb25lbnQnKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnR290IHRoZSB3eXNpd3lnIGRhdGEnLCB0aGlzLndpZGdldCk7XG4gICAgLy8gfVxuXG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5zdWJzY3JpYmUoYWxsSW1hZ2VzID0+IHtcbiAgICAgIGxldCBlZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0ID0gW107XG4gICAgICB0aGlzLnVzZXJJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGFsbEltYWdlcykge1xuICAgICAgICBlZGl0TW9kZSA9IGVkaXRNb2RlIHx8IGltYWdlLmVkaXRNb2RlO1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QucHVzaChpbWFnZS5maWxlTmFtZSk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5lZGl0VmlzaWJsZSA9IGVkaXRNb2RlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmltYWdlQ29uZmlnQ2hhbmdlcy5zdWJzY3JpYmUoY29uZmlnID0+IHtcbiAgICAgIHRoaXMuY29uZmlnID0gXy5jbG9uZURlZXAoY29uZmlnKTtcbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuaW1hZ2VMb2FkQ2hhbmdlcy5zdWJzY3JpYmUoYWxsSW1hZ2VzID0+IHtcbiAgICAgIHRoaXMudGVtcEltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdCA9IFtdO1xuICAgICAgdGhpcy51c2VySW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgZm9yIChjb25zdCBpbWFnZSBvZiBhbGxJbWFnZXMpIHtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0LnB1c2goaW1hZ2UuZmlsZU5hbWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5rZXkgPSBhbGxJbWFnZXMubGVuZ3RoIC0gMTtcbiAgICAgIHRoaXMuZWRpdFZpc2libGUgPSBmYWxzZTtcbiAgICAgIGlmIChhbGxJbWFnZXMubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS50ZW1wQ2hhbmdlcy5zdWJzY3JpYmUoYWxsSW1hZ2VzID0+IHtcbiAgICAgIHRoaXMudGVtcEltYWdlcyA9IGFsbEltYWdlcztcbiAgICB9KTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICB1cGxvYWRlZEltYWdlKGltYWdlOiBGaWxlKSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLnB1dEltYWdlKGltYWdlKTtcbiAgfVxuICBvbkVuYWJsZUVkaXRJbWFnZShpbmRleCkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkVkaXRFbmFibGUoaW5kZXgpO1xuICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gdHJ1ZTtcbiAgICB0aGlzLmtleSA9IGluZGV4O1xuICB9XG4gIG9uRWRpdEltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5rZXkgPSBpbmRleDtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0RW5hYmxlKGluZGV4KTtcbiAgfVxuICBvbkRlbGV0ZUltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRGVsZXRlSW1hZ2UoaW5kZXgpO1xuICB9XG4gIG9uTWVudShtb2RlKSB7XG4gICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICBjYXNlICdJTUFHRVMnOlxuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRFVQTElDQVRFJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdTRVRUSU5HUyc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnREVMRVRFJzpcbiAgICAgICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmNsZWFySW1hZ2VzKCk7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBvbkNoYW5nZWRGb3JtKGZvcm1EYXRhOiBhbnkpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuZm9ybUNoYW5nZWQodGhpcy5rZXksIGZvcm1EYXRhKTtcbiAgfVxuICBvbkNoYW5nZWRFZGl0TW9kZShtb2RlOiBzdHJpbmcpIHtcbiAgICBpZiAobW9kZSA9PT0gJ0FQUExZJykge1xuICAgICAgLy8gdGhpcy5lZGl0VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMuaW1hZ2VOYW1lTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkVkaXRJbWFnZSh0aGlzLmtleSwgbW9kZSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmNsZWFyQ29uZmlnKHRoaXMua2V5KTtcbiAgfVxuICBvbkNyb3BwZWRJbWFnZShpbmRleCwgY3JvcHBlZEltYWdlKSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLnB1dENyb3BwZWRJbWFnZShpbmRleCwgY3JvcHBlZEltYWdlKTtcbiAgfVxuICBvcGVuU2V0dGluZ3Moc3RhdHVzOiBib29sZWFuKSB7XG4gICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gc3RhdHVzO1xuICAgIHRoaXMuZGF0YUNoYW5nZS5lbWl0KFxuICAgICAge1xuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICB9XG4gICAgKVxuICB9XG4gIGNyb3BwZWRJbWFnZShpdGVtKXtcbiAgICBjb25zb2xlLmxvZygnbm90IHN1cmUnLCBpdGVtKVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU2VtVWlCdXR0b25Nb2R1bGUsXG4gIFNlbVVpQnV0dG9uRmFiTW9kdWxlLFxuICBTZW1VaU92ZXJsYXlEaWFsb2dNb2R1bGUsXG4gIFNlbVVpVGFic01vZHVsZSxcbiAgU2VtVWlMaXN0TW9kdWxlLFxuICBTZW1VaVRodW1ibmFpbExhcmdlTW9kdWxlLFxuICBTZW1VaUJ1dHRvbkRuZE1vZHVsZVxufSBmcm9tICdAZnJvbnRyL3NlbS11aSc7XG5cbmNvbnN0IFVpU2hhcmVkTW9kdWxlcyA9IFtcbiAgU2VtVWlCdXR0b25Nb2R1bGUsXG4gIFNlbVVpQnV0dG9uRG5kTW9kdWxlLFxuICBTZW1VaUJ1dHRvbkZhYk1vZHVsZSxcbiAgU2VtVWlPdmVybGF5RGlhbG9nTW9kdWxlLFxuICBTZW1VaVRhYnNNb2R1bGUsXG4gIFNlbVVpTGlzdE1vZHVsZSxcbiAgU2VtVWlUaHVtYm5haWxMYXJnZU1vZHVsZVxuXVxuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbLi4uVWlTaGFyZWRNb2R1bGVzXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1VaUtpdFNoYXJlZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBPYnNlcnZlcnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgU2Nyb2xsRGlzcGF0Y2hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENka1N0ZXBwZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc3RlcHBlcic7XG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmNvbnN0IE1BVEVSSUFMX01PRFVMRVMgPSBbXG4gIC8vIENES1xuICBBMTF5TW9kdWxlLFxuICBCaWRpTW9kdWxlLFxuICBPYnNlcnZlcnNNb2R1bGUsXG4gIE92ZXJsYXlNb2R1bGUsXG4gIFBsYXRmb3JtTW9kdWxlLFxuICBQb3J0YWxNb2R1bGUsXG4gIFNjcm9sbERpc3BhdGNoTW9kdWxlLFxuICBDZGtTdGVwcGVyTW9kdWxlLFxuICBDZGtUYWJsZU1vZHVsZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFsuLi5NQVRFUklBTF9NT0RVTEVTXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NYXRlcmlhbFNoYXJlZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICd5b3V0dWJlU2FmZVVybCdcbn0pXG5leHBvcnQgY2xhc3MgWW91dHViZVNhZmVVcmxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcil7XG5cbiAgfVxuXG4gIHRyYW5zZm9ybSh2aWRlb0lkOiBzdHJpbmcpOiBTYWZlUmVzb3VyY2VVcmwge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoXG4gICAgICBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt2aWRlb0lkfT9hdXRvcGxheT0xYCk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBZb3V0dWJlVmlkZW9Nb2RlbCB7XG4gICAgdmlkZW9JZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgdGh1bWJuYWlsVXJsOiBzdHJpbmc7XG4gICAgY2hhbm5lbFRpdGxlOiBzdHJpbmc7XG4gICAgY2hhbm5lbElkOiBzdHJpbmc7XG4gICAgcHVibGlzaGVkQXQ/OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBWaWRlb01vZGVsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHZpZGVvSWQ6IHN0cmluZyxcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcbiAgICBwdWJsaWMgdGh1bWJuYWlsVXJsOiBzdHJpbmcsXG4gICAgcHVibGljIGNoYW5uZWxUaXRsZTogc3RyaW5nLFxuICAgIHB1YmxpYyBjaGFubmVsSWQ6IHN0cmluZyxcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIHRoaXMudmlkZW9JZCA9IHZpZGVvSWQ7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMudGh1bWJuYWlsVXJsID0gdGh1bWJuYWlsVXJsO1xuICAgIHRoaXMuY2hhbm5lbFRpdGxlID0gY2hhbm5lbFRpdGxlO1xuICAgIHRoaXMuY2hhbm5lbElkID0gY2hhbm5lbElkO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvJztcbmltcG9ydCB7IFBhZ2luYXRpb25JbnN0YW5jZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IFNlbVZpZGVvU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IFlvdXR1YmVWaWRlb01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3ZpZGVvJztcbmltcG9ydCB7IFZpZGVvT2JqZWN0IH0gZnJvbSAnLi4vc2VtLXZpZGVvLWNvbnRhaW5lci9zZW0tdmlkZW8tY29udGFpbmVyLmNvbXBvbmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yLFxuICBzZWxlY3RvcjogJ1tzZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWxdJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0taGVhZGVyXCI+XG4gIDxzcGFuIChjbGljayk9XCJjbG9zZURpYWxvZygpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCI+PC9zcGFuPlxuICAgIENsb3NlXG4gIDwvc3Bhbj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWJvZHlfc3BhY2VkIGJnLWRlZmF1bHRcIj5cbiAgPGRpdiBzZW11aS10YWJzICN0YWJzVmVydGljYWwgW3Nob3dUYWJzXT1cInRydWVcIiBbdmVydGljYWxdPVwidHJ1ZVwiID5cbiAgICA8ZGl2IHNlbXVpLXRhYiAjdGFic1YxIFt0aXRsZV09XCInVmlkZW8gVXJsJ1wiPlxuICAgICAgPGRpdiBzZW11aS1zZWN0aW9uLWJvZHk+XG4gICAgICAgIFRhYiAxIGNvbnRlbnRcbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgc2VtdWktdGFiICN0YWJzVjIgW3RpdGxlXT1cIidTZWFyY2gnXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2VtLXZpZGVvLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDwhLS0gU2VjdGlvbiBCb2R5IC0tPlxuICAgICAgICAgIDxkaXYgc2VtdWktc2VjdGlvbi1ib2R5PlxuICAgICAgICAgICAgPCEtLSBTZWFyY2ggLS0+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDwhLS0gWW91VHViZSBTZWFyY2ggLS0+XG4gICAgICAgICAgICAgICAgPGxhYmVsPlNlYXJjaCBZb3V0dWJlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LXByZWZpeFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1zZWFyY2ggcHJlZml4XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzZW0taW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICBpZD1cInNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgICAgICAgIChrZXl1cCk9XCJzZWFyY2godGV4dEJveC52YWx1ZSlcIlxuICAgICAgICAgICAgICAgICAgICAgI3RleHRCb3hcbiAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuICBmaWVsZC1wcmVmaXggY2xhc3M9XCJpY29uIGljb24tc2VhcmNoIHByZWZpeFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbS12aWRlby1jb250YWluZXItLXJlc3VsdHNcIj5cblxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJyZXN1bHRzLmxlbmd0aCA9PSAwXCIgY2xhc3M9XCJzZW0tdmlkZW8tY29udGFpbmVyLS1yZXN1bHRzX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxmaWd1cmUgc2VtdWktdGh1bWJuYWlsIGNsYXNzPVwicHQyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0tdmlkZW8tY29udGFpbmVyLS1yZXN1bHRzX3ByZXZpZXdcIiBjYXJkLWltYWdlPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ2NhcHRpb24gc2VtLXNlY3Rpb24tZm9vdGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWdjYXB0aW9uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJwcmltYXJ5LWNhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2RpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdWItY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2RpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZ2NhcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJlc3VsdHMgfCBwYWdpbmF0ZTogY29uZmlnXCIgY2xhc3M9XCJzZW0tdmlkZW8tY29udGFpbmVyLS1yZXN1bHRzX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBzZW11aS10aHVtYm5haWwgY2xhc3M9XCJwdDJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS12aWRlby1jb250YWluZXItLXJlc3VsdHNfcHJldmlld1wiIGNhcmQtaW1hZ2U+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgKm5nSWY9XCJpdGVtLnRodW1ibmFpbFVybFwiIFtzcmNdPVwiaXRlbS50aHVtYm5haWxVcmxcIiAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGZpZ2NhcHRpb24gc2VtLXNlY3Rpb24tZm9vdGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZ2NhcHRpb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxoMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS1jYXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGl0ZW0udGl0bGV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic3ViLWNhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGl0ZW0ucHVibGlzaGVkQXR9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCIgcmVsYXRpdmUgc2VtLWJ1dHRvbi0tIHNlbS1idXR0b24gc2VtLWJ1dHRvbi0tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC1zZXR0aW5nLWJ1dHRvbiAoY2xpY2spPVwiYWRkVmlkZW8oaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWRkIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGJ1dHRvbi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1zZW0tYnRuLWZhYi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1jb3JuZXI9XCJub25lXCItLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tc2VtdWktdGhlbWU9XCJsaWdodFwiLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLXNlbS1pbXBvcnRhbmNlPVwiZGVmYXVsdFwiLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLWNhcmQtc2V0dGluZy1idXR0b24gKGNsaWNrKT1cImxvYWRTZXR0aW5ncygpXCItLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSZndDstLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1lbGxpcHNlXCI+PC9zcGFuPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPC9idXR0b24+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2ZpZ2NhcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwhLS0gU2VjdGlvbiBGb290ZXIgLS0+XG4gICAgICAgICAgPGRpdiBzZW11aS1zZWN0aW9uLWZvb3Rlcj5cbiAgICAgICAgICAgICAgPHBhZ2luYXRpb24tdGVtcGxhdGVcbiAgICAgICAgICAgICAgICBjbGFzcz1cInNlbS1wYWdpbmF0aW9uLWNvbnRhaW5lciBweTJcIlxuICAgICAgICAgICAgICAgICNwPVwicGFnaW5hdGlvbkFwaVwiXG4gICAgICAgICAgICAgICAgW2lkXT1cImNvbmZpZy5pZFwiXG4gICAgICAgICAgICAgICAgKHBhZ2VDaGFuZ2UpPVwiY29uZmlnLmN1cnJlbnRQYWdlID0gJGV2ZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbS1wYWdpbmF0aW9uLW5hdlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNlbS1wYWdpbmF0aW9uLXByZXZpb3VzXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInAuaXNGaXJzdFBhZ2UoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFwLmlzRmlyc3RQYWdlKClcIiAoY2xpY2spPVwicC5wcmV2aW91cygpXCI+IDwgPC9hPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBwYWdlIG9mIHAucGFnZXNcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNlbS1wYWdpbmF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJwLmdldEN1cnJlbnQoKSA9PT0gcGFnZS52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwicC5zZXRDdXJyZW50KHBhZ2UudmFsdWUpXCIgKm5nSWY9XCJwLmdldEN1cnJlbnQoKSAhPT0gcGFnZS52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt7IHBhZ2UubGFiZWwgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicC5nZXRDdXJyZW50KCkgPT09IHBhZ2UudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBwYWdlLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic2VtLXBhZ2luYXRpb24tbmV4dFwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwLmlzTGFzdFBhZ2UoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFwLmlzTGFzdFBhZ2UoKVwiIChjbGljayk9XCJwLm5leHQoKVwiPiA+IDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3BhZ2luYXRpb24tdGVtcGxhdGU+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5oMXtmb250LXNpemU6MnJlbX0uaDJ7Zm9udC1zaXplOjEuNXJlbX0uaDN7Zm9udC1zaXplOjEuMjVyZW19Lmg0e2ZvbnQtc2l6ZToxcmVtfS5oNXtmb250LXNpemU6Ljg3NXJlbX0uaDZ7Zm9udC1zaXplOi43NXJlbX0uZm9udC1mYW1pbHktaW5oZXJpdHtmb250LWZhbWlseTppbmhlcml0fS5mb250LXNpemUtaW5oZXJpdHtmb250LXNpemU6aW5oZXJpdH0udGV4dC1kZWNvcmF0aW9uLW5vbmV7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmJvbGR7Zm9udC13ZWlnaHQ6NzAwfS5yZWd1bGFye2ZvbnQtd2VpZ2h0OjQwMH0uaXRhbGlje2ZvbnQtc3R5bGU6aXRhbGljfS5jYXBze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMmVtfS5sZWZ0LWFsaWdue3RleHQtYWxpZ246bGVmdH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5yaWdodC1hbGlnbnt0ZXh0LWFsaWduOnJpZ2h0fS5qdXN0aWZ5e3RleHQtYWxpZ246anVzdGlmeX0ubm93cmFwe3doaXRlLXNwYWNlOm5vd3JhcH0uYnJlYWstd29yZHt3b3JkLXdyYXA6YnJlYWstd29yZH0ubGluZS1oZWlnaHQtMXtsaW5lLWhlaWdodDoxfS5saW5lLWhlaWdodC0ye2xpbmUtaGVpZ2h0OjEuMTI1fS5saW5lLWhlaWdodC0ze2xpbmUtaGVpZ2h0OjEuMjV9LmxpbmUtaGVpZ2h0LTR7bGluZS1oZWlnaHQ6MS41fS5saXN0LXN0eWxlLW5vbmV7bGlzdC1zdHlsZTpub25lfS51bmRlcmxpbmV7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udHJ1bmNhdGV7bWF4LXdpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5saXN0LXJlc2V0e2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nLWxlZnQ6MH0uaW5saW5le2Rpc3BsYXk6aW5saW5lfS5ibG9jayw6aG9zdHtkaXNwbGF5OmJsb2NrfS5pbmxpbmUtYmxvY2t7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhYmxle2Rpc3BsYXk6dGFibGV9LnRhYmxlLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsfS5vdmVyZmxvdy1oaWRkZW57b3ZlcmZsb3c6aGlkZGVufS5vdmVyZmxvdy1zY3JvbGx7b3ZlcmZsb3c6c2Nyb2xsfS5vdmVyZmxvdy1hdXRve292ZXJmbG93OmF1dG99LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcIiBcIjtkaXNwbGF5OnRhYmxlfS5jbGVhcmZpeDphZnRlcntjbGVhcjpib3RofS5sZWZ0e2Zsb2F0OmxlZnR9LnJpZ2h0e2Zsb2F0OnJpZ2h0fS5maXR7bWF4LXdpZHRoOjEwMCV9Lm1heC13aWR0aC0xe21heC13aWR0aDoyNHJlbX0ubWF4LXdpZHRoLTJ7bWF4LXdpZHRoOjMycmVtfS5tYXgtd2lkdGgtM3ttYXgtd2lkdGg6NDhyZW19Lm1heC13aWR0aC00e21heC13aWR0aDo2NHJlbX0uYm9yZGVyLWJveHtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFsaWduLWJhc2VsaW5le3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5hbGlnbi10b3B7dmVydGljYWwtYWxpZ246dG9wfS5hbGlnbi1taWRkbGV7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hbGlnbi1ib3R0b217dmVydGljYWwtYWxpZ246Ym90dG9tfS5tMHttYXJnaW46MH0ubXQwe21hcmdpbi10b3A6MH0ubXIwe21hcmdpbi1yaWdodDowfS5tYjB7bWFyZ2luLWJvdHRvbTowfS5tbDB7bWFyZ2luLWxlZnQ6MH0ubXgwe21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjB9Lm15MHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowfS5tMXttYXJnaW46LjVyZW19Lm10MXttYXJnaW4tdG9wOi41cmVtfS5tcjF7bWFyZ2luLXJpZ2h0Oi41cmVtfS5tYjF7bWFyZ2luLWJvdHRvbTouNXJlbX0ubWwxe21hcmdpbi1sZWZ0Oi41cmVtfS5teDF7bWFyZ2luLWxlZnQ6LjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtfS5teTF7bWFyZ2luLXRvcDouNXJlbTttYXJnaW4tYm90dG9tOi41cmVtfS5tMnttYXJnaW46MXJlbX0ubXQye21hcmdpbi10b3A6MXJlbX0ubXIye21hcmdpbi1yaWdodDoxcmVtfS5tYjJ7bWFyZ2luLWJvdHRvbToxcmVtfS5tbDJ7bWFyZ2luLWxlZnQ6MXJlbX0ubXgye21hcmdpbi1sZWZ0OjFyZW07bWFyZ2luLXJpZ2h0OjFyZW19Lm15MnttYXJnaW4tdG9wOjFyZW07bWFyZ2luLWJvdHRvbToxcmVtfS5tM3ttYXJnaW46MnJlbX0ubXQze21hcmdpbi10b3A6MnJlbX0ubXIze21hcmdpbi1yaWdodDoycmVtfS5tYjN7bWFyZ2luLWJvdHRvbToycmVtfS5tbDN7bWFyZ2luLWxlZnQ6MnJlbX0ubXgze21hcmdpbi1sZWZ0OjJyZW07bWFyZ2luLXJpZ2h0OjJyZW19Lm15M3ttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWJvdHRvbToycmVtfS5tNHttYXJnaW46NHJlbX0ubXQ0e21hcmdpbi10b3A6NHJlbX0ubXI0e21hcmdpbi1yaWdodDo0cmVtfS5tYjR7bWFyZ2luLWJvdHRvbTo0cmVtfS5tbDR7bWFyZ2luLWxlZnQ6NHJlbX0ubXg0e21hcmdpbi1sZWZ0OjRyZW07bWFyZ2luLXJpZ2h0OjRyZW19Lm15NHttYXJnaW4tdG9wOjRyZW07bWFyZ2luLWJvdHRvbTo0cmVtfS5teG4xe21hcmdpbi1sZWZ0Oi0uNXJlbTttYXJnaW4tcmlnaHQ6LS41cmVtfS5teG4ye21hcmdpbi1sZWZ0Oi0xcmVtO21hcmdpbi1yaWdodDotMXJlbX0ubXhuM3ttYXJnaW4tbGVmdDotMnJlbTttYXJnaW4tcmlnaHQ6LTJyZW19Lm14bjR7bWFyZ2luLWxlZnQ6LTRyZW07bWFyZ2luLXJpZ2h0Oi00cmVtfS5tbC1hdXRve21hcmdpbi1sZWZ0OmF1dG99Lm1yLWF1dG97bWFyZ2luLXJpZ2h0OmF1dG99Lm14LWF1dG97bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30ucDB7cGFkZGluZzowfS5wdDB7cGFkZGluZy10b3A6MH0ucHIwe3BhZGRpbmctcmlnaHQ6MH0ucGIwe3BhZGRpbmctYm90dG9tOjB9LnBsMHtwYWRkaW5nLWxlZnQ6MH0ucHgwe3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0ucHkwe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ucDF7cGFkZGluZzouNXJlbX0ucHQxe3BhZGRpbmctdG9wOi41cmVtfS5wcjF7cGFkZGluZy1yaWdodDouNXJlbX0ucGIxe3BhZGRpbmctYm90dG9tOi41cmVtfS5wbDF7cGFkZGluZy1sZWZ0Oi41cmVtfS5weTF7cGFkZGluZy10b3A6LjVyZW07cGFkZGluZy1ib3R0b206LjVyZW19LnB4MXtwYWRkaW5nLWxlZnQ6LjVyZW07cGFkZGluZy1yaWdodDouNXJlbX0ucDJ7cGFkZGluZzoxcmVtfS5wdDJ7cGFkZGluZy10b3A6MXJlbX0ucHIye3BhZGRpbmctcmlnaHQ6MXJlbX0ucGIye3BhZGRpbmctYm90dG9tOjFyZW19LnBsMntwYWRkaW5nLWxlZnQ6MXJlbX0ucHkye3BhZGRpbmctdG9wOjFyZW07cGFkZGluZy1ib3R0b206MXJlbX0ucHgye3BhZGRpbmctbGVmdDoxcmVtO3BhZGRpbmctcmlnaHQ6MXJlbX0ucDN7cGFkZGluZzoycmVtfS5wdDN7cGFkZGluZy10b3A6MnJlbX0ucHIze3BhZGRpbmctcmlnaHQ6MnJlbX0ucGIze3BhZGRpbmctYm90dG9tOjJyZW19LnBsM3twYWRkaW5nLWxlZnQ6MnJlbX0ucHkze3BhZGRpbmctdG9wOjJyZW07cGFkZGluZy1ib3R0b206MnJlbX0ucHgze3BhZGRpbmctbGVmdDoycmVtO3BhZGRpbmctcmlnaHQ6MnJlbX0ucDR7cGFkZGluZzo0cmVtfS5wdDR7cGFkZGluZy10b3A6NHJlbX0ucHI0e3BhZGRpbmctcmlnaHQ6NHJlbX0ucGI0e3BhZGRpbmctYm90dG9tOjRyZW19LnBsNHtwYWRkaW5nLWxlZnQ6NHJlbX0ucHk0e3BhZGRpbmctdG9wOjRyZW07cGFkZGluZy1ib3R0b206NHJlbX0ucHg0e3BhZGRpbmctbGVmdDo0cmVtO3BhZGRpbmctcmlnaHQ6NHJlbX0uY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5jb2wtMXt3aWR0aDo4LjMzMzMzJX0uY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5jb2wtM3t3aWR0aDoyNSV9LmNvbC00e3dpZHRoOjMzLjMzMzMzJX0uY29sLTV7d2lkdGg6NDEuNjY2NjclfS5jb2wtNnt3aWR0aDo1MCV9LmNvbC03e3dpZHRoOjU4LjMzMzMzJX0uY29sLTh7d2lkdGg6NjYuNjY2NjclfS5jb2wtOXt3aWR0aDo3NSV9LmNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmNvbC0xMnt3aWR0aDoxMDAlfS5mbGV4e2Rpc3BsYXk6ZmxleH1AbWVkaWEgKG1pbi13aWR0aDo0MGVtKXsuc20tY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zbS1jb2wtMXt3aWR0aDo4LjMzMzMzJX0uc20tY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5zbS1jb2wtM3t3aWR0aDoyNSV9LnNtLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0uc20tY29sLTV7d2lkdGg6NDEuNjY2NjclfS5zbS1jb2wtNnt3aWR0aDo1MCV9LnNtLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0uc20tY29sLTh7d2lkdGg6NjYuNjY2NjclfS5zbS1jb2wtOXt3aWR0aDo3NSV9LnNtLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LnNtLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LnNtLWNvbC0xMnt3aWR0aDoxMDAlfS5zbS1mbGV4e2Rpc3BsYXk6ZmxleH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSl7Lm1kLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWQtY29sLTF7d2lkdGg6OC4zMzMzMyV9Lm1kLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0ubWQtY29sLTN7d2lkdGg6MjUlfS5tZC1jb2wtNHt3aWR0aDozMy4zMzMzMyV9Lm1kLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0ubWQtY29sLTZ7d2lkdGg6NTAlfS5tZC1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9Lm1kLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0ubWQtY29sLTl7d2lkdGg6NzUlfS5tZC1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5tZC1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5tZC1jb2wtMTJ7d2lkdGg6MTAwJX0ubWQtZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjY0ZW0pey5sZy1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmxnLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5sZy1jb2wtMnt3aWR0aDoxNi42NjY2NyV9LmxnLWNvbC0ze3dpZHRoOjI1JX0ubGctY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5sZy1jb2wtNXt3aWR0aDo0MS42NjY2NyV9LmxnLWNvbC02e3dpZHRoOjUwJX0ubGctY29sLTd7d2lkdGg6NTguMzMzMzMlfS5sZy1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9LmxnLWNvbC05e3dpZHRoOjc1JX0ubGctY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubGctY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubGctY29sLTEye3dpZHRoOjEwMCV9LmxnLWZsZXh7ZGlzcGxheTpmbGV4fS5sZy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5mbGV4LWNvbHVtbntmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmZsZXgtd3JhcHtmbGV4LXdyYXA6d3JhcH0uaXRlbXMtc3RhcnR7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uaXRlbXMtZW5ke2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5pdGVtcy1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5pdGVtcy1iYXNlbGluZXthbGlnbi1pdGVtczpiYXNlbGluZX0uaXRlbXMtc3RyZXRjaHthbGlnbi1pdGVtczpzdHJldGNofS5zZWxmLXN0YXJ0e2FsaWduLXNlbGY6ZmxleC1zdGFydH0uc2VsZi1lbmR7YWxpZ24tc2VsZjpmbGV4LWVuZH0uc2VsZi1jZW50ZXJ7YWxpZ24tc2VsZjpjZW50ZXJ9LnNlbGYtYmFzZWxpbmV7YWxpZ24tc2VsZjpiYXNlbGluZX0uc2VsZi1zdHJldGNoe2FsaWduLXNlbGY6c3RyZXRjaH0uanVzdGlmeS1zdGFydHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uanVzdGlmeS1lbmR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5qdXN0aWZ5LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5qdXN0aWZ5LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Lmp1c3RpZnktYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RhcnR7YWxpZ24tY29udGVudDpmbGV4LXN0YXJ0fS5jb250ZW50LWVuZHthbGlnbi1jb250ZW50OmZsZXgtZW5kfS5jb250ZW50LWNlbnRlcnthbGlnbi1jb250ZW50OmNlbnRlcn0uY29udGVudC1iZXR3ZWVue2FsaWduLWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uY29udGVudC1hcm91bmR7YWxpZ24tY29udGVudDpzcGFjZS1hcm91bmR9LmNvbnRlbnQtc3RyZXRjaHthbGlnbi1jb250ZW50OnN0cmV0Y2h9LmZsZXgtYXV0b3tmbGV4OjEgMSBhdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MH0uZmxleC1ub25le2ZsZXg6bm9uZX0ub3JkZXItMHtvcmRlcjowfS5vcmRlci0xe29yZGVyOjF9Lm9yZGVyLTJ7b3JkZXI6Mn0ub3JkZXItM3tvcmRlcjozfS5vcmRlci1sYXN0e29yZGVyOjk5OTk5fS5yZWxhdGl2ZXtwb3NpdGlvbjpyZWxhdGl2ZX0uYWJzb2x1dGV7cG9zaXRpb246YWJzb2x1dGV9LmZpeGVke3Bvc2l0aW9uOmZpeGVkfS50b3AtMHt0b3A6MH0ucmlnaHQtMHtyaWdodDowfS5ib3R0b20tMHtib3R0b206MH0ubGVmdC0we2xlZnQ6MH0uejF7ei1pbmRleDoxfS56Mnt6LWluZGV4OjJ9Lnoze3otaW5kZXg6M30uejR7ei1pbmRleDo0fS5ib3JkZXJ7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoxcHh9LmJvcmRlci10b3B7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZDtib3JkZXItdG9wLXdpZHRoOjFweH0uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodC1zdHlsZTpzb2xpZDtib3JkZXItcmlnaHQtd2lkdGg6MXB4fS5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHh9LmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0LXN0eWxlOnNvbGlkO2JvcmRlci1sZWZ0LXdpZHRoOjFweH0uYm9yZGVyLW5vbmV7Ym9yZGVyOjB9LnJvdW5kZWR7Ym9yZGVyLXJhZGl1czozcHh9LmNpcmNsZXtib3JkZXItcmFkaXVzOjUwJX0ucm91bmRlZC10b3B7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0ucm91bmRlZC1yaWdodHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5yb3VuZGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjAgMCAzcHggM3B4fS5yb3VuZGVkLWxlZnR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0ubm90LXJvdW5kZWR7Ym9yZGVyLXJhZGl1czowfS5oaWRle3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDtoZWlnaHQ6MXB4O3dpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDFweCwxcHgsMXB4LDFweCl9QG1lZGlhIChtYXgtd2lkdGg6NDBlbSl7LnhzLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NDBlbSkgYW5kIChtYXgtd2lkdGg6NTJlbSl7LnNtLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NTJlbSkgYW5kIChtYXgtd2lkdGg6NjRlbSl7Lm1kLWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH19LmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fTpob3N0e2JhY2tncm91bmQ6I2ZmZn0uc2VtLXZpZGVvLWNvbnRhaW5lci0tcmVzdWx0c19wcmV2aWV3e21pbi1oZWlnaHQ6OTZweDtkaXNwbGF5OmJsb2NrO2JhY2tncm91bmQtY29sb3I6I2RlZGVkZX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1WaWRlb1NldHRpbmdzUGFuZWxDb21wb25lbnQge1xuICBAT3V0cHV0KCkgY2xvc2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8VmlkZW9PYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxWaWRlb09iamVjdD4oKTtcbiAgQElucHV0KCkgIGNvbmZpZztcbiAgQElucHV0KCkgZGF0YUlkOiBzdHJpbmc7XG4gIHJlc3VsdHM6IEFycmF5PFlvdXR1YmVWaWRlb01vZGVsPiA9IFtdO1xuICBwYWdlOiBudW1iZXIgPSAxO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlbVZpZGVvU2VydmljZTogU2VtVmlkZW9TZXJ2aWNlKSB7IH1cbiAgbG9hZFNldHRpbmdzKCl7fVxuICBzZWFyY2gocXVlcnkpIHtcbiAgICBjb25zb2xlLmxvZygncXVlcnknLCBxdWVyeSk7XG4gICAgdGhpcy5zZW1WaWRlb1NlcnZpY2UuZmV0Y2hWaWRlb3MocXVlcnkpLnN1YnNjcmliZSgoZGF0YTphbnkpID0+IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IGRhdGEuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFZpZGVvTW9kZWwoXG4gICAgICAgICAgaXRlbS5pZC52aWRlb0lkLFxuICAgICAgICAgIGl0ZW0uc25pcHBldC50aXRsZSxcbiAgICAgICAgICBpdGVtLnNuaXBwZXQudGh1bWJuYWlscy5oaWdoLnVybCxcbiAgICAgICAgICBpdGVtLnNuaXBwZXQuY2hhbm5lbFRpdGxlLFxuICAgICAgICAgIGl0ZW0uc25pcHBldC5jaGFubmVsSWQsXG4gICAgICAgICAgaXRlbS5zbmlwcGV0LmRlc2NyaXB0aW9uKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGFkZFZpZGVvKGl0ZW06IFlvdXR1YmVWaWRlb01vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZC5lbWl0KHtpZDogdGhpcy5kYXRhSWQsIGRhdGE6IGl0ZW0gfSk7XG4gIH1cbiAgY2xvc2VEaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZS5lbWl0KGZhbHNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgLCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWW91dHViZVZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdmlkZW8nO1xuLy8gaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuLy8gaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZpZGVvT2JqZWN0IHtcbiAgaWQ6IHN0cmluZztcbiAgZGF0YTogWW91dHViZVZpZGVvTW9kZWwgfCBudWxsO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvcixcbiAgc2VsZWN0b3I6ICdbc2VtLXZpZGVvLWNvbnRhaW5lcl0nLFxuICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyXCIgKm5nSWY9XCJkYXRhLmRhdGEgIT09IG51bGxcIj5cbiAgPGRpdiBjbGFzcz1cImVtYmVkLWNvbnRhaW5lclwiICpuZ0lmPVwiZGF0YS5kYXRhLmhhc093blByb3BlcnR5KCd2aWRlb0lkJylcIj5cbiAgICA8aWZyYW1lIHdpZHRoPVwiMTAwJVwiXG4gICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgZnJhbWVib3JkZXI9XCIwXCJcbiAgICBhbGxvd2Z1bGxzY3JlZW5cbiAgICBbc3JjXT1cImRhdGEuZGF0YS52aWRlb0lkIHwgeW91dHViZVNhZmVVcmxcIlxuICAgIHN0eWxlPVwiYm9yZGVyOiBzb2xpZCAxcHggYmxhY2tcIiA+XG4gICAgPC9pZnJhbWU+XG4gIDwvZGl2PlxuXG5cbiAgPGRpdiAqbmdJZj1cImVkaXRNb2RlXCIgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lci0tbmF2XCI+XG4gICAgPGJ1dHRvblxuICAgICAgc2VtLWJ0bi1mYWJcbiAgICAgIHNtYWxsXG4gICAgICBjb3JuZXI9XCJ0b3AtbGVmdFwiXG4gICAgICBzZW11aS10aGVtZT1cImxpZ2h0XCJcbiAgICAgIGNsYXNzPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBcIlxuICAgICAgc2VtLWltcG9ydGFuY2U9XCJpbnZlcnRlZFwiXG4gICAgICAjY2hhdE92ZXJsYXk9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAgIChjbGljayk9XCJvcGVuU2V0dGluZ3MoIWlzVGVzdEFPcGVuZWQpXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWRyb3BfaWNvblwiPjwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8IS0tPHNlbXVpLW92ZXJsYXktZGlhbG9nLS0+XG4gICAgICA8IS0tW292ZXJsYXlPcmlnaW5dPVwiY2hhdE92ZXJsYXlcIi0tPlxuICAgICAgPCEtLVtpc09wZW5lZF09XCJpc1Rlc3RBT3BlbmVkXCItLT5cbiAgICAgIDwhLS0oY2xvc2UpPVwic2V0U2VsZWN0ZWQoZmFsc2UpXCItLT5cbiAgICAgIDwhLS0ob3Blbik9XCJzZXRTZWxlY3RlZCh0cnVlKVwiLS0+XG4gICAgICA8IS0tW292ZXJsYXlXaWR0aF09XCInYXV0bydcIi0tPlxuICAgIDwhLS0mZ3Q7LS0+XG4gICAgPCEtLTwvc2VtdWktb3ZlcmxheS1kaWFsb2c+LS0+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7YmFja2dyb3VuZC1jb2xvcjojZjVlNWU1O2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjOGIwMDAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YTogVmlkZW9PYmplY3Q7XG4gIEBPdXRwdXQoKSBkYXRhQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQElucHV0KCkgZWRpdE1vZGUgPSBmYWxzZTtcblxuICBwdWJsaWMgaXNUZXN0QU9wZW5lZCA9IGZhbHNlO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cbiAgbmdPbkluaXQoKSB7fVxuXG4gIC8vIHBhZ2luYXRpb25Db25maWc6IFBhZ2luYXRpb25JbnN0YW5jZSA9IHtcbiAgLy8gICBpZDogJ2N1c3RvbScsXG4gIC8vICAgaXRlbXNQZXJQYWdlOiAyLFxuICAvLyAgIGN1cnJlbnRQYWdlOiAxXG4gIC8vIH07XG4gIC8vIHNlbGVjdGVkSXRlbShpdGVtOiBZb3V0dWJlVmlkZW9Nb2RlbCk6IHZvaWQge1xuICAvLyAgIHRoaXMuZGF0YUNoYW5nZS5lbWl0KGl0ZW0pO1xuICAvLyAgIC8vIFRPRE8gTmVlZCBlbmFibGUgdGhpcyB3aGVuIHlvdSB0ZXN0IGl0XG4gIC8vICAgLy8gdGhpcy5kYXRhID0gaXRlbTtcbiAgLy8gfVxuICAvLyBjbG9zZU92ZXJsYXkodG9nZ2xlU3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gIC8vICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gdG9nZ2xlU3RhdHVzO1xuICAvLyB9XG5cbiAgLy8gb3BlblRlc3RBKGlzT3BlbmVkOiBib29sZWFuKTogdm9pZCB7XG4gIC8vICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gaXNPcGVuZWQ7XG4gIC8vIH1cbiAgLy9cbiAgLy8gc2V0U2VsZWN0ZWQoaWQ6IHN0cmluZykge1xuICAvLyAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQoZGF0YS5pZCk7XG4gIC8vIH1cblxuXG4gIG9wZW5TZXR0aW5ncyhzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICAvLyB0aGlzLmlzVGVzdEFPcGVuZWQgPSBzdGF0dXM7XG4gICAgdGhpcy5kYXRhQ2hhbmdlLmVtaXQodGhpcy5kYXRhKVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yLFxuICBzZWxlY3RvcjogJ1tzZW0tbWVkaWEtc2V0dGluZ3MtY29udGFpbmVyXScsXG4gIHRlbXBsYXRlOiBgIDxkaXYgKm5nSWY9XCJ1cGxvYWRQYW5lbEZsYWdcIiBjbGFzcz1cImRpYWxvZy1jb250YWluZXIgYmctZGVmYXVsdCBsZWZ0XCIgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiPlxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0tYm9keVwiPlxuICAgIDxzZW0tcGFuZWxcbiAgICAgIFtlZGl0VmlzaWJsZV09XCJlZGl0VmlzaWJsZVwiXG4gICAgICBba2V5XT1cImtleVwiXG4gICAgICBbaW1hZ2VOYW1lTGlzdF09XCJpbWFnZU5hbWVMaXN0XCJcbiAgICAgIChjcm9wcGVkKT1cImNyb3BwZWRJbWFnZSgkZXZlbnQpXCJcbiAgICAgICh1cGxvYWRlZCk9XCJ1cGxvYWRlZEltYWdlKCRldmVudClcIlxuICAgICAgKGNoYW5nZWRGb3JtKT1cIm9uQ2hhbmdlZEZvcm0oJGV2ZW50KVwiXG4gICAgICAoZWRpdEltYWdlKT1cIm9uRWRpdEltYWdlKCRldmVudClcIlxuICAgICAgKGRlbGV0ZUltYWdlKT1cIm9uRGVsZXRlSW1hZ2UoJGV2ZW50KVwiXG4gICAgICAoY2hhbmdlZEVkaXRNb2RlKT1cIm9uQ2hhbmdlZEVkaXRNb2RlKCRldmVudClcIlxuICAgICAgKHNob3dVcGxvYWRFdmVudCk9XCJlZGl0VmlzaWJsZSA9IGZhbHNlXCJcbiAgICAgIFt1c2VySW1hZ2VzXT1cInVzZXJJbWFnZXNcIlxuICAgID48L3NlbS1wYW5lbD5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCIhdXBsb2FkUGFuZWxGbGFnXCJcbiAgICAgY2xhc3M9XCJzZXR0aW5ncy1jb250YWluZXIgZGlhbG9nLWNvbnRhaW5lciBiZy1kZWZhdWx0IG10NFwiPlxuICAgICAgICA8c2VtLXNldHRpbmdzXG4gICAgICAgICAgKHByZXNzZWRJbWFnZXMpPVwib25NZW51KCdJTUFHRVMnKVwiXG4gICAgICAgICAgKHByZXNzZWREdXBsaWNhdGUpPVwib25NZW51KCdEVVBMSUNBVEUnKVwiXG4gICAgICAgICAgKHByZXNzZWRTZXR0aW5ncyk9XCJvbk1lbnUoJ1NFVFRJTkdTJylcIlxuICAgICAgICAgIChwcmVzc2VkRGVsZXRlKT1cIm9uTWVudSgnREVMRVRFJylcIlxuICAgICAgICA+XG4gICAgICAgIDwvc2VtLXNldHRpbmdzPlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCgpe2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjOGIwMDAwfS5pbWctY3JvcHBlcntoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYVNldHRpbmdzQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIHdpZGdldCA9IHtcbiAgICBjb21wb25lbnROYW1lOiAnJyxcbiAgICBkYXRhOiAgYFxuICAgIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeSdzIHN0YW5kYXJkIGR1bW15IHRleHQgZXZlciBzaW5jZSB0aGUgMTUwMHMsIHdoZW4gYW4gdW5rbm93biBwcmludGVyIG9vayBhIGdhbGxleSBvZiB0eXBlXG4gICAgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZSBudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWNcbiAgICB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHUgbGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHNcbiAgICBjb250YWluaW5nYFxuICB9O1xuXG5cbiAgdXNlckltYWdlcz86IEFycmF5PGFueT4gPSBbXTtcbiAgZWRpdFZpc2libGU6IEJvb2xlYW4gPSBmYWxzZTtcbiAga2V5OiBOdW1iZXI7XG4gIHVwbG9hZFBhbmVsRmxhZzogQm9vbGVhbiA9IHRydWU7XG4gIGltYWdlTmFtZUxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY29uZmlnOiBhbnk7XG4gIHRlbXBJbWFnZXM6IEFycmF5PGFueT47XG4gIGlzVGVzdEFPcGVuZWQgPSBmYWxzZTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lZGlhU2VydmljZTogU2VtTWVkaWFTZXJ2aWNlLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIC8vIHRoaXMud2lkZ2V0ID0gdGhpcy5pbmplY3Rvci5nZXQoJ3dpZGdldCcpO1xuICAgIC8vIGlmKHRoaXMud2lkZ2V0LmNvbXBvbmVudE5hbWUgPT09ICdTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCcpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdHb3QgdGhlIHd5c2l3eWcgZGF0YScsIHRoaXMud2lkZ2V0KTtcbiAgICAvLyB9XG5cbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgbGV0IGVkaXRNb2RlID0gZmFsc2U7XG4gICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXNlckltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgYWxsSW1hZ2VzKSB7XG4gICAgICAgIGVkaXRNb2RlID0gZWRpdE1vZGUgfHwgaW1hZ2UuZWRpdE1vZGU7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdC5wdXNoKGltYWdlLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmVkaXRWaXNpYmxlID0gZWRpdE1vZGU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuaW1hZ2VDb25maWdDaGFuZ2VzLnN1YnNjcmliZShjb25maWcgPT4ge1xuICAgICAgdGhpcy5jb25maWcgPSBfLmNsb25lRGVlcChjb25maWcpO1xuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUxvYWRDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0ID0gW107XG4gICAgICB0aGlzLnVzZXJJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGFsbEltYWdlcykge1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QucHVzaChpbWFnZS5maWxlTmFtZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmtleSA9IGFsbEltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgdGhpcy5lZGl0VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgaWYgKGFsbEltYWdlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLnRlbXBDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgIH0pO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICB9XG4gIHVwbG9hZGVkSW1hZ2UoaW1hZ2U6IEZpbGUpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UucHV0SW1hZ2UoaW1hZ2UpO1xuICB9XG4gIG9uRW5hYmxlRWRpdEltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEVuYWJsZShpbmRleCk7XG4gICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgIHRoaXMua2V5ID0gaW5kZXg7XG4gIH1cbiAgb25FZGl0SW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLmtleSA9IGluZGV4O1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkVkaXRFbmFibGUoaW5kZXgpO1xuICB9XG4gIG9uRGVsZXRlSW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25EZWxldGVJbWFnZShpbmRleCk7XG4gIH1cbiAgb25NZW51KG1vZGUpIHtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgJ0lNQUdFUyc6XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdEVVBMSUNBVEUnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1NFVFRJTkdTJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdERUxFVEUnOlxuICAgICAgICB0aGlzLl9tZWRpYVNlcnZpY2UuY2xlYXJJbWFnZXMoKTtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0ID0gW107XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIG9uQ2hhbmdlZEZvcm0oZm9ybURhdGE6IGFueSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5mb3JtQ2hhbmdlZCh0aGlzLmtleSwgZm9ybURhdGEpO1xuICB9XG4gIG9uQ2hhbmdlZEVkaXRNb2RlKG1vZGU6IHN0cmluZykge1xuICAgIGlmIChtb2RlID09PSAnQVBQTFknKSB7XG4gICAgICAvLyB0aGlzLmVkaXRWaXNpYmxlID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5pbWFnZU5hbWVMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEltYWdlKHRoaXMua2V5LCBtb2RlKTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuY2xlYXJDb25maWcodGhpcy5rZXkpO1xuICB9XG4gIG9uQ3JvcHBlZEltYWdlKGluZGV4LCBjcm9wcGVkSW1hZ2UpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UucHV0Q3JvcHBlZEltYWdlKGluZGV4LCBjcm9wcGVkSW1hZ2UpO1xuICB9XG4gIG9wZW5UZXN0QShpc09wZW5lZDogYm9vbGVhbikge1xuICAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IGlzT3BlbmVkO1xuICB9XG5cblxuXG4gIGNyb3BwZWRJbWFnZShpdGVtKXtcbiAgICBjb25zb2xlLmxvZygnbm90IHN1cmUnLCBpdGVtKVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1zTW9kdWxlLFxuICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2VtTWVkaWFQYW5lbFNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS1tZWRpYS1wYW5lbC9zZW0tbWVkaWEtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1pbWFnZS11cGxvYWQvbWVkaWEtdXBsb2FkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1Dcm9wcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21lZGlhLWNyb3BwZXIvbWVkaWEtY3JvcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtQ29udHJvbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtY29udHJvbHMvbWVkaWEtY29udHJvbHMuY29tcG5lbnQnO1xuaW1wb3J0IHsgU2xpZGVQYW5lbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zbGlkZS1wYW5lbC9zbGlkZS1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXR0aW5nc0NvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9zZW0tbWVkaWEtc2V0dGluZ3Mvc2VtLW1lZGlhLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWRpYUVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtZWRpdC9tZWRpYS1lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9zZW0tbWVkaWEtY29udGFpbmVyL3NlbS1tZWRpYS1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbVVpS2l0U2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zZW0tdWktc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBTZW1NYXRlcmlhbFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2VtLW1hdGVyaWFsLXNoYXJlZC5tb2R1bGUnO1xuXG5pbXBvcnQgeyBJbWFnZUNyb3BwZXJNb2R1bGUgfSBmcm9tICduZ3gtaW1hZ2UtY3JvcHBlcic7XG5pbXBvcnQgeyBGaWxlRHJvcE1vZHVsZSB9IGZyb20gJ25neC1maWxlLWRyb3AnO1xuaW1wb3J0IHsgQW5ndWxhckNyb3BwZXJqc01vZHVsZSB9IGZyb20gJ2FuZ3VsYXItY3JvcHBlcmpzJztcblxuaW1wb3J0IHsgTmd4UGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IFlvdXR1YmVTYWZlVXJsUGlwZSB9IGZyb20gJy4vc2FmZS11cmwucGlwZSc7XG5cbmltcG9ydCB7IFNlbVZpZGVvU2V0dGluZ3NQYW5lbENvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9zZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWwvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9zZW0tdmlkZW8tY29udGFpbmVyL3NlbS12aWRlby1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbVZpZGVvU2VydmljZSB9IGZyb20gJy4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi9zZW0tbWVkaWEuc2VydmljZSc7XG5pbXBvcnQgeyBTZW1NZWRpYVNldHRpbmdzQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS1tZWRpYS1zZXR0aW5ncy1jb250YWluZXIvc2VtLW1lZGlhLXNldHRpbmdzLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBOb29wQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICAvLyBOb29wQW5pbWF0aW9uc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIE5neFBhZ2luYXRpb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBJbWFnZUNyb3BwZXJNb2R1bGUsXG4gICAgRmlsZURyb3BNb2R1bGUsXG4gICAgQW5ndWxhckNyb3BwZXJqc01vZHVsZSxcbiAgICBTZW1NYXRlcmlhbFNoYXJlZE1vZHVsZSxcbiAgICBTZW1VaUtpdFNoYXJlZE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTZW1NZWRpYVBhbmVsU2V0dGluZ3NDb21wb25lbnQsXG4gICAgU2VtVXBsb2FkQ29tcG9uZW50LFxuICAgIFNlbUNyb3BwZXJDb21wb25lbnQsXG4gICAgU2VtQ29udHJvbHNDb21wb25lbnQsXG4gICAgU2VtTWVkaWFTZXR0aW5nc0NvbXBvbmVudCxcbiAgICBNZWRpYUVkaXRDb21wb25lbnQsXG4gICAgU2xpZGVQYW5lbENvbXBvbmVudCxcbiAgICBTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBZb3V0dWJlU2FmZVVybFBpcGUsXG4gICAgU2VtVmlkZW9TZXR0aW5nc1BhbmVsQ29tcG9uZW50LFxuICAgIFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhU2V0dGluZ3NDb250YWluZXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNlbU1lZGlhUGFuZWxTZXR0aW5nc0NvbXBvbmVudCxcbiAgICBTZW1VcGxvYWRDb21wb25lbnQsXG4gICAgU2VtQ3JvcHBlckNvbXBvbmVudCxcbiAgICBTZW1Db250cm9sc0NvbXBvbmVudCxcbiAgICBTZW1NZWRpYVNldHRpbmdzQ29tcG9uZW50LFxuICAgIE1lZGlhRWRpdENvbXBvbmVudCxcbiAgICBTbGlkZVBhbmVsQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFNlbVZpZGVvU2V0dGluZ3NQYW5lbENvbXBvbmVudCxcbiAgICBTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICBTZW1NZWRpYVNldHRpbmdzQ29udGFpbmVyQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNlbU1lZGlhU2VydmljZSxcbiAgICBTZW1WaWRlb1NlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU2VtTWVkaWFNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtTZW1NZWRpYVNlcnZpY2UsIFNlbVZpZGVvU2VydmljZV1cbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJfLmNsb25lRGVlcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFnQkUsWUFBbUIsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFQL0IsY0FBUyxHQUF1QixFQUFFLENBQUM7UUFDbkMsY0FBUyxzQkFBZSxFQUFFLEVBQU8sQ0FBQztRQUMzQiwwQkFBcUIsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUN6RCxxQkFBZ0IsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUNwRCx1QkFBa0IsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUN0RCxnQkFBVyxHQUFpQixJQUFJLE9BQU8sRUFBTyxDQUFDO1FBR3BELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUs7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFD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