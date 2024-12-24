import { virtualMachineForm } from "@/schemas/virtualMachineForm";
import { useFormContext } from "react-hook-form";

const DisplayStep = () => {
  const { register } = useFormContext<virtualMachineForm>();
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Display Type</label>
        <select {...register("display")} className="mt-1 w-full rounded-md border p-2">
          <option value="sdl">SDL</option>
          <option value="gtk">GTK</option>
          <option value="spice">Spice</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">GL</label>
        <select {...register("gl")} className="mt-1 w-full rounded-md border p-2">
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
      </div>
    </div>
  );
};

export default DisplayStep;
