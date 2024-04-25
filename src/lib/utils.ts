import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { read } from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const readSheetFromFile = (
  file: File,
  sheet: number = 0
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const data = e.target?.result;

      const workbook = read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      resolve(sheet);
    };

    reader.onerror = (e) => {
      reject(new Error("Error de lectura de archivo."));
    };
  });
};
