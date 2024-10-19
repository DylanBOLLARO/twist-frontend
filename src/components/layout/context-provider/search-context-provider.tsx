'use client'

import { typeOfContract, typeOfProperty } from '@/constants'
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const SearchContext = createContext<any>(undefined)

export const SearchContextProvider = ({ children }: any) => {
    const listOfSelectFilter = [
        [
            Object.entries({ typeOfProperty: 'Type of property' }),
            Object.entries(typeOfProperty),
        ],
        [
            Object.entries({ typeOfContract: 'Type of contract' }),
            Object.entries(typeOfContract),
        ],
    ]

    const defaultValuesFilter = () => {
        const keys = listOfSelectFilter.map(([keyData, _]: any) => {
            const [[propertyKey, __]] = keyData
            return propertyKey
        })

        return keys.reduce((acc, value) => {
            return { ...acc, [value]: '' }
        }, {})
    }

    const [homeDetails, setHomeDetails] = useState([])
    const [selectFilterValues, setSelectFilterValues] = useState<string | null>(
        defaultValuesFilter()
    )

    async function getHomeDetails() {
        const url = process.env.NEXT_PUBLIC_API + '/home-details'
        try {
            const response = await axios.get(url ?? '')
            setHomeDetails(response?.data)
        } catch (error) {
            console.error(error)
        }
    }

    const resetValuesOfSearchFilter = () => {
        setSelectFilterValues(defaultValuesFilter())
    }

    const search = () => {
        console.log('first')
    }

    useEffect(() => {
        getHomeDetails()
    }, [])

    return (
        <SearchContext.Provider
            value={{
                selectFilterValues,
                setSelectFilterValues,
                listOfSelectFilter,
                resetValuesOfSearchFilter,
                search,
                getHomeDetails,
                homeDetails,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const searchContext = useContext(SearchContext)
    if (searchContext === undefined) {
        throw new Error(
            'useSearchContext must be inside a SearchContextProvider'
        )
    }
    return searchContext
}
