import React, { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { FeaturedDishes } from "../components/FeaturedDishes";

export function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();
      setFoodItem(response[0]); // Assuming response[0] is food items
      setFoodCat(response[1]); // Assuming response[1] is food categories
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filtered = foodItem.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.CategoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, foodItem]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Hero onSearch={handleSearch} />
      <FeaturedDishes foodCat={foodCat} foodItem={filteredItems} />
    </>
  );
}
