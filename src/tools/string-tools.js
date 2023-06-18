/**
 * Checks if a string is null or whitespace.
 * @param {string} str String to check.
 * @returns {boolean} if a string is null or whitespace.
 */
export const isNullOrWhiteSpace = str =>{
  return (typeof str === 'undefined' || str == null) || str.replace(/\s/g, '').length < 1;
}

export const isNullOrZero = int =>{
  return (typeof int === 'undefined' || int == null) || int === 0 || (typeof int === "string" && int.replace(/\s/g, '').length < 1);
}