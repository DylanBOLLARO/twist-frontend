import { Card } from "./ui/card"

export const NoDataAvailable = ({ text }: any) => {
    return (
        <Card className="flex text-xl text-muted-foreground w-full p-5 justify-center">
            {text}
        </Card>
    )
}
