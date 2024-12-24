import { virtualMachineForm } from "@/schemas/virtualMachineForm";
import { useFormContext } from "react-hook-form";

const StorageStep = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext<virtualMachineForm>();
  const diskType = watch("disk_type");
  const diskImg = watch("disk_img");
  const diskSize = watch("disk_size");
  const diskFormat = watch("disk_format");

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.qcow2';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('File selected:', file);
        setValue('disk_img', file.name);
      }
    };

    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium">Tipo de Disco</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${diskType === "new" ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
            onClick={() => setValue("disk_type", "new")}
          >
            <input
              type="radio"
              {...register("disk_type")}
              value="new"
              id="new-disk"
              className="hidden"
            />
            <div className="flex flex-col items-center text-center">
              <label htmlFor="new-disk" className="font-medium mb-2">
                Criar novo disco
              </label>
              <span className="text-sm text-gray-500">
                Cria um novo arquivo de disco virtual
              </span>
            </div>
          </div>

          <div
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${diskType === "existing" ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
            onClick={() => setValue("disk_type", "existing")}
          >
            <input
              type="radio"
              {...register("disk_type")}
              value="existing"
              id="existing-disk"
              className="hidden"
            />
            <div className="flex flex-col items-center text-center">
              <label htmlFor="existing-disk" className="font-medium mb-2">
                Selecionar existente
              </label>
              <span className="text-sm text-gray-500">
                Usar um arquivo de disco existente
              </span>
            </div>
          </div>
        </div>
      </div>

      {diskType === "new" && (
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium">Nome do Disco</label>
              <input
                {...register("disk_img")}
                placeholder="Ex: disco-vm1.qcow2"
                className={`mt-1 w-full rounded-md border p-2 ${errors.disk_img ? 'border-red-500' : ''}`}
              />
              {errors.disk_img && (
                <span className="text-sm text-red-500">{errors.disk_img.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Tamanho do Disco</label>
              <input
                {...register("disk_size")}
                placeholder="Ex: 20G"
                className="mt-1 w-full rounded-md border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Formato do Disco</label>
              <select {...register("disk_format")} className="mt-1 w-full rounded-md border p-2">
                <option value="qcow2">QCOW2</option>
                <option value="raw">RAW</option>
                <option value="vdi">VDI</option>
                <option value="vmdk">VMDK</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium">Tipo de Alocação</label>
              <select {...register("disk_allocation")} className="mt-1 w-full rounded-md border p-2">
                <option value="dynamic">Dinâmica</option>
                <option value="full">Full Disk</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                {watch("disk_allocation") === "dynamic"
                  ? "A alocação dinâmica aloca espaço conforme necessário"
                  : "Full disk aloca todo o espaço imediatamente"}
              </p>
            </div>
          </div>
        </div>
      )}

      {diskType === "existing" && (
        <div className="mt-6 space-y-4">
          <button
            type="button"
            onClick={handleFileSelect}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Selecionar Arquivo .qcow2
          </button>

          {diskImg && (
            <div className="p-4 border rounded-lg bg-gray-50">
              <label className="block text-sm font-medium mb-2">Disco Selecionado:</label>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-gray-600 break-all">{diskImg}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">ISO (opcional)</label>
            <input
              {...register("iso")}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Fixed ISO (opcional)</label>
            <input
              {...register("fixed_iso")}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageStep;
