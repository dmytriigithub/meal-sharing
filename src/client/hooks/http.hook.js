import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true);
    
        try {
            const options = {
                method,
                headers,
                body: body ? JSON.stringify(body) : null
            };
    
            const response = await fetch(url, options);
            if (response.status === 404) {
                const data = await response.json([]);
    
                setLoading(false);
                return data;
            } else if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            } else {
                const data = await response.json();
    
                setLoading(false);
                return data;
            }
        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);
    

    

    const clearError = useCallback(() => setError(null), []);


    return {loading, request, error, clearError}
}