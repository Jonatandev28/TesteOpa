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


  const updateUserStatus = (dataSocket: SidebarItemTypes) => {
    const idSocket = dataSocket.id;
    const idLogged = data?.id

    setDataSideBar((prev) => prev.map((item) => (item.id === idSocket ? { ...item, status: dataSocket.status } : item)));
    if (idSocket !== idLogged) {
      toast(`${dataSocket.name} acabou de ${dataSocket.status === "online" ? "entrar" : "sair"}`);
    }
  };

  useEffect(() => {
    setClient(true);

    socket.on("userStatusChange", (dataSocket) => {
      updateUserStatus(dataSocket);
    });

    return () => {
      socket.off("userStatusChange");
    };
  }, []);

  const handleClick = (item: SidebarItemTypes) => {
    setSiderBarItemSelected((prev) => (prev?.id === item.id ? null : item));

    const updatedMessages = newMessages.filter((message) => message.sender !== item.id);

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
