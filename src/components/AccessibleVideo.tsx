import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AccessibleVideoProps {
  src: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export const AccessibleVideo = ({ 
  src, 
  poster, 
  className, 
  ariaLabel = "Video promozionale",
  children 
}: AccessibleVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Respect user's motion preferences
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Auto-pause if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [prefersReducedMotion]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVideoClick = () => {
    if (!prefersReducedMotion) {
      togglePlay();
    }
  };

  return (
    <div 
      className={cn("relative group", className)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onFocus={() => setShowControls(true)}
      onBlur={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        onClick={handleVideoClick}
        aria-label={ariaLabel}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        <p>
          Il tuo browser non supporta i video HTML5. 
          {children && (
            <span className="block mt-2">{children}</span>
          )}
        </p>
      </video>

      {/* Accessible Controls */}
      <div 
        className={cn(
          "absolute bottom-4 left-4 flex items-center gap-2 transition-opacity duration-300",
          showControls || prefersReducedMotion ? "opacity-100" : "opacity-0"
        )}
        role="group"
        aria-label="Controlli video"
      >
        <Button
          variant="secondary"
          size="icon"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausa video" : "Riproduci video"}
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>

        <Button
          variant="secondary"
          size="icon"
          onClick={toggleMute}
          aria-label={isMuted ? "Attiva audio" : "Disattiva audio"}
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-2 rounded-md text-sm">
          <p className="text-foreground">
            Video in pausa (motion ridotto attivo)
          </p>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
};