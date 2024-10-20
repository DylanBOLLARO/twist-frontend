"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { typeOfContract, typeOfProperty } from "@/constants/constants"
import axios from "axios"

const SearchContext = createContext<any>(undefined)

export const SearchContextProvider = ({ children }: any) => {
    const listOfSelectFilter = [
        [
            Object.entries({ typeOfProperty: "Type of property" }),
            Object.entries(typeOfProperty),
        ],
        [
            Object.entries({ typeOfContract: "Type of contract" }),
            Object.entries(typeOfContract),
        ],
    ]

    const defaultValuesFilter = () => {
        const keys = listOfSelectFilter.map(([keyData, _]: any) => {
            const [[propertyKey, __]] = keyData
            return propertyKey
        })

        return keys.reduce((acc, value) => {
            return { ...acc, [value]: "" }
        }, {})
    }

    const [homeDetails, setHomeDetails] = useState([])
    const [selectFilterValues, setSelectFilterValues] = useState<string | null>(
        defaultValuesFilter()
    )

    async function getHomeDetails() {
        try {
            const response = await axios({
                method: "get",
                url: `${process.env.NEXT_PUBLIC_API}/home-details`,
                params: selectFilterValues,
            })
            setHomeDetails(response?.data)
        } catch (error) {
            console.error(error)
        }
    }

    const resetValuesOfSearchFilter = () => {
        setSelectFilterValues(defaultValuesFilter())
    }

    useEffect(() => {
        getHomeDetails()
    }, [])

    useEffect(() => {
        getHomeDetails()
    }, [selectFilterValues])

    return (
        <SearchContext.Provider
            value={{
                selectFilterValues,
                setSelectFilterValues,
                listOfSelectFilter,
                resetValuesOfSearchFilter,
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
            "useSearchContext must be inside a SearchContextProvider"
        )
    }
    return searchContext
}
