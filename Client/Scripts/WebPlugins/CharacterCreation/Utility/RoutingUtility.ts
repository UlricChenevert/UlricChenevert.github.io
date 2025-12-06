import { Utility } from "../../../WebCore/Utility.js"

export const getCharacterCreatorPicturePath = (imagePath : string) => "/Images/00 - Art for CharGen-20251126T183321Z-1-001/00 - Art for CharGen/" + imagePath
export const tryGetCharacterCreatorPicturePath = (imagePath? : string) => (imagePath)? getCharacterCreatorPicturePath(imagePath) : undefined