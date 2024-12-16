module.exports = {
  basePath: process.env.NEXT_CONFIG_BASE_PATH || '',
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  output: "standalone",
  reactStrictMode: false,
};
// export default {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'avatars.githubusercontent.com'
//       },
//       {
//         protocol: 'https',
//         hostname: '*.public.blob.vercel-storage.com'
//       }
//     ]
//   }
// };
