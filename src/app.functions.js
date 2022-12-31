export const randomNumber = (min = 0, max = 9) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const randomString = (length = 5) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
};