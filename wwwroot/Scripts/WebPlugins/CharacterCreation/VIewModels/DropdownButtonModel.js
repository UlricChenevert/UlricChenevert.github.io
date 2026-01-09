import { ko } from "../../../Framework/Knockout/ko.js";
export class DropDownButtonModel {
    FirstOptionName;
    buttonOptions;
    ViewUrl = "PartialViews/DropDownButton.html";
    isLoading;
    isDropdownVisible;
    constructor(FirstOptionName, buttonOptions) {
        this.FirstOptionName = FirstOptionName;
        this.buttonOptions = buttonOptions;
        this.isLoading = ko.observable(true);
        this.isDropdownVisible = ko.observable(false);
    }
    Init() {
        return Promise.resolve();
    }
    defaultClick = () => {
        // This is the action for the main button, which is the first option.
        if (this.buttonOptions.length > 0) {
            this.buttonOptions[0].clickFunction();
        }
    };
    toggleDropdown = () => {
        this.isDropdownVisible(!this.isDropdownVisible());
    };
}
