// ==== Configuration for UI ====

export default interface VMListItems {
  id: string
  name: string
  description: string
  category?: string
  icon: string
  // icon: React.ReactNode;
}

// ==== Configuration file =====

export interface Display {
  display: "sdl" | "gtk" | "spice"
  gl: "on" | "off"
}

export interface Storage {
  disk_img: string
  iso?: string
  fixed_iso?: string
}

export interface Network {
  network: string
  macaddr: string
}

export interface System {
  guest_os: "linux" | "macos" | "windows"
  uefi?: "legacy" | "uefi"
  tpm?: "on" | "off"
  secureboot: "on" | "off"
  ram: string
  cpu_cores: string
}

export type VMConfiguration = {} & Display & Storage & Network & System
