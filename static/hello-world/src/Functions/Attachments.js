import { cleanArgs, invokeFunction, validateFirstString } from "./FunctionHelper";

export const hasAttachments = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query] = cleanArgs(args);
    return await invokeFunction('hasAttachments', { query });
};

export const hasAttachmentsAfter = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, date] = cleanArgs(args);
    return await invokeFunction('hasAttachmentsAfter', { query, date });
};

export const hasAttachmentsBefore = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, date] = cleanArgs(args);
    return await invokeFunction('hasAttachmentsBefore', { query, date });
};

export const hasAttachmentsBy = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, username] = cleanArgs(args);
    return await invokeFunction('hasAttachmentsBy', { query, username });
};

export const attachmentsCountEquals = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, count] = cleanArgs(args);
    return await invokeFunction('attachmentsCountEquals', { query, count });
};

export const attachmentsCountMoreThan = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, count] = cleanArgs(args);
    return await invokeFunction('attachmentsCountMoreThan', { query, count });
};

export const attachmentsCountLessThan = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, count] = cleanArgs(args);
    return await invokeFunction('attachmentsCountLessThan', { query, count });
};

export const attachedDate = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [query, date] = cleanArgs(args);
    return await invokeFunction('attachedDate', { query, date });
};