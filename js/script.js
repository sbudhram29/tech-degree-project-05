const maxUsers = 12;
let results = [];
let employeesToHide = [];

$(".search-container").append(`<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`);

$(() => {

    /**
     * API request to RANDOMUSER.ME
     * request nationality US
     * limiting results to maxUsers = defaulted to 12
     */

    $.ajax({
        url: `https://randomuser.me/api/?nat=us&results=${maxUsers}`,
        dataType: 'json',
        success: function(data) {
            results = data.results;
            for (let i = 0; i < results.length; i++) {
                $("#gallery").append(`
                <div class="card" id="${i}" data-id="${i}">
                    <div class="card-img-container">
                        <img class="card-img" src="${results[i].picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${results[i].name.first + " " + results[i].name.last}</h3>
                        <p class="card-text">${results[i].email}</p>
                        <p class="card-text cap">${results[i].location.city}, ${results[i].location.state}</p>
                    </div>
                </div>
                `);
            }

            handleClick();
        }
    });

})

/**
 * handle the click of employee
 */
const handleClick = () => {
    $(".card").on('click', (e) => {
        showModal(e.currentTarget.id);
    });

};

/**
 * hide modal and empty element
 */
const hideModal = () => {
    $(".modal-container")
        .empty()
        .hide();
}

/**
 * Add user data to modal and add element
 */
const showModal = (id) => {

    const user = results[id]
    $("body").append(`
    <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="modal-text"> ${user.email} </p>
                    <p class="modal-text cap">${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${user.phone}</p>
                    <p class="modal-text cap">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p >
        <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleDateString("en-US")}</p>
                </div >
            </div >
    ${
        (employeesToHide.length > 0)
            ? ''
            : `<div class="modal-btn-container">
                        ${ (id > 0)
                ? `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>`
                : ''}
                    ${ (id < maxUsers - 1)
                ? `<button type="button" id="modal-next" class="modal-next btn">Next</button>`
                : ''}
                    </div></div>`}


`).show();

    $(".modal-container").on("click", (e) => {
        if (e.target.className === 'modal-container') {
            hideModal()
        }
    });
    $("#modal-close-btn").on("click", () => hideModal());

    $("#modal-next").on("click", () => {
        hideModal();
        showModal(id + 1);
    });

    $("#modal-prev").on("click", () => {
        hideModal();
        showModal(id - 1);
    });
}

/**
 * hide modal if click off of modal (gray area)
 */
$(".modal-container").on('click', (e) => {
    if (e.target.className !== 'modal-container') {
        return;
    }
    hideModal();
});

/**
 * handle search
 */
$('#search-input').on('keyup', (e) => searchEmployees(e.target.value))

//handles submit button
$("#search-submit").on("click", (e) => {
    e.preventDefault();
    let value = $("#search-input")
        .val()
        .toLowerCase();

    searchEmployees(value);
});

const searchEmployees = (keyword) => {
    employeesToHide = [];

    for (let i = 0; i < results.length; i++) {
        let fullName = results[i].name.first + " " + results[i].name.last;

        let regex = new RegExp(`${keyword} `, 'gi')

        if (fullName.search(regex) !== -1) {
            showEmployee(i);
        } else {
            employeesToHide.push(i);
            hideEmployee(i);
        }
    }

}

const hideEmployee = (id) => {
    $(`#${id} `).hide()
}
const showEmployee = (id) => {
    $(`#${id} `).show()
}