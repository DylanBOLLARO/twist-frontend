import { CardHomeDetails } from "./card-home-details"

export const ListCardHomeDetails = ({
    listOfHomeDetails,
}: {
    listOfHomeDetails: Array<any>
}) => {
    return (
        <div className="grid xl:grid-cols-4 gap-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {listOfHomeDetails?.map((homeDetails: any) => {
                return (
                    <CardHomeDetails
                        key={`card-home-details_${homeDetails?.slug}`}
                        homeDetails={homeDetails}
                    />
                )
            })}
        </div>
    )
}
