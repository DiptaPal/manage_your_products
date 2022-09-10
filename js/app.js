const getValueById = (id) =>{
    const inputField = document.getElementById(id);
    const inputValue = inputField.value;
    inputField.value = '';
    if(id==='product-name'){
        inputField.removeAttribute('disabled');
    }
    return inputValue
}

const setValueById = (id, value) =>{
    const inputField = document.getElementById(id);
    inputField.value = value;
    if(id==='product-name'){
        inputField.setAttribute('disabled','true');
    }
}

const getDataFromLocalStorage = () =>{
    const products = localStorage.getItem('products');
    const productsParse = JSON.parse(products);
    return productsParse;
}
const addProduct = () =>{
    const productName = getValueById('product-name');
    const productQuantity = getValueById('product-quantity');
    const quantity = Number(productQuantity);

    if(!isNaN(productName) || !Number.isInteger(quantity)){
        alert("Give the correct value");
        return;
    }
    deleteData(name);
    storeDataToLocalStorage(productName, quantity);

}
const storeDataToLocalStorage = (name,quantity) =>{
    let products = getDataFromLocalStorage();

    if(!products){
        products = {};
    }
    if(products[name]){
        products[name] = parseInt(products[name]) + parseInt(quantity);
    }
    else{
        products[name] = quantity;
    }

    const productsStringify = JSON.stringify(products);
    localStorage.setItem('products', productsStringify);
    displayDataFromLocalStorage();
}

const displayDataFromLocalStorage = () =>{
    const products = getDataFromLocalStorage();

    const section = document.getElementById("all-products");
    section.textContent = "";

    for (const product in products) {
        // console.log(product, products[product])

        const name = product;
        const quantity = products[product];

        const div = document.createElement("div");
        div.innerHTML = `
        <div class="shadow-sm p-3 mb-2 bg-body rounded d-flex justify-content-between">
            <div>
                <span class="fs-4">${name}</span>
                Quantity:<small class="fw-bold">
                    ${quantity}
                </small>
            </div>
            <div>
                <button class="btn btn-primary me-3" onclick="editData('${name}')"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-danger" onclick="deleteData('${name}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;

        section.appendChild(div);
    }
    
}

const deleteData = (name) =>{
    const products = getDataFromLocalStorage();
    for (const product in products){
        if(product === name){
            delete products[product];
        }
    }
    const productsStringify = JSON.stringify(products);
    localStorage.setItem('products', productsStringify);
    displayDataFromLocalStorage();

}

const editData = (name) =>{
    const products = getDataFromLocalStorage();
    for (const product in products){
        if(product === name){
            setValueById('product-name',product)
            setValueById('product-quantity', products[product])
        }
    }
    products[name] = 0;
    const productsStringify = JSON.stringify(products);
    localStorage.setItem('products', productsStringify);
}
displayDataFromLocalStorage();