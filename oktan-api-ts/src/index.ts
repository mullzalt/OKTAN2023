import App from "./App";

import { PORT } from './configs'

const app = new App().app

app.listen(PORT, () => {
    console.log('App is running on port: ' + PORT)
})