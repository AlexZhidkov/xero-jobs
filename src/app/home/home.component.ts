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
  uid: string | undefined;

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.uid = user?.uid;
    })
  }

  connectToXero() {
  }

  getXeroOrganisation() {
    const getOrganisation = this.fns.httpsCallable('xeroOrganisation');
    getOrganisation(null).subscribe(r => { console.log(r); });
  }

  syncContacts(): void {
    console.log("syncContacts");
    const getContacts = this.fns.httpsCallable('xeroContacts');
    getContacts(null).subscribe(r => {
      this.afs.collection(`tenants`).doc('test').update({ contacts: r });
      console.log('Contacts Updated');
    });
  }
}
