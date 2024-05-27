import api, { route } from "@forge/api";

export const elapsedSlaPercentageMoreThan = async ({ payload }) => {
    const issueIdOrKey = payload.issueIdOrKey; // Burada issueIdOrKey değerini kontrol edin
    try {
        const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        console.log(`Response: ${response.status} ${response.statusText}`);
        return await response.json()
    } catch (error) {
        console.error('Hata:', error);
        throw error; // Hata yönetimi
    }
};

export const elapsedSlaPercentageLessThan = async ({ payload }) => {
    const issueIdOrKey = payload.issueIdOrKey; // Burada issueIdOrKey değerini kontrol edin
    try {
        const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        console.log(`Response: ${response.status} ${response.statusText}`);
        return await response.json()
    } catch (error) {
        console.error('Hata:', error);
        throw error; // Hata yönetimi
    }
};