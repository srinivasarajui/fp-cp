import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  AuthPage,
  ReadyPage,
  ErrorComponent,
  Icons,
} from "@pankod/refine-antd";
import nestjsxCrudDataProvider from "@pankod/refine-nestjsx-crud";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
import { API_URL, getSecureInstance } from "connection";
import { ProofList } from "ProofsList";
import { authProvider } from "authProvider";
import { OrderList } from "OrdersList";
import { InvoiceList } from "InvoicesList";
import { Header } from "Header";
import { Title } from "Title";

function App() {
  const dataProvider = nestjsxCrudDataProvider(API_URL, getSecureInstance());
  return (
    <Refine
      notificationProvider={notificationProvider}
      Layout={Layout}
      LoginPage={AuthPage}
      authProvider={authProvider}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      Header={Header}
      Title={Title}
      resources={[
        {
          name: "proofs",
          list: ProofList,
          icon: <Icons.HighlightOutlined />,
        },
        {
          name: "orders",
          list: OrderList,
          icon: <Icons.AppstoreOutlined />,
        },
        {
          name: "invoices",
          list: InvoiceList,
          icon: <Icons.AuditOutlined />,
        },
      ]}
    />
  );
}

export default App;
