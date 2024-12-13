import { Request, Response } from "express";
import Vehicle from "../model/vehicle";

export const getVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Vehicle.findById(id).exec();
    res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

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
    const { fullName, phoneNumber, status, type, plateNumber } = req.body;
    if (!fullName || !phoneNumber || !status || !type || !plateNumber) {
      res.status(400).json({
        message:
          "fullName, phoneNumber, status, type, and plate Number are required!",
      });
      return;
    }
    const existingVehicle = await Vehicle.findOne({ plateNumber }).exec();
    if (existingVehicle) {
      res
        .status(409)
        .json({ message: "Vehicle Already exists with that Plate number!" });
      return;
    }
    const result = await Vehicle.create({
      fullName,
      phoneNumber,
      type,
      status,
      plateNumber,
    });
    res.status(201).json({
      success: `New Vehicle ${result.type} with plate no ${plateNumber} created, for ${fullName}!`,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName, phoneNumber, status, type, plateNumber } = req.body;
    if (!fullName || !phoneNumber || !status || !type || !plateNumber) {
      res.status(400).json({
        message:
          "fullName, phoneNumber,plateNumber, status and type are required!",
      });
      return;
    }
    const result = await Vehicle.findByIdAndUpdate(
      id,
      { fullName, phoneNumber, plateNumber, status, type },
      { new: true } // Return the updated document
    );

    if (!result) {
      res.status(404).json({ message: "Vehicle not found" });
      return;
    }
    res.status(200).json({
      success: `Vehicle ${result.type} with plate no ${result.plateNumber} updated, for ${fullName}!`,
    });
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
      return;
    }
    res.status(200).json({
      success: `Vehicle ${result.type} with plate no ${result.plateNumber} deleted, for ${result.fullName}!`,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
