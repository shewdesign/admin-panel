import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Select,
  SelectItem,
  Text,
  TextInput,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React from "react";
import { forwardRef, useEffect, useState } from "react";
import useComponent from "../hooks/useComponent";

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
  required,
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
  const [data, setData] = useState<string[]>(value);

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

const Component: React.FC<{ page: string; id: string }> = ({ page, id }) => {
  const [component, status, setComponent] = useComponent<any>(page, id);
  const [temp, setTemp] = useLocalStorage<any>({
    key: `${page}-${id}`,
    defaultValue: {
      ...component,
      changes: false,
    },
  });

  useEffect(() => {
    if (temp.changes == true) return;
    setTemp({
      ...component,
      changes: false,
    });
  }, [component, setTemp, temp.changes]);

  return (
    component && (
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        mb="xl"
        sx={{
          width: "100%",
        }}
      >
        <LoadingOverlay
          visible={status === "Loading..."}
          overlayOpacity={0.2}
        />
        <Group position="left" mb="md">
          <Divider />
          <Text weight={500} size="lg">
            {component.__typename}
            {temp.changes ? "*" : ""}
          </Text>
          <Badge size="sm" color="blue" variant="light">
            #{component.id}
          </Badge>
        </Group>
        <Divider />
        <Group
          dir="column"
          position="left"
          p="xl"
          sx={{
            width: "100%",
          }}
        >
          {Object.keys(temp)
            .filter((key) => !["id", "__typename", "changes"].includes(key))
            .map((key, i) => {
              const type = ["image", "schedule", "records"].includes(key)
                ? "asset"
                : Array.isArray(temp[key])
                ? "array"
                : typeof temp[key];

              const Editor = Editors[type] || Editors["string"];
              return (
                <Editor
                  key={i}
                  name={key
                    .split(" ")
                    .map(
                      (word) => word.charAt(0).toUpperCase() + word.slice(1)
                    )}
                  value={temp[key]}
                  onChange={(value: any) =>
                    setTemp({
                      ...temp,
                      [key]: value,
                      changes:
                        JSON.stringify({
                          ...temp,
                          [key]: value,
                          changes: undefined,
                        }) !=
                        JSON.stringify({
                          ...component,
                          changes: undefined,
                        }),
                    })
                  }
                />
              );
            })}
        </Group>
        <Card.Section>
          <Button
            variant="light"
            mt="lg"
            loading={status === "Loading..."}
            onClick={() => {
              const props = temp;
              delete props.changes;
              setComponent(props);
            }}
            sx={{
              width: "100%",
            }}
          >
            {status === "default" ? "Save" : status}
          </Button>
        </Card.Section>
      </Card>
    )
  );
};

export default Component;
