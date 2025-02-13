import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../src/assets/Artboard 1.json"; 

const VideoScroll = () => {
  const lottieRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [animationFrames, setAnimationFrames] = useState(273); 

  
  useEffect(() => {
    if (lottieRef.current) {
      setAnimationFrames(lottieRef.current.animationTotalFrames || 273);
    }
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (!lottieRef.current || !scrollContainerRef.current) return;

      const scrollX = scrollContainerRef.current.scrollLeft; 
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const progress = maxScroll > 0 ? scrollX / maxScroll : 0; 

      let currentFrame = Math.floor(progress * animationFrames); 
      lottieRef.current.goToAndStop(currentFrame, true); 
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [animationFrames]);

  return (
    <div style={{
      width: "100vw", height: "100vh", display: "flex", flexDirection: "column", 
      alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5"
    }}>
    
      <div style={{ width: "50%", height: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

    
      <div ref={scrollContainerRef} style={{
        width: "80%",
        height: "20px",
        overflowX: "scroll",
        whiteSpace: "nowrap",
        background: "#ddd",
        borderRadius: "10px",
        marginTop: "20px",
      }}>
        <div style={{
          width: "300%", 
          height: "20px",
          background: "linear-gradient(to right, #4CAF50, #2196F3)",
          borderRadius: "10px"
        }}></div>
      </div>
    </div>
  );
};

export default VideoScroll;
