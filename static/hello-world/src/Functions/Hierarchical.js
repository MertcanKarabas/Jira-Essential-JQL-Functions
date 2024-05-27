import { cleanArgs, invokeFunction, validateFirstString } from "./FunctionHelper";

export const subtasksOf = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query] = cleanArgs(args);
    return await invokeFunction('subtasksOf', { query });
};

export const epicsOf = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query] = cleanArgs(args);
    return await invokeFunction('epicsOf', { query });
};

export const parentsOf = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query] = cleanArgs(args);
    return await invokeFunction('parentsOf', { query });
};

export const issuesInEpics = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query] = cleanArgs(args);
    return await invokeFunction('issuesInEpics', { query });
};

export const childrenOfSubQuery = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query] = cleanArgs(args);
    return await invokeFunction('childrenOfSubQuery', { query });
};