import VMListItems from "@/types/VMItemType";

// TODO: Improve acessibility
export default function VMItem(data: VMListItems, index: number) {
  return (
    <ul className="space-y-2">
      <li key={index} className="flex items-center p-2 hover:bg-gray-100 rounded-md  justify-between">
        <button className="w-full text-start cursor-default">
          <i className="mr-2 text-xl">{data.icon}</i>
          <span>{data.name}</span>
        </button>
        <div className="flex gap-2">
          <button>
            <span>►</span>
          </button>
          <button>
            <span>✖</span>
          </button>
        </div>
      </li>
    </ul>
  );
}
