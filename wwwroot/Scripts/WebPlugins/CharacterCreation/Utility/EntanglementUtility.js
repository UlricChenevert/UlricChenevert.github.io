import { Utility } from "../../../WebCore/Utility.js";
import { Entanglements } from "../Contracts/Entanglements.js";
import { DispositionsEnum } from "../Contracts/StringTypes.js";
import { NameUtility } from "./NameUtility.js";
export var EntanglementUtility;
(function (EntanglementUtility) {
    EntanglementUtility.generatePerson = (attitudes, characterData) => {
        const filters = (characterData) ? { Race: characterData.Race() } : undefined;
        const finalDisposition = (attitudes) ? attitudes : DispositionsEnum.Disinterested;
        return new Entanglements({ id: Utility.idGenerator.newID(), name: NameUtility.GeneratePersonName(filters) }, finalDisposition, "Person");
    };
    EntanglementUtility.generateOrganization = (attitudes, characterData, settings) => {
        const filters = (characterData) ? { Race: characterData.Race() } : undefined;
        const finalDisposition = (attitudes) ? attitudes : DispositionsEnum.Disinterested;
        return new Entanglements({ id: Utility.idGenerator.newID(), name: NameUtility.GenerateOrganizationName(settings) }, finalDisposition, "Organization");
    };
    EntanglementUtility.generatePlace = (attitudes, characterData) => {
        const filters = (characterData) ? { Race: characterData.Race() } : undefined;
        const finalDisposition = (attitudes) ? attitudes : DispositionsEnum.Disinterested;
        return new Entanglements({ id: Utility.idGenerator.newID(), name: NameUtility.GeneratePlaceName() }, finalDisposition, "Place");
    };
    EntanglementUtility.generateShadowOrganization = (attitudes, characterData) => {
        const filters = (characterData) ? { Race: characterData.Race() } : undefined;
        const finalDisposition = (attitudes) ? attitudes : DispositionsEnum.Disinterested;
        return new Entanglements({ id: Utility.idGenerator.newID(), name: NameUtility.GenerateOrganizationName({ Goal: "Evil", NameType: "Organization" }) }, finalDisposition, "Organization");
    };
})(EntanglementUtility || (EntanglementUtility = {}));
