import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy program URLs now live under /programs/[slug]
      {
        source: "/boys-to-men",
        destination: "/programs/boys-to-men",
        permanent: true,
      },
      {
        source: "/pad-a-girl",
        destination: "/programs/pad-a-girl",
        permanent: true,
      },
      {
        source: "/school-ministry",
        destination: "/programs/school-ministry",
        permanent: true,
      },
      {
        source: "/cycle-for-change",
        destination: "/programs/cycle-for-change",
        permanent: true,
      },
      {
        source: "/pastors-kids",
        destination: "/programs/pastors-kids",
        permanent: true,
      },
      {
        source: "/youth-camps",
        destination: "/programs/youth-camps",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
