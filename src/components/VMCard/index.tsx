import { Card } from "@/components/ui/card"
import CardItemType from "@/types/CardItemType"

export default function VMCard(data: CardItemType) {
  return (
    <Card className="flex flex-col items-center p-4 hover:shadow-md cursor-pointer">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
        <span className="text-2xl">{data.icon}</span>
      </div>
      <p className="text-sm text-center">{data.name}</p>
    </Card>
  )
}
