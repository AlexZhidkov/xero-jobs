import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LinkMenuItem } from 'ngx-auth-firebaseui';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: firebase.default.User | null = null;
  showSignInButton: boolean = false;
  avatarLinks: LinkMenuItem[] = [
    { icon: 'link', text: 'Connect to Xero', callback: () => { this.connectToXero(); } },
    { icon: 'link_off', text: 'Disconnect from Xero', callback: () => { this.disconnectFromXero(); } },
    { icon: 'account_circle', text: 'Profile', callback: () => { this.router.navigate(['profile']); } },
  ];

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.user = user;
      this.showSignInButton = Boolean(!user);
    });
  }

  connectToXero(): void {
    window.location.href = `https://australia-southeast1-xero-jobs.cloudfunctions.net/xeroInit/connect?uid=${this.user?.uid}`;
  }

  disconnectFromXero() {
    this.afs.collection(`users`).doc(this.user?.uid).update({ xeroRefreshToken: null })
      .then(() => this.router.navigate(['/'])
        .then(() => location.reload()));
  }

  onSignOut(): void {
    this.router.navigate(['/']).then(() => location.reload());
  }
}
