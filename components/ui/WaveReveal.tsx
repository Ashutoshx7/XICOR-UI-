"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const fragmentShaderSource = `
    precision mediump float;

    uniform vec2 iResolution;
    uniform float iTime;
    uniform float iTheme; // 0.0 for dark, 1.0 for light

    // Softer pastel palette
    vec3 pastel(float t) {
        return 0.6 + 0.4 * cos(t + vec3(0.4, 1.5, 3.0));
    }

    void main(void) {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        uv.y -= 0.5;

        // Soft, low-contrast background tones
        vec3 finalColor = iTheme > 0.5 
            ? vec3(0.965, 0.97, 0.985)   // Light: misty cool-white
            : vec3(0.03, 0.035, 0.05);   // Dark: soft charcoal

        for (float i = 0.0; i < 6.0; i++) {
            float t = iTime * 0.32 + i * 0.55;
            float y = sin(uv.x * 3.2 + t) * 0.07;
            float d = abs(uv.y - y);

            // Subtle glow spread instead of intense bloom
            float intensity = 0.0018 / (d + 0.003);

            vec3 col = pastel(t);

            if (iTheme > 0.5) {
                // Light mode: gentle pastel tint
                finalColor = mix(finalColor, col, intensity * 0.25);
            } else {
                // Dark mode: muted glowing lines
                finalColor += col * intensity * 0.55;
            }
        }

        finalColor = clamp(finalColor, 0.0, 1.0);
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

const vertexShaderSource = `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const WaveReveal: React.FC<{ className?: string }> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl", { alpha: false });
        if (!gl) return;

        const compileShader = (source: string, type: number) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1, -1,
                1, -1,
                -1, 1,
                -1, 1,
                1, -1,
                1, 1,
            ]),
            gl.STATIC_DRAW
        );

        const positionLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const timeLocation = gl.getUniformLocation(program, "iTime");
        const resolutionLocation = gl.getUniformLocation(program, "iResolution");
        const themeLocation = gl.getUniformLocation(program, "iTheme");

        let animationFrameId: number;
        const startTime = Date.now();

        const render = () => {
            if (!canvas) return;

            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                gl.viewport(0, 0, width, height);
            }

            gl.useProgram(program);
            gl.uniform2f(resolutionLocation, width, height);
            gl.uniform1f(timeLocation, (Date.now() - startTime) * 0.001);

            const isLight =
                document.documentElement.classList.contains("light") ||
                document.documentElement.style.colorScheme === "light" ||
                resolvedTheme === "light";

            gl.uniform1f(themeLocation, isLight ? 1.0 : 0.0);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
        };
    }, [resolvedTheme]);

    if (!mounted) return <div className="min-h-[600px] w-full bg-background" />;

    return (
        <main
            className={cn(
                "relative w-full min-h-[600px] flex flex-col items-center justify-center overflow-hidden rounded-xl bg-background",
                className
            )}
        >
            <div className="absolute inset-0 z-0">
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center p-8 gap-6">
                <h1 className="text-5xl md:text-7xl font-bold text-foreground drop-shadow-lg tracking-tight">
                    Ride the Wave
                </h1>
                <p className="font-light text-lg md:text-xl text-muted-foreground max-w-lg">
                    Cyberspace is sinusoidal, and you should be too.
                </p>
                <button className="mt-4 px-8 py-3 rounded-xl text-base font-medium text-primary-foreground bg-primary/90 backdrop-blur-sm border border-primary/20 hover:bg-primary hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20">
                    Get Started
                </button>
            </div>
        </main>
    );
};

export default WaveReveal;
