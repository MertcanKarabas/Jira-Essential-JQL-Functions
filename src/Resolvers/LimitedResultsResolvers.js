import { issuesGetRequest } from "./Requests";

export const limitedResults = async ({ payload }) => {
    const findedLimitedResults = []
    const query = payload.query;
    const limit = parseInt(payload.limit, 10);
    try {
        const response = await issuesGetRequest(query);
        const allIssues = await response.json()

        if (allIssues.errorMessages) return { error: allIssues.errorMessages[0] };

        for (const issue of allIssues.issues) {
            if (findedLimitedResults.length >= limit)
                break;
            findedLimitedResults.push(issue);
        }
        return findedLimitedResults;
    } catch (error) {
        console.error('Error:', error);
        return  { error: error };
    }
};