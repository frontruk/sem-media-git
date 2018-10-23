/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, Injector } from '@angular/core';
export class SemVideoContainerComponent {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.dataChange = new EventEmitter();
        this.isTestAOpened = false;
        this.paginationConfig = {
            id: 'custom',
            itemsPerPage: 2,
            currentPage: 1
        };
        // this.widget = this.injector.get('widget');
        // if(this.widget.componentName === 'SemVideoContainerComponent') {
        //   console.log('Got the wysiwyg data', this.widget);
        // }
    }
    /**
     * @param {?} query
     * @return {?}
     */
    search(query) {
        console.log('query is outputed', query);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    selectedItem(item) {
        console.log('item select', item);
        this.dataChange.emit(item);
        // this.widget.data = item;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} item
     * @return {?}
     */
    closeOverlay(item) { }
    /**
     * @param {?} isOpened
     * @return {?}
     */
    openTestA(isOpened) {
        this.isTestAOpened = isOpened;
    }
}
SemVideoContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'sem-video-container',
                template: `<div (click)="selectedItem({test: 'sadasds'})"></div>
<div class="sem-dnd-container">
  <div class="embed-container" *ngIf="data.hasOwnProperty('videoId')">
    <iframe width="100%"
    height="100%"
    frameborder="0"
    allowfullscreen
    [src]="data.videoId | youtubeSafeUrl"
    style="border: solid 1px black" >
    </iframe>
  </div>
  <div class="sem-dnd-container--nav">
    <button
      sem-btn-fab
      corner="top-right"
      semui-theme="light"
      class="absolute top-0 right-0 "
      sem-importance="secondary"
      #chatOverlay="cdkOverlayOrigin"
      cdkOverlayOrigin
      (click)="openTestA(!isTestAOpened)"
    >
        <span class="sem-icon-profile-accent">
        <span class="path1"></span><span class="path2"></span>
        </span>
    </button>
    <semui-overlay-dialog
      [overlayOrigin]="chatOverlay"
      [isOpened]="isTestAOpened"
      (close)="openTestA(false)"
      (open)="openTestA(true)"
      [overlayWidth]="'auto'"
    >
        <sem-video-settings-panel
          [config]="paginationConfig"
          (selected)="selectedItem($event)"
          (close)="closeOverlay($event)">
        </sem-video-settings-panel>

    </semui-overlay-dialog>
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
    dataChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    SemVideoContainerComponent.prototype.data;
    /** @type {?} */
    SemVideoContainerComponent.prototype.dataChange;
    /** @type {?} */
    SemVideoContainerComponent.prototype.isOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.isTestAOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.paginationConfig;
    /** @type {?} */
    SemVideoContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsWUFBWSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQW9EaEgsTUFBTTs7OztJQW1CSixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBTDVCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBR3hDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBUTdCLHFCQUFnQixHQUF1QjtZQUNyQyxFQUFFLEVBQUUsUUFBUTtZQUNaLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLENBQUM7U0FDZixDQUFDO1FBVEEsNkNBQTZDO1FBQzdDLG1FQUFtRTtRQUNuRSxzREFBc0Q7UUFDdEQsSUFBSTtJQUNOLENBQUM7Ozs7O0lBTUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQUk7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQiwyQkFBMkI7SUFDN0IsQ0FBQzs7OztJQUNELFFBQVEsS0FBSSxDQUFDOzs7OztJQUNiLFlBQVksQ0FBQyxJQUFJLElBQVMsQ0FBQzs7Ozs7SUFFM0IsU0FBUyxDQUFDLFFBQWlCO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLENBQUM7OztZQTNGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EwQ1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsd0VBQXdFLENBQUM7YUFDbkY7OztZQW5EMEQsUUFBUTs7O21CQWlFaEUsS0FBSzt5QkFDTCxNQUFNOzs7O0lBRFAsMENBQWM7O0lBQ2QsZ0RBQStDOztJQUUvQyw4Q0FBeUI7O0lBQ3pCLG1EQUE2Qjs7SUFRN0Isc0RBSUU7O0lBVlUsOENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgLCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWW91dHViZVZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdmlkZW8nO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tdmlkZW8tY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IChjbGljayk9XCJzZWxlY3RlZEl0ZW0oe3Rlc3Q6ICdzYWRhc2RzJ30pXCI+PC9kaXY+XG48ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cImVtYmVkLWNvbnRhaW5lclwiICpuZ0lmPVwiZGF0YS5oYXNPd25Qcm9wZXJ0eSgndmlkZW9JZCcpXCI+XG4gICAgPGlmcmFtZSB3aWR0aD1cIjEwMCVcIlxuICAgIGhlaWdodD1cIjEwMCVcIlxuICAgIGZyYW1lYm9yZGVyPVwiMFwiXG4gICAgYWxsb3dmdWxsc2NyZWVuXG4gICAgW3NyY109XCJkYXRhLnZpZGVvSWQgfCB5b3V0dWJlU2FmZVVybFwiXG4gICAgc3R5bGU9XCJib3JkZXI6IHNvbGlkIDFweCBibGFja1wiID5cbiAgICA8L2lmcmFtZT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lci0tbmF2XCI+XG4gICAgPGJ1dHRvblxuICAgICAgc2VtLWJ0bi1mYWJcbiAgICAgIGNvcm5lcj1cInRvcC1yaWdodFwiXG4gICAgICBzZW11aS10aGVtZT1cImxpZ2h0XCJcbiAgICAgIGNsYXNzPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBcIlxuICAgICAgc2VtLWltcG9ydGFuY2U9XCJzZWNvbmRhcnlcIlxuICAgICAgI2NoYXRPdmVybGF5PVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgICBjZGtPdmVybGF5T3JpZ2luXG4gICAgICAoY2xpY2spPVwib3BlblRlc3RBKCFpc1Rlc3RBT3BlbmVkKVwiXG4gICAgPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXByb2ZpbGUtYWNjZW50XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGF0aDFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJwYXRoMlwiPjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxzZW11aS1vdmVybGF5LWRpYWxvZ1xuICAgICAgW292ZXJsYXlPcmlnaW5dPVwiY2hhdE92ZXJsYXlcIlxuICAgICAgW2lzT3BlbmVkXT1cImlzVGVzdEFPcGVuZWRcIlxuICAgICAgKGNsb3NlKT1cIm9wZW5UZXN0QShmYWxzZSlcIlxuICAgICAgKG9wZW4pPVwib3BlblRlc3RBKHRydWUpXCJcbiAgICAgIFtvdmVybGF5V2lkdGhdPVwiJ2F1dG8nXCJcbiAgICA+XG4gICAgICAgIDxzZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWxcbiAgICAgICAgICBbY29uZmlnXT1cInBhZ2luYXRpb25Db25maWdcIlxuICAgICAgICAgIChzZWxlY3RlZCk9XCJzZWxlY3RlZEl0ZW0oJGV2ZW50KVwiXG4gICAgICAgICAgKGNsb3NlKT1cImNsb3NlT3ZlcmxheSgkZXZlbnQpXCI+XG4gICAgICAgIDwvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsPlxuXG4gICAgPC9zZW11aS1vdmVybGF5LWRpYWxvZz5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdHtiYWNrZ3JvdW5kLWNvbG9yOiNmNWU1ZTU7ZGlzcGxheTpibG9jaztib3JkZXI6MXB4IHNvbGlkICM4YjAwMDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyBwdWJsaWMgd2lkZ2V0ID0ge1xuICAvLyAgIGNvbXBvbmVudE5hbWU6ICcnLFxuICAvLyAgIGRhdGE6IHtcbiAgLy8gICAgICAgY2hhbm5lbElkOiAnVUM0cmxBVmdBSzBTR2steVRmZTQ4UXB3JyxcbiAgLy8gICAgICAgY2hhbm5lbFRpdGxlOiAnQlJJR0hUIFNJREUnLFxuICAvLyAgICAgICBkZXNjcmlwdGlvbjogJ0hvdyB0byBTdGF5IEhlYWx0aHkuIFdlIGFsbCBoYXZlIGRheXMgd2hlbiB3ZSBmZWVsIGFic29sdXRlbHkgZXhoYXVzdGVkIG9yIHNvbWV0aW1lcyBhIGxpdHRsZSBkb3duIGluIHRoZSBkdW1wcy4gQnV0IGlmIHlvdSBmaW5kIHlvdXJzZWxmIGNvbnN0YW50bHkgY2F0Y2hpbmcgLi4uJyxcbiAgLy8gICAgICAgdGh1bWJuYWlsVXJsOiAnaHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9reW9TMWVkWTV0TS9ocWRlZmF1bHQuanBnJyxcbiAgLy8gICAgICAgdGl0bGU6ICcxMCBXYXJuaW5nIFNpZ25zIFlvdSBIYXZlIFZpdGFtaW4gRCBEZWZpY2llbmN5JyxcbiAgLy8gICAgICAgdmlkZW9JZDogJ2t5b1MxZWRZNXRNJ1xuICAvLyAgICAgfVxuICAvLyB9O1xuXG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBPdXRwdXQoKSBkYXRhQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIGlzT3BlbmVkOiBib29sZWFuO1xuICBwdWJsaWMgaXNUZXN0QU9wZW5lZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgLy8gdGhpcy53aWRnZXQgPSB0aGlzLmluamVjdG9yLmdldCgnd2lkZ2V0Jyk7XG4gICAgLy8gaWYodGhpcy53aWRnZXQuY29tcG9uZW50TmFtZSA9PT0gJ1NlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50Jykge1xuICAgIC8vICAgY29uc29sZS5sb2coJ0dvdCB0aGUgd3lzaXd5ZyBkYXRhJywgdGhpcy53aWRnZXQpO1xuICAgIC8vIH1cbiAgfVxuICBwYWdpbmF0aW9uQ29uZmlnOiBQYWdpbmF0aW9uSW5zdGFuY2UgPSB7XG4gICAgaWQ6ICdjdXN0b20nLFxuICAgIGl0ZW1zUGVyUGFnZTogMixcbiAgICBjdXJyZW50UGFnZTogMVxuICB9O1xuICBzZWFyY2gocXVlcnkpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygncXVlcnkgaXMgb3V0cHV0ZWQnLCBxdWVyeSlcbiAgfVxuXG4gIHNlbGVjdGVkSXRlbShpdGVtKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ2l0ZW0gc2VsZWN0JywgaXRlbSlcbiAgICB0aGlzLmRhdGFDaGFuZ2UuZW1pdChpdGVtKTtcbiAgICAvLyB0aGlzLndpZGdldC5kYXRhID0gaXRlbTtcbiAgfVxuICBuZ09uSW5pdCgpIHt9XG4gIGNsb3NlT3ZlcmxheShpdGVtKTogdm9pZCB7fVxuXG4gIG9wZW5UZXN0QShpc09wZW5lZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IGlzT3BlbmVkO1xuICB9XG5cblxufVxuIl19