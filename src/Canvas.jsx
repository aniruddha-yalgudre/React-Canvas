import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Canvas = () => {
    const canvasRef = useRef(null); 
    const [images, setImages] = useState([]); // State to store loaded images 
    const frames = {
      currentIndex: 0,
      maxIndex:469, // Update this to match your max image count
    };
  
    // Function to preload images
    
    const preloadImages = () => {

        let loadedImages = [];
        let imagesLoaded = 0;
  
      for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `./canvas/${i.toString().padStart(4, "0")}.png`;
        const img = new Image();
        img.src = imageUrl;
  
        img.onload = () => {
          imagesLoaded++;
          if (imagesLoaded === frames.maxIndex) {
            setImages(loadedImages); // Set loaded images to state
            loadImage(frames.currentIndex); // Load the first image
            frameAnimation(); // Start the animation
          }
        };
  
        loadedImages.push(img);
      }
    };
  
    // Function to draw the image on the canvas

    const loadImage = (index) =>{
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
  
      if (index >= 0 && index <= frames.maxIndex && images.length > 0) {
        const img = images[index];
  
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
  
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);
  
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
  
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;
  
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
  
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
  
        frames.currentIndex = index;
      }
    };
  
    

    // Function to setup the GSAP animation
    const frameAnimation = () => {
      gsap.timeline({
        scrollTrigger: {
          trigger:"#parent",
          start:"top top",
        //   end:"200% top ",
          scrub:2,
        //   pin:true,
          markers:true,
        },
      }).to(frames, {
        currentIndex: frames.maxIndex,
        
        onUpdate:()=> {
          loadImage(Math.floor(frames.currentIndex));
        },
      });
    };
  
    // Load images when the component mounts
    useEffect(() => {
      preloadImages();
    }, []);
  
    return (
        <div id="parent" className="parent relative w-full  h-[300vh] "> 
              <div className="sticky  h-[100vh]  top-0  right-0  w-full z-50 ">
                <canvas className=" absolute top-0 left-0  w-full h-full " ref={canvasRef}></canvas>
              </div>  
                   <div className="page2 h-full w-full  z-0 ">

                   <div id="text">
       
                       <div id="right">
                           <h3>CYBERFICTION / KEY WORD</h3>
                           <h1>HAVE FUN   LET'S PLAY 
                               JUST BE TOGETHER</h1>
                       </div>
       
                       <div id="left">
       
                           <h1>MAKE A STORY 
                               TAKE A CHANCE 
                               BUILD AND OWNED</h1>
       
                           <h3>...AND MAINTAIN THE GOOD HUMANITY</h3>
       
                       </div>
       
                   </div>
               </div>
        
        


                   <div className="page2 h-full w-full  z-0 ">

                   <div id="text">
       
                       <div id="right">
                           <h3>CYBERFICTION / KEY WORD</h3>
                           <h1>HAVE FUN   LET'S PLAY 
                               JUST BE TOGETHER</h1>
                       </div>
       
                       <div id="left">
       
                           <h1>MAKE A STORY 
                               TAKE A CHANCE 
                               BUILD AND OWNED</h1>
       
                           <h3>...AND MAINTAIN THE GOOD HUMANITY</h3>
       
                       </div>
       
                   </div>
               </div>
      
      
        
        
      </div>      
    );
  };
  
  export default Canvas;
  