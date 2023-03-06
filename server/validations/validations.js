export const validateText = (text) => {
  const regex = /^[^<>]{1,60}$/;
  return regex.test(text);
};
