import VMCard from "@/components/VMCard"
import CardItemType from "@/types/CardItemType"

export default function Home() {
  const cardMenuItems: CardItemType[] = [
    { name: 'Create a new virtual machine', icon: '+' },
    { name: 'Browser gallery', icon: '📑' },
    { name: 'Support', icon: '❓' },
  ]

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-16">
        {cardMenuItems.map((card) => (
          VMCard(card)
        ))}
      </div>
    </div>
  )
}



