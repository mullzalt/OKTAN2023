import App from "./App";
import 'dotenv/config'

import { PORT } from './configs'

const app = new App().app

app.listen(PORT, () => {
    console.log('App is running on port: ' + PORT)
})