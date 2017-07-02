export class RequestHolidayDto {
    constructor(
        public user_id: string,
        public start_date: string,
        public end_date: string,
        public return_date: string,
        public description: string,
        public type: string,
    ) {}
}