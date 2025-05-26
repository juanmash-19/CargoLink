export interface MessageDAO{
    message: string,
}

export interface GeneralStatsDAO {
    totals: {
        users: number;
        shipments: number;
        reports: number;
    };
    monthly: {
        labels: string[];
        users: number[];
        shipments: number[];
        reports: number[];
    };
}

