import { Request, Response, NextFunction } from 'express';
import { LoyaltyDao } from '../dao/LoyaltyDao';

export class LoyaltyController {
    private loyaltyDao: LoyaltyDao;

    constructor (loyaltyDao: LoyaltyDao) {
        this.loyaltyDao = loyaltyDao;
    }

    getAllSchemes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const records = await this.loyaltyDao.getAllSchemes();
            res.status(200).json(records);
        } catch (error) {
            next(error);
        }
    }

    activateScheme = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.body;
            const record = await this.loyaltyDao.activateScheme(id);
            res.status(200).json(record);
        } catch(error) {
            next(error);
        }
    }
}