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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ComputerDesktopIcon,
  ScaleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  dateOfCourse: z.object({
    from: z.date({
      required_error: "Rango de fecha requerido",
    }),
    to: z.date({
      required_error: "Fecha de finalizacion requerida",
    }),
  }),
  dateCertificate: z.date({
    required_error: "Fecha de certificacion requerida",
  }),
  modality: z.string({
    required_error: "Modalidad requerida",
  }),
  hourlyintensity: z.string({
    required_error: "Modalidad requerida",
  }),
  valid: z.string({
    required_error: "Modalidad requerida",
  }),
  campus: z.string({
    required_error: "Modalidad requerida",
  }),
  season: z.string({
    required_error: "Temporada requerida",
  }),
});
export const DetailsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="dateOfCourse"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fechas de realización del curso</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "max-w-md pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value.from, "PPP", {
                                locale: esLocale as any,
                              })
                            ) : (
                              <span>Selecciona un rango de fechas</span>
                            )}
                            {field.value?.to && (
                              <>
                                {" "}
                                -{" "}
                                {format(field.value.to, "PPP", {
                                  locale: esLocale as any,
                                })}
                              </>
                            )}

                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={{
                            ...field.value,
                          }}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Selecciona el rango de fecha de inicio y finalizacion del
                      curso
                    </FormDescription>
                    {form.formState.errors.dateOfCourse?.to?.message && (
                      <p className="text-[0.8rem] font-medium text-destructive">
                        {form.formState.errors.dateOfCourse?.to?.message}
                      </p>
                    )}

                    <p className="text-[0.8rem] font-medium text-destructive">
                      {form.formState.errors.dateOfCourse?.message &&
                        "Rango de fechas requerido"}
                    </p>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateCertificate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de certificacion</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", {
                                locale: esLocale as any,
                              })
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Selecciona la fecha de certificacion
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modalidad</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-3 gap-4 max-w-lg"
                      >
                        <div>
                          <RadioGroupItem
                            value="Face-to-face"
                            id="Face-to-face"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="Face-to-face"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <UsersIcon className="mb-3 h-6 w-6" />
                            Presencial
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="blended"
                            id="blended"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="blended"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <ScaleIcon className="mb-3 h-6 w-6" />
                            Semi-presencial
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="virtual"
                            id="virtual"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="virtual"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <ComputerDesktopIcon className="mb-3 h-6 w-6" />
                            Virtual
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Selecciona una modalidad disponible
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:grid md:grid-cols-2 md:gap-16">
                <FormField
                  control={form.control}
                  name="hourlyintensity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intesidad horaria</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Digita el nombre del curso
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vigencia</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Digita el nombre del curso
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="max-w-lg">
                <FormField
                  control={form.control}
                  name="campus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sede</FormLabel>
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
                          <SelectItem value="m@example.com">
                            Villavicencio (Meta)
                          </SelectItem>

                          <SelectItem value="m@support.com">
                            Acacias (Meta)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage email addresses in your{" "}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-w-md">
                <FormField
                  control={form.control}
                  name="season"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temporada</FormLabel>
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
                          <SelectItem value="m@example.com">2024</SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage email addresses in your{" "}
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
                  <Button type="submit">Certificar</Button>
                </div>
              </div>
            </form>
          </Form>
        );
      }}
    </StepperControl>
  );
};
