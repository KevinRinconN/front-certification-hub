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

import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { Company } from "@/interfaces/api/company/company.interface";
import { saveCompany } from "@/service/company/company.service";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre deberia tener mas de 2 caracteres.",
  }),
  nit: z.string().min(2, {
    message: "El apellido deberia tener mas de 2 caracteres.",
  }),
  phone: z
    .string()
    .min(2, {
      message: "El apellido deberia tener mas de 2 caracteres.",
    })
    .optional(),
  email: z
    .string()
    .email({ message: "Correo electronico invalido" })
    .optional(),
});

export const CreateCompanyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nit: "",
    },
  });
  const { data } = useSession();
  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<Company> => {
    if (!data?.user.access_token) throw new Error("Usuario no autenticado");
    const res = await saveCompany(data?.user.access_token, values);
    return res;
  };
  return (
    <StepperControl>
      {({ next }) => {
        const handleSubmit = (values: z.infer<typeof formSchema>) => {
          toast.promise(onSubmit(values), {
            loading: "Loading...",
            success: (data: Company) => {
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

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nit</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
