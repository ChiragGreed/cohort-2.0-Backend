import express from 'express'
import { config } from 'dotenv'
import { passport } from passport
config();

const app = express();

app.get('/auth/google', (req, res) => {
    passport.authenticate('google', { scope: ['profile','email'] })
})

app.get('/auth/google/callback', (req, res) => {
    passport.authenticate('google', { session: false, fallbackurl: '/' })

})

export default app;