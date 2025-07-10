export interface StationList {
    stations?: Array<StationIdentifiers>
}

export interface StationIdentifiers {
    crs? : string,
    name?: string
}

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

export interface APIError {
    error: string,
    error_description?: string
}

export interface DepartureList {
    trainServices: Array<DepartureDetails>
}

export interface DepartureDetails {
    rid: string,
    std: string,
    status: DepartureStatus,
    platform?: string,
    destination: Array<{
        name: string,
        crs: string
    }>
}

export enum DepartureStatus {
    "OnTime",
    "Delayed",
    "Cancelled",
    "PartiallyCancelled",
    "PartiallyCancelledAndDelayed"
}