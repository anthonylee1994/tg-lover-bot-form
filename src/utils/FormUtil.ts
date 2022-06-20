import set from "lodash/set";

const serialize = <T extends object>(form: HTMLFormElement): T => {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);

    let obj: any = {};

    for (const [key, value] of Object.entries(formObject)) {
        if (value === "") continue;
        obj = set(obj, key, value);
    }

    return obj as T;
};

export const FormUtil = Object.freeze({
    serialize,
});
