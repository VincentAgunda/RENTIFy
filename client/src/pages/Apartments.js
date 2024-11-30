import React, { useEffect, useState } from "react";
import { usePropertyContext } from "../context/PropertyContext"; // Assuming you use context

const Apartments = () => {
  const { properties } = usePropertyContext(); // Assuming properties is fetched from context
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    if (properties && Array.isArray(properties)) {
      // Filter the properties only if properties is an array
      const filtered = properties.filter(property => property.type === "Apartment");
      setFilteredProperties(filtered);
    } else {
      // Log an error or handle cases where properties is undefined
      console.error("Properties data is not available or is in an unexpected format");
    }
  }, [properties]); // Runs when properties data changes

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Apartments</h1>
      {filteredProperties.length === 0 ? (
        <p>No apartments available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4 shadow-lg">
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p>{property.location}</p>
              <p>KSh {property.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Apartments;
