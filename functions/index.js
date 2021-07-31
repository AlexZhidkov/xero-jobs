// https://stackoverflow.com/questions/64096100/firebase-functions-integration-with-xero-node

const functions = require("firebase-functions");
const xeroNode = require("xero-node");
const express = require("express");
const cors = require('cors');
const app = express()
app.use(cors())

const admin = require("firebase-admin")
admin.initializeApp();
const db = admin.firestore();

let xero_client_id = functions.config().xero.client_id;
let xero_client_secret = functions.config().xero.client_secret;
let xero_redirect_url = functions.config().xero.redirect_url;
let app_url = functions.config().app.url;
let currentUserUid = null;

const xero = new xeroNode.XeroClient({
    clientId: xero_client_id,
    clientSecret: xero_client_secret,
    redirectUris: [xero_redirect_url],
    scopes: ['openid', 'profile', 'email', 'accounting.transactions', 'accounting.settings', 'offline_access'],
    httpTimeout: 3000,
    state: 123
})

const connect = () =>
    new Promise(async (res, rej) => {
        var userRef = db.collection("users").doc(currentUserUid);
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
        currentUserUid = req.query.uid;
        await connect();
        res.redirect(app_url);
    } catch (error) {
        let consentUrl = await xero.buildConsentUrl()
        res.redirect(consentUrl)
    }
})
app.get('/AuthorizationCallback', async (req, res) => {
    let TokenSet = await xero.apiCallback(req.url);
    console.log('AuthorizationCallback: ', currentUserUid);
    db.collection("users").doc(currentUserUid).update({ xeroRefreshToken: TokenSet.refresh_token });
    res.redirect(app_url);
})
exports.xeroInit = functions.region('australia-southeast1').https.onRequest(app)

exports.xeroOrganisation = functions.region('australia-southeast1').https.onCall(async (data, context) => {
    currentUserUid = context.auth.uid;
    await connect() //Doesn't handle errors and will break if inactive for 60 days but you get the idea
    await xero.updateTenants()
    return xero.tenants[0]
})

exports.xeroContacts = functions.region('australia-southeast1').https.onCall(async (data, context) => {
    currentUserUid = context.auth.uid;
    await connect(); //Doesn't handle errors and will break if inactive for 60 days but you get the idea
    await xero.updateTenants();
    const response = await xero.accountingApi
        .getContacts(xero.tenants[0].tenantId, undefined, undefined, 'name', undefined, undefined, false, true);
    return response.body.contacts;
})