import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function Index() {
  return (
    <>
      <Header />
      <React.Suspense
        fallback={
          <div className="spinner-container">
            <Loader />
          </div>
        }
      >
        <Outlet />
      </React.Suspense>
      <Footer />
    </>
  );
}

export default Index;
