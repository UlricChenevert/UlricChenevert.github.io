export class SelectionPackage {
    FixedSelection;
    ChoiceSelection;
    OverrideSelection;
    OverridePossibleChoiceSelection;
    constructor(FixedSelection, // e.g. Items every Dwarf gets automatically
    ChoiceSelection, // Groups of items they must choose between
    OverrideSelection, OverridePossibleChoiceSelection) {
        this.FixedSelection = FixedSelection;
        this.ChoiceSelection = ChoiceSelection;
        this.OverrideSelection = OverrideSelection;
        this.OverridePossibleChoiceSelection = OverridePossibleChoiceSelection;
    }
}
export class ChoiceGroup {
    pickCount;
    options;
    selectedValues;
    constructor(pickCount, // How many can they choose?
    options, // The items themselves
    selectedValues) {
        this.pickCount = pickCount;
        this.options = options;
        this.selectedValues = selectedValues;
    }
}
export class TaggedObservableSelectionPackage {
    FixedSelection;
    ChoiceSelection;
    OverridePossibleSelection;
    OverridePossibleChoiceSelection;
    constructor(FixedSelection, // e.g. Items every Dwarf gets automatically
    ChoiceSelection, // Groups of items they must choose between
    OverridePossibleSelection, // e.g. Items that every STREET URCHIN cannot have
    OverridePossibleChoiceSelection) {
        this.FixedSelection = FixedSelection;
        this.ChoiceSelection = ChoiceSelection;
        this.OverridePossibleSelection = OverridePossibleSelection;
        this.OverridePossibleChoiceSelection = OverridePossibleChoiceSelection;
    }
}
export class Item {
    Name;
    Amount;
    Description;
    Value;
    constructor(Name, Amount, Description, Value) {
        this.Name = Name;
        this.Amount = Amount;
        this.Description = Description;
        this.Value = Value;
    }
}
