import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
    templateUrl: './live-photo.component.html'
})
export class LivePhotoComponent implements AfterViewInit {
  @ViewChild('livePhoto', { static: false }) livePhotoViewRef: ElementRef;

  private livePhotoView: Titanium.UI.iOS.LivePhotoView;

  ngAfterViewInit() {
      this.livePhotoView = this.livePhotoViewRef.nativeElement.titaniumView;
  }

  selectLivePhoto() {
    Ti.Media.openPhotoGallery({
      mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO, Ti.Media.MEDIA_TYPE_LIVEPHOTO],
      success: e => {
        if (e.livePhoto) {
          this.livePhotoView.livePhoto = e.livePhoto;
        } else {
          console.warn('No live photo selected');
        }
      }
    })
  }
}
