export declare class BookingController {
    ticketstatus(seatno: string): Promise<string>;
    bookticket(name: string, gender: string, age: string, seatno: string): Promise<string>;
    details(seatno: string): Promise<any>;
    reset(): Promise<string>;
    open(): Promise<any>;
    close(): Promise<any>;
}
