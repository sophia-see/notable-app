import { useAppContext } from "@/contexts/AppContext";

interface ItemProps<T> {
  name: string;
  description: string;
  icon: React.ReactNode;
  selected: T;
  setSelected: React.Dispatch<React.SetStateAction<T>>;
  value: T;
}

export default function Item<T> ({name, description, icon, selected, setSelected, value}: ItemProps<T>) {
  const { isDarkMode } = useAppContext();
  const isActive = value == selected;

  const onClickItem = () => {
    setSelected(value)
  }

  return (
    <div 
      className={`
        flex justify-between items-center gap-4 
        p-4 
        rounded-[12px] 
        border-[1px] border-border
        ${isActive ? isDarkMode ? "bg-neutral-800" : "bg-neutral-100" : ""}
      `}
      onClick={onClickItem}
      role='button'
    >
      <div className='flex gap-4 items-center'>
        <div 
          className={`
            p-2 
            border-[1px] 
            border-border bg-background-2
            ${isDarkMode ? "text-neutral-0" : "text-neutral-950 "}
            rounded-[12px] 
          `}>
          {icon}
        </div>
        <div className='flex flex-col gap-[6px]'>
          <span className={`text-preset-4 ${isDarkMode ? "text-neutral-0" :"text-neutral-950"}`}>{name}</span>
          <span className={`text-preset-6 ${isDarkMode ? "text-neutral-300" :"text-neutral-700"}`}>{description}</span>
        </div>
      </div>
      <div className={`w-[16px] h-[16px] ${isActive ? `border-[4px] ${isDarkMode ? "bg-transparent" : "bg-neutral-0"} border-blue-500` : `border-[2px] ${isDarkMode ? "border-neutral-600" :"border-neutral-200"}`} rounded-full`}></div>
    </div>
  )
}