import { React, useState, useEffect } from "react";
import Filters from "../components/findMaidsPage/filters";
import SortBy from "../components/findMaidsPage/sortby";
import ShowMaids from "../components/findMaidsPage/showMaids";

function FindMaids() {
  const [filters, setfilters] = useState({ sortby: "-ratingAverage" });

  return (
    <div className="findMaidsPage">
      <Filters filters={filters} setfilters={setfilters} />

      <div>
        <SortBy filters={filters} setfilters={setfilters} />
        <ShowMaids filters={filters} />
      </div>
    </div>
  );
}
export default FindMaids;
