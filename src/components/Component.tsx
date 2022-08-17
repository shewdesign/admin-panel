import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React from "react";
import { useEffect } from "react";
import useComponent from "../hooks/useComponent";
import { Editors } from "./Editors";

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
