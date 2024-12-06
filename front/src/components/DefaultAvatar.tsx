import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface props {
  src: string
  alt: string
  fallback: string
  onClick?: () => void
}

const DefaultAvatar = ({ src, alt, fallback, onClick }: props) => {
  return (
    <Avatar className={`w-10 h-10 ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

export default DefaultAvatar