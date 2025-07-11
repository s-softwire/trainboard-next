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
    outboundJourneys: Journey[]
}

export interface Journey {
    departureTime: string,
    arrivalTime: string,
    status: JourneyStatus,
    legs: JourneyLeg[],
    tickets: TicketObj[],
    journeyDurationInMinutes: number
}

export enum JourneyStatus {
    "normal",
    "delayed",
    "cancelled",
    "fully_reserved"
}

export interface JourneyLeg {
    type: string,
    legId: string,
    mode: string,
    origin: StationObj,
    destination: StationObj,
    durationInMinutes: number,
    departureDateTime?: string,
    arrivalDateTime?: string
}

export interface StationObj {
    displayName: string
    crs?: string
}

export interface TicketObj {
    name: string,
    description: string,
    priceInPennies: number,
    ticketType: string,
    ticketClass: string,
    ticketCategory: string,
    numberOfTickets: number
}