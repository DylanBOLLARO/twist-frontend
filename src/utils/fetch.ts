import axios from "axios"

export async function getHomeDetails(idOrSlug: string | undefined) {
    try {
        const response: any = await axios({
            method: "get",
            url: `${process.env.NEXT_PUBLIC_API}/home-details${
                idOrSlug ? `/${idOrSlug}` : ""
            }`,
        })
        return response?.data
    } catch (error) {
        console.error(error)
    }
}
