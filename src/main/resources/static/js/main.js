let requestUrl = 'http://localhost:8080/api/admin/users'

fetchData()

function fetchData() {
    fetch(requestUrl)
        .then(response => response.json())
        .then(result => fetchTable(result))
        .then(log => console.log(log))

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
            tBody += ('<td>' + roles.replaceAll('ROLE_', ' ') + '</td>');
            tBody += ('<td><button type="button" onclick="editModal(' + object.id + ')" ' +
                'class="btn btn-primary">Edit</button></td>');
            tBody += ('<td><button type="button" onclick="deleteModal(' + object.id + ')" ' +
                'class="btn btn-danger">Delete</button></td>');
            tBody += ('<tr>');
        });
        $('#usersTable').html(tBody);
    }
}

function addNewUser() {
    fetch(requestUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: $('#newFirstName').val(),
            lastName: $('#newLastName').val(),
            email: $('#newEmail').val(),
            password: $('#newPassword').val(),
            roles: [
                document.getElementById('newRoles').value
            ]
        })
    })
        .then((responce) => {
            if (responce.ok) {
                $('form input[type="text"], form input[type="password"], form input[type="number"], form textarea')
                    .val('');
                $('#nav-home-tab').tab('show')
                fetchData()
            }
        })
}

function editModal(id) {
    fetch(requestUrl + '/' + id)
        .then(response => response.json())
        .then(result => fillFields(result))

    function fillFields(user) {
        $('#edId').val(user.id);
        $('#edFirstName').val(user.firstName);
        $('#edLastName').val(user.lastName);
        $('#edEmail').val(user.email);
        $('#edPassword').val(user.password);
        $('#editModal').modal()
        $('#edit').attr('onclick', 'editUser(' + user.id + ')')
    }
}

function editUser(id) {
    fetch(requestUrl + '/' + id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(
            {
                id: document.getElementById('edId').value,
                firstName: document.getElementById('edFirstName').value,
                lastName: document.getElementById('edLastName').value,
                email: document.getElementById("edEmail").value,
                password: document.getElementById('edPassword').value,
                roles: [
                    document.getElementById('rolesEdit').value
                ]
            })
    }).then((responce) => {
        $('#editModal').modal("hide")
        fetchData()
    })
}

function deleteModal(id) {
    fetch(requestUrl + '/' + id)
        .then(response => response.json())
        .then(result => fillFields(result))

    function fillFields(user) {
        $('#delId').val(user.id);
        $('#delFirstName').val(user.firstName);
        $('#delLastName').val(user.lastName);
        $('#delEmail').val(user.email);
        $('#delete').attr('onclick', 'deleteUser(' + user.id + ')')
        $('#deleteModalHtml').modal()
    }
}

function deleteUser(id) {
    fetch(requestUrl + '/' + id, {
        method: 'DELETE'
    }).then(() => {
        $('#deleteModalHtml').modal('hide')
        fetchData();
    })
}