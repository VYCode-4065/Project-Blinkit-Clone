export const generatePageURL = (name) => {
    const url = name.toString().replace(" ", "+").replaceAll(",", "").replaceAll("&", "+")
    return url;
}