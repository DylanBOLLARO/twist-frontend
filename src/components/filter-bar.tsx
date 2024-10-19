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
import { useSearchContext } from './layout/context-provider/search-context-provider'

export const FilterBar = () => {
    const {
        listOfSelectFilter,
        selectFilterValues,
        setSelectFilterValues,
        resetValuesOfSearchFilter,
        search,
    } = useSearchContext()

    return (
        <Card className="flex gap-3 p-3 justify-between items-center">
            <div className="flex gap-3">
                {listOfSelectFilter?.map(
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
                <Button variant={'outline'} onClick={resetValuesOfSearchFilter}>
                    Reset
                </Button>
            </div>
        </Card>
    )
}
