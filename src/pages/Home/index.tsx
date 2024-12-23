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
          <button className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">{card.icon}</span>
            </div>
            <p className="text-sm text-center">{card.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}



