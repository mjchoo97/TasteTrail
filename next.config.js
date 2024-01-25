/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:"tastetrailnodeserver.onrender.com",
            }
        ]
    }
}

module.exports = nextConfig
