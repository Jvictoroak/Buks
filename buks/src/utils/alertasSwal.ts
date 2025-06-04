import Swal, { SweetAlertIcon } from 'sweetalert2';

interface ShowSwalOptions {
  icon: SweetAlertIcon;
  title: string;
  text: string;
}

export function showSwal({ icon, title, text }: ShowSwalOptions) {
  Swal.fire({
    icon,
    title,
    text,
    customClass: {
      popup: 'swal-custom-popup',
      title: '-custom-title',
      confirmButton: '-custom-confirm',
      icon: 'swal-custom-icon',
    },
  });
}
