import { issuesGetRequest } from "./Requests";

const processIssues = async ({ payload, processor }) => {
    const findedItems = [];
    const processedKeys = new Set();
    const query = payload.query;
    
    try {
        const response = await issuesGetRequest(query);
        const allIssues = await response.json();

        if (allIssues.errorMessages) return {error: allIssues.errorMessages[0]};

        for (const issue of allIssues.issues) {
            processor(issue, findedItems, processedKeys);
        }

        return findedItems;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const subtaskProcessor = (issue, findedItems, processedKeys) => {
    if (issue.fields.subtasks.length !== 0) {
        for (const subtask of issue.fields.subtasks) {
            if (!processedKeys.has(subtask.key)) {
                findedItems.push(subtask);
                processedKeys.add(subtask.key);
            }
        }
    }
};

const epicProcessor = (issue, findedItems, processedKeys) => {
    if (issue.fields.parent && issue.fields.parent.fields.issuetype.name === "Epic") {
        const epicKey = issue.fields.parent.key;
        if (!processedKeys.has(epicKey)) {
            findedItems.push(issue.fields.parent);
            processedKeys.add(epicKey);
        }
    }
};

const parentProcessor = (issue, findedItems, processedKeys) => {
    if (issue.fields.parent) {
        const parentKey = issue.fields.parent.key;
        if (!processedKeys.has(parentKey)) {
            findedItems.push(issue.fields.parent);
            processedKeys.add(parentKey);
        }
    } else if (issue.fields.subtasks.length !== 0) {
        if (!processedKeys.has(issue.key)) {
            findedItems.push(issue);
            processedKeys.add(issue.key);
        }
    }
};

const childrenProcessor = (issue, findedItems, processedKeys) => {
    if (issue.fields.parent) {
        if (!processedKeys.has(issue.key)) {
            findedItems.push(issue);
            processedKeys.add(issue.key);
        }
    } else if (issue.fields.subtasks.length !== 0) {
        for (const subtask of issue.fields.subtasks) {
            if (!processedKeys.has(subtask.key)) {
                findedItems.push(subtask);
                processedKeys.add(subtask.key);
            }
        }
    }
};

export const subtasksOf = async ({payload}) => {
    return processIssues({ payload, processor: subtaskProcessor });
};

export const epicsOf = async ({payload}) => {
    return processIssues({ payload, processor: epicProcessor });
};

export const parentsOf = async ({payload}) => {
    return processIssues({ payload, processor: parentProcessor });
};

export const issuesInEpics = async ({payload}) => {
    return processIssues({ payload, processor: epicProcessor });
};

export const childrenOfSubQuery = async ({payload}) => {
    return processIssues({ payload, processor: childrenProcessor });
};