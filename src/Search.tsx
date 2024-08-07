import React, { useEffect, useState } from "react";
import "./App.css";
import { Location } from "./types";
import { useKey } from "./utils/useKey";

interface SearchProps {
  locationQuery: string;
  onLocationQueryChanged: (value: string) => void;
  locations: Location[];
  onWeatherQueryChanged: (value: Location) => void;
  //   onLocationQueryChanged: React.Dispatch<React.SetStateAction<string>>;
}
export default function Search(props: SearchProps) {
  const [highlightedLocationIndex, setHighlightedLocationIndex] = useState(-1);
  const [isLocationsOpen, setIsLocationsOpen] = useState(true);

  useKey("ArrowDown", () => {
    setHighlightedLocationIndex((prev) =>
      prev < props.locations.length - 1 ? prev + 1 : prev
    );
  });

  useKey("ArrowUp", () => {
    setHighlightedLocationIndex((prev) => (prev > 0 ? prev - 1 : prev));
  });

  useKey("Enter", () => {
    console.log(`highlightedSuggestion ${highlightedLocationIndex}`);
    if (highlightedLocationIndex === -1) {
      props.onWeatherQueryChanged(props.locations[0]);
    } else {
      props.onWeatherQueryChanged(props.locations[highlightedLocationIndex]);
    }
    props.onLocationQueryChanged("");
    setHighlightedLocationIndex(-1);
  });

  useEffect(() => {
    if (!isLocationsOpen) {
      setIsLocationsOpen(true);
    }
  }, [props.locationQuery]);

  useEffect(() => {
    window.addEventListener("click", () => setIsLocationsOpen(false));
  }, []);
  return (
    <div className="search-container" onClick={(ev) => ev.stopPropagation()}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(`highlightedSuggestion ${highlightedSuggestion}`);
          // if (highlightedSuggestion < 1) {
          //   props.onWeatherQueryChanged(props.locations[0]);
          // } else if (highlightedSuggestion > 0) {
          //   props.onWeatherQueryChanged(props.locations[highlightedSuggestion]);
          // }
          // props.onLocationQueryChanged("");
          // setHighlightedSuggestion(-1);
        }}
      >
        <input
          className="search-input"
          type="text"
          placeholder="Enter the location..."
          autoFocus
          value={props.locationQuery}
          onChange={(e) => {
            props.onLocationQueryChanged(e.target.value);
          }}
        />
        {isLocationsOpen && (
          <div className="suggestions">
            {props.locations.map((location, index) => (
              <div
                className={`list-item ${
                  highlightedLocationIndex === index ? "highlighted" : ""
                }`}
                // className={classes({
                //     'list-item': true,
                //     'highlighted':
                // })}
                //   style={
                //     highlightedLocationIndex === index ? { color: "orange" } : {}
                //   }
                key={index}
                onClick={() => {
                  props.onLocationQueryChanged("");
                  props.onWeatherQueryChanged(location);
                  setHighlightedLocationIndex(-1);
                }}
                onMouseEnter={() => setHighlightedLocationIndex(index)}
                onMouseLeave={() => setHighlightedLocationIndex(-1)}
              >
                {location.name}
              </div>
            ))}
          </div>
        )}
      </form>

      {/* <div className="suggestions"> */}

      {/* <ul className="suggestions">
        {props.locations.map((suggestion) => (
          <li
            className="list-item"
            key={suggestion.name}
            onClick={() => {
              props.onLocationQueryChanged(suggestion.name);
            }}
          >
            {suggestion.name}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

// const Search: React.FC = () => {
//     const [curValue, setCurValue] = useState<string>("");

//     return (
//       <div>
//         <input
//           type="text"
//           placeholder="Enter the location..."
//           value={curValue}
//           onChange={(e) => {
//             setCurValue(e.target.value);
//           }}
//         ></input>
//       </div>
//     );
//   };

// export default Search;
