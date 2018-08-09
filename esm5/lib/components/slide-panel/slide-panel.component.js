/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
/** @typedef {?} */
var PaneType;
export { PaneType };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZyb250ci9zZW0tbWVkaWEvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zbGlkZS1wYW5lbC9zbGlkZS1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OzswQkFxQi9DLE1BQU07OztnQkFqQnZDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixNQUFNLEVBQUUsQ0FBQywySEFBMkgsQ0FBQztvQkFDckksUUFBUSxFQUFFLG9MQUdMO29CQUNMLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxVQUFVLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLE9BQU8sRUFBRTs0QkFDZixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDOzRCQUNwRCxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7NEJBQ3hELFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzVDLENBQUM7cUJBQ0g7aUJBQ0Y7Ozs2QkFFRSxLQUFLOzs4QkF2QlI7O1NBc0JhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBpbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFBhbmVUeXBlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLXNsaWRlLXBhbmVsJyxcbiAgc3R5bGVzOiBbYDpob3N0e2Rpc3BsYXk6YmxvY2s7b3ZlcmZsb3c6aGlkZGVufS5wYW5lc3toZWlnaHQ6MTAwJTt3aWR0aDoyMDAlO3RyYW5zaXRpb24tZHVyYXRpb246LjVzO2Rpc3BsYXk6ZmxleH0ucGFuZXMgZGl2e2ZsZXg6MX1gXSxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFuZXNcIiBbQHNsaWRlXT1cImFjdGl2ZVBhbmVcIj5cbiAgPGRpdj48bmctY29udGVudCBzZWxlY3Q9XCJbbGVmdFBhbmVdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICA8ZGl2PjxuZy1jb250ZW50IHNlbGVjdD1cIltyaWdodFBhbmVdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuPC9kaXY+YCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdzbGlkZScsIFtcbiAgICAgIHN0YXRlKCdsZWZ0Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJyB9KSksXG4gICAgICBzdGF0ZSgncmlnaHQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2xlZnQgPD0+IHJpZ2h0JywgYW5pbWF0ZSgnMXMnKSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlUGFuZWxDb21wb25lbnQge1xuICBASW5wdXQoKSBhY3RpdmVQYW5lOiBQYW5lVHlwZSA9ICdsZWZ0Jztcbn1cbiJdfQ==