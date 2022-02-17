import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutBasic from "./application/layouts/LayoutBasic";
import Index from "./application/pages/Index";
import Upload from "./application/pages/Upload";
import MediaView from "./application/pages/MediaView";
import { useRecoilState } from "recoil";
import { categoryListState } from "./application/abstract/EventContext";
import { API } from "./static/API";

function App() {
  const [categories, setCategories] = useRecoilState(categoryListState);

  useEffect(() => {
    const abortC = new AbortController();

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API.url}/category`, {
          signal: abortC.signal,
        });

        if (response.ok) {
          const data = await response.json();

          setCategories((prev) => {
            return [...prev, ...data];
          });
        } else {
          throw new Error("Failed to fetch the data!");
        }
      } catch {}
    };

    if (categories.length === 0) {
      fetchCategories();
    }

    return () => {
      abortC.abort();
    };
  }, [categories, setCategories]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutBasic />}>
          <Route path="" element={<Index />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/media-view/:id" element={<MediaView />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
