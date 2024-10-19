import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { typeOfContract, typeOfProperty } from '@/constants'
import { useState } from 'react'

const LIST_OF_SELECT_FILTER = [
    [
        Object.entries({ typeOfProperty: 'Type of property' }),
        Object.entries(typeOfProperty),
    ],
    [
        Object.entries({ typeOfContract: 'Type of contract' }),
        Object.entries(typeOfContract),
    ],
]

export const FilterBar = () => {
    const defaultValuesFilter = () => {
        const keys = LIST_OF_SELECT_FILTER.map(([keyData, _]: any) => {
            const [[propertyKey, __]] = keyData
            return propertyKey
        })

        return keys.reduce((acc, value) => {
            return { ...acc, [value]: '' }
        }, {})
    }

    const [selectFilterValues, setSelectFilterValues] = useState<any>(
        defaultValuesFilter()
    )

    const search = () => {
        console.log(selectFilterValues)
    }

    return (
        <Card className="flex gap-3 p-3 justify-between items-center">
            <div className="flex gap-3">
                {LIST_OF_SELECT_FILTER.map(
                    ([keyData, listOfKeyDataValue]: any) => {
                        const [[propertyKey, prettyStringOfKey]] = keyData

                        return (
                            <Select
                                key={`select_${propertyKey}`}
                                value={selectFilterValues[propertyKey]}
                                onValueChange={(value) => {
                                    setSelectFilterValues((prev: any) => {
                                        return {
                                            ...prev,
                                            ...{ [propertyKey]: value },
                                        }
                                    })
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue
                                        placeholder={prettyStringOfKey}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {listOfKeyDataValue.map(
                                            (keyDataValue: any) => {
                                                const [
                                                    propertyKey,
                                                    prettyStringOfKey,
                                                ] = keyDataValue
                                                return (
                                                    <SelectItem
                                                        key={`select-item_${propertyKey}`}
                                                        value={propertyKey}
                                                    >
                                                        {prettyStringOfKey}
                                                    </SelectItem>
                                                )
                                            }
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }
                )}
                <Button
                    variant={'outline'}
                    onClick={() => {
                        setSelectFilterValues(defaultValuesFilter())
                    }}
                >
                    Reset
                </Button>
            </div>
            <Button
                onClick={() => {
                    search()
                }}
            >
                Search
            </Button>
        </Card>
    )
}
