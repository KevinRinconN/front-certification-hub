"use client";
import {
  Combobox,
  ComboboxContent,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/layout/common/combobox/combobox";
import {
  StepperControl,
  StepperNext,
  StepperPrevious,
} from "@/components/layout/common/stepper/stepper";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Student } from "@/interfaces/api/student/student.interface";
import { cn } from "@/lib/utils";
import { getStudents } from "@/service/student/student.service";
import { useIndividualStepperStore } from "@/stores/certificate-stepper/individual.store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  CaretSortIcon,
  CheckIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  identificationNumber: z
    .string({
      required_error: "Selecciona un estudiante para continuar",
    })
    .min(6, {
      message: "Minimo 4 letras",
    }),
});

export const AsignStudentForm = () => {
  const { data } = useSession();

  const identificationNumber = useIndividualStepperStore(
    (state) => state.identificationNumber
  );

  const setIidentificationNumber = useIndividualStepperStore(
    (state) => state.setIdentificationNumber
  );

  const [search, setSearch] = useState("");
  const [students, setStudentData] = useState<Student[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identificationNumber: identificationNumber,
    },
  });

  useEffect(() => {
    const setStudents = async () => {
      try {
        if (!data?.user.access_token) return;
        const { content } = await getStudents(data?.user.access_token, search);
        setStudentData(content);
      } catch (error) {
        toast.error(`${error}`);
      }
    };

    setStudents();
  }, [search]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIidentificationNumber(data.identificationNumber);
  }
  return (
    <StepperControl>
      {({ next }) => {
        const handleSubmit = (values: z.infer<typeof formSchema>) => {
          onSubmit(values);
          next();
        };
        return (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" space-y-8"
            >
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="identificationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estudiante</FormLabel>
                      <Combobox
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <ComboboxTrigger asChild>
                            <ComboboxValue
                              className="w-full max-w-md"
                              placeholder="Selecciona un estudiante"
                            ></ComboboxValue>
                          </ComboboxTrigger>
                        </FormControl>
                        <ComboboxContent align="start" className=" p-0">
                          <CommandInput
                            onValueChange={setSearch}
                            placeholder="Busca un estudiante ..."
                          />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <ComboboxGroup>
                              {students.map((student) => (
                                <ComboboxItem
                                  key={student.identificationNumber}
                                  value={student.identificationNumber}
                                >
                                  <p className="flex flex-col">
                                    <strong className="font-medium">
                                      {student.identificationNumber}
                                    </strong>
                                    {student.firstName} {student.lastName}
                                  </p>
                                </ComboboxItem>
                              ))}
                            </ComboboxGroup>
                          </CommandList>
                        </ComboboxContent>
                      </Combobox>
                      <FormDescription>
                        Busca por numero de cedula o nombre de estudiante
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <Separator className="" />
                <div className="w-full flex justify-end gap-2 px-6 py-4">
                  <StepperPrevious type="button">Atras</StepperPrevious>
                  <Button type="submit">Siguiente</Button>
                </div>
              </div>
            </form>
          </Form>
        );
      }}
    </StepperControl>
  );
};
