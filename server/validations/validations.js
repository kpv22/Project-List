export const validateText = (text) => {
  const regex = /^[a-zA-Z0-9 +*\-\/!?"$%&/()]*$/;
  return regex.test(text);
};

export const validateTask = (text) => {
  const regex = /^[a-zA-Z0-9 +*\-\/!?"$%&/()]{0,90}$/;
  return regex.test(text);
};
