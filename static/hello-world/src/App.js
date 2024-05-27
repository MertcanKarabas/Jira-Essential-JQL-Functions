import React, { useState, useEffect } from 'react';
import { router, invoke } from '@forge/bridge';
import { processInput } from './FunctionHandle';
import Spinner from '@atlaskit/spinner';
import {
    Card, TableContainer, StyledTable, StyledTh, StyledTd, StyledKey,
    StyledAssignee, FormContainer, Input, ButtonContainer, StyledButton,
    ErrorText
} from './Styles';

function App() {
    const [inputValue, setInputValue] = useState("");
    const [issues, setIssues] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchSuccessful, setSearchSuccessful] = useState(false);
    const [savedFilters, setSavedFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");

    useEffect(() => {
        const searchWhichFunction = async () => {
            setLoading(true); // Yüklenme durumunu başlat
            if (inputValue.trim() === '' || inputValue === undefined || inputValue === null) {
                setError('Wrong input!');
                setLoading(false); // Yüklenme durumunu bitir
            } else {
                setError(null);
                const regex = /("[^"]+"|\w+)\s*(>=|<=|in)\s*(\w+)\(([^)]*)\)/;
                const match = inputValue.match(regex);
                if (!match) {
                    setError("Wrong input! Doesn't Match!");
                    setLoading(false); // Yüklenme durumunu bitir
                    return;
                }

                const firstString = match[1].trim();
                const operator = match[2].trim();
                const functionName = match[3].trim();
                const args = match[4].trim();

                try {
                    const response = await processInput(firstString, functionName, args);
                    if (response.error) {
                        setError(response.error);
                        setIssues([]);
                        setSearchSuccessful(false);
                    } else {
                        setIssues(response); // Assuming response is an array of issues
                        setSearchSuccessful(true);
                    }
                } catch (error) {
                    setError('Error fetching issues');
                    setIssues([]);
                    setSearchSuccessful(false);
                } finally {
                    setLoading(false); // Yüklenme durumunu bitir
                    setFetchTrigger(false);
                }
            }
        };

        if (fetchTrigger) {
            searchWhichFunction();
        }
    }, [fetchTrigger, inputValue]);

    useEffect(() => {
        const fetchSavedFilters = async () => {
            try {
                const response = await invoke('getAllFilters');
                if (response.success) {
                    setSavedFilters(response.filters);
                } else {
                    setError(response.message);
                }
            } catch (error) {
                console.error('Error fetching filters:', error);
                setError('Error fetching filters');
            }
        };

        fetchSavedFilters();
    }, []);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = () => {
        setFetchTrigger(true);
    };

    const handleSaveFilterClick = async () => {
        if (searchSuccessful) {
            try {
                const response = await invoke('create', { payload: { query: inputValue } });
                console.log('Filter saved:', response);
                // Save filter to state
                if (response.success) {
                    setSavedFilters([...savedFilters, inputValue]);
                }
            } catch (error) {
                console.error('Error saving filter:', error);
            }
        } else {
            setError('Perform a successful search before saving.');
        }
    };

    const handleFilterChange = (e) => {
        const selectedQuery = e.target.value;
        setSelectedFilter(selectedQuery);
        setInputValue(selectedQuery);
        setFetchTrigger(true); // Automatically search with the selected filter
    };

    const issueRoute = (issueKey) => {
        router.open(`/browse/${issueKey}`);
    };

    return (
        <Card>
            <h1>Essential JQL Functions</h1>
            <FormContainer>
                <Input
                    type='text'
                    onChange={handleChange}
                    value={inputValue}
                    placeholder="Enter JQL function"
                />
                <ButtonContainer>
                    <StyledButton onClick={handleSearchClick}>Search</StyledButton>
                    <StyledButton onClick={handleSaveFilterClick}>Save as Filter</StyledButton>
                </ButtonContainer>
                <select onChange={handleFilterChange} value={selectedFilter}>
                    <option value="">Select a saved filter</option>
                    {savedFilters.map((filter, index) => (
                        <option key={index} value={filter}>{filter}</option>
                    ))}
                </select>
            </FormContainer>
            {error && <ErrorText>{error}</ErrorText>}
            {loading ? (
                <Spinner />
            ) : (
                <TableContainer>
                    {issues.length > 0 && (
                        <StyledTable>
                            <thead>
                                <tr>
                                    <StyledTh>Key</StyledTh>
                                    <StyledTh>Summary</StyledTh>
                                    <StyledTh>Priority</StyledTh>
                                    <StyledTh>Assignee</StyledTh>
                                </tr>
                            </thead>
                            <tbody>
                                {issues?.map((issue, index) => (
                                    <tr key={index}>
                                        <StyledTd onClick={() => issueRoute(issue.key)}><StyledKey>{issue.key}</StyledKey></StyledTd>
                                        <StyledTd>{issue.fields.summary}</StyledTd>
                                        <StyledTd>{issue.fields.priority.name}</StyledTd>
                                        <StyledTd>
                                            {issue.fields.assignee ? (
                                                <StyledAssignee>
                                                    <img src={`${Object.values(issue.fields.assignee.avatarUrls)[1]}`} alt={`${issue.fields.assignee.displayName} avatar`} />
                                                    {issue.fields.assignee.displayName}
                                                </StyledAssignee>
                                            ) : (
                                                'Unassigned'
                                            )}
                                        </StyledTd>
                                    </tr>
                                ))}
                            </tbody>
                        </StyledTable>
                    )}
                </TableContainer>
            )}
        </Card>
    );
}
export default App;