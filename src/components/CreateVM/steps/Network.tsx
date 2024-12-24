import { useFormContext } from "react-hook-form";
import { virtualMachineForm } from "@/schemas/virtualMachineForm";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const NetworkStep = () => {
  const form = useFormContext<virtualMachineForm>();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="network"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Network</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="macaddr"
        render={({ field }) => (
          <FormItem>
            <FormLabel>MAC Address</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default NetworkStep;
