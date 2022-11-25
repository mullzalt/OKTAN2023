import express, { Application } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import compression from 'compression'
import helmet from 'helmet'


import corsOptions from './configs/corsOptions'

class App {
    public app: Application

    constructor() {
        this.app = express()
        this.plugins()
        this.routes()
    }

    protected plugins(): void {
        this.app.use(cors(corsOptions))
        this.app.use(cookieParser())
        this.app.use(compression())
        this.app.use(helmet())
    }

    protected routes(): void {
        this.app.use('/public', express.static(path.join(__dirname, '../public')))
    }



}

export default App