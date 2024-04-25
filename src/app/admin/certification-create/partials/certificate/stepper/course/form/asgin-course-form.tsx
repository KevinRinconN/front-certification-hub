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

import { Separator } from "@/components/ui/separator";
import { Course } from "@/interfaces/api/course/course.interface";
import { getCourses } from "@/service/course/course.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  course: z.string({
    required_error: "Selecciona un curso para continuar",
  }),
});

export const AsignCourseForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { data } = useSession();

  const [search, setSearch] = useState("");
  const [courses, setCourseData] = useState<Course[]>([]);

  useEffect(() => {
    const setCourse = async () => {
      try {
        if (!data?.user.access_token) return;
        const { content } = await getCourses(data?.user.access_token, search);
        setCourseData(content);
      } catch (error) {
        toast.error(`${error}`);
      }
    };

    setCourse();
  }, [search]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
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
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Curso</FormLabel>
                      <Combobox
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <ComboboxTrigger asChild>
                            <ComboboxValue
                              className="w-full max-w-md"
                              placeholder="Selecciona un curso"
                            ></ComboboxValue>
                          </ComboboxTrigger>
                        </FormControl>
                        <ComboboxContent align="start" className=" p-0">
                          <CommandInput
                            onValueChange={setSearch}
                            placeholder="Busca un curso ..."
                          />
                          <CommandList>
                            <CommandEmpty>Curso no encontrado</CommandEmpty>
                            <ComboboxGroup>
                              {courses.map((course) => (
                                <ComboboxItem
                                  key={course.id}
                                  value={course.id?.toString()!}
                                  label={course.name}
                                >
                                  {course.name}
                                </ComboboxItem>
                              ))}
                            </ComboboxGroup>
                          </CommandList>
                        </ComboboxContent>
                      </Combobox>
                      <FormDescription>
                        Busca por nombre del curso
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
