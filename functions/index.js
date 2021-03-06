// https://stackoverflow.com/questions/64096100/firebase-functions-integration-with-xero-node

const functions = require("firebase-functions");
const xeroNode = require("xero-node");
const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const xeroClientId = functions.config().xero.client_id;
const xeroClientSecret = functions.config().xero.client_secret;
const xeroRedirectUri = functions.config().xero.redirect_uri;
const appUrl = functions.config().app.url;
let currentUserUid = null;

const xero = new xeroNode.XeroClient({
    clientId: xeroClientId,
    clientSecret: xeroClientSecret,
    redirectUris: [xeroRedirectUri],
    scopes: ['openid', 'profile', 'email', 'accounting.transactions', 'accounting.contacts', 'offline_access'],
    httpTimeout: 3000,
});

const connect = () =>
    new Promise(async (res, rej) => {
        const userRef = db.collection("users").doc(currentUserUid);
        const userDoc = await userRef.get();
        try {
            xero.initialize();
            const newTokenSet = await xero.refreshWithRefreshToken(xeroClientId, xeroClientSecret, userDoc.data().xeroRefreshToken);
            userRef.update({ xeroRefreshToken: newTokenSet.refresh_token });
            xero.setTokenSet(newTokenSet);
            res();
        } catch (error) {
            rej(error);
        }
    });

app.get('/connect', async (req, res) => {
    try {
        currentUserUid = req.query.uid;
        console.log('connect currentUserUid=', currentUserUid);
        await connect();
        console.log('Redirecting to ', appUrl);
        res.redirect(appUrl);
    } catch (error) {
        console.log("buildConsentUrl()");
        const consentUrl = await xero.buildConsentUrl();
        console.log('xeroRedirectUri=', xeroRedirectUri);
        console.log('consentUrl=', consentUrl);
        res.redirect(consentUrl);
    }
});
app.get('/AuthorizationCallback', async (req, res) => {
    console.log('AuthorizationCallback: ', currentUserUid);
    const TokenSet = await xero.apiCallback(req.url);
    db.collection("users").doc(currentUserUid).update({ xeroRefreshToken: TokenSet.refresh_token });
    res.redirect(appUrl);
});
exports.xeroInit = functions.region('australia-southeast1').https.onRequest(app);

exports.xeroOrganisation = functions.region('australia-southeast1').https.onCall(async (data, context) => {
    currentUserUid = context.auth.uid;
    await connect(); // Doesn't handle errors and will break if inactive for 60 days but you get the idea
    await xero.updateTenants();
    return xero.tenants[0];
});

exports.xeroContacts = functions.region('australia-southeast1').https.onCall(async (data, context) => {
    currentUserUid = context.auth.uid;
    await connect(); // Doesn't handle errors and will break if inactive for 60 days but you get the idea
    await xero.updateTenants();
    let xeroContacts = [];
    let contacts = [];
    let pageNumber = 0;
    do {
        pageNumber++;
        xeroContacts = await xero.accountingApi
            .getContacts(xero.tenants[0].tenantId, data?.modifiedAfter ? new Date(data.modifiedAfter) : null, undefined, 'name', undefined, pageNumber, false, true);

        console.log('Page number: ', pageNumber);
        console.log('Got contacts from Xero: ', xeroContacts.body.contacts.length);
        contacts = contacts.concat(xeroContacts.body.contacts.map((contact) => {
            return {
                contactID: contact.contactID,
                name: contact.name,
            };
        }));
    } while (xeroContacts.body.contacts.length);
    console.log('Returning contacts: ', contacts.length);
    return contacts;
});

exports.xeroCreateInvoices = functions.region('australia-southeast1').https.onCall(async (data, context) => {
    currentUserUid = context.auth.uid;
    await connect(); // Doesn't handle errors and will break if inactive for 60 days but you get the idea
    await xero.updateTenants();
    const response = await xero.accountingApi.createInvoices(xero.tenants[0].tenantId, data);
    return response.body.invoices;
});
