"use client";
import {useEffect, useRef, useState} from "react";
import {Box, Grid, Tab, Tabs} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WidthNormalOutlinedIcon from '@mui/icons-material/WidthNormalOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {DataGrid} from "@mui/x-data-grid";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import Header from "@/components/header/Header";

export default function Home() {

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
    const rows = [{id: 1, name: "John Doe", age: 25, email: "john.doe@example.com"}, {
        id: 2, name: "Jane Smith", age: 30, email: "jane.smith@example.com"
    }, {id: 3, name: "Sam Johnson", age: 22, email: "sam.johnson@example.com"}, {
        id: 4, name: "Emily Brown", age: 27, email: "emily.brown@example.com"
    }, {id: 5, name: "Michael Lee", age: 35, email: "michael.lee@example.com"},];

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
    }, {
        field: "author", headerName: "Author", flex: 1, minWidth: 150,
    },];
    if (!token) {
    //  return router.push("/login");
    }
    return (<>
        <Box p={4} bgcolor={"#f1f1f1"} minHeight="100vh" height={"100%"}>
            {/*<Tabs value={value} onChange={handleChange} sx={{*/}
            {/*    padding: 0,*/}
            {/*}}>*/}
            {/*    <Tab value="all" label="All" sx={{*/}
            {/*        borderRadius: "4px",*/}
            {/*        backgroundColor: "#fff",*/}
            {/*        minHeight: 0,*/}
            {/*        minWidth: 0*/}
            {/*    }}/>*/}
            {/*</Tabs>*/}


            {value === "all" && <Box mt={2}>
                <Grid container>
                    {cardData.map((item, index) => (<Grid item xs={12} sm={6} md={3} key={index} px={1}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 5,
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            cursor: "pointer"
                        }} onClick={() => router.push(item.navigate)}>
                            <Box>{item.icon}</Box>
                            <Box>{item.title}</Box>
                        </Box>
                    </Grid>))}
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
                </Grid>
            </Box>}
        </Box>

    </>);
}
