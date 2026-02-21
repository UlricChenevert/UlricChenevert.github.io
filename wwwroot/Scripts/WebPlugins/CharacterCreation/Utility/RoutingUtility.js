export const getCharacterCreatorPicturePath = (imagePath) => "/Images/CharacterCreator/" + imagePath;
export const tryGetCharacterCreatorPicturePath = (imagePath) => (imagePath) ? getCharacterCreatorPicturePath(imagePath) : getCharacterCreatorPicturePath("RR KOBOLDS BEHOLDER Ricardo De Gaspar .png");
