import * as express from 'express';
import { Request, Response } from 'express';
import * as session from 'express-session';
import * as functions from "firebase-functions";
import jwtDecode from 'jwt-decode';
import { TokenSet } from 'openid-client';
import { XeroAccessToken, XeroClient, XeroIdToken } from 'xero-node';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

declare module 'express-session' {
    export interface SessionData {
        decodedIdToken: XeroIdToken;
        decodedAccessToken: XeroAccessToken;
        tokenSet: TokenSet;
        allTenants: any[];
        activeTenant: any;
    }
}

const client_id: string = 'xxx'; // process.env.CLIENT_ID;
const client_secret: string = 'xxx'; // process.env.CLIENT_SECRET;
const redirectUrl: string = 'http://localhost:5001/xero-jobs/us-central1/app/AuthorizationCallback'; // process.env.REDIRECT_URI;
const scopes: string = 'openid profile email accounting.settings accounting.reports.read accounting.journals.read accounting.contacts accounting.attachments accounting.transactions offline_access';

const xero = new XeroClient({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUris: [redirectUrl],
    scopes: scopes.split(' '),
});

if (!client_id || !client_secret || !redirectUrl) {
    throw Error('Environment Variables not all set - please check your .env file in the project root or create one!')
}

const app: express.Application = express();

exports.app = functions.https.onRequest(app)

app.use(express.static(__dirname + '/build'));

app.use(session({
    secret: 'something crazy',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

const authenticationData: any = (req: Request, res: Response) => {
    return {
        decodedIdToken: req.session.decodedIdToken,
        decodedAccessToken: req.session.decodedAccessToken,
        tokenSet: req.session.tokenSet,
        allTenants: req.session.allTenants,
        activeTenant: req.session.activeTenant,
    };
};

app.get('/', (req: Request, res: Response) => {
    res.send(`<a href='/connect'>Connect to Xero</a>`);
});

app.get('/connect', async (req: Request, res: Response) => {
    try {
        const consentUrl: string = await xero.buildConsentUrl();
        res.redirect(consentUrl);
    } catch (err) {
        res.send('Sorry, something went wrong');
    }
});

app.get('/AuthorizationCallback', async (req: Request, res: Response) => {
    try {
        const tokenSet: TokenSet = await xero.apiCallback(req.url);
        await xero.updateTenants();

        const decodedIdToken: XeroIdToken = jwtDecode(<string>tokenSet.id_token);
        const decodedAccessToken: XeroAccessToken = jwtDecode(<string>tokenSet.access_token);

        req.session.decodedIdToken = decodedIdToken;
        req.session.decodedAccessToken = decodedAccessToken;
        req.session.tokenSet = tokenSet;
        req.session.allTenants = xero.tenants;
        // XeroClient is sorting tenants behind the scenes so that most recent / active connection is at index 0
        req.session.activeTenant = xero.tenants[0];

        const authData: any = authenticationData(req, res);

        console.log(authData);

        res.redirect('/xero-jobs/us-central1/app/contacts');
    } catch (err) {
        res.send('Sorry, something went wrong');
    }
});

app.get('/organisation', async (req: Request, res: Response) => {
    try {
        const tokenSet: TokenSet = await xero.readTokenSet();
        console.log(tokenSet.expired() ? 'expired' : 'valid');
        const response: any = await xero.accountingApi.getOrganisations(req.session.activeTenant.tenantId);
        res.send(`Hello, ${response.body.organisations[0].name}`);
    } catch (err) {
        res.send('Sorry, something went wrong');
    }
});


app.get('/contacts', async (req: Request, res: Response) => {
    try {
        const tokenSet: TokenSet = await xero.readTokenSet();
        console.log(tokenSet.expired() ? 'expired' : 'valid');
        const response: any = await xero.accountingApi
            .getContacts(req.session.activeTenant.tenantId, undefined, undefined, 'name', undefined, undefined, false, true);
        res.send(JSON.stringify(response.body.contacts));
    } catch (err) {
        res.send('Sorry, something went wrong');
    }
});
