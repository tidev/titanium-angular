export interface DatePickerOptions {
    minDate?: Date,
    maxDate?: Date,
    value?: Date
}

export class DatePicker {

    private picker: Titanium.UI.Picker;

    constructor(options?: DatePickerOptions) {
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
            this.picker.showDatePickerDialog({
                callback: (event) => {
                    if (event.cancel) {
                        return reject();
                    }

                    resolve(event.value);
                }});
        });
    }


}