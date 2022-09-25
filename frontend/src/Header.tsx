import React, { useEffect, useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { AntdLayout, Typography, Avatar, Space } from "@pankod/refine-antd";

const { Text } = Typography;

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity();

  const [shouldRenderHeader, setRenderHeader] = useState<boolean>(false);
  useEffect(() => {
    setRenderHeader(user && (user.displayName || user.avatar));
    console.log(user, shouldRenderHeader);
  }, [user, shouldRenderHeader]);
  return shouldRenderHeader ? (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        backgroundColor: "#FFF",
      }}
    >
      <Space>
        {user.displayName && (
          <Text ellipsis strong>
            {user.displayName}
          </Text>
        )}
        {user.avatar && (
          <Avatar size="large" src={user?.avatar} alt={user?.displayName} />
        )}
      </Space>
    </AntdLayout.Header>
  ) : null;
};
