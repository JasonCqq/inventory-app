#! /usr/bin/env node

console.log("This script populates some test data.");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

//Figure out how to link the category objectID
async function itemCreate(
  index,
  name,
  description,
  category,
  price,
  quantity,
  available
) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    quantity: quantity,
    available: available,
  });
  await item.save();
  items[index] = item;
  console.log(`Added Item: ${name}`);
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    // Graphics Cards
    itemCreate(0, "RTX 3060TI 16GB", "N/A", categories[0], 999.99, 5, true),
    itemCreate(1, "GTX 1660 Super 6GB", "N/A", categories[0], 399.99, 3, true),

    // CPU Processors
    itemCreate(
      2,
      "Intel Core i9-10900K",
      "N/A",
      categories[1],
      599.99,
      5,
      true
    ),
    itemCreate(3, "AMD Ryzen 7 5800X", "N/A", categories[1], 449.99, 4, true),

    // Motherboards
    itemCreate(
      4,
      "ASUS ROG Strix Z590-E Gaming",
      "N/A",
      categories[2],
      329.99,
      5,
      true
    ),
    itemCreate(
      5,
      "GIGABYTE B550 AORUS Elite",
      "N/A",
      categories[2],
      169.99,
      4,
      true
    ),

    // Computer Cases
    itemCreate(
      6,
      "NZXT H710i ATX Mid Tower",
      "N/A",
      categories[3],
      199.99,
      5,
      true
    ),
    itemCreate(
      7,
      "Corsair Carbide SPEC-DELTA RGB",
      "N/A",
      categories[3],
      99.99,
      4,
      true
    ),

    // Power Supplies
    itemCreate(
      8,
      "EVGA SuperNOVA 850 G5",
      "N/A",
      categories[4],
      159.99,
      5,
      true
    ),
    itemCreate(9, "Corsair RM750x", "N/A", categories[4], 129.99, 4, true),

    // Memory (RAM)
    itemCreate(
      10,
      "Corsair Vengeance RGB Pro 16GB (2 x 8GB)",
      "N/A",
      categories[5],
      129.99,
      5,
      true
    ),
    itemCreate(
      11,
      "G.Skill Trident Z Neo 32GB (2 x 16GB)",
      "N/A",
      categories[5],
      249.99,
      4,
      true
    ),

    // Storage
    itemCreate(
      12,
      "Samsung 970 EVO Plus 500GB NVMe SSD",
      "N/A",
      categories[6],
      99.99,
      5,
      true
    ),
    itemCreate(
      13,
      "Seagate Barracuda 2TB HDD",
      "N/A",
      categories[6],
      69.99,
      4,
      true
    ),

    // PC Coolers
    itemCreate(
      14,
      "NZXT Kraken X63 280mm AIO Liquid Cooler",
      "N/A",
      categories[7],
      149.99,
      5,
      true
    ),
    itemCreate(
      15,
      "Noctua NH-D15 Chromax Black",
      "N/A",
      categories[7],
      99.99,
      4,
      true
    ),
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "Graphics Cards",
      "Graphics cards are essential components in a computer system that handle the rendering of images, videos, and animations. They are responsible for generating and displaying visual content on your computer's monitor or display. Graphics cards have their own dedicated processors, known as GPUs (Graphics Processing Units), which are specifically designed to handle complex calculations required for rendering graphics. They enhance the performance of gaming, video editing, 3D modeling, and other graphically-intensive tasks by offloading the computational load from the CPU."
    ),
    categoryCreate(
      1,
      "CPU Processors",
      "CPU Processors, or Central Processing Units, are the brains of a computer system. They are responsible for executing instructions and performing calculations required for running software applications. CPU processors come in various models and speeds, and they determine the overall performance and speed of a computer. They handle tasks such as data processing, multitasking, and running operating systems. A more powerful CPU processor allows for faster and more efficient computing, making it an important component for both general use and resource-intensive tasks like gaming, video editing, and programming."
    ),
    categoryCreate(
      2,
      "Motherboards",
      "Motherboards are the main circuit boards in a computer system that serve as a central hub for connecting various components. They provide the necessary electrical and data connections between the CPU, RAM, storage devices, graphics cards, and other peripherals. Motherboards come in different form factors and socket types, which determine their compatibility with specific CPUs and other components. They also include slots for expansion cards, such as graphics cards and sound cards. Motherboards play a crucial role in determining the overall compatibility and performance of a computer system."
    ),
    categoryCreate(
      3,
      "Computer Cases",
      "Computer cases, also known as chassis, are the enclosures that house all the internal components of a computer. They provide physical protection and help in organizing and cooling the components. Computer cases come in various sizes and designs, accommodating different motherboard form factors and allowing for the installation of additional fans or liquid cooling systems. They often feature ports and buttons on the front panel for easy access to USB ports, audio jacks, and power controls. Computer cases serve both functional and aesthetic purposes, providing a secure and visually appealing housing for the computer components."
    ),
    categoryCreate(
      4,
      "Power Supplies",
      "Power supplies, commonly referred to as PSUs (Power Supply Units), are responsible for providing electrical power to all the components in a computer system. They convert the AC (alternating current) power from the wall outlet into the DC (direct current) power required by the computer's internal components. Power supplies come in different wattages and efficiency ratings, ensuring that the computer receives a stable and sufficient power supply. They also include connectors to distribute power to various components, such as the motherboard, CPU, graphics card, and storage devices."
    ),
    categoryCreate(
      5,
      "Memory (RAM)",
      "Memory, or RAM (Random Access Memory), is a type of temporary storage that allows a computer to quickly access and store data that is actively being used. RAM provides the working space for the CPU, enabling it to process instructions and manipulate data efficiently. The more RAM a computer has, the better it can handle multiple tasks simultaneously and store larger amounts of data for faster access. RAM capacity is an important consideration for tasks such as gaming, video editing, and running memory-intensive applications."
    ),
    categoryCreate(
      6,
      "Storage",
      "Storage refers to the devices used for long-term data storage in a computer system. There are various types of storage devices, including hard disk drives (HDDs), solid-state drives (SSDs), and newer technologies like NVMe SSDs. HDDs offer large storage capacities at a lower cost but are relatively slower. SSDs, on the other hand, provide faster data access and transfer speeds but usually have smaller capacities and are more expensive per gigabyte. Storage devices store the operating system, software applications, files, and other data needed for the computer to function."
    ),
    categoryCreate(
      7,
      "PC Coolers",
      "PC coolers, also known as CPU coolers, are components designed to dissipate heat generated by the central processing unit (CPU) of a computer. As the CPU performs calculations and processes data, it generates heat, and if not properly managed, it can lead to performance issues and potential damage. PC coolers consist of heatsinks, fans, and sometimes liquid cooling systems."
    ),
  ]);
}
