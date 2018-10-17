/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Injector } from '@angular/core';
export class SemVideoContainerComponent {
    /**
     * @param {?} injector
     */
    constructor(injector) {
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
    search(query) {
        console.log('query is outputed', query);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    selectedItem(item) {
        console.log('item select', item);
        this.widget.data = item;
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
                template: `<div class="sem-dnd-container">
  <div class="embed-container" *ngIf="widget.data.hasOwnProperty('videoId')">
    <iframe width="100%"
    height="100%"
    frameborder="0"
    allowfullscreen
    [src]="widget.data.videoId | youtubeSafeUrl"
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
                styles: [`:host{background-color:#f5e5e5;display:block;border:1px solid #8b0000;height:100%}.embed-container{height:100vh}`]
            },] },
];
SemVideoContainerComponent.ctorParameters = () => [
    { type: Injector }
];
if (false) {
    /** @type {?} */
    SemVideoContainerComponent.prototype.widget;
    /** @type {?} */
    SemVideoContainerComponent.prototype.isOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.isTestAOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.paginationConfig;
    /** @type {?} */
    SemVideoContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlDLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFtRGhILE1BQU07Ozs7SUFpQkosWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWhCL0IsV0FBTSxHQUFHO1lBQ2QsYUFBYSxFQUFFLEVBQUU7WUFDakIsSUFBSSxFQUFFO2dCQUNGLFNBQVMsRUFBRSwwQkFBMEI7Z0JBQ3JDLFlBQVksRUFBRSxhQUFhO2dCQUMzQixXQUFXLEVBQUUsbUtBQW1LO2dCQUNoTCxZQUFZLEVBQUUsa0RBQWtEO2dCQUNoRSxLQUFLLEVBQUUsZ0RBQWdEO2dCQUN2RCxPQUFPLEVBQUUsYUFBYTthQUN2QjtTQUNKLENBQUM7UUFJSyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQVE3QixxQkFBZ0IsR0FBdUI7WUFDckMsRUFBRSxFQUFFLFFBQVE7WUFDWixZQUFZLEVBQUUsQ0FBQztZQUNmLFdBQVcsRUFBRSxDQUFDO1NBQ2YsQ0FBQztRQVRBLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEtBQUssNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELENBQUM7SUFDSCxDQUFDOzs7OztJQU1ELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN6QyxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFJO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7Ozs7SUFDRCxRQUFRLEtBQUksQ0FBQzs7Ozs7SUFDYixZQUFZLENBQUMsSUFBSSxJQUFTLENBQUM7Ozs7O0lBRTNCLFNBQVMsQ0FBQyxRQUFpQjtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztJQUNoQyxDQUFDOzs7WUF2RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F5Q1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsa0hBQWtILENBQUM7YUFDN0g7OztZQWxEMEQsUUFBUTs7OztJQW9EakUsNENBVUU7O0lBR0YsOENBQXlCOztJQUN6QixtREFBNkI7O0lBUTdCLHNEQUlFOztJQVZVLDhDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0ICwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgIE91dHB1dCwgSW5qZWN0b3IsIFZpZXdDaGlsZCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFlvdXR1YmVWaWRlb01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcbmltcG9ydCB7IFBhZ2luYXRpb25JbnN0YW5jZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IFNlbVZpZGVvU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS12aWRlby5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLXZpZGVvLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJlbWJlZC1jb250YWluZXJcIiAqbmdJZj1cIndpZGdldC5kYXRhLmhhc093blByb3BlcnR5KCd2aWRlb0lkJylcIj5cbiAgICA8aWZyYW1lIHdpZHRoPVwiMTAwJVwiXG4gICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgZnJhbWVib3JkZXI9XCIwXCJcbiAgICBhbGxvd2Z1bGxzY3JlZW5cbiAgICBbc3JjXT1cIndpZGdldC5kYXRhLnZpZGVvSWQgfCB5b3V0dWJlU2FmZVVybFwiXG4gICAgc3R5bGU9XCJib3JkZXI6IHNvbGlkIDFweCBibGFja1wiID5cbiAgICA8L2lmcmFtZT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lci0tbmF2XCI+XG4gICAgPGJ1dHRvblxuICAgICAgc2VtLWJ0bi1mYWJcbiAgICAgIGNvcm5lcj1cInRvcC1yaWdodFwiXG4gICAgICBzZW11aS10aGVtZT1cImxpZ2h0XCJcbiAgICAgIGNsYXNzPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBcIlxuICAgICAgc2VtLWltcG9ydGFuY2U9XCJzZWNvbmRhcnlcIlxuICAgICAgI2NoYXRPdmVybGF5PVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgICBjZGtPdmVybGF5T3JpZ2luXG4gICAgICAoY2xpY2spPVwib3BlblRlc3RBKCFpc1Rlc3RBT3BlbmVkKVwiXG4gICAgPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXByb2ZpbGUtYWNjZW50XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGF0aDFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJwYXRoMlwiPjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxzZW11aS1vdmVybGF5LWRpYWxvZ1xuICAgICAgW292ZXJsYXlPcmlnaW5dPVwiY2hhdE92ZXJsYXlcIlxuICAgICAgW2lzT3BlbmVkXT1cImlzVGVzdEFPcGVuZWRcIlxuICAgICAgKGNsb3NlKT1cIm9wZW5UZXN0QShmYWxzZSlcIlxuICAgICAgKG9wZW4pPVwib3BlblRlc3RBKHRydWUpXCJcbiAgICAgIFtvdmVybGF5V2lkdGhdPVwiJ2F1dG8nXCJcbiAgICA+XG4gICAgICAgIDxzZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWxcbiAgICAgICAgICBbY29uZmlnXT1cInBhZ2luYXRpb25Db25maWdcIlxuICAgICAgICAgIChzZWxlY3RlZCk9XCJzZWxlY3RlZEl0ZW0oJGV2ZW50KVwiXG4gICAgICAgICAgKGNsb3NlKT1cImNsb3NlT3ZlcmxheSgkZXZlbnQpXCI+XG4gICAgICAgIDwvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsPlxuXG4gICAgPC9zZW11aS1vdmVybGF5LWRpYWxvZz5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdHtiYWNrZ3JvdW5kLWNvbG9yOiNmNWU1ZTU7ZGlzcGxheTpibG9jaztib3JkZXI6MXB4IHNvbGlkICM4YjAwMDA7aGVpZ2h0OjEwMCV9LmVtYmVkLWNvbnRhaW5lcntoZWlnaHQ6MTAwdmh9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgd2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudE5hbWU6ICcnLFxuICAgIGRhdGE6IHtcbiAgICAgICAgY2hhbm5lbElkOiAnVUM0cmxBVmdBSzBTR2steVRmZTQ4UXB3JyxcbiAgICAgICAgY2hhbm5lbFRpdGxlOiAnQlJJR0hUIFNJREUnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0hvdyB0byBTdGF5IEhlYWx0aHkuIFdlIGFsbCBoYXZlIGRheXMgd2hlbiB3ZSBmZWVsIGFic29sdXRlbHkgZXhoYXVzdGVkIG9yIHNvbWV0aW1lcyBhIGxpdHRsZSBkb3duIGluIHRoZSBkdW1wcy4gQnV0IGlmIHlvdSBmaW5kIHlvdXJzZWxmIGNvbnN0YW50bHkgY2F0Y2hpbmcgLi4uJyxcbiAgICAgICAgdGh1bWJuYWlsVXJsOiAnaHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9reW9TMWVkWTV0TS9ocWRlZmF1bHQuanBnJyxcbiAgICAgICAgdGl0bGU6ICcxMCBXYXJuaW5nIFNpZ25zIFlvdSBIYXZlIFZpdGFtaW4gRCBEZWZpY2llbmN5JyxcbiAgICAgICAgdmlkZW9JZDogJ2t5b1MxZWRZNXRNJ1xuICAgICAgfVxuICB9O1xuXG5cbiAgcHVibGljIGlzT3BlbmVkOiBib29sZWFuO1xuICBwdWJsaWMgaXNUZXN0QU9wZW5lZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLmluamVjdG9yLmdldCgnd2lkZ2V0Jyk7XG4gICAgaWYodGhpcy53aWRnZXQuY29tcG9uZW50TmFtZSA9PT0gJ1NlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50Jykge1xuICAgICAgY29uc29sZS5sb2coJ0dvdCB0aGUgd3lzaXd5ZyBkYXRhJywgdGhpcy53aWRnZXQpO1xuICAgIH1cbiAgfVxuICBwYWdpbmF0aW9uQ29uZmlnOiBQYWdpbmF0aW9uSW5zdGFuY2UgPSB7XG4gICAgaWQ6ICdjdXN0b20nLFxuICAgIGl0ZW1zUGVyUGFnZTogMixcbiAgICBjdXJyZW50UGFnZTogMVxuICB9O1xuICBzZWFyY2gocXVlcnkpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygncXVlcnkgaXMgb3V0cHV0ZWQnLCBxdWVyeSlcbiAgfVxuXG4gIHNlbGVjdGVkSXRlbShpdGVtKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ2l0ZW0gc2VsZWN0JywgaXRlbSlcbiAgICB0aGlzLndpZGdldC5kYXRhID0gaXRlbTtcbiAgfVxuICBuZ09uSW5pdCgpIHt9XG4gIGNsb3NlT3ZlcmxheShpdGVtKTogdm9pZCB7fVxuXG4gIG9wZW5UZXN0QShpc09wZW5lZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IGlzT3BlbmVkO1xuICB9XG5cblxufVxuIl19