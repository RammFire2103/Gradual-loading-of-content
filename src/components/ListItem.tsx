import { useAppDispatch } from "../app/store";
import { Card, Avatar, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Link } = Typography;

import { useState } from "react";

import type { Item, ItemId, RemoveItemAction } from "../app/store";

const ListItem = ({ item }: { item: Item }) => {
  const dispatch = useAppDispatch();

  const [isFade, setFade] = useState(false);

  const deleteItem = (id: ItemId) => {
    setFade(true);

    setTimeout(() => {
      dispatch({
        type: "removeItem",
        payload: { itemId: id },
      } satisfies RemoveItemAction);
    }, 500);
  };

  const actions: React.ReactNode[] = [
    <DeleteOutlined onClick={() => deleteItem(item.id)} key="setting" />,
  ];

  return (
    <>
      <Card
        className={isFade ? "item fade-out" : "item"}
        actions={actions}
        style={{ minWidth: 300 }}
      >
        <Card.Meta
          avatar={<Avatar src={item.owner.avatar_url} />}
          title={item.name}
          description={
            <>
              <p>
                User: <Link href={item.owner.html_url}>{item.owner.login}</Link>
              </p>
              <p>
                Repo: <Link href={item.html_url}>{item.html_url}</Link>
              </p>
            </>
          }
        />
      </Card>
    </>
  );
};
export default ListItem;
