import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'

export default {
    async create(request : Request, response : Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body
    
        const orphanagesRespository = getRepository(Orphanage)
    
        const orphanage = orphanagesRespository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        })
    
        await orphanagesRespository.save(orphanage)
    
        return response.status(201).json(orphanage)
    },

    async findAll(request : Request, response : Response){
        const orphanagesRespository = getRepository(Orphanage)

        const orphanagesList = await orphanagesRespository.find()

        return response.json(orphanagesList)
    }
}