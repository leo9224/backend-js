export class Contact {
    id: number
    last_name: string
    first_name: string
    email: string
    title_id: number

    constructor(id: number, last_name: string, first_name: string, email: string, title_id: number) {
        this.id = id
        this.last_name = last_name
        this.first_name = first_name
        this.email = email
        this.title_id = title_id
    }
}