import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

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
    const getContacts = this.fns.httpsCallable('xeroContacts');
    getContacts(null).subscribe(r => {
      this.afs.collection(`tenants`).doc(this.tenantId).set({ name: this.organisationName, user: this.uid, contacts: r })
        .finally(() => this.toLoad--);
    });
  }
}
