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
import { Company } from "@/interfaces/api/company/company.interface";
import { getCompanies } from "@/service/company/company.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "astro2",
    label: "Cargar mas ...",
  },
];

const formSchema = z.object({
  company: z.string({
    required_error: "Selecciona una empresa para continuar",
  }),
});

export const AsignCompanyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { data } = useSession();

  const [search, setSearch] = useState("");
  const [companies, setCompaniesData] = useState<Company[]>([]);

  useEffect(() => {
    const setCompanies = async () => {
      try {
        if (!data?.user.access_token) return;
        const { content } = await getCompanies(data?.user.access_token, search);
        setCompaniesData(content);
      } catch (error) {
        toast.error(`${error}`);
      }
    };

    setCompanies();
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
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <Combobox
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <ComboboxTrigger asChild>
                            <ComboboxValue
                              className="w-full max-w-md"
                              placeholder="Selecciona una empresa"
                            ></ComboboxValue>
                          </ComboboxTrigger>
                        </FormControl>
                        <ComboboxContent align="start" className=" p-0">
                          <CommandInput
                            onValueChange={setSearch}
                            placeholder="Busca una empresa ..."
                          />
                          <CommandList>
                            <CommandEmpty>Empresa no encontrado</CommandEmpty>
                            <ComboboxGroup>
                              {companies.map((company) => (
                                <ComboboxItem
                                  key={company.id}
                                  value={company.nit}
                                >
                                  <p className="flex flex-col">
                                    <strong className="font-medium">
                                      {company.nit}
                                    </strong>
                                    {company.name}
                                  </p>
                                </ComboboxItem>
                              ))}
                            </ComboboxGroup>
                          </CommandList>
                        </ComboboxContent>
                      </Combobox>
                      <FormDescription>
                        Busca por el Nit o nombre de la empresa
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
