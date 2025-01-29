"use client";
import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Grid, IconButton,
    Typography, useTheme
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WidthNormalOutlinedIcon from '@mui/icons-material/WidthNormalOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {DataGrid} from "@mui/x-data-grid";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {
    MoreVert
} from "@mui/icons-material";
import img from "../../asset/dashboard1/Ellipse.png";


const Table = () => {
    const [value, setValue] = useState('all');
    const router = useRouter();
    const token = Cookies.get("token");

    // useEffect(() => {
    //     if (!token) {
    //         router.push("/login");
    //     }
    // }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const cardData = [{
        icon: <AddIcon sx={{fontSize: 80}}/>, title: "Create a Blank Diagram", navigate: "/diagram"
    }, {icon: <ArticleOutlinedIcon sx={{fontSize: 80}}/>, title: "Generate an AI Diagram", navigate: "/diagram"}, {
        icon: <WidthNormalOutlinedIcon sx={{fontSize: 80}}/>, title: "Browse Diagram Catalog", navigate: "/diagram"
    }, {
        icon: <AccountTreeOutlinedIcon sx={{fontSize: 80}}/>, title: "(Example) User Data Model", navigate: "/diagram"
    },]
    const rows = [
        {
            id: 1,
            name: "John Doe",
            age: 25,
            email: "john.doe@example.com",
            location: "Location",
            created: "1 Day Ago",
            edited: "1 Day Ago",
            comments: "0",
            author: img.src,
        },
        {
            id: 2,
            name: "Jane Smith",
            age: 30,
            email: "jane.smith@example.com",
            location: "Location",
            created: "1 Day Ago",
            edited: "1 Day Ago",
            comments: "0",
            author: img.src,
        },
        {
            id: 3,
            name: "Sam Johnson",
            age: 22,
            email: "sam.johnson@example.com",
            location: "Location",
            created: "1 Day Ago",
            edited: "1 Day Ago",
            comments: "0",
            author: img.src
        },
        {
            id: 4,
            name: "Emily Brown",
            age: 27,
            email: "emily.brown@example.com",
            location: "Location",
            created: "1 Day Ago",
            edited: "1 Day Ago",
            comments: "0",
            author: img.src
        },
        {
            id: 5,
            name: "Michael Lee",
            age: 35,
            email: "michael.lee@example.com",
            location: "Location",
            created: "1 Day Ago",
            edited: "1 Day Ago",
            comments: "0",
            author: img.src
        },
    ];

    const columns = [{
        field: "name", headerName: "Name", flex: 1, minWidth: 150,
    }, {
        field: "location", headerName: "Location", flex: 1, minWidth: 150,
    }, {
        field: "created", headerName: "Created", flex: 1, minWidth: 150,
    }, {
        field: "edited", headerName: "Edited", flex: 1, minWidth: 150,
    }, {
        field: "comments", headerName: "Comments", flex: 1, minWidth: 150,
    },
        {
            field: "author",
            headerName: "Author",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Avatar src={params.value} alt="Author"/>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            // flex: 1,
            // minWidth: 10,
            // display: "flex",
            // alignItems: "end",
            renderCell: () => (
                <IconButton>
                    <MoreVert/>
                </IconButton>
            ),
        },
    ];
    if (!token) {
        return router.push("/login");
    }

    return (
        <div>
            <Box p={4} bgcolor={"#fff"} minHeight="100vh" height={"100%"}>

                {value === "all" && <Box mt={2}>
                    <Grid container spacing={2} sx={{my: 2}}>

                        {cardData.map((item, index) => (
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
                                }}
                                     onClick={() => router.push(item.navigate)}
                                >
                                    <Typography sx={{color: "#000"}}>{item.icon}</Typography>
                                    <Typography sx={{color: "#000", mt: 1}}>{item.title}</Typography>
                                </Box>
                            </Grid>))}
                    </Grid>

                    <Grid item xs={12} my={5}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            hideFooter
                            sx={{
                                borderRadius: "8px", backgroundColor: "#fff", "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "#f0f0f0", color: "#333", fontWeight: "bold",
                                }, "& .MuiDataGrid-row:hover": {
                                    backgroundColor: "#f5f5f5",
                                },
                            }}
                        />
                    </Grid>

                </Box>}
            </Box>
        </div>
    );
};

export default Table;