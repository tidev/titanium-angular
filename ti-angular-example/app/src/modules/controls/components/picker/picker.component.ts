import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DatePicker, DeviceEnvironment, LayoutBehaviorType, TimePicker } from 'titanium-angular';

@Component({
    templateUrl: './picker.component.html'
})
export class PickerComponent implements AfterViewInit {

    LayoutBehaviorType = LayoutBehaviorType;

    @ViewChild('state') labelRef: ElementRef;

    @ViewChild('picker') pickerRef: ElementRef;

    stateLabel: Titanium.UI.Label = null;

    picker: Titanium.UI.Picker = null;

    constructor(private device: DeviceEnvironment) {

    }

    ngAfterViewInit() {
        this.stateLabel = this.labelRef.nativeElement.titaniumView;
        if (this.device.runs('ios')) {
            this.picker = this.pickerRef.nativeElement.titaniumView;
        }
    }

    showPicker() {
        this.picker.show();
    }

    updateLabel(event) {
        const pickerValue = event.selectedValue
        this.stateLabel.text = `Picker value changed to: ${pickerValue}.`;
    }

    showDatePickerDialog() {
        const datePicker = new DatePicker({});
        datePicker.show().then(selectedDate => {
            console.log(`Selected date: ${selectedDate}`);
        }).catch(() => {
            console.log('Date selection canceled');
        });
    }

    showTimePickerDialog() {
        const datePicker = new TimePicker({});
        datePicker.show().then(selectedTime => {
            console.log(`Selected time: ${selectedTime}`);
        }).catch(() => {
            console.log('Time selection canceled');
        });
    }

}