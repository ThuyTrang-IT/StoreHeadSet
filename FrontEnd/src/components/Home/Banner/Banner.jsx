import React, { useState, useEffect } from 'react';
import './Banner.scss';

const banners = [
  {
    imageUrl: "https://www.headset-store.co.uk/content/pages/home/headset-store-homepage-banner.jpg",
    link: "/product-link-1" // Replace with the actual product link
  },
  {
    imageUrl: "https://www.headset-store.co.uk/content/pages/home/Jabra-Evolve-Series-Homepage-Banner.jpg",
    link: "https://www.headset-store.co.uk/jabra-evolve-headsets.html" // Replace with the actual product link
  },
  {
    imageUrl: "https://www.headset-store.co.uk/content/pages/home/Homeworking-homepage-banner.jpg",
    link: "https://www.headset-store.co.uk/working-from-home.html" // Replace with the actual product link
  },
  {
    imageUrl: "https://www.headset-store.co.uk/content/pages/home/poly-voyager-focus-homepage-banner-23.jpg",
    link: "https://www.headset-store.co.uk/plantronics-voyager-focus-headsets.html" // Replace with the actual product link
  }
];

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prevBanner => (prevBanner + 1) % banners.length);
    }, 5000); // Change banner every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="hero-banner" id="top">
      <a href={banners[currentBanner].link}>
        <div
          className="background-image"
          style={{ backgroundImage: `url(${banners[currentBanner].imageUrl})` }}
        />
      </a>
      <div className="content">
        <div className="text-content">
          <h1></h1>
          <div className="ctas">
            <div className="banner-cta"></div>
            <div className="banner-cta version2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
