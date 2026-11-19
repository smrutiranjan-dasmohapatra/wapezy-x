
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef(null);
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const animationRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.error("Video playback error:", error);
    });
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video || !isPlaying) return;

    const nextMuted = !isMuted;

    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === playerRef.current
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    const player = playerRef.current;
    if (!player) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await player.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const player = playerRef.current;
    const video = videoRef.current;

    if (!section || !player || !video) return;

    const stopVideo = () => {
      video.pause();
      video.currentTime = 0;
      video.muted = true;

      setIsPlaying(false);
      setIsMuted(true);
    };

    const ctx = gsap.context(() => {
      // Initial player dimensions
      gsap.set(player, {
        width: "160px",
        height: "90px",
        position: "absolute",
        right: "4vw",
        bottom: "4vh",
        borderRadius: "4px",
        overflow: "hidden",
        force3D: true,
      });

      // Expand smoothly
      const expand = () => {
        animationRef.current?.kill();

        animationRef.current = gsap.to(player, {
          width: "100%",
          height: "100%",
          right: 0,
          bottom: 0,
          borderRadius: 0,
          duration: 1.2,
          ease: "power3.inOut",
          overwrite: true,
        });
      };

      // Shrink smoothly
      const shrink = () => {
        animationRef.current?.kill();

        animationRef.current = gsap.to(player, {
          width: "160px",
          height: "90px",
          right: "4vw",
          bottom: "4vh",
          borderRadius: "4px",
          duration: 1,
          ease: "power3.inOut",
          overwrite: true,
          onComplete: stopVideo,
        });
      };

      // Automatic expansion + pause when leaving section
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=400",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onEnter: expand,
        onEnterBack: expand,

        onLeave: stopVideo,
        onLeaveBack: shrink,
      });

    }, section);

    return () => {
      animationRef.current?.kill();
      stopVideo();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      id="How it works"
    >
      {/* Video player */}
      <div
        ref={playerRef}
        className="group absolute overflow-hidden bg-green-800"
      >
        {/* Video - hidden until Play is clicked */}
        <div
          className={`absolute inset-0 overflow-hidden bg-black transition-opacity duration-500 ${
            isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <video
            ref={videoRef}
            src="/images/1.mp4"
            className="absolute inset-0 h-full w-full object-contain"
            muted
            playsInline
            preload="none"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        </div>

        {/* Center Play / Pause button */}
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className={`absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
            isPlaying
              ? "border border-white/50 bg-black/20 px-7 py-2 text-[20px] font-medium text-white opacity-0 backdrop-blur-sm group-hover:opacity-100 hover:bg-black/30"
              : "bg-[#61D982] px-7 py-2 text-[20px] font-medium text-[#142608] hover:scale-105"
          }`}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 z-20 w-full px-[3.2%] pb-[3.8%] max-sm:pb-[7%]">
          <div className="flex items-center justify-between">

            {/* Left controls */}
            <div className="flex items-center gap-3">

              {/* Mute button */}
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#203b0d] text-white/70 transition-colors hover:bg-[#294a12]"
              >
                {isMuted ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                    <path d="m16 9 5 6m0-6-5 6" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                    <path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13" />
                  </svg>
                )}
              </button>

            </div>

            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              aria-label={
                isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
              }
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#203b0d] text-white/80 transition-colors hover:bg-[#294a12]"
            >
              {isFullscreen ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v5H3" />
                  <path d="M3 8l6-6" />
                  <path d="M16 3v5h5" />
                  <path d="m21 8-6-6" />
                  <path d="M8 21v-5H3" />
                  <path d="m3 16 6 6" />
                  <path d="M16 21v-5h5" />
                  <path d="m21 16-6 6" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
