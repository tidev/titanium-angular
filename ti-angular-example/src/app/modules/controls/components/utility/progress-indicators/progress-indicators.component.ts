import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WithTiGlobal } from 'titanium-angular';

@Component({
  templateUrl: 'progress-indicators.component.html'
})
export class ProgressIndicatorsComponent extends WithTiGlobal() implements OnInit {
  bytesLoaded = 0

  bytesTotal = 33458326

  downloadState = 'Idle'

  private updateTimeout?: number;

  private downloadInterval?: number;

  private _activityIndicator!: Ti.UI.ActivityIndicator

  private _progressBar!: Ti.UI.ProgressBar

  @ViewChild('activityIndicator')
  set activityIndicator(activityRef: ElementRef) {
    this._activityIndicator = activityRef.nativeElement.titaniumView
  }

  @ViewChild('progressBar')
  set progressBar(barRef: ElementRef) {
    this._progressBar = barRef.nativeElement.titaniumView
  }

  ngOnInit() { }

  checkForUpdates() {
    if (this.updateTimeout) {
      return;
    }

    this._activityIndicator.show();
    // Do some unquantifiable task
    this.updateTimeout = setTimeout(() => {
      this._activityIndicator.hide();
      clearTimeout(this.updateTimeout);
    }, 3000);
  }

  downloadStuff() {
    if (this.downloadInterval) {
      return;
    }

    // Do your task with known duration or which is otherwise quantifiable
    this.bytesLoaded = 0;
    this.downloadState = 'Downloading';
    this.downloadInterval = setInterval(() => {
      const incomingBytes = 200000;
      if (this.bytesLoaded + incomingBytes < this.bytesTotal) {
        this.bytesLoaded += incomingBytes;
      } else {
        this.bytesLoaded = this.bytesTotal;
        this.downloadState = 'Done';
        clearInterval(this.downloadInterval);
        this.downloadInterval = null;
      }
      this._progressBar.value = this.bytesLoaded / this.bytesTotal * 100;
    }, 50);
  }
}