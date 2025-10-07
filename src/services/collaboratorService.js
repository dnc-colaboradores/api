import express from "express";
import dotenv from "dotenv";
import collaboratorRoutes from "../routes/collaboratorsRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Rotas
app.use("/collaborators", collaboratorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
