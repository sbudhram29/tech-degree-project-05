const maxUsers = 12;
let results = [];
$(".modal-container").hide();

$(() => {

    /**
     * API request to RANDOMUSER.ME
     * request nationality US
     * limiting results to maxUsers = defaulted to 12
     */

    $.ajax({
        url: `https://randomuser.me/api/?nat=us&results=${maxUsers}`,
        dataType: 'json',
        success: function (data) {
            results = data.results;
            for (let i = 0; i < results.length; i++) {
                $("#gallery").append(`<div class="card" id="${i}">
                <div class="card-img-container">
                    <img class="card-img" src="${results[i].picture.medium}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${results[i].name.first + " " + results[i].name.last}</h3>
                    <p class="card-text">${results[i].email}</p>
                    <p class="card-text cap">${results[i].location.city}, ${results[i].location.state}</p>
                </div>
            </div>`);
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
    id = parseInt(id, 10)

    $(".modal-container").append(`
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${results[id].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${results[id].name.first} ${results[id].name.last}</h3>
                    <p class="modal-text"> ${results[id].email} </p>
                    <p class="modal-text cap">${results[id].location.city}</p>
                    <hr>
                    <p class="modal-text">${results[id].phone}</p>
                    <p class="modal-text">${results[id].location.street}, ${results[id].location.city}, ${results[id].location.state} ${results[id].location.postcode}</p>
                    <p class="modal-text">Birthday: ${new Date(results[id].dob.date).toLocaleDateString("en-US")}</p>
                </div>
            </div>

            // IMPORTANT: Below is only for exceeds tasks
            <div class="modal-btn-container">
                ${ (id > 0)
        ? `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>`
        : ''}
            ${ (id < maxUsers - 1)
            ? `<button type="button" id="modal-next" class="modal-next btn">Next</button>`
            : ''}
            </div>
    `).show();

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

$("#search-submit").on("click", (e) => {
    e.preventDefault();
    let value = $("#search-input").val();
    console.log(value);
});