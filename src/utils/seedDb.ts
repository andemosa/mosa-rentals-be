import { Car, ICar } from "../models/car.model";

const nameList = [
  "Rolls-Royce",
  "Nissan",
  "Lamborghini Diablo",
  "Porsche 911",
  "Ferrari 812",
  "Koenigsegg",
  "Jeep",
];

const brandList = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchbank"];

const transmissionList = ["Manual", "Automatic"] as const;

const gasoline = [40, 50, 60, 70, 80, 90];

const capacity = [2, 3, 4, 5, 6];

const price = [90, 95, 100, 105, 110, 120, 140];
const discount = [0, 4, 6, 8, 10, 12, 15, 20];
const imagesList = [
  "https://firebasestorage.googleapis.com/v0/b/mosa-vid.appspot.com/o/image%207.png?alt=media&token=681595d7-6eca-47fd-9c2b-1295232702f9",
  "https://firebasestorage.googleapis.com/v0/b/mosa-vid.appspot.com/o/car.png?alt=media&token=0d9966ed-d186-44a5-b7ca-523b3915ef10",
  "https://firebasestorage.googleapis.com/v0/b/mosa-vid.appspot.com/o/Car%20(3).png?alt=media&token=31c6f927-b90c-42e1-ba06-139018c0b8a6",
  "https://firebasestorage.googleapis.com/v0/b/mosa-vid.appspot.com/o/Car%20(2).png?alt=media&token=27745a30-1fb1-4289-9b18-48439cf2cc62",
  "https://firebasestorage.googleapis.com/v0/b/mosa-vid.appspot.com/o/Car%20(1).png?alt=media&token=2deca36a-d7d0-4446-9679-41cda17957cb",
];

const headline = "Sports car with the best design and acceleration";

const tagline =
  "Safety and comfort while driving a futuristic and elegant sports car";

const description =
  "NISMO has become the embodiment of Nissan's outstanding performance";

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cars: ICar[] = [];

export const seedCar = async () => {
  for (let index = 0; index < 50; index++) {
    const obj = {
      name: nameList[getRandomInt(0, nameList.length - 1)],
      headline: "Sports car with the best design and acceleration",
      tagline:
        "Safety and comfort while driving a futuristic and elegant sports car",
      description:
        "NISMO has become the embodiment of Nissan's outstanding performance",
      brand: brandList[getRandomInt(0, brandList.length - 1)],
      transmission:
        transmissionList[getRandomInt(0, transmissionList.length - 1)],
      capacity: capacity[getRandomInt(0, capacity.length - 1)],
      gasoline: gasoline[getRandomInt(0, gasoline.length - 1)],
      price: price[getRandomInt(0, price.length - 1)],
      discount: discount[getRandomInt(0, discount.length - 1)],
      images: [imagesList[getRandomInt(0, imagesList.length - 1)]],
    };
    
    cars.push(obj);
  }
  await Car.deleteMany();
  await Car.insertMany(cars);
};
