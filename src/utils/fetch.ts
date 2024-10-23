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

export async function removeHomeDetails(
    idOrSlug: string | undefined,
    at: string | undefined | null
) {
    try {
        const response: any = await axios({
            method: "delete",
            url: `${process.env.NEXT_PUBLIC_API}/home-details/${idOrSlug}`,
            headers: {
                Authorization: `Bearer ${at}`,
            },
        })
        return response
    } catch (error) {
        console.error(error)
    }
}
