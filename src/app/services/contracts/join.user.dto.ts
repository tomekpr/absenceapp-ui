export class JoinUserDto {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public company_token: string,
    ) {}
}