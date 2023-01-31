const dirName = require('path').dirname;

const fs = require('fs');

export default class UserDaoFile {
    constructor() {
        this.path = dirName + '/files/users.json'
        this.#init()
    }

    #init = async () => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]))
    }

    #readFile = async() => {
        let data = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(data)
    }

    getAll = async() => {
        return await this.#readFile()
    }

    save = async(user) => {
        try {
            let users = await this.#readFile()
            if (users.length===0) user.id = 1
            else user.id = users[users.length-1].id+1
            users.push(user)
            await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2))
            return user
        } catch (err) {
            console.log('No se puede leer el archivo')
        }
    }
}