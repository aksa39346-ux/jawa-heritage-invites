import { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onPlayStateChange: (playing: boolean) => void;
}

const MusicPlayer = ({ isPlaying, onPlayStateChange }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioReady, setAudioReady] = useState(false);

  // Generate simple ambient music using Web Audio API
  useEffect(() => {
    const generateAudio = async () => {
      try {
        // Create audio context
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const duration = 30; // 30 seconds
        const sampleRate = audioContext.sampleRate;
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        // Generate simple sine wave pattern (wedding background music effect)
        const frequencies = [440, 494, 523, 587]; // A4, B4, C5, D5 notes
        let freqIndex = 0;

        for (let i = 0; i < data.length; i++) {
          const t = i / sampleRate;
          const freq = frequencies[Math.floor((i / sampleRate / 2) % frequencies.length)];
          
          // Sine wave with envelope
          const envelope = Math.sin(Math.PI * ((i % (sampleRate * 2)) / (sampleRate * 2)));
          data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.1;
        }

        // Convert to WAV blob
        const blob = bufferToWave(buffer);
        const url = URL.createObjectURL(blob);

        if (audioRef.current) {
          audioRef.current.src = url;
          setAudioReady(true);
        }
      } catch (error) {
        console.log('Could not generate audio via Web Audio API:', error);
        setAudioReady(false);
      }
    };

    generateAudio();
  }, []);

  useEffect(() => {
    if (!audioRef.current || !audioReady) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Autoplay prevented:', error);
          onPlayStateChange(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioReady, onPlayStateChange]);

  const handleEnded = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        console.log('Replay blocked');
      });
    }
  };

  return (
    <>
      {/* Audio element with generated audio or fallback to file */}
      <audio
        ref={audioRef}
        loop
        crossOrigin="anonymous"
        onEnded={handleEnded}
      >
        <source src="/music/wedding-song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* YouTube fallback iframe */}
      {isPlaying && (
        <div className="hidden" aria-hidden="true">
          <iframe
            width="0"
            height="0"
            src="https://www.youtube.com/embed/AXcE9pKXniE?autoplay=1&controls=0&loop=1&playlist=AXcE9pKXniE"
            title="Wedding Music"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
};

// Helper function to convert AudioBuffer to WAV Blob
function bufferToWave(abuffer: AudioBuffer): Blob {
  const length = abuffer.length * abuffer.numberOfChannels * 2 + 44;
  const arrayBuffer = new ArrayBuffer(length);
  const view = new DataView(arrayBuffer);
  const channels = [];
  let offset = 0;
  let pos = 0;

  // Write WAV header
  const setUint16 = (data: number) => {
    view.setUint16(pos, data, true);
    pos += 2;
  };
  const setUint32 = (data: number) => {
    view.setUint32(pos, data, true);
    pos += 4;
  };

  // "RIFF" chunk descriptor
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  // "fmt " sub-chunk
  setUint32(0x20746d66); // "fmt "
  setUint32(16); // chunkSize
  setUint16(1); // audioFormat (PCM)
  setUint16(abuffer.numberOfChannels);
  setUint32(abuffer.sampleRate);
  setUint32(abuffer.sampleRate * 2 * abuffer.numberOfChannels); // avgByteRate
  setUint16(abuffer.numberOfChannels * 2); // blockAlign
  setUint16(16); // bitsPerSample

  // "data" sub-chunk
  setUint32(0x61746164); // "data"
  setUint32(length - pos - 4); // chunkSize

  // Write interleaved data
  const volume = 0.8;
  for (let i = 0; i < abuffer.numberOfChannels; i++) {
    channels.push(abuffer.getChannelData(i));
  }

  while (pos < length) {
    for (let i = 0; i < abuffer.numberOfChannels; i++) {
      let s = Math.max(-1, Math.min(1, channels[i][offset]));
      s = s < 0 ? s * 0x8000 : s * 0x7fff;
      view.setInt16(pos, s * volume, true);
      pos += 2;
    }
    offset++;
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

export default MusicPlayer;
