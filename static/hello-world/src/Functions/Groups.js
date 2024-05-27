import { invokeFunction } from "./FunctionHelper";

export const groupsOfCurrentUser = async (firstString) => {
    return await invokeFunction('groupsOfCurrentUser', { picker: firstString });
};

export const groupsOfUser = async (firstString, username) => {
    return await invokeFunction('groupsOfUser', { picker: firstString, username });
};