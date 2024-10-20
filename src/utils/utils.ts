import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function imageLoader({ src, width, quality }: any) {
    return `${src}?w=${width}&q=${quality || 25}`
}

export function capitalizeFirstLetter(string: string) {
    return string[0]?.toUpperCase() + string?.slice(1)?.toLowerCase()
}
