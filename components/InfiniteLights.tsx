"use client"

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function InfiniteLights({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // --- Configuration ---
    const conf = {
      length: 400,
      roadWidth: 9,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 3,
      colors: {
        background: 0x000000,
        leftCars: 0xff102a,
        rightCars: 0xfafafa
      },
      distortion: {
        uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 3)),
        uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 2.5))
      }
    }

    // --- Scene Setup ---
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(conf.colors.background)
    scene.fog = new THREE.Fog(conf.colors.background, 20, conf.length)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    container.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(conf.fov, container.offsetWidth / container.offsetHeight, 0.1, 10000)
    camera.position.set(0, 7, -5)

    // --- Shaders ---
    const distortionVertex = `
      #define PI 3.14159265358979
      uniform vec2 uDistortionX;
      uniform vec2 uDistortionY;
      float nsin(float val){ return sin(val) * 0.5 + 0.5; }
      vec3 getDistortion(float progress){
        progress = clamp(progress, 0., 1.);
        float xAmp = uDistortionX.r; float xFreq = uDistortionX.g;
        float yAmp = uDistortionY.r; float yFreq = uDistortionY.g;
        return vec3( 
          xAmp * nsin(progress * PI * xFreq - PI / 2.),
          yAmp * nsin(progress * PI * yFreq - PI / 2.),
          0.
        );
      }
    `

    const commonUniforms = {
      uTime: new THREE.Uniform(0),
      uTravelLength: new THREE.Uniform(conf.length),
      ...conf.distortion
    }

    // --- Road ---
    const roadGeo = new THREE.PlaneGeometry(conf.roadWidth, conf.length, 25, 200)
    const roadMat = new THREE.ShaderMaterial({
      fragmentShader: `uniform vec3 uColor; void main(){ gl_FragColor = vec4(uColor,1.); }`,
      vertexShader: `
        uniform float uTravelLength;
        ${distortionVertex}
        void main(){
          vec3 transformed = position.xyz;
          float progress = (transformed.y + uTravelLength / 2.) / uTravelLength;
          vec3 distortion = getDistortion(progress);
          transformed.x += distortion.x;
          transformed.z += distortion.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed.xyz, 1.);
        }
      `,
      uniforms: {
        uColor: new THREE.Uniform(new THREE.Color(0x101012)),
        ...commonUniforms
      }
    })
    const road = new THREE.Mesh(roadGeo, roadMat)
    road.rotation.x = -Math.PI / 2
    road.position.z = -conf.length / 2
    scene.add(road)

    // --- Lights ---
    const createLights = (color: number, speed: number, offset: number) => {
      const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1))
      const baseGeo = new THREE.TubeGeometry(curve, 25, 1, 8, false)
      const instanced = new THREE.InstancedBufferGeometry().copy(baseGeo as any)
      const nPairs = 50
      instanced.instanceCount = nPairs * 2

      const aOffset = [], aMetrics = []
      const sectionWidth = conf.roadWidth / conf.lanesPerRoad

      for (let i = 0; i < nPairs; i++) {
        const radius = Math.random() * 0.1 + 0.1
        const length = Math.random() * conf.length * 0.08 + conf.length * 0.02
        const section = i % 5
        const sectionX = section * sectionWidth - conf.roadWidth / 2 + sectionWidth / 2
        const carWidth = 0.5 * sectionWidth
        const offsetX = 0.5 * Math.random()
        const offsetY = radius * 1.3
        const offsetZ = Math.random() * conf.length

        aOffset.push(sectionX - carWidth / 2 + offsetX, offsetY, -offsetZ)
        aOffset.push(sectionX + carWidth / 2 + offsetX, offsetY, -offsetZ)
        aMetrics.push(radius, length, radius, length)
      }

      instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3))
      instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2))

      const mat = new THREE.ShaderMaterial({
        fragmentShader: `uniform vec3 uColor; void main() { gl_FragColor = vec4(uColor,1.); }`,
        vertexShader: `
          attribute vec3 aOffset; attribute vec2 aMetrics;
          uniform float uTime; uniform float uSpeed; uniform float uTravelLength;
          ${distortionVertex}
          void main() {
            vec3 transformed = position.xyz;
            float radius = aMetrics.r; float len = aMetrics.g;
            transformed.xy *= radius; transformed.z *= len;
            float zOffset = uTime * uSpeed + aOffset.z;
            zOffset = len - mod(zOffset , uTravelLength);
            transformed.z += zOffset; transformed.xy += aOffset.xy;
            float progress = abs(transformed.z / uTravelLength);
            transformed.xyz += getDistortion(progress);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed,1.);
          }
        `,
        uniforms: {
          uColor: new THREE.Uniform(new THREE.Color(color)),
          uSpeed: new THREE.Uniform(speed),
          ...commonUniforms
        },
        side: THREE.DoubleSide
      })
      
      const mesh = new THREE.Mesh(instanced, mat)
      mesh.frustumCulled = false
      mesh.position.x = offset
      scene.add(mesh)
      return mesh
    }

    const leftLights = createLights(conf.colors.leftCars, 60, -conf.roadWidth / 2 - conf.islandWidth / 2)
    const rightLights = createLights(conf.colors.rightCars, -60, conf.roadWidth / 2 + conf.islandWidth / 2)

    // --- Animation Loop ---
    const clock = new THREE.Clock()
    let speedUp = 0, timeOffset = 0, speedUpTarget = 0, fovTarget = 90

    const onMouseDown = () => { speedUpTarget = 0.1; fovTarget = 140 }
    const onMouseUp = () => { speedUpTarget = 0; fovTarget = 90 }
    
    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('mouseup', onMouseUp)
    container.addEventListener('mouseout', onMouseUp)

    const lerp = (current: number, target: number, speed = 0.1, limit = 0.001) => {
      let change = (target - current) * speed
      if (Math.abs(change) < limit) change = target - current
      return change
    }

    let animationId: number
    const tick = () => {
      const delta = clock.getDelta()
      const coefficient = -60 * Math.log2(1 - 0.1)
      const lerpT = Math.exp(-coefficient * delta)

      speedUp += lerp(speedUp, speedUpTarget, lerpT, 0.00001)
      timeOffset += speedUp * delta
      const time = clock.elapsedTime + timeOffset

      commonUniforms.uTime.value = time
      
      const fovChange = lerp(camera.fov, fovTarget, lerpT)
      if (fovChange !== 0) {
        camera.fov += fovChange * delta * 6
        camera.updateProjectionMatrix()
      }

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(tick)
    }
    tick()

    // --- Resize & Cleanup ---
    const handleResize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight)
      camera.aspect = container.offsetWidth / container.offsetHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousedown', onMouseDown)
      container.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('mouseout', onMouseUp)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className={className} />
}
