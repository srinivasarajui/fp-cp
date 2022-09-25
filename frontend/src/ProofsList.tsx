import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  DateField,
  FilterDropdown,
  Select,
} from "@pankod/refine-antd";

export interface IProof {
  id: number;
  name: string;
  type: string;
  status: string;
  updatedDate: Date;
}

export const ProofList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IProof>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          key="id"
          title="Proof #"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="type"
          key="type"
          title="Type"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("type", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="name"
          key="name"
          title="Proof Name"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="status"
          key="status"
          title="Status"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("status", sorter)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Status"
              >
                {" "}
                <Select.Option value="InProgress">InProgress</Select.Option>
                <Select.Option value="Done">Done</Select.Option>
              </Select>
            </FilterDropdown>
          )}
          sorter
        />
        <Table.Column
          dataIndex="updatedDate"
          key="updatedDate"
          title="Last Updated"
          render={(value) => <DateField format="LLL" value={value} />}
          defaultSortOrder={getDefaultSortOrder("updatedDate", sorter)}
          sorter
        />
      </Table>
    </List>
  );
};
