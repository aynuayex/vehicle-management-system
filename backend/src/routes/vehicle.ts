import { Router } from "express";
import { createVehicle, deleteVehicle, getAllVehicles, updateVehicle } from "../controllers/vehicleController";

const router = Router();

router.get("/", getAllVehicles);
router.post("/", createVehicle);
router.patch("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
