import app from "./app.data";

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

export const setTitle = (...titles) => {
    let title = "";
    titles.forEach(one => one && (title += one + " • "));
    title += app.title;
    document.title = title;
};

export function arrayBufferToString(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}
export function stringToArrayBuffer(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}