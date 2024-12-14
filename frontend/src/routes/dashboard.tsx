import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/modals/alert-modal";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";

export type VehicleColumn = {
  _id: string;
  fullName: string;
  phoneNumber: string;
  type: string;
  status: string;
  plateNumber: string;
  createdAt: string;
  updatedAt: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const vehiclesDataLoader = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API}/api/v1/vehicles`
    );
    console.log({ data: response.data });
    return response.data.map((item: VehicleColumn) => ({
      ...item,
      createdAt: format(item.createdAt, "MMMM do, yyyy (h:mm a)"),
      updatedAt: format(item.updatedAt, "MMMM do, yyyy (h:mm a)"),
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
};

// function shouldRevalidate({ actionStatus, defaultShouldRevalidate }) {
//   if (actionStatus != null && actionStatus >= 400) {
//     // Revalidate this loader when actions return a 4xx/5xx status
//     return true;
//   }
//   return defaultShouldRevalidate;
// }

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as VehicleColumn[];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-1">
        <div className="flex items-center justify-between">
          <Heading
            title={`Vehicles List (${data.length})`}
            description="Manage vehicles information"
          />
          <Button onClick={() => navigate(`/dashboard/vehicle`)}>
            <Plus className="mr-2 w-4 h-4" />
            Add New
          </Button>
        </div>
        <Separator />
        <DataTable columns={columns} data={data} searchKey="fullName" />
      </div>
    </div>
  );
};

export default DashboardPage;

const columns: ColumnDef<VehicleColumn>[] = [
  {
    accessorKey: "fullName",
    header: "Full name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "plateNumber",
    header: "Plate Number",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

interface CellActionProps {
  data: VehicleColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_BASE_API}/api/v1/vehicles/${data._id}`
      );
      navigate("/dashboard");
      toast.success("vehicle information deleted successfully!");
    } catch {
      toast.error("Something went wrong!,please try again");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8 p-0" variant={"ghost"}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate(`/dashboard/vehicle/${data._id}`)}
          >
            <Edit className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
