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
    }
    /**
     * @param {?} item
     * @return {?}
     */
    selectedItem(item) {
        // this.dataChange.emit(item);
        // TODO Need enable this when you test it
        this.data = item;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} toggleStatus
     * @return {?}
     */
    closeOverlay(toggleStatus) {
        this.isTestAOpened = toggleStatus;
    }
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
                // tslint:disable-next-line:component-selector,
                selector: '[sem-video-container]',
                template: `
<div class="sem-dnd-container">
  <div class="embed-container" *ngIf="data && data.hasOwnProperty('videoId')">
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
        <div sem-video-settings-panel
          [config]="paginationConfig"
          (selected)="selectedItem($event)"
          (close)="closeOverlay($event)">
        </div>

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
    SemVideoContainerComponent.prototype.isTestAOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.paginationConfig;
    /** @type {?} */
    SemVideoContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsWUFBWSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQXFEaEgsTUFBTTs7OztJQUlKLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFGNUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFN0IscUJBQWdCLEdBQXVCO1lBQ3JDLEVBQUUsRUFBRSxRQUFRO1lBQ1osWUFBWSxFQUFFLENBQUM7WUFDZixXQUFXLEVBQUUsQ0FBQztTQUNmLENBQUM7SUFMdUMsQ0FBQzs7Ozs7SUFNMUMsWUFBWSxDQUFDLElBQXVCO1FBQ2xDLDhCQUE4QjtRQUM5Qix5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7OztJQUNELFFBQVEsS0FBSSxDQUFDOzs7OztJQUNiLFlBQVksQ0FBQyxZQUFxQjtRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztJQUNwQyxDQUFDOzs7OztJQUNELFNBQVMsQ0FBQyxRQUFpQjtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztJQUNoQyxDQUFDOzs7WUFyRUYsU0FBUyxTQUFDOztnQkFFVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBDWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyx3RUFBd0UsQ0FBQzthQUNuRjs7O1lBcEQwRCxRQUFROzs7bUJBc0RoRSxLQUFLO3lCQUNMLE1BQU07Ozs7SUFEUCwwQ0FBaUM7O0lBQ2pDLGdEQUErQzs7SUFDL0MsbURBQTZCOztJQUU3QixzREFJRTs7SUFMVSw4Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCAsIEV2ZW50RW1pdHRlciwgSW5wdXQsICBPdXRwdXQsIEluamVjdG9yLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBZb3V0dWJlVmlkZW9Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy92aWRlbyc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSW5zdGFuY2UgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBTZW1WaWRlb1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tdmlkZW8uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yLFxuICBzZWxlY3RvcjogJ1tzZW0tdmlkZW8tY29udGFpbmVyXScsXG4gIHRlbXBsYXRlOiBgXG48ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cImVtYmVkLWNvbnRhaW5lclwiICpuZ0lmPVwiZGF0YSAmJiBkYXRhLmhhc093blByb3BlcnR5KCd2aWRlb0lkJylcIj5cbiAgICA8aWZyYW1lIHdpZHRoPVwiMTAwJVwiXG4gICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgZnJhbWVib3JkZXI9XCIwXCJcbiAgICBhbGxvd2Z1bGxzY3JlZW5cbiAgICBbc3JjXT1cImRhdGEudmlkZW9JZCB8IHlvdXR1YmVTYWZlVXJsXCJcbiAgICBzdHlsZT1cImJvcmRlcjogc29saWQgMXB4IGJsYWNrXCIgPlxuICAgIDwvaWZyYW1lPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyLS1uYXZcIj5cbiAgICA8YnV0dG9uXG4gICAgICBzZW0tYnRuLWZhYlxuICAgICAgY29ybmVyPVwidG9wLXJpZ2h0XCJcbiAgICAgIHNlbXVpLXRoZW1lPVwibGlnaHRcIlxuICAgICAgY2xhc3M9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIFwiXG4gICAgICBzZW0taW1wb3J0YW5jZT1cInNlY29uZGFyeVwiXG4gICAgICAjY2hhdE92ZXJsYXk9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAgIChjbGljayk9XCJvcGVuVGVzdEEoIWlzVGVzdEFPcGVuZWQpXCJcbiAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcHJvZmlsZS1hY2NlbnRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRoMVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInBhdGgyXCI+PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPHNlbXVpLW92ZXJsYXktZGlhbG9nXG4gICAgICBbb3ZlcmxheU9yaWdpbl09XCJjaGF0T3ZlcmxheVwiXG4gICAgICBbaXNPcGVuZWRdPVwiaXNUZXN0QU9wZW5lZFwiXG4gICAgICAoY2xvc2UpPVwib3BlblRlc3RBKGZhbHNlKVwiXG4gICAgICAob3Blbik9XCJvcGVuVGVzdEEodHJ1ZSlcIlxuICAgICAgW292ZXJsYXlXaWR0aF09XCInYXV0bydcIlxuICAgID5cbiAgICAgICAgPGRpdiBzZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWxcbiAgICAgICAgICBbY29uZmlnXT1cInBhZ2luYXRpb25Db25maWdcIlxuICAgICAgICAgIChzZWxlY3RlZCk9XCJzZWxlY3RlZEl0ZW0oJGV2ZW50KVwiXG4gICAgICAgICAgKGNsb3NlKT1cImNsb3NlT3ZlcmxheSgkZXZlbnQpXCI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9zZW11aS1vdmVybGF5LWRpYWxvZz5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdHtiYWNrZ3JvdW5kLWNvbG9yOiNmNWU1ZTU7ZGlzcGxheTpibG9jaztib3JkZXI6MXB4IHNvbGlkICM4YjAwMDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhOiBZb3V0dWJlVmlkZW9Nb2RlbDtcbiAgQE91dHB1dCgpIGRhdGFDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHVibGljIGlzVGVzdEFPcGVuZWQgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHt9XG4gIHBhZ2luYXRpb25Db25maWc6IFBhZ2luYXRpb25JbnN0YW5jZSA9IHtcbiAgICBpZDogJ2N1c3RvbScsXG4gICAgaXRlbXNQZXJQYWdlOiAyLFxuICAgIGN1cnJlbnRQYWdlOiAxXG4gIH07XG4gIHNlbGVjdGVkSXRlbShpdGVtOiBZb3V0dWJlVmlkZW9Nb2RlbCk6IHZvaWQge1xuICAgIC8vIHRoaXMuZGF0YUNoYW5nZS5lbWl0KGl0ZW0pO1xuICAgIC8vIFRPRE8gTmVlZCBlbmFibGUgdGhpcyB3aGVuIHlvdSB0ZXN0IGl0XG4gICAgdGhpcy5kYXRhID0gaXRlbTtcbiAgfVxuICBuZ09uSW5pdCgpIHt9XG4gIGNsb3NlT3ZlcmxheSh0b2dnbGVTdGF0dXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzVGVzdEFPcGVuZWQgPSB0b2dnbGVTdGF0dXM7XG4gIH1cbiAgb3BlblRlc3RBKGlzT3BlbmVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gaXNPcGVuZWQ7XG4gIH1cblxuXG59XG4iXX0=