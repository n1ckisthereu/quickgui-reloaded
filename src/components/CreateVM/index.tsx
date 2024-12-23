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
  const { register } = useFormContext<FormData>();
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          {...register("name")}
          className="mt-1 w-full rounded-md border p-2"
        />
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

interface CreateVMProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateVM({ isOpen, onClose }: CreateVMProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

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
    console.log(currentStep);
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

  const onSubmit = () => {
    onClose();
    methods.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        methods.reset();
      }
    }}>
      <DialogContent className="sm:max-w-[600px]">
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
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
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
              {currentStep === totalSteps ? (
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                >
                  Finalizar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  Próximo
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
