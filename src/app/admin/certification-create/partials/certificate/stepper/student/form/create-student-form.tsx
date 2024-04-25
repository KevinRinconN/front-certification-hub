"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  StepperNext,
  StepperPrevious,
} from "@/components/layout/common/stepper/stepper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { saveStudent } from "@/service/student/student.service";
import { Student } from "@/interfaces/api/student/student.interface";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "El nombre deberia tener mas de 2 caracteres.",
  }),
  lastName: z.string().min(2, {
    message: "El apellido deberia tener mas de 2 caracteres.",
  }),
  documentType: z.string().min(2, {
    message: "El apellido deberia tener mas de 2 caracteres.",
  }),
  identificationNumber: z.string().min(2, {
    message: "El apellido deberia tener mas de 2 caracteres.",
  }),
  email: z
    .string()
    .email({ message: "Correo electronico invalido" })
    .optional(),
  phone: z
    .string()
    .min(5, {
      message: "El telefono deberia tener mas de 5 caracteres.",
    })
    .optional(),
});

export const CreateStudentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      documentType: "CEDULA",
      identificationNumber: "",
    },
  });

  const { data } = useSession();

  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<Student> => {
    if (!data?.user.access_token) throw new Error("Usuario no autenticado");
    const res = await saveStudent(data?.user.access_token, values);
    return res;
  };
  return (
    <StepperControl>
      {({ next }) => {
        const handleSubmit = async (values: z.infer<typeof formSchema>) => {
          toast.promise(onSubmit(values), {
            loading: "Loading...",
            success: (data: Student) => {
              next();
              return `${data?.firstName} ha sido creado`;
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
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-8">
                  <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                      <FormItem className="max-w-20 w-full">
                        <FormLabel>Tipo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CEDULA">C.C</SelectItem>
                            <SelectItem value="TARJETA_IDENTIDAD">
                              T.I
                            </SelectItem>
                            <SelectItem value="CEDULA_EXTRANJERA">
                              C.E
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="identificationNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Numero de documento</FormLabel>
                        <FormControl>
                          <Input placeholder="10101010" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electronico</FormLabel>
                        <FormControl>
                          <Input placeholder="example@gmail.com" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefono</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <Separator className="" />
                <div className="w-full flex justify-end gap-2 px-6 py-4">
                  <StepperPrevious type="button">Atras</StepperPrevious>
                  <Button type="submit">Crear estudiante</Button>
                </div>
              </div>
            </form>
          </Form>
        );
      }}
    </StepperControl>
  );
};
