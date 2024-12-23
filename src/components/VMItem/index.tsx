import { Button } from "@/components/ui/button"
import VMListItems from "@/types/VMItemType"
import { Play, X } from "lucide-react"

export default function VMItem(data: VMListItems, index: number) {
  return (
    <ul className="space-y-2">
      <li key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
        <Button variant="ghost" size="sm" className="w-full justify-start cursor-default">
          <i className="mr-2 text-xl">{data.icon}</i>
          <span>{data.name}</span>
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Play className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>
      </li>
    </ul>
  )
}
