import Resolver from '@forge/resolver';
import { hasAttachments, attachedDate, attachmentsCountEquals, attachmentsCountLessThan, attachmentsCountMoreThan, hasAttachmentsAfter, hasAttachmentsBefore, hasAttachmentsBy } from './Resolvers/AttachmentsReslovers';
import { groupsOfCurrentUser, groupsOfUser } from './Resolvers/GroupsResolvers';
import { subtasksOf, childrenOfSubQuery, epicsOf, issuesInEpics, parentsOf } from './Resolvers/HierarchicalResolver';
import { limitedResults } from './Resolvers/LimitedResultsResolvers';
import { issueLinksCountEqual, issueLinksCountLessThan, issueLinksCountMoreThan } from './Resolvers/LinkedIssuesResolvers';
import { organizationsOfCurrentUser, organizationsOfUser } from './Resolvers/OrganizationsResolvers';
import { assigneesInProjectRole, creatorsInProjectRole, reportersInProjectRole, usersHavingRoleInProject } from './Resolvers/ProjectRoleResolvers';
import { startOfQuarter, endOfQuarter } from './Resolvers/QuarterResolver';
import { elapsedSlaPercentageMoreThan, elapsedSlaPercentageLessThan } from './Resolvers/SLAPercentageResolvers';
import { SubtaskCountEquals, SubtaskCountLessThan, SubtaskCountMoreThan } from './Resolvers/SubtaskCountResolvers';
import { storage } from '@forge/api';
import { getCurrentUserAccountId } from "./Resolvers/Requests";

const resolver = new Resolver();


resolver.define('hasAttachments', ({ payload }) => {
    return hasAttachments({ payload });
})

resolver.define('attachedDate', ({ payload }) => {
    return attachedDate({ payload });
})

resolver.define('attachmentsCountEquals', ({ payload }) => {
    return attachmentsCountEquals({ payload });
})

resolver.define('attachmentsCountLessThan', ({ payload }) => {
    return attachmentsCountLessThan({ payload });
})

resolver.define('attachmentsCountMoreThan', ({ payload }) => {
    return attachmentsCountMoreThan({ payload });
})

resolver.define('hasAttachmentsAfter', ({ payload }) => {
    return hasAttachmentsAfter({ payload });
})

resolver.define('hasAttachmentsBefore', ({ payload }) => {
    return hasAttachmentsBefore({ payload });
})

resolver.define('hasAttachmentsBy', ({ payload }) => {
    return hasAttachmentsBy({ payload });
})

resolver.define('groupsOfCurrentUser', ({ payload }) => {
    return groupsOfCurrentUser({ payload });
})

resolver.define('groupsOfUser', ({ payload }) => {
    return groupsOfUser({ payload });
})

resolver.define('subtasksOf', ({ payload }) => {
    return subtasksOf({ payload })
})

resolver.define('childrenOfSubQuery', ({ payload }) => {
    return childrenOfSubQuery({ payload });
})

resolver.define('epicsOf', ({ payload }) => {
    return epicsOf({ payload });
})

resolver.define('issuesInEpics', ({ payload }) => {
    return issuesInEpics({ payload })
})

resolver.define('parentsOf', ({ payload }) => {
    return parentsOf({ payload });
})

resolver.define('limitedResults', ({ payload }) => {
    return limitedResults({ payload });
})

resolver.define('issueLinksCountEqual', ({ payload }) => {
    return issueLinksCountEqual({ payload });
})

resolver.define('issueLinksCountLessThan', ({ payload }) => {
    return issueLinksCountLessThan({ payload });
})

resolver.define('issueLinksCountMoreThan', ({ payload }) => {
    return issueLinksCountMoreThan({ payload });
})

resolver.define('organizationsOfCurrentUser', ({ payload }) => {
    return organizationsOfCurrentUser({ payload });
})

resolver.define('organizationsOfUser', ({ payload }) => {
    return organizationsOfUser({ payload });
})

resolver.define('assigneesInProjectRole', ({ payload }) => {
    return assigneesInProjectRole({ payload });
})

resolver.define('creatorsInProjectRole', ({ payload }) => {
    return creatorsInProjectRole({ payload });
})

resolver.define('reportersInProjectRole', ({ payload }) => {
    return reportersInProjectRole({ payload });
})

resolver.define('usersHavingRoleInProject', ({ payload }) => {
    return usersHavingRoleInProject({ payload });
})

resolver.define('startOfQuarter', ({ payload }) => {
    return startOfQuarter({ payload });
})

resolver.define('endOfQuarter', ({ payload }) => {
    return endOfQuarter({ payload });
})

resolver.define('elapsedSlaPercentageMoreThan', ({ payload }) => {
    return elapsedSlaPercentageMoreThan({ payload });
})

resolver.define('elapsedSlaPercentageLessThan', ({ payload }) => {
    return elapsedSlaPercentageLessThan({ payload });
})

resolver.define('SubtaskCountEquals', ({ payload }) => {
    return SubtaskCountEquals({ payload });
})

resolver.define('SubtaskCountLessThan', ({ payload }) => {
    return SubtaskCountLessThan({ payload });
})

resolver.define('SubtaskCountMoreThan', ({ payload }) => {
    return SubtaskCountMoreThan({ payload });
})

resolver.define('create', async ({ payload }) => {
    try {
        const { query } = payload;
        const userId = await getCurrentUserAccountId(); // Kullanıcının benzersiz ID'sini alın
        const key = `savedFilters_${userId}`; // Kullanıcıya özel bir key oluşturuyoruz
        let savedFilters = await storage.get(key) || [];

        // Eğer aynı filtre zaten varsa eklemiyoruz
        if (!savedFilters.includes(query)) {
            savedFilters.push(query);
            await storage.set(key, savedFilters);
        }

        return { success: true, message: 'Filter saved successfully' };
    } catch (error) {
        console.error('Error saving filter:', error);
        return { success: false, message: 'Error saving filter' };
    }
})

resolver.define('getAllFilters', async () => {
    try {
        const userId = await getCurrentUserAccountId();
        const key = `savedFilters_${userId}`;
        const savedFilters = await storage.get(key) || [];
        return { success: true, filters: savedFilters };
    } catch (error) {
        console.error('Error fetching filters:', error);
        return { success: false, message: 'Error fetching filters' };
    }
})
export const handler = resolver.getDefinitions();

