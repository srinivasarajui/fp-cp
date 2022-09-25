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

export interface IOrder {
  id: number;
  orderName: string;
  shipType: string;
  client: string;
  manager: string;
  amountDue: string;
  updatedDate: Date;
  createDate: Date;
  dueDate: Date;
}

export const InvoiceList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IOrder>({
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
          title="Invoice #"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
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
                <Select.Option value="Open">Open</Select.Option>
                <Select.Option value="Closed">Closed</Select.Option>
              </Select>
            </FilterDropdown>
          )}
          sorter
        />
        <Table.Column
          dataIndex="name"
          key="name"
          title="Order Name"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="client"
          key="client"
          title="Client"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("client", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="manager"
          key="manager"
          title="Manager"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("manager", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="dueAmount"
          key="dueAmount"
          title="Due Amount"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("dueAmount", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="dueDate"
          key="dueDate"
          title="Due Date"
          render={(value) => <DateField format="LLL" value={value} />}
          defaultSortOrder={getDefaultSortOrder("dueDate", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="createDate"
          key="createDate"
          title="Creation Date"
          render={(value) => <DateField format="LLL" value={value} />}
          defaultSortOrder={getDefaultSortOrder("updatedDate", sorter)}
          sorter
        />
      </Table>
    </List>
  );
};
