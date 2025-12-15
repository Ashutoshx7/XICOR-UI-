"use client";

import {useEffect,useRef} from "react";


const TrailContainer=()=>{

    const trailContainerRef=useRef(null);
    const animationStateRef=useRef(null);
    const trailRef =useRef([]);
    const currentImageIndexRef=useRef(0);
    const mousePosRef =useRef({x:0,y:0});
    const lastMousePosRef=useRef({x:0,y:0});
    const interpolatedMousePosRed= useRef ({x:0,y:0});
    const isDesktoPRef=useRef(false);

     
    useEffect(()=>{
        const config={
            imageLifspan:1000,
            inDuration:750,
            outDuration:1000,
            staggerIn:100,
            staggerOut:25,
            slideDuration:1000,
            slideEasing:"cubic-bezier(0.25,0.46,0.45,0.94",
            easing:"cubic-bezier(0.87,0,0.13,1",

        }
        
    },[])

    return <div className=".trail-container" ref={trailContainerRef}></div>

}


export default TrailContainer;