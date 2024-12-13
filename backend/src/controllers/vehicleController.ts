import { Request, Response } from "express";
import Vehicle from "../model/vehicle";

export const getAllVehicles = async (_req: Request, res: Response) => {
  try {
    const result = await Vehicle.find();
    res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { name, plateNumber } = req.body;
    if (!name || !plateNumber) {
      res.status(400).json({ message: "Name and plate Number are required!" });
      return ;
    }
    const existingVehicle = await Vehicle.findOne({ plateNumber }).exec();
    if (existingVehicle) {
      res
        .status(409)
        .json({ message: "Vehicle Already exists with that Plate number!" });
    }
    const result = await Vehicle.create({
      name,
      plateNumber,
    });
    res.status(201).json({ success: `New Vehicle ${result.name} created!` });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    if (!name || !status) {
      res.status(400).json({ message: "Name and status are required!" });
      return;
    }
    const result = await Vehicle.findByIdAndUpdate(
      id,
      { name, status },
      { new: true }, // Return the updated document
    );

    if (!result) {
      res.status(404).json({ message: "Vehicle not found" });
    } else {
      res.status(200).json({ success: `Vehicle ${result.name} updated!` });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Vehicle.findByIdAndDelete(id);

    if (!result) {
      res.status(404).json({ message: "Vehicle not found" });
    } else {
      res.status(200).json({ success: `Vehicle ${result.name} deleted!` });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
