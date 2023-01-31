export default class UserDTO {
    constructor(user) {
        this.id = user.id
        this.email = `${user.email} `
        this.password = `${user.password}`
    }
}