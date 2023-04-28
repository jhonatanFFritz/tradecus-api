import express from "express"; // ES6 import syntax (Node.js 14+)

import cors from "cors";
import toursRoutes from "./routes/tours.routes.js";
import doctypeRoutes from "./routes/doctype.routes.js";
import conveyanceRoutes from "./routes/conveyance.routes.js";
import paymentMethodRoutes from "./routes/paymentMethod.routes.js";
import additionalServiceRoutes from "./routes/additionalService.routes.js";
import imgRoutes from "../src/controllers/images/img.routes.js";

const app = express();
app.use(cors());

app.use(express.json()); // Parse JSON bodies

app.use("/api", toursRoutes);
app.use("/api", doctypeRoutes);
app.use("/api", conveyanceRoutes);
app.use("/api", paymentMethodRoutes);
app.use("/api", additionalServiceRoutes);
app.use("/api", imgRoutes);
app.use("/api", toursRoutes);

app.use((req, res) => {
  res.status(404).json({ msg: "Página no encontrada" });
});
export default app;
