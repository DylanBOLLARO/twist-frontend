'use client'

import { useConnectedUserContext } from '@/components/layout/providers'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { capitalizeFirstLetter } from '@/lib/utils'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LIST_LOGIN_INPUT_FIELD = ['email', 'password']
const LIST_FIRSTNAME_LASTNAME_INPUT_FIELD = ['last_name', 'first_name']

const InputField = ({ fieldName, setCredentials }: any) => {
    return (
        <div className="space-y-1">
            <Label htmlFor={fieldName}>
                {capitalizeFirstLetter(fieldName).replace('_', '')}
            </Label>
            <Input
                id={fieldName}
                onChange={(e) => {
                    setCredentials((prev: any) => {
                        console.log({
                            ...prev,
                            ...{ [fieldName]: e.target.value },
                        })
                        return {
                            ...prev,
                            ...{ [fieldName]: e.target.value },
                        }
                    })
                }}
            />
        </div>
    )
}

export default function TabsDemo() {
    const router = useRouter()

    const { setConnectedUser } = useConnectedUserContext()
    const [credentials, setCredentials] = useState<any>({})
    const [tab, setTab] = useState<string>('login')
    const [listInfo, setListInfo] = useState<Array<String>>([])

    useEffect(() => {
        setCredentials({})
        setListInfo([])
    }, [tab])

    async function signin() {
        setListInfo([])
        try {
            let response: any = await axios({
                method: 'post',
                url: `${process.env.NEXT_PUBLIC_API + '/auth/local/signin'}`,
                data: credentials,
            })

            if (
                Object.hasOwn(response?.data, 'access_token') &&
                Object.hasOwn(response?.data, 'refresh_token')
            ) {
                localStorage.setItem('at_nutrit', response?.data?.access_token)
                localStorage.setItem('rt_nutrit', response?.data?.refresh_token)

                response = await axios({
                    method: 'get',
                    url: `${process.env.NEXT_PUBLIC_API + '/auth/me'}`,
                    data: credentials,
                    headers: {
                        Authorization: `Bearer ${response?.data?.access_token}`,
                    },
                })

                setConnectedUser(response?.data)
                router.push('/')
            }
        } catch (error: any) {
            console.log(error)
            if (error?.response?.status == 400) {
                setListInfo(error?.response?.data?.message)
            }

            if (error?.response?.status == 403) {
                setListInfo([error?.response?.data?.message])
            }
        }
    }

    async function register(credentials: any) {
        setListInfo([])

        try {
            const response: any = await axios({
                method: 'post',
                url: `${process.env.NEXT_PUBLIC_API + '/auth/local/signup'}`,
                data: credentials,
            })
            if (
                Object.hasOwn(response?.data, 'access_token') &&
                Object.hasOwn(response?.data, 'refresh_token')
            ) {
                setListInfo([
                    'Your account has been successfully created!',
                    'You can now login!',
                ])
            }
        } catch (error: any) {
            if (error?.response?.status == 400) {
                setListInfo(error?.response?.data?.message)
            }

            if (error?.response?.status == 403) {
                setListInfo([error?.response?.data?.message])
            }
        }
    }

    return (
        <div className="flex flex-col w-full items-center py-10">
            <Tabs
                defaultValue="login"
                className="w-[400px]"
                onValueChange={(e) => {
                    setTab(e)
                }}
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">
                                Login
                            </CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {LIST_LOGIN_INPUT_FIELD.map((field) => {
                                return (
                                    <InputField
                                        key={`input_${field}`}
                                        fieldName={field}
                                        setCredentials={setCredentials}
                                    />
                                )
                            })}
                        </CardContent>
                        <CardFooter className="flex flex-col justify-center">
                            <div className="flex flex-col py-3 text-center gap-2">
                                {listInfo.map((i) => (
                                    <p
                                        key={`info_${i}`}
                                        className="rounded-md border border-input px-3 py-1 bg-destructive/55"
                                    >
                                        {i}
                                    </p>
                                ))}
                            </div>
                            <Button
                                size={'lg'}
                                className="font-bold"
                                onClick={() => {
                                    signin()
                                }}
                            >
                                Login
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="register">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">
                                Register
                            </CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex gap-3">
                                {LIST_FIRSTNAME_LASTNAME_INPUT_FIELD.map(
                                    (field) => {
                                        return (
                                            <InputField
                                                key={`input_${field}`}
                                                fieldName={field}
                                                setCredentials={setCredentials}
                                            />
                                        )
                                    }
                                )}
                            </div>
                            {[...LIST_LOGIN_INPUT_FIELD, 'confirm'].map(
                                (field) => {
                                    return (
                                        <InputField
                                            key={`input_${field}`}
                                            fieldName={field}
                                            setCredentials={setCredentials}
                                        />
                                    )
                                }
                            )}
                        </CardContent>

                        <CardFooter className="flex flex-col justify-center">
                            <div className="flex flex-col py-3 text-center gap-2">
                                {listInfo.map((i) => (
                                    <p
                                        key={`info_${i}`}
                                        className="rounded-md border border-input px-3 py-1 bg-destructive/55"
                                    >
                                        {i}
                                    </p>
                                ))}
                            </div>

                            <Button
                                disabled={
                                    credentials?.password !==
                                    credentials?.confirm
                                }
                                size={'lg'}
                                className="font-bold"
                                onClick={() => {
                                    register(credentials)
                                }}
                            >
                                Register
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
