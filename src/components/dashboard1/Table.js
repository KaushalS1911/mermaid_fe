"use client";

import React from "react";
import PropTypes from "prop-types";
import {useTheme, useMediaQuery} from "@mui/material";
import {
    Box,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    TableHead,
    Avatar,
    Typography,
    IconButton,
    Stack
} from "@mui/material";
import {
    FirstPage as FirstPageIcon,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage as LastPageIcon,
    MoreVert,
    Add,
    Description,
    LibraryBooks,
    Schema
} from "@mui/icons-material";

import img from "../../asset/dashboard1/Ellipse.png";

const columns = [
    {id: "name", label: "Name", minWidth: 170},
    {id: "location", label: "Location", minWidth: 100},
    {id: "created", label: "Created", minWidth: 150},
    {id: "edited", label: "Edited", minWidth: 150},
    {id: "comments", label: "Comments", minWidth: 100},
    {id: "author", label: "Author", minWidth: 100},
    {id: "action", label: "Action", minWidth: 100}
];

const data = Array(20).fill({
    name: "Sample Name",
    location: "Sample Location",
    created: "1 Day Ago",
    edited: "1 Day Ago",
    comments: 5,
    author: img.src
});

function TablePaginationActions(props) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton onClick={() => onPageChange(null, 0)} disabled={page === 0}>
                {theme.direction === "rtl" ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={() => onPageChange(null, page - 1)} disabled={page === 0}>
                {theme.direction === "rtl" ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton onClick={() => onPageChange(null, page + 1)}
                        disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                {theme.direction === "rtl" ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton onClick={() => onPageChange(null, Math.max(0, Math.ceil(count / rowsPerPage) - 1))}
                        disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                {theme.direction === "rtl" ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};

const Dashboard = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{bgcolor: "#fff", minHeight: "100vh", p: {md: 2, xs: 0}}}>
            {/*<Container maxWidth="xl">*/}

            <Grid container spacing={2} sx={{my: 2}}>
                {[
                    {icon: <Add sx={{fontSize: "40px"}}/>, text: "Create a Blank Diagram"},
                    {icon: <Description sx={{fontSize: "40px"}}/>, text: "Generate an AI Diagram"},
                    {icon: <LibraryBooks sx={{fontSize: "40px"}}/>, text: "Browse Diagram Catalog"},
                    {icon: <Schema sx={{fontSize: "40px"}}/>, text: "(Example) User Data Model"}
                ].map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Box sx={{
                            p: {lg: 3, xs: 1},
                            textAlign: "center",
                            cursor: "pointer",
                            border: "1px solid #ddd",
                            boxShadow: "none",
                            transition: "0.3s",
                            borderRadius: 2,
                            "&:hover": {boxShadow: 3},
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Typography sx={{color: "#000"}}>{item.icon}</Typography>
                            <Typography sx={{color: "#000", mt: 1}}>{item.text}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <TableContainer component={Paper} sx={{mt: 3, overflowX: "auto", width: "100%"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Edited</TableCell>
                            <TableCell>Comments</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.id === "author" ? <Avatar src={row[column.id]}/> :
                                            column.id === "action" ? <IconButton><MoreVert/></IconButton> :
                                                row[column.id]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: "All", value: -1}]}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            {/*</Container>*/}
        </Box>
    );
};

export default Dashboard;
