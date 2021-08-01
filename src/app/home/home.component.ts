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
  isLoading: boolean = true;
  uid: string | undefined;
  organisationName: string;
  tenantId: string;

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.uid = user?.uid;
      this.getXeroOrganisation();
    })
  }

  connectToXero() {
  }

  disconnectFromXero() {
    this.organisationName = '';
    this.tenantId = '';
    this.afs.collection(`users`).doc(this.uid).update({ xeroRefreshToken: null });
  }

  getXeroOrganisation() {
    const getOrganisation = this.fns.httpsCallable('xeroOrganisation');
    getOrganisation(null).subscribe(r => {
      this.isLoading = false;
      this.organisationName = r.tenantName;
      this.tenantId = r.tenantId;
    },
      (err) => {
        this.isLoading = false;
        console.log(err);
      });
  }

  syncContacts(): void {
    console.log("syncContacts");
    const getContacts = this.fns.httpsCallable('xeroContacts');
    getContacts(null).subscribe(r => {
      this.afs.collection(`tenants`).doc(this.tenantId).update({ name: this.organisationName, contacts: r });
      console.log('Contacts Updated');
    });
  }
}
