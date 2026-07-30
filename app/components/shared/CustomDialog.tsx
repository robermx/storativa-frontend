import { FC, PropsWithChildren, RefObject } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Mail, X } from 'lucide-react';

interface CustomDialogProps {
  openDialog: boolean;
  onCloseDialog: () => void;
  initialFocus: RefObject<HTMLInputElement | null>;
  title: string;
  subtitle: string;
}

const CustomDialog: FC<PropsWithChildren<CustomDialogProps>> = ({
  openDialog = false,
  onCloseDialog,
  initialFocus,
  title,
  subtitle,
  children,
}) => {
  return (
    <Dialog
      open={openDialog}
      onClose={onCloseDialog}
      initialFocus={initialFocus}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-dark/45 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl border border-dark/10 bg-lightness p-6 shadow-2xl dark:border-light/10 dark:bg-darkness sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Mail size={21} />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-dark dark:text-light">
                  {title}
                </DialogTitle>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {subtitle}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onCloseDialog}
              className="rounded-md p-1 text-gray-400 transition hover:bg-dark/5 hover:text-dark dark:hover:bg-light/10 dark:hover:text-light"
              aria-label="Cerrar verificación"
            >
              <X size={20} />
            </button>
          </div>

          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CustomDialog;
