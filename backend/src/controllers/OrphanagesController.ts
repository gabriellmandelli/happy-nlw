import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'
import Orphanage from '../models/Orphanage'
import OrphanageView from '../views/OrphanagesView'

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

        const requestImages = request.files as Express.Multer.File[]

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false,
        })
    
        const orphanage = orphanagesRespository.create(data)
    
        await orphanagesRespository.save(orphanage)
    
        return response.status(201).json(orphanage)
    },

    async findAll(request : Request, response : Response){
        const orphanagesRespository = getRepository(Orphanage)

        const orphanagesList = await orphanagesRespository.find({
            relations: ['images']
        })

        return response.json(OrphanageView.renderMany(orphanagesList))
    },

    async findById(request : Request, response : Response){

        const { id } = request.params

        const orphanagesRespository = getRepository(Orphanage)

        const orphanage = await orphanagesRespository.findOneOrFail(id, {
            relations: ['images']
        })
        
        return response.json(OrphanageView.render(orphanage))
    }
}