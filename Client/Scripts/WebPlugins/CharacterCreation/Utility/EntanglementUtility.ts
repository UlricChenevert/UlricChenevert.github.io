import { Utility } from "../../../WebCore/Utility.js"
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js"
import { Entanglements } from "../Contracts/Entanglements.js"
import { DispositionsEnum } from "../Contracts/StringTypes.js"
import { NameGeneratorSettings } from "../Contracts/TaggedData.js"
import { NameUtility } from "./NameUtility.js"

export namespace EntanglementUtility {
    export const generatePerson = (attitudes? : DispositionsEnum, characterData? : ConfiguredCharacterData) =>{
        const filters = (characterData)? {Race: characterData.Race()} : undefined
        const finalDisposition : DispositionsEnum = (attitudes)? attitudes : DispositionsEnum.Disinterested
        return new Entanglements({id: Utility.idGenerator.newID(), name: NameUtility.GeneratePersonName(filters)}, finalDisposition, "Person")
    }

    export const generateOrganization = (attitudes? : DispositionsEnum, characterData? : ConfiguredCharacterData, settings?: (NameGeneratorSettings & {
    NameType: "Organization";})) =>{
        const filters = (characterData)? {Race: characterData.Race()} : undefined
        const finalDisposition : DispositionsEnum = (attitudes)? attitudes : DispositionsEnum.Disinterested
        return new Entanglements({id: Utility.idGenerator.newID(), name: NameUtility.GenerateOrganizationName(settings)}, finalDisposition, "Organization")
    }

    export const generatePlace = (attitudes? : DispositionsEnum, characterData? : ConfiguredCharacterData) =>{
        const filters = (characterData)? {Race: characterData.Race()} : undefined
        const finalDisposition : DispositionsEnum = (attitudes)? attitudes : DispositionsEnum.Disinterested
        return new Entanglements({id: Utility.idGenerator.newID(), name: NameUtility.GeneratePlaceName()}, finalDisposition, "Place")
    }

    export const generateShadowOrganization = (attitudes? : DispositionsEnum, characterData? : ConfiguredCharacterData) =>{
        const filters = (characterData)? {Race: characterData.Race()} : undefined
        const finalDisposition : DispositionsEnum = (attitudes)? attitudes : DispositionsEnum.Disinterested
        return new Entanglements({id: Utility.idGenerator.newID(), name: NameUtility.GenerateOrganizationName({Goal : "Evil", NameType: "Organization"})}, finalDisposition, "Organization")
    }
}