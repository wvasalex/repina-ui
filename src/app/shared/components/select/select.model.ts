export interface SelectOption {
  label: string;
  value: number | string;
  meta?: any;
  position?: number;
}

export interface SelectGroup {
  disabled?: boolean;
  label: string;
  options: SelectOption[];
}

export function getOption(options: SelectOption[], value: number | string) {
  return options.find((option: SelectOption) => {
    return option.value === value;
  });
}
