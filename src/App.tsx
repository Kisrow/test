import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./app/routes/RequireAuth";
import { LoginForm } from "./features/auth/LoginForm";
import { Center } from "@mantine/core";
import { Products } from "./features/products/Products";

function LoginPage() {
  return (
    <Center style={{ minHeight: "100vh" }}>
      <LoginForm />
    </Center>
  );
}

function ProductsPage() {
  return <Products />;
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
