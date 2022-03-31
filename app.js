/* get elements */
const searchInput  = document.querySelector('#search');
const searchResult = document.querySelector('.table_result');

/* create variable empty */
let tabArray;

/* get data from APi */
async function getUser () {
    const res = await fetch('https://randomuser.me/api/?nat=fr&results=50');
    const {results} = await res.json();
    console.log(results);
    tabArray = orderList(results);
    createUserList(tabArray);
}

getUser();

/* order data de A => z */
function orderList(data) {
     const orderData = data.sort((a, b) => {
         if(a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
             return -1;
         }
          if(a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
             return 1;
         }
             return 0;
        })
             return orderData;
}


/* create user list and injected from HTML */
 function createUserList (userList) {
      
        userList.forEach(user => {
            const listItem = document.createElement('div');
            listItem.getAttribute('class', 'table_items');
            listItem.innerHTML = `
               <div class="table_items">
                <div class="table_item">
                    <img src="${user.picture.medium}" alt="icone">
                    <span class="table_info">${user.name.first} ${user.name.last}</span>
                </div>
                 <p class="table_info">${user.email}</p>
                 <p class="table_info">${user.phone}</p>
               </div>
               `
               searchResult.appendChild(listItem)
            })
        }

/* events and filter data */
searchInput.addEventListener("input", filterData);

function filterData(e) {
     searchResult.innerHTML = "";
     const searchString = e.target.value.toLowerCase().replace(/\s/g, "");
     const filterData = tabArray.filter(el => el.name.first.toLowerCase().includes(searchString) || 
                                              el.name.last.toLowerCase().includes(searchString) ||
                                              `${el.name.first + el.name.last}`.toLowerCase().replace(/\s/g, "").includes(searchString) ||
                                               `${el.name.last + el.name.first}`.toLowerCase().replace(/\s/g, "").includes(searchString)
                                              )
     createUserList(filterData);
}


