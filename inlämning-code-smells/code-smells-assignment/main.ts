/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

// function getLength(jumpings: number[]): number {
//   let totalNumber = 0;

//   totalNumber = jumpings.reduce(
//     (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
//   );

//   return totalNumber;
// }

function getLength(jumpings: number[]): number {
  return jumpings.reduce(
    (sumJumpings, currentJump) => sumJumpings + currentJump,
    0
  );
}

/*
    2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
    */

// class Student {
//   constructor(
//     public name: string,
//     public handedInOnTime: boolean,
//     public passed: boolean
//   ) {}
// }

// function getStudentStatus(student: Student): string {
//   student.passed =
//     student.name == "Sebastian"
//       ? student.handedInOnTime
//         ? true
//         : false
//       : false;

//   if (student.passed) {
//     return "VG";
//   } else {
//     return "IG";
//   }
// }

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

const getStudentStatus = (student: Student): string =>
  (student.passed = student.name === "Sebastian" && student.handedInOnTime)
    ? "VG"
    : "IG";

/*
    3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
    Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
    */

// class Temp {
//   constructor(public q: string, public where: Date, public v: number) {}
// }

// function averageWeeklyTemperature(heights: Temp[]) {
//   let r = 0;

//   for (let who = 0; who < heights.length; who++) {
//     if (heights[who].q === "Stockholm") {
//       if (heights[who].where.getTime() > Date.now() - 604800000) {
//         r += heights[who].v;
//       }
//     }
//   }

//   return r / 7;
// }

class TemperatureMeasurement {
  constructor(
    public city: string,
    public measurementDate: Date,
    public temperature: number
  ) {}
}
function averageWeeklyTemperature(temperatures: TemperatureMeasurement[]) {
  let totalTemperature = 0;
  const oneWeekAgo = 604800000;

  for (let i = 0; i < temperatures.length; i++) {
    if (temperatures[i].city === "Stockholm") {
      if (temperatures[i].measurementDate.getTime() > Date.now() - oneWeekAgo) {
        totalTemperature += temperatures[i].temperature;
      }
    }
  }

  return totalTemperature / 7;
}

/*
    4. Följande funktion kommer att presentera ett objekt i dom:en. 
    Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
    */

// function showProduct(
//   name: string,
//   price: number,
//   amount: number,
//   description: string,
//   image: string,
//   parent: HTMLElement
// ) {
//   let container = document.createElement("div");
//   let title = document.createElement("h4");
//   let pris = document.createElement("strong");
//   let imageTag = document.createElement("img");

//   title.innerHTML = name;
//   pris.innerHTML = price.toString();
//   imageTag.src = image;

//   container.appendChild(title);
//   container.appendChild(imageTag);
//   container.appendChild(pris);
//   parent.appendChild(container);
// }

function showProduct(
  name: string,
  price: number,
  image: string,
  parent: HTMLElement
) {
  let container = document.createElement("div");
  container.innerHTML = `<h4>${name}</h4><img src="${image}"><strong>${price}</strong>`;

  parent.appendChild(container);
}

/*
    5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
    går att göra betydligt bättre. Gör om så många som du kan hitta!
    */
// function presentStudents(students: Student[]) {
//   for (const student of students) {
//     if (student.handedInOnTime) {
//       let container = document.createElement("div");
//       let checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = true;

//       container.appendChild(checkbox);
//       let listOfStudents = document.querySelector("ul#passedstudents");
//       listOfStudents?.appendChild(container);
//     } else {
//       let container = document.createElement("div");
//       let checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = false;

//       container.appendChild(checkbox);
//       let listOfStudents = document.querySelector("ul#failedstudents");
//       listOfStudents?.appendChild(container);
//     }
//   }
// }

function presentStudents(students: Student[]) {
  for (const student of students) {
    let container = document.createElement("div");
    let checkbox = Object.assign(document.createElement("input"), {
      type: "checkbox",
      checked: student.handedInOnTime,
    });

    container.appendChild(checkbox);
    let listOfStudents = document.querySelector(
      student.handedInOnTime ? "ul#passedstudents" : "ul#failedstudents"
    );
    listOfStudents?.appendChild(container);
  }
}

/*
    6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
    Lorem, ipsum, dolor, sit, amet
    Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
    */
// function concatenateStrings() {
//   let result = "";
//   result += "Lorem";
//   result += "ipsum";
//   result += "dolor";
//   result += "sit";
//   result += "amet";

//   return result;
// }

const concatenateStrings = () =>
  ["Lorem", "ipsum", "dolor", "sit", "amet"].join("");

/* 
  7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
      Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
      fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
      lösning som är hållbar och skalar bättre. 
  */
// function createUser(
//   name: string,
//   birthday: Date,
//   email: string,
//   password: string
// ) {
//   // Validation

//   let ageDiff = Date.now() - birthday.getTime();
//   let ageDate = new Date(ageDiff);
//   let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

//   console.log(userAge);

//   if (!(userAge < 20)) {
//     // Logik för att skapa en användare
//   } else {
//     return "Du är under 20 år";
//   }
// }

// function createUser(
//   name: string,
//   birthday: Date,
//   email: string,
//   password: string
// ) {
//   const userAge = new Date().getFullYear() - birthday.getFullYear();

//   if (userAge < 20) return "Du är under 20 år";

//   console.log(userAge);

//   // Logik för att skapa en användare
//   return "Användare skapad!";
// }

interface UserData {
  name: string;
  birthday: Date;
  email: string;
  password: string;
  avatar?: string;
  address?: string;
}

function createUser(user: UserData) {
  const userAge = new Date().getFullYear() - user.birthday.getFullYear();

  if (userAge < 20) return "Du är under 20 år";

  console.log(`Användaren ${user.name} skapad. Ålder: ${userAge}`);

  return { ...user, createdAt: new Date() };
}
