'use client'

import { useRef } from 'react'
import { Button } from './ui/button'

export const ButtonImportPicture = (props: any) => {
    const { disable, setSelectedImages } = props
    const inputRef = useRef<any>(null)

    function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (!inputRef || !inputRef.current) return

        inputRef.current.click()
    }

    function handleFileUpload(e: any) {
        setSelectedImages((prev: any) => [
            ...prev,
            URL.createObjectURL(e.target.files[0]),
        ])
    }

    // can upload picture with URL.createObjectURL() method instead of use base64 images ?
    // function handleFileUpload(e: any) {
    //     const file = e.target.files[0]
    //     if (file) {
    //         const reader = new FileReader()
    //         reader.onloadend = () => {
    //             setSelectedImages((prev: any) => [...prev, reader.result])
    //         }

    //         reader.readAsDataURL(file)
    //     }
    // }

    return (
        <>
            <div className="flex gap-3">
                <Button
                    variant={'outline'}
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
                onChange={handleFileUpload}
            />
        </>
    )
}
