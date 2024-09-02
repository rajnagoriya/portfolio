import { createContext, useContext } from "react";
import { useGetUserDataQuery } from "../redux/api/userApi";
import { Error } from "../component/shared/error";
import Loading from "../component/shared/loading";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const { data, isLoading, isError, error } = useGetUserDataQuery();

    if (isLoading) {
        return <Loading/>;
    }
    if (isError) {
        return <Error error={error}/>;
    }

    const userData = data ? data.data : null;
    
    return (
        <UserDataContext.Provider value={userData}>
            {children}
        </UserDataContext.Provider>
    );
};
