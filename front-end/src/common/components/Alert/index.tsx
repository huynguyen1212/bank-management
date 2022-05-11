import Swal from 'sweetalert2';

interface Props {
  name: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question' | undefined;
}

function Alert({ name, icon = 'success' }: Props) {
  return Swal.fire({
    title: name,
    icon: icon,
    position: 'top-right',
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
}

export { Alert };
