import axios from 'axios';
import React, { useContext, useState } from 'react'
import Input from '../input/Input';
import HomeContext from '../../contextapi/HomeContextContainer';

const SearchBar = () => {
    const pathname = "characters";
    const [characterName, setcharacterName] = useState('');
    const { setCharacters } = useContext(HomeContext);

    const handleCharacterNameChange = (newcharacterName) => {
        setcharacterName(newcharacterName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_api_base_url}/${pathname}?name=${characterName}&ts=${process.env.REACT_APP_ts}&apikey=${process.env.REACT_APP_api_key}&hash=${process.env.REACT_APP_api_hash}`

        axios.get(url).then((res) => {
            setCharacters(res.data.data);
        })
        // Handle form submission here
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xlg mx-auto">
            <Input
                type="text"
                label="Character:"
                value={characterName}
                onChange={handleCharacterNameChange}
                placeholder="Enter your character name"
                className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar
