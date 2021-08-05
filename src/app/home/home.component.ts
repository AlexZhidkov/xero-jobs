import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Contact {
  contactID: string;
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toLoad: number = 0;
  doesTokenExist: boolean = false;
  uid: string | undefined;
  organisationName: string;
  tenantId: string;

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.toLoad++;
    this.auth.user.subscribe(user => {
      this.toLoad--;
      this.uid = user?.uid;
      if (this.uid) {
        this.toLoad++;
        this.afs.collection('users').doc(this.uid).get().subscribe(u => {
          this.toLoad--;
          const user = <any>u.data();
          this.doesTokenExist = <boolean>user?.xeroRefreshToken;
          if (this.doesTokenExist) {
            if (!(user.organisationName && user.tenantId)) {
              this.syncXero();
            } else {
              this.organisationName = user.organisationName;
              this.tenantId = user.tenantId;
            }
          }
        })
      }
    })
  }

  connectToXero() {
  }

  disconnectFromXero() {
    this.organisationName = '';
    this.tenantId = '';
    this.afs.collection(`users`).doc(this.uid).update({ xeroRefreshToken: null });
  }

  syncXero() {
    this.toLoad++;
    const getOrganisation = this.fns.httpsCallable('xeroOrganisation');
    getOrganisation(null).subscribe(r => {
      this.toLoad--;
      this.organisationName = r.tenantName;
      this.tenantId = r.tenantId;
      this.afs.collection(`users`).doc(this.uid).update({ organisationName: this.organisationName, tenantId: this.tenantId })
      this.syncContacts();
    },
      (err) => {
        this.toLoad--;
        console.log(err);
      });
  }

  syncContacts(): void {
    this.toLoad++;
    console.log("syncContacts");
    const currentTime = new Date();
    var tenant = {
      contacts: <Contact[]>[],
      contactsUpdatedOn: <firebase.default.firestore.Timestamp | Date | null>null
    };

    this.afs.collection(`tenants`).doc(this.tenantId).get().subscribe(t => {
      if (t.exists) {
        tenant = <any>t.data();
        tenant.contactsUpdatedOn = (<firebase.default.firestore.Timestamp>tenant.contactsUpdatedOn).toDate();
      }

      const getContacts = this.fns.httpsCallable('xeroContacts');
      var data = {
        modifiedAfter: tenant.contactsUpdatedOn
      };

      getContacts(data).subscribe((updatedContacts: Contact[]) => {
        if (updatedContacts.length) {
          this.snackBar.open(`${updatedContacts.length} contacts updated`, 'hide', {
            duration: 5000
          });
          debugger;

          if (tenant.contacts?.length) {
            const oldNotModifiedContacts = tenant.contacts.filter(c => updatedContacts.findIndex(up => up.contactID === c.contactID) === -1);
            const combinedContacts = oldNotModifiedContacts.concat(updatedContacts);
            combinedContacts.sort(function (a, b) {
              let x = a.name.toLowerCase();
              let y = b.name.toLowerCase();
              if (x < y) { return -1; }
              if (x > y) { return 1; }
              return 0;
            });

            this.afs.collection(`tenants`).doc(this.tenantId).set({ name: this.organisationName, user: this.uid, contacts: combinedContacts, contactsUpdatedOn: currentTime })
              .finally(() => this.toLoad--);
          } else {
            this.afs.collection(`tenants`).doc(this.tenantId).set({ name: this.organisationName, user: this.uid, contacts: updatedContacts, contactsUpdatedOn: currentTime })
              .finally(() => this.toLoad--);
          }
        } else {
          this.snackBar.open(`No updated contacts in Xero`, 'hide', {
            duration: 5000
          });

          this.afs.collection(`tenants`).doc(this.tenantId).update({ name: this.organisationName, user: this.uid, contactsUpdatedOn: currentTime })
            .finally(() => this.toLoad--);
        }
      })
    });
  }
}