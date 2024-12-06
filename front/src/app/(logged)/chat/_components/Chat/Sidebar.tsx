import { SidebarItemTypes } from "@/types/SidebarItem";
import SidebarItem from "./SidebarItem";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { MessageTypes } from "@/types/Message";
import useAuth from "@/hooks/useAuth";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3333");

interface props {
  setSiderBarItemSelected: React.Dispatch<React.SetStateAction<SidebarItemTypes | null>>;
  siderBarItemSelected: SidebarItemTypes | null
  newMessages: MessageTypes[]
  setNewMessages: React.Dispatch<React.SetStateAction<MessageTypes[]>>
  setDataSideBar: React.Dispatch<React.SetStateAction<SidebarItemTypes[]>>
  dataSideBar: SidebarItemTypes[]
}

const Sidebar = ({ setSiderBarItemSelected, siderBarItemSelected, newMessages, setNewMessages, setDataSideBar, dataSideBar }: props) => {
  const { data } = useAuth()
  const [client, setClient] = useState<boolean>(false);


  const updateUserStatus = (data: SidebarItemTypes) => {
    setDataSideBar((prevData) => {
      const userIndex = prevData.findIndex((user) => user.email === data.email);

      if (userIndex !== -1) {
        const updatedData = [...prevData];
        updatedData[userIndex] = { ...updatedData[userIndex], status: data.status };
        toast.success(`${updatedData[userIndex].name} acabou de ${data.status === "online" ? "entrar" : "sair"}`);
        return updatedData;
      } else {
        return [...prevData, data];
      }
    });
  };

  useEffect(() => {
    setClient(true);

    socket.on("userStatusChange", (data) => {
      updateUserStatus(data);
    });

    return () => {
      socket.off("userStatusChange");
    };
  }, []);

  const handleClick = (item: SidebarItemTypes) => {
    setSiderBarItemSelected((prev) => (prev?.id === item.id ? null : item));

    // Filtrar as mensagens para manter apenas as que NÃO possuem o sender igual ao item.id
    const updatedMessages = newMessages.filter((message) => message.sender !== item.id);

    // Atualize o estado ou faça algo com `updatedMessages` caso necessário
    setNewMessages(updatedMessages);
  };

  return (
    <div className="w-1/4 text-muted-foreground p-4 border-r border-border hidden lg:block max-h-full overflow-y-auto">
      {client && data && (
        <ul className="space-y-4">
          {dataSideBar.filter((item) => item.id !== data.id).map((item) => (
            <SidebarItem key={item.id} data={item} onClick={() => handleClick(item)} siderBarItemSelected={siderBarItemSelected} newMessages={newMessages} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
