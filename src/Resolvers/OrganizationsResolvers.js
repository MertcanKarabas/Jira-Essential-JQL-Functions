export const organizationsOfCurrentUser = async ({ payload }) => {
    const findedOrganizationsOfCurrentUser = []
    const query = payload.query;
    try {
        const response = await issuesGetRequest(query);
        const allIssues = await response.json()
        if (allIssues.errorMessages)
            return { error: allIssues.errorMessages[0] };
        for (const issue of allIssues.issues) {
            if ((issue.fields.parent !== null && issue.fields.parent !== undefined)) {
                const key = issue.key;
                if (!processedKeys.has(key)) {
                    findedOrganizationsOfCurrentUser.push(issue);
                    processedKeys.add(key);
                }
            }
            else if (issue.fields.subtasks.length !== 0) {
                for (const subtask of issue.fields.subtasks) {
                    const key = subtask.key;
                    if (!processedKeys.has(key)) {
                        findedOrganizationsOfCurrentUser.push(subtask);
                        processedKeys.add(key);
                    }
                }
            }
            console.log(processedKeys);
        }
        return findedOrganizationsOfCurrentUser;
    } catch (error) {
        console.error('Error:', error);
        return { error: error };
    }
};

export const organizationsOfUser = async ({ payload }) => {
    const findedOrganizationsOfUser = []
    const query = payload.query;
    try {
        const response = await issuesGetRequest(query);
        const allIssues = await response.json()
        if (allIssues.errorMessages)
            return { error: allIssues.errorMessages[0] };
        for (const issue of allIssues.issues) {
            if ((issue.fields.parent !== null && issue.fields.parent !== undefined)) {
                const key = issue.key;
                if (!processedKeys.has(key)) {
                    findedOrganizationsOfUser.push(issue);
                    processedKeys.add(key);
                }
            }
            else if (issue.fields.subtasks.length !== 0) {
                for (const subtask of issue.fields.subtasks) {
                    const key = subtask.key;
                    if (!processedKeys.has(key)) {
                        findedOrganizationsOfUser.push(subtask);
                        processedKeys.add(key);
                    }
                }
            }
            console.log(processedKeys);
        }
        return findedOrganizationsOfUser;
    } catch (error) {
        console.error('Error:', error);
        return { error: error };
    }
};