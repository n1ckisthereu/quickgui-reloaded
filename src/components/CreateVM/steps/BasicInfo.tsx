import { virtualMachineForm } from "@/schemas/virtualMachineForm";
import { useFormContext } from "react-hook-form";

const BasicInfoStep = () => {
  const { register, formState: { errors } } = useFormContext<virtualMachineForm>();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          {...register("name")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Descrição</label>
        <textarea
          {...register("description")}
          className="mt-1 w-full rounded-md border p-2"
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
