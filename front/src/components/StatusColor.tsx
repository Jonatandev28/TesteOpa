interface props {
  status: 'online' | 'offline';
}

const StatusColor = ({ status }: props) => {
  return <div className={`w-2 h-2 rounded-full ${status === "online" ? "bg-green-500" : "bg-gray-500"}`}></div>;
};

export default StatusColor