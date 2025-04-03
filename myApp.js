require('dotenv').config();
const mongoose = require('mongoose')

// {1}
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Berhasil connect");
    console.log("Database :", mongoose.connection.name);
  })
  .catch(err => console.error("gagal connect : ", err));
// {2} --implemtation schema in mongo  
const personSchema = new mongoose.Schema({
  name : {type : String , required : true},
  age : Number,
  favoriteFoods : [String]
})
let Person = mongoose.model('Person', personSchema);

// {3} --menambahkan dokumen ke dalam collections
const createAndSavePerson = (done) => {
  const document = new Person({
    name : "Johanners",
    age : 21,
    favoriteFoods : ["Nilla Asam Manis","Iga"]
  })
  // document.save((err, data) => {
  //   if (err) {
  //     return console.error("Error:", err);
  //   }
  //   console.log("Data berhasil disimpan");
  //   done(null, data);
  // });
};
// Implementasi dari sebuah function diatas
// createAndSavePerson((err, data) => {
//   if (err) {
//     console.error("Gagal menyimpan data:", err);
//   } else {
//     console.log("Data yang disimpan:", data);
//   }
// });

// {4} --membuat dokumen langsung banyak dari sebuah array
const arrayOfPeople =[
  {name:"Brando" , age:40,"favoriteFoods":["Tung-tung sahur","linggang guli guli"]},
  {name:"Frankie" , age:35,"favoriteFoods":["opor ayam","linggang guli guli"]},
  {name:"Wassa" , age:23,"favoriteFoods":["POT HOSPOT","linggang guli guli"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,people)=>{
    if (err) return console.log(err);
    done(null, people);
  })
};
// createManyPeople(arrayOfPeople,(err,people)=>{
//   if(err){
//     console.log("Error : ", err )
//   }else{
//     console.log("secces : ", people)
//   }
// })

// {5} --mencari data 
const findPeopleByName = (personName, done) => {
  Person.find({name : personName},(err,dataFind)=>{
    if(err) return console.log(err)
    done(null,dataFind)
  })
};
// findPeopleByName("Johanners", (err, dataFind) => {
//   if (err) {
//     console.log("Error:", err);
//   } else {
//     if (dataFind.length === 0) {
//       console.log("No people found with that name.");
//     } else {
//       console.log("Data ditemukan: ", dataFind);
//     }
//   }
// });
// {6} -findOne() akan mengembalikan satu document, meskipun ada beberapa item
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food},function(err,dataFoodOne){
    if (err){
      console.log("Error ", err )
    }
    done(null, dataFoodOne);
  })
};
// findOneByFood("Iga", function(err,dataFind){
//   if (err){
//     console.log("Tidak ditemukan : {Terjadi error} ", err )
//   } else {
//     console.log("Data Berhasil ditemukan : ", dataFind)
//   }
// })

// {7} --findById() untuk mencari id di dalam collections

const findPersonById = (personId, done) => {
  Person.findById({_id : personId},function(err,dataId){
    if(err) console.log("terjadi error saat pencarian id : ", err)
    done(null , dataId);
  })
};
// const _id = '67ee0a416b6196006f268dba'
// findPersonById(_id,function(err,dataId){
//   if (err){
//     console.log("Tidak ditemukan data id : {Terjadi error} ", err )
//   } else {
//     console.log("Data Id Berhasil ditemukan : ", dataId)
//   }
// })

// {8} --update() untuk mengubah sebuah data yang sudah ada
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id : personId},function(err,dataUpdate){
    if(err) console.log("terjadi error saat pencarian id : ", err)


    dataUpdate.favoriteFoods.push(foodToAdd)
    dataUpdate.save((err,updatePerson)=>{
      if(err) console.log("Gagal update data")
      done(null , updatePerson);
    })
      
  })
  
};
// const _id = '67ed1594cd2d1517be33782d'
// findEditThenSave(_id,function(err,dataUpdate){
//   if (err){
//     console.log("Tidak ditemukan data id : {Terjadi error} ", err )
//   } else {
//       console.log("Data Id Berhasil diupdate : ", dataUpdate)
//   }
// })

// {9} --findOneAndUpdate() digunakan untuk memperbarui dokumen pertama yang cocok dengan filter 
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName},{age : ageToSet}, {new : true}, (err,dataSetAge)=>{
    if(err) console.log("Gagal mencari data")
    done(null , dataSetAge);
  })
};

// findAndUpdate('farhan',(err,dataSetAge)=>{
//   if (err){
//     console.log("Data age tidak berhasil diupdate : ", err)
//   }else{
//     console.log("Data age berhasil diupdate menjadi 20 ", dataSetAge)
//   }
// })

// {10} --findOneAndRemove() digunakan untuk menghapus dokumen pertama yang cocok dengan filter
const removeById = (personId, done) => {
  Person.findOneAndDelete({_id : personId},(err,setDataDelete)=>{
    if (err) console.log("gagal mencari data ")
    done(null , setDataDelete);
  })
};
// const _id = '67ee1a18cea01a7bf86740dc'
// removeById(_id,(err,setDataDelete)=>{
//   if (err){
//     console.log("Data gagal dihapus: ", err)
//   }else{
//     console.log("Data berhasil dihapus", setDataDelete)
//   }
// })

// {11} --remove() untuk menghapus data secara banyak
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove},function(err,updateAfterRemove){
    if(err) console.log("Gagal remove")
    done(null , updateAfterRemove);
  })
};
// removeManyPeople((err, result) => {
//   if (err) {
//     console.log("Terjadi kesalahan:", err);
//   } else {
//     console.log("Hasil setelah remove:", result);
//   }
// });


// {12}
const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
