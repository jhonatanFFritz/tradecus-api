import express from "express"; // ES6 import syntax (Node.js 14+)
import toursRoutes from "./routes/tours.routes.js";
import indexRoutes from "./routes/index.routes.js";
import doctypeRoutes from "./routes/doctype.routes.js";
import conveyanceRoutes from "./routes/conveyance.routes.js";


const app = express();

app.use(express.json()); // Parse JSON bodies

app.use("/api", indexRoutes);
app.use("/api", toursRoutes);
app.use("/api", doctypeRoutes);
app.use("/api", conveyanceRoutes);

app.use((req, res) => {
  res.status(404).json({ msg: "Página no encontrada" });
});
export default app;