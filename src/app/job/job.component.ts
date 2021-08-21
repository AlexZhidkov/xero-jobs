import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  toLoad: number = 0;
  jobId: string;
  contacts: any[] = [];
  jobDoc: AngularFirestoreDocument<any>;
  job: any;
  faultReported: string;
  findings: string;
  amount: number;
  customerControl = new FormControl();
  filteredContacts: Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
    private auth: AngularFireAuth,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.toLoad++;
    const jobId = this.route.snapshot.paramMap.get('jobId');

    this.auth.user.subscribe(user => {
      this.afs.collection('users').doc(user?.uid).get().subscribe(u => {
        const user = <any>u.data();
        this.afs.collection(`tenants`).doc(user.tenantId).get().subscribe(r => {
          this.toLoad--;
          const doc = <any>r.data()
          this.contacts = doc.contacts;
          if (jobId) {
            this.jobId = jobId;
          } else {
            this.jobId = this.afs.createId();
            this.afs.collection(`/tenants/${user.tenantId}/jobs`)
              .doc(this.jobId)
              .set({});
          }
          this.jobDoc = this.afs.doc<any>(`tenants/${user.tenantId}/jobs/${this.jobId}`);
          this.jobDoc.valueChanges().subscribe(j => {
            this.job = j;
            if (!this.job.unit) {
              this.job.unit = {};
            }
            this.customerControl.setValue(this.job.customer);
          });
        });
      })
    })

    this.filteredContacts = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.contacts.slice())
    );
  }

  customerSelected(customer: any): void {
    this.jobDoc.update({ customer });
  }

  updateUnit(field: any): void {
    this.jobDoc.update({ unit: { ...this.job.unit, ...field } });
  }

  createInvoice(): void {
    console.log("createInvoice");
    const createInvoices = this.fns.httpsCallable('xeroCreateInvoices');
    const data = {
      invoices: [
        {
          type: "ACCREC",
          contact: {
            contactID: this.customerControl.value.contactID
          },
          lineItems: [
            {
              description: `Fault Reported: ${this.faultReported}. Findings: ${this.findings}.`,
              lineAmount: this.amount
            }
          ],
        }
      ]
    };
    createInvoices(data).subscribe(r => {
      console.log(r);
    });
  }

  displayFn(contact: any): string {
    return contact && contact.name ? contact.name : '';
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.contacts.filter(contact => contact.name.toLowerCase().includes(filterValue));
  }

}
