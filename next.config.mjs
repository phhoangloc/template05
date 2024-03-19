/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: "4000"
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
                port: '',
            },
        ],
    },

    env: {
        server_url: "http://localhost:4000/",
        server_url_: "https://be-mywatch.vercel.app/",
        google_url: "https://drive.google.com/uc?id="
    }
};

export default nextConfig;
