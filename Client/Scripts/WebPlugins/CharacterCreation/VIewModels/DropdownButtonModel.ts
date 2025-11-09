
import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";

export type ButtonOption = {Name: string, clickFunction : Function}

export class DropDownButtonModel implements IHTMLInjectable<void> {
    readonly ViewUrl = "PartialViews/DropDownButton.html";
    isLoading: Observable<boolean>;
    isDropdownVisible: Observable<boolean>;

    constructor(public FirstOptionName: string, public buttonOptions: ButtonOption[]) {
        this.isLoading = ko.observable(true);
        this.isDropdownVisible = ko.observable(false);
    }

    Init(): Promise<void> {
        return Promise.resolve();
    }

    defaultClick = () => {
        // This is the action for the main button, which is the first option.
        if (this.buttonOptions.length > 0) {
            this.buttonOptions[0].clickFunction();
        }
    }

    toggleDropdown = () => {
        this.isDropdownVisible(!this.isDropdownVisible());
    }
}