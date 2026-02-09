import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./app/routes/RequireAuth";

function LoginPage() {
  return <div>Login</div>;
}

function ProductsPage() {
  return <div>Products</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/products"
        element={
          <RequireAuth>
            <ProductsPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
