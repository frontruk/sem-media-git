/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
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
export { SlidePanelComponent };
if (false) {
    /** @type {?} */
    SlidePanelComponent.prototype.activePane;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZyb250ci9zZW0tbWVkaWEvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zbGlkZS1wYW5lbC9zbGlkZS1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUxRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBS2pGO0lBQUE7UUFpQlcsZUFBVSxHQUFhLE1BQU0sQ0FBQztJQUN6QyxDQUFDOztnQkFsQkEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLE1BQU0sRUFBRSxDQUFDLDJIQUEySCxDQUFDO29CQUNySSxRQUFRLEVBQUUsb0xBR0w7b0JBQ0wsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFVBQVUsRUFBRTt3QkFDVixPQUFPLENBQUMsT0FBTyxFQUFFOzRCQUNmLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7NEJBQ3BELEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQzs0QkFDeEQsVUFBVSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDNUMsQ0FBQztxQkFDSDtpQkFDRjs7OzZCQUVFLEtBQUs7O0lBQ1IsMEJBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQUZZLG1CQUFtQjs7O0lBQzlCLHlDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBpbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFBhbmVUeXBlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tc2xpZGUtcGFuZWwnLFxuICBzdHlsZXM6IFtgOmhvc3R7ZGlzcGxheTpibG9jaztvdmVyZmxvdzpoaWRkZW59LnBhbmVze2hlaWdodDoxMDAlO3dpZHRoOjIwMCU7dHJhbnNpdGlvbi1kdXJhdGlvbjouNXM7ZGlzcGxheTpmbGV4fS5wYW5lcyBkaXZ7ZmxleDoxfWBdLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYW5lc1wiIFtAc2xpZGVdPVwiYWN0aXZlUGFuZVwiPlxuICA8ZGl2PjxuZy1jb250ZW50IHNlbGVjdD1cIltsZWZ0UGFuZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gIDxkaXY+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW3JpZ2h0UGFuZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG48L2Rpdj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3NsaWRlJywgW1xuICAgICAgc3RhdGUoJ2xlZnQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknIH0pKSxcbiAgICAgIHN0YXRlKCdyaWdodCcsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScgfSkpLFxuICAgICAgdHJhbnNpdGlvbignbGVmdCA8PT4gcmlnaHQnLCBhbmltYXRlKCcxcycpKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVQYW5lbENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGFjdGl2ZVBhbmU6IFBhbmVUeXBlID0gJ2xlZnQnO1xufVxuIl19