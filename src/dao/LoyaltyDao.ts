import { Model } from 'mongoose';
import { ILoyaltyRecordDocument, LoyaltyRecord } from '../models/loyalty';

export class LoyaltyDao {
    private model: Model<ILoyaltyRecordDocument>

    constructor (model: Model<ILoyaltyRecordDocument>) {
        this.model = model;
    }

    async getAllSchemes(): Promise<LoyaltyRecord[]> {
        try {
            const records = await this.model.find();
            return records.map(record => ({
                id: (record._id as unknown) as string,
                name: record.name,
                active: record.active,
                last_active: record.last_active,
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async activateScheme(id: string): Promise<LoyaltyRecord> {
        try {
            const record = await this.model.findOneAndUpdate(
                { _id: id, },
                { active: true, last_active: new Date(), },
                { returnDocument: 'after', },
            );

            if (!record) {
                throw new Error(`Loyalty record not found`);
            }

            return {
                id: (record._id as unknown) as string,
                name: record.name,
                active: record.active,
                last_active: record.last_active,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deactivateScheme(id: string): Promise<LoyaltyRecord> {
        try {
            const record = await this.model.findOneAndUpdate(
                { _id: id, },
                { active: false, },
                { returnDocument: 'after', },
            );

            if (!record) {
                throw new Error(`Loyalty record not found`);
            }

            return {
                id: (record._id as unknown) as string,
                name: record.name,
                active: record.active,
                last_active: record.last_active,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}