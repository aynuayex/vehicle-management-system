import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoaderData, useNavigate } from "react-router";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AlertModal from "@/components/modals/alert-modal";
import { VehicleColumn } from "./dashboard";

const formSchema = z.object({
  fullName: z.string().min(1),
  phoneNumber: z.string().min(1),
  type: z.string().min(1),
  status: z.string().min(1),
  plateNumber: z.string().min(1),
});

type VehicleFormValues = z.infer<typeof formSchema>;

const VehicleForm: React.FC = () => {
  const navigate = useNavigate();
  const initialData = useLoaderData() as VehicleColumn | null;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData
    ? "Edit vehicle information"
    : "Create vehicle information";
  const description = initialData
    ? "Edit a vehicle information"
    : "Add a new vehicle information";
  const toastMessage = initialData
    ? "Vehicle information updated."
    : "Vehicle information created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      fullName: "",
      phoneNumber: "",
      type: "",
      status: "",
      plateNumber: "",
    },
  });

  const onSubmit = async (data: VehicleFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `${import.meta.env.VITE_BASE_API}/api/v1/vehicles/${initialData._id}`,
          data
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BASE_API}/api/v1/vehicles`,
          data
        );
      }
      navigate(`/dashboard`);
      toast.success(toastMessage);
    } catch {
      toast.error("Something went wrong!,please try again");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_BASE_API}/api/v1/vehicles/${initialData?._id}`
      );
      navigate("/dashboard");
      toast.success("Vehicle information deleted successfully!");
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"icon"}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="0953621846"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Toyota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plate Number</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-8">
            <Button onClick={() => navigate("/dashboard")} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default VehicleForm;
