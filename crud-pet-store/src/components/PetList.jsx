import React from "react";
import { observer } from "mobx-react-lite";

function PetList({ store }) {
  // Event handler to add a new pet
  const handleAddPet = () => {
    const name = prompt("Enter pet name");
    const type = prompt("Enter pet type");
    const breed = prompt("Enter pet breed");
    const ownerId = prompt("Enter owner's Id of the pet");

    const pet = store.createPet({ id: Date.now(), name, type, breed });
    store.assignOwnerToPet(ownerId, pet?.id);
  };
  return (
    <div>
      {store.storeDetails}
      <button onClick={handleAddPet}>Add Pet</button>
    </div>
  );
}

export default observer(PetList);
