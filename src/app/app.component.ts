import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-interswitch';

  paymentOptions = {
    merchantCode: 'MX26070',
    payItemID: 'Default_Payable_MX26070',
    amount: '10000',
    paymentMode: 'TEST',
    customerEmail: 'johndoe@nomail.com',
    customerName: 'John Doe',
    paymentReference: Date.now().toString()
  }
  paymentCallback(data){
    console.log('data: ', data);
  }
}
