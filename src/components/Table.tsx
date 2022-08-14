import {
  Button,
  Center,
  createStyles,
  FileInput,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import Image from "next/image";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileUpload,
  Search,
  Selector,
} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface RowData {
  name: string;
  id: string;
  path: string;
}

interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const keys = Object.keys(data[0]);
  const query = search.toLowerCase().trim();
  return data.filter((item: any) =>
    keys.some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData; reversed: boolean; search: string }
) {
  if (!payload.sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[payload.sortBy].localeCompare(a[payload.sortBy]);
      }

      return a[payload.sortBy].localeCompare(b[payload.sortBy]);
    }),
    payload.search
  );
}

export function TableSort({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData>("name");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows = sortedData.map((row) => (
    <tr key={row.id}>
      <td>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${process.env.NEXT_PUBLIC_ACCOUNT}/uploads/${row.id}`}
          alt={row.name}
          width={150}
          height={150}
          objectFit="cover"
        />
      </td>
      <td>{row.name}</td>
      {/* <td>{row.id}</td> */}
    </tr>
  ));

  return (
    <ScrollArea>
      <Group
        dir="row"
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          sx={{
            flex: 5,
          }}
          placeholder="Search by any field"
          mb="md"
          icon={<Search size={14} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Button
          sx={{
            flex: 1,
            marginBottom: 16,
          }}
          variant={"filled"}
          onClick={() =>
            openModal({
              title: "Upload File",
              children: (
                <>
                  <FileInput
                    placeholder="Select a file"
                    label="File"
                    radius="md"
                    size="md"
                    onChange={(file: any) => {
                      const formData = new FormData();
                      formData.append("file", file);
                      console.log(file);
                      fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads`, {
                        method: "POST",
                        body: formData,
                        headers: {
                          account: process.env.NEXT_PUBLIC_ACCOUNT!,
                        },
                      })
                        .then((res) => {
                          res.json().then((data) => {
                            console.log(data);
                            closeAllModals();
                            location.reload();
                          });
                        })
                        .catch((text) => {
                          openModal({
                            title: "An Error Occurred.",
                            children: (
                              <>
                                <Text>{text}</Text>
                                <Button
                                  onClick={() => closeAllModals()}
                                  variant={"filled"}
                                  mr="md"
                                  color="red"
                                >
                                  Close
                                </Button>
                              </>
                            ),
                          });
                        });
                    }}
                  />
                </>
              ),
            })
          }
          rightIcon={<FileUpload size={21} />}
        >
          Upload
        </Button>
      </Group>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === "path"}
              reversed={reverseSortDirection}
              onSort={() => {}}
            >
              Image
            </Th>
            <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("name")}
            >
              Name
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
