import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";

export default function ConfirmatioDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <Dialog.Title as='h3' className=''>
            <p
              className={clsx(
                "p-3 rounded-full text-white",
                type === "restore" || type === "restoreAll"
                  ? "text-white bg-accent_color_yellow"
                  : "text-white bg-red"
              )}
            >
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>

          <p className='text-center text-white'>
            {msg ?? "Are you sure you want to delete the selected record?"}
          </p>

          <div className=' py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type='button'
              className={clsx(
                " px-8 text-sm font-semibold text-white sm:w-auto",
                type === "restore" || type === "restoreAll"
                  ? "bg-button_color"
                  : "bg-red hover:bg-red"
              )}
              onClick={onClick}
              label={type === "restore" ? "Restore" : "Delete"}
            />

            <Button
              type='button'
              className='bg-white px-8 text-sm font-semibold text-black sm:w-auto border'
              onClick={() => closeDialog()}
              label='Cancel'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <Dialog.Title as='h3' className=''>
            <p className={clsx("p-3 rounded-full text-white bg-red")}>
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>

          <p className='text-center text-white'>
            {"Are you sure you want to activate or deactivate this account?"}
          </p>

          <div className='py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type='button'
              className={clsx(
                " px-8 text-sm font-semibold text-white sm:w-auto",
                "bg-red hover:bg-red/80"
              )}
              onClick={onClick}
              label={"Yes"}
            />

            <Button
              type='button'
              className='bg-white px-8 text-sm font-semibold text-black sm:w-auto border'
              onClick={() => closeDialog()}
              label='No'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}