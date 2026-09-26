var contactName = document.getElementById("contactName");
var nameError = document.getElementById("nameError");
contactName.addEventListener("input", function () {
    var name = contactName.value.trim();
    var namePattern = /^[A-Za-z\u0600-\u06FF\s]+$/;
    if (
        name.length < 2 ||
        name.length > 50 ||
        !namePattern.test(name)
    ) {
        nameError.style.display = "block";
        contactName.classList.add("is-invalid");
    } else {
        nameError.style.display = "none";
        contactName.classList.remove("is-invalid");
    }
});
var contactPhone = document.getElementById("contactPhone");
var phoneError = document.getElementById("phoneError");
contactPhone.addEventListener("input", function () {
    var phone = contactPhone.value.trim();
    var phonePattern = /^01[0125][0-9]{8}$/;
    if (!phonePattern.test(phone)) {
        phoneError.style.display = "block";
        contactPhone.classList.add("is-invalid");
    } else {
        phoneError.style.display = "none";
        contactPhone.classList.remove("is-invalid");
    }
});
var contactEmail = document.getElementById("contactEmail");
var emailError = document.getElementById("emailError");
contactEmail.addEventListener("input", function () {
    var email = contactEmail.value.trim();
    if (email === "") {
        emailError.style.display = "none";
        contactEmail.classList.remove("is-invalid");
        return;
    }
    var emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.style.display = "block";
        contactEmail.classList.add("is-invalid");
    } else {
        emailError.style.display = "none";
        contactEmail.classList.remove("is-invalid");
    }
});
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var favorite = document.getElementById("favorite");
var emergency = document.getElementById("emergency");
var contactsRow = document.getElementById("contactsRow");
var favoriteList = document.getElementById("favoriteList");
var emergencyList = document.getElementById("emergencyList");
var searchInput = document.getElementById("searchInput");
var totalCount = document.getElementById("totalCount");
var favoriteCount = document.getElementById("favoriteCount");
var emergencyCount = document.getElementById("emergencyCount");
var contactsSubtitle = document.getElementById("contactsSubtitle");
var emptyState = document.getElementById("emptyState");
var contactList = localStorage.getItem("contacts")? JSON.parse(localStorage.getItem("contacts")): [];
displayAllContacts();
function addNewContact() {
    var newContact = {
        name: contactName.value.trim(),
        phone: contactPhone.value.trim(),
        email: contactEmail.value.trim(),
        address: contactAddress.value.trim(),
        group: contactGroup.value,
        notes: contactNotes.value.trim(),
        favorite: favorite.checked,
        emergency: emergency.checked
    };
    contactList.push(newContact);
    localStorage.setItem(
        "contacts",
        JSON.stringify(contactList)
    );
    clearForm();
    displayAllContacts();
    showSuccessMessage();
}
function displayAllContacts(list = contactList) {
    var box = "";
    if (list.length === 0) {
        emptyState.style.display = "block";
        contactsRow.innerHTML = "";
    } else {
        emptyState.style.display = "none";
        for (var i = 0; i < list.length; i++) {
            box += createContactCard(list[i], i);
        }
        contactsRow.innerHTML = box;
    }
    displayFavorites();
    displayEmergency();
    updateCounts();
}
function createContactCard(contact, index) {
    return `
        <div class="col-md-6">
            <div class="contact-card">
                <div class="contact-card-body">
                    <div class="contact-main-info">
                        <div class="avatar-wrapper">
                            <div class="contact-avatar">
                                ${contact.name.charAt(0).toUpperCase()}
                            </div>
                            ${
                                contact.favorite
                                ?
                                `
                                <span class="favorite-badge">
                                    <i class="fa-solid fa-star"></i>
                                </span>
                                `
                                :
                                ""
                            }
                            ${
                                contact.emergency
                                ?
                                `
                                <span class="emergency-badge-icon">
                                    <i class="fa-solid fa-heart-pulse"></i>
                                </span>
                                `
                                :
                                ""
                            }
                        </div>
                        <div class="contact-name-wrapper">
                            <h5 class="contact-name">
                                ${contact.name}
                            </h5>
                            <div class="contact-info">
                                <span class="info-icon phone-icon">
                                    <i class="fa-solid fa-phone"></i>
                                </span>
                                <span>
                                    ${contact.phone}
                                </span>
                            </div>
                        </div>
                    </div>

                    ${
                        contact.email
                        ?
                        `
                        <div class="contact-info">
                            <span class="info-icon email-icon">
                                <i class="fa-solid fa-envelope"></i>
                            </span>
                            <span>
                                ${contact.email}
                            </span>
                        </div>
                        `
                        :
                        ""
                    }
                    ${
                        contact.address
                        ?
                        `
                        <div class="contact-info">
                            <span class="info-icon address-icon">
                                <i class="fa-solid fa-location-dot"></i>
                            </span>
                            <span>
                                ${contact.address}
                            </span>

                        </div>
                        `
                        :
                        ""
                    }
                    ${
                        contact.group &&
                        contact.group !== "Select a group"
                        ?
                        `
                        <div class="contact-group">
                            ${contact.group}
                        </div>
                        `
                        :
                        ""
                    }
                    ${
                        contact.emergency
                        ?
                        `
                        <span class="emergency-badge">
                            <i class="fa-solid fa-heart-pulse"></i>
                            Emergency
                        </span>
                        `
                        :
                        ""
                    }
                </div>
                <div class="contact-card-footer">
                    <div class="contact-actions-left">
                        <a
                            href="tel:${contact.phone}"
                            class="action-btn call-btn"
                        >
                            <i class="fa-solid fa-phone"></i>
                        </a>
                        ${
                            contact.email
                            ?
                            `
                            <a
                                href="mailto:${contact.email}"
                                class="action-btn email-btn"
                            >
                                <i class="fa-solid fa-envelope"></i>
                            </a>
                            `
                            :
                            ""
                        }
                    </div>
                    <div class="contact-actions-right">
                        <button
                            onclick="toggleFavorite(${index})"
                            class="action-btn favorite-action ${
                                contact.favorite ? "active" : ""
                            }"
                        >
                            <i class="fa-${
                                contact.favorite
                                ? "solid"
                                : "regular"
                            } fa-star"></i>
                        </button>
                        <button
                            onclick="toggleEmergency(${index})"
                            class="action-btn emergency-action ${
                                contact.emergency ? "active" : ""
                            }"
                        > 
                            <i class="fa-${
                                contact.emergency
                                ? "solid"
                                : "regular"
                            } fa-heart"></i>
                        </button>
                        <button
                            onclick="editContact(${index})"
                            class="action-btn edit-action"
                        >
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button
                            onclick="deleteThisContact(${index})"
                            class="action-btn delete-action"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function displayFavorites() {
    var box = "";
    var favorites = contactList.filter(function (contact) {
        return contact.favorite === true;
    });
    if (favorites.length === 0) {
        box = `
            <div class="side-empty">
                No favorites yet
            </div>
        `;
    } else {
        for (var i = 0; i < favorites.length; i++) {
            var contact = favorites[i];
            box += `
                <div class="mini-contact favo">
                    <div class="mini-avatar">
                        ${contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="mini-info">
                        <h6>
                            ${contact.name}
                        </h6>
                        <small>
                            ${contact.phone}
                        </small>
                    </div>
                    <a
                        href="tel:${contact.phone}"
                        class="mini-call favo"
                    >
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </div>
            `;
        }
    }
    favoriteList.innerHTML = box;
}
function displayEmergency() {
    var box = "";
    var emergencyContacts = contactList.filter(function (contact) {
        return contact.emergency === true;
    });
    if (emergencyContacts.length === 0) {
        box = `
            <div class="side-empty">
                No emergency contacts
            </div>
        `;
    } else {
        for (var i = 0; i < emergencyContacts.length; i++) {
            var contact = emergencyContacts[i];
            box += `
                <div class="mini-contact">
                    <div class="mini-avatar">
                        ${contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="mini-info">
                        <h6>
                            ${contact.name}
                        </h6>
                        <small>
                            ${contact.phone}
                        </small>
                    </div>
                    <a
                        href="tel:${contact.phone}"
                        class="mini-call"
                    >
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </div>
            `;
        }
    }
    emergencyList.innerHTML = box;
}
function updateCounts() {
    var favorites = contactList.filter(function (contact) {
        return contact.favorite === true;
    });
    var emergencyContacts = contactList.filter(function (contact) {
        return contact.emergency === true;
    });
    totalCount.innerHTML = contactList.length;
    favoriteCount.innerHTML = favorites.length;
    emergencyCount.innerHTML = emergencyContacts.length;
    contactsSubtitle.innerHTML =
        `Manage and organize your ${contactList.length} contacts`;
}
function deleteThisContact(index) {
    contactList.splice(index, 1);
    localStorage.setItem(
        "contacts",
        JSON.stringify(contactList)
    );
    displayAllContacts();
}
function toggleFavorite(index) {
    contactList[index].favorite =
        !contactList[index].favorite;
    localStorage.setItem(
        "contacts",
        JSON.stringify(contactList)
    );
    displayAllContacts();
}
function toggleEmergency(index) {
    contactList[index].emergency =
        !contactList[index].emergency;
    localStorage.setItem(
        "contacts",
        JSON.stringify(contactList)
    );
    displayAllContacts();
}
function editContact(index) {
    var contact = contactList[index];
    contactName.value = contact.name;
    contactPhone.value = contact.phone;
    contactEmail.value = contact.email;
    contactAddress.value = contact.address;
    contactGroup.value = contact.group;
    contactNotes.value = contact.notes;
    favorite.checked = contact.favorite;
    emergency.checked = contact.emergency;
    document.getElementById("saveContactBtn").innerHTML = `
        <i class="fa-solid fa-check"></i>
        Save Contact
    `;
    document.getElementById("saveContactBtn").setAttribute(
        "onclick",
        `updateContact(${index})`
    );
    var modal = new bootstrap.Modal(
        document.getElementById("addContactModal")
    );
    modal.show();
}
function updateContact(index) {
    contactList[index] = {
        name: contactName.value.trim(),
        phone: contactPhone.value.trim(),
        email: contactEmail.value.trim(),
        address: contactAddress.value.trim(),
        group: contactGroup.value,
        notes: contactNotes.value.trim(),
        favorite: favorite.checked,
        emergency: emergency.checked
    };
    localStorage.setItem(
        "contacts",
        JSON.stringify(contactList)
    );
    clearForm();
    document.getElementById("saveContactBtn").innerHTML = `
        <i class="fa-solid fa-check"></i>
        Save Contact
    `;
    document.getElementById("saveContactBtn").setAttribute(
        "onclick",
        "addNewContact()"
    );
    displayAllContacts();
    var modal = bootstrap.Modal.getInstance(
        document.getElementById("addContactModal")
    );
    if (modal) {
        modal.hide();
    }
}
searchInput.addEventListener("input", function () {
    var searchValue =
        searchInput.value.trim().toLowerCase();
    var filteredContacts = contactList.filter(function (contact) {
        return (
            contact.name
                .toLowerCase()
                .includes(searchValue)
            ||
            contact.phone
                .includes(searchValue)
            ||
            contact.email
                .toLowerCase()
                .includes(searchValue)
        );
    });
    displayAllContacts(filteredContacts);
});
function clearForm() {
    contactName.value = "";
    contactPhone.value = "";
    contactEmail.value = "";
    contactAddress.value = "";
    contactGroup.value = "";
    contactNotes.value = "";
    favorite.checked = false;
    emergency.checked = false;
    document
        .querySelectorAll(".is-invalid")
        .forEach(function (element) {
            element.classList.remove("is-invalid");
        });
    document
        .querySelectorAll(".validation-error")
        .forEach(function (element) {
            element.style.display = "none";
        });
}
function showSuccessMessage() {
    var addModal =
        bootstrap.Modal.getInstance(
            document.getElementById("addContactModal")
        );
    if (addModal) {
        addModal.hide();
    }
    setTimeout(function () {
        var successModal =
            new bootstrap.Modal(
                document.getElementById("successModal")
            );
        successModal.show();
    }, 400);
}
