export interface StationListStruct {
    stations?: StationIdentifiers[]
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
    trainServices: DepartureDetails[]
}

export interface DepartureDetails {
    rid: string,
    std: string,
    status: DepartureStatus,
    platform?: string,
    destination: {
        name: string,
        crs: string
    }[]
}

export enum DepartureStatus {
    "OnTime",
    "Delayed",
    "Cancelled",
    "PartiallyCancelled",
    "PartiallyCancelledAndDelayed"
}

export interface Journeys {
    outboundJourneys: 
}

export interface Journey {
    departureTime: string,
    arrivalTime: string,
    status: JourneyStatus,
    legs: 
}

export enum JourneyStatus {
    "normal",
    "delayed",
    "cancelled",
    "fully_reserved"
}

export interface TripLeg {
    type: string,
    legId: string,
    mode: string,
    origin: StationObj
}

export interface StationObj {
    displayName: string
    crs?: string
}