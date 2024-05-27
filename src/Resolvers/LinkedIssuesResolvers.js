import { issuesGetRequest } from "./Requests";

const checkIssueLinksCount = async ({ payload, condition }) => {
    const findedLinkedIssues = [];
    const processedKeys = new Set();
    const query = payload.query;
    const limit = parseInt(payload.limit, 10);
    
    try {
        const response = await issuesGetRequest(query);
        const allIssues = await response.json();
        
        if (allIssues.errorMessages) return { error: allIssues.errorMessages[0] };
        
        for (const issue of allIssues.issues) {
            if (issue.fields.issuelinks) {
                const issueLinkCount = issue.fields.issuelinks.length;
                let isConditionMet = false;

                if (condition === 'equals' && issueLinkCount === limit) {
                    isConditionMet = true;
                } else if (condition === 'moreThan' && issueLinkCount > limit) {
                    isConditionMet = true;
                } else if (condition === 'lessThan' && issueLinkCount < limit) {
                    isConditionMet = true;
                }

                if (isConditionMet) {
                    const key = issue.key;
                    if (!processedKeys.has(key)) {
                        findedLinkedIssues.push(issue);
                        processedKeys.add(key);
                    }
                }
            }
        }

        return findedLinkedIssues;
    } catch (error) {
        console.error('Error:', error);
        return { error: error };
    }
};

export const issueLinksCountEqual = async ({ payload }) => {
    return checkIssueLinksCount({ payload, condition: 'equals' });
};

export const issueLinksCountMoreThan = async ({ payload }) => {
    return checkIssueLinksCount({ payload, condition: 'moreThan' });
};

export const issueLinksCountLessThan = async ({ payload }) => {
    return checkIssueLinksCount({ payload, condition: 'lessThan' });
};