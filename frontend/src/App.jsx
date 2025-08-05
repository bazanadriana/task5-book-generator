import React, { useState } from "react";
import Controls from "./components/Controls";
import BookTable from "./components/BookTable";

const API_URL = import.meta.env.VITE_API_URL;


function App() {
  const [region, setRegion] = useState("en-US");
  const [seed, setSeed] = useState("12345");
  const [likes, setLikes] = useState(3.0);
  const [reviews, setReviews] = useState(1.0);
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger table refresh

  const handleUpdate = (newSettings) => {
    setRegion(newSettings.region);
    setSeed(newSettings.seed);
    setLikes(newSettings.likes);
    setReviews(newSettings.reviews);
    setRefreshKey(prev => prev + 1); // force BookTable to re-render
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">📚 Fake Book Generator</h1>
      <Controls
        region={region}
        seed={seed}
        likes={likes}
        reviews={reviews}
        onUpdate={handleUpdate}
      />
      <BookTable
        region={region}
        seed={seed}
        likes={likes}
        reviews={reviews}
        refreshKey={refreshKey}
      />
    </div>
  );
}

export default App;