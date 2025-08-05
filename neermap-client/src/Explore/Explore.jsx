import React, { useEffect, useState } from "react";
import ResourceList from "./ResourceList";
import MapView from "./Mapview";
import API from "../api.js";
const Explore = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [filter, setFilter] = useState("");

  const handleSelect=(res)=>
  {
    console.log("selected resource in explore:",res);
    setSelectedResource(res);
  }

  useEffect(() => {
    API.get("/api/resources") 
      .then((res) => {setResources(res.data)});
  }, []);

  const filteredResources = resources.filter(
    (res) => !filter || res.suitability === filter
  );
const handleFilterChange = (newFilter) => {
  setFilter(newFilter);
  setSelectedResource(null);  
};

  return (
    <div className="container-fluid p-0" style={{marginBottom:"100px"}}>
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-4 border-end mb-5 order-2 order-md-1" style={{ height: "100vh", overflowY: "auto" }}>
          <ResourceList
            resources={filteredResources}
            onSelect={setSelectedResource}
            selectedResource={selectedResource}
            setFilter={handleFilterChange}
          />
        </div>

        {/* Map */}
        <div className="col-md-8 order-1 order-md-2" style={{ height: "100vh" }}>
          <MapView resources={filteredResources} selectedResource={selectedResource} filter={filter} />
        </div>
      </div>
    </div>
  );
};

export default Explore;
