import { useState, useEffect } from "react";

import { Collection } from "./components/Collection";

import { categories } from "./__mocks__/categories";

import "./index.scss";

export const App = () => {
  const [collections, setCollections] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsloading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsloading(true);
    const category = categoryId ? `category=${categoryId}` : "";

    fetch(`https://637111420399d1995d8a704c.mockapi.io/photos?page=${page}&limit=3&${category} `)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      })
      .finally(() => setIsloading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li onClick={() => setCategoryId(i)} className={categoryId === i ? "active" : ""} key={obj.name}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page === i + 1 ? "active" : ""}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};
