import api, { route } from "@forge/api";

//PROJECT ROLES
export const getProjectRolesForProject = async (projectIdOrKey) => {
    try {
        const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectIdOrKey}/role`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        return error
    }

}

export const getProjectRoleForProject = async (projectIdOrKey, id) => {
    try {
        const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectIdOrKey}/role/${id}`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        return error
    }
}

//FIELDS
export const fieldGetRequest = async () => {
    try {
        const response = await api.asUser().requestJira(route`/rest/api/3/field`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        return error
    }
}

//ISSUES
export const singleIssueGetRequest = async (issueKey) => {
    try {
        const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueKey}`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        return error
    }
}

export const issuesGetRequest = async (jql) => {
    try {
        if (jql === undefined)
            jql = '';
        const response = await api.asUser().requestJira(route`/rest/api/3/search?jql=${jql}`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        return error
    }
}

//GROUPS
export const getUsersFromGroupsRequest = async (groupId) => {
    try {
        const response = await api.asUser().requestJira(route`/rest/api/3/group/member?groupId=${groupId}`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        return error
    }
}

//USERS
export const getUser = async (userId) => {
    try {
        const response = await api.asUser().requestJira(route`/rest/api/3/user?accountId=${userId}`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        return error
    }
}

export const getAllUsersRequest = async () => {
    try {
        const response = await api.asUser().requestJira(route`/rest/api/3/users/search`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        return error
    }
}

//MYSELF
export const myselfRequest = async () => {
    try {
        const response = await api.asUser().requestJira(route`/rest/api/3/myself`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        return error
    }
}

export const getCurrentUserAccountId = async () => {
    const response = await api.asUser().requestJira(route`/rest/api/3/myself`);
    const userData = await response.json();
    return userData.accountId;
};