import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from "@/hooks/useAuth"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const DropDownAvatar = ({ children }: { children: React.ReactNode }) => {
  const { logout, data } = useAuth()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex flex-col text-sm items-end">
            <p className="font-medium">{data?.name}</p>
            <p className="opacity-70">{data?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout(router)} className="cursor-pointer">
          <LogOut />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDownAvatar