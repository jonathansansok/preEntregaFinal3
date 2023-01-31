const config = require('config');


export default class PersistenceFactory {
    static getPersistence = async () => {
        switch (config.app.persistence) {
            case "ARRAY":
                let { default: UsersDaoArray } = await import('./userDaoArray.js')
                // let UsersDaoArray = await import('./userDaoArray.js')
                return new UsersDaoArray()
            case "FILE":
                let { default: UserDaoFile } = await import('./userDaoFile.js')
                return new UserDaoFile()
            // case "DB":
            //     let { default: UsersDaoDB } = await import('./userDaoDB.js')
            //     return new UsersDaoDB()
        }
    }
}