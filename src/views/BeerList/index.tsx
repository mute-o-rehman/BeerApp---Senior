import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";
import { ApiParams, Beer, SORT } from "../../types";
import BeerListTable from "./beerListTable";
import { SortFields } from "./consts";
import { fetchData, fetchMetadata } from "./utils";

const nextOrder = {
  asc: "desc",
  desc: "none",
  none: "asc",
} as Record<SORT, SORT>;

// eslint-disable-next-line max-lines-per-function
export default function BeerListView() {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [order, setOrder] = useState<SORT>("none");
  const [orderBy, setOrderBy] = useState<SortFields>("name");
  const [total, setTotal] = useState(0);
  const [filterParams, setFilterParams] = useState<ApiParams>({
    per_page: 10,
    page: 1,
  });

  const fetchMetadataDebounced = useDebounce(() =>
    fetchMetadata(setTotal, filterParams)
  );
  const fetchDataDebounced = useDebounce(() =>
    fetchData(setBeerList, {
      ...filterParams,
      sort: order === "none" ? undefined : `${orderBy}:${order}`,
    })
  );

  useEffect(fetchMetadataDebounced, [fetchMetadataDebounced, filterParams]);
  useEffect(fetchDataDebounced, [
    fetchDataDebounced,
    filterParams,
    order,
    orderBy,
  ]);

  const setPage = (newPage: number) =>
    setFilterParams({
      ...filterParams,
      page: newPage,
    });

  const setRowsPerPage = (per_page: number) =>
    setFilterParams({
      ...filterParams,
      per_page,
      page: 0,
    });

  const setSort = (id: SortFields) => {
    const newOrder: SORT = orderBy === id ? nextOrder[order] : "asc";

    setOrderBy(id);
    setOrder(newOrder);
  };

  const setFilterBy = (id: keyof ApiParams, value: string) =>
    setFilterParams({
      ...filterParams,
      page: 0,
      [id]: value.length > 0 ? value : undefined,
    });

  return (
    <Paper>
      <BeerListTable
        items={beerList}
        order={order}
        orderBy={orderBy}
        page={filterParams.page!}
        rowsPerPage={filterParams.per_page!}
        total={total}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        setSort={setSort}
        setFilterBy={setFilterBy}
      />
    </Paper>
  );
}
