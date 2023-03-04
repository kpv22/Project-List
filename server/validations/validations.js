export const validateText = (text) => {
  const regex = /^[^<>]{1,90}$/;
  return regex.test(text);
};
