/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        transpilePackages: ["ui"],
        runtime: "experimental-edge",
    },
    images: {
        domains: ["images.unsplash.com", "www.allrecipes.com"],
    },
    typescript: {
        ignoreBuildErrors: true,
    },

};
module.exports = nextConfig
