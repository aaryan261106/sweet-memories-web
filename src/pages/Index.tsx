
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-memory-peach/40 to-memory-blue/40">
      <div className="text-center p-8 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">Sweet Memories</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-lg mx-auto">
          Preserve and cherish your special moments with the people you love.
        </p>
        <Button asChild className="bg-memory-purple hover:bg-memory-purple/90 text-white px-8 py-6 text-lg rounded-xl">
          <Link to="/memories">View Memories</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
