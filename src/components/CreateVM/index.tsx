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
  disk_img: z.string().min(1, "Disk Image é obrigatório"),
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
  const { register, formState: { errors } } = useFormContext<FormData>();
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Disk Image</label>
        <input
          {...register("disk_img")}
          className={`mt-1 w-full rounded-md border p-2 ${errors.disk_img ? 'border-red-500' : ''}`}
        />
        {errors.disk_img && (
          <span className="text-sm text-red-500">{errors.disk_img.message}</span>
        )}
      </div>
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
  );
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
  const values = watch();

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
        { label: "Disk Image", key: "disk_img" },
        { label: "ISO", key: "iso" },
        { label: "Fixed ISO", key: "fixed_iso" }
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
