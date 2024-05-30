document.addEventListener("DOMContentLoaded", function () {
  let activitateInput = document.getElementById("activitate");
  let dataInput = document.getElementById("data");
  let oraInput = document.getElementById("ora");
  let alegeInput = document.getElementById("alege");
  let urgentList = document.getElementById("urgent");
  let cuPrioritateList = document.getElementById("cuPrioritate");
  let oricindList = document.getElementById("oricind");
  let adaugaButton = document.getElementById("adauga");

  let activitati = JSON.parse(localStorage.getItem("activitati")) || [];
  activitati.forEach(adaugaElementInLista);

  adaugaButton.addEventListener("click", function () {
    let activitateValue = activitateInput.value;
    let dataValue = dataInput.value;
    let oraValue = oraInput.value;
    let alegeValue = alegeInput.value;

    let activitate = {
      activitate: activitateValue,
      data: dataValue,
      ora: oraValue,
      categorie: alegeValue,
    };

    let activitati = JSON.parse(localStorage.getItem("activitati")) || [];
    activitati.push(activitate);
    localStorage.setItem("activitati", JSON.stringify(activitati));

    adaugaElementInLista(activitate);

    activitateInput.value = "";
    //dataInput.value = "";
    // oraInput.value = "";
    //alegeInput.value = "";
  });

  function adaugaElementInLista(activitate) {
    let newItem = document.createElement("span");

    let dataOraParagraf = document.createElement("p");
    dataOraParagraf.textContent =
      "\n" + activitate.data + "\n/\n" + activitate.ora;
    let activitateParagraf = document.createElement("p");
    activitateParagraf.textContent = activitate.activitate;

    dataOraParagraf.style.color = "green";
    activitateParagraf.style.color = "black";

    let butonStergere = document.createElement("button");
    butonStergere.textContent = "Șterge";
    butonStergere.classList.add("sterge");
    butonStergere.addEventListener("click", function () {
      newItem.remove();
      let activitati = JSON.parse(localStorage.getItem("activitati")) || [];
      activitati = activitati.filter(
        (a) =>
          a.activitate !== activitate.activitate ||
          a.data !== activitate.data ||
          a.ora !== activitate.ora
      );
      localStorage.setItem("activitati", JSON.stringify(activitati));
    });

    newItem.appendChild(dataOraParagraf);
    newItem.appendChild(activitateParagraf);
    newItem.appendChild(butonStergere);

    if (activitate.categorie === "Urgent") {
      sortareSiAdaugareElement(urgentList, newItem);
      stergeClasa(urgentList, "ascunde");
    } else if (activitate.categorie === "Cu Prioritate") {
      sortareSiAdaugareElement(cuPrioritateList, newItem);
      stergeClasa(cuPrioritateList, "ascunde");
    } else if (activitate.categorie === "Oricind") {
      sortareSiAdaugareElement(oricindList, newItem);
      stergeClasa(oricindList, "ascunde");
    }
  }

  function sortareSiAdaugareElement(lista, element) {
    lista.appendChild(element);
    sortareLista(lista);
  }

  function sortareLista(lista) {
    let elementeLista = lista.getElementsByTagName("span");

    let elementeArray = Array.from(elementeLista);

    elementeArray.sort(function (a, b) {
      let [dataA, oraA] = a
        .getElementsByTagName("li")[0]
        .textContent.split("\n");
      let [dataB, oraB] = b
        .getElementsByTagName("li")[0]
        .textContent.split("\n");

      let dataComparatie =
        new Date(dataA + " " + oraA) - new Date(dataB + " " + oraB);
      return dataComparatie;
    });

    for (let i = 0; i < elementeArray.length; i++) {
      lista.appendChild(elementeArray[i]);
    }
  }

  function adaugaClasa(element, clasa) {
    if (element && clasa) {
      element.classList.add(clasa);
    } else {
      console.error("Elementul sau clasa nu sunt definite.");
    }
  }
  adaugaButton.addEventListener("click", function () {
    adaugaClasa(dataInput, "ascunde");
    adaugaClasa(oraInput, "ascunde");
    adaugaClasa(alegeInput, "ascunde");
    adaugaClasa(adaugaButton, "ascunde");
  });

  function stergeClasa(element, clasa) {
    if (element && clasa) {
      element.classList.remove(clasa);
    } else {
      console.error("Elementul sau clasa nu sunt definite.");
    }
  }

  activitateInput.addEventListener("click", function () {
    stergeClasa(dataInput, "ascunde");
    stergeClasa(oraInput, "ascunde");
    stergeClasa(alegeInput, "ascunde");
    stergeClasa(adaugaButton, "ascunde");
  });

  document.getElementById("arataUrgent").addEventListener("click", function () {
    if (urgentList.classList.contains("ascunde")) {
      stergeClasa(urgentList, "ascunde");
    } else {
      urgentList.classList.add("ascunde");
    }
  });

  document
    .getElementById("arataCuPrioritate")
    .addEventListener("click", function () {
      if (cuPrioritateList.classList.contains("ascunde")) {
        stergeClasa(cuPrioritateList, "ascunde");
      } else {
        cuPrioritateList.classList.add("ascunde");
      }
    });

  document
    .getElementById("arataOricind")
    .addEventListener("click", function () {
      if (oricindList.classList.contains("ascunde")) {
        stergeClasa(oricindList, "ascunde");
      } else {
        oricindList.classList.add("ascunde");
      }
    });
});
