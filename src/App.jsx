import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/HomePage/Home";
import Login from "./pages/AuthenticationPages/Login";
import Register from "./pages/AuthenticationPages/Register";
import Layout from "./layout/Layout";
import FindWorkers from "./pages/FindWorkers/FindWorkers";
import NotFound from "./layout/NotFound";
import ProtectedRoute from "./layout/ProtectedRoute";
import ProtectedRoutePage from "./layout/ProtectedRoutePage";
import WorkerProfile from "./pages/FindWorkers/WorkerProfile/WorkerProfile";
import BookService from "./pages/FindWorkers/BookService/BookService";
import CustomerDashboard from "./pages/Dashboards/CustomerDashboard";
// Protected Route Component
//

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/find-workers"
          element={
            <ProtectedRoute>
              <Layout>
                <FindWorkers />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker-profile/:workerId"
          element={
            <ProtectedRoute>
              <Layout>
                <WorkerProfile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-worker/:workerId"
          element={
            <ProtectedRoute>
              <Layout>
                <BookService />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Add other protected routes here */}
        Example:{" "}
        <Route
          path="/customer-dashboard/:customerId"
          element={
            <ProtectedRoute>
              <Layout>
                <CustomerDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/protected-fallback" element={<ProtectedRoutePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Fallback route for unmatched URLs */}
        <Route
          path="*"
          element={
            // <Layout>
            <NotFound />
            // </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
