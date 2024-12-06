import DefaultAvatar from "@/components/DefaultAvatar"
import StatusColor from "@/components/StatusColor"
import { MessageTypes } from "@/types/Message"
import { SidebarItemTypes } from "@/types/SidebarItem"

interface props {
  data: SidebarItemTypes
  onClick: () => void
  siderBarItemSelected: SidebarItemTypes | null
  newMessages: MessageTypes[]
}

const SidebarItem = ({ data, onClick, siderBarItemSelected, newMessages }: props) => {
  return (
    <li
      className={`p-2 ${data.id === siderBarItemSelected?.id ? "bg-secondary" : "bg-secondary/20"}  text-secondary-foreground rounded-lg cursor-pointer flex items-center gap-2 relative`}
      onClick={onClick}
    >
      {newMessages.find((message) => message.sender === data.id) && (
        <div
          className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold animate-pulse"
        >
          1
        </div>
      )}

      <DefaultAvatar src={data.photo} alt="avatar" fallback="FT" />
      <div className="space-y-1">
        <p className="font-medium">{data.name}</p>
        <p className="text-xs opacity-80">{data.title}</p>
      </div>

      <div className="absolute top-2 right-2">
        <StatusColor status={data.status} />
      </div>
    </li>
  )
}

export default SidebarItem