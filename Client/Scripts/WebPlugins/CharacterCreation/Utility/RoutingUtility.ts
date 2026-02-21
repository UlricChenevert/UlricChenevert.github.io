import { Utility } from "../../../WebCore/Utility.js"

export const getCharacterCreatorPicturePath = (imagePath : string) => "/Images/CharacterCreator/" + imagePath
export const tryGetCharacterCreatorPicturePath = (imagePath? : string) => (imagePath)? getCharacterCreatorPicturePath(imagePath) : getCharacterCreatorPicturePath("RR KOBOLDS BEHOLDER Ricardo De Gaspar .png")