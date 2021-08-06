import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LineItemDialogComponent } from '../line-item-dialog/line-item-dialog.component';

export interface LineItem {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  toLoad: number = 0;
  contacts: any[] = [];
  faultReported: string;
  findings: string;
  amount: number;
  customerControl = new FormControl();
  filteredContacts: Observable<any[]>;
  invoice: any;
  lineItem: any;

  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
    private auth: AngularFireAuth,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.invoice = {
      invoiceType: 'ACCREC',
      lineItems: [
        { description: 'One' },
        { description: 'Two' },
      ]

    }
    this.toLoad++;
    this.auth.user.subscribe(user => {
      this.afs.collection('users').doc(user?.uid).get().subscribe(u => {
        const user = <any>u.data();
        this.afs.collection(`tenants`).doc(user.tenantId).get().subscribe(r => {
          this.toLoad--;
          const doc = <any>r.data()
          this.contacts = doc.contacts;
        });
      })
    })

    this.filteredContacts = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.contacts.slice())
    );
  }

  openDialog(item: any): void {
    const dialogRef = this.dialog.open(LineItemDialogComponent, {
      width: '95vw',
      maxWidth: '95vw',
      maxHeight: '100vh',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.lineItem = result;
    });
  }

  deleteLineItem(item: any): void {
    console.log('deleteLineItem');
  }

  createInvoice(): void {
    const createInvoices = this.fns.httpsCallable('xeroCreateInvoices');
    this.invoice.contact = {
      contactID: this.customerControl.value.contactID
    };

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
