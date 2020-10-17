import Image from '../models/Image'

export default {
    render(image: Image)  {
        return {
            id: image.id,
            path: `${process.env.REACT_API_URL}/uploads/${image.path}`,
        }
    },
    
    renderMany(images: Image[]){
        return images.map(image => this.render(image))
    }
}