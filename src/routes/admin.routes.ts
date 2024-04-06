import { CardStackIcon, FilePlusIcon } from "@radix-ui/react-icons";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { MagicWandIcon } from "@radix-ui/react-icons";
import {
  RectangleStackIcon,
  FolderIcon,
  BookmarkIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export interface Route {
  path: string;
  icon: React.ElementType;
  name: string;
}

const adminPrefix = "/admin";

const routesAdmin: Route[] = [
  {
    path: `${adminPrefix}/home`,
    icon: RectangleStackIcon,
    name: "Inicio",
  },
  {
    path: `${adminPrefix}/certificate`,
    icon: AcademicCapIcon,
    name: "Certificados",
  },
  {
    path: `${adminPrefix}/season`,
    icon: FolderIcon,
    name: "Temporadas",
  },
  {
    path: `${adminPrefix}/Cursos`,
    icon: BookmarkIcon,
    name: "Cursos",
  },
];

export default routesAdmin;
