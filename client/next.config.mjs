/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
        staleTimes: {
            dynamic: 30,
            static: 180,
        },
    },
};

export default nextConfig;
