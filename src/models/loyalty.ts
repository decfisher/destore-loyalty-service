import { Document, model, Schema } from 'mongoose';

export interface LoyaltyRecord {
    id: string;
    name: string;
    active: boolean;
    last_active: Date;
}

export interface ILoyaltyRecord {
    name: string;
    active: boolean;
    last_active: Date;
}

export enum LoyaltyType {
    NO_LOYALTY = 'NO_LOYALTY',
    FIFTY_PERCENT_OFF = 'FIFTY_PERCENT_OFF',
    ONE_PRODUCT_FREE = 'ONE_ITEM_FREE',
    FREE_PRODUCT_NEXT_PURCHASE = 'FREE_PRODUCT_NEXT_PURCHASE',
}

export interface ILoyaltyRecordDocument extends ILoyaltyRecord, Document {}

const loyaltyRecordSchema = new Schema<ILoyaltyRecordDocument>(
    {
        name: {
            type: String,
        },
        active: {
            type: Boolean,
            default: false,
        },
        last_active: {
            type: Date,
            default: Date.now(),
        },
    },
    { collection: 'loyalty_discounts', }
);

export const LoyaltyRecordModel = model<ILoyaltyRecordDocument>('LoyaltyRecord', loyaltyRecordSchema);