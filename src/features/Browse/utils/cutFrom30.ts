export const cutFrom30 = (text: string) => {
    return text.length > 30 ? `${text.slice(0, 30)}...` : text;
};