import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageTypes } from "@/types/Message";
import { Send } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3333");

interface Props {
  senderId: string;
  receiverId: string;
  setMessages: React.Dispatch<React.SetStateAction<MessageTypes[]>>;
  siderBarItemSelected: boolean;
}

const InputSend = ({ senderId, receiverId, setMessages, siderBarItemSelected }: Props) => {
  const [inputValue, setInputValue] = useState("");

  // Function to send the message to the server
  const handleSendMessage = useCallback(() => {
    if (inputValue.trim() === "") return;

    const messageData = {
      sender: senderId,
      receiver: receiverId,
      content: inputValue,
    };

    socket.emit(
      "sendMessage",
      messageData,
      (message: MessageTypes, error?: string) => {
        if (error) {
          console.error("Error sending message:", error);
        } else {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      }
    );

    setInputValue("");
  }, [inputValue, receiverId, senderId, setMessages]);

  // Listen for new messages from the server
  useEffect(() => {
    const handleReceiveMessage = (message: MessageTypes) => {
      console.log("🚀  message", message);
      if (message.receiver === senderId || message.sender === senderId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [senderId, setMessages]);

  return (
    <div className="border-t border-border p-4 flex items-center space-x-2">
      <Input
        placeholder="Digite uma mensagem..."
        className="h-10"
        disabled={!siderBarItemSelected}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <Button
        onClick={handleSendMessage}
        size="icon"
        variant={inputValue.trim() === "" ? "secondary" : "default"}
        className="h-10 w-10"
        disabled={inputValue.trim() === ""}
      >
        <Send />
      </Button>
    </div>
  );
};

export default InputSend;
