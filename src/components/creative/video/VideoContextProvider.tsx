
import { createContext, useContext, ReactNode } from 'react';

interface UploadedVideo {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  duration?: number;
  uploaded: boolean;
  storageType: 'local' | 'supabase';
  localPath?: string;
}

interface VideoContextType {
  videos: UploadedVideo[];
  selectedVideo: UploadedVideo | null;
  setSelectedVideo: (video: UploadedVideo | null) => void;
}

const VideoContext = createContext<VideoContextType>({
  videos: [],
  selectedVideo: null,
  setSelectedVideo: () => {}
});

export const useVideoContext = () => useContext(VideoContext);

interface VideoContextProviderProps {
  children: ReactNode;
  videos: UploadedVideo[];
  selectedVideo: UploadedVideo | null;
  setSelectedVideo: (video: UploadedVideo | null) => void;
}

export const VideoContextProvider = ({ 
  children, 
  videos, 
  selectedVideo, 
  setSelectedVideo 
}: VideoContextProviderProps) => {
  const contextValue = {
    videos,
    selectedVideo,
    setSelectedVideo
  };

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};
