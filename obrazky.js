//toto si povedal ze mozme cele pouzit od teba, tak hadam je to v pohode
const IMAGES = [
    {name: 'sliepka', src: 'img/sliepka1l.png'},
    {name: 'pozadie', src: 'img/pozadie.png'},
    {name: 'sprite',  src: 'img/sliepka_sprite1.png'}
];
class ResourceManager {
    loadedImages = new Map();
    async init() {
        await this.loadImages();
    }
    async loadImages() {
        await Promise.all(
            IMAGES.map(image => this.loadImage(image)),
        )
    }
    async loadImage(imgResource) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imgResource.src;
            img.onload = () => {
                this.loadedImages.set(imgResource.name, img);
                resolve(img);
            }
            img.onerror = (err) => {
                reject(err);
            }
        });
    }
    getImageSource(imageName) {
        const image = this.loadedImages.get(imageName);
        if (image == null) {
            throw new Error(`Image '${imageName}' not found`);
        }
        return image;
    }
}
var resourceManager = new ResourceManager();
