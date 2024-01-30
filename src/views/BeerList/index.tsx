import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

// Custom hook for debouncing API requests
import { useDebounce } from "../../hooks/useDebounce";

// Types and constants related to the BeerList component
import { ApiParams, Beer, SORT } from "../../types";
import BeerListTable from "./beerListTable";
import { SortFields } from "./consts";
import { fetchData, fetchMetadata } from "./utils";

// Object defining the next sorting order for each existing order
const nextOrder = {
  asc: "desc",
  desc: "none",
  none: "asc",
} as Record<SORT, SORT>;

const BeerList = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [order, setOrder] = useState<SORT>("none");
  const [orderBy, setOrderBy] = useState<SortFields>("name");
  const [total, setTotal] = useState(0);
  const [filterParams, setFilterParams] = useState<ApiParams>({
    per_page: 10,
    page: 1,
  });

  // Debounced API request for fetching metadata
  const fetchMetadataDebounced = useDebounce(() =>
    fetchMetadata(setTotal, filterParams)
  );

  // Debounced API request for fetching beer list
  const fetchDataDebounced = useDebounce(() =>
    fetchData(setBeerList, {
      ...filterParams,
      sort: order === "none" ? undefined : `${orderBy}:${order}`,
    })
  );

  // UseEffect hooks to handle metadata and beer list fetching
  useEffect(fetchMetadataDebounced, [fetchMetadataDebounced, filterParams]);
  useEffect(fetchDataDebounced, [
    fetchDataDebounced,
    filterParams,
    order,
    orderBy,
  ]);

  // Functions for handling pagination, sorting, and filtering
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
};

export default BeerList;
