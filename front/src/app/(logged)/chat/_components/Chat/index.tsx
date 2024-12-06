'use client';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MessageTypes } from "@/types/Message";
import { SidebarItemTypes } from "@/types/SidebarItem";
import TopBar from "./TobBar";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import InputSend from "./InputSend";
import { Card, CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { api } from "@/service/api";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3333");

const Chat = () => {
  const { data } = useAuth();
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [newMessage, setNewMessage] = useState<MessageTypes | null>(null);
  const [sideBarItemSelected, setSideBarItemSelected] = useState<SidebarItemTypes | null>(null);
  const [newMessages, setNewMessages] = useState<MessageTypes[]>([]);
  const [dataSideBar, setDataSideBar] = useState<SidebarItemTypes[]>([]);

  const getDataSideBar = async () => {
    try {
      const res = await api.get("/users");
      setDataSideBar(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Emit "join" event when user is authenticated (with their id)
  useEffect(() => {
    if (data?.id) {
      socket.emit("join", data.id);
    }
    getDataSideBar();
  }, [data]);


  // Fetch chat messages based on selected sidebar item
  const fetchMessages = async () => {
    if (sideBarItemSelected && data) {
      try {
        socket.emit("getMessages", {
          sender: sideBarItemSelected.id,
          receiver: data.id,
        });


        // Listen for "receivedMessages" event to update the messages state
        socket.on("receivedMessages", (messages: MessageTypes[]) => {
          setMessages(messages);
        });

        // Handle errors in fetching messages
        socket.on("errorFetchingMessages", (message) => {
          console.error(message);
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  // Fetch messages when a sidebar item is selected
  useEffect(() => {
    if (sideBarItemSelected) {
      fetchMessages();
    }
  }, [sideBarItemSelected]);

  // Listen for real-time messages and append them to the messages state
  useEffect(() => {
    socket.on("receiveMessage", (newMessage: MessageTypes) => {
      setNewMessage(newMessage);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    if (newMessage) {
      if (newMessage.sender !== sideBarItemSelected?.id) {
        toast.success("Nova mensagem recebida!");
        setNewMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }
  }, [newMessage]);

  return (
    <Card className="w-[96%] max-w-7xl h-[90vh] bg-card text-card-foreground shadow-lg flex flex-col">
      <TopBar />
      <CardContent className="flex flex-1 overflow-hidden p-0">
        <Sidebar
          setSiderBarItemSelected={setSideBarItemSelected}
          siderBarItemSelected={sideBarItemSelected}
          newMessages={newMessages}
          setNewMessages={setNewMessages}
          setDataSideBar={setDataSideBar}
          dataSideBar={dataSideBar}
        />
        <ChatArea messages={messages} siderBarItemSelected={sideBarItemSelected}>
          <InputSend
            setMessages={setMessages}
            senderId={data?.id || ""}
            receiverId={sideBarItemSelected?.id || ""}
            siderBarItemSelected={!sideBarItemSelected ? false : true}
          />
        </ChatArea>
      </CardContent>
    </Card>
  );
};

export default Chat;
