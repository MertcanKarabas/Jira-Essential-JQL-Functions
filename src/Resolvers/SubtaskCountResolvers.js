import { issuesGetRequest } from "./Requests";

const checkSubtaskCount = async ({ payload, condition }) => {
    const findedIssues = [];
    const query = payload.query;
    const limit = parseInt(payload.limit, 10);
    
    try {
        const response = await issuesGetRequest(query);
        const allIssues = await response.json();

        if (allIssues.errorMessages) return { error: allIssues.errorMessages[0] };

        for (const issue of allIssues.issues) {
            if (issue.fields.subtasks) {
                const subtaskCount = issue.fields.subtasks.length;
                let isConditionMet = false;
                
                if (condition === 'equals' && subtaskCount === limit) {
                    isConditionMet = true;
                } else if (condition === 'moreThan' && subtaskCount > limit) {
                    isConditionMet = true;
                } else if (condition === 'lessThan' && subtaskCount < limit) {
                    isConditionMet = true;
                }

                if (isConditionMet) {
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

export const SubtaskCountEquals = async ({ payload }) => {
    return checkSubtaskCount({ payload, condition: 'equals' });
};

export const SubtaskCountMoreThan = async ({ payload }) => {
    return checkSubtaskCount({ payload, condition: 'moreThan' });
};

export const SubtaskCountLessThan = async ({ payload }) => {
    return checkSubtaskCount({ payload, condition: 'lessThan' });
};