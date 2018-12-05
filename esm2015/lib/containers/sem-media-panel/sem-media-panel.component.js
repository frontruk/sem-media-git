/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, Inject, PLATFORM_ID } from '@angular/core';
import * as _ from 'lodash';
import { isPlatformBrowser } from '@angular/common';
export class SemMediaPanelSettingsComponent {
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
            this.myForm = _.cloneDeep(temp);
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
if (false) {
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.cropped;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.uploaded;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.editImage;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.deleteImage;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.changedForm;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.changedEditMode;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.showUploadEvent;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.myForm;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.imageList;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.visibleControlPanel;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.editVisible;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.key;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.imageNameList;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.userImages;
    /** @type {?} */
    SemMediaPanelSettingsComponent.prototype.itemSeelcted;
    /**
     * @type {?}
     * @private
     */
    SemMediaPanelSettingsComponent.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLW1lZGlhLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmcm9udHIvc2VtLW1lZGlhLyIsInNvdXJjZXMiOlsibGliL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXBhbmVsL3NlbS1tZWRpYS1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQ25DLE1BQU0sRUFBRSxXQUFXLEVBQy9CLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBcUlwRCxNQUFNOzs7O0lBb0JKLFlBQW1ELFVBQWU7UUFBZixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBbkJsRSxtQ0FBbUM7UUFDekIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbEMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3RDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN0QyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDMUMsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzdDLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFDakIsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUMzQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFPNUMsaUJBQVksR0FBUSxLQUFLLENBQUM7SUFHMUIsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzlDLENBQUM7SUFDSCxDQUFDOzs7OztJQUNELFdBQVcsQ0FBQyxPQUFZO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O2tCQUN6QixJQUFJLEdBQUc7Z0JBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPO2dCQUNyRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVM7YUFDMUQ7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7Ozs7O0lBQ0QsYUFBYSxDQUFDLElBQVM7UUFDckIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELGFBQWEsQ0FBQyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQUNELE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUM5QyxDQUFDOzs7OztJQUNELFFBQVEsQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFDRCxhQUFhLENBQUMsUUFBYTtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7O0lBQ0QsV0FBVztJQUVYLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQUk7SUFFakIsQ0FBQzs7O1lBak1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTZIWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyw0NU9BQTQ1TyxDQUFDO2FBQ3Y2Tzs7OzRDQXFCZSxNQUFNLFNBQUMsV0FBVzs7O3NCQWxCL0IsTUFBTTt1QkFDTixNQUFNO3dCQUNOLE1BQU07MEJBQ04sTUFBTTswQkFDTixNQUFNOzhCQUNOLE1BQU07OEJBQ04sTUFBTTswQkFLTixLQUFLO2tCQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzs7O0lBZE4saURBQTRDOztJQUM1QyxrREFBNkM7O0lBQzdDLG1EQUE4Qzs7SUFDOUMscURBQWdEOztJQUNoRCxxREFBZ0Q7O0lBQ2hELHlEQUFvRDs7SUFDcEQseURBQW9EOztJQUNwRCxnREFBd0I7O0lBQ3hCLG1EQUFrQzs7SUFDbEMsNkRBQTRDOztJQUU1QyxxREFBOEI7O0lBQzlCLDZDQUFxQjs7SUFDckIsdURBQXNDOztJQUN0QyxvREFBZ0M7O0lBRWhDLHNEQUEwQjs7Ozs7SUFFYixvREFBcUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LFxuICBPbkNoYW5nZXMsIEluamVjdCwgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUFycmF5LCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbS1wYW5lbCcsXG4gIHRlbXBsYXRlOiBgPCEtLTxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyJiM0NTsmIzQ1O2hlYWRlclwiPi0tPlxuICA8IS0tPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCIgKGNsaWNrKT1cInNob3dVcGxvYWRFdmVudC5lbWl0KClcIj48L3NwYW4+LS0+XG5cbiAgPCEtLTxzcGFuIChjbGljayk9XCJjbG9zZURpYWxvZygpXCI+LS0+XG4gICAgPCEtLTxzcGFuIGNsYXNzPVwic2VtLWljb24tYmFja1wiPjwvc3Bhbj4tLT5cbiAgICA8IS0tQ2xvc2UtLT5cbiAgPCEtLTwvc3Bhbj4tLT5cbjwhLS08L2Rpdj4tLT5cblxuPCEtLSBVcGxvYWQgTW9kZSAtLT5cblxuPCEtLSBFZGl0IE1vZGUgLS0+XG5cblxuPCEtLTxocj4tLT5cbjwhLS08aDQ+Q3JlYXRpbmcgbG9vayBhbmQgZmVlbDwvaDQ+LS0+XG5cblxuPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXIgYmctZGVmYXVsdCBsZWZ0XCIgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiPlxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0tYm9keVwiPlxuICAgIDxkaXY+XG4gICAgICA8ZGl2IHNlbXVpLXRhYnMgI3RhYnMgPlxuICAgICAgICA8ZGl2IHNlbXVpLXRhYiAjdGFiMCBbdGl0bGVdPVwiJ1RhYiAwJ1wiIGNsYXNzPVwidGFiLW5hdmlnYXRpb25cIj5cbiAgICAgICAgICA8dWwgc2VtdWktbGlzdD5cblxuICAgICAgICAgICAgPGxpIHNlbXVpLWxpc3QtaXRlbVxuICAgICAgICAgICAgICAgIGxpc3QtaXRlbVxuICAgICAgICAgICAgICAgIHNlbXVpLWltcG9ydGFuY2U9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwidGFicy50YWJDbGlja2VkKHVwbG9hZEltYWdlKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgaWNvbi1zaXRlc1wiICBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgIDxzcGFuPlVwbG9hZCBpbWFnZTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgc2VtdWktbGlzdC1pdGVtXG4gICAgICAgICAgICAgIGxpc3QtaXRlbVxuICAgICAgICAgICAgICBzZW0taW1wb3J0YW5jZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwidGFicy50YWJDbGlja2VkKGVkaXRJbWFnZSlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGljb24tc2V0dGluZ3NcIiAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICA8c3Bhbj5FZGl0IGltYWdlPC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzZW11aS10YWIgI3VwbG9hZEltYWdlIFt0aXRsZV09XCInVXBsb2FkIEltYWdlJ1wiID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0taGVhZGVyXCI+XG4gICAgICAgICAgICAgPHNwYW4gKGNsaWNrKT1cInRhYnMudGFiQ2xpY2tlZCh0YWIwKVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tYmFja1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICBDbG9zZVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxocj5cbiAgICAgICAgICBVcGxvYWQgaW1hZ2VcblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZSBmbGV4IGZsZXgtd3JhcCBsaXN0LXJlc2V0IHB4MVwiICpuZ0lmPVwiIWl0ZW1TZWVsY3RlZFwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAqbmdJZj1cIiFlZGl0VmlzaWJsZVwiXG4gICAgICAgICAgICAgIHNlbS11cGxvYWRcbiAgICAgICAgICAgICAgY2xhc3M9XCJjb2wtNCBib3JkZXJcIlxuICAgICAgICAgICAgICAoZG9uZUltYWdlKT1cIm9uSW1hZ2VMb2FkZWQoJGV2ZW50KVwiPjwvZGl2PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAgKm5nSWY9XCIhZWRpdFZpc2libGVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC00IGJvcmRlclwiXG4gICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpbWFnZU5hbWVMaXN0OyBsZXQgaSA9IGluZGV4XCIgPlxuICAgICAgICAgICAgICAgIHt7aXRlbX19XG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRWRpdChpLCBpdGVtKVwiXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgc3JjPVwiaHR0cDovL2QydjUyazNjbDl2ZWRkLmNsb3VkZnJvbnQubmV0L2Fzc2V0cy9pbWFnZXMvcGxhY2Vob2xkZXItc3F1YXJlLnN2Z1wiIGNsYXNzPVwiZml0XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXRlbVNlZWxjdGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInB4MlwiPiB7e2l0ZW1TZWVsY3RlZCB8IGpzb259fTwvc3Bhbj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImVkaXRTZWxlY3RlZChpdGVtU2VlbGN0ZWQpXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJyb3VuZGVkIGZpdCBweDJcIlxuICAgICAgICAgICAgICBzcmM9XCJodHRwOi8vZDJ2NTJrM2NsOXZlZGQuY2xvdWRmcm9udC5uZXQvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci1zcXVhcmUuc3ZnXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2VtLW1lZGlhLWVkaXRcbiAgICAgICAgICAgICAgKm5nSWY9XCJlZGl0VmlzaWJsZVwiXG4gICAgICAgICAgICAgIChzZWxlY3RlZEVkaXRNb2RlKT1cIm9uQ2hhbmdlZE1vZGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChmb3JtQ2hhbmdlZCk9XCJvbkNoYW5nZWRGb3JtKCRldmVudClcIlxuICAgICAgICAgICAgICBbZm9ybURhdGFdPVwibXlGb3JtXCJcbiAgICAgICAgICAgID48L3NlbS1tZWRpYS1lZGl0PlxuXG4gICAgICAgICAgICA8YnV0dG9uIHNlbS1idXR0b24gc2VtLWltcG9ydGFuY2U9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25EZWxldGUoaXRlbVNlZWxjdGVkKVwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2ID5cbiAgICAgICAgPGRpdiBzZW11aS10YWIgI2VkaXRJbWFnZSBbdGl0bGVdPVwiJ0VkaXQgSW1hZ2UnXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1oZWFkZXJcIj5cbiAgICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwidGFicy50YWJDbGlja2VkKHRhYjApXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1iYWNrXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIENsb3NlXG4gICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxocj5cbiAgICAgICAgICBFZGl0IEltYWdlXG4gICAgICAgIDwvZGl2ID5cbiAgICAgICAgPGRpdiBzZW11aS10YWIgI3RhYjMgW3RpdGxlXT1cIidUYWIgMydcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0taGVhZGVyXCI+XG4gICAgICAgICAgICAgPHNwYW4gKGNsaWNrKT1cInRhYnMudGFiQ2xpY2tlZCh0YWIwKVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tYmFja1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICBDbG9zZVxuICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aHI+XG4gICAgICAgICAgVGFiIDMgQ29udGVudFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzZW11aS10YWIgc2VtdWktdGFiICN0YWI0IFt0aXRsZV09XCInVGFiIDQnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWhlYWRlclwiPlxuICAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJ0YWJzLnRhYkNsaWNrZWQodGFiMClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWJhY2tcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgQ2xvc2VcbiAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGhyPlxuICAgICAgICAgIFRhYiA0IENvbnRlbnRcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuYCxcbiAgc3R5bGVzOiBbYC5oMXtmb250LXNpemU6MnJlbX0uaDJ7Zm9udC1zaXplOjEuNXJlbX0uaDN7Zm9udC1zaXplOjEuMjVyZW19Lmg0e2ZvbnQtc2l6ZToxcmVtfS5oNXtmb250LXNpemU6Ljg3NXJlbX0uaDZ7Zm9udC1zaXplOi43NXJlbX0uZm9udC1mYW1pbHktaW5oZXJpdHtmb250LWZhbWlseTppbmhlcml0fS5mb250LXNpemUtaW5oZXJpdHtmb250LXNpemU6aW5oZXJpdH0udGV4dC1kZWNvcmF0aW9uLW5vbmV7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmJvbGR7Zm9udC13ZWlnaHQ6NzAwfS5yZWd1bGFye2ZvbnQtd2VpZ2h0OjQwMH0uaXRhbGlje2ZvbnQtc3R5bGU6aXRhbGljfS5jYXBze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMmVtfS5sZWZ0LWFsaWdue3RleHQtYWxpZ246bGVmdH0uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5yaWdodC1hbGlnbnt0ZXh0LWFsaWduOnJpZ2h0fS5qdXN0aWZ5e3RleHQtYWxpZ246anVzdGlmeX0ubm93cmFwe3doaXRlLXNwYWNlOm5vd3JhcH0uYnJlYWstd29yZHt3b3JkLXdyYXA6YnJlYWstd29yZH0ubGluZS1oZWlnaHQtMXtsaW5lLWhlaWdodDoxfS5saW5lLWhlaWdodC0ye2xpbmUtaGVpZ2h0OjEuMTI1fS5saW5lLWhlaWdodC0ze2xpbmUtaGVpZ2h0OjEuMjV9LmxpbmUtaGVpZ2h0LTR7bGluZS1oZWlnaHQ6MS41fS5saXN0LXN0eWxlLW5vbmV7bGlzdC1zdHlsZTpub25lfS51bmRlcmxpbmV7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udHJ1bmNhdGV7bWF4LXdpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5saXN0LXJlc2V0e2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nLWxlZnQ6MH0uaW5saW5le2Rpc3BsYXk6aW5saW5lfS5ibG9ja3tkaXNwbGF5OmJsb2NrfS5pbmxpbmUtYmxvY2t7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnRhYmxle2Rpc3BsYXk6dGFibGV9LnRhYmxlLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsfS5vdmVyZmxvdy1oaWRkZW57b3ZlcmZsb3c6aGlkZGVufS5vdmVyZmxvdy1zY3JvbGx7b3ZlcmZsb3c6c2Nyb2xsfS5vdmVyZmxvdy1hdXRve292ZXJmbG93OmF1dG99LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcIiBcIjtkaXNwbGF5OnRhYmxlfS5jbGVhcmZpeDphZnRlcntjbGVhcjpib3RofS5sZWZ0e2Zsb2F0OmxlZnR9LnJpZ2h0e2Zsb2F0OnJpZ2h0fS5maXR7bWF4LXdpZHRoOjEwMCV9Lm1heC13aWR0aC0xe21heC13aWR0aDoyNHJlbX0ubWF4LXdpZHRoLTJ7bWF4LXdpZHRoOjMycmVtfS5tYXgtd2lkdGgtM3ttYXgtd2lkdGg6NDhyZW19Lm1heC13aWR0aC00e21heC13aWR0aDo2NHJlbX0uYm9yZGVyLWJveHtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFsaWduLWJhc2VsaW5le3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5hbGlnbi10b3B7dmVydGljYWwtYWxpZ246dG9wfS5hbGlnbi1taWRkbGV7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hbGlnbi1ib3R0b217dmVydGljYWwtYWxpZ246Ym90dG9tfS5tMHttYXJnaW46MH0ubXQwe21hcmdpbi10b3A6MH0ubXIwe21hcmdpbi1yaWdodDowfS5tYjB7bWFyZ2luLWJvdHRvbTowfS5tbDB7bWFyZ2luLWxlZnQ6MH0ubXgwe21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjB9Lm15MHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowfS5tMXttYXJnaW46LjVyZW19Lm10MXttYXJnaW4tdG9wOi41cmVtfS5tcjF7bWFyZ2luLXJpZ2h0Oi41cmVtfS5tYjF7bWFyZ2luLWJvdHRvbTouNXJlbX0ubWwxe21hcmdpbi1sZWZ0Oi41cmVtfS5teDF7bWFyZ2luLWxlZnQ6LjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtfS5teTF7bWFyZ2luLXRvcDouNXJlbTttYXJnaW4tYm90dG9tOi41cmVtfS5tMnttYXJnaW46MXJlbX0ubXQyLDpob3N0IC5pbWctY3JvcHBlcnttYXJnaW4tdG9wOjFyZW19Lm1yMiw6aG9zdCAuaW1nLWNyb3BwZXJ7bWFyZ2luLXJpZ2h0OjFyZW19Lm1iMnttYXJnaW4tYm90dG9tOjFyZW19Lm1sMnttYXJnaW4tbGVmdDoxcmVtfS5teDJ7bWFyZ2luLWxlZnQ6MXJlbTttYXJnaW4tcmlnaHQ6MXJlbX0ubXkye21hcmdpbi10b3A6MXJlbTttYXJnaW4tYm90dG9tOjFyZW19Lm0ze21hcmdpbjoycmVtfS5tdDN7bWFyZ2luLXRvcDoycmVtfS5tcjN7bWFyZ2luLXJpZ2h0OjJyZW19Lm1iM3ttYXJnaW4tYm90dG9tOjJyZW19Lm1sM3ttYXJnaW4tbGVmdDoycmVtfS5teDN7bWFyZ2luLWxlZnQ6MnJlbTttYXJnaW4tcmlnaHQ6MnJlbX0ubXkze21hcmdpbi10b3A6MnJlbTttYXJnaW4tYm90dG9tOjJyZW19Lm00e21hcmdpbjo0cmVtfS5tdDR7bWFyZ2luLXRvcDo0cmVtfS5tcjR7bWFyZ2luLXJpZ2h0OjRyZW19Lm1iNHttYXJnaW4tYm90dG9tOjRyZW19Lm1sNHttYXJnaW4tbGVmdDo0cmVtfS5teDR7bWFyZ2luLWxlZnQ6NHJlbTttYXJnaW4tcmlnaHQ6NHJlbX0ubXk0e21hcmdpbi10b3A6NHJlbTttYXJnaW4tYm90dG9tOjRyZW19Lm14bjF7bWFyZ2luLWxlZnQ6LS41cmVtO21hcmdpbi1yaWdodDotLjVyZW19Lm14bjJ7bWFyZ2luLWxlZnQ6LTFyZW07bWFyZ2luLXJpZ2h0Oi0xcmVtfS5teG4ze21hcmdpbi1sZWZ0Oi0ycmVtO21hcmdpbi1yaWdodDotMnJlbX0ubXhuNHttYXJnaW4tbGVmdDotNHJlbTttYXJnaW4tcmlnaHQ6LTRyZW19Lm1sLWF1dG97bWFyZ2luLWxlZnQ6YXV0b30ubXItYXV0b3ttYXJnaW4tcmlnaHQ6YXV0b30ubXgtYXV0b3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wMHtwYWRkaW5nOjB9LnB0MHtwYWRkaW5nLXRvcDowfS5wcjB7cGFkZGluZy1yaWdodDowfS5wYjB7cGFkZGluZy1ib3R0b206MH0ucGwwe3BhZGRpbmctbGVmdDowfS5weDB7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowfS5weTB7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5wMXtwYWRkaW5nOi41cmVtfS5wdDF7cGFkZGluZy10b3A6LjVyZW19LnByMXtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wYjF7cGFkZGluZy1ib3R0b206LjVyZW19LnBsMXtwYWRkaW5nLWxlZnQ6LjVyZW19LnB5MXtwYWRkaW5nLXRvcDouNXJlbTtwYWRkaW5nLWJvdHRvbTouNXJlbX0ucHgxe3BhZGRpbmctbGVmdDouNXJlbTtwYWRkaW5nLXJpZ2h0Oi41cmVtfS5wMiw6aG9zdCBmb3Jte3BhZGRpbmc6MXJlbX0ucHQye3BhZGRpbmctdG9wOjFyZW19LnByMntwYWRkaW5nLXJpZ2h0OjFyZW19LnBiMntwYWRkaW5nLWJvdHRvbToxcmVtfS5wbDJ7cGFkZGluZy1sZWZ0OjFyZW19LnB5MntwYWRkaW5nLXRvcDoxcmVtO3BhZGRpbmctYm90dG9tOjFyZW19LnB4MntwYWRkaW5nLWxlZnQ6MXJlbTtwYWRkaW5nLXJpZ2h0OjFyZW19LnAze3BhZGRpbmc6MnJlbX0ucHQze3BhZGRpbmctdG9wOjJyZW19LnByM3twYWRkaW5nLXJpZ2h0OjJyZW19LnBiM3twYWRkaW5nLWJvdHRvbToycmVtfS5wbDN7cGFkZGluZy1sZWZ0OjJyZW19LnB5M3twYWRkaW5nLXRvcDoycmVtO3BhZGRpbmctYm90dG9tOjJyZW19LnB4M3twYWRkaW5nLWxlZnQ6MnJlbTtwYWRkaW5nLXJpZ2h0OjJyZW19LnA0e3BhZGRpbmc6NHJlbX0ucHQ0e3BhZGRpbmctdG9wOjRyZW19LnByNHtwYWRkaW5nLXJpZ2h0OjRyZW19LnBiNHtwYWRkaW5nLWJvdHRvbTo0cmVtfS5wbDR7cGFkZGluZy1sZWZ0OjRyZW19LnB5NHtwYWRkaW5nLXRvcDo0cmVtO3BhZGRpbmctYm90dG9tOjRyZW19LnB4NHtwYWRkaW5nLWxlZnQ6NHJlbTtwYWRkaW5nLXJpZ2h0OjRyZW19LmNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY29sLTF7d2lkdGg6OC4zMzMzMyV9LmNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uY29sLTN7d2lkdGg6MjUlfS5jb2wtNHt3aWR0aDozMy4zMzMzMyV9LmNvbC01e3dpZHRoOjQxLjY2NjY3JX0uY29sLTZ7d2lkdGg6NTAlfS5jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LmNvbC04e3dpZHRoOjY2LjY2NjY3JX0uY29sLTl7d2lkdGg6NzUlfS5jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5jb2wtMTJ7d2lkdGg6MTAwJX0uZmxleHtkaXNwbGF5OmZsZXh9QG1lZGlhIChtaW4td2lkdGg6NDBlbSl7LnNtLWNvbHtmbG9hdDpsZWZ0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLXJpZ2h0e2Zsb2F0OnJpZ2h0O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc20tY29sLTF7d2lkdGg6OC4zMzMzMyV9LnNtLWNvbC0ye3dpZHRoOjE2LjY2NjY3JX0uc20tY29sLTN7d2lkdGg6MjUlfS5zbS1jb2wtNHt3aWR0aDozMy4zMzMzMyV9LnNtLWNvbC01e3dpZHRoOjQxLjY2NjY3JX0uc20tY29sLTZ7d2lkdGg6NTAlfS5zbS1jb2wtN3t3aWR0aDo1OC4zMzMzMyV9LnNtLWNvbC04e3dpZHRoOjY2LjY2NjY3JX0uc20tY29sLTl7d2lkdGg6NzUlfS5zbS1jb2wtMTB7d2lkdGg6ODMuMzMzMzMlfS5zbS1jb2wtMTF7d2lkdGg6OTEuNjY2NjclfS5zbS1jb2wtMTJ7d2lkdGg6MTAwJX0uc20tZmxleHtkaXNwbGF5OmZsZXh9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pey5tZC1jb2x7ZmxvYXQ6bGVmdDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC1yaWdodHtmbG9hdDpyaWdodDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1kLWNvbC0xe3dpZHRoOjguMzMzMzMlfS5tZC1jb2wtMnt3aWR0aDoxNi42NjY2NyV9Lm1kLWNvbC0ze3dpZHRoOjI1JX0ubWQtY29sLTR7d2lkdGg6MzMuMzMzMzMlfS5tZC1jb2wtNXt3aWR0aDo0MS42NjY2NyV9Lm1kLWNvbC02e3dpZHRoOjUwJX0ubWQtY29sLTd7d2lkdGg6NTguMzMzMzMlfS5tZC1jb2wtOHt3aWR0aDo2Ni42NjY2NyV9Lm1kLWNvbC05e3dpZHRoOjc1JX0ubWQtY29sLTEwe3dpZHRoOjgzLjMzMzMzJX0ubWQtY29sLTExe3dpZHRoOjkxLjY2NjY3JX0ubWQtY29sLTEye3dpZHRoOjEwMCV9Lm1kLWZsZXh7ZGlzcGxheTpmbGV4fX1AbWVkaWEgKG1pbi13aWR0aDo2NGVtKXsubGctY29se2Zsb2F0OmxlZnQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtcmlnaHR7ZmxvYXQ6cmlnaHQ7Ym94LXNpemluZzpib3JkZXItYm94fS5sZy1jb2wtMXt3aWR0aDo4LjMzMzMzJX0ubGctY29sLTJ7d2lkdGg6MTYuNjY2NjclfS5sZy1jb2wtM3t3aWR0aDoyNSV9LmxnLWNvbC00e3dpZHRoOjMzLjMzMzMzJX0ubGctY29sLTV7d2lkdGg6NDEuNjY2NjclfS5sZy1jb2wtNnt3aWR0aDo1MCV9LmxnLWNvbC03e3dpZHRoOjU4LjMzMzMzJX0ubGctY29sLTh7d2lkdGg6NjYuNjY2NjclfS5sZy1jb2wtOXt3aWR0aDo3NSV9LmxnLWNvbC0xMHt3aWR0aDo4My4zMzMzMyV9LmxnLWNvbC0xMXt3aWR0aDo5MS42NjY2NyV9LmxnLWNvbC0xMnt3aWR0aDoxMDAlfS5sZy1mbGV4e2Rpc3BsYXk6ZmxleH0ubGctaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0uZmxleC1jb2x1bW57ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5mbGV4LXdyYXB7ZmxleC13cmFwOndyYXB9Lml0ZW1zLXN0YXJ0e2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9Lml0ZW1zLWVuZHthbGlnbi1pdGVtczpmbGV4LWVuZH0uaXRlbXMtY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uaXRlbXMtYmFzZWxpbmV7YWxpZ24taXRlbXM6YmFzZWxpbmV9Lml0ZW1zLXN0cmV0Y2h7YWxpZ24taXRlbXM6c3RyZXRjaH0uc2VsZi1zdGFydHthbGlnbi1zZWxmOmZsZXgtc3RhcnR9LnNlbGYtZW5ke2FsaWduLXNlbGY6ZmxleC1lbmR9LnNlbGYtY2VudGVye2FsaWduLXNlbGY6Y2VudGVyfS5zZWxmLWJhc2VsaW5le2FsaWduLXNlbGY6YmFzZWxpbmV9LnNlbGYtc3RyZXRjaHthbGlnbi1zZWxmOnN0cmV0Y2h9Lmp1c3RpZnktc3RhcnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lmp1c3RpZnktZW5ke2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uanVzdGlmeS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uanVzdGlmeS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5qdXN0aWZ5LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0YXJ0e2FsaWduLWNvbnRlbnQ6ZmxleC1zdGFydH0uY29udGVudC1lbmR7YWxpZ24tY29udGVudDpmbGV4LWVuZH0uY29udGVudC1jZW50ZXJ7YWxpZ24tY29udGVudDpjZW50ZXJ9LmNvbnRlbnQtYmV0d2VlbnthbGlnbi1jb250ZW50OnNwYWNlLWJldHdlZW59LmNvbnRlbnQtYXJvdW5ke2FsaWduLWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5jb250ZW50LXN0cmV0Y2h7YWxpZ24tY29udGVudDpzdHJldGNofS5mbGV4LWF1dG97ZmxleDoxIDEgYXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjB9LmZsZXgtbm9uZXtmbGV4Om5vbmV9Lm9yZGVyLTB7b3JkZXI6MH0ub3JkZXItMXtvcmRlcjoxfS5vcmRlci0ye29yZGVyOjJ9Lm9yZGVyLTN7b3JkZXI6M30ub3JkZXItbGFzdHtvcmRlcjo5OTk5OX0ucmVsYXRpdmV7cG9zaXRpb246cmVsYXRpdmV9LmFic29sdXRlLDpob3N0IC5pbWctY3JvcHBlcntwb3NpdGlvbjphYnNvbHV0ZX0uZml4ZWR7cG9zaXRpb246Zml4ZWR9LnRvcC0wLDpob3N0IC5pbWctY3JvcHBlcnt0b3A6MH0ucmlnaHQtMCw6aG9zdCAuaW1nLWNyb3BwZXJ7cmlnaHQ6MH0uYm90dG9tLTB7Ym90dG9tOjB9LmxlZnQtMHtsZWZ0OjB9Lnoxe3otaW5kZXg6MX0uejJ7ei1pbmRleDoyfS56M3t6LWluZGV4OjN9Lno0e3otaW5kZXg6NH0uYm9yZGVye2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MXB4fS5ib3JkZXItdG9we2JvcmRlci10b3Atc3R5bGU6c29saWQ7Ym9yZGVyLXRvcC13aWR0aDoxcHh9LmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweH0uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5ib3JkZXItbGVmdHtib3JkZXItbGVmdC1zdHlsZTpzb2xpZDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmJvcmRlci1ub25le2JvcmRlcjowfS5yb3VuZGVke2JvcmRlci1yYWRpdXM6M3B4fS5jaXJjbGV7Ym9yZGVyLXJhZGl1czo1MCV9LnJvdW5kZWQtdG9we2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LnJvdW5kZWQtcmlnaHR7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0ucm91bmRlZC1ib3R0b217Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0ucm91bmRlZC1sZWZ0e2JvcmRlci1yYWRpdXM6M3B4IDAgMCAzcHh9Lm5vdC1yb3VuZGVke2JvcmRlci1yYWRpdXM6MH0uaGlkZXtwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7aGVpZ2h0OjFweDt3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpfUBtZWRpYSAobWF4LXdpZHRoOjQwZW0pey54cy1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjQwZW0pIGFuZCAobWF4LXdpZHRoOjUyZW0pey5zbS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjUyZW0pIGFuZCAobWF4LXdpZHRoOjY0ZW0pey5tZC1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fS5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdCAuaW1nLWNyb3BwZXJ7d2lkdGg6NjUwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtTWVkaWFQYW5lbFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvLyBQbGVhc2UgZ2V0IHRoZXNlIG91dHB1dHMgd29ya2luZ1xuICBAT3V0cHV0KCkgY3JvcHBlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgdXBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGVkaXRJbWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZGVsZXRlSW1hZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNoYW5nZWRGb3JtID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2VkRWRpdE1vZGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNob3dVcGxvYWRFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwdWJsaWMgbXlGb3JtOiBhbnkgPSB7fTtcbiAgcHVibGljIGltYWdlTGlzdDogQXJyYXk8YW55PiA9IFtdO1xuICBwdWJsaWMgdmlzaWJsZUNvbnRyb2xQYW5lbDogQm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGVkaXRWaXNpYmxlOiBCb29sZWFuO1xuICBASW5wdXQoKSBrZXk6IG51bWJlcjtcbiAgQElucHV0KCkgaW1hZ2VOYW1lTGlzdDogQXJyYXk8c3RyaW5nPjtcbiAgQElucHV0KCkgdXNlckltYWdlczogQXJyYXk8YW55PjtcblxuICBpdGVtU2VlbGN0ZWQ6IGFueSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHJlYWRvbmx5IHBsYXRmb3JtSWQ6IGFueSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMudmlzaWJsZUNvbnRyb2xQYW5lbCA9IHRoaXMuZWRpdFZpc2libGU7XG4gICAgfVxuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIGlmICh0aGlzLnVzZXJJbWFnZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdGVtcCA9IHtcbiAgICAgICAgYWxsVGV4dDogdGhpcy51c2VySW1hZ2VzW3RoaXMua2V5XS5jb250cm9sQm94LmFsbFRleHQsXG4gICAgICAgIG1ldGFUaXRsZTogdGhpcy51c2VySW1hZ2VzW3RoaXMua2V5XS5jb250cm9sQm94Lm1ldGFUaXRsZVxuICAgICAgfTtcbiAgICAgIHRoaXMubXlGb3JtID0gXy5jbG9uZURlZXAodGVtcCk7XG4gICAgfVxuICB9XG4gIG9uSW1hZ2VMb2FkZWQoZmlsZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52aXNpYmxlQ29udHJvbFBhbmVsID0gZmFsc2U7XG4gICAgdGhpcy51cGxvYWRlZC5lbWl0KGZpbGUpO1xuICB9XG4gIG9uQ2hhbmdlZE1vZGUobW9kZSkge1xuICAgIHRoaXMuY2hhbmdlZEVkaXRNb2RlLmVtaXQobW9kZSk7XG4gIH1cbiAgb25FZGl0KGluZGV4LCBpdGVtKSB7XG4gICAgdGhpcy5lZGl0SW1hZ2UuZW1pdChpbmRleCk7XG4gICAgdGhpcy5rZXkgPSBpbmRleDtcbiAgICB0aGlzLnZpc2libGVDb250cm9sUGFuZWwgPSB0cnVlO1xuICAgIHRoaXMuaXRlbVNlZWxjdGVkID0geyBpOiBpbmRleCwgZGF0YTogaXRlbX07XG4gIH1cbiAgb25EZWxldGUoaW5kZXgpIHtcbiAgICB0aGlzLmRlbGV0ZUltYWdlLmVtaXQoaW5kZXgpO1xuICAgIHRoaXMuaXRlbVNlZWxjdGVkID0gZmFsc2U7XG4gIH1cbiAgb25DaGFuZ2VkRm9ybShmb3JtRGF0YTogYW55KSB7XG4gICAgdGhpcy5jaGFuZ2VkRm9ybS5lbWl0KGZvcm1EYXRhKTtcbiAgfVxuICBjbG9zZURpYWxvZygpe1xuXG4gIH1cblxuICBlZGl0U2VsZWN0ZWQoaXRlbSk6IHZvaWR7XG5cbiAgfVxufVxuIl19