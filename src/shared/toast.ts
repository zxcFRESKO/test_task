import toast from 'react-hot-toast';

let isToastShown: boolean = false;

export const showToast = (message: string, noRepeat: boolean) => {
  if (!isToastShown) {
    toast.error(message, {
      style: {
        background: '#ff4444',
        color: '#fff',
      },
      icon: '❌',
    });
    isToastShown = noRepeat;
  }
};

export const toastSuccess = (message: string, noRepeat: boolean) => {
  toast.success(message, {
    duration: 2500,
    style: {
      background: '#04ff00',
      color: '#fff',
    },
    icon: '✅',
  });
  isToastShown = noRepeat;
};

export const resetToastFlag = () => {
  isToastShown = false;
};
