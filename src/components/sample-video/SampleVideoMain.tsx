'use client'
import React, { useEffect, useState } from 'react'
import VideoTemplate from './VideoTemplate'
import { Box } from '@chakra-ui/react';
import bgImg from '@/assests/bg-img.jpeg'
import bgImg2 from '@/assests/bg-img2.jpg'
import bgImg3 from '@/assests/bg-img3.jpg'
import bgImg4 from '@/assests/bg-img4.jpg'
import { IWeddingInfoType } from '@/interFace/interFace';

const SampleVideoMain = ({ weddingInfo }: { weddingInfo: IWeddingInfoType }) => {
  useEffect(() => {
    // **Prevent Right-Click**
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    // **Prevent DevTools Shortcuts**
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && event.key === "I") ||
        (event.ctrlKey && event.shiftKey && event.key === "J") ||
        (event.ctrlKey && event.key === "U")
      ) {
        event.preventDefault();
      }
    });

    // **Detect DevTools Open**
    const devToolsCheck = () => {
      const element = new Image();
      Object.defineProperty(element, "id", {
        get: function () {
          alert("Developer Tools detected! Closing window...");
          window.close(); // Close window if DevTools are detected
        },
      });
      console.log("%c", element);
    };
    setInterval(devToolsCheck, 2000);

    // **Prevent Debugging**
    setInterval(() => {
      debugger;
    }, 1000);

    return () => {
      document.removeEventListener("contextmenu", (event) => event.preventDefault());
      document.removeEventListener("keydown", () => { });
    };
  }, []);

  console.log(weddingInfo)
  return (
    <Box
      p={[2, 5, 10]}
      userSelect="none"
      bgImage={`url(${bgImg.src})`} // Extract URL from StaticImageData
      bgSize="cover"
    // bgPosition="center"
    >
      <VideoTemplate weddingInfo={weddingInfo} />
    </Box>
  )
}

export default SampleVideoMain
