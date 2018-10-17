import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class SemVideoService {
    protected readonly http: HttpClient;
    platformId: Object;
    constructor(http: HttpClient, platformId: Object);
    fetchVideos(query: string): Observable<Object>;
}
