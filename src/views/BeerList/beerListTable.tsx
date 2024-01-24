import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableSortLabel,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { ApiParams, Beer, SORT } from "../../types";
import { Column, columns, SortFields, types } from "./consts";
import { isItemFavorite, updateFavorites } from "../../utils/favorites";
import FavoriteButton from "../../components/FavoriteButton";

interface ColumnProps {
  order: SORT;
  orderBy: SortFields;
  setSort: (id: SortFields) => void;
  setFilterBy: (id: keyof ApiParams, value: string) => void;
}

interface TableProps extends ColumnProps {
  total: number;
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (page: number) => void;
  items: Beer[];
}

function HeaderCell({
  column,
  order,
  orderBy,
  setSort,
  setFilterBy,
}: ColumnProps & { column: Column }) {
  const { id, label, sortKey, filterKey } = column;

  return (
    <TableCell key={id}>
      <TableSortLabel
        active={orderBy === sortKey && order !== "none"}
        direction={
          orderBy === sortKey ? (order === "none" ? undefined : order) : "asc"
        }
        onClick={() => setSort(sortKey)}
      >
        {id === "brewery_type" ? (
          <FormControl
            variant="standard"
            size="small"
            sx={{
              width: 100,
            }}
          >
            <InputLabel>Type</InputLabel>
            <Select
              onChange={(ev) => {
                const selectedValue = ev.target.value as string;
                setFilterBy(filterKey, selectedValue);
              }}
              label="Type"
            >
              <MenuItem value="">any</MenuItem>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField
            label={label}
            size="small"
            variant="standard"
            onChange={(ev) => setFilterBy(filterKey, ev.target.value)}
            onClick={(ev) => ev.stopPropagation()}
          />
        )}
      </TableSortLabel>
    </TableCell>
  );
}

export default function BeerListTable(props: TableProps) {
  const {
    setPage,
    setRowsPerPage,
    setSort,
    setFilterBy,
    items,
    order,
    orderBy,
    page,
    rowsPerPage,
    total,
  } = props;

  const navigate = useNavigate();

  return (
    <Box>
      <TableContainer
        sx={{
          maxHeight: 600,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <HeaderCell
                  key={column.id}
                  column={column}
                  setSort={setSort}
                  setFilterBy={setFilterBy}
                  order={order}
                  orderBy={orderBy}
                />
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              td: {
                border: 0,
              },
            }}
          >
            {items.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => navigate(`/beer/${item.id}`)}
                sx={{
                  cursor: "pointer",
                }}
              >
                {columns.map(({ id }) => (
                  <TableCell key={id}>{item[id]}</TableCell>
                ))}
                <TableCell>
                  <FavoriteButton
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      event.stopPropagation();
                      updateFavorites({ id: item.id, name: item.name });
                    }}
                    isActive={isItemFavorite({
                      id: item.id,
                      name: item.name,
                    })}
                    sx={{}}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(event: unknown, newPage: number) => setPage(newPage)}
        onRowsPerPageChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setRowsPerPage(parseInt(ev.target.value, 10))
        }
      />
    </Box>
  );
}
