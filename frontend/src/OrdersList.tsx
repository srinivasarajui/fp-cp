import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  DateField,
} from "@pankod/refine-antd";

export interface IOrder {
  id: number;
  name: string;
  shipType: string;
  status: string;
  updatedDate: Date;
  createDate: Date;
  dueDate: Date;
}

export const OrderList: React.FC<IResourceComponentsProps> = () => {
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
          title="Order #"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
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
          dataIndex="createDate"
          key="createDate"
          title="Creation Date"
          render={(value) => <DateField format="LLL" value={value} />}
          defaultSortOrder={getDefaultSortOrder("updatedDate", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="shipType"
          key="shipType"
          title="Ship Type"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("type", sorter)}
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
          dataIndex="status"
          key="status"
          title="Status"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("status", sorter)}
          sorter
        />
      </Table>
    </List>
  );
};
