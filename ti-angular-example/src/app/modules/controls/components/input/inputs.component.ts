import { Component, ViewChild } from '@angular/core';
import { WithTiGlobal } from 'titanium-angular';
import { InputDemo } from './input-demo.component';

@Component({
  templateUrl: 'inputs.component.html'
})
export class InputsComponent extends WithTiGlobal() {
  @ViewChild('switchDemo') switchDemo: InputDemo;
  @ViewChild('sliderDemo') sliderDemo: InputDemo;
  @ViewChild('buttonDemo') buttonDemo: InputDemo;
  @ViewChild('textFieldDemo') textFieldDemo: InputDemo;
  @ViewChild('textAreaDemo') textAreaDemo: InputDemo;

  private _switchValue = 0;
  private _sliderValue = 25;
  private _pickerValue = new Date();
  private _textFieldValue = '';

  get switchValue() { return this._switchValue; }
  set switchValue(newValue) {
    this._switchValue = newValue;
    if (this.switchDemo) {
      this.switchDemo.state = `Switch is now ${newValue ? 'On' : 'Off'}`;
    }
  }
  get sliderValue() { return this._sliderValue; }
  set sliderValue(newValue) {
    this._sliderValue = newValue;
    if (this.sliderDemo) {
      this.sliderDemo.state = `Slider value: ${newValue.toFixed(0)}`;
    }
  }
  get textFieldValue() { return this._textFieldValue; }
  set textFieldValue(newValue) {
    this._textFieldValue = newValue;
    if (this.textFieldDemo) {
      this.textFieldDemo.state = newValue !== '' ? `Text: ${newValue}` : '';
    }
  }
  public textAreaValue = '';

  onSubmit() {
    this.buttonDemo.state = 'Nicely done!'
  }
}