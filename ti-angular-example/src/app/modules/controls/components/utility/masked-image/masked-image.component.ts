import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DeviceEnvironment } from 'titanium-angular';

const commonBlendModes = [
  'BLEND_MODE_CLEAR',
  'BLEND_MODE_COPY',
  'BLEND_MODE_DARKEN',
  'BLEND_MODE_DESTINATION_ATOP',
  'BLEND_MODE_DESTINATION_IN',
  'BLEND_MODE_DESTINATION_OUT',
  'BLEND_MODE_DESTINATION_OVER',
  'BLEND_MODE_LIGHTEN',
  'BLEND_MODE_MULTIPLY',
  'BLEND_MODE_NORMAL',
  'BLEND_MODE_OVERLAY',
  'BLEND_MODE_PLUS_LIGHTER',
  'BLEND_MODE_SCREEN',
  'BLEND_MODE_SOURCE_ATOP',
  'BLEND_MODE_SOURCE_IN',
  'BLEND_MODE_SOURCE_OUT',
  'BLEND_MODE_XOR'
]
const iosBlendModes = [
  ...commonBlendModes,
  'BLEND_MODE_COLOR',
  'BLEND_MODE_COLOR_BURN',
  'BLEND_MODE_COLOR_DODGE',
  'BLEND_MODE_DIFFERENCE',
  'BLEND_MODE_EXCLUSION',
  'BLEND_MODE_HARD_LIGHT',
  'BLEND_MODE_HUE',
  'BLEND_MODE_LUMINOSITY',
  'BLEND_MODE_PLUS_DARKER',
  'BLEND_MODE_SATURATION',
  'BLEND_MODE_SOFT_LIGHT',
]

@Component({
  templateUrl: 'masked-image.component.html'
})
export class MaskedImageComponent implements OnInit {

  @ViewChild('tintImage') tintImageRef: ElementRef;

  @ViewChild('maskImage') maskImageRef: ElementRef;

  currentBlendModeIndex = 1;

  blendModes = []

  constructor(private device: DeviceEnvironment) {}

  get currentBlendMode() {
    return Ti.UI[this.blendModes[this.currentBlendModeIndex]];
  }

  get currentBlendModeName() {
    return this.blendModes[this.currentBlendModeIndex];
  }

  ngOnInit() {
    this.blendModes = this.device.runs('ios') ? iosBlendModes : commonBlendModes;
  }

  fitTintImage() {
    const tintImage = this.tintImageRef.nativeElement.titaniumView as Titanium.UI.MaskedImage;
    const tintImageHeight = tintImage.size.height;
    tintImage.height = tintImageHeight - 20;
    tintImage.width = tintImageHeight - 20;
  }

  fitMaskImage() {
    const maskImage = this.maskImageRef.nativeElement.titaniumView as Titanium.UI.MaskedImage;
    const maskImageHeight = maskImage.size.height;
    maskImage.height = maskImageHeight - 100
    maskImage.width = maskImageHeight - 100;
  }

  switchBlendMode() {
    let newBlendModeIndex = this.currentBlendModeIndex + 1;
    this.currentBlendModeIndex = newBlendModeIndex >= this.blendModes.length ? 0 : newBlendModeIndex;
  }
}
