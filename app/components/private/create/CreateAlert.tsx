import { FC } from 'react';

interface CreateAlertProps {
  submitError: string | null;
}

const CreateAlert: FC<CreateAlertProps> = ({ submitError }) => {
  return (
    submitError && (
      <div
        role="alert"
        className="mx-6 mb-6 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
      >
        {submitError}
      </div>
    )
  );
};

export default CreateAlert;
