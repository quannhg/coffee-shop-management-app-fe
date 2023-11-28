export const capitalizeFirstCharacter = (inputString: string) => {
  if (!inputString) {
    return inputString;
  }

  const firstChar = inputString[0];
  const capitalizedFirstChar = firstChar.toUpperCase();
  const resultString = capitalizedFirstChar + inputString.slice(1);

  return resultString;
};
