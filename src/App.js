import "./App.css";
import { useState } from "react";
import items from "./shopItems";

function App() {
  const [sItems, setsItems] = useState(items);
  const [sItemsConst, setsItemsConst] = useState(
    JSON.stringify(items.storeItems)
  );
  const [filterS, setFilterS] = useState({ gMax: 0, gMin: 0, serc: "" });

  const deleteFromCart = (carti, i) => {
    let niz = [];
    console.log(sItems.cart);
    if (sItems.cart[i].amount > 1) {
      niz = [
        ...sItems.cart.slice(0, i),
        {
          item: sItems.cart[i].item,
          price: sItems.cart[i].price,
          id: sItems.cart[i].id,
          amount: sItems.cart[i].amount - 1,
        },
        ...sItems.cart.slice(i + 1),
      ];
    } else {
      niz = [...sItems.cart.slice(0, i), ...sItems.cart.slice(i + 1)];
    }

    console.log(niz);
    setsItems({ ...sItems, cart: niz });
  };
  const addToCart = (itemm) => {
    let niz = sItems.cart;
    console.log(niz);
    let br = 0;
    let cI = 0;

    for (let i = 0; i < niz.length; i++) {
      if (niz[i].id === itemm.id) {
        cI = i;

        br++;
      }
    }

    if (br !== 1) {
      let forCart = {
        item: itemm.item,
        price: itemm.price,
        id: itemm.id,
        amount: 1,
      };
      niz.push(forCart);
    } else if (br === 1) {
      niz = [
        ...sItems.cart.slice(0, cI),
        {
          item: itemm.item,
          price: itemm.price,
          id: itemm.id,
          amount: niz[cI].amount + 1,
        },
        ...sItems.cart.slice(cI + 1),
      ];
    }
    console.log(niz);

    setsItems({ ...sItems, cart: niz });
  };
  const sortFromHToL = () => {
    let nizP = sItems.storeItems;
    let nL = nizP.length;
    let niz = [];
    while (niz.length < nL) {
      let max = nizP[0];
      let maxI = 0;
      for (let i = 0; i < nizP.length; i++) {
        if (nizP[i].price > max.price) {
          max = nizP[i];
          maxI = i;
        }
      }
      let el = nizP[maxI];
      nizP.splice(maxI, 1);
      niz.push(el);
    }

    setsItems({ ...sItems, storeItems: niz });
  };
  const sortFromLToH = () => {
    let nizP = sItems.storeItems;
    let nL = nizP.length;
    let niz = [];
    while (niz.length < nL) {
      let min = nizP[0];
      let minI = 0;
      for (let i = 0; i < nizP.length; i++) {
        if (nizP[i].price < min.price) {
          min = nizP[i];
          minI = i;
        }
      }
      let el = nizP[minI];
      nizP.splice(minI, 1);
      niz.push(el);
    }

    setsItems({ ...sItems, storeItems: niz });
  };
  const sortFromMin = (event) => {
    setFilterS({ ...filterS, gMin: event.target.value });

    let niz = JSON.parse(sItemsConst);

    for (let i = 0; i < niz.length; i++) {
      if (niz[i].price < event.target.value) {
        niz.splice(i, 1);
        i -= 1;
      } else if (filterS.gMax > 0 && niz[i].price > filterS.gMax) {
        niz.splice(i, 1);
        i -= 1;
      } else if (niz[i].item.indexOf(filterS.serc) === -1) {
        niz.splice(i, 1);
        i -= 1;
      }
    }
    setsItems({ ...sItems, storeItems: niz });
  };
  const sortFromMax = (event) => {
    setFilterS({ ...filterS, gMax: event.target.value });

    let niz = JSON.parse(sItemsConst);

    for (let i = 0; i < niz.length; i++) {
      if (niz[i].price > event.target.value && event.target.value > 0) {
        niz.splice(i, 1);
        i -= 1;
      } else if (filterS.gMin > 0 && niz[i].price < filterS.gMin) {
        niz.splice(i, 1);
        i -= 1;
      } else if (niz[i].item.indexOf(filterS.serc) === -1) {
        niz.splice(i, 1);
        i -= 1;
      }
    }
    setsItems({ ...sItems, storeItems: niz });
  };
  const sortBySerch = (event) => {
    setFilterS({ ...filterS, serc: event.target.value });
    let niz = JSON.parse(sItemsConst);

    for (let i = 0; i < niz.length; i++) {
      if (niz[i].item.indexOf(event.target.value) === -1) {
        niz.splice(i, 1);
        i -= 1;
      } else if (filterS.gMax > 0 && niz[i].price > filterS.gMax) {
        niz.splice(i, 1);
        i -= 1;
      } else if (filterS.gMin > 0 && niz[i].price < filterS.gMin) {
        niz.splice(i, 1);
        i -= 1;
      }
    }
    setsItems({ ...sItems, storeItems: niz });
  };

  let fullPrice = 0;
  for (let i = 0; i < sItems.cart.length; i++) {
    fullPrice +=
      parseInt(sItems.cart[i].price) * parseInt(sItems.cart[i].amount);
  }

  return (
    <div>
      <title>
        <h1>SHOP</h1>
      </title>
      <nav>
        <input type="text" id="filterByText" onChange={sortBySerch}></input>
        <label for="filterByText">Search</label>
        <input
          type="radio"
          id="hToL"
          name="sortByPrice"
          onClick={sortFromHToL}
        ></input>
        <label for="hToL">Hight to Low</label>
        <input
          type="radio"
          id="lToH"
          name="sortByPrice"
          onClick={sortFromLToH}
        ></input>
        <label for="lToH">Low to Hight</label>
        <input type="number" id="minRange" onChange={sortFromMin}></input>
        <label for="minRange">Minimum price</label>
        <input type="number" id="maxRange" onChange={sortFromMax}></input>

        <label for="maxRange">Maximum price</label>
      </nav>
      <main>
        <div id="shopBox">
          {sItems.storeItems.map((itemm, i) => {
            return (
              <div key={i} className="itemBoxes">
                <div className="itemName">{itemm.item}</div>
                <hr></hr>
                <div>{itemm.price} din</div>
                <button onClick={() => addToCart(itemm)} className="buyButton">
                  Buy
                </button>
              </div>
            );
          })}
        </div>
        <div id="cartPrice">
          <div id="cart">
            {sItems.cart.map((cartt, i) => {
              return (
                <div key={i} className="cartItemBoxes">
                  <div className="itemName">
                    {cartt.item} X {cartt.amount}
                  </div>
                  <hr></hr>

                  <button
                    onClick={() => deleteFromCart(cartt, i)}
                    className="deleteButton"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
          <div id="price">Full Price : {fullPrice} din</div>
        </div>
      </main>

      <footer>by Lazar Djurkovic</footer>
    </div>
  );
}

export default App;
