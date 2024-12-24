import { virtualMachineForm } from "@/schemas/virtualMachineForm";
import { useFormContext } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type DisplayType = "sdl" | "gtk" | "spice";
type GLType = "on" | "off";

const DisplayStep = () => {
  const { setValue } = useFormContext<virtualMachineForm>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="display">Display Type</Label>
        <Select
          onValueChange={(value: DisplayType) => setValue("display", value)}
          defaultValue="sdl"
        >
          <SelectTrigger id="display">
            <SelectValue placeholder="Select display type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sdl">SDL</SelectItem>
            <SelectItem value="gtk">GTK</SelectItem>
            <SelectItem value="spice">Spice</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gl">GL (3D Acceleration)</Label>
        <Select
          onValueChange={(value: GLType) => setValue("gl", value)}
          defaultValue="on"
        >
          <SelectTrigger id="gl">
            <SelectValue placeholder="Select GL status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="on">On</SelectItem>
            <SelectItem value="off">Off</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};


export default DisplayStep;
