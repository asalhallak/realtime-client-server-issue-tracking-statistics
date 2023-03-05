import React, {useState} from "react";
import {StatsMessage} from "../model/Stats";
import socket from "../socket";

const STATS_EVENT = 'stats';
export default function useStats() {
    const [stats, setStats] = useState<StatsMessage>()

    React.useEffect(() => {
        socket.on(STATS_EVENT, (stats: any) => {
            setStats(stats)
        });

        return () => {
            socket.off('stats');
        };
    }, []);

    return stats

}
