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

};
module.exports = nextConfig
