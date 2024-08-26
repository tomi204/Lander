import { FC, useCallback, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";

interface ConfirmDialogProps {
  isShow: boolean;
  title: string;
  description: string;
  body: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isShow,
  title,
  description,
  body,
  onConfirm,
  onCancel,
}) => {
  const onCancelHandler = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  const onConfirmHandler = useCallback(() => {
    onConfirm && onConfirm();
  }, [onConfirm]);

  return (
    <>
      <Transition appear show={isShow} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          open={isShow}
          onClose={onCancelHandler}
        >
          <div className="min-h-screen px-4 text-center bg-black bg-opacity-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out transition-transform"
              enterFrom="opacity-0 translate-y-52"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in transition-transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-52"
            >
              <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:mt-20 sm:w-auto sm:max-w-lg sm:p-8">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-gray-500">
                  {description}
                </Dialog.Description>

                {body && <p className="mt-4">{body}</p>}

                <div className="mt-4 flex justify-end gap-3">
                  <ButtonPrimary onClick={onConfirmHandler}>
                    Confirm
                  </ButtonPrimary>
                  <ButtonSecondary onClick={onCancelHandler}>
                    Cancel
                  </ButtonSecondary>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ConfirmDialog;
