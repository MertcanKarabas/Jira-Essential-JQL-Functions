import { cleanArgs, invokeFunction, validateFirstString } from "./FunctionHelper";

export const assigneesInProjectRole = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [projectId, projectRole, query] = cleanArgs(args);
    return await invokeFunction('assigneesInProjectRole', { projectId, projectRole, query });
};

export const creatorsInProjectRole = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [projectId, projectRole, query] = cleanArgs(args);
    return await invokeFunction('creatorsInProjectRole', { projectId, projectRole, query });
};

export const reportersInProjectRole = async (firstString, args) => {
    if (!validateFirstString(firstString)) return 'Wrong input';
    const [projectId, projectRole, query] = cleanArgs(args);
    return await invokeFunction('reportersInProjectRole', { projectId, projectRole, query });
};

export const usersHavingRoleInProject = async (firstString, args) => {
    const [projectId, projectRole, query] = cleanArgs(args);
    return await invokeFunction('usersHavingRoleInProject', { firstString, projectId, projectRole, query });
};