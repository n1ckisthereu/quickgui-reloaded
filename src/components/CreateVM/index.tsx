import { useEffect, useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Definindo o schema de validação com Zod
const formSchema = z.object({
  // VMListItems
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string(),

  // Display
  display: z.enum(["sdl", "gtk", "spice"]),
  gl: z.enum(["on", "off"]),

  // Storage
  disk_type: z.enum(["new", "existing"]),
  disk_img: z.string().min(1, "Disk Image é obrigatório"),
  disk_size: z.string().optional(),
  disk_format: z.enum(["qcow2", "raw", "vdi", "vmdk"]).optional(),
  disk_allocation: z.enum(["dynamic", "full"]).optional(),
  iso: z.string().optional(),
  fixed_iso: z.string().optional(),

  // Network
  network: z.string(),
  macaddr: z.string(),

  // System
  guest_os: z.enum(["linux", "macos", "windows"]),
  uefi: z.enum(["legacy", "uefi"]).optional(),
  tpm: z.enum(["on", "off"]).optional(),
  secureboot: z.enum(["on", "off"]),
  ram: z.string(),
  cpu_cores: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const BasicInfoStep = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

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

const DisplayStep = () => {
  const { register } = useFormContext<FormData>();
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

const StorageStep = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext<FormData>();
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
    </div>);
};

const NetworkStep = () => {
  const { register } = useFormContext<FormData>();
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

const SystemStep = () => {
  const { register } = useFormContext<FormData>();
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

const ReviewStep = () => {
  const { watch } = useFormContext<FormData>();
  const values = watch(); // Obtém todos os valores atuais do formulário

  const formatValue = (key: string, value: any) => {
    if (value === undefined || value === "") return "Não definido";
    return value;
  };

  const sections = [
    {
      title: "Informações Básicas",
      fields: [
        { label: "Nome", key: "name" },
        { label: "Descrição", key: "description" }
      ]
    },
    {
      title: "Display",
      fields: [
        { label: "Tipo de Display", key: "display" },
        { label: "GL", key: "gl" }
      ]
    },
    {
      title: "Armazenamento",
      fields: [
        { label: "Tipo de Disco", key: "disk_type" },
        { label: "Disco", key: "disk_img" },
        { label: "Tamanho do Disco", key: "disk_size" },
        { label: "Formato do Disco", key: "disk_format" },
        { label: "ISO", key: "iso" },
        { label: "Fixed ISO", key: "fixed_iso" },
        { label: "Tipo De Alocação", key: "disk_allocation" }
      ]
    },
    {
      title: "Rede",
      fields: [
        { label: "Network", key: "network" },
        { label: "MAC Address", key: "macaddr" }
      ]
    },
    {
      title: "Sistema",
      fields: [
        { label: "Sistema Operacional", key: "guest_os" },
        { label: "UEFI", key: "uefi" },
        { label: "TPM", key: "tpm" },
        { label: "Secure Boot", key: "secureboot" },
        { label: "RAM", key: "ram" },
        { label: "CPU Cores", key: "cpu_cores" }
      ]
    }
  ];

  return (
    <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
      {sections.map((section) => (
        <div key={section.title} className="border rounded-lg p-4 bg-white">
          <h3 className="text-lg font-medium mb-3">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.key} className="space-y-1">
                <p className="text-sm font-medium text-gray-500">{field.label}</p>
                <p className="text-sm">{formatValue(field.key, values[field.key as keyof FormData])}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface CreateVMProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateVM({ isOpen, onClose }: CreateVMProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6; // Aumentamos para 6 passos

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display: "sdl",
      gl: "off",
      guest_os: "linux",
      secureboot: "off",
      disk_type: "new",
      disk_format: "qcow2",
      disk_allocation: "dynamic",
    },
    mode: "onChange"
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep />;
      case 2:
        return <DisplayStep />;
      case 3:
        return <StorageStep />;
      case 4:
        return <NetworkStep />;
      case 5:
        return <SystemStep />;
      case 6:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Informações Básicas";
      case 2:
        return "Configuração de Display";
      case 3:
        return "Armazenamento";
      case 4:
        return "Rede";
      case 5:
        return "Sistema";
      case 6:
        return "Revisar Configurações";
      default:
        return "";
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = {
      1: ["name", "description"],
      2: ["display", "gl"],
      3: ["disk_img", "iso", "fixed_iso"],
      4: ["network", "macaddr"],
      5: ["guest_os", "uefi", "tpm", "secureboot", "ram", "cpu_cores"],
      6: [], // Não precisa validar na revisão
    }[currentStep] || [];

    const isValid = await methods.trigger(fieldsToValidate as Array<keyof FormData>);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Dados finais:', data);
    onClose();
    methods.reset();
  };

  const getButtonText = () => {
    if (currentStep === totalSteps) return "Finalizar";
    if (currentStep === totalSteps - 1) return "Revisar";
    return "Próximo";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        methods.reset();
      }
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{getStepTitle()}</DialogTitle>
        </DialogHeader>

        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Passo {currentStep} de {totalSteps}
        </div>

        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {renderStep()}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className={`px-4 py-2 rounded-md text-sm ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                disabled={currentStep === 1}
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={currentStep === totalSteps ? methods.handleSubmit(onSubmit) : handleNext}
                className={`px-4 py-2 rounded-md text-sm ${currentStep === totalSteps
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {getButtonText()}
              </button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
