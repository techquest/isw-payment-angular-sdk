# NG INTERSWITCH


[![Issues](	https://img.shields.io/github/issues/techquest/isw-react-sdk)](https://github.com/techquest/isw-angular-sdk/issues)
[![Forks](	https://img.shields.io/github/forks/techquest/isw-react-sdk)](https://github.com/techquest/isw-angular-sdk/network/members)
[![Stars](	https://img.shields.io/github/stars/techquest/isw-laravel-sdk)](https://github.com/techquest/isw-angular-sdk/stargazers)

> Interswitch's official angular package to easily integrate to Quickteller Business to recieve payments.

## INSTALLATION

Firstly, you need to create a [**Quickteller Business**](https://business.quickteller.com) account.  
npm and angular2+ are required

To install the latest version of ng-interswitch, simply run the command:

```sh
npm install --save @interswitchapi/ng-interswitch
```

## USAGE

### 1. Import the module
Import the module in your `app.module.ts` or any module in which the component is needed like so:

```ts
...
import { NgInterswitchModule } from '@interswitchapi/ng-interswitch';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgInterswitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. Implement in your project
The **ng-interswitch** component is used. There are two ways to configure the component.
#### 1 . You can use the component properties directly like so:
```html
<ng-interswitch
  [merchantCode]="'XXXXXXX'"
  [payItemID]="'XXXXXXXXXXXXXXXXXXXXX'"
  [amount]="'10000'"
  [transactionReference]= "'jdfsd988s89'"
  [customerEmail]="'johndoe@gmail.com'"
  [customerName]="'John Doe'"
  (paymentCallback)="paymentCallback($event)"
  [class]="'btn btn-danger'"
>Make Payment</ng-interswitch>
```

#### 2. You can also use the paymentOptions property like so:
```html
<ng-interswitch
  [paymentOptions]="paymentOptions"
  (paymentCallback)="paymentCallback($event)"
  [class]="'btn btn-danger'"
>Make Payment</ng-interswitch>
```

You can hence define **paymentOptions** in your ts file like so:
```ts
  paymentOptions = {
    merchantCode: 'XXXXXXXXX',
    payItemID: 'XXXXXXXXXXXXXXXXXXXXX',
    amount: '10000',
    transactionReference: Date.now().toString(),
    customerEmail: 'johndoe@gmail.com',
    customerName: 'John Doe'
  }
```

**Note:**
 - **merchantCode** and **payItemID** can be gotten on your [Quickteller Business dashboard](https://business.quickteller.com/developertools)
 - **amount** must be in kobo

The event **paymentCallback** is raised after a transaction is completed. You can get the result of a transaction from the event handler assigned to it. A sample event handler will be like so:
```ts
  paymentCallback(data){
    console.log('data: ', data);
  }
```

## Parameters
Below is a list of all the supported parameters.

| Parameters           | Data Type | Required | Description                                                                                                 |
|----------------------|-----------|----------|-------------------------------------------------------------------------------------------------------------|
| merchantCode         | string    | true     | This can be found on your dashboard.                                                                        |
| payItemID            | string    | true     | This can be found on your dashboard.                                                                        |
| customerEmail        | string    | true     | The email of the person making the payment.                                                                 |
| amount               | string    | true     | The cost of the item being paid for in kobo.                                                                |
| transactionReference | string    | true     | This is a unique reference string required for every transaction. You can create a method to generate this. |
| paymentMode          | string    | true     | This represents your integration mode. It can be ‘TEST’ or ‘LIVE’.                                          |
| siteRedirectURL      | string    | false    | The url you want the user to be redirected to after a transaction.                                          |
| currency             | string    | false    | The ISO code of the currency being used. If this field is not added, the currency naira is assumed.         |
| customerName         | string    | false    | The name of the person making the payment.                                                                  |
| customerID           | string    | false    | The ID of the person making the payment.                                                                    |
| payItemName          | string    | false    | The name of the item being paid for.                                                                        |                                                                                    |


After a transaction, a sample response from the callback function will be like so:
```js
{
    amount: 10000,
    apprAmt: 10000,
    cardNum: "",
    desc: "Approved by Financial Institution",
    mac: "",
    payRef: "FBN|WEB|MX26070|13-04-2021|3512130|866194",
    resp: "00",
    retRef: "000106923853",
    txnref: "1618305656700",
    url: "http://localhost:3000",
}
```
**NOTE:**
The key 'resp' gives the final status of the transaction.  
There are quite a number of response codes that can be returned, the full list can be viewed [here](https://sandbox.interswitchng.com/docbase/docs/webpay/response-codes/)

## - Handling the Response 
For integrity purpose, you are advised to make a server side request to get the final status of a transaction before giving value.
To do this, make a post request to the endpoint below:
##### Test mode: #####
https://qa.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode={MERCHANT_CODE}&transactionreference={TRANSACTION_REFERENCE}&amount={AMOUNT_IN_KOBO}
##### Live mode: #####
https://webpay.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode={MERCHANT_CODE}&transactionreference={TRANSACTION_REFERENCE}&amount={AMOUNT_IN_KOBO}
## TEST CARDS

| Type  |   Card Number |   Expiry Date |   Pin |   CVV |   OTP |
--------|---------------|---------------|-------|-------|-------|
| Verve  |   5060990580000217499 |   03/50 |   1111 |   111 |   123456 |
| Visa  |   4000000000000002 |   03/50 |   1234 |   111 |    |


 ## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
