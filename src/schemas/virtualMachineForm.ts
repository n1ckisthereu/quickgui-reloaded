import { z } from 'zod';

export const virtualMachineSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  description: z.string(),
  display: z.enum(["sdl", "gtk", "spice"]),
  gl: z.enum(["on", "off"]),
  disk_type: z.enum(["new", "existing"]),
  disk_img: z.string().min(1, "Disk Image é obrigatório"),
  disk_size: z.string().optional(),
  disk_format: z.enum(["qcow2", "raw", "vdi", "vmdk"]).optional(),
  disk_allocation: z.enum(["dynamic", "full"]).optional(),
  iso: z.string().optional(),
  fixed_iso: z.string().optional(),
  network: z.string().optional(),
  macaddr: z.string().optional(),
  guest_os: z.enum(["linux", "macos", "windows"]),
  uefi: z.enum(["legacy", "uefi"]),
  tpm: z.enum(["on", "off"]).optional(),
  secureboot: z.enum(["on", "off"]),
  ram: z.string(),
  cpu_cores: z.string(),
});

export type virtualMachineForm = z.infer<typeof virtualMachineSchema>;
