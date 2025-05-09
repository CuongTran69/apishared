'use client';

import React, { useState } from 'react';

interface VideoInfo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
}

const videoData: VideoInfo[] = [
  {
    id: 'EOdb9EPEEqQ',
    title: 'Build local Cherry Studio',
    duration: '9:32',
    thumbnail: '/path/to/thumbnail1.jpg'
  },
  {
    id: 'D3IOT6z0Bb0',
    title: 'Hướng dẫn thêm API vào IDE (Vscode, Cursor, Windsurf)',
    duration: '6:59',
    thumbnail: '/path/to/thumbnail2.jpg'
  },
  {
    id: 'jjAwWP1R8jo',
    title: 'Getting Started Guide',
    duration: '8:28',
    thumbnail: '/path/to/thumbnail1.jpg'
  },
  {
    id: 'DqcIc2jtrC0',
    title: 'Dùng API cá nhân để sử dụng trong các workflow (n8n AI Automation)',
    duration: '4:33',
    thumbnail: '/path/to/thumbnail3.jpg'
  },
  {
    id: 'xGzvFbTUdC0',
    title: 'Dùng API cá nhân với Chatbox AI siêu nhiều tính năng',
    duration: '4:33',
    thumbnail: '/path/to/thumbnail3.jpg'
  }
];

const VideoSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string>(videoData[0].id);

  return (
    <section className="mt-16 md:mt-20 relative z-10 px-4 dark:bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Video Player Container */}
        <div className="grid gap-8 md:grid-cols-12">
          {/* Main Video Player */}
          <div className="md:col-span-8">
            <div className="bg-white/5 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              {selectedVideo && (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo}`}
                    title="Featured Tutorial"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                    className="w-full h-full"
                    loading="lazy"
                  ></iframe>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white dark:text-gray-200">
                  Getting Started with API Shared
                </h3>
                <p className="text-gray-400 dark:text-gray-400 mt-2 text-sm">
                  Learn the basics of integrating our API services into your applications
                </p>
              </div>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="md:col-span-4">
            <div className="bg-white/5 dark:bg-gray-800 rounded-2xl p-4 h-full">
              <h3 className="text-lg font-semibold text-white dark:text-gray-200 mb-4">
                More Tutorials
              </h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                {videoData.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all
                      ${selectedVideo === video.id
                        ? 'bg-blue-500/20 border border-blue-500/50'
                        : 'hover:bg-white/5 dark:hover:bg-gray-700'
                      }`}
                  >
                    <div className="relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden">
                      <div className="absolute inset-0 bg-gray-700"></div>
                      <span className="absolute bottom-1 right-1 text-xs text-white bg-black/60 px-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-medium text-white dark:text-gray-200 line-clamp-2">
                        {video.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection; 