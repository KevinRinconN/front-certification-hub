"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  StepperControl,
  StepperPrevious,
} from "@/components/layout/common/stepper/stepper";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { Course } from "@/interfaces/api/course/course.interface";
import { saveCourse } from "@/service/course/course.service";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre deberia tener mas de 2 caracteres.",
  }),
  topics: z
    .array(
      z.object({
        name: z.string().min(3, {
          message:
            "Por favor ingrese un nombre valido, debería ser mayor a 2 caracteres.",
        }),
      })
    )
    .optional(),
});

export const CreateCourseForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "topics",
    control: form.control,
  });

  const { data } = useSession();

  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<Course> => {
    if (!data?.user.access_token) throw new Error("Usuario no autenticado");
    const res = await saveCourse(data?.user.access_token, values);
    return res;
  };
  return (
    <StepperControl>
      {({ next }) => {
        const handleSubmit = (values: z.infer<typeof formSchema>) => {
          toast.promise(onSubmit(values), {
            loading: "Loading...",
            success: (data: Course) => {
              next();
              return `${data?.name} ha sido creado`;
            },
            error: (error) => `${error}`,
          });
        };
        return (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <div className="space-y-8 mx-auto">
                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Digita el nombre del curso
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  {fields.map((field, index) => (
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`topics.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            Temario
                          </FormLabel>
                          <FormDescription
                            className={cn(index !== 0 && "sr-only")}
                          >
                            Introduce el temario del curso (opcional). Comparte
                            los temas que deseas abordar
                          </FormDescription>
                          <FormControl>
                            <div className="relative group">
                              <Input {...field} />
                              <Button
                                className="absolute inset-y-0.5 right-1 w-8 h-8 text-muted-foreground hidden group-hover:flex"
                                variant={"ghost"}
                                size={"icon"}
                                onClick={() => remove(index)}
                              >
                                <Cross2Icon />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append({ name: "" })}
                  >
                    Añadir tema
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <Separator className="" />
                <div className="w-full flex justify-end gap-2 px-6 py-4">
                  <StepperPrevious type="button">Atras</StepperPrevious>
                  <Button type="submit">Crear curso</Button>
                </div>
              </div>
            </form>
          </Form>
        );
      }}
    </StepperControl>
  );
};
