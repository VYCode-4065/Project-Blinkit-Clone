export const isAdmin = (role) => {
    if (role === 'Admin') {
        return true;
    }
    return false;
}