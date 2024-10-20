import { Card } from "./ui/card"

export const NoDataAvailable = () => {
    return (
        <Card className="flex text-xl text-muted-foreground w-full p-5 justify-center">
            No data available to display at the moment. Please try again later
            or contact support if the issue persists.
        </Card>
    )
}
