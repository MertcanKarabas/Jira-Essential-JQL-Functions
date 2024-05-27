import { getProjectRoleForProject, getProjectRolesForProject, issuesGetRequest } from "./Requests";

const getRolesAndUsers = async (project, role) => {
    const projectRolesResponse = await getProjectRolesForProject(project);
    const projectRoles = await projectRolesResponse.json();

    let roleDetails;
    for (const key in projectRoles) {
        if (key === role) {
            const splittedValue = projectRoles[key].split('/');
            const roleId = splittedValue[splittedValue.length - 1];
            const roleResponse = await getProjectRoleForProject(project, roleId);
            roleDetails = await roleResponse.json();
            break;
        }
    }
    if (!roleDetails)
        throw new Error(`Project Role ${role} not found.`);

    const usersInRole = new Set(roleDetails.actors.map(actor => actor.actorUser.accountId));
    return usersInRole;
};

const getUsersHavingRoleInProject = async ({ payload, field }) => {
    const findedIssues = [];
    const query = payload.query;
    const project = payload.projectId;
    const role = payload.projectRole;

    try {
        const usersInRole = await getRolesAndUsers(project, role);

        const response = await issuesGetRequest(query);
        const allIssues = await response.json();

        if (allIssues.errorMessages) return { error: allIssues.errorMessages[0] };

        for (const issue of allIssues.issues) {
            const fieldValue = issue.fields[field];
            if (fieldValue !== null && fieldValue !== undefined) {
                const userAccountId = fieldValue.accountId;
                if (usersInRole.has(userAccountId)) {
                    findedIssues.push(issue);
                }
            }
        }

        return findedIssues;
    } catch (error) {
        console.error('Error:', error);
        return { error: error };
    }
};

// Assignee'leri bulmak için
export const assigneesInProjectRole = async ({ payload }) => {
    return getUsersHavingRoleInProject({ payload, field: 'assignee' });
};

// Creator'ları bulmak için
export const creatorsInProjectRole = async ({ payload }) => {
    return getUsersHavingRoleInProject({ payload, field: 'creator' });
};

// Reporter'ları bulmak için
export const reportersInProjectRole = async ({ payload }) => {
    return getUsersHavingRoleInProject({ payload, field: 'reporter' });
};

// Kullanıcıları projenin belirli bir rolünde bulmak için
export const usersHavingRoleInProject = async ({ payload }) => {
    const field = payload.firstString;
    return getUsersHavingRoleInProject({ payload, field });
};