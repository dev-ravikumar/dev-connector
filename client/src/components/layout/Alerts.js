import React from 'react';
import { useSelector } from 'react-redux';

const Alerts = () => {
    const alerts = useSelector(state => state.alert);
    return (
        <div>
           {alerts.map(alert =>(
           <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
           
        ))}
        </div>
    )

    }
export default Alerts;
