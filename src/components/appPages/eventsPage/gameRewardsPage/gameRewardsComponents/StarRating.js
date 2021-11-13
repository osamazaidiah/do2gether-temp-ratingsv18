import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
//Helper function to create an array of any length we want of anything we want!
const createArray = (length) => [...Array(length)];

function Star({ selected = false, onSelect }) {
  return (
    <FaStar
      size={"2em"}
      color={selected ? "gold" : "#444444"}
      onClick={onSelect}
    />
  );
}

export default function StarRating({
  totalStars = 5,
  returnSelectedStars = (f) => f
}) {
  const [selectedStars, setSelectedStars] = useState(0);
  useEffect(() => returnSelectedStars(selectedStars), [
    selectedStars,
    returnSelectedStars
  ]);
  return (
    <div>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
    </div>
  );
}
