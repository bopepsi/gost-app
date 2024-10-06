import React, { useContext, useEffect, useState } from 'react'
import BasicTable from '../components/UsersTable'
import Home from '../../shared/pages/Home';
import { AuthContext } from '../../shared/context/auth-context';

function Users() {

    const Auth = useContext(AuthContext);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        (Auth.role) && (async () => {

            try {
                const response = await fetch('http://localhost:5000/api/auth/allusers', {
                    method: 'post',
                    headers: {
                        "content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        role: Auth.role
                    })
                });

                const responseData = await response.json();

                if (!response.ok) {
                    alert(responseData.message);
                    return;
                }
                console.log('ALLUSERS...................')
                console.log(responseData);
                setUsers(responseData);
            } catch (err) {
                alert('Login failed');
            }
        })()
    }, [Auth, setUsers])

    return (
        //<UserList items={USERS} />
        <>
            {Auth.role === 'admin' ?
                <BasicTable items={users} /> : <Home />}
        </>
    )

}



export default Users