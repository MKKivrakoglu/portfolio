'use client'

import Image from "next/image";
import { useEffect, useRef } from "react";


export default function F1Drive(){
    const f1_video = "/video/f1_car.mp4"

    const sectionRef = useRef<HTMLElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const video = videoRef.current

        if (!section || !video) return

        let ticking = false
        let isSeeking = false

        const updateVideo = () => {
            if (!video.duration || !Number.isFinite(video.duration) || isSeeking){
                ticking = false
                return
            }

            const rect = section.getBoundingClientRect()
            const scrollDistance = section.offsetHeight - window.innerHeight

            if (scrollDistance <= 0) {
                ticking = false
                return
            }

            const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1)
            const targetTime = progress * video.duration

            if (Math.abs(video.currentTime - targetTime) > 0.03){
                isSeeking = true
                video.currentTime = targetTime
            }

            ticking = false
        }

        const handleSeeked = () => {
            isSeeking = false
        }

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateVideo)
                ticking = true
            }
        }

        video.addEventListener("seeked", handleSeeked);
        video.addEventListener("loadedmetadata", updateVideo);
        video.addEventListener("loadeddata", updateVideo);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            video.addEventListener("seeked", handleSeeked);
            video.addEventListener("loadedmetadata", updateVideo);
            video.addEventListener("loadeddata", updateVideo);
            window.addEventListener("scroll", handleScroll);
        }

    }, [])


    return (
        <section
            ref={sectionRef}
            className="relative h-[1000vh] w-full"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="auto"
                >
                    <source src="/video/f1_car.mp4" type="video/mp4" />
                </video>
            </div>
        </section>
    );
}