"use client"

import { icons } from "lucide-react"

type IconName = keyof typeof icons

interface IconProps {
    name: IconName
    color?: string
    size?: string | number
}

export const Icon = ({ name, color, size }: IconProps) => {
    const LucideIcon = icons[name]

    return LucideIcon ? <LucideIcon color={color} size={size} /> : null
}
