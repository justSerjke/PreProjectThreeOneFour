let requestUrl = 'http://localhost:8080/api/admin/users'

// main table
function fetchData() {
    fetch(requestUrl)
        .then(response => response.json())
        .then(result => fetchTable(result))
        .then(result => console.log(result))

    function fetchTable(users) {
        let tBody = ''
        $('#usersTable').find('tr').remove();
        $.each(users, function (key, object) {
            let roles = ''
            $.each(object.roles, function (k, o) {
                roles += o.name + ' '
            })
            tBody += ('<tr>');
            tBody += ('<td>' + object.id + '</td>');
            tBody += ('<td>' + object.firstName + '</td>');
            tBody += ('<td>' + object.lastName + '</td>');
            tBody += ('<td>' + object.email + '</td>');
            tBody += ('<td>' + object.roles + '</td>');
            tBody += ('<td><button type="button" onclick="editModal(' + object.id + ')" ' +
                'class="btn btn-primary">Edit</button></td>');
            tBody += ('<td><button type="button" onclick="deleteModal(' + object.id + ')" ' +
                'class="btn btn-danger">Delete</button></td>');
            tBody += ('<tr>');
        });
        $('#usersTable').html(tBody);
    }
}

// New User

function addNewUser() {
    fetch(requestUrl, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            firstName: $('#firstname2').val(),
            lastName: $('#lastname2').val(),
            email: $('#email2').val(),
            password: $('#password2').val(),
            roles: $('#roles2').val(),
        })
    })
        .then((response) => {
            if (response.ok) {
                $('form input[type="text"], form textarea')
                    .val('');
                $('#adminPanel').tab('show')

                fetchData()
            }
        })

}


// Модальное окно Edit
function editModal(id) {
    fetch(requestUrl + '/' + id)
        .then(response => response.json())
        .then(result => fillFields(result))

    function fillFields(user) {
        $('#id3').val(user.id);
        $('#firstName3').val(user.firstName);
        $('#lastname3').val(user.lastName);
        $('#email3').val(user.email);
        $('#password3').val(user.password);
        $('#editUser').modal()
        $('#edit').attr('onclick','editUser(' + user.id + ')')
    }
}

function editUser(id) {
    fetch(requestUrl + '/' + id,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(
                {
                    id: document.getElementById('id3').value,
                    firstName: document.getElementById('firstName3').value,
                    lastName: document.getElementById('lastname3').value,
                    email: document.getElementById("email3").value,
                    password: document.getElementById('password3').value,
                    roles: document.getElementById('roles3').value
                })
        }).then((re) => {
        $('#editUser').modal("hide")
        fetchData()
    })
}

// Модальное окно Delete
function deleteModal(id) {
    fetch(requestUrl + '/' + id)
        .then(response => response.json())
        .then(result => fillFields(result))

    function fillFields(user) {
        $('#id1').val(user.id);
        $('#firstname1').val(user.firstName);
        $('#lastname1').val(user.lastName);
        $('#email1').val(user.email);
        $('#roles1').val(user.roleNames);
        $('#delete').attr('onclick', 'deleteUser(' + user.id + ')')
        $('#delUser').modal()
    }
}

function deleteUser(id) {
    fetch(requestUrl + '/' + id, {
        method: 'DELETE'
    }).then(() => {
        $('#delUser').modal('hide')
        refreshData();
    })
}

fetchData()