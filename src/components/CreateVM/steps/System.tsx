import { virtualMachineForm } from "@/schemas/virtualMachineForm";
import { useFormContext } from "react-hook-form";

const SystemStep = () => {
  const { register } = useFormContext<virtualMachineForm>();
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Sistema Operacional</label>
        <select {...register("guest_os")} className="mt-1 w-full rounded-md border p-2">
          <option value="linux">Linux</option>
          <option value="macos">MacOS</option>
          <option value="windows">Windows</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">UEFI</label>
        <select {...register("uefi")} className="mt-1 w-full rounded-md border p-2">
          <option value="legacy">Legacy</option>
          <option value="uefi">UEFI</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">TPM</label>
        <select {...register("tpm")} className="mt-1 w-full rounded-md border p-2">
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Secure Boot</label>
        <select {...register("secureboot")} className="mt-1 w-full rounded-md border p-2">
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">RAM</label>
        <input
          {...register("ram")}
          className="mt-1 w-full rounded-md border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">CPU Cores</label>
        <input
          {...register("cpu_cores")}
          className="mt-1 w-full rounded-md border p-2"
        />
      </div>
    </div>
  );
};

export default SystemStep;
