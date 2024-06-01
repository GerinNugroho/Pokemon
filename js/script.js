const url = 'https://pokeapi.co/api/v2/pokemon';
const imageList = document.querySelector('.pokemon-list');
const up = document.querySelector('.up');
const down = document.querySelector('.down');
let arrayName = [null];
let arrayStatus = [null];
let id = 1;
let index = 0;

async function getData() {
  let data = await fetch(url);
  let response = await data.json();
  for (i = 0; i < 20; i++) {
    arrayName.push(response.results[i].name);
    let dataStatus = await fetch(response.results[i].url);
    let responseStatus = await dataStatus.json();
    arrayStatus.push(responseStatus);
  }

  displayType(arrayStatus[id].types);
  displayAbility(arrayStatus[id].abilities);
  displayName(arrayName[id]);
  displayStatus(arrayStatus[id].stats[0].base_stat, arrayStatus[id].stats[1].base_stat);
}

for (i = 0; i < 20; i++) {
  const imageContainer = document.createElement('div');
  imageContainer.className = 'pokemon-item';
  imageContainer.style.backgroundImage = `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg')`;
  imageList.appendChild(imageContainer);
}

function displayName(name) {
  const displayname = document.querySelector('.name');
  displayname.textContent = `${name}`;
}

function displayStatus(hp, attack) {
  let Hp = document.querySelector('.hp-value');
  let Attack = document.querySelector('.attack-value');
  Hp.textContent = `${hp}`;
  Attack.textContent = `${attack}`;
}

function displayType(type) {
  let TypeContainer = document.querySelector('.type-list');
  TypeContainer.innerHTML = '';
  for (i = 0; i < type.length; i++) {
    let Type = document.createElement('span');
    Type.className = 'type-item';
    Type.textContent = `${type[i].type.name}`;

    if (Type.textContent == 'normal') {
      Type.style.backgroundColor = '#A8A878';
    } else if (Type.textContent == 'grass') {
      Type.style.backgroundColor = '#78C850';
    } else if (Type.textContent == 'fire') {
      Type.style.backgroundColor = '#F08030';
    } else if (Type.textContent == 'water') {
      Type.style.backgroundColor = '#6890F0';
    } else if (Type.textContent == 'bug') {
      Type.style.backgroundColor = '#A8B820';
    } else if (Type.textContent == 'poison') {
      Type.style.backgroundColor = '#A040A0';
    } else if (Type.textContent == 'flying') {
      Type.style.backgroundColor = '#EE99AC';
    }

    TypeContainer.appendChild(Type);
  }
}

function displayAbility(ability) {
  let AbilityContainer = document.querySelector('.ability-list');
  AbilityContainer.innerHTML = '';
  for (i = 0; i < ability.length; i++) {
    let Ability = document.createElement('div');
    Ability.className = 'ability-item';
    Ability.textContent = `${ability[i].ability.name}`;
    AbilityContainer.appendChild(Ability);
  }
}

up.addEventListener('click', () => {
  id = id + 1;
  index = index + 270;
  imageList.style.transform = `translateY(${-index}px)`;
  if (index > imageList.clientHeight - 270) {
    index = 0;
    id = 1;
    imageList.style.transform = `translateY(${-index}px)`;
  }
  displayType(arrayStatus[id].types);
  displayAbility(arrayStatus[id].abilities);
  displayName(arrayName[id]);
  displayStatus(arrayStatus[id].stats[0].base_stat, arrayStatus[id].stats[1].base_stat);
});

down.addEventListener('click', () => {
  index = index - 270;
  id = id - 1;
  imageList.style.transform = `translateY(${-index}px)`;
  if (index < 0) {
    index = 0;
    id = 1;
    imageList.style.transform = `translateY(${-index}px)`;
  }
  displayType(arrayStatus[id].types);
  displayAbility(arrayStatus[id].abilities);
  displayName(arrayName[id]);
  displayStatus(arrayStatus[id].stats[0].base_stat, arrayStatus[id].stats[1].base_stat);
});

getData();
