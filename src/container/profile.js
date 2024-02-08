import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import HomeContext from '../contextapi/HomeContextContainer';

const Profile = () => {
    let { id } = useParams();
    const [profile, setProfile] = useState();
    const { pathname, setPathname } = useContext(HomeContext);

    useEffect(() => {
        setPathname("characters");
    }, []);

    useEffect(() => {
        if (pathname) {
            const url = `${process.env.REACT_APP_api_base_url}${pathname}/${id}?ts=${process.env.REACT_APP_ts}&apikey=${process.env.REACT_APP_api_key}&hash=${process.env.REACT_APP_api_hash}`;

            axios.get(url).then((res) => {
                setProfile(res.data.data.results[0]);
            });
        }
    }, [pathname]);

    if (!profile) {
        return null; // Render nothing until profile data is fetched
    }

    return (
        <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded shadow">
            <h2 className="text-3xl font-semibold mb-4">Name: {profile.name}</h2>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Description:</h2>
                <p className="text-gray-700">{profile.description}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Thumbnail:</h2>
                <img src={`${profile.thumbnail.path}.${profile.thumbnail.extension}`} width="50" height="50" alt={profile.name} />
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Comics Appeared In:</h2>
                <ul>
                    {profile.comics.items.map((element, index) => (
                        <li key={index} className="text-gray-700">{element.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-2">Series:</h2>
                <ul>
                    {profile.series.items.map((element, index) => (
                        <li key={index} className="text-gray-700">{element.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
