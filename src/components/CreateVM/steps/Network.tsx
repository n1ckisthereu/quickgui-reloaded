import { virtualMachineForm } from "@/schemas/virtualMachineForm";
import { useFormContext } from "react-hook-form";

const NetworkStep = () => {
  const { register } = useFormContext<virtualMachineForm>();
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Network</label>
        <input
          {...register("network")}
          className="mt-1 w-full rounded-md border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">MAC Address</label>
        <input
          {...register("macaddr")}
          className="mt-1 w-full rounded-md border p-2"
        />
      </div>
    </div>
  );
};

export default NetworkStep;
