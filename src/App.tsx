import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AddDriver from "./pages/AddDriver"
import EditDriver from "./pages/EditDriver"
import PurchaseOrders from "./pages/PurchaseOrder";
import EditPurchaseOrder from "./pages/EditPurchaseOrder";
import AddPurchaseOrder from "./pages/AddPurchaseOrder";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Protected Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Protected Drivers */}
                <Route
                    path="/drivers"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Drivers />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/drivers/add"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <AddDriver />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/drivers/:id/edit"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <EditDriver />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/purchase-orders"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <PurchaseOrders />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/purchase-orders/create"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <AddPurchaseOrder />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/purchase-orders/:id/edit"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <EditPurchaseOrder />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;