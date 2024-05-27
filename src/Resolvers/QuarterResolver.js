import { issuesGetRequest } from "./Requests";
const getStartOfQuarter = (offset) => {
    const now = new Date();
    const currentQuarter = Math.floor(now.getMonth() / 3);
    const startMonth = (currentQuarter * 3) + (offset * 3);
    const startYear = now.getFullYear() + Math.floor(startMonth / 12);
    const adjustedStartMonth = startMonth % 12;

    return new Date(startYear, adjustedStartMonth, 1);
};

const getEndOfQuarter = (offset) => {
    const now = new Date();
    const currentQuarter = Math.floor(now.getMonth() / 3);
    const endMonth = (currentQuarter * 3 + 2) + (offset * 3);
    const endYear = now.getFullYear() + Math.floor(endMonth / 12);
    const adjustedEndMonth = endMonth % 12;
    const endDay = new Date(endYear, adjustedEndMonth + 1, 0).getDate();

    return new Date(endYear, adjustedEndMonth, endDay);
};

export const startOfQuarter = async ({ payload }) => {
    const offset = parseInt(payload.offset, 10);
    let query = payload.query;
    if (query === null || query === undefined)
        query = '';
    else
        query = query + ' AND ';
    try {
        const start = getStartOfQuarter(offset);
        const startOfQuarterDate = start.toISOString().split('T')[0]; // YYYY-MM-DD formatında
        const modifiedQuery = `${query}created >= ${startOfQuarterDate}`;

        const response = await issuesGetRequest(modifiedQuery);
        const issues = await response.json();
        
        if (issues.errorMessages) return { error: allIssues.errorMessages[0] };
        
        return issues.issues;
    } catch (error) {
        console.error('Error:', error);
        return { error: error };
    }
};

export const endOfQuarter = async ({ payload }) => {
    
    const offset = parseInt(payload.offset, 10);
    let query = payload.query;
    if (query === null || query === undefined)
        query = '';
    else
        query = query + ' AND ';
    
    try {
        const end = getEndOfQuarter(offset);
        const endOfQuarterDate = end.toISOString().split('T')[0]; // YYYY-MM-DD formatında
        const modifiedQuery = `${query}created <= ${endOfQuarterDate}`;

        const response = await issuesGetRequest(modifiedQuery);
        const issues = await response.json();
        
        if (issues.errorMessages) return { error: allIssues.errorMessages[0] };
        
        return issues.issues;
    } catch (error) {
        console.error('Error:', error);
        return { error: error };
    }
};