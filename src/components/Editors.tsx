import {
  Avatar,
  Checkbox,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  SelectItem,
  Text,
  TextInput,
} from "@mantine/core";
import React, { forwardRef, useEffect, useState } from "react";

const StringEditor = ({
  name,
  value,
  onChange,
  required,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
}) => (
  <TextInput
    label={name}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    required={required}
    sx={{
      width: "100%",
    }}
  />
);

const NumberEditor = ({
  name,
  value,
  onChange,
  required,
}: {
  name: string;
  value: number;
  onChange: (value: number) => void;
  required: boolean;
}) => (
  <NumberInput
    label={name}
    value={value}
    onChange={onChange}
    required={required}
    sx={{
      width: "100%",
    }}
  />
);

const BooleanEditor = ({
  name,
  value,
  onChange,
  required,
}: {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
  required: boolean;
}) => (
  <Checkbox
    label={name}
    checked={value}
    onChange={(e) => onChange(e.currentTarget.checked)}
    required={required}
    sx={{
      width: "100%",
    }}
  />
);

const AssetEditor = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
}) => {
  const [uploads, setUploads] = useState<SelectItem[]>();

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    id: string;
    name: string;
  }

  // eslint-disable-next-line react/display-name
  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ id, name, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/${process.env.NEXT_PUBLIC_ACCOUNT}/uploads/${id}`}
          />

          <div>
            <Text size="sm">{name}</Text>
            <Text size="xs" color="dimmed">
              {id}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads`, {
      headers: {
        account: process.env.NEXT_PUBLIC_ACCOUNT!,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUploads(
          res.map((upload: any) => ({
            ...upload,
            value: upload.id,
            label: upload.name,
          }))
        );
      });
  }, []);

  if (!uploads) return "";

  return (
    <Select
      withinPortal={true}
      label={name}
      value={value}
      data={uploads}
      itemComponent={SelectItem}
      searchable
      placeholder="No upload selected."
      onChange={onChange}
      maxDropdownHeight={400}
      nothingFound="No uploads found."
      filter={(value, item) =>
        item.name.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.id.toLowerCase().includes(value.toLowerCase().trim())
      }
      sx={{
        width: "100%",
      }}
    />
  );
};

const ArrayEditor = ({
  name,
  value,
  onChange,
  required,
}: {
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  required: boolean;
}) => {
  const [, setData] = useState<string[]>(value);

  return (
    <MultiSelect
      label={name}
      data={value}
      value={value}
      onChange={onChange}
      required={required}
      searchable
      creatable
      getCreateLabel={(value) => `+ Create "${value}"`}
      onCreate={(value) => {
        setData((current) => [...current, value]);
        return value;
      }}
      withinPortal={true}
      sx={{
        width: "100%",
      }}
    />
  );
};

export const Editors: {
  [key: string]: any;
} = {
  string: StringEditor,
  number: NumberEditor,
  boolean: BooleanEditor,
  asset: AssetEditor,
  array: ArrayEditor,
};
