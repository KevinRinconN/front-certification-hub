"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { cn, readSheetFromFile } from "@/lib/utils";
import {
  ArrowUpOnSquareIcon,
  ArrowUpTrayIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Cross1Icon, DownloadIcon } from "@radix-ui/react-icons";
import { type DragEvent, useState, ChangeEvent, useReducer } from "react";
import { utils as xlsxUtils } from "xlsx";

const EXPECTED_COLUMNS = [
  "Documento",
  "Tipo",
  "Nombres",
  "Apellidos",
  "Nit",
  "Empresa",
  "Inspector",
];

const notFoundColumns = (columns: string[]) => {
  return EXPECTED_COLUMNS.filter((column) => {
    return !columns.includes(column);
  });
};

const ALLOWED_FILE_TYPE = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const validateFileType = (file: File) => {
  return ALLOWED_FILE_TYPE.includes(file.type);
};

interface DataToExcel {
  Nombres: string;
  Apellidos: string;
  Tipo?: string;
  Documento: string;
  Empresa?: string;
  Nit: string;
  Inspector: string;
}

interface FileWithData {
  name: string;
  size: number;
  data: DataToExcel[];
}

type Action =
  | { type: "ADD_FILE_TO_INPUT"; payload: FileWithData }
  | { type: "REMOVE_FILE_TO_INPUT" };

type State = FileWithData | undefined;

export const UploadExcelForm = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [input, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "ADD_FILE_TO_INPUT":
          return { ...action.payload };
        case "REMOVE_FILE_TO_INPUT":
          return undefined;
      }
    },
    undefined
  );

  const addFilesToState = (files: FileWithData) => {
    dispatch({ type: "ADD_FILE_TO_INPUT", payload: files });
  };

  const removeFileToState = () => {
    dispatch({ type: "REMOVE_FILE_TO_INPUT" });
  };

  const handleDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const changeValue = async (file: File) => {
    const valid = validateFileType(file);
    if (!valid)
      throw new Error(
        "Tipo de archivo invalido, solo se permiten archivos .xlsx"
      );

    const sheet = await readSheetFromFile(file);

    const headerRow = xlsxUtils.sheet_to_json(sheet, {
      header: 1,
    })[0] as string[];

    const columnsNotFound = notFoundColumns(headerRow);

    if (columnsNotFound.length > 0)
      throw new Error(
        `El archivo excel no contiene la columna ${columnsNotFound.join(", ")}`
      );

    const parsedData: DataToExcel[] =
      xlsxUtils.sheet_to_json<DataToExcel>(sheet);

    const { name, size } = file;

    addFilesToState({
      name,
      size,
      data: parsedData.map((row) => {
        return {
          ...row,
        };
      }),
    });
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      if (e.target.files && e.target.files[0]) {
        await changeValue(e.target.files[0]);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh no, algo salio mal!!",
        description: `${error}`,
      });
    }
    e.target.value = "";
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 1)
          throw new Error("Solo se acepta un archivo a la vez");

        await changeValue(files[0]);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh no, algo salio mal!!",
        description: `${error}`,
      });
    }

    setDragActive(false);
    e.dataTransfer.clearData();
  };
  return (
    <>
      <Button className="w-full" variant={"outline"}>
        Descargar formato <DownloadIcon className="ml-2" />
      </Button>

      {input && (
        <div className="w-fit flex items-center text-sm rounded-md p-2 border text-secondary-foreground">
          <DocumentArrowUpIcon className="w-8 mr-2" />
          <div className="px-2">
            <p>{input.name}</p>
            <span className="text-xs text-muted-foreground">
              {(input.size / 1000).toFixed(0)} KB
            </span>
          </div>
          <Button size={"icon"} variant={"ghost"} onClick={removeFileToState}>
            <Cross1Icon className="w-4 h-4" />
          </Button>
        </div>
      )}
      {!input ? (
        <Label
          htmlFor="dropzone-file"
          className={cn(
            "relative h-full flex w-full aspect-video border-2 border-border border-dashed rounded-lg transition text-sm text-muted-foreground/50 ",
            dragActive && "bg-muted text-muted-foreground"
          )}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div
              className="absolute inset-0 cursor-pointer"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
            <ArrowUpTrayIcon className="w-10 mb-4" />
            <p className="mb-2">
              <span className="font-semibold">Haz click</span> o arrastra y
              suelta
            </p>
            <p>para seleccionar un archivo</p>
            <input
              accept=".xlsx"
              onChange={handleChange}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </div>
        </Label>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Documento</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Nombres</TableHead>
              <TableHead>Apellidos</TableHead>
              <TableHead>Nit</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Inspector</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {input.data.map((row) => (
              <TableRow key={row.Documento}>
                <TableCell
                  className={cn("font-medium", !row.Documento && "bg-red-200")}
                >
                  {row.Documento}
                </TableCell>
                <TableCell
                  className={cn(
                    !row.Tipo && "bg-red-200",
                    !["CC", "CE", "TI"].includes(row.Tipo ?? "") && "bg-red-200"
                  )}
                >
                  {row.Tipo}
                </TableCell>
                <TableCell className={cn(!row.Nombres && "bg-red-200")}>
                  {row.Nombres}
                </TableCell>
                <TableCell className={cn(!row.Apellidos && "bg-red-200")}>
                  {row.Apellidos}
                </TableCell>
                <TableCell className={cn(!row.Nit && "bg-red-200")}>
                  {row.Nit}
                </TableCell>
                <TableCell className={cn(!row.Empresa && "bg-red-200")}>
                  {row.Empresa}
                </TableCell>
                <TableCell className={cn(!row.Inspector && "bg-red-200")}>
                  {row.Inspector}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="flex flex-col">
        <Separator />
        <div className="w-full flex justify-end gap-2 px-6 py-4">
          <Button type="button" variant={"outline"}>
            Atras
          </Button>
          <Button type="submit">Certificar</Button>
        </div>
      </div>
    </>
  );
};
