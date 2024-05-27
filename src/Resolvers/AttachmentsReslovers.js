import { issuesGetRequest, singleIssueGetRequest } from "./Requests";

const calculateDateFromDelta = (delta) => {
    const date = new Date();

    // Regex patterns for the supported date formats
    const periodMatch = delta.match(/^(\-?\d+y)?(\-?\d+M)?(\-?\d+w)?(\-?\d+d)?(\-?\d+h)?(\-?\d+m)?$/);
    const dateTimeMatch = delta.match(/^\d{4}[\/-]\d{2}[\/-]\d{2}(\s+\d{2}:\d{2})?$/);
    const dateOnlyMatch = delta.match(/^\d{4}[\/-]\d{2}[\/-]\d{2}$/);

    if (periodMatch) {
        const parts = periodMatch.slice(1);
        let days = 0, weeks = 0, years = 0, hours = 0, minutes = 0, months = 0;

        for (const part of parts) {
            if (part) {
                const value = parseInt(part.slice(0, -1));
                const unit = part.slice(-1);

                switch (unit) {
                    case 'y':
                        years = value;
                        break;
                    case 'M':
                        months = value;
                        break;
                    case 'w':
                        weeks = value;
                        break;
                    case 'd':
                        days = value;
                        break;
                    case 'h':
                        hours = value;
                        break;
                    case 'm':
                        minutes = value;
                        break;
                    default:
                        throw new Error('Invalid time unit in delta string.');
                }
            }
        }

        date.setFullYear(date.getFullYear() + years);
        date.setMonth(date.getMonth() + months);
        date.setDate(date.getDate() + (weeks * 7) + days);
        date.setHours(date.getHours() + hours);
        date.setMinutes(date.getMinutes() + minutes);
    } else if (dateTimeMatch) {
        date.setTime(Date.parse(delta));
    } else if (dateOnlyMatch) {
        const [year, month, day] = delta.split(/[\/-]/).map(part => parseInt(part, 10));
        date.setFullYear(year);
        date.setMonth(month - 1);
        date.setDate(day);
    } else {
        throw new Error('Invalid date format.');
    }

    return date.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
};

// Mevcut fonksiyonlar
const processAttachments = async ({ payload, condition }) => {
    const attachments = [];
    const query = payload.query;
    const count = payload.count ? parseInt(payload.count, 10) : null;
    const delta = payload.date;
    const username = payload.username;

    try {
        let issues;
        const response = await issuesGetRequest(query);
        issues = await response.json();

        if (issues.errorMessages) return {error: issues.errorMessages[0]};

        for (const issue of issues.issues) {
            const issueResponse = await singleIssueGetRequest(issue.key);
            const singleIssue = await issueResponse.json();
            const issueAttachments = singleIssue.fields.attachment;
            if (issueAttachments !== null) {
                let isConditionMet = false;

                switch (condition) {
                    case 'hasAttachments':
                        if (issueAttachments.length > 0)
                            isConditionMet = true;
                        break;
                    case 'hasAttachmentsAfter':
                        if (issueAttachments.length === 0) break;
                        const attachmentDate = new Date(issueAttachments[0].created).toISOString().split('T')[0];
                        isConditionMet = attachmentDate > calculateDateFromDelta(delta);
                        break;
                    case 'hasAttachmentsBefore':
                        if (issueAttachments.length === 0) break;
                        const beforeAttachmentDate = new Date(issueAttachments[0].created).toISOString().split('T')[0];
                        isConditionMet = beforeAttachmentDate < calculateDateFromDelta(delta);
                        break;
                    case 'hasAttachmentsBy':
                        isConditionMet = issueAttachments.some(att => att.author.displayName === username);
                        break;
                    case 'attachmentsCountEquals':
                        isConditionMet = issueAttachments.length === count;
                        break;
                    case 'attachmentsCountMoreThan':
                        isConditionMet = issueAttachments.length > count;
                        break;
                    case 'attachmentsCountLessThan':
                        isConditionMet = issueAttachments.length < count;
                        break;
                }

                if (isConditionMet) {
                    attachments.push(singleIssue);
                }
            }
        }
        return attachments;
    } catch (error) {
        console.error('Error:', error);
        return { error: error.message };
    }
};

// Özel fonksiyonlar
export const hasAttachments = async ({ payload }) => {
    return processAttachments({ payload, condition: 'hasAttachments' });
};

export const hasAttachmentsAfter = async ({ payload }) => {
    return processAttachments({ payload, condition: 'hasAttachmentsAfter' });
};

export const hasAttachmentsBefore = async ({ payload }) => {
    return processAttachments({ payload, condition: 'hasAttachmentsBefore' });
};

export const hasAttachmentsBy = async ({ payload }) => {
    return processAttachments({ payload, condition: 'hasAttachmentsBy' });
};

export const attachmentsCountEquals = async ({ payload }) => {
    return processAttachments({ payload, condition: 'attachmentsCountEquals' });
};

export const attachmentsCountMoreThan = async ({ payload }) => {
    return processAttachments({ payload, condition: 'attachmentsCountMoreThan' });
};

export const attachmentsCountLessThan = async ({ payload }) => {
    return processAttachments({ payload, condition: 'attachmentsCountLessThan' });
};

export const attachedDate = async ({ payload }) => {
    return processAttachments({ payload, condition: 'attachedDate' });
};