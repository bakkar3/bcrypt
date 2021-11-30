import bcrypt from "bcrypt";

const password = "password";

// signup
bcrypt.genSalt().then((salt) => {
  bcrypt.hash("password", salt).then((hash) => {
    console.log(hash);
  });
});

//    login
const theHash = "$2b$10$OT83ElMOxtpRczqg9G4YtuSTOZ22TQ8gii9NMqlDc2DuE2.Jml5.G";
bcrypt.compare("password", theHash).then((result) => console.log(result));
