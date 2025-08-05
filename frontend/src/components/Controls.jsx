import React, { useState } from "react";

function Controls({ region, seed, likes, reviews, onUpdate }) {
  const [currentRegion, setCurrentRegion] = useState(region);
  const [currentSeed, setCurrentSeed] = useState(seed);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentReviews, setCurrentReviews] = useState(reviews);

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000000).toString();
    setCurrentSeed(randomSeed);
    triggerUpdate(currentRegion, randomSeed, currentLikes, currentReviews);
  };

  const triggerUpdate = (region, seed, likes, reviews) => {
    onUpdate({ region, seed, likes, reviews });
  };

  return (
    <div className="bg-white p-4 shadow rounded mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium">Language / Region</label>
          <select
            value={currentRegion}
            onChange={(e) => {
              setCurrentRegion(e.target.value);
              triggerUpdate(e.target.value, currentSeed, currentLikes, currentReviews);
            }}
            className="mt-1 w-full border rounded px-2 py-1"
          >
            <option value="en-US">English (USA)</option>
            <option value="fr-FR">French (France)</option>
            <option value="de-DE">German (Germany)</option>
            <option value="ja-JP">Japanese (Japan)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Seed</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={currentSeed}
              onChange={(e) => {
                setCurrentSeed(e.target.value);
                triggerUpdate(currentRegion, e.target.value, currentLikes, currentReviews);
              }}
              className="w-full border rounded px-2 py-1"
            />
            <button
              onClick={handleRandomSeed}
              className="bg-blue-500 text-white px-3 py-1 rounded"
              title="Random Seed"
            >
              🔄
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Avg Likes per Book</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={currentLikes}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setCurrentLikes(val);
              triggerUpdate(currentRegion, currentSeed, val, currentReviews);
            }}
            className="w-full mt-1"
          />
          <p className="text-sm text-center">{currentLikes}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Avg Reviews per Book</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={currentReviews}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setCurrentReviews(val);
              triggerUpdate(currentRegion, currentSeed, currentLikes, val);
            }}
            className="w-full mt-1 border rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
}

export default Controls;
