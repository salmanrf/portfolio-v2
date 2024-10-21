import { useState } from "react";
import { Route, NavLink, Routes, Outlet, BrowserRouter } from "react-router-dom";
import { BlogPage, Home, Projects } from "./pages";

function Layout() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="App">
      <header>
        <div className="hamburger-menu" onClick={() => setShowNav(!showNav)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav
          className={`navbar ${showNav ? "navbar-active" : ""}`}
          onClick={() => setShowNav(false)}
        >
          <NavLink to="/" className={({ isActive }) => (isActive ? "navlink-active" : "")}>
            HOME
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "navlink-active" : "")}>
            PROJECTS
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? "navlink-active" : "")}>
            Blog
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<BlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
