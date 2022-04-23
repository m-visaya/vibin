import { useRef } from "react";

function Navlink({ timeRange, rangeLabel, handleTimeRange, selectedRange }) {
  const rangeID = useRef(timeRange);
  return (
    <div>
      <p
        className={`time-range ${
          selectedRange == rangeID.current ? "active" : ""
        }`}
        onClick={() => handleTimeRange(timeRange)}
      >
        {rangeLabel}
      </p>
    </div>
  );
}

export default Navlink;
