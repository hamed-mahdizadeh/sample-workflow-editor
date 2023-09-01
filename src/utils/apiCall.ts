export const searchNodes = async (searchTerm: string) => {
    const response = await fetch(
        '/nodes',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({searchTerm})
        });
    const filteredResults = await response.json();
    return filteredResults.nodes;
}