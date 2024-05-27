import { fieldGetRequest, getAllUsersRequest, getUsersFromGroupsRequest, issuesGetRequest, myselfRequest } from "./Requests";

const getGroups = async ({ payload, userResolver }) => {
    const findedIssues = [];
    const picker = payload.picker.slice(1, -1);
    let isPicker = false;
    let fieldKey = null;

    try {
        const response = await fieldGetRequest();
        const findedFields = await response.json();
        if (findedFields.errorMessages) return { error: findedFields.errorMessages[0]};

        for (const singleField of findedFields) {
            if (singleField.name === picker && 
                (singleField.schema.custom === 'com.atlassian.jira.plugin.system.customfieldtypes:grouppicker' ||
                 singleField.schema.custom === 'com.atlassian.jira.plugin.system.customfieldtypes:multigrouppicker')) {
                isPicker = true;
                fieldKey = singleField.key;
                break;
            }
        }

        if (!isPicker) return { error: 'Invalid field name'};

        const issueResponse = await issuesGetRequest();
        const issues = await issueResponse.json();
        if (issues.errorMessages) return { error: issues.errorMessages[0]};

        for (const issue of issues.issues) {
            const fields = issue.fields;
            for (const [key, issueField] of Object.entries(fields)) {
                if (key === fieldKey && issueField !== null) {
                    const groupResponse = await getUsersFromGroupsRequest(issueField.groupId);
                    const group = await groupResponse.json();
                    if (group.errorMessages) return { error: group.errorMessages[0]};

                    const user = await userResolver(payload);

                    if (user.errorMessages) return { error: user.errorMessages[0]};

                    for (const value of group.values) {
                        if (value.accountId === user.accountId) {
                            findedIssues.push(issue);
                        }
                    }
                }
            }
        }

        return findedIssues;
    } catch (error) {
        console.error('Error:', error);
        return {error: error};
    }
};

const currentUserResolver = async () => {
    const userResponse = await myselfRequest();
    return await userResponse.json();
};

const specificUserResolver = async ({payload}) => {
    const username = payload.username.slice(1, -1);
    const usersResponse = await getAllUsersRequest();
    const users = await usersResponse.json();

    if (users.errorMessages) return users;

    return users.find(user => user.displayName === username);
};

export const groupsOfCurrentUser = async ({payload}) => {
    return getGroups({ payload, userResolver: currentUserResolver });
};

export const groupsOfUser = async ({payload}) => {
    return getGroups({ payload, userResolver: specificUserResolver });
};