/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    basePath: isProd ? '/twist' : undefined,
    output: isProd ? 'standalone' : undefined,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
                search: '',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*{/}?',
                headers: [
                    {
                        key: 'X-Accel-Buffering',
                        value: 'no',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
