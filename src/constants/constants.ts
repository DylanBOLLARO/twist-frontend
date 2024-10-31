export const typeOfProperty: any = Object.freeze({
    APARTMENT: "Apartment",
    HOUSE: "House",
    OTHER: "Other",
})

export const typeOfContract: any = Object.freeze({
    LONG_TERM_RENTAL: "Long Term Rental",
    SHORT_TERM_RENTAL: "Short Term Rental",
    SALE: "For Sale",
})

export const nbBedroomsAndnbBathrooms: any = Object.freeze({
    ZERO: "0",
    ONE: "1",
    TWO: "2",
    THREE_AND_MORE: "3 and more",
})

export const NUMBER_OF_PICTURES = 3

export const LIST_CHOICE_BOOLEAN = Object.freeze({
    no: false,
    yes: true,
})

export const noDataAvailable = {
    youHaveNoPublications: "You don't have any publications yet",
    noDataAvailable:
        "No data available to display at the moment. Please try again later or contact support if the issue persists.",
}

export const BADGES_LIST = [
    { key: "bedrooms", icon: "BedDouble" },
    { key: "bathrooms", icon: "Bath" },
    { key: "garage" },
    { key: "garden" },
    { key: "pool" },
]
