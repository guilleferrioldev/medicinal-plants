/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
        staleTimes: {
            dynamic: 30,
            static: 180,
        },
    },
    env: {
        BACKEND: 'http://localhost:8080'
    },
};

export default nextConfig;
