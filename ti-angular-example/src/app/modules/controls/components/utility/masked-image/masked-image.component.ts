import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TitaniumElement } from 'titanium-vdom';

@Component({
  templateUrl: 'masked-image.component.html'
})
export class MaskedImageComponent implements OnInit {

  @ViewChild('tintImage') tintImageRef: ElementRef;

  @ViewChild('modeImage') modeImageRef: ElementRef;

  currentBlendModeIndex = 1;

  blendModes = [
    'BLEND_MODE_CLEAR',
    'BLEND_MODE_COLOR',
    'BLEND_MODE_COLOR_BURN',
    'BLEND_MODE_COLOR_DODGE',
    'BLEND_MODE_COPY',
    'BLEND_MODE_DARKEN',
    'BLEND_MODE_DESTINATION_ATOP',
    'BLEND_MODE_DESTINATION_IN',
    'BLEND_MODE_DESTINATION_OUT',
    'BLEND_MODE_DESTINATION_OVER',
    'BLEND_MODE_DIFFERENCE',
    'BLEND_MODE_EXCLUSION',
    'BLEND_MODE_HARD_LIGHT',
    'BLEND_MODE_HUE',
    'BLEND_MODE_LIGHTEN',
    'BLEND_MODE_LUMINOSITY',
    'BLEND_MODE_MULTIPLY',
    'BLEND_MODE_NORMAL',
    'BLEND_MODE_OVERLAY',
    'BLEND_MODE_PLUS_DARKER',
    'BLEND_MODE_PLUS_LIGHTER',
    'BLEND_MODE_SATURATION',
    'BLEND_MODE_SCREEN',
    'BLEND_MODE_SOFT_LIGHT',
    'BLEND_MODE_SOURCE_ATOP',
    'BLEND_MODE_SOURCE_IN',
    'BLEND_MODE_SOURCE_OUT',
    'BLEND_MODE_XOR'
  ]

  get currentBlendMode() {
    return Ti.UI[this.blendModes[this.currentBlendModeIndex]];
  }

  get currentBlendModeName() {
    return this.blendModes[this.currentBlendModeIndex];
  }

  ngOnInit() { }

  onPostLayout() {
    const tintImage = this.tintImageRef.nativeElement.titaniumView as Titanium.UI.MaskedImage;
    const tintImageHeight = tintImage.size.height;
    tintImage.height = tintImageHeight - 20;
    tintImage.width = tintImageHeight - 20;

    const modeImage = this.modeImageRef.nativeElement.titaniumView as Titanium.UI.MaskedImage;
    const modeImageHeight = modeImage.size.height;
    modeImage.height = modeImageHeight - 100
    modeImage.width = modeImageHeight - 100;
  }

  switchBlendMode() {
    let newBlendModeIndex = this.currentBlendModeIndex + 1;
    this.currentBlendModeIndex = newBlendModeIndex >= this.blendModes.length ? 0 : newBlendModeIndex;
  }
}
