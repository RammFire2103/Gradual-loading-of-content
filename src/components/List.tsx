import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useAppDispatch, useAppSelector } from "../app/store";

import { Flex, Typography } from "antd";
import { AddItemsAction } from "../app/store";

import type { Data, Item } from "../app/store";

const { Title } = Typography;

const List = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const items = useAppSelector((state) => state.items);

  const dispatch = useAppDispatch();

  const fetchItems = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${page}`
    );
    const data = await response.json();
    const dataArr: Data[] = data.items;
    const prepareData: Item[] = dataArr.map((data: Data): Item => {
      return {
        id: data.id,
        name: data.name,
        owner: {
          login: data.owner.login,
          avatar_url: data.owner.avatar_url,
          html_url: data.owner.html_url,
        },
        html_url: data.html_url,
      };
    });
    dispatch({
      type: "addItems",
      payload: { items: prepareData },
    } satisfies AddItemsAction);

    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      fetchItems();
    }
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Title>GitHub's</Title>
      <Flex vertical>
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
        {loading && <p>Loading...</p>}
      </Flex>
    </>
  );
};

export default List;
