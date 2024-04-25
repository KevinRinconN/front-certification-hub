"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import React from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import * as PopoverPrimitive from "@radix-ui/react-popover";

interface ComboboxContextProps {
  value: string | undefined;
  onChangeValue: (value: string) => void;
  label?: string;
  setLabel: (value: string) => void | undefined;
}

const ComboboxContext = createContext({} as ComboboxContextProps);
const { Provider } = ComboboxContext;

interface ComboboxProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
  value?: string;
  defaultValue?: string;
  onValueChange?(value: string): void;
}

export const Combobox: React.FC<ComboboxProps> = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  ...props
}) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const [label, setLabel] = useState<string | undefined>();

  return (
    <Provider
      value={{
        value,
        label,
        setLabel,
        onChangeValue: setValue,
      }}
    >
      <Popover {...props} />
    </Provider>
  );
};

export const ComboboxTrigger = PopoverPrimitive.Trigger;

interface ComboboxValueProps extends ButtonProps {
  placeholder: string;
}

export const ComboboxValue = React.forwardRef<
  HTMLButtonElement,
  ComboboxValueProps
>(({ className, placeholder, ...props }, ref) => {
  const { value, label } = useContext(ComboboxContext);

  return (
    <Button
      ref={ref}
      variant="outline"
      role="combobox"
      className={cn(
        " justify-between",
        !value && "text-muted-foreground",
        className
      )}
      {...props}
    >
      {value ? (label ? label : value) : placeholder}
      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );
});

export const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, className, ...props }, ref) => {
  return (
    <PopoverContent
      ref={ref}
      className={cn("min-w-[var(--radix-popper-anchor-width)] p-0", className)}
      {...props}
    >
      <Command className={className} shouldFilter={false}>
        {children}
      </Command>
    </PopoverContent>
  );
});

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Optional controlled state for the value of the search input.
   */
  value?: string;
  /**
   * Event handler called when the search value changes.
   */
  onValueChange?: (search: string) => void;
};

export const ComboboxInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <CommandInput ref={ref} className={cn("h-9", className)} {...props} />
    );
  }
);

export const ComboboxList = CommandList;

export const ComboboxEmpty = CommandEmpty;

export const ComboboxGroup = CommandGroup;

interface ItemProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "disabled" | "onSelect" | "value"
  > {
  /** Whether this item is currently disabled. */
  disabled?: boolean;
  /** Event handler for when this item is selected, either via click or keyboard selection. */
  onSelect?: (value: string) => void;
  /**
   * A unique value for this item.
   * If no value is provided, it will be inferred from `children` or the rendered `textContent`. If your `textContent` changes between renders, you _must_ provide a stable, unique `value`.
   */
  value: string;
  /** Optional keywords to match against when filtering. */
  keywords?: string[];
  /** Whether this item is forcibly rendered regardless of filtering. */
  forceMount?: boolean;
  label?: string;
}

export const ComboboxItem = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, value: valueProps, label, ...props }, ref) => {
    const { value, onChangeValue, setLabel } = useContext(ComboboxContext);

    return (
      <CommandItem
        ref={ref}
        onSelect={() => {
          label && setLabel(label);
          onChangeValue(valueProps);
        }}
        {...props}
      >
        {children}
        <CheckIcon
          className={cn(
            "ml-auto h-4 w-4",
            value === valueProps ? "opacity-100" : "opacity-0"
          )}
        />
      </CommandItem>
    );
  }
);
