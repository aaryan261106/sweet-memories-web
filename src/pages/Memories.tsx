
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Image, Video, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MemoryItem {
  id: string;
  type: "image" | "video";
  source: string;
  thumbnail?: string;
  title: string;
  date: string;
  description?: string;
}

// Sample memories data - replace with your actual content
const memoriesData: MemoryItem[] = [
  {
    id: "1",
    type: "image",
    source: "https://images.unsplash.com/photo-1682687220015-8a06f3fae6b9",
    title: "Summer Beach Day",
    date: "August 15, 2023",
    description: "Our day at the beach with the whole family"
  },
  {
    id: "2",
    type: "image",
    source: "https://images.unsplash.com/photo-1682687220208-22d7a2543e88",
    title: "Birthday Celebration",
    date: "May 22, 2023"
  },
  {
    id: "3",
    type: "video",
    source: "https://static.videezy.com/system/resources/previews/000/008/296/original/Beach_Day.mp4",
    thumbnail: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85",
    title: "Beach Sunset",
    date: "July 4, 2023",
    description: "Beautiful sunset at the beach"
  },
  {
    id: "4",
    type: "image",
    source: "https://images.unsplash.com/photo-1682687221175-9fdf197ca0d7",
    title: "Hiking Adventure",
    date: "September 3, 2023"
  },
  {
    id: "5",
    type: "image",
    source: "https://images.unsplash.com/photo-1565036558162-64675f21109a",
    title: "Family Dinner",
    date: "December 25, 2023",
    description: "Christmas dinner with the whole family"
  },
  {
    id: "6",
    type: "video",
    source: "https://static.videezy.com/system/resources/previews/000/045/553/original/DSC_8156_V1_4K.mp4",
    thumbnail: "https://images.unsplash.com/photo-1482377646115-0f06e0c43919",
    title: "Graduation Day",
    date: "June 12, 2023"
  }
];

const MemoryCard = ({ memory }: { memory: MemoryItem }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  const handleError = () => {
    toast({
      title: "Error loading media",
      description: `Could not load ${memory.type} for "${memory.title}"`,
      variant: "destructive",
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all bg-white border border-memory-pink/20 hover:border-memory-pink/50">
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer relative group">
            <div className="aspect-square relative overflow-hidden">
              {memory.type === "image" ? (
                <img
                  src={memory.source}
                  alt={memory.title}
                  className={`object-cover w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setIsLoaded(true)}
                  onError={handleError}
                />
              ) : (
                <div className="relative w-full h-full bg-memory-gray flex items-center justify-center">
                  <img
                    src={memory.thumbnail || "https://images.unsplash.com/photo-1482377646115-0f06e0c43919"}
                    alt={memory.title}
                    className={`object-cover w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={handleError}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="bg-white/90 p-2 rounded-full">
                      <Play className="w-8 h-8 text-memory-purple" />
                    </div>
                  </div>
                </div>
              )}
              {!isLoaded && (
                <div className="absolute inset-0 bg-memory-gray animate-pulse flex items-center justify-center">
                  {memory.type === "image" ? (
                    <Image className="w-8 h-8 text-memory-purple/50" />
                  ) : (
                    <Video className="w-8 h-8 text-memory-purple/50" />
                  )}
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="font-medium truncate">{memory.title}</p>
              <p className="text-xs opacity-80">{memory.date}</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] p-0 bg-white overflow-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 bg-black flex items-center justify-center min-h-[300px]">
              {memory.type === "image" ? (
                <img
                  src={memory.source}
                  alt={memory.title}
                  className="max-h-[80vh] max-w-full object-contain"
                  onError={handleError}
                />
              ) : (
                <video
                  src={memory.source}
                  controls
                  className="max-h-[80vh] max-w-full"
                  poster={memory.thumbnail}
                  onError={handleError}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div className="p-6 md:w-1/3 bg-white">
              <h2 className="text-xl font-bold">{memory.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{memory.date}</p>
              {memory.description && (
                <p className="text-gray-700">{memory.description}</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CardContent className="p-3">
        <div className="flex items-center">
          {memory.type === "image" ? (
            <Image className="w-4 h-4 mr-2 text-memory-purple" />
          ) : (
            <Video className="w-4 h-4 mr-2 text-memory-purple" />
          )}
          <div>
            <h3 className="font-medium text-sm truncate">{memory.title}</h3>
            <p className="text-xs text-gray-500">{memory.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Memories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-memory-peach/30 to-memory-blue/30">
      <div className="container py-8 px-4 md:py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Sweet Memories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of special moments to cherish forever with your loved ones.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 animate-fade-in">
          {memoriesData.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
        
        {memoriesData.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No memories yet. Start adding some!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memories;
