import { type FC, type PropsWithChildren, type RefObject } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { X } from 'lucide-react';
import CustomButton from './CustomButton';

interface CustomDialogProps {
  openDialog: boolean;
  onCloseDialog: () => void;
  initialFocus: RefObject<HTMLElement | null>;
  title: string;
  subtitle: string;
  closeLabel?: string;
  isCloseDisabled?: boolean;
}

const CustomDialog: FC<PropsWithChildren<CustomDialogProps>> = ({
  openDialog = false,
  onCloseDialog,
  initialFocus,
  title,
  subtitle,
  closeLabel = 'Cerrar diálogo',
  isCloseDisabled = false,
  children,
}) => {
  return (
    <Dialog
      open={openDialog}
      onClose={isCloseDisabled ? () => undefined : onCloseDialog}
      initialFocus={initialFocus}
      className="relative z-60 overflow-y-auto"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-dark/45 backdrop-blur-sm transition-[opacity,backdrop-filter] duration-300 ease-out data-closed:opacity-0 data-closed:backdrop-blur-none motion-reduce:transition-none"
      />
      <div className="fixed inset-0 flex items-center justify-center min-h-100 px-3">
        <DialogPanel
          transition
          className="w-full max-w-md rounded-2xl border border-dark/10 bg-lightness p-5 shadow-md transition duration-300 ease-out data-closed:scale-95 data-closed:opacity-0 motion-reduce:transition-none dark:border-light/10 dark:bg-darkness sm:p-6"
        >
          <div className="flex items-start justify-between gap-4 py-2">
            <div className="flex flex-col gap-y-3">
              <DialogTitle className="text-xl font-bold text-dark dark:text-light">
                {title}
              </DialogTitle>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            </div>
            <CustomButton
              onClick={onCloseDialog}
              disabled={isCloseDisabled}
              aria-label={closeLabel}
              icon={<X />}
              width="auto"
              variant="text"
              className="text-dark dark:text-light cursor-pointer"
            />
          </div>
          <div className="overflow-auto h-auto max-h-60">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CustomDialog;
