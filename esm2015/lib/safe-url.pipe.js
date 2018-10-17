/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class YoutubeSafeUrlPipe {
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
if (false) {
    /** @type {?} */
    YoutubeSafeUrlPipe.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZS11cmwucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmcm9udHIvc2VtLW1lZGlhLyIsInNvdXJjZXMiOlsibGliL3NhZmUtdXJsLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBQyxZQUFZLEVBQWtCLE1BQU0sMkJBQTJCLENBQUM7QUFLeEUsTUFBTTs7OztJQUVKLFlBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFFM0MsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsT0FBZTtRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FDbEQsaUNBQWlDLE9BQU8sYUFBYSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7O1lBWkYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxnQkFBZ0I7YUFDdkI7OztZQUpPLFlBQVk7Ozs7SUFPTix1Q0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQFBpcGUoe1xuICBuYW1lOiAneW91dHViZVNhZmVVcmwnXG59KVxuZXhwb3J0IGNsYXNzIFlvdXR1YmVTYWZlVXJsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpe1xuXG4gIH1cblxuICB0cmFuc2Zvcm0odmlkZW9JZDogc3RyaW5nKTogU2FmZVJlc291cmNlVXJsIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKFxuICAgICAgYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dmlkZW9JZH0/YXV0b3BsYXk9MWApO1xuICB9XG5cbn1cbiJdfQ==