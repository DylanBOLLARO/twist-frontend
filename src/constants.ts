type TypeOfProperty = {
    APARTMENT: string
    HOUSE: string
    OTHER: string
}

export const typeOfProperty: TypeOfProperty = Object.freeze({
    APARTMENT: 'Apartment',
    HOUSE: 'House',
    OTHER: 'Other',
})

type TypeOfontract = {
    SHORT_TERM_RENTAL: string
    LONG_TERM_RENTAL: string
    SALE: string
}

export const typeOfontract: TypeOfontract = Object.freeze({
    LONG_TERM_RENTAL: 'Long Term Rental',
    SHORT_TERM_RENTAL: 'Short Term Rental',
    SALE: 'For Sale',
})

export const nbBedroomsAndnbBathrooms: any = Object.freeze({
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    THREE_AND_MORE: '3 and more',
})

export const NUMBER_OF_PICTURES = 3

export const LIST_CHOICE_BOOLEAN = Object.freeze({
    no: false,
    yes: true,
})
