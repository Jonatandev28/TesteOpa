import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  form: UseFormReturn<any>;
}

const DefaultInput = ({ name, label, type = "text", form }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const styleIcon = "opacity-40";
  const sizeIcon = 20;

  const getIcon = () => {
    switch (type) {
      case "password":
        return <Lock size={sizeIcon} className={styleIcon} />;
      case "email":
        return <Mail size={sizeIcon} className={styleIcon} />;
      default:
        return <User size={sizeIcon} className={styleIcon} />;
    }
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full md:min-w-[300px] lg:min-w-[370px]">
          <FormLabel className="pb-2">{label}</FormLabel>
          <FormControl>
            <div className="relative">

              {/* Input */}
              <Input
                type={inputType}
                className={`pl-8 pr-2 ${type === "password" ? "px-8" : ""}`}
                {...field}
              />

              {/* Left Icon */}
              <div className="absolute top-1/2 left-2 -translate-y-1/2">
                {getIcon()}
              </div>

              {/* Toggle Password Visibility */}
              {type === "password" && (
                <div
                  className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye size={sizeIcon} className={styleIcon} />
                  ) : (
                    <EyeOff size={sizeIcon} className={styleIcon} />
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DefaultInput;
