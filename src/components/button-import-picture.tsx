"use client"

import { useRef } from "react"

import { Button } from "./ui/button"

export const ButtonImportPicture = (props: any) => {
    const { disable, setSelectedImages, selectedImages } = props
    const inputRef = useRef<any>(null)

    function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (!inputRef || !inputRef.current) return

        inputRef.current.click()
    }

    return (
        <>
            <div className="flex gap-3">
                <Button
                    variant={"outline"}
                    disabled={disable}
                    onClick={handleButtonClick}
                >
                    Import picture
                </Button>
            </div>
            <input
                ref={inputRef}
                type="file"
                hidden
                onChange={(e: any) => {
                    const file = e.target.files[0]
                    setSelectedImages((prev: any) => {
                        if (!(selectedImages.length >= 3)) {
                            return [...prev, file]
                        }
                    })
                }}
            />
        </>
    )
}
