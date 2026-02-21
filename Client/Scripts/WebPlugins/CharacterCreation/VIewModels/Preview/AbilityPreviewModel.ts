import { Observable } from "../../../../Framework/Knockout/knockout.js";
import { ko } from "../../../../Framework/Knockout/ko.js";
import { Abilities } from "../../Contracts/Abilities.js";
import { IConfigurableViewModel } from "../../Contracts/CharacterWizardViewModels.js";


export class AbilityPreviewModel implements IConfigurableViewModel {
    constructor(
        public FriendlyName: string,
        public Ability: Observable<Abilities>,
        public IsConfigured: Observable<boolean>,
        public Randomize: Function,
        public Edit: Function) { 
        
        this.Randomize = ()=>{
            this.IsConfigured(true)
            Randomize()
        }
        this.Edit = ()=>{
            this.IsConfigured(true)
            Edit()
        }
    }

    isLoading: Observable<boolean> = ko.observable(false);
    Init = () => Promise.resolve();
    public ViewUrl = "/PartialViews/AbilityPreview.html";
}
