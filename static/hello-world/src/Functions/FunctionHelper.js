import { invoke } from "@forge/bridge";

export const cleanArgs = (args) => {
    const cleanedArgs = [];
    const cleanArgs = args.split(',');
    cleanArgs.map((arg) => {
        cleanedArgs.push(arg.trim().slice(1, -1));
    });
    return cleanedArgs;
};

export const invokeFunction = async (functionName, params) => {
    try {
        const response = await invoke(functionName, params);
        return response;
    } catch (error) {
        console.error(`Error invoking ${functionName}:`, error);
        return error;
    }
};

export const validateFirstString = (firstString) => {
    if (firstString !== 'issue') {
        console.log('Wrong input!');
        return false;
    }
    return true;
};