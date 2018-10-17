/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SemMediaPanelSettingsComponent } from './containers/sem-media-panel/sem-media-panel.component';
import { SemUploadComponent } from './components/media-image-upload/media-upload.component';
import { SemCropperComponent } from './components/media-cropper/media-cropper.component';
import { SemControlsComponent } from './components/media-controls/media-controls.compnent';
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';
import { SemMediaSettingsComponent } from './containers/sem-media-settings/sem-media-settings.component';
import { MediaEditComponent } from './components/media-edit/media-edit.component';
import { SemMediaContainerComponent } from './containers/sem-media-container/sem-media-container.component';
import { SemUiKitSharedModule } from './sem-ui-shared.module';
import { SemMaterialSharedModule } from './sem-material-shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FileDropModule } from 'ngx-file-drop';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { YoutubeSafeUrlPipe } from './safe-url.pipe';
import { SemVideoSettingsPanelComponent } from './containers/sem-video-settings-panel/sem-video-settings-panel.component';
import { SemVideoContainerComponent } from './containers/sem-video-container/sem-video-container.component';
import { SemVideoService } from './sem-video.service';
import { SemMediaService } from './sem-media.service';
export class SemMediaModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: SemMediaModule,
            providers: [SemMediaService, SemVideoService]
        };
    }
}
SemMediaModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    HttpClientModule,
                    NgxPaginationModule,
                    ReactiveFormsModule,
                    ImageCropperModule,
                    FileDropModule,
                    AngularCropperjsModule,
                    BrowserAnimationsModule,
                    SemMaterialSharedModule,
                    SemUiKitSharedModule
                ],
                declarations: [
                    SemMediaPanelSettingsComponent,
                    SemUploadComponent,
                    SemCropperComponent,
                    SemControlsComponent,
                    SemMediaSettingsComponent,
                    MediaEditComponent,
                    SlidePanelComponent,
                    SemMediaContainerComponent,
                    YoutubeSafeUrlPipe,
                    SemVideoSettingsPanelComponent,
                    SemVideoContainerComponent,
                ],
                exports: [
                    SemMediaPanelSettingsComponent,
                    SemUploadComponent,
                    SemCropperComponent,
                    SemControlsComponent,
                    SemMediaSettingsComponent,
                    MediaEditComponent,
                    SlidePanelComponent,
                    SemMediaContainerComponent,
                    SemVideoSettingsPanelComponent,
                    SemVideoContainerComponent
                ],
                providers: [
                    SemMediaService,
                    SemVideoService
                ]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLW1lZGlhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmcm9udHIvc2VtLW1lZGlhLyIsInNvdXJjZXMiOlsibGliL3NlbS1tZWRpYS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLFdBQVcsRUFDWCxtQkFBbUIsRUFDcEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDeEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDNUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDekYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDM0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDckYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDekcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDNUcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUMxSCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBK0N0RCxNQUFNOzs7O0lBQ0osTUFBTSxDQUFDLE9BQU87UUFDWixNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO1NBQzlDLENBQUE7SUFDSCxDQUFDOzs7WUFsREYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsZ0JBQWdCO29CQUNoQixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLHNCQUFzQjtvQkFDdEIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLG9CQUFvQjtpQkFDckI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLDhCQUE4QjtvQkFDOUIsa0JBQWtCO29CQUNsQixtQkFBbUI7b0JBQ25CLG9CQUFvQjtvQkFDcEIseUJBQXlCO29CQUN6QixrQkFBa0I7b0JBQ2xCLG1CQUFtQjtvQkFDbkIsMEJBQTBCO29CQUMxQixrQkFBa0I7b0JBQ2xCLDhCQUE4QjtvQkFDOUIsMEJBQTBCO2lCQUMzQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsOEJBQThCO29CQUM5QixrQkFBa0I7b0JBQ2xCLG1CQUFtQjtvQkFDbkIsb0JBQW9CO29CQUNwQix5QkFBeUI7b0JBQ3pCLGtCQUFrQjtvQkFDbEIsbUJBQW1CO29CQUNuQiwwQkFBMEI7b0JBQzFCLDhCQUE4QjtvQkFDOUIsMEJBQTBCO2lCQUMzQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsZUFBZTtvQkFDZixlQUFlO2lCQUNoQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgTmdNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGb3Jtc01vZHVsZSxcbiAgUmVhY3RpdmVGb3Jtc01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IFNlbU1lZGlhUGFuZWxTZXR0aW5nc0NvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9zZW0tbWVkaWEtcGFuZWwvc2VtLW1lZGlhLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1VcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtaW1hZ2UtdXBsb2FkL21lZGlhLXVwbG9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtQ3JvcHBlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1jcm9wcGVyL21lZGlhLWNyb3BwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbUNvbnRyb2xzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21lZGlhLWNvbnRyb2xzL21lZGlhLWNvbnRyb2xzLmNvbXBuZW50JztcbmltcG9ydCB7IFNsaWRlUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2xpZGUtcGFuZWwvc2xpZGUtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbU1lZGlhU2V0dGluZ3NDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXNldHRpbmdzL3NlbS1tZWRpYS1zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVkaWFFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21lZGlhLWVkaXQvbWVkaWEtZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtTWVkaWFDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLW1lZGlhLWNvbnRhaW5lci9zZW0tbWVkaWEtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1VaUtpdFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2VtLXVpLXNoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgU2VtTWF0ZXJpYWxTaGFyZWRNb2R1bGUgfSBmcm9tICcuL3NlbS1tYXRlcmlhbC1zaGFyZWQubW9kdWxlJztcblxuaW1wb3J0IHsgSW1hZ2VDcm9wcGVyTW9kdWxlIH0gZnJvbSAnbmd4LWltYWdlLWNyb3BwZXInO1xuaW1wb3J0IHsgRmlsZURyb3BNb2R1bGUgfSBmcm9tICduZ3gtZmlsZS1kcm9wJztcbmltcG9ydCB7IEFuZ3VsYXJDcm9wcGVyanNNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWNyb3BwZXJqcyc7XG5cbmltcG9ydCB7IE5neFBhZ2luYXRpb25Nb2R1bGUgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBZb3V0dWJlU2FmZVVybFBpcGUgfSBmcm9tICcuL3NhZmUtdXJsLnBpcGUnO1xuXG5pbXBvcnQgeyBTZW1WaWRlb1NldHRpbmdzUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsL3NlbS12aWRlby1zZXR0aW5ncy1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2VtLXZpZGVvLWNvbnRhaW5lci9zZW0tdmlkZW8tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1WaWRlb1NlcnZpY2UgfSBmcm9tICcuL3NlbS12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbU1lZGlhU2VydmljZSB9IGZyb20gJy4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBOZ3hQYWdpbmF0aW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgSW1hZ2VDcm9wcGVyTW9kdWxlLFxuICAgIEZpbGVEcm9wTW9kdWxlLFxuICAgIEFuZ3VsYXJDcm9wcGVyanNNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgU2VtTWF0ZXJpYWxTaGFyZWRNb2R1bGUsXG4gICAgU2VtVWlLaXRTaGFyZWRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2VtTWVkaWFQYW5lbFNldHRpbmdzQ29tcG9uZW50LFxuICAgIFNlbVVwbG9hZENvbXBvbmVudCxcbiAgICBTZW1Dcm9wcGVyQ29tcG9uZW50LFxuICAgIFNlbUNvbnRyb2xzQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhU2V0dGluZ3NDb21wb25lbnQsXG4gICAgTWVkaWFFZGl0Q29tcG9uZW50LFxuICAgIFNsaWRlUGFuZWxDb21wb25lbnQsXG4gICAgU2VtTWVkaWFDb250YWluZXJDb21wb25lbnQsXG4gICAgWW91dHViZVNhZmVVcmxQaXBlLFxuICAgIFNlbVZpZGVvU2V0dGluZ3NQYW5lbENvbXBvbmVudCxcbiAgICBTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNlbU1lZGlhUGFuZWxTZXR0aW5nc0NvbXBvbmVudCxcbiAgICBTZW1VcGxvYWRDb21wb25lbnQsXG4gICAgU2VtQ3JvcHBlckNvbXBvbmVudCxcbiAgICBTZW1Db250cm9sc0NvbXBvbmVudCxcbiAgICBTZW1NZWRpYVNldHRpbmdzQ29tcG9uZW50LFxuICAgIE1lZGlhRWRpdENvbXBvbmVudCxcbiAgICBTbGlkZVBhbmVsQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFNlbVZpZGVvU2V0dGluZ3NQYW5lbENvbXBvbmVudCxcbiAgICBTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTZW1NZWRpYVNlcnZpY2UsXG4gICAgU2VtVmlkZW9TZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtTWVkaWFNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNlbU1lZGlhTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbU2VtTWVkaWFTZXJ2aWNlLCBTZW1WaWRlb1NlcnZpY2VdXG4gICAgfVxuICB9XG59XG4iXX0=