export const cutFrom30 = (text: string, slice = 30) => {
    return text.length > slice ? `${text.slice(0, slice)}...` : text;
};