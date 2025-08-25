// For CSR use:
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

// For full SSR use:
const withLitSSR = require('@lit-labs/nextjs')();

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@maersk-global/mds-react-wrapper'],
};

module.exports = withLitSSR(nextConfig);
