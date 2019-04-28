import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationList = (props) => (
    <>
        <div>
            {
                props.notify.map((a, i) => 
                    <div key={i}>
                        toast("Your food {a.food} is ")
                    </div>
                )

            }
        </div>

    </>

);

