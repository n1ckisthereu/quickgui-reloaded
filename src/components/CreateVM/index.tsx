import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import BasicInfoStep from '@/components/CreateVM/steps/BasicInfo';
import DisplayStep from '@/components/CreateVM/steps/Display';
import StorageStep from '@/components/CreateVM/steps/Storage';
import NetworkStep from '@/components/CreateVM/steps/Network';
import SystemStep from '@/components/CreateVM/steps/System';
import ReviewStep from '@/components/CreateVM/steps/Review';

import { zodResolver } from '@hookform/resolvers/zod';
import { virtualMachineForm, virtualMachineSchema } from '@/schemas/virtualMachineForm';
import { Button } from '@/components/ui/button';


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

  const methods = useForm<virtualMachineForm>({
    resolver: zodResolver(virtualMachineSchema),
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
      6: [],
    }[currentStep] || [];

    const isValid = await methods.trigger(fieldsToValidate as Array<keyof virtualMachineForm>);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = (data: virtualMachineForm) => {
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
            {/* {renderStep()} */}
            {renderStep()}

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={handleBack}
                className={`px-4 py-2 rounded-md text-sm ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                disabled={currentStep === 1}
              >
                Voltar
              </Button>
              <Button
                type="button"
                onClick={currentStep === totalSteps ? methods.handleSubmit(onSubmit) : handleNext}
                className={`px-4 py-2 rounded-md text-sm ${currentStep === totalSteps
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {getButtonText()}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}


