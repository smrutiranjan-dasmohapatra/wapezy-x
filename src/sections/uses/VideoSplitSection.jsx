import { useRef, useState, useEffect, useCallback } from "react";
import SectionHeading from "../../components/common/SectionHeading.jsx";

export default function VideoSplitSection() {
  const sectionRef = useRef(null);

  const leftPlayerRef = useRef(null);
  const rightPlayerRef = useRef(null);

  const leftVideoRef = useRef(null);
  const rightVideoRef = useRef(null);

  const [leftPlaying, setLeftPlaying] = useState(false);
  const [rightPlaying, setRightPlaying] = useState(false);

  const [leftMuted, setLeftMuted] = useState(true);
  const [rightMuted, setRightMuted] = useState(true);

  const [fullscreen, setFullscreen] = useState(false);

  // PLAY / PAUSE
  const togglePlay = async (videoRef) => {
    const video = videoRef.current;
    if (!video) return;

    if (!video.paused) {
      video.pause();
      return;
    }

    const otherVideo =
      videoRef === leftVideoRef ? rightVideoRef.current : leftVideoRef.current;

    if (otherVideo && !otherVideo.paused) {
      otherVideo.pause();
    }

    try {
      await video.play();
    } catch (error) {
      console.error("Video playback error:", error);
    }
  };

  // MUTE
  const toggleMute = (videoRef, muted, setMuted) => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  };

  // FULLSCREEN LISTENER
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // FULLSCREEN
  const toggleFullscreen = async (player) => {
    if (!player) return;

    try {
      if (document.fullscreenElement === player) {
        await document.exitFullscreen();
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }

        await player.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  // STOP VIDEOS
  const stopVideos = useCallback(() => {
    [leftVideoRef, rightVideoRef].forEach((ref) => {
      const video = ref.current;

      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      }
    });

    setLeftPlaying(false);
    setRightPlaying(false);
    setLeftMuted(true);
    setRightMuted(true);
  }, []);

  // OBSERVE SECTION
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          stopVideos();
        }
      },
      { threshold: 0 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      [leftVideoRef, rightVideoRef].forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
        }
      });
    };
  }, [stopVideos]);

  // VIDEO PANEL
  const renderVideo = ({
    playerRef,
    videoRef,
    playing,
    muted,
    setMuted,
    source,
    label,
    thumbnail,
    theme,
  }) => (
    <div
      ref={playerRef}
      className={`group relative h-full min-h-0 min-w-0 flex-1 overflow-hidden rounded-[4px] ${theme.panel} max-md:aspect-[4/5] max-md:h-auto max-md:w-full max-md:flex-none`}
    >
      <div className={`absolute inset-0 ${theme.background}`} />

      <div className={`pointer-events-none absolute ${theme.glow}`} />

      {/* THUMBNAIL */}
      <img
        src={thumbnail}
        alt={`${label} video preview`}
        loading="lazy"
        className={`absolute inset-0 z-10 m-auto h-[65%] w-[65%] object-contain transition-opacity duration-300 ${
          playing ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      />

      {/* VIDEO */}
      <video
        ref={videoRef}
        src={source}
        className={`absolute inset-0 z-10 h-full w-full object-contain transition-opacity duration-300 ${
          playing ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        muted={muted}
        playsInline
        preload="metadata"
        onPlay={() => {
          if (videoRef === leftVideoRef) {
            setLeftPlaying(true);
          } else {
            setRightPlaying(true);
          }
        }}
        onPause={() => {
          if (videoRef === leftVideoRef) {
            setLeftPlaying(false);
          } else {
            setRightPlaying(false);
          }
        }}
        onEnded={() => {
          if (videoRef === leftVideoRef) {
            setLeftPlaying(false);
          } else {
            setRightPlaying(false);
          }
        }}
        onError={(event) => {
          console.error(
            `${label} video error:`,
            event.currentTarget.error,
            source,
          );
        }}
      />

      {/* LABEL */}
      <div className="absolute left-[3.2%] top-[3.8%] z-20">
        <span
          className={`text-[30px] font-medium max-md:text-[22px] ${theme.label}`}
        >
          {label}
        </span>
      </div>

      {/* PLAY / PAUSE */}
      <button
        type="button"
        onClick={() => togglePlay(videoRef)}
        aria-label={playing ? "Pause video" : "Play video"}
        className={`absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
          playing
            ? "border border-white/50 bg-black/20 px-7 py-2 text-[20px] font-medium text-white opacity-0 backdrop-blur-sm group-hover:opacity-100 hover:bg-black/30"
            : `${theme.play} px-7 py-2 text-[20px] font-medium hover:scale-105`
        }`}
      >
        {playing ? "Pause" : "Play"}
      </button>

      {/* BOTTOM CONTROLS */}
      <div className="absolute bottom-0 left-0 z-20 w-full px-[3.2%] pb-[3.8%]">
        <div className="flex items-center justify-between">
          {/* MUTE */}
          <button
            type="button"
            onClick={() => toggleMute(videoRef, muted, setMuted)}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className={`flex h-12 w-12 items-center justify-center rounded-full ${theme.control} transition-colors ${theme.hover}`}
          >
            {muted ? (
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

          {/* FULLSCREEN */}
          <button
            type="button"
            onClick={() => toggleFullscreen(playerRef.current)}
            aria-label="Toggle fullscreen"
            className={`flex h-12 w-12 items-center justify-center rounded-full ${theme.control} transition-colors ${theme.hover}`}
          >
            {fullscreen && document.fullscreenElement === playerRef.current ? (
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
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative mt-30 flex w-full flex-col gap-20 overflow-hidden max-md:mt-24 max-md:gap-8"
    >
      <SectionHeading
        label="How Wapezy Works "
        text="Two one-minute videos. One for orders, one for appointments. See how simple it is with Wapezy."
        className="px-[2vw] pb-20 max-md:px-4"
      />

      {/* VIDEO CONTAINER */}
      <div className="relative flex h-[70vh] min-h-[480px] max-h-[680px] w-full gap-4 px-10 max-md:h-auto max-md:min-h-0 max-md:max-h-none max-md:flex-col max-md:gap-4 max-md:px-5">
        {/* ORDER VIDEO */}
        {renderVideo({
          playerRef: leftPlayerRef,
          videoRef: leftVideoRef,
          playing: leftPlaying,
          muted: leftMuted,
          setMuted: setLeftMuted,
          source: "/images/2.mp4",
          thumbnail: "/images/5.jpg",
          label: "Order",
          theme: {
            panel: "bg-[#FCE7EF]",
            background:
              "bg-gradient-to-br from-[#FFF1F5] via-[#FCE4EC] to-[#F8D4E1]",
            glow: "-right-20 -top-20 h-80 w-80 rounded-full bg-[#F4A9C4]/25 blur-3xl",
            label: "text-[#783C54]",
            play: "bg-[#ECA6C0] text-[#54283C]",
            control: "bg-[#EAB5C9] text-[#54283C]",
            hover: "hover:bg-[#E69AB8]",
          },
        })}

        {/* BOOKING VIDEO */}
        {renderVideo({
          playerRef: rightPlayerRef,
          videoRef: rightVideoRef,
          playing: rightPlaying,
          muted: rightMuted,
          setMuted: setRightMuted,
          source: "/images/2.mp4",
          thumbnail: "/images/5.jpg",
          label: "Booking",
          theme: {
            panel: "bg-[#E9E8FA]",
            background:
              "bg-gradient-to-br from-[#F4F1FF] via-[#E9E5FA] to-[#DCD7F4]",
            glow: "-bottom-20 -left-20 h-80 w-80 rounded-full bg-[#AFA5E8]/25 blur-3xl",
            label: "text-[#49416F]",
            play: "bg-[#B8AFE9] text-[#342D5D]",
            control: "bg-[#C6BFED] text-[#342D5D]",
            hover: "hover:bg-[#B3A9E6]",
          },
        })}
      </div>
    </section>
  );
}
