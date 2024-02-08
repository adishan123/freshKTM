import React, { useContext, useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import HomeContext from '../contextapi/HomeContextContainer'
import routes from '../constants/routes'

import CharacterChart from '../component/characterchart/CharacterChart'
import SearchBar from '../component/searchbar/SearchBar'
import Table from '../component/table/Table'
import Profile from './profile'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path={routes.HOME} element={<Home />}></Route>
                <Route path={routes.CHARACTER}>
                    <Route path={routes.PROFILE} element={<Profile />}></Route>
                </Route>
            </Routes>
        </Router>
    )
}


export default App


const Home = () => {
    const { setPathname, characters } = useContext(HomeContext)
    const [data, setData] = useState([])
    const [chartData, setChartData] = useState([]);

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Description', accessor: 'description' },
        { header: 'Thumbnail', accessor: 'thumbnail' }
    ];

    useEffect(() => {
        setPathname('characters');
    }, [])

    useEffect(() => {
        if (characters) {
            setData(characters.results)
        }
    }, [characters])

    useEffect(() => {
        if (data) {
            setChartData(chartData => (
                data.map(element => ({
                    name: element.name,
                    comics: element.comics.available
                }))
            ));
        }
    }, [data]);

    console.log(chartData);

    return (
        <div className="max-w-6xl mx-auto">
            {/* SearchBar */}
            <div className="mb-8">
                <SearchBar />
            </div>

            {/* Table and Chart */}
            <div className="flex flex-col md:flex-row justify-center">
                {/* Table */}
                <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4 rounded-lg overflow-hidden shadow-md bg-white p-4">
                    <Table columns={columns} data={data} />
                </div>

                {/* Chart */}
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-md bg-white p-4">
                    <CharacterChart data={chartData} />
                </div>
            </div>
        </div>

    )
}
