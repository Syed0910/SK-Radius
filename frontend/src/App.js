import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ISPRadius from "./pages/ISPRadius";
import ISPRadiusPremium from "./pages/ISPRadiusPremium";
import LogServer from "./pages/LogServer";
import Store from "./pages/Store";
import ClientPortal from "./pages/ClientPortal";
import Partners from "./pages/Partners";
import Clients from "./pages/Clients";
import Docs from "./pages/Docs";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import TR069 from "./pages/TR069";
import { Toaster } from "./components/ui/toaster";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products/isp-radius" element={<ISPRadius />} />
            <Route path="products/isp-radius-premium" element={<ISPRadiusPremium />} />
            <Route path="products/log-server" element={<LogServer />} />
            <Route path="tr069" element={<TR069 />} />
            <Route path="store" element={<Store />} />
            <Route path="client-portal" element={<ClientPortal />} />
            <Route path="partners" element={<Partners />} />
            <Route path="clients" element={<Clients />} />
            <Route path="docs" element={<Docs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
