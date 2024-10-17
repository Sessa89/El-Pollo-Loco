class CollectableObject extends DrawableObject {
    constructor() {
        super();
        this.isCollected = false;
    }


    /**
     * This function checks if the character collected the collectable object.
     * @param {object} character 
     */
    collect(character) {
        if (this.isColliding(character)) {
            this.isCollected = true;
            this.onCollect();
        }
    }


    /**
     * This function can be replaced by sub-classes for specific actions while collecting a collectable object. 
     */
    onCollect() {
        // console.log('Collectable object collected!');
    }


    /**
     * This function checks if a collectable object is colliding with the character.
     * @param {object} character 
     * @returns true or false
     */
    isColliding(character) {
        return this.x <= character.x + character.width &&
            this.y <= character.y + character.height &&
            this.x + this.width >= character.x &&
            this.y + this.height >= character.y;
    }
}