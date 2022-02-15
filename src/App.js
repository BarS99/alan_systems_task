import { Routes, Route } from "react-router-dom";
import LayoutBasic from "./application/layouts/LayoutBasic";
import Index from "./application/pages/Index";
import Upload from "./application/pages/Upload";
import MediaView from "./application/pages/MediaView";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<LayoutBasic />}>
            <Route path="" element={<Index />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/media-view/:id" element={<MediaView />} />
          </Route>
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
