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
                template: `<button style="position: fixed; right: 0px;top:0px;" (click)="selectedItem({test: 'sadasds'})">uuuuu</button>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsWUFBWSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQW9EaEgsTUFBTTs7OztJQW1CSixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBTDVCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBR3hDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBUTdCLHFCQUFnQixHQUF1QjtZQUNyQyxFQUFFLEVBQUUsUUFBUTtZQUNaLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLENBQUM7U0FDZixDQUFDO1FBVEEsNkNBQTZDO1FBQzdDLG1FQUFtRTtRQUNuRSxzREFBc0Q7UUFDdEQsSUFBSTtJQUNOLENBQUM7Ozs7O0lBTUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQUk7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQiwyQkFBMkI7SUFDN0IsQ0FBQzs7OztJQUNELFFBQVEsS0FBSSxDQUFDOzs7OztJQUNiLFlBQVksQ0FBQyxJQUFJLElBQVMsQ0FBQzs7Ozs7SUFFM0IsU0FBUyxDQUFDLFFBQWlCO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLENBQUM7OztZQTNGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EwQ1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsd0VBQXdFLENBQUM7YUFDbkY7OztZQW5EMEQsUUFBUTs7O21CQWlFaEUsS0FBSzt5QkFDTCxNQUFNOzs7O0lBRFAsMENBQWM7O0lBQ2QsZ0RBQStDOztJQUUvQyw4Q0FBeUI7O0lBQ3pCLG1EQUE2Qjs7SUFRN0Isc0RBSUU7O0lBVlUsOENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgLCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWW91dHViZVZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdmlkZW8nO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tdmlkZW8tY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIHN0eWxlPVwicG9zaXRpb246IGZpeGVkOyByaWdodDogMHB4O3RvcDowcHg7XCIgKGNsaWNrKT1cInNlbGVjdGVkSXRlbSh7dGVzdDogJ3NhZGFzZHMnfSlcIj51dXV1dTwvYnV0dG9uPlxuPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJlbWJlZC1jb250YWluZXJcIiAqbmdJZj1cImRhdGEuaGFzT3duUHJvcGVydHkoJ3ZpZGVvSWQnKVwiPlxuICAgIDxpZnJhbWUgd2lkdGg9XCIxMDAlXCJcbiAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICBmcmFtZWJvcmRlcj1cIjBcIlxuICAgIGFsbG93ZnVsbHNjcmVlblxuICAgIFtzcmNdPVwiZGF0YS52aWRlb0lkIHwgeW91dHViZVNhZmVVcmxcIlxuICAgIHN0eWxlPVwiYm9yZGVyOiBzb2xpZCAxcHggYmxhY2tcIiA+XG4gICAgPC9pZnJhbWU+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXItLW5hdlwiPlxuICAgIDxidXR0b25cbiAgICAgIHNlbS1idG4tZmFiXG4gICAgICBjb3JuZXI9XCJ0b3AtcmlnaHRcIlxuICAgICAgc2VtdWktdGhlbWU9XCJsaWdodFwiXG4gICAgICBjbGFzcz1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgXCJcbiAgICAgIHNlbS1pbXBvcnRhbmNlPVwic2Vjb25kYXJ5XCJcbiAgICAgICNjaGF0T3ZlcmxheT1cImNka092ZXJsYXlPcmlnaW5cIlxuICAgICAgY2RrT3ZlcmxheU9yaWdpblxuICAgICAgKGNsaWNrKT1cIm9wZW5UZXN0QSghaXNUZXN0QU9wZW5lZClcIlxuICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1wcm9maWxlLWFjY2VudFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBhdGgxXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwicGF0aDJcIj48L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8c2VtdWktb3ZlcmxheS1kaWFsb2dcbiAgICAgIFtvdmVybGF5T3JpZ2luXT1cImNoYXRPdmVybGF5XCJcbiAgICAgIFtpc09wZW5lZF09XCJpc1Rlc3RBT3BlbmVkXCJcbiAgICAgIChjbG9zZSk9XCJvcGVuVGVzdEEoZmFsc2UpXCJcbiAgICAgIChvcGVuKT1cIm9wZW5UZXN0QSh0cnVlKVwiXG4gICAgICBbb3ZlcmxheVdpZHRoXT1cIidhdXRvJ1wiXG4gICAgPlxuICAgICAgICA8c2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsXG4gICAgICAgICAgW2NvbmZpZ109XCJwYWdpbmF0aW9uQ29uZmlnXCJcbiAgICAgICAgICAoc2VsZWN0ZWQpPVwic2VsZWN0ZWRJdGVtKCRldmVudClcIlxuICAgICAgICAgIChjbG9zZSk9XCJjbG9zZU92ZXJsYXkoJGV2ZW50KVwiPlxuICAgICAgICA8L3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbD5cblxuICAgIDwvc2VtdWktb3ZlcmxheS1kaWFsb2c+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7YmFja2dyb3VuZC1jb2xvcjojZjVlNWU1O2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjOGIwMDAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8gcHVibGljIHdpZGdldCA9IHtcbiAgLy8gICBjb21wb25lbnROYW1lOiAnJyxcbiAgLy8gICBkYXRhOiB7XG4gIC8vICAgICAgIGNoYW5uZWxJZDogJ1VDNHJsQVZnQUswU0drLXlUZmU0OFFwdycsXG4gIC8vICAgICAgIGNoYW5uZWxUaXRsZTogJ0JSSUdIVCBTSURFJyxcbiAgLy8gICAgICAgZGVzY3JpcHRpb246ICdIb3cgdG8gU3RheSBIZWFsdGh5LiBXZSBhbGwgaGF2ZSBkYXlzIHdoZW4gd2UgZmVlbCBhYnNvbHV0ZWx5IGV4aGF1c3RlZCBvciBzb21ldGltZXMgYSBsaXR0bGUgZG93biBpbiB0aGUgZHVtcHMuIEJ1dCBpZiB5b3UgZmluZCB5b3Vyc2VsZiBjb25zdGFudGx5IGNhdGNoaW5nIC4uLicsXG4gIC8vICAgICAgIHRodW1ibmFpbFVybDogJ2h0dHBzOi8vaS55dGltZy5jb20vdmkva3lvUzFlZFk1dE0vaHFkZWZhdWx0LmpwZycsXG4gIC8vICAgICAgIHRpdGxlOiAnMTAgV2FybmluZyBTaWducyBZb3UgSGF2ZSBWaXRhbWluIEQgRGVmaWNpZW5jeScsXG4gIC8vICAgICAgIHZpZGVvSWQ6ICdreW9TMWVkWTV0TSdcbiAgLy8gICAgIH1cbiAgLy8gfTtcblxuICBASW5wdXQoKSBkYXRhO1xuICBAT3V0cHV0KCkgZGF0YUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyBpc09wZW5lZDogYm9vbGVhbjtcbiAgcHVibGljIGlzVGVzdEFPcGVuZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIC8vIHRoaXMud2lkZ2V0ID0gdGhpcy5pbmplY3Rvci5nZXQoJ3dpZGdldCcpO1xuICAgIC8vIGlmKHRoaXMud2lkZ2V0LmNvbXBvbmVudE5hbWUgPT09ICdTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudCcpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdHb3QgdGhlIHd5c2l3eWcgZGF0YScsIHRoaXMud2lkZ2V0KTtcbiAgICAvLyB9XG4gIH1cbiAgcGFnaW5hdGlvbkNvbmZpZzogUGFnaW5hdGlvbkluc3RhbmNlID0ge1xuICAgIGlkOiAnY3VzdG9tJyxcbiAgICBpdGVtc1BlclBhZ2U6IDIsXG4gICAgY3VycmVudFBhZ2U6IDFcbiAgfTtcbiAgc2VhcmNoKHF1ZXJ5KTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ3F1ZXJ5IGlzIG91dHB1dGVkJywgcXVlcnkpXG4gIH1cblxuICBzZWxlY3RlZEl0ZW0oaXRlbSk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdpdGVtIHNlbGVjdCcsIGl0ZW0pXG4gICAgdGhpcy5kYXRhQ2hhbmdlLmVtaXQoaXRlbSk7XG4gICAgLy8gdGhpcy53aWRnZXQuZGF0YSA9IGl0ZW07XG4gIH1cbiAgbmdPbkluaXQoKSB7fVxuICBjbG9zZU92ZXJsYXkoaXRlbSk6IHZvaWQge31cblxuICBvcGVuVGVzdEEoaXNPcGVuZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzVGVzdEFPcGVuZWQgPSBpc09wZW5lZDtcbiAgfVxuXG5cbn1cbiJdfQ==