import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const FetchContext = createContext();

export const useFetchContext = () => {
    return useContext(FetchContext);
};

export const FetchProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [details, setDetails] = useState([]);
    // Function to fetchOrdersFromServer categories from the server
    const fetchOrdersFromServer = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/orders");
            setOrders(response.data.orders);
            setDetails(response.data.details);
            setItems(response.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrdersFromServer();
    }, []);


    const contextValue = {
        orders,items,details
    };

    return (
        <FetchContext.Provider value={contextValue}>
            {children}
        </FetchContext.Provider>
    );
}