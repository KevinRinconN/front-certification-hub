import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface infoSessionProps {
  firstName: string;
  lastName: string;
  email: string;
  rol: string;
}

export const SessionInfo = ({
  firstName,
  lastName,
  email,
  rol,
}: infoSessionProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-end mr-4">
        <span className="text-xs leading-none capitalize">
          {firstName.toLowerCase()} {lastName.toLowerCase()}
        </span>
        <span className="text-xs text-secondary leading-none capitalize">
          {rol.toLowerCase()}
        </span>
      </div>

      <Avatar className="w-9 h-9">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
