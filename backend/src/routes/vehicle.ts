import { Router } from "express";
import { createVehicle, deleteVehicle, getVehicle, getAllVehicles, updateVehicle } from "../controllers/vehicleController";

const router = Router();

router.get("/", getAllVehicles);
router.get("/:id", getVehicle);
router.post("/", createVehicle);
router.patch("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
