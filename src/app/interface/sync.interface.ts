import { Subscription } from "./subscription.interface";
import { User } from "./user.interface";
import { Customer } from "./customer.interface";
export interface Sync{
    attendance: Array<number>, 
    customer: Customer,
    user:User,
    subscriptions: Array<Subscription>
}