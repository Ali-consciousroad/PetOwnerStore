// Store implementation
class PetOwnerStore {
    pets = [];
    owners = [];

    // GREANT ACCESS FOR GET 

    // Total number owners 
    get totalOwners() {
        return this.owners.length;
    }

    // Total number pets
    get totalPets() {
        return this.pets.length;
    }

    // Get pets using ownerId
    getPetsByOwnerId(ownerId) {
        return this.pets.filter((pet) => {
            return pet.owner && pet.owner.id === ownerId;
        });
    }

    // AUTOMATICALLY UPDATE ITEMS
    // Accept a pet object and add it to the pets array of the current instance
    createPet(pet = { id: 0, name: '', type: '', breed: '', owner: null }) {
        this.pets.push(pet);
    }

    // Accept an owner object and add it to the owners array
    createOwner(owner = { id: 0, firstName: '', lastName: '' }){
        this.owners.push(owner);
    }

    // Update owner
    updateOwner(ownerId, update) {
        const ownerIndexAtId = this.owners.findIndex((owner) => owner.id === ownerId);
        if (ownerIndexAtId > -1 && update) {
            this.owners[ownerIndexAtId] = update;
        }
    }

    updatePet(petId, update) {
        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        if (petIndexAtId > -1 && update) {
            this.pets[petIndexAtId] = update;
        }
    }

    // REMOVE ITEMS 
    // delete pet by user id
    deletePet(petId) {
        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        if (petIndexAtId > -1) {
            this.pets.splice(petIndexAtId, 1);
        }
    }

    // delete owner by owner id
    deleteOwner(ownerId) {
        const ownerIndexAtId = this.owners.findIndex((owner) => owner.id === ownerId);
        if (ownerIndexAtId > -1) {
            this.owners.splice(ownerIndexAtId, 1);
        }
    }

    // ASSIGN id 
    assignOwnerToPet(ownerId, petId) {
        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        const ownerIndexAtId = this.owners.findIndex((pet) => pet.id === ownerId);
        if (petIndexAtId > -1 && ownerIndexAtId > -1) {
            this.pets[petIndexAtId].owner = this.owners[petIndexAtId];
        }
    }

    // get store details
    get storeDetails() {
        return `We have ${this.totalPets()} total pets and ${this.totalOwners()} total owners, so far!!!`;
}

    // Log the store details to the console
    logStoreDetails() {
        console.log(this.storeDetails);
    }
}

// Initialize storefront with 2 pets an 1 owner
const PetOwnerStore = new PetOwnerStore();
    PetOwnerStore.createPet({
        id: 1, 
        name: "Bingo",
        type: "Dog",
        breed: "alsertian",
    });
    PetOwnerStore.createPet({
        id: 2, 
        name: "Lloyd",
        type: "Cat",
        breed: "winky",
    });
    petOwnerStore.createOwner({ id: 1, firstName: "Aleem", lastName: "Moulin"});

    petOwnerStore.logStoreDetails(); 