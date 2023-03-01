export const validateText = (text) => {
  const regex = /^[a-zA-Z0-9 +*\-\/!?"$%&/()]*$/;
  return regex.test(text);
};
