import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Creating the context
const HomeContext = createContext();

// Custom hook to use the context
export const useHomeContext = () => {
    return useContext(HomeContext);
};

// Provider component
export const HomeContextProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [pathname, setPathname] = useState();
    const [offset, setOffset] = useState(1);
    const [limit, setlimit] = useState(20);


    useEffect(() => {
        if (pathname) {
            const url = `${process.env.REACT_APP_api_base_url}/${pathname}?ts=${process.env.REACT_APP_ts}&apikey=${process.env.REACT_APP_api_key}&hash=${process.env.REACT_APP_api_hash}&limit=${limit}&offset=${offset}`

            axios.get(url).then((res) => {
                setCharacters(res.data.data)
            })
        }

    }, [pathname, offset, limit])

    return (
        <HomeContext.Provider value={{ pathname, setPathname, limit, setlimit, offset, setOffset, characters, setCharacters }}>
            {children}
        </HomeContext.Provider>
    );
};

export default HomeContext;
