import { virtualMachineForm } from "@/schemas/virtualMachineForm";
import { useFormContext } from "react-hook-form";

const ReviewStep = () => {
  const { watch } = useFormContext<virtualMachineForm>();
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
                <p className="text-sm">{formatValue(field.key, values[field.key as keyof virtualMachineForm])}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewStep
