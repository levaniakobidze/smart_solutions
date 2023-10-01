import React, { Dispatch, FC, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserTypes } from "@/types/types";
import { toast } from "react-toastify";
interface PropTyeps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: number;
  users: UserTypes[];
  setUsers: Dispatch<SetStateAction<UserTypes[]>>;
}

let toastObj = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const DeleteUser: FC<PropTyeps> = ({
  isOpen,
  setIsOpen,
  users,
  setUsers,
  userId,
}) => {
  const user = users?.find((user: UserTypes) => user.id === userId);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleDeleteUser = () => {
    const deleted = users.filter((user: UserTypes) => user.id !== userId);
    setUsers(deleted);
    handleClose();
    toast.error(`${user?.name} successfully deleted!`, {
      ...toastObj,
    });
  };

  return (
    <div onClick={handleClose}>
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger
          asChild
          onPointerDown={handleOpen}
        ></AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "red" }}>
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              user data. user: {user?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              style={{ backgroundColor: "red" }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteUser;
