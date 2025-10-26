"use client";

import React from "react";

const FrostedGlass = () => {
  return (
    <div className="min-h-screen font-sans">
      <div className="grid h-full min-h-screen w-full place-items-center overflow-hidden bg-black">
        <div className="relative grid h-full w-full place-items-center [grid-area:1/1]">
          {/* Background gradient box */}
          <div className="h-1/2 w-1/2 bg-[linear-gradient(to_bottom,#B59CF8_48%,#B59CF8_68%,#8273A9_100%)] rounded-[3vw] mix-blend-hard-light">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgba(255,255,255,.04)_0%,rgba(0,0,0,.39)_49%,rgba(255,255,255,.27)_100%)] bg-[size:40px] mix-blend-color-dodge backdrop-blur-[40px] -z-10"></div>
          </div>

          {/* Foreground text */}
          <h1 className="absolute text-violet-500 text-[10vw] font-semibold leading-snug">
            FrostedGlass
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FrostedGlass;