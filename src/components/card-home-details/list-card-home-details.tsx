import { CardHomeDetails } from "./card-home-details"

export const ListCardHomeDetails = ({
    listOfHomeDetails,
}: {
    listOfHomeDetails: Array<any>
}) => {
    return (
        <div className="grid grid-cols-4 gap-5">
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
