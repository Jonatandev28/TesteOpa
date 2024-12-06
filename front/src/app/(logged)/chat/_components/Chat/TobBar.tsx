import DefaultAvatar from "@/components/DefaultAvatar"
import DropDownAvatar from "./DropDownAvatar"
import useAuth from "@/hooks/useAuth"

const TopBar = () => {
  const { data } = useAuth()
  return (
    <>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h1 className="text-xl font-semibold">Mensagens</h1>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col text-sm items-end">
            <p className="font-medium">{data?.name}</p>
            <p className="opacity-70">{data?.email}</p>
          </div>
          <DropDownAvatar >
            <DefaultAvatar
              src={data?.photo || "https://github.com/shadcn.png"}
              alt="avatar"
              fallback="FT"
              onClick={() => { }}
            />
          </DropDownAvatar>
        </div>
      </div>
    </>
  )
}

export default TopBar