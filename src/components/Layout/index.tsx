import VMItem from "@/components/VMItem";
import VMItemType from "@/types/VMItemType";
import { Outlet } from "react-router-dom";


export default function Layout() {
  const operatingSystemsMock = [
    { name: 'Ubuntu 20.04 LTS', icon: '🐧' },
    { name: 'Windows 10', icon: '🪟' },
    { name: 'Windows XP', icon: '🪟' },
    { name: 'RISC-V Linux', icon: '⚡' },
    { name: 'ReactOS', icon: '💻' },
    { name: 'Debian 10.9', icon: '🐧' },
    { name: 'Raspberry Pi OS', icon: '🫐' },
  ] as VMItemType[];

  return (
    <div className="h-screen p-4">
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-4 border-r pr-4">
          <h2 className="text-lg font-semibold mb-4">Virtual Machines</h2>
          {operatingSystemsMock.map((os, index) => (
            VMItem(os, index)
          ))}
        </div>
        <div className="col-span-8 pl-4 flex flex-col">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex items-center justify-center">
              <span className="text-1xl">+</span>
            </div>
            <h1 className="text-xl font-semibold text-left">Quickgui</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
