import { cleanArgs, invokeFunction, validateFirstString } from "./FunctionHelper";

export const SubtaskCountEquals = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, limit] = cleanArgs(args);
    return await invokeFunction('SubtaskCountEquals', { query, limit });
};

export const SubtaskCountMoreThan = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, limit] = cleanArgs(args);
    return await invokeFunction('SubtaskCountMoreThan', { query, limit });
};

export const SubtaskCountLessThan = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, limit] = cleanArgs(args);
    return await invokeFunction('SubtaskCountLessThan', { query, limit });
};