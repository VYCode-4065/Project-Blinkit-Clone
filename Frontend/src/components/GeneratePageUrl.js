export const generatePageURL = (name) => {
    const url = name.toString().replaceAll(" ", "+").replaceAll(",", "").replaceAll("&", "+")
    return url;
}