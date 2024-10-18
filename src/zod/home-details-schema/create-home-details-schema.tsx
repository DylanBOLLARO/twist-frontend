import {
    nbBedroomsAndnbBathrooms,
    typeOfontract,
    typeOfProperty,
} from '@/constants'
import { z } from 'zod'

export type createHomeDetailsFormValues = z.infer<
    typeof createHomeDetailsFormSchema
>

export const createHomeDetailsFormSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: 'Title must be at least 2 characters.',
        })
        .max(30, {
            message: 'Title must not be longer than 30 characters.',
        }),
    description: z.string().min(20, {
        message: 'Description must be at least 20 characters.',
    }),
    slug: z.string(),
    price: z.string().refine(
        (v) => {
            let n = Number(v)
            return !isNaN(n) && v?.length > 0
        },
        { message: 'Please enter only a number' }
    ),
    area: z.string().refine(
        (v) => {
            let n = Number(v)
            return !isNaN(n) && v?.length > 0
        },
        { message: 'Please enter only a number' }
    ),
    images: z.string().array().default(['']),
    garage: z.boolean(),
    garden: z.boolean(),
    pool: z.boolean(),

    address: z.string(),
    postalCode: z.string().refine(
        (v) => {
            let n = Number(v)
            return !isNaN(n) && v?.length > 0
        },
        { message: 'Please enter only a number' }
    ),
    city: z.string(),
    country: z.string(),
    userId: z.number(),

    // @ts-ignore // zod error ? Argument of type 'string[]' is not assignable to parameter of type 'readonly [string, ...string[]]'.
    typeOfontract: z.enum([...Object.keys(typeOfontract)]),
    // @ts-ignore // zod error ? Argument of type 'string[]' is not assignable to parameter of type 'readonly [string, ...string[]]'.
    typeOfProperty: z.enum([...Object.keys(typeOfProperty)]),
    // @ts-ignore // zod error ? Argument of type 'string[]' is not assignable to parameter of type 'readonly [string, ...string[]]'.
    bathrooms: z.enum([...Object.keys(nbBedroomsAndnbBathrooms)]),
    // @ts-ignore // zod error ? Argument of type 'string[]' is not assignable to parameter of type 'readonly [string, ...string[]]'.
    bedrooms: z.enum([...Object.keys(nbBedroomsAndnbBathrooms)]),
})
