import { cleanArgs, invokeFunction, validateFirstString } from "./FunctionHelper";

export const issueLinksCountEqual = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, limit] = cleanArgs(args);
    return await invokeFunction('issueLinksCountEqual', { query, limit });
};

export const issueLinksCountMoreThan = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, limit] = cleanArgs(args);
    return await invokeFunction('issueLinksCountMoreThan', { query, limit });
};

export const issueLinksCountLessThan = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, limit] = cleanArgs(args);
    return await invokeFunction('issueLinksCountLessThan', { query, limit });
};