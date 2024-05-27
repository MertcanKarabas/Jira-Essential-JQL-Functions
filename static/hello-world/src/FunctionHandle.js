import {
    attachmentsCountEquals,
    hasAttachments,
    hasAttachmentsAfter,
    hasAttachmentsBefore,
    hasAttachmentsBy,
    attachedDate,
    attachmentsCountLessThan,
    attachmentsCountMoreThan
} from './Functions/Attachments';
import { groupsOfCurrentUser, groupsOfUser } from './Functions/Groups';
import { childrenOfSubQuery, epicsOf, issuesInEpics, parentsOf, subtasksOf } from './Functions/Hierarchical';
import { limitedResults } from './Functions/LimitedResults';
import { issueLinksCountEqual, issueLinksCountLessThan, issueLinksCountMoreThan } from './Functions/LinkedIssues';
import { organizationsOfCurrentUser, organizationsOfUser } from './Functions/Organizations';
import { assigneesInProjectRole, creatorsInProjectRole, reportersInProjectRole, usersHavingRoleInProject } from './Functions/ProjectRoles';
import { endOfQuarter, startOfQuarter } from './Functions/Quarters';
import { elapsedSlaPercentageLessThan, elapsedSlaPercentageMoreThan } from './Functions/SLAPercentages';
import { SubtaskCountEquals, SubtaskCountLessThan, SubtaskCountMoreThan } from './Functions/SubtaskCount';

const functionsMap = {
    hasAttachments,
    hasAttachmentsAfter,
    hasAttachmentsBefore,
    hasAttachmentsBy,
    attachmentsCountEquals,
    attachmentsCountLessThan,
    attachmentsCountMoreThan,
    attachedDate,
    groupsOfCurrentUser,
    groupsOfUser,
    childrenOfSubQuery,
    epicsOf,
    issuesInEpics,
    parentsOf,
    subtasksOf,
    limitedResults,
    issueLinksCountEqual,
    issueLinksCountLessThan,
    issueLinksCountMoreThan,
    organizationsOfCurrentUser,
    organizationsOfUser,
    assigneesInProjectRole,
    creatorsInProjectRole,
    reportersInProjectRole,
    usersHavingRoleInProject,
    endOfQuarter,
    startOfQuarter,
    elapsedSlaPercentageLessThan,
    elapsedSlaPercentageMoreThan,
    SubtaskCountEquals,
    SubtaskCountLessThan,
    SubtaskCountMoreThan,
};

export const FunctionHandler = async (funcName, firstString, args) => {
    const func = functionsMap[funcName];
    if (func) {
        try {
            return await func(firstString, args);
        } catch (error) {
            console.error(`Error executing function ${funcName}:`, error);
            return {error: `Error executing function ${funcName}: ${error}`};
        }
    } else {
        console.log("Function not found!");
        return {error: 'Function not found'};
    }
}

export const processInput = async (firstString, functionName, args) => {
    const response = await FunctionHandler(functionName, firstString, args);
    return response || [];
}