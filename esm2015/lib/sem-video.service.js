/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class SemVideoService {
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
        &type=video
        &key=AIzaSyCDiEBQi95UDuEZt9Z0SwG6PedffYjTumk`);
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
/** @nocollapse */ SemVideoService.ngInjectableDef = i0.defineInjectable({ factory: function SemVideoService_Factory() { return new SemVideoService(i0.inject(i1.HttpClient), i0.inject(i0.PLATFORM_ID)); }, token: SemVideoService, providedIn: "root" });
if (false) {
    /** @type {?} */
    SemVideoService.prototype.http;
    /** @type {?} */
    SemVideoService.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9zZW0tdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBSWxELE1BQU07Ozs7O0lBRUosWUFBb0QsSUFBZ0IsRUFBOEIsVUFBa0I7UUFBaEUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUE4QixlQUFVLEdBQVYsVUFBVSxDQUFRO0lBQUksQ0FBQzs7Ozs7SUFFbEgsV0FBVyxDQUFDLEtBQWE7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLDRFQUE0RSxLQUFLOztxREFFdkMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7OztZQVpGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBSFEsVUFBVSx1QkFNSCxNQUFNLFNBQUMsVUFBVTtZQUErRSxNQUFNLHVCQUE3QyxNQUFNLFNBQUMsV0FBVzs7Ozs7SUFBNUUsK0JBQXVEOztJQUFFLHFDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvciggQEluamVjdChIdHRwQ2xpZW50KSBwcm90ZWN0ZWQgcmVhZG9ubHkgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChQTEFURk9STV9JRCkgcHVibGljIHBsYXRmb3JtSWQ6IE9iamVjdCkgeyB9XG5cbiAgcHVibGljIGZldGNoVmlkZW9zKHF1ZXJ5OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQoYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvc2VhcmNoP3BhcnQ9c25pcHBldCZtYXhSZXN1bHRzPTUmcT0ke3F1ZXJ5fVxuICAgICAgICAmdHlwZT12aWRlb1xuICAgICAgICAma2V5PUFJemFTeUNEaUVCUWk5NVVEdUVadDlaMFN3RzZQZWRmZllqVHVta2ApO1xuICB9XG59XG4iXX0=