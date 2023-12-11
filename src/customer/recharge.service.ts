import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import {
  Observable,
  catchError,
  firstValueFrom,
  lastValueFrom,
  map,
} from 'rxjs';

@Injectable()
export class RechargeService {
  constructor(private readonly httpService: HttpService) {}
  headers = {
    'X-Recharge-Version': '2021-11',
    'X-Recharge-Access-Token': process.env.X_RECHARGE_ACCESS_TOKEN,
  };
  // async findCustomerByEmail(email: string) {
  //   const { data } = await firstValueFrom(
  //     this.httpService
  //       .get<any>(
  //         `https://api.rechargeapps.com/customers?email=${email}&limit=1`,
  //         {
  //           headers: this.headers,
  //         },
  //       )
  //       .pipe(
  //         catchError((error: AxiosError) => {
  //           throw 'An error happened!';
  //         }),
  //       ),
  //   );
  //   return data;
  // }

  // async findActiveSubscriptionByCustomerId(customer_id) {
  //   const { data } = await firstValueFrom(
  //     this.httpService
  //       .get<any>(
  //         `https://api.rechargeapps.com/subscriptions?customer_id=${customer_id}&limit=100&status=active`,
  //         { headers: this.headers },
  //       )
  //       .pipe(
  //         catchError((error: AxiosError) => {
  //           throw 'An error happened!';
  //         }),
  //       ),
  //   );

  //   return data;
  // }

  // async cancelSubscription(
  //   subscription_id,
  //   cancellation_reason: string = 'New Subscription',
  // ) {
  //   const { data } = await firstValueFrom(
  //     this.httpService
  //       .post<any>(
  //         `https://api.rechargeapps.com/subscriptions/${subscription_id}/cancel`,
  //         { cancellation_reason },
  //         { headers: this.headers },
  //       )
  //       .pipe(
  //         catchError((error: AxiosError) => {
  //           throw 'An error happened!';
  //         }),
  //       ),
  //   );

  //   return data;
  // }

  // async cancelPreviousSubscription(email: string, current_product) {
  //   try {
  //     const { customers }: any = await this.findCustomerByEmail(email);
  //     for (let ele of customers) {
  //       const { subscriptions } = await this.findActiveSubscriptionByCustomerId(
  //         ele.id,
  //       );

  //       if (subscriptions?.length) {
  //         for (let sub of subscriptions) {
  //           if (sub.external_product_id.ecommerce != current_product) {
  //             await this.cancelSubscription(sub.id);
  //           }
  //         }
  //       }
  //     }

  //     return { message: 'success', customers };
  //   } catch (error) {
  //     console.log(error);
  //     return { message: 'Error' };
  //   }
  // }
}
