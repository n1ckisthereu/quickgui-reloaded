import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import VMItem from "@/components/VMItem"
import VMItemType from "@/types/VMItemType"
import { Outlet, useNavigate } from "react-router-dom"
import { Plus, Folder, MoreVertical, Settings, Download, Trash2, FolderOpen } from "lucide-react"
import CreateVM from "@/components/CreateVM"
import { useState } from "react"

export default function Layout() {
  const operatingSystemsMock = [
    { name: 'Ubuntu 20.04 LTS', icon: '🐧' },
    { name: 'Windows 10', icon: '🪟' },
    { name: 'Windows XP', icon: '🪟' },
    { name: 'RISC-V Linux', icon: '⚡' },
    { name: 'ReactOS', icon: '💻' },
    { name: 'Debian 10.9', icon: '🐧' },
    { name: 'Raspberry Pi OS', icon: '🫐' },
  ] as VMItemType[]

  const [vmModal, setvmModal] = useState(false)

  return (
    <div className="h-screen p-4">
      <CreateVM isOpen={vmModal} onClose={() => setvmModal(false)} ></CreateVM>
      <div className="grid grid-cols-12 gap-4 h-full">
        <nav className="col-span-4 border-r pr-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Virtual Machines</h2>
            {/* Context menu to folding and configurations */}
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="rounded-full">
                <Folder className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* Add more itens to menu context */}
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  {/* End context menu items */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* end menu to folding and configurations */}
          </div>
          {operatingSystemsMock.map((os, index) => (
            VMItem(os, index)
          ))}
        </nav>

        <main className="col-span-8 pl-4 flex flex-col">
          <header className="flex items-center justify-start gap-2 p-2">
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setvmModal(true)}>
              <Plus className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Quickgui</h1>
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
