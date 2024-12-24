import { virtualMachineForm } from "@/schemas/virtualMachineForm";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HardDrive } from "lucide-react";

type DiskType = "new" | "existing";
type DiskFormat = "qcow2" | "raw";
type DiskAllocation = "dynamic" | "full";

const StorageStep = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<virtualMachineForm>();

  const diskType = watch("disk_type") as DiskType;
  const diskImg = watch("disk_img");
  const diskAllocation = watch("disk_allocation") as DiskAllocation;

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".qcow2";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setValue("disk_img", file.name);
      }
    };

    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Tipo de Disco</Label>
        <RadioGroup
          defaultValue={diskType}
          onValueChange={(value: DiskType) => setValue("disk_type", value)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="contents">
            <Label>
              <RadioGroupItem value="new" id="new-disk" className="sr-only" />
              <Card className={`transition-colors cursor-pointer ${diskType === "new" ? "border-primary bg-accent" : ""
                }`}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div>
                    <p className="font-medium mb-2">Criar novo disco</p>
                    <span className="text-sm text-muted-foreground">
                      Cria um novo arquivo de disco virtual
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Label>

            <Label>
              <RadioGroupItem value="existing" id="existing-disk" className="sr-only" />
              <Card className={`transition-colors cursor-pointer ${diskType === "existing" ? "border-primary bg-accent" : ""
                }`}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div>
                    <p className="font-medium mb-2">Selecionar existente</p>
                    <span className="text-sm text-muted-foreground">
                      Usar um arquivo de disco existente
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {diskType === "new" && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <Label>Nome do Disco</Label>
                <Input
                  {...register("disk_img")}
                  placeholder="Ex: disco-vm1.qcow2"
                  className={errors.disk_img ? "border-destructive" : ""}
                />
                {errors.disk_img && (
                  <span className="text-sm text-destructive">
                    {errors.disk_img.message}
                  </span>
                )}
              </div>

              <div>
                <Label>Tamanho do Disco</Label>
                <Input {...register("disk_size")} placeholder="Ex: 20G" />
              </div>

              <div>
                <Label>Formato do Disco</Label>
                <Select
                  onValueChange={(value: DiskFormat) => setValue("disk_format", value)}
                  defaultValue={watch("disk_format")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qcow2">QCOW2</SelectItem>
                    <SelectItem value="raw">RAW</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1 md:col-span-2">
                <Label>Tipo de Alocação</Label>
                <Select
                  onValueChange={(value: DiskAllocation) => setValue("disk_allocation", value)}
                  defaultValue={diskAllocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de alocação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dynamic">Dinâmica</SelectItem>
                    <SelectItem value="full">Full Disk</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-1 text-sm text-muted-foreground">
                  {diskAllocation === "dynamic"
                    ? "A alocação dinâmica aloca espaço conforme necessário"
                    : "Full disk aloca todo o espaço imediatamente"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {diskType === "existing" && (
        <div className="space-y-4">
          <Button
            type="button"
            onClick={handleFileSelect}
            className="w-full sm:w-auto"
          >
            Selecionar Arquivo .qcow2
          </Button>

          {diskImg && (
            <Card>
              <CardContent className="p-4">
                <Label className="mb-2">Disco Selecionado:</Label>
                <div className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground break-all">
                    {diskImg}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>ISO (opcional)</Label>
          <Input {...register("iso")} />
        </div>
        <div>
          <Label>Fixed ISO (opcional)</Label>
          <Input {...register("fixed_iso")} />
        </div>
      </div>
    </div>
  );
};

export default StorageStep;
