import { makeObservable } from "mobx";

// Store implementation
class PetOwnerStore {
  pets = [];
  owners = [];

  constructor() {
    makeObservable(this, {
      // Keep interface updated
      pets: observable,
      owners: observable,
      // Allow for caching when these values are updated and returned
      totalOwners: computed,
      totalPets: computed,
      storeDetails: computed,
      // Account for state modifications
      getPetByOwner: action,
      createPet: action,
      createOwner: action,
      updatePet: action,
      updateOwner: action,
      deletePet: action,
      deleteOwner: action,
      assignOwnerToPet: action,
    });
    autorun(logStoreDetails);
  }

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
  createPet(pet = { id: 0, name: "", type: "", breed: "", owner: null }) {
    this.pets.push(pet);
  }

  // Accept an owner object and add it to the owners array
  createOwner(owner = { id: 0, firstName: "", lastName: "" }) {
    this.owners.push(owner);
  }

  // Update owner
  updateOwner(ownerId, update) {
    const ownerIndexAtId = this.owners.findIndex(
      (owner) => owner.id === ownerId
    );
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
    const ownerIndexAtId = this.owners.findIndex(
      (owner) => owner.id === ownerId
    );
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

// Registering and interacting with our Mobx store

// 1. Create a new instance of the store
const petOwnerStore = new PetOwnerStore();
// -> We have 0 pets and 0 owners, so far!!!

// 2. Create a new pet
petOwnerStore.createPet({
    id: 1,
    name: "Alberto",
    type: "Dog",
    breed: "Malinois",
});
// -> We have 1 pets and 0 owners

petOwnerStore.createPet({
    id: 2,
    name: "Mika",
    type: "Dog",
    breed: "Huski",
});
// -> We have 2 pets and 0 owners
petOwnerStore.createOwner({ id: 1, firstName: "Aleem", lastName: "Moulin" });
petOwnerStore.logStoreDetails(); // -> We have 2 pets and 1 owner



