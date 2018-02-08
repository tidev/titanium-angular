export interface TimePickerOptions {
    minDate?: Date,
    maxDate?: Date,
    value?: Date
}

export class TimePicker {

    private picker: Titanium.UI.Picker;

    constructor(options?: TimePickerOptions) {
        options = options ? options : {};
        this.picker = Ti.UI.createPicker({
            type: Titanium.UI.PICKER_TYPE_DATE,
            minDate: options.minDate,
            maxDate: options.maxDate,
            value: options.value
        });
    }

    show(): Promise<Date> {
        return new Promise((resolve, reject) => {
            this.picker.showTimePickerDialog({
                callback: (event) => {
                    if (event.cancel) {
                        return reject();
                    }

                    resolve(event.value);
                }
            });
        });
    }


}