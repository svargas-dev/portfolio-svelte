/**
 * Encode url string
 */
export const encode = (data: { [k: string]: string }): string => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};
