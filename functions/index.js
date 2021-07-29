// https://stackoverflow.com/questions/64096100/firebase-functions-integration-with-xero-node

const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors');
const xeroNode = require("xero-node");

const firebase = require("firebase");
firebase.initializeApp({
    apiKey: 'AIzaSyC0sgfmCFsHZXQCdJXWdg4hYiWX5C9D-lQ',
    authDomain: 'xero-jobs.firebaseapp.com',
    projectId: 'xero-jobs',
});
const db = firebase.firestore();

const app = express()
app.use(cors())

let xero_client_id = functions.config().xero.client_id
let xero_client_secret = functions.config().xero.client_secret

const xero = new xeroNode.XeroClient({
    clientId: xero_client_id,
    clientSecret: xero_client_secret,
    redirectUris: ['http://localhost:5001/xero-jobs/us-central1/xeroInit/AuthorizationCallback'],
    scopes: ['openid', 'profile', 'email', 'accounting.transactions', 'accounting.settings', 'offline_access'],
    httpTimeout: 3000,
    state: 123
})

const connect = () =>
    new Promise(async (res, rej) => {
        var userRef = db.collection("users").doc("u5WxI8lzDlRZR1OQd13ehjQ12oK2");
        var userDoc = await userRef.get();
        try {
            xero.initialize()
            const newTokenSet = await xero.refreshWithRefreshToken(xero_client_id, xero_client_secret, userDoc.data().xeroRefreshToken)
            userRef.update({ xeroRefreshToken: newTokenSet.refresh_token });
            xero.setTokenSet(newTokenSet)
            res()
        } catch (error) {
            rej(error)
        }
    })

app.get('/connect', async (req, res) => {
    try {
        await connect()
        res.send('Connection established')
    } catch (error) {
        let consentUrl = await xero.buildConsentUrl()
        res.redirect(consentUrl)
    }
})
app.get('/AuthorizationCallback', async (req, res) => {
    let TokenSet = await xero.apiCallback(req.url);
    db.collection("users").doc("u5WxI8lzDlRZR1OQd13ehjQ12oK2").update({ xeroRefreshToken: TokenSet.refresh_token });
    res.send('Token updated')
})
exports.xeroInit = functions.https.onRequest(app)

exports.xeroOrganisation = functions.https.onRequest(async (req, res) => {
    await connect() //Doesn't handle errors and will break if inactive for 60 days but you get the idea
    await xero.updateTenants()
    res.json(xero.tenants[0])
})