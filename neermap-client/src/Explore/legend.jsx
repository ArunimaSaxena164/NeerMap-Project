import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import './legend.css';
const Legend = () => {
  const map = useMap();
  useEffect(() => {
    const legend = L.control({ position: "topright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      const categories = [
        { label: "Drinking", color: "#698fe0" },
        { label: "Irrigation", color: "#2aa869" },
        { label: "Washing", color: "#f5dd05" },
        { label: "Fishing", color: "#eba236" },
        { label: "Recreation", color: "#9557c2" },
        { label: "Not Suitable", color: "#f05959" },
        { label: "Unknown", color: "#8a8b91" },
      ];

      div.innerHTML = `<h6 style="margin-bottom:6px">Suitability</h6>`;
      categories.forEach((cat) => {
        div.innerHTML += `
          <div>
            <i  style="background:${cat.color}"></i>
            ${cat.label}
          </div>
        `;
      });

      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove(); 
    };
  }, [map]);

  return null;
};

export default Legend;
