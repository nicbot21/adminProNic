export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string, //interrogacion es como valor opcional
        public role?: string,
        public google?: boolean,
        public _id?: string
    ){}
}
