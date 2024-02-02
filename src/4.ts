class Key {
  private signature: number = Math.floor(Math.random() * (999 - 1 + 1) + 1);

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key, public name: string) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  public door: boolean = false;
  public tenants: Person[] = [];

  constructor(protected key: Key) {}

  public comeIn(person: Person): void {
    console.log("An attempt to come in...");
    if (this.door === false) {
      console.log("The door is locked!");
      return;
    }
    this.tenants.push(person);
    this.door = false;
  }

  public abstract openDoor(obj: Key): void;
}

class MyHouse extends House {
  public door: boolean;

  public openDoor(key: Key): void {
    console.log("An attempt to open the door...");
    if (key.getSignature() !== this.key.getSignature()) {
      console.log("You have invalid key!");
      return;
    }
    this.door = true;
  }
}

const key = new Key();
console.log("🚀 ~ key:", key);

const house = new MyHouse(key);
console.log("🚀 ~ house:", house);

const max = new Person(key, "Max");
console.log("🚀 ~ person:", max);

const isOpenedBefore = house.door;
console.log("🚀 ~ isOpenedBefore:", isOpenedBefore);

house.openDoor(max.getKey());
const isOpenedAfter = house.door;
console.log("🚀 ~ isOpenedAfter:", isOpenedAfter);

house.comeIn(max);

console.log("🚀 ~ house:", house);

const key2 = new Key();
console.log("🚀 ~ key2:", key2);

const bob = new Person(key2, "Bob");
console.log("🚀 ~ person2:", bob);
house.openDoor(bob.getKey());
house.comeIn(bob);
console.log("🚀 ~ house:", house);

const mary = new Person(key, "Mary");
console.log("🚀 ~ person2:", mary);
house.openDoor(mary.getKey());
house.comeIn(mary);
console.log("🚀 ~ house:", house);

export {};
