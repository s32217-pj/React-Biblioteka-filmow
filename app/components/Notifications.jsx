'use client';

import { useEffect } from "react";
import { useFilmDispatch, useFilmState } from "../context/FilmContext";

export default function Notifications() {

    const state = useFilmState();
    const dispatch = useFilmDispatch();

    useEffect(() => {

        if (state.notifications.length === 0) return;

        const timers = state.notifications.map(notification => {

            return setTimeout(() => {
                dispatch({
                    type: 'DISMISS_NOTIFICATION',
                    payload: notification.id
                });
            }, 3000);

        });

        return () => {
            timers.forEach(clearTimeout);
        };

    }, [state.notifications, dispatch]);

    if (state.notifications.length === 0) return null;

    return (
        <div className="position-fixed top-0 end-0 p-3 w-25 z-3">

            {state.notifications.map(n => {

                let bg = 'bg-info';

                if (n.type === 'success') bg = 'bg-success';
                else if (n.type === 'error') bg = 'bg-danger';
                else if (n.type === 'info') bg = 'bg-primary';

                return (
                    <div
                        key={n.id}
                        className={`text-white p-3 mb-2 rounded shadow ${bg}`}
                    >
                        <div className="d-flex justify-content-between align-items-center">

                            <span>{n.message}</span>

                            <button
                                onClick={() =>
                                    dispatch({
                                        type: 'DISMISS_NOTIFICATION',
                                        payload: n.id
                                    })
                                }
                                className="btn btn-sm btn-light ms-2"
                            >
                                ×
                            </button>

                        </div>
                    </div>
                );
            })}

        </div>
    );
}