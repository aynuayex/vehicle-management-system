import { Document } from 'mongoose'

// Define the Vehicle Interface
interface VehicleInterface extends Document {
  fullName: string
  phoneNumber: string
  type: string
  status: 'available' | 'unavailable' | 'maintenance'
  plateNumber: string
  createdAt?: Date // Included from timestamps
  updatedAt?: Date // Included from timestamps
}

export default VehicleInterface
