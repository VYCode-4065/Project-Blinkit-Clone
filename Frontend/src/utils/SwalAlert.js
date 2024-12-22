import Swal from 'sweetalert2'

const successAlert = (title) => {
    const alert = Swal.fire({
        icon: 'success',
        title: title,
        confirmButtonColor: '#22c55e',
        timer: 2000
    }
    )
    return alert;
}

export default successAlert;