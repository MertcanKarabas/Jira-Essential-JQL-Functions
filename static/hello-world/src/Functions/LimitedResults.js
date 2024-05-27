import { cleanArgs, invokeFunction, validateFirstString } from "./FunctionHelper";

export const limitedResults = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, limit] = cleanArgs(args);
    return await invokeFunction('limitedResults', { query, limit });
};