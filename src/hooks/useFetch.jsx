import { useState } from "react"


export const useFetch = () => {

    const [loading, setLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState();
    const [error, setError] = useState(null);

    return (
        {
            loading,
            setLoading,
            fetchedData,
            setFetchedData,
            error,
            setError
        }
    )
}
