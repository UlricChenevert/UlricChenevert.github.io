export const getCharacterCreatorPicturePath = (imagePath) => "/Images/00 - Art for CharGen-20251126T183321Z-1-001/00 - Art for CharGen/" + imagePath;
export const tryGetCharacterCreatorPicturePath = (imagePath) => (imagePath) ? getCharacterCreatorPicturePath(imagePath) : undefined;
