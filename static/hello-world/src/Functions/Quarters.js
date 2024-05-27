import { cleanArgs, invokeFunction } from "./FunctionHelper";

export const startOfQuarter = async (firstString, args) => {
    const [offset, query] = cleanArgs(args);
    return await invokeFunction('startOfQuarter', { offset, query });
};

export const endOfQuarter = async (firstString, args) => {
    const [offset, query] = cleanArgs(args);
    return await invokeFunction('endOfQuarter', { offset, query });
};