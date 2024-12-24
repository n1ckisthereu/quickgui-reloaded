import { useFormContext } from "react-hook-form";
import { virtualMachineForm } from "@/schemas/virtualMachineForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SystemStep = () => {
  const form = useFormContext<virtualMachineForm>();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="guest_os"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sistema Operacional</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sistema operacional" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="linux">Linux</SelectItem>
                <SelectItem value="macos">MacOS</SelectItem>
                <SelectItem value="windows">Windows</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="uefi"
        render={({ field }) => (
          <FormItem>
            <FormLabel>UEFI</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o modo UEFI" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="legacy">BIOS</SelectItem>
                <SelectItem value="uefi">UEFI</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tpm"
        render={({ field }) => (
          <FormItem>
            <FormLabel>TPM</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status do TPM" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="on">On</SelectItem>
                <SelectItem value="off">Off</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="secureboot"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Secure Boot</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status do Secure Boot" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="on">On</SelectItem>
                <SelectItem value="off">Off</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ram"
        render={({ field }) => (
          <FormItem>
            <FormLabel>RAM</FormLabel>
            <FormControl>
              <Input placeholder="Digite a quantidade de RAM" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cpu_cores"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CPU Cores</FormLabel>
            <FormControl>
              <Input placeholder="Digite o número de cores" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default SystemStep;
