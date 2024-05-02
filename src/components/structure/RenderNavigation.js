import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";
import ResultDetailPage from "../pages/ResultPage";
import SearchResult from "../SearchResult";
import AuthorDetails from "../pages/authorsDetails";
import ResearchDetail from "../pages/ResearchDetail";
import ResearchItem from "../pages/SearchItem";
export const RenderRoutes = () => {
  return (
    <Routes>
      {nav.map((r, i) => (
        <Route key={i} path={r.path} element={r.element} />
      ))}
      {/* Default route */}
      <Route path="/" element={<SearchResult />} />

      {/* Other routes */}
      <Route path="/researches" element={<ResultDetailPage />} />
      <Route path="/author/:id" element={<AuthorDetails />} />
      <Route path="/researches/:researches_id" element={<ResearchDetail />} />
    </Routes>
  );
};
export const RenderMenu = () => {
  const { user, logout } = AuthData();

  const MenuItem = ({ r }) => {
    return (
      <div className="menuItem">
        <Link to={r.path}>{r.name}</Link>
      </div>
    );
  };

  return (
    <div className="menu">
      {nav.map((r, i) => {
        // Check if the menu item is not private or if the user is authenticated
        if (!r.isPrivate || user.isAuthenticated) {
          // Render the menu item if it is a menu item
          if (r.isMenu) {
            return <MenuItem key={i} r={r} />;
          }
        }
        return null;
      })}

      {user.isAuthenticated ? (
        <div className="menuItem">
          <Link to={"#"} onClick={logout}>
            Log out
          </Link>
        </div>
      ) : (
        <div className="menuItem">
          <Link to={"login"}>Log in</Link>
        </div>
      )}
    </div>
  );
};
