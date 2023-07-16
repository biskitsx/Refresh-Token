export const createError = (message: string) => {
    const e = new Error();
    e.message = message;
    return e;
};
