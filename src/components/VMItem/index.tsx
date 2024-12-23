import VMListItems from "@/types/VMItemType";

export default function VMItem(data: VMListItems, index: number) {
  return (
    <ul className="space-y-2">
      <li key={index} className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
        <span className="mr-2 text-xl">{data.icon}</span>
        <span>{data.name}</span>
      </li>
    </ul>
  );
}
