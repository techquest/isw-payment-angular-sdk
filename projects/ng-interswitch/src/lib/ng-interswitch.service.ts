import { Injectable } from '@angular/core';
import { IPaymentRequest } from './IPaymentRequest';
interface _Window extends Window {
  webpayCheckout: (paymentRequest: IPaymentRequest) => void;

}
declare var window: _Window;

@Injectable({
  providedIn: 'root'
})
export class NgInterswitchService {

  constructor() { }

  async loadAPI(mode: string): Promise<void>{
    let endpoint: string;
    return new Promise(resolve => {
      const script = window.document.createElement('script');
      window.document.head.appendChild(script);
      const onLoadFunc = () => {
        script.removeEventListener('load', onLoadFunc);
        resolve();
      };
      script.addEventListener('load', onLoadFunc);
      if(mode === 'live'){
        endpoint = 'https://newwebpay.interswitchng.com/inline-checkout.js'
      }else{
        endpoint = 'https://webpay-ui.k8.isw.la/inline-checkout.js'
      }
      script.setAttribute('src', endpoint);
    });
  }
}
