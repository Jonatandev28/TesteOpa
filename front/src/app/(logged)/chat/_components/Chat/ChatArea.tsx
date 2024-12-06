import DefaultAvatar from "@/components/DefaultAvatar";
import StatusColor from "@/components/StatusColor";
import useAuth from "@/hooks/useAuth";
import { MessageTypes } from "@/types/Message";
import { SidebarItemTypes } from "@/types/SidebarItem";
import { formatDate } from "@/utils/functions"
import { useEffect, useRef } from "react";

interface Props {
  children?: React.ReactNode;
  messages: MessageTypes[];
  siderBarItemSelected: SidebarItemTypes | null
}

const ChatArea = ({ children, messages, siderBarItemSelected }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col justify-end">
      {/* Topbar */}
      {siderBarItemSelected && (
        <div className="p-4 border-b border-border flex items-center gap-4">
          <DefaultAvatar src={siderBarItemSelected.photo || "https://github.com/shadcn.png"} alt="avatar" fallback="FT" />
          <div className="space-y-1">
            <p className="text-sm font-medium">{siderBarItemSelected.name}</p>
            <div className="flex items-center space-x-1">
              <StatusColor status={siderBarItemSelected.status} />
              <p className="text-xs opacity-80">{siderBarItemSelected.status}</p>
            </div>
          </div>
        </div>
      )}
      {/* Mensagens com rolagem */}
      {siderBarItemSelected && (
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={`${message.id}-${message.timestamp}`}
              className={`p-3 rounded-md flex ${message.sender === data?.id ? "justify-end" : ""}`}
            >
              <div
                className={`p-3 rounded-md ${message.sender === data?.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
                  }`}
              >
                <div className="space-y-2 text-end">
                  <p>{message.content}</p>
                  <p className="opacity-80">{formatDate(new Date(message.timestamp))}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input send message */}
      {children}
    </div>
  )
}

export default ChatArea