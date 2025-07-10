export interface StationDetails {
    location: {
        addressLines: string,
        postCode: string
    },
    facilities: {
        fares?: {
            ticketOffice?: {
                openingTimes?: string
            }
        }
    }
}

